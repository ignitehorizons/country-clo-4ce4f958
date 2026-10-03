/// <reference types="node" />
import { createServerFn } from "@tanstack/react-start";

// ---------------------------------------------------------------------------
// All Supabase traffic runs through server functions. The browser never sees
// the Supabase URL or key — they are read from the project's Secrets on the
// server, so a future secret key can be added here without reaching the page.
//
// Secrets (Settings → Secrets): SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY
// ---------------------------------------------------------------------------

const readSecret = (name: string): string => {
  const value = process.env[name];
  if (!value) throw new Error(`Missing secret: ${name}`);
  return value;
};

// The community a prospective resident applies to. This is the UUID of the
// Country Close community record in the `communities` table.
export const COUNTRY_CLOSE_COMMUNITY_ID = "1bf4b1af-9b2f-42e7-a027-fd0ab59dee65";

// TEMPORARY — test identities carried over from the prototype. There is no
// real sign-in yet, so every approval is recorded as this board member and
// every Profile privacy change edits this one resident. Replace both with the
// signed-in user once Supabase Auth is wired up.
export const TEST_BOARD_USER_ID = "259c2880-9f6c-4324-94b0-08248b91f1ea";
export const TEST_RESIDENT_USER_ID = "f24645b0-eb8d-4b5e-aa70-aea687f17c5d";

// Anything a server function returns must be serializable.
export type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

export interface EdgeResult {
  ok: boolean;
  status: number;
  error: string | null;
  data: Json;
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

// Server-only: performs the actual call to a Supabase Edge Function.
async function callEdgeFunction(
  name: string,
  init:
    | { method: "GET"; params: Record<string, string> }
    | {
        method: "POST";
        body: object;
      },
): Promise<EdgeResult> {
  // Network failures and missing Secrets come back as { ok: false } like any
  // other failure, so the pages show their error state instead of crashing.
  let res: Response;
  try {
    const baseUrl = readSecret("SUPABASE_URL");
    const key = readSecret("SUPABASE_PUBLISHABLE_KEY");

    const url = new URL(`${baseUrl}/functions/v1/${name}`);
    if (init.method === "GET") {
      for (const [k, v] of Object.entries(init.params)) url.searchParams.set(k, v);
    }

    res = await fetch(url.toString(), {
      method: init.method,
      headers: {
        Authorization: `Bearer ${key}`,
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

// ---------------------------------------------------------------------------
// Writes
// ---------------------------------------------------------------------------

export interface SubmitApplicationInput {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string | undefined;
  address?: string | undefined;
  community_id: string;
}

const submitApplicationFn = createServerFn({ method: "POST" })
  .validator((input: SubmitApplicationInput) => input)
  .handler(({ data }) => callEdgeFunction("submit-application", { method: "POST", body: data }));

export const submitApplication = (input: SubmitApplicationInput) =>
  submitApplicationFn({ data: input });

export interface ApproveVerificationInput {
  verification_request_id: string;
  decision: "Approved" | "Denied";
  reviewer_user_id: string;
}

const approveVerificationFn = createServerFn({ method: "POST" })
  .validator((input: ApproveVerificationInput) => input)
  .handler(({ data }) => callEdgeFunction("approve-verification", { method: "POST", body: data }));

export const approveVerification = (input: ApproveVerificationInput) =>
  approveVerificationFn({ data: input });

export type VisibilityField =
  | "address_visible"
  | "unit_or_street_visible"
  | "phone_visible"
  | "email_visible"
  | "photo_visible"
  | "display_name_mode";

export interface UpdateVisibilityInput {
  user_id: string;
  field: VisibilityField;
  new_value: boolean | string;
}

const updateVisibilityFn = createServerFn({ method: "POST" })
  .validator((input: UpdateVisibilityInput) => input)
  .handler(({ data }) => callEdgeFunction("update-visibility", { method: "POST", body: data }));

export const updateVisibility = (input: UpdateVisibilityInput) =>
  updateVisibilityFn({ data: input });

// ---------------------------------------------------------------------------
// Reads — the raw REST endpoints for `community_directory` and
// `verification_requests` are locked down; reads go through Edge Functions
// that enforce visibility server-side.
// ---------------------------------------------------------------------------

export interface DirectoryEntry {
  user_id: string;
  community_id: string | null;
  display_name: string | null;
  address: string | null;
  unit_or_street: string | null;
  phone: string | null;
  email: string | null;
  photo_url: string | null;
  verified_status: string | null;
}

export interface VerificationRequest {
  id: string;
  user_id: string | null;
  community_id: string | null;
  status: string | null;
  mode_used: string | null;
  submitted_at: string | null;
  decided_at: string | null;
  reviewed_by: string | null;
}

const fetchCommunityResidentsFn = createServerFn({ method: "GET" })
  .validator((communityId: string) => communityId)
  .handler(async ({ data: communityId }) => {
    const result = await callEdgeFunction("get-community-directory", {
      method: "GET",
      params: { community_id: communityId },
    });
    if (!result.ok) return { data: null, error: result.error };
    const payload = result.data as { residents?: DirectoryEntry[] } | null;
    return { data: payload?.residents ?? [], error: null };
  });

/** Fetch all residents in a community via the get-community-directory function. */
export const fetchCommunityResidents = (
  communityId: string,
): Promise<{ data: DirectoryEntry[] | null; error: string | null }> =>
  fetchCommunityResidentsFn({ data: communityId });

/**
 * Fetch a single directory entry by user_id. The directory function returns
 * the whole community, so we fetch it and find the matching user. Hidden
 * fields come back as null and are displayed as absent.
 */
export async function fetchResident(
  userId: string,
): Promise<{ data: DirectoryEntry | null; error: string | null }> {
  const { data, error } = await fetchCommunityResidents(COUNTRY_CLOSE_COMMUNITY_ID);
  if (error) return { data: null, error };
  const found = (data || []).find((r) => r.user_id === userId) || null;
  return { data: found, error: null };
}

const fetchPendingVerificationsFn = createServerFn({ method: "GET" })
  .validator((communityId: string) => communityId)
  .handler(async ({ data: communityId }) => {
    const result = await callEdgeFunction("get-approval-queue", {
      method: "GET",
      params: { community_id: communityId },
    });
    if (!result.ok) return { data: null, error: result.error };
    const payload = result.data as { pending?: VerificationRequest[] } | null;
    return { data: payload?.pending ?? [], error: null };
  });

/** Fetch pending verification requests via the get-approval-queue function. */
export const fetchPendingVerifications = (
  communityId: string,
): Promise<{ data: VerificationRequest[] | null; error: string | null }> =>
  fetchPendingVerificationsFn({ data: communityId });

// ---------------------------------------------------------------------------
// Public config — the Mapbox token is a public (pk.) token by design, but it
// lives in Secrets so it can be rotated without a code change.
// ---------------------------------------------------------------------------

export const getMapboxToken = createServerFn({ method: "GET" }).handler(
  () => process.env["MAPBOX_PUBLIC_TOKEN"] ?? "",
);

/**
 * Returns the display name for a directory entry. The `community_directory`
 * view returns `display_name` already formatted server-side per the resident's
 * display_name_mode setting, so we prefer that and fall back gracefully.
 */
export function formatDisplayName(entry: { display_name?: string | null }): string {
  return entry.display_name?.trim() || "Country Close Resident";
}
