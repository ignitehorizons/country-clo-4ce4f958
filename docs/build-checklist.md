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
- ✅ `featureFlags.ts` — keep flags in code, tier names as-is (Decision #1 locked)

## Track 2 — CAM Violations module (per docs/cam-violations-spec.md §9)

- ✅ Phase 0 — Recon (live schema, edge-fn patterns, feature flags)
- 🟡 Phase 1 — Schema + RLS + private storage bucket + atomic gapless counter
  - ✅ Migration SQL written: `docs/cam-violations-phase1.sql` (tables, default-deny
    RLS, `next_violation_number()` atomic counter, append-only triggers on
    comments/events/internal-notes, private `violation-photos` storage bucket,
    Country Close rule seed). **ACTION: apply this SQL in the Supabase dashboard
    and add a `SUPABASE_SERVICE_ROLE_KEY` secret.**
  - ⬜ Wire `src/lib/violations.functions.ts` to live DB once migration applied
- ⬜ Phase 2 — Rules library admin UI + Country Close rule seed (seed included in Phase 1 SQL)
- ⬜ Phase 3 — Edge Functions (draft / autosave / submit / comment / photo / owner-lookup / list)
- 🟡 Phase 4 — CAM mobile PWA form (camera, GPS, type-ahead, autosave)
  - ✅ `/portal/violations` list + filters + status color coding (spec §5)
  - ✅ New Violation form (spec §3): address/owner, rule type-ahead + Other,
    narrative, GPS capture via `navigator.geolocation`, photo capture via
    `<input capture>`, CAM signature attestation, mock gapless numbering
  - ⬜ Offline draft queue + sync/conflict handling (Decision #4)
  - ⬜ PWA installability (service worker, manifest)
- ⬜ Phase 5 — Notices (routing, email+portal link, PDF, delivery/bounce/view logging)
- ⬜ Phase 6 — Owner portal violation view + proof upload + hearing request
- ⬜ Phase 7 — Lifecycle engine, re-inspection, escalation, hearings
- ⬜ Phase 8 — Dashboard (map, filters, export)
- ⬜ Phase 9 — Analytics + consistency report
- ⬜ Phase 10 — Hardening + field test

### Current mock layer
- `src/lib/violationsMock.ts` — types + seed rules + mock violations + color
  coding. Replace with `violations.functions.ts` calls once Phase 1 SQL is
  applied and the service-role key is added.

---

## Open Decisions — ALL LOCKED (2026-10-27)

1. ✅ Feature-flag approach: **keep flags in code** (`featureFlags.ts`), flip
   on/off per tier in config. No schema work. Tier names stay as-is.
2. ✅ Notice sender: **CRM (current integration)** — send notices through the
   connected CRM email/SMS. ⚠️ ACTION before Phase 5: confirm the CRM offers
   delivery + bounce webhooks; if not, revisit.
3. ✅ Map provider: **Mapbox (current)** — keep Mapbox (already installed, used
   in CC_Map). Revisit costs only if scale demands it.
4. ✅ Offline mode: **ship in v1** — CAMs can draft violations with no signal;
   drafts sync when back online. Phase 4 must include a local queue + conflict
   handling.
5. ✅ Property-records fallback: **Regrid** — parcel/owner data via API for
   owner-lookup when the community directory has no match. Usage-based pricing.
6. ✅ Drafts & lookback: **30-day auto-purge** of unsent drafts; **rolling
   12-month** repeat-offender lookback by address. Per-community overrides can
   come later.
7. ✅ Tier placement: **Standard (included)** — violations module available to
   all paying communities (Standard tier and up).
8. ✅ Resident contacts: **CRM is source of truth** — the app reads resident
   contacts from the CRM and writes updates back there; Supabase is not the
   system of record for contacts.

---

## Build implications from locked decisions
- Phase 4 (CAM mobile PWA): needs offline draft queue + sync/conflict handling
  + PWA installability + camera + GPS.
- Phase 3 (owner-lookup edge fn): wire Regrid API; key read inside the handler.
- Phase 1 (schema): add a draft purge job (30d) and a repeat-offender lookback
  view (rolling 12mo by address).
- Phase 5 (notices): confirm CRM delivery/bounce webhooks before wiring; if
  absent, escalate as a blocker.
- Resident-contact reads in portal views should go through the CRM integration,
  not a local Supabase contacts table.
