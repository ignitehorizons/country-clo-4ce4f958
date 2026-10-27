// Calendar booking helpers — wired to the connected Lead Capture Calendar.
// Calendar ID: D1dFItOGVRlK5ITa5aS7  ·  Location ID: fTWpkc2JrzTyLdcaKxJD

const BOOKING_API_URL = "https://backend.leadconnectorhq.com";
const VIBE_API_URL = "https://backend.leadconnectorhq.com/vibe-ai";

export const CALENDAR_ID = "D1dFItOGVRlK5ITa5aS7";
export const LOCATION_ID = "fTWpkc2JrzTyLdcaKxJD";

type RegisteredCustomFieldId = string;
type CustomFieldValue = { id: RegisteredCustomFieldId; field_value: string };

export type BookingPayload = {
  locationId: string;
  calendarId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  selectedSlot: string;
  selectedTimezone?: string;
  sessionId?: string;
  customFields?: CustomFieldValue[];
} & Partial<
  Record<
    | "notes"
    | "address1"
    | "city"
    | "state"
    | "postalCode"
    | "country"
    | "companyName"
    | "website"
    | "gender"
    | "dateOfBirth"
    | "timezone",
    string
  >
>;

export const getBrowserTimezone = () => Intl.DateTimeFormat().resolvedOptions().timeZone;

const clampAvailabilityRange = (startMs: number, endMs: number) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startDate = Math.max(startMs, today.getTime());
  const maxEndDate = startDate + 31 * 24 * 60 * 60 * 1000;
  const endDate = Math.min(Math.max(endMs, startDate), maxEndDate);

  return { startDate, endDate };
};

export type FreeSlotsResponse = Record<string, { slots: string[] }>;

export const fetchCalendarFreeSlots = async (
  calendarId: string,
  startMs: number,
  endMs: number,
): Promise<FreeSlotsResponse> => {
  const { startDate, endDate } = clampAvailabilityRange(startMs, endMs);
  const params = new URLSearchParams({
    startDate: String(startDate),
    endDate: String(endDate),
    timezone: getBrowserTimezone(),
  });

  const response = await fetch(`${BOOKING_API_URL}/calendars/${calendarId}/free-slots?${params}`, {
    headers: { version: "2021-07-28" },
  });
  if (!response.ok) throw new Error("Failed to fetch calendar availability");
  return response.json() as Promise<FreeSlotsResponse>;
};

export const submitCalendarBooking = async (payload: BookingPayload) => {
  const response = await fetch(`${VIBE_API_URL}/booking/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      selectedTimezone: payload.selectedTimezone ?? getBrowserTimezone(),
      sessionId: payload.sessionId ?? crypto.randomUUID(),
      customFields: payload.customFields ?? [],
    }),
  });

  if (!response.ok) throw new Error("Booking submission failed");
  return response.json();
};

// Format an ISO slot string into a friendly local time label.
export const formatSlotLabel = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
};

// Format an ISO slot string into a friendly date label.
export const formatSlotDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

// Build a 14-day window starting today for the date picker.
export const getInitialRange = () => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 13);
  return { startMs: start.getTime(), endMs: end.getTime() };
};
