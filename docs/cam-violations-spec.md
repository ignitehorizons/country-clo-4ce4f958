# CAM Violations Module — Spec v1

| | |
|---|---|
| Status | Approved concept · Oct 3, 2026 |
| Owner | Jeremy Sidlauskas / Ignite Horizons |
| Role | Source of truth for the build |
| Build method | One phased prompt at a time → run in the builder → self-verified with real output (SQL, JSON, screenshots), not assertions |

> Transcribed from the rendered spec of Oct 3, 2026. The original markdown in the planning project is the master copy: if the two differ, replace this file with the master.
> Implementation notes for this codebase are marked **[Build note]** and are not part of the approved spec.

## §1 Architecture decisions — locked

- **Module, not a separate app.** Lives inside CountryClose on the same Supabase project (`zeahayvgryejecchsffa`). One source of truth.
- **PWA first.** Camera and GPS via browser APIs. Native app only if offline or background needs prove it necessary.
- **Security.** Default-deny RLS on every new table. Sensitive reads and writes go through Edge Functions with the service role key, same as the existing 5 functions.
- **Feature flag.** `violations_module` per community and tier. Standard tier and up.
- **Configurable, not hardcoded.** Rules, cure periods, fines, escalation steps, notice routing, and templates are per-community data.
- **Photos.** Private Supabase Storage bucket with signed, expiring URLs only. Never public.

**[Build note]** In this codebase the browser calls server functions in `src/lib/`, which call the Edge Functions (see `architecture.md`). Real sign-in (Supabase Auth, verified in the Edge Functions) is a prerequisite: issuer identity, CAM license, owner-only views and board-only voiding all depend on knowing who is signed in.

## §2 Data model — draft, verify against the live schema in Phase 0

| Table | Purpose | Key fields |
|---|---|---|
| `violation_rules` | Per-community rules library | community_id, citation, rule_text, category, cure_days, fine_schedule (json), fineable (bool), statutory_block (bool + note), version, effective_date, active |
| `violations` | Core record | id, community_id, violation_number (null until submit), draft_id, status, property_id, owner snapshot (name/address/phone/email), rule_id + rule_text_snapshot, narrative, lat, lng, gps_accuracy_m, issued_by_user_id, issued_by_name, cam_license_no, created_at, submitted_at, delivered_at, cure_deadline, paused (bool + reason), closed_at, close_reason |
| `violation_photos` | Evidence | violation_id, storage_path, sha256_hash, exif_json, lat, lng, captured_at, uploaded_by, phase (initial / reinspection / owner_proof) |
| `violation_comments` | Shared thread (owner + association) | violation_id, author_user_id, author_name, author_role, body, created_at — append-only |
| `violation_internal_notes` | Board/CAM only, never owner-visible | same shape as comments |
| `violation_events` | Immutable audit log | violation_id, event_type (created, autosave, submitted, notice_sent, delivered, bounced, email_opened, portal_viewed, status_change, amended, voided, hearing_scheduled, fine_decision…), actor, metadata json, created_at |
| `violation_routing` | Per-community notice recipients | community_id, role/user, channel (email/SMS/mail), copy_type (to/cc) |
| `violation_counters` | Gapless numbering | community_id, year, last_number |
| `violation_hearings` | FL 720.305 hearing stage | violation_id, notice_sent_at, hearing_date, committee_members (json), decision, findings_sent_at, fine_amount, fine_due_date |
| `owner_notice_consent` | Electronic-notice consent | owner/user id, email_consent (bool), consent_date, mailing_address |

## §3 Form spec: New Violation

| # | Field | Behavior |
|---|---|---|
| 1 | Violation Number | Draft gets a temporary `DRAFT-xxxx`. Official number (e.g., `CC-2026-0042`) is assigned atomically at submit from `violation_counters`. No recycling, no gaps. |
| 2 | Date/Time | Auto-stamped on open. Server time, not device time. |
| 3 | Owner info | Address entry, or GPS-suggested nearest address that the CAM confirms, pulls owner name, phone, and email from the database. Snapshot saved on the record. Fallback: property records lookup if the owner isn't registered. Supports "Unassigned / Pending ID" (e.g., vehicles). |
| 4 | Nature of Violation | Type-ahead against `violation_rules`, plus "Other" with free text. Rule text snapshotted on save. Warns on or blocks statutorily prohibited fines. |
| 5 | Narrative | Required free text. |
| 6 | Photos | Multiple, via phone camera. Stamps GPS and timestamp, keeps the original, stores a SHA-256 hash. |
| 7 | Signature | "Issued by [CAM name], CAM License #[x]", filled from the login. Electronic attestation logged. |
| 8 | Comments | Visible to owner and association. Auto user and timestamp. Append-only. Separate internal notes. |

