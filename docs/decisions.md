# Decisions

Update this file in the same change that acts on a decision. Move items from **Open** to **Locked** with the date and who decided.

## Locked

| Date | Decision | Source |
|---|---|---|
| Oct 3, 2026 | CAM Violations is a module inside CountryClose on Supabase project `zeahayvgryejecchsffa`, not a separate app | Violations spec §1 |
| Oct 3, 2026 | Violations: PWA first for camera and GPS; native only if offline/background needs require it | Violations spec §1 |
| Oct 3, 2026 | Default-deny RLS on every new table; private photo bucket with signed, expiring URLs | Violations spec §1 |
| Oct 3, 2026 | Rules, cure periods, fines, escalation, routing and templates are per-community data | Violations spec §1 |
| Oct 3, 2026 | Gapless violation numbering (e.g., `CC-2026-0042`) assigned atomically at submit; drafts auto-save | Violations spec §3 |
| Oct 3, 2026 | Portal views, not email opens, are the proof of receipt | Violations spec §6 |
| Oct 3, 2026 | This project replaces the earlier Vite-based project. Supabase is reached only through server functions; keys live in Secrets (`SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `MAPBOX_PUBLIC_TOKEN`) | Project migration |
| Earlier | `community_directory` is a security-definer view for column-level visibility; blanket `anon` SELECT on `verification_requests` reverted | Project record |
| Earlier | Verification method is set per community: Board Approval, Automated, Hybrid, or Builder Managed | Project record |

## Open

| Decision | Affects | Notes |
|---|---|---|
| **Real sign-in before violations work** | Phase 1 onward | The portal uses a demo sign-in and the Edge Functions run with `verify_jwt: false`. Issuer identity, owner-only views and board-only voiding need Supabase Auth plus session checks in the Edge Functions. Recommend doing this before Phase 1. |
| **Feature flags: naming and storage** | Violations flag, upsell | Code (`src/config/featureFlags.ts`) uses tiers Neighbor / Community / Association / Developer / Enterprise and already has a `violationTracking` flag at Association. The spec uses `violations_module` at Standard and up, per community. Flags are fixed in code today, not per-community data. Decide the tier names and whether flags move to the database. |
| App delivery: responsive web, PWA, or App Store / Google Play | Whole platform | Violations spec chose PWA first; extending it platform-wide keeps one codebase. |
| Notice sender: the CRM vs. Postmark / Resend | Violations Phase 5 | Legal notices need reliable delivery and bounce webhooks. |
| Map provider: Mapbox, Google Maps, or Leaflet/OSM | Violations Phase 8 | The site uses Mapbox today. Cost matters at portfolio scale. |
| Offline mode in v1 or v2 | Violations Phase 4 | Decides whether a PWA alone is enough for field use. |
| Property-records fallback: Regrid, ATTOM, or Pasco Property Appraiser | Verification + owner lookup | Shared by resident verification and violation owner lookup. |
| Draft purge window and repeat-offender lookback | Violations | Per-community defaults to set before Phase 1. |
| Tier placement of the violations module | Pricing | Spec says Standard and up. |
| Resident lifecycle (renters, moves, annual reconfirmation) | CRM | Planned as CRM workflows; custom address validation API. |
| System of record for resident contacts (CRM vs. Supabase) | Verification, notice routing | Both hold resident data today. |
