import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader, setResponseHeader } from "@tanstack/react-start/server";
import { createClient } from "@supabase/supabase-js";
import {
  callEdgeFunction,
  readSessionCookie,
  serializeCookie,
  clearCookie,
  AUTH_COOKIE,
} from "./edge.server";

// getRequestHeader / setResponseHeader are imported from
// @tanstack/react-start/server (not auto-injected globals).

// ---------------------------------------------------------------------------
// Supabase Auth — real sign-in.
//
// The browser never sees the Supabase URL, the publishable key, or the
// access token. Every auth call runs inside a createServerFn handler.
//
// Profile + role resolution no longer read public.users / role_assignments
// directly. They go through the "get-my-profile" Edge Function, which
// enforces visibility server-side and returns the linked profile, the
// user's communities, and per-community permissions. Account linking goes
// through the "link-account" Edge Function.
//
// Secrets (Settings → Secrets): SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY
//
// Session storage: the session is held in a secure, httpOnly cookie named
// `sb-cc-auth`, not in localStorage. The browser cannot read it.
// ---------------------------------------------------------------------------

const COMMUNITY_ID = "1bf4b1af-9b2f-42e7-a027-fd0ab59dee65";

export type UserRole =
  "loggedOut" | "resident" | "admin" | "boardMember" | "blockCaptain" | "developerBuyer" | "vendor";

// Per-community permissions returned by get-my-profile.
export interface Permissions {
  can_approve_members: boolean;
  can_manage_content: boolean;
  can_manage_events: boolean;
  can_manage_board: boolean;
  can_view_full_directory: boolean;
  can_manage_verification_settings: boolean;
  can_cross_community_access: boolean;
}

export interface CommunityMembership {
  community_id: string;
  community_name: string;
  role_label: string;
  permissions: Permissions;
}

export interface AuthUser {
  /** auth.users.id — the Supabase Auth subject. */
  id: string;
  /** public.users.id — the community profile row, from get-my-profile. */
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  initials: string;
  role: UserRole;
  communities: CommunityMembership[];
  /** Permissions for the active (Country Close) community, if any. */
  permissions: Permissions | null;
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
// via the access token we read from the cookie. Used only for the Supabase
// Auth API (signUp / signIn / getUser / signOut / resetPassword); profile and
// linking go through Edge Functions (callEdgeFunction).
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

// --- Role + profile resolution via get-my-profile --------------------------

interface ProfileResponse {
  user_id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  communities: CommunityMembership[] | null;
}

function mapRoleLabel(roleLabel: string | null | undefined): UserRole {
  switch (roleLabel?.trim()) {
    case "Board Member":
      return "boardMember";
    case "Admin":
    case "Community Manager":
      return "admin";
    case "Block Captain":
      return "blockCaptain";
    case "Developer":
    case "Builder":
      return "developerBuyer";
    case "Vendor":
      return "vendor";
    default:
      return "resident";
  }
}

function initialsFrom(first?: string | null, last?: string | null): string {
  const a = (first?.trim()?.[0] ?? "").toUpperCase();
  const b = (last?.trim()?.[0] ?? "").toUpperCase();
  return a + b || "NS";
}

// Calls the get-my-profile Edge Function with the signed-in user's access
// token and builds the AuthUser. The role is derived server-side from the
// community's role_label — never trusted from the browser. If no assignment
// exists for the active community, the role is "resident".
async function resolveProfile(accessToken: string, authUserId: string): Promise<AuthUser | null> {
  const result = await callEdgeFunction(
    "get-my-profile",
    { method: "GET", params: {} },
    accessToken,
  );
  if (!result.ok || !result.data) return null;

  const p = result.data as unknown as ProfileResponse;
  if (!p?.user_id) return null;

  const communities = p.communities ?? [];
  // Prefer the Country Close community; fall back to the first membership.
  const active = communities.find((c) => c.community_id === COMMUNITY_ID) ?? communities[0] ?? null;

  const first = p.first_name ?? "";
  const last = p.last_name ?? "";

  return {
    id: authUserId,
    userId: p.user_id,
    email: p.email ?? "",
    firstName: first,
    lastName: last,
    initials: initialsFrom(first, last),
    role: mapRoleLabel(active?.role_label),
    communities,
    permissions: active?.permissions ?? null,
  };
}

// --- Account linking via link-account --------------------------------------

interface LinkResult {
  linked: boolean;
  reason?: string | null;
}

async function linkAccountEdge(accessToken: string): Promise<LinkResult> {
  const result = await callEdgeFunction("link-account", { method: "POST", body: {} }, accessToken);
  if (!result.ok) {
    return { linked: false, reason: result.error ?? "We couldn't link your account." };
  }
  const data = result.data as unknown as { linked?: boolean; reason?: string | null } | null;
  return {
    linked: !!data?.linked,
    reason: data?.reason ?? null,
  };
}

// --- Sign up ---------------------------------------------------------------
// Email + password. Email confirmation is required before the account can
// sign in (enforced by Supabase Auth config). Linking happens through the
// link-account Edge Function — at sign-in once the email is confirmed, or
// immediately if Supabase returns a session (confirmation disabled).

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
    const { data: session, error } = await client.auth.signUp({
      email: data.email,
      password: data.password,
    });
    if (error) {
      return { ok: false, error: friendlyAuthError(error.message), needsConfirmation: false };
    }

