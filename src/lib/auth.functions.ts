import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";

// getRequestHeader / setResponseHeader are auto-injected into server-function
// handlers by the TanStack Start server-fn transform (see
// src/types/tanstack-request.d.ts). They are not an import.

// ---------------------------------------------------------------------------
// Supabase Auth — real sign-in.
//
// The browser never sees the Supabase URL, the publishable key, or the
// access token. Every auth call runs inside a createServerFn handler, the
// same boundary as the Edge Function calls in supabaseClient.ts.
//
// Secrets (Settings → Secrets): SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY
//
// Session storage: the session is held in a secure, httpOnly cookie named
// `sb-cc-auth`, not in localStorage. The browser cannot read it.
// ---------------------------------------------------------------------------

const AUTH_COOKIE = "sb-cc-auth";
const COMMUNITY_ID = "1bf4b1af-9b2f-42e7-a027-fd0ab59dee65";

export type UserRole =
  "loggedOut" | "resident" | "admin" | "boardMember" | "blockCaptain" | "developerBuyer" | "vendor";

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  initials: string;
  role: UserRole;
}

export interface SessionResult {
  user: AuthUser | null;
}

const readSecret = (name: string): string => {
  const value = process.env[name];
  if (!value) throw new Error(`Missing secret: ${name}`);
  return value;
};

// Server-only: a Supabase client that uses the publishable (anon) key and
// never persists a session in the worker. Auth state is carried per-request
// via the access token we read from the cookie.
function makeClient(accessToken?: string) {
  const url = readSecret("SUPABASE_URL");
  const key = readSecret("SUPABASE_PUBLISHABLE_KEY");
  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    global: {
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    },
  });
}

// --- Cookie helpers --------------------------------------------------------
// The session JSON (access_token + refresh_token) is stored in the cookie so
// the server can restore it on the next request. It is httpOnly + Secure +
// SameSite=Lax so the browser cannot read it and it is not sent on
// cross-site subrequests.

function serializeCookie(name: string, value: string, maxAge: number): string {
  const enc = encodeURIComponent(value);
  const flags = [`${name}=${enc}`, "Path=/", "HttpOnly", "SameSite=Lax", `Max-Age=${maxAge}`];
  // Secure in production; the preview is http so we can't enforce it there
  // or the cookie would never be sent.
  if (process.env["NODE_ENV"] === "production") flags.push("Secure");
  return flags.join("; ");
}

function clearCookie(name: string): string {
  return serializeCookie(name, "", 0);
}

interface StoredSession {
  access_token: string;
  refresh_token: string;
  expires_at?: number | undefined;
}

function readSessionCookie(): StoredSession | null {
  const raw = getRequestHeader("cookie") ?? "";
  if (!raw) return null;
  for (const part of raw.split(";")) {
    const [k, ...rest] = part.trim().split("=");
    if (k === AUTH_COOKIE) {
      try {
        const decoded = decodeURIComponent(rest.join("="));
        const parsed = JSON.parse(decoded) as StoredSession;
        if (parsed?.access_token) return parsed;
      } catch {
        return null;
      }
    }
  }
  return null;
}

// --- Role resolution -------------------------------------------------------
// Derived server-side from role_assignments for the linked user + the
// Country Close community. Never trusts a role sent from the browser. If no
// assignment exists, the role is "resident".

function initialsFrom(first?: string | null, last?: string | null): string {
  const a = (first?.trim()?.[0] ?? "").toUpperCase();
  const b = (last?.trim()?.[0] ?? "").toUpperCase();
  return a + b || "CC";
}

async function resolveUser(
  client: ReturnType<typeof makeClient>,
  userId: string,
): Promise<AuthUser | null> {
  // public.users holds the community profile. auth_user_id links it to
  // auth.users.id. We match by the confirmed email when linking (see
  // linkAccount). Here we read the profile + role in one round trip.
  const [profileRes, roleRes] = await Promise.all([
    client
      .from("users")
      .select("id, first_name, last_name, email, auth_user_id")
      .eq("auth_user_id", userId)
      .maybeSingle(),
    client
      .from("role_assignments")
      .select("role")
      .eq("user_id", userId)
      .eq("community_id", COMMUNITY_ID)
      .maybeSingle(),
  ]);

  if (profileRes.error || !profileRes.data) return null;

  const first = (profileRes.data.first_name as string) ?? "";
  const last = (profileRes.data.last_name as string) ?? "";
  const rawRole = (roleRes.data?.role as string) ?? "resident";
  const role = (
    ["admin", "boardMember", "blockCaptain", "vendor", "resident"].includes(rawRole)
      ? rawRole
      : "resident"
  ) as UserRole;

  return {
    id: userId,
    email: (profileRes.data.email as string) ?? "",
    firstName: first,
    lastName: last,
    initials: initialsFrom(first, last),
    role,
  };
}

// --- Sign up ---------------------------------------------------------------
// Email + password. Email confirmation is required before the account can
// sign in (enforced by Supabase Auth config). We do NOT create a public.users
// row here — linking happens after a confirmed sign-in.

export interface SignUpInput {
  email: string;
  password: string;
}

export interface AuthActionResult {
  ok: boolean;
  error: string | null;
  needsConfirmation: boolean;
}

const signUpFn = createServerFn({ method: "POST" })
  .validator((input: SignUpInput) => input)
  .handler(async ({ data }) => {
    const client = makeClient();
    const { error } = await client.auth.signUp({
      email: data.email,
      password: data.password,
    });
    if (error) {
      return { ok: false, error: friendlyAuthError(error.message), needsConfirmation: false };
    }
    // Confirmation email sent by Supabase. The user cannot sign in until they
    // click the link.
    return { ok: true, error: null, needsConfirmation: true };
  });