- **Auto-save:** every field change writes to the draft and logs a throttled autosave event. Abandoned drafts are purged after a configurable number of days.
- **Lock on submit:** post-submit edits become logged amendments with a required reason. Voiding requires a board role.

## §4 Status lifecycle

Draft → Issued → Delivered → Viewed → In Cure → Re-inspection →
- **Cured:** Cured → Closed
- **Not cured:** Escalated (2nd notice) → Hearing Scheduled → Fine Approved / Denied → Paid / Closed
- **Exit:** Dismissed / Voided

- Courtesy notice step is optional per community.
- Repeat-offender flag: same rule and same address within X months.

## §5 Color coding

The clock starts at delivery, not creation. Color follows the percentage of the cure period elapsed, so it works for any cure length.

| Color | Meaning |
|---|---|
| Green | 0–50% of cure period elapsed |
| Yellow | 50–100% |
| Red | 100%+ (past deadline) |
| Gray | Closed |
| Blue / striped | Paused (extension, hearing pending) |

## §6 Notices & tracking

- On submit, the notice goes to the owner, with copies per `violation_routing` (CAM, assigned board members). Fully configurable per community.
- The email carries a secure link to the violation in the owner portal. Portal views are the primary "reviewed" evidence, with each view logged. The email open pixel is secondary only, since Apple Mail inflates opens and Outlook blocks them.
- Delivered and bounced are tracked. A bounce alerts the CAM to mail a paper copy.
- No email consent on file → generate a mail-ready PDF, with a field for the certified mail tracking number.

**What the owner sees, in order**
1. Violation data + photos
2. Cure instructions & deadline
3. Penalties for non-compliance
4. Comment thread
5. Request hearing / dispute
6. Upload proof-of-cure photos

**Decision pending:** send via the CRM's email/SMS or a transactional provider (Postmark/Resend) for delivery and bounce webhooks.

## §7 Florida compliance — HB 1203 / §720.305 · counsel to review

| Rule | Requirement |
|---|---|
| ≥14 days | Written notice before a fine, including description, corrective action, and hearing info. |
| ≥3 members | Hearing committee of members who are not officers, directors, employees, or their relatives. Held within 90 days of notice; may be electronic. |
| Cure first | Cured before hearing means no fine. The app must record the cure and block the fine. |
| 7 / 30 days | Written findings within 7 days of the hearing; fine due at least 30 days after. |
| No-fine items | Trash receptacles within 24 hours of pickup; holiday decorations unless more than one week after written notice. |
| Delivery | Notices go to the owner's designated mailing or email address on file. Electronic-notice consent is tracked. |

Not legal advice. Association counsel reviews templates and workflow before launch.

## §8 Dashboard, map & analytics

| View | Spec |
|---|---|
| Map | Pins for all open violations, colored by status. Filter by rule, status, date, CAM. |
| Table | Sortable and filterable by every field. Color-coded rows. Notification column: sent / delivered / viewed count + last viewed. |
| Export | CSV and Excel of the filtered view, with photo links and an option for full event history. |
| Charts | Most frequent violations; average days to close (overall and by rule); repeat addresses; aging buckets; cure rate; CAM workload; enforcement consistency report (selective-enforcement defense). |

## §9 Build phases — one prompt per step, each self-verified

| # | Phase | Scope |
|---|---|---|
| 0 | Recon | Confirm live schema (users, properties/addresses, communities, roles), existing Edge Function patterns, feature-flag config. Adjust §2. |
| 1 | Schema + RLS | Migrations for all tables, default-deny RLS, private storage bucket, counter function for atomic numbering. |
| 2 | Rules library | Admin UI to load and edit community rules; seed Country Close rules. |
| 3 | Edge Functions | Create/autosave draft, submit (assign number), get violation, add comment, upload photo, owner lookup by address, list/filter. |
| 4 | CAM mobile form (PWA) | Camera, GPS with nearest-address suggestion, rule type-ahead, auto-save, submit. |
| 5 | Notices | Routing config, email with portal link, PDF letter, delivery / bounce / open / view logging. |
| 6 | Owner portal view | Violation display, cure instructions, penalties, comments, proof upload, hearing request. |
| 7 | Lifecycle + timers | Status engine, color coding, re-inspection, escalation, hearing stage, pause. |
| 8 | Dashboard | Table, map, filters, export. |
| 9 | Analytics | Charts and consistency report. |
| 10 | Hardening | Security advisor review, audit-log immutability test, end-to-end field test at Country Close. |

## §10 Open decisions

- Email/SMS sender: the CRM vs. Postmark/Resend
- Map provider: Mapbox vs. Google Maps vs. Leaflet/OSM (cost)
- Offline mode in v1 or v2
- Property-records fallback source: Regrid / ATTOM / Pasco Property Appraiser
- Draft purge window; repeat-offender lookback window
- Tier placement: Standard vs. Enterprise add-on
