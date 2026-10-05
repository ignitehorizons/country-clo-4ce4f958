# Architecture — how this codebase works

Last updated: Oct 5, 2026. This project replaced the earlier Vite-based CountryClose project on Oct 3, 2026. Prompts written for the old project assume a different structure, so check them against this file before running them.

## Stack

- **TanStack Start** (React 19, TypeScript, Vite, Tailwind CSS 4, shadcn/ui), server-rendered, running on Cloudflare.
- **Supabase** project `zeahayvgryejecchsffa` for data and Edge Functions.
- **Mapbox** for maps, through `react-map-gl`.
- The CRM receives Join form submissions through its external-tracking endpoint (`src/lib/joinTracking.ts`).

## Folder layout

| Path | Contains | Rules |
|---|---|---|
| `src/routes/` | One file per URL (TanStack file-based routing) | Keep route files thin: import a view, set the page title, wrap in a feature guard if needed. |
| `src/routes/portal/route.tsx` | Layout for every `/portal/*` page: sign-in gate + portal shell | Every portal page sits under this. |
| `src/views/` | The page components (`CC_*.tsx`) | Page UI goes here, not in `src/routes/`. Do **not** create `src/pages/`. |
| `src/components/` | Shared `CC_*` components; `ui/` holds shadcn components | |
| `src/lib/supabaseClient.ts` | **All** Supabase access | See "Data access". |
| `src/lib/router-compat.tsx` | `Link`, `NavLink`, `useLocation`, `useNavigate`, `Outlet` | Components import these from here, not from `react-router-dom` (not installed). |
| `src/config/` | `communityConfig.ts` (per-community branding/settings), `featureFlags.ts` | |
| `src/context/CC_AuthContext.tsx` | Current role and sign-in state | See "Sign-in". |
| `src/styles.css` | Theme, brand colors, global styles | See "Styling". |
| `src/routeTree.gen.ts` | Generated route tree | **Never edit by hand.** |

To add a page: create the view in `src/views/`, then a route file in `src/routes/` that renders it.

## Data access (Supabase)

- The browser never talks to Supabase directly and never sees a Supabase URL or key.
- Every call goes through a **server function** in `src/lib/supabaseClient.ts` (`createServerFn`). The server function reads the Secrets and calls the Edge Function.
- Pages call the exported helpers: `submitApplication`, `approveVerification`, `updateVisibility`, `fetchCommunityResidents`, `fetchResident`, `fetchPendingVerifications`.
- Helpers return `{ ok, status, error, data }` or `{ data, error }`. Network failures and missing Secrets come back as `ok: false` with a readable error; they do not throw. Pages must handle the error state.
- New backend features follow the same pattern: add a server function in `src/lib/`, never a client-side Supabase call.
- `@supabase/supabase-js` is installed for future Auth work but not used yet.

## Secrets

Set in the project's Settings → Secrets. Read only inside server functions via `process.env`.

| Secret | Used for |
|---|---|
| `SUPABASE_URL` | Base URL for Edge Function calls |
| `SUPABASE_PUBLISHABLE_KEY` | Authorization header for Edge Function calls |
| `MAPBOX_PUBLIC_TOKEN` | Map tiles; sent to the browser by the `getMapboxToken` server function |

A new key = a new Secret plus a server function that reads it. Never put a key in source, config files, or docs.

## Sign-in — prototype only

- `CC_AuthContext` is a **demo** sign-in: the portal accepts any email and password, and the role is stored in the browser. A role-switch button appears in dev mode.
- `TEST_BOARD_USER_ID` and `TEST_RESIDENT_USER_ID` in `supabaseClient.ts` are hard-coded test users: every approval is recorded as the test board member, and the Profile privacy settings edit the test resident.
- The Edge Functions run with `verify_jwt: false` and trust the user IDs they are sent.
- **Before real resident data or any violations-module work:** add Supabase Auth, pass the signed-in user's session to the server functions, and have the Edge Functions verify it. Do not build features that depend on "who is signed in" on top of the demo sign-in.

## Server rendering rules

Pages are rendered on the server first, then in the browser.
- Do not use `window`, `document`, `localStorage`, or `navigator` while rendering. Use them inside `useEffect` or event handlers.
- Browser-only libraries (like `mapbox-gl`) load lazily on the client; see `CC_LazyMap.tsx`.

## Feature flags and tiers

- `src/config/featureFlags.ts` lists features by tier; `CC_FeatureGuard` wraps portal routes and shows "Upgrade Required" when a feature is off. Admin and board roles bypass the guard.
- Flags are currently fixed values in code, not per-community data. See `decisions.md`.

## Styling

- Brand: deep oak green `#2D5016`, warm stone tan `#C4A875`, sunlit gold `#E8A020`; Playfair Display (headings) and Lato (body).
- Brand colors are Tailwind classes (`bg-primary`, `text-bark`, `bg-cream`, `text-accent`…) defined in `src/styles.css`.
- `src/styles.css` contains a **"Tailwind v3 `space-*` behaviour"** block. It keeps form and card spacing identical to the original design. Do not remove it.
- The shadcn components in `src/components/ui/` that the pages use (button, input, select, dialog, card, etc.) are intentionally the original sizes. Do not regenerate or "update" them.

## Maps

- `CC_LazyMap` loads the map only when it scrolls into view; `CC_Map` renders it.
- The community outline (Source + Layers) is built with `createElement` on purpose: in the dev preview, JSX map layers get extra props that Mapbox rejects. Keep that pattern for any new map layers.

## Checks before finishing any change

1. Typecheck and build pass.
2. The changed pages load in the preview with no console errors, at phone and desktop widths.
3. If data is involved: show the real response (JSON) from the server function, not a description of it.