export const signUp = (input: SignUpInput): Promise<AuthActionResult> => signUpFn({ data: input });

// --- Sign in ---------------------------------------------------------------
// On success, store the session in the httpOnly cookie and link the
// auth.users.id to public.users.auth_user_id by matching the confirmed email.

export interface SignInInput {
  email: string;
  password: string;
}

const signInFn = createServerFn({ method: "POST" })
  .validator((input: SignInInput) => input)
  .handler(async ({ data }) => {
    const client = makeClient();
    const { data: session, error } = await client.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if (error) {
      return { ok: false, error: friendlyAuthError(error.message), user: null };
    }
    if (!session?.user) {
      return { ok: false, error: "Sign-in failed. Please try again.", user: null };
    }

    // Email must be confirmed before portal access. Supabase sets
    // email_confirmed_at on confirmation; if it's missing, block.
    if (!(session.user as { email_confirmed_at?: string | null }).email_confirmed_at) {
      return {
        ok: false,
        error:
          "Please confirm your email before signing in. Check your inbox for the confirmation link.",
        user: null,
      };
    }

    // Link auth.users.id -> public.users.auth_user_id by matching the
    // confirmed email. Only link when the email is confirmed and the profile's
    // auth_user_id is currently null. If no public.users row matches, the
    // account is not yet verified for this community.
    const linked = await linkAccount(client, session.user.id, session.user.email ?? "");
    if (!linked) {
      return {
        ok: false,
        error: "Your account is not yet verified for this community.",
        user: null,
      };
    }

    const stored: StoredSession = {
      access_token: session.session?.access_token ?? "",
      refresh_token: session.session?.refresh_token ?? "",
      expires_at: session.session?.expires_at,
    };
    setResponseHeader(
      "set-cookie",
      serializeCookie(AUTH_COOKIE, JSON.stringify(stored), 60 * 60 * 24 * 7),
    );

    const user = await resolveUser(client, session.user.id);
    return { ok: true, error: null, user };
  });

export const signIn = (
  input: SignInInput,
): Promise<{ ok: boolean; error: string | null; user: AuthUser | null }> =>
  signInFn({ data: input });

// Linking: match the confirmed email on public.users. Only set auth_user_id
// when it is currently null. Never create a row.
async function linkAccount(
  client: ReturnType<typeof makeClient>,
  authUserId: string,
  email: string,
): Promise<boolean> {
  if (!email) return false;
  const { data: existing, error } = await client
    .from("users")
    .select("id, auth_user_id, email")
    .eq("email", email)
    .maybeSingle();
  if (error || !existing) return false;
  if (existing.auth_user_id === authUserId) return true; // already linked
  if (existing.auth_user_id !== null) return false; // linked to someone else
  const { error: updateError } = await client
    .from("users")
    .update({ auth_user_id: authUserId })
    .eq("id", existing.id)
    .is("auth_user_id", null);
  if (updateError) return false;
  return true;
}

// --- Sign out --------------------------------------------------------------

const signOutFn = createServerFn({ method: "POST" }).handler(async () => {
  const stored = readSessionCookie();
  if (stored?.access_token) {
    try {
      const client = makeClient(stored.access_token);
      await client.auth.signOut();
    } catch {
      // Best-effort; the cookie is cleared regardless.
    }
  }
  setResponseHeader("set-cookie", clearCookie(AUTH_COOKIE));
  return { ok: true };
});

export const signOut = (): Promise<{ ok: boolean }> => signOutFn();

// --- Get session (restore on load) -----------------------------------------

const getSessionFn = createServerFn({ method: "GET" }).handler(async () => {
  const stored = readSessionCookie();
  if (!stored?.access_token) return { user: null };
  const client = makeClient(stored.access_token);
  // Refresh if the token is close to expiry.
  const { data: refreshed, error } = await client.auth.getUser(stored.access_token);
  if (error || !refreshed?.user) {
    return { user: null };
  }
  const user = await resolveUser(client, refreshed.user.id);
  return { user };
});

export const getSession = (): Promise<SessionResult> => getSessionFn();

// --- Forgot password -------------------------------------------------------

export interface ResetPasswordInput {
  email: string;
}

const resetPasswordFn = createServerFn({ method: "POST" })
  .validator((input: ResetPasswordInput) => input)
  .handler(async ({ data }) => {
    const client = makeClient();
    const { error } = await client.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${getRequestHeader("origin") ?? ""}/portal`,
    });
    if (error) {
      return { ok: false, error: friendlyAuthError(error.message) };
    }
    return { ok: true, error: null };
  });

export const resetPassword = (
  input: ResetPasswordInput,
): Promise<{ ok: boolean; error: string | null }> => resetPasswordFn({ data: input });

// --- Error mapping ---------------------------------------------------------

function friendlyAuthError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("invalid login credentials")) {
    return "Incorrect email or password. Please try again.";
  }
  if (m.includes("email not confirmed")) {
    return "Please confirm your email before signing in. Check your inbox for the confirmation link.";
  }
  if (m.includes("user already registered") || m.includes("already registered")) {
    return "An account with that email already exists. Try signing in instead.";
  }
  if (m.includes("password") && m.includes("weak")) {
    return "Password is too weak. Use at least 8 characters with a mix of letters and numbers.";
  }
  if (m.includes("rate limit") || m.includes("too many")) {
    return "Too many attempts. Please wait a moment and try again.";
  }
  return "We couldn't complete that request. Please try again.";
}
