# CountryClose — project record (build reference)

Owner: Jeremy Sidlauskas / Ignite Horizons · As of Oct 3, 2026 · Pilot: CountryClose.com, 30-home beta at Country Close (Pasco County, FL)

Builder-relevant extract of the CountryClose project record. Business and pricing details are kept outside this project.

## Product

A white-labeled neighborhood and HOA community platform: the engagement and operations layer for neighborhoods. It integrates with existing accounting tools instead of replacing them.

- A master template is duplicated per community and rebranded through a config file (`src/config/communityConfig.ts`).
- Core components: homepage, forum/bulletin, resource directory, elected officials directory, resident registration and login.
- **Developer/Builder tier:** construction progress tracking, pre-sale landing pages, buyer portals, warranty management.
- **Builder-to-board handoff:** a designed authority-transfer lifecycle as the community matures.
- **Configurable roles:** corporate → community manager → lifestyle director → board → resident.
- **Every feature behind a tier flag**, so upgrades need no rebuild.

## Status (Oct 3, 2026)

| Area | Status |
|---|---|
| Core platform | Demo-ready, verified (WCAG 2.1 AA confirmed) |
| Supabase backend | 5 Edge Functions deployed and verified (demo scope) |
| CAM Violations module | Spec v1 approved Oct 3 — ready for Phase 0 |
| CRM backend | Admin building CRM, SMS, email workflows |
| App delivery | Web vs. PWA vs. App Store — decision pending |

## Backend

- **Supabase:** Postgres 17, project `zeahayvgryejecchsffa` (us-east-2). A second, inactive project in the same org is **not** CountryClose.
- **CRM & messaging:** CRM, automation, SMS, email; native SMS for resident verification.
- **Address verification:** USPS Address Validation API planned; Regrid or ATTOM for property records.

### Deployed Edge Functions

| Function | Notes |
|---|---|
| `submit-application` | Public resident application |
| `approve-verification` | POST: `verification_request_id`, `decision` (Approved / Denied), `reviewer_user_id` |
| `update-visibility` | Per-field PII opt-in toggles |
| `get-community-directory` | GET with `community_id` |
| `get-approval-queue` | Board review queue |

In this project they are called only from server functions in `src/lib/supabaseClient.ts` (see `architecture.md`).

## Security decisions

- RLS defaults restrictive. All sensitive reads go through Edge Functions with the service role key.
- A blanket `anon` SELECT on `verification_requests` was found to be an exposure and reverted.
- The `users.id` foreign key to `auth.users` was dropped; an optional `auth_user_id` lets unauthenticated applications work.
- `community_directory` is an intentional security-definer view for column-level visibility.
- Verification method is set per community: Board Approval, Automated, Hybrid, or Builder Managed.
- Commitment: CountryClose does not share or sell personal information without express permission.

## Design system

Colors drawn from the Country Close entrance. Deep oak green `#2D5016`, warm stone tan `#C4A875`, sunlit gold `#E8A020`. Type: Playfair Display with Lato.

## Risks to flag

Raised in planning sessions; each needs an owner and a decision.

- **Edge Functions run with `verify_jwt: false`.** Acceptable for the demo. Before real resident PII or violation data goes live, turn on JWT verification or add explicit auth checks inside each function.
- **Statutory compliance is enforced in code.** A wrong timer or a missed cure check could produce an unenforceable fine. Association counsel reviews templates and workflow before the first live notice.
- **Two parallel backends.** The CRM and Supabase both hold resident data. Decide which is the system of record for contacts so verification and notice routing don't drift.
- **Email opens are weak evidence.** Apple Mail inflates opens and Outlook blocks them; portal views are the proof of receipt.

## Recommended next moves

Suggestions from planning sessions, not decisions. Decisions live in `decisions.md`.

1. Run Phase 0 recon on the violations module and lock the data model.
2. Decide app delivery (PWA platform-wide was recommended).
3. Pick a transactional email provider (Postmark or Resend) for notices; keep the CRM for marketing and SMS.
4. Book a counsel review of the §720.305 workflow and notice templates while Phases 1–4 are built.
5. Line up the pilot field test: seed Country Close rules and schedule a walk-through with a CAM for Phase 10.

## How the build works

- One phased, sequenced prompt at a time, with exactly what to paste and when.
- Every prompt ends with self-verification that returns real output: JSON, SQL results, contrast ratios, grep.
- Premortem and phased planning before execution.
- Principles: integrate with accounting tools; restrictive security by default; generalize client requests into configurable features; every feature behind a tier flag.
