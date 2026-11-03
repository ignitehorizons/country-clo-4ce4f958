import { createServerFn } from "@tanstack/react-start";
import { callEdgeFunction, readAccessToken } from "./edge.server";
import type { Json } from "./json";

// ---------------------------------------------------------------------------
// All Supabase traffic runs through server functions. The browser never sees
// the Supabase URL or key — they are read from the project's Secrets on the
// server, so a future secret key can be added here without reaching the page.
//
// Every Edge Function call below (except submit-application) requires a
// signed-in user's access token, read from the sb-cc-auth cookie and sent as
// "Authorization: Bearer <token>". If there is no token, the call returns
// { ok: false, status: 401, error: "Please sign in." } without hitting the
// function.
//
// Secrets (Settings → Secrets): SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY
// ---------------------------------------------------------------------------

// Re-export the shared EdgeResult shape so existing imports keep working.
export type { EdgeResult } from "./edge.server";
export type { Json } from "./json";

// The community a prospective resident applies to. This is the UUID of the
// Country Close community record in the `communities` table.
export const COUNTRY_CLOSE_COMMUNITY_ID = "1bf4b1af-9b2f-42e7-a027-fd0ab59dee65";

// TEMPORARY — test identities carried over from the prototype. Removed in
// Step 2 once the signed-in user is used everywhere.
export const TEST_BOARD_USER_ID = "259c2880-9f6c-4324-94b0-08248b91f1ea";
export const TEST_RESIDENT_USER_ID = "f24645b0-eb8d-4b5e-aa70-aea687f17c5d";

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

// submit-application is the ONE anonymous endpoint — prospective residents
// apply before they have an account, so no access token is required.
const submitApplicationFn = createServerFn({ method: "POST" })
  .validator((input: SubmitApplicationInput) => input)
  .handler(({ data }) => callEdgeFunction("submit-application", { method: "POST", body: data }));

export const submitApplication = (input: SubmitApplicationInput) =>
  submitApplicationFn({ data: input });

export interface ApproveVerificationInput {
  verification_request_id: string;
  decision: "Approved" | "Denied";
}

// approve-verification no longer sends reviewer_user_id — the backend derives
// the reviewer from the signed-in user's access token.
const approveVerificationFn = createServerFn({ method: "POST" })
  .validator((input: ApproveVerificationInput) => input)
  .handler(async ({ data }) => {
    const token = readAccessToken();
    if (!token) return { ok: false, status: 401, error: "Please sign in.", data: null };
    return callEdgeFunction("approve-verification", { method: "POST", body: data }, token);
  });

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
  .handler(async ({ data }) => {
    const token = readAccessToken();
    if (!token) return { ok: false, status: 401, error: "Please sign in.", data: null };
    return callEdgeFunction("update-visibility", { method: "POST", body: data }, token);
  });

export const updateVisibility = (input: UpdateVisibilityInput) =>
  updateVisibilityFn({ data: input });

// ---------------------------------------------------------------------------
// Reads — the raw REST endpoints for `community_directory` and
// `verification_requests` are locked down; reads go through Edge Functions
// that enforce visibility server-side and require a signed-in token.
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
    const token = readAccessToken();
    if (!token) return { data: null, error: "Please sign in." };
    const result = await callEdgeFunction(
      "get-community-directory",
      { method: "GET", params: { community_id: communityId } },
      token,
    );
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
    const token = readAccessToken();
    if (!token) return { data: null, error: "Please sign in." };
    const result = await callEdgeFunction(
      "get-approval-queue",
      { method: "GET", params: { community_id: communityId } },
      token,
    );
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
  return entry.display_name?.trim() || "NeighborSpace Resident";
}