    // Email confirmation required: no session is returned. The user must
    // confirm before they can sign in; linking then happens at sign-in.
    const accessToken = session?.session?.access_token;
    if (!accessToken) {
      return { ok: true, error: null, needsConfirmation: true };
    }

    // Immediate session (confirmation disabled) — link now.
    const link = await linkAccountEdge(accessToken);
    if (!link.linked) {
      return {
        ok: false,
        error: link.reason ?? "Your account is not yet verified for this community.",
        needsConfirmation: false,
      };
    }
    return { ok: true, error: null, needsConfirmation: false };
  });

export const signUp = (input: SignUpInput): Promise<AuthActionResult> => signUpFn({ data: input });

// --- Sign in ---------------------------------------------------------------
// On success, link the auth account via link-account, store the session in
// the httpOnly cookie, then resolve the profile + role via get-my-profile.

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

    // Email must be confirmed before portal access.
    if (!(session.user as { email_confirmed_at?: string | null }).email_confirmed_at) {
      return {
        ok: false,
        error:
          "Please confirm your email before signing in. Check your inbox for the confirmation link.",
        user: null,
      };
    }

    const accessToken = session.session?.access_token ?? "";

    // Link auth.users.id -> public.users via the link-account Edge Function.
    // If it returns { linked: false, reason }, surface the reason (e.g.
    // "Your account is waiting for board approval").
    const link = await linkAccountEdge(accessToken);
    if (!link.linked) {
      return {
        ok: false,
        error: link.reason ?? "Your account is not yet verified for this community.",
        user: null,
      };
    }

    const stored = {
      access_token: accessToken,
      refresh_token: session.session?.refresh_token ?? "",
      expires_at: session.session?.expires_at,
    };
    setResponseHeader(
      "set-cookie",
      serializeCookie(AUTH_COOKIE, JSON.stringify(stored), 60 * 60 * 24 * 7),
    );

    const user = await resolveProfile(accessToken, session.user.id);
    return { ok: true, error: null, user };
  });

export const signIn = (
  input: SignInInput,
): Promise<{ ok: boolean; error: string | null; user: AuthUser | null }> =>
  signInFn({ data: input });

// --- Sign out --------------------------------------------------------------

const signOutFn = createServerFn({ method: "POST" }).handler(async () => {
  const stored = readSessionCookie(getRequestHeader("cookie"));
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
  const stored = readSessionCookie(getRequestHeader("cookie"));
  if (!stored?.access_token) return { user: null };
  const client = makeClient(stored.access_token);
  // Verify the token is still valid.
  const { data: refreshed, error } = await client.auth.getUser(stored.access_token);
  if (error || !refreshed?.user) {
    return { user: null };
  }
  const user = await resolveProfile(stored.access_token, refreshed.user.id);
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
