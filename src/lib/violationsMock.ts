// =============================================================================
// CAM Violations — client-safe mock data layer.
//
// This mirrors the Phase 1 schema (docs/cam-violations-phase1.sql §2) so the UI
// works in the preview before the migration is applied to the live Supabase
// project. Once the migration is applied and a SUPABASE_SERVICE_ROLE_KEY secret
// is added, replace these exports with server functions in
// src/lib/violations.functions.ts that call the Edge Functions / PostgREST.
// =============================================================================

export type ViolationStatus =
  | "Draft"
  | "Issued"
  | "Delivered"
  | "Viewed"
  | "InCure"
  | "Reinspection"
  | "Cured"
  | "Escalated"
  | "HearingScheduled"
  | "FineApproved"
  | "Paid"
  | "Closed"
  | "Dismissed"
  | "Voided";

export type ViolationColor = "green" | "yellow" | "red" | "gray" | "blue";

export interface ViolationRule {
  id: string;
  citation: string;
  rule_text: string;
  category: string;
  cure_days: number;
  fineable: boolean;
  statutory_block: boolean;
  statutory_note?: string | null;
}

export interface ViolationPhoto {
  id: string;
  thumb: string; // data URL for mock preview
  captured_at: string;
  lat: number | undefined;
  lng: number | undefined;
  phase: "initial" | "reinspection" | "owner_proof";
}

export interface Violation {
  id: string;
  violation_number: string | null;
  draft_id: string;
  status: ViolationStatus;
  address: string;
  owner_name: string;
  owner_phone: string;
  owner_email: string;
  rule_id: string;
  citation: string;
  rule_text_snapshot: string;
  narrative: string;
  lat: number | undefined;
  lng: number | undefined;
  gps_accuracy_m: number | undefined;
  issued_by_name: string;
  cam_license_no: string;
  created_at: string;
  submitted_at: string | null;
  delivered_at: string | null;
  cure_days: number;
  cure_deadline: string | null;
  paused: boolean;
  pause_reason: string | null;
  closed_at: string | null;
  photos: ViolationPhoto[];
}

// -- Rules library (seeded in the migration) ----------------------------------

export const VIOLATION_RULES: ViolationRule[] = [
  {
    id: "rule-6-1",
    citation: "CC&R 6.1",
    rule_text: "Lawns and landscaping must be maintained; grass may not exceed 6 inches.",
    category: "Property Maintenance",
    cure_days: 14,
    fineable: true,
    statutory_block: false,
  },
  {
    id: "rule-6-3",
    citation: "CC&R 6.3",
    rule_text: "Trash receptacles must be stored out of view except on collection day.",
    category: "Trash/Recycling",
    cure_days: 7,
    fineable: true,
    statutory_block: false,
  },
  {
    id: "rule-720",
    citation: "FL 720.305",
    rule_text: "Holiday decorations must be removed within one week after written notice.",
    category: "Aesthetics",
    cure_days: 7,
    fineable: true,
    statutory_block: true,
    statutory_note: "No-fine window per HB 1203; review with counsel.",
  },
  {
    id: "rule-7-2",
    citation: "CC&R 7.2",
    rule_text: "Vehicles must be parked in designated areas; no on-street overnight parking.",
    category: "Parking",
    cure_days: 7,
    fineable: true,
    statutory_block: false,
  },
  {
    id: "rule-8-1",
    citation: "CC&R 8.1",
    rule_text: "Pets must be leashed in common areas; owners must remove pet waste.",
    category: "Pets",
    cure_days: 7,
    fineable: true,
    statutory_block: false,
  },
  {
    id: "rule-5-4",
    citation: "CC&R 5.4",
    rule_text: "Exterior modifications require ARC approval before construction.",
    category: "Architectural",
    cure_days: 30,
    fineable: true,
    statutory_block: false,
  },
];

export const RULE_CATEGORIES = [
  "All",
  ...Array.from(new Set(VIOLATION_RULES.map((r) => r.category))),
];

// -- Mock violations ----------------------------------------------------------

const now = Date.now();
const days = (n: number) => n * 86400000;
const iso = (offsetMs: number) => new Date(now + offsetMs).toISOString();

