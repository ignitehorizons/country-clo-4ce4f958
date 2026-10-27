# neighborspace — Running Build Checklist

> Living document. Update this after every work session so we never lose our
> place between sessions. Last updated: 2026-10-27.

Status legend: ✅ done · 🟡 in progress · ⬜ not started · ⛔ blocked (needs a decision)

---

## Track 1 — SaaS rebrand + conversion site

- ✅ Branding, copy, nav, footer rebranded to neighborspace
- ✅ Marketing routes: `/`, `/about`, `/features`, `/pricing`, `/demo`, `/join`,
  `/contact`, `/stories`, `/sponsors`, `/development`, `/privacy`, `/terms`
- ✅ `/pricing` with "schedule a demo" CTA
- ✅ `/demo` calendar booking wired to CRM calendar integration
- ✅ `/join` lead form → CRM form-tracking integration
- ✅ Checkout block wired to payments integration
- ✅ Beta / early-access tone pass across site copy
- ✅ Real Supabase Auth (Phase 0.5a) replacing demo localStorage sign-in
- ✅ DEV role-cycle button fixed (import.meta.env.DEV gated)
- ✅ Login page rebranded
- ⬜ Update docs to drop "CountryClose" references
  (architecture.md, project-record.md, decisions.md, cam-violations-spec.md, README.md)
- ⛔ `featureFlags.ts` tier names + `violationTracking` flag — see Open Decisions #1

## Track 2 — CAM Violations module (per docs/cam-violations-spec.md §9)

- ⬜ Phase 0 — Recon (live schema, edge-fn patterns, feature flags)
- ⬜ Phase 1 — Schema + RLS + private storage bucket + atomic gapless counter
- ⬜ Phase 2 — Rules library admin UI + Country Close rule seed
- ⬜ Phase 3 — Edge Functions (draft / autosave / submit / comment / photo / owner-lookup / list)
- ⬜ Phase 4 — CAM mobile PWA form (camera, GPS, type-ahead, autosave)
- ⬜ Phase 5 — Notices (routing, email+portal link, PDF, delivery/bounce/view logging)
- ⬜ Phase 6 — Owner portal violation view + proof upload + hearing request
- ⬜ Phase 7 — Lifecycle engine, color coding, re-inspection, escalation, hearings
- ⬜ Phase 8 — Dashboard (table, map, filters, export)
- ⬜ Phase 9 — Analytics + consistency report
- ⬜ Phase 10 — Hardening + field test

---

## Open Decisions (must lock before Phase 1)

### LOCKED (2026-10-27)
- ✅ #1 Feature-flag approach: **keep flags in code** (`featureFlags.ts`), flip
  on/off per tier in config. No schema work. Tier names stay as-is.
- ✅ #2 Notice sender: **CRM (current integration)** — send notices through the
  connected CRM email/SMS. ⚠️ ACTION: confirm the CRM offers delivery + bounce
  webhooks before Phase 5; if not, revisit.
- ✅ #3 Map provider: **Mapbox (current)** — keep Mapbox (already installed,
  used in CC_Map). Revisit costs only if scale demands it.
- ✅ #7 Tier placement: **Standard (included)** — violations module available
  to all paying communities (Standard tier and up).

### STILL OPEN
- ⛔ #4 Offline mode — ship in v1 or defer to v2?
- ⛔ #5 Property-records fallback — Regrid / ATTOM / Pasco Appraiser?
- ⛔ #6 Draft purge window + repeat-offender lookback — per-community defaults?
- ⛔ #8 System of record for resident contacts — CRM vs Supabase (both hold
  resident data today)?

---

## Notes
- Backend of record: Supabase project (Postgres 17). Cloud (managed backend)
  is available but not enabled — optional, user-controlled.
- Connected integrations: payments, form-tracking (CRM), calendar (CRM).
- Packages installed for violations work: @supabase/supabase-js, mapbox-gl,
  react-map-gl.
