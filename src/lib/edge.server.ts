// ---------------------------------------------------------------------------
// Server-only helpers shared by auth.functions.ts and supabaseClient.ts.
//
// This file is `*.server.ts` so it is blocked from client bundles by the
// import guard. It never runs in the browser, so reading process.env here is
// safe — but we still read secrets lazily inside functions (not at module
// scope) to honor call-time env injection on Cloudflare Workers.
//
// Secrets (Settings → Secrets): SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY
// ---------------------------------------------------------------------------

import type { Json } from "./json";

export const AUTH_COOKIE = "sb-cc-auth";

export interface StoredSession {
  access_token: string;
  refresh_token: string;
  expires_at?: number | undefined;
}

export interface EdgeResult {
  ok: boolean;
  status: number;
  error: string | null;
  data: Json;
}

// Read the sb-cc-auth session cookie from the incoming request headers.
// getRequestHeader is injected into server-function handlers by the TanStack
// Start server-fn transform. We accept it as a parameter so this helper can be
// unit-tested and so the caller controls the request boundary.
export function readSessionCookie(cookieHeader: string | undefined | null): StoredSession | null {
  const raw = cookieHeader ?? "";
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

// Convenience: pull the access token straight from the request header using
// the injected getRequestHeader. Returns null when there is no session.
export function readAccessToken(): string | null {
  const stored = readSessionCookie(getRequestHeader("cookie"));
  return stored?.access_token ?? null;
}

// Serialize a session into the httpOnly cookie value.
export function serializeCookie(name: string, value: string, maxAge: number): string {
  const enc = encodeURIComponent(value);
  const flags = [`${name}=${enc}`, "Path=/", "HttpOnly", "SameSite=Lax", `Max-Age=${maxAge}`];
  // Secure in production; the preview is http so we can't enforce it there
  // or the cookie would never be sent.
  if (process.env["NODE_ENV"] === "production") flags.push("Secure");
  return flags.join("; ");
}

export function clearCookie(name: string): string {
  return serializeCookie(name, "", 0);
}

function readSecret(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing secret: ${name}`);
  return value;
}

const toErrorMessage = (json: unknown, status: number): string => {
  const raw =
    json && typeof json === "object" && "error" in json
      ? (json as Record<string, unknown>)["error"]
      : json;
  if (typeof raw === "string" && raw) return raw;
  if (raw != null) return JSON.stringify(raw);
  return `HTTP ${status}`;
};

// Call a Supabase Edge Function. If `accessToken` is provided it is sent as
// `Authorization: Bearer <token>`; otherwise the anon/publishable key is used
// as the bearer (the legacy behavior for submit-application). Network errors
// and missing secrets come back as { ok: false } so callers can show an error
// state instead of crashing.
export async function callEdgeFunction(
  name: string,
  init: { method: "GET"; params: Record<string, string> } | { method: "POST"; body: object },
  accessToken?: string | null,
): Promise<EdgeResult> {
  let res: Response;
  try {
    const baseUrl = readSecret("SUPABASE_URL");
    const key = readSecret("SUPABASE_PUBLISHABLE_KEY");

    const url = new URL(`${baseUrl}/functions/v1/${name}`);
    if (init.method === "GET") {
      for (const [k, v] of Object.entries(init.params)) url.searchParams.set(k, v);
    }

    // Prefer the signed-in user's access token; fall back to the publishable
    // key for endpoints that allow anonymous calls (submit-application).
    const bearer = accessToken ?? key;

    res = await fetch(url.toString(), {
      method: init.method,
      headers: {
        Authorization: `Bearer ${bearer}`,
        ...(init.method === "POST" ? { "Content-Type": "application/json" } : {}),
      },
      ...(init.method === "POST" ? { body: JSON.stringify(init.body) } : {}),
      signal: AbortSignal.timeout(15000),
    });
  } catch (error) {
    console.error(`[supabase:${name}]`, error);
    return {
      ok: false,
      status: 0,
      error: "We couldn't reach the server. Please try again.",
      data: null,
    };
  }

  const text = await res.text();
  let json: Json = null;
  try {
    json = text ? (JSON.parse(text) as Json) : null;
  } catch {
    json = text;
  }

  if (!res.ok) {
    console.error(`[supabase:${name}]`, res.status, text.slice(0, 500));
    return { ok: false, status: res.status, error: toErrorMessage(json, res.status), data: null };
  }
  return { ok: true, status: res.status, error: null, data: json };
}