export const MOCK_VIOLATIONS: Violation[] = [
  {
    id: "v1",
    violation_number: "CC-2026-0042",
    draft_id: "DRAFT-0042",
    status: "InCure",
    address: "1842 Country Close Dr",
    owner_name: "Marisol Reyes",
    owner_phone: "(813) 555-0142",
    owner_email: "m.reyes@example.com",
    rule_id: "rule-6-1",
    citation: "CC&R 6.1",
    rule_text_snapshot: "Lawns and landscaping must be maintained; grass may not exceed 6 inches.",
    narrative: "Front lawn overgrown, measured 9 inches along the sidewalk edge.",
    lat: 28.1739,
    lng: -82.4676,
    gps_accuracy_m: 4,
    issued_by_name: "Jeremy Sidlauskas",
    cam_license_no: "CAM-FL-9982",
    created_at: iso(-days(10)),
    submitted_at: iso(-days(9)),
    delivered_at: iso(-days(9)),
    cure_days: 14,
    cure_deadline: iso(days(5)),
    paused: false,
    pause_reason: null,
    closed_at: null,
    photos: [],
  },
  {
    id: "v2",
    violation_number: "CC-2026-0041",
    draft_id: "DRAFT-0041",
    status: "Escalated",
    address: "2107 Cypress Hollow Ln",
    owner_name: "Douglas Penn",
    owner_phone: "(813) 555-0199",
    owner_email: "d.penn@example.com",
    rule_id: "rule-7-2",
    citation: "CC&R 7.2",
    rule_text_snapshot:
      "Vehicles must be parked in designated areas; no on-street overnight parking.",
    narrative: "Commercial van parked on street overnight, third occurrence.",
    lat: 28.1745,
    lng: -82.4681,
    gps_accuracy_m: 6,
    issued_by_name: "Jeremy Sidlauskas",
    cam_license_no: "CAM-FL-9982",
    created_at: iso(-days(22)),
    submitted_at: iso(-days(21)),
    delivered_at: iso(-days(21)),
    cure_days: 7,
    cure_deadline: iso(-days(14)),
    paused: false,
    pause_reason: null,
    closed_at: null,
    photos: [],
  },
  {
    id: "v3",
    violation_number: "CC-2026-0040",
    draft_id: "DRAFT-0040",
    status: "Closed",
    address: "1603 Live Oak Ct",
    owner_name: "Aisha Bello",
    owner_phone: "(813) 555-0177",
    owner_email: "a.bello@example.com",
    rule_id: "rule-6-3",
    citation: "CC&R 6.3",
    rule_text_snapshot: "Trash receptacles must be stored out of view except on collection day.",
    narrative: "Bins left at curb four days after pickup.",
    lat: 28.1732,
    lng: -82.4671,
    gps_accuracy_m: 5,
    issued_by_name: "Jeremy Sidlauskas",
    cam_license_no: "CAM-FL-9982",
    created_at: iso(-days(40)),
    submitted_at: iso(-days(39)),
    delivered_at: iso(-days(39)),
    cure_days: 7,
    cure_deadline: iso(-days(32)),
    paused: false,
    pause_reason: null,
    closed_at: iso(-days(20)),
    photos: [],
  },
  {
    id: "v4",
    violation_number: null,
    draft_id: "DRAFT-0043",
    status: "Draft",
    address: "",
    owner_name: "",
    owner_phone: "",
    owner_email: "",
    rule_id: "",
    citation: "",
    rule_text_snapshot: "",
    narrative: "",
    lat: undefined,
    lng: undefined,
    gps_accuracy_m: undefined,
    issued_by_name: "Jeremy Sidlauskas",
    cam_license_no: "CAM-FL-9982",
    created_at: iso(-days(1)),
    submitted_at: null,
    delivered_at: null,
    cure_days: 14,
    cure_deadline: null,
    paused: false,
    pause_reason: null,
    closed_at: null,
    photos: [],
  },
];

// -- Color coding (spec §5) ---------------------------------------------------
// Clock starts at delivery, not creation. Color follows the percentage of the
// cure period elapsed.

export function colorForViolation(v: Violation): ViolationColor {
  if (v.status === "Closed" || v.status === "Dismissed" || v.status === "Voided") return "gray";
  if (v.paused) return "blue";
  if (!v.delivered_at || !v.cure_deadline) return "green";

  const total = new Date(v.cure_deadline).getTime() - new Date(v.delivered_at).getTime();
  if (total <= 0) return "red";
  const elapsed = now - new Date(v.delivered_at).getTime();
  const pct = elapsed / total;
  if (pct >= 1) return "red";
  if (pct >= 0.5) return "yellow";
  return "green";
}

export const COLOR_DOT: Record<ViolationColor, string> = {
  green: "bg-green-500",
  yellow: "bg-yellow-500",
  red: "bg-red-500",
  gray: "bg-gray-400",
  blue: "bg-sky-500",
};

export const COLOR_BORDER: Record<ViolationColor, string> = {
  green: "border-l-green-500",
  yellow: "border-l-yellow-500",
  red: "border-l-red-500",
  gray: "border-l-gray-400",
  blue: "border-l-sky-500",
};

export const STATUS_LABEL: Record<ViolationStatus, string> = {
  Draft: "Draft",
  Issued: "Issued",
  Delivered: "Delivered",
  Viewed: "Viewed",
  InCure: "In Cure",
  Reinspection: "Re-inspection",
  Cured: "Cured",
  Escalated: "Escalated",
  HearingScheduled: "Hearing Scheduled",
  FineApproved: "Fine Approved",
  Paid: "Paid",
  Closed: "Closed",
  Dismissed: "Dismissed",
  Voided: "Voided",
};

export const STATUS_BADGE: Record<ViolationStatus, string> = {
  Draft: "bg-gray-100 text-gray-700 border-gray-200",
  Issued: "bg-blue-50 text-blue-700 border-blue-200",
  Delivered: "bg-blue-50 text-blue-700 border-blue-200",
  Viewed: "bg-indigo-50 text-indigo-700 border-indigo-200",
  InCure: "bg-yellow-50 text-yellow-700 border-yellow-200",
  Reinspection: "bg-amber-50 text-amber-700 border-amber-200",
  Cured: "bg-green-50 text-green-700 border-green-200",
  Escalated: "bg-red-50 text-red-700 border-red-200",
  HearingScheduled: "bg-purple-50 text-purple-700 border-purple-200",
  FineApproved: "bg-red-50 text-red-700 border-red-200",
  Paid: "bg-green-50 text-green-700 border-green-200",
  Closed: "bg-gray-100 text-gray-600 border-gray-200",
  Dismissed: "bg-gray-100 text-gray-600 border-gray-200",
  Voided: "bg-gray-100 text-gray-500 border-gray-200",
};

export function formatDate(isoStr: string | null): string {
  if (!isoStr) return "—";
  return new Date(isoStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Assign the next gapless number from the mock counter (mirrors
// next_violation_number() in the migration). In the real backend this runs
// server-side under a row lock.
let mockCounter = 43;
export function nextMockNumber(): string {
  const n = mockCounter++;
  return `CC-2026-${String(n).padStart(4, "0")}`;
}

export function newDraftId(): string {
  return `DRAFT-${String(Math.floor(1000 + Math.random() * 9000))}`;
}
