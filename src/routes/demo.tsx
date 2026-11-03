import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CC_Layout } from "@/components/CC_Layout";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useMeta } from "@/hooks/useMeta";
import {
  CALENDAR_ID,
  LOCATION_ID,
  fetchCalendarFreeSlots,
  submitCalendarBooking,
  formatSlotLabel,
  formatSlotDate,
  getInitialRange,
  getBrowserTimezone,
  type FreeSlotsResponse,
} from "@/lib/calendarBooking";
import { Check, Loader2, AlertCircle, CalendarClock, ArrowRight } from "lucide-react";

const inputClass =
  "w-full p-[12px_16px] border border-border rounded-[10px] font-body text-[15px] text-text bg-white focus:border-accent focus:outline-hidden focus:ring-[3px] focus:ring-accent/15 transition-all";
const labelClass = "block font-body font-semibold text-[13px] text-bark tracking-[0.3px] mb-[6px]";

// Custom field IDs registered for this booking flow.
const CF_AUDIENCE = "R5Yyj2MAelvenu1j9Eu3";
const CF_COMMUNITY = "J1tYGmH1Z8QkFk8UT9h2";

function CC_Demo() {
  useScrollReveal();
  useMeta({
    title: "Book a Demo | NeighborSpace",
    description:
      "Book a free 20-minute demo of NeighborSpace. See the platform with your community's data — for HOAs, condo associations, neighborhoods, property managers, and builders.",
  });

  const { startMs, endMs } = useMemo(() => getInitialRange(), []);
  const [slotsByDate, setSlotsByDate] = useState<FreeSlotsResponse>({});
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [slotsError, setSlotsError] = useState<string | null>(null);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoadingSlots(true);
    setSlotsError(null);
    fetchCalendarFreeSlots(CALENDAR_ID, startMs, endMs)
      .then((data) => {
        if (!cancelled) setSlotsByDate(data);
      })
      .catch(() => {
        if (!cancelled)
          setSlotsError("We couldn't load available times. Please try again shortly.");
      })
      .finally(() => {
        if (!cancelled) setLoadingSlots(false);
      });
    return () => {
      cancelled = true;
    };
  }, [startMs, endMs]);

  const datesWithSlots = useMemo(
    () =>
      Object.keys(slotsByDate)
        .filter((d) => slotsByDate[d]?.slots?.length)
        .sort(),
    [slotsByDate],
  );

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) {
      setStatus("error");
      setError("Please pick a time for your demo.");
      return;
    }

    setStatus("submitting");
    setError(null);

    const form = e.currentTarget as HTMLFormElement;
    const get = (id: string) =>
      (
        form.querySelector(`#${id}`) as
          HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null
      )?.value ?? "";

    try {
      await submitCalendarBooking({
        locationId: LOCATION_ID,
        calendarId: CALENDAR_ID,
        firstName: get("firstName"),
        lastName: get("lastName"),
        email: get("email"),
        phone: get("phone"),
        selectedSlot,
        selectedTimezone: getBrowserTimezone(),
        notes: get("message"),
        customFields: [
          { id: CF_AUDIENCE, field_value: get("audience") },
          { id: CF_COMMUNITY, field_value: get("communityName") },
        ],
      });
      setStatus("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setStatus("error");
      setError("We couldn't book your demo. Please try again or email hello@neighborspace.app.");
    }
  };

  return (
    <CC_Layout>
      {/* HERO */}
      <section className="bg-primary px-6 py-[100px] text-center">
        <div className="mx-auto max-w-3xl reveal-on-scroll">
          <span className="font-body text-[13px] font-semibold uppercase tracking-[2px] text-accent">
            Book a Demo
          </span>
          <h1 className="mt-4 font-display text-[clamp(36px,6vw,64px)] font-extrabold text-white leading-tight">
            See NeighborSpace with your data.
          </h1>
          <p className="mt-5 font-body text-[20px] font-light text-white/80">
            A free 20-minute walkthrough for boards, managers, and builders. We'll load your
            community's records and map the right setup — no pressure, no obligation.
          </p>
        </div>
      </section>

      {/* BOOKING */}
      <section className="bg-cream px-6 md:px-10 py-[80px]">
        <div className="mx-auto max-w-5xl">
          {status === "success" ? (
            <div className="mx-auto max-w-xl rounded-2xl border border-accent/30 bg-white p-10 text-center shadow-sm reveal-on-scroll">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
                <Check className="h-8 w-8" />
              </div>
              <h2 className="font-display text-[26px] font-bold text-bark">You're booked</h2>
              <p className="mt-3 font-body text-[16px] text-text-light">
                We've sent a confirmation to your email with a calendar invite. Talk soon!
              </p>
              <p className="mt-4 font-body text-[14px] text-text-light">
                Need to reschedule? Just reply to the confirmation email.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr]"
            >
              {/* LEFT — details form */}
              <div className="rounded-2xl border border-border bg-white p-6 md:p-8 shadow-sm reveal-on-scroll">
                <div className="mb-6 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <CalendarClock className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="font-display text-[20px] font-bold text-bark">Your details</h2>
                    <p className="font-body text-[13px] text-text-light">
                      Tell us about you and your community.
                    </p>
                  </div>
                </div>

                {status === "error" && error && (
                  <div className="mb-5 flex items-start gap-3 rounded-lg border border-[#C0392B]/30 bg-[#C0392B]/5 p-4">
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#C0392B]" />
                    <p className="font-body text-[14px] text-text">{error}</p>
                  </div>
                )}

                <div className="space-y-5">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className={labelClass}>
                        First name <span className="text-accent">*</span>
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className={labelClass}>
                        Last name <span className="text-accent">*</span>
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="email" className={labelClass}>
                        Email <span className="text-accent">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="you@community.org"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className={labelClass}>
                        Phone <span className="text-accent">*</span>
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="(555) 555-5555"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="audience" className={labelClass}>
                      I am a <span className="text-accent">*</span>
                    </label>
                    <select id="audience" name="audience" required className={inputClass}>
                      <option value="">Select one</option>
                      <option value="HOA / Condo Association">HOA / Condo Association</option>
                      <option value="Property Manager">Property Manager</option>
                      <option value="Developer / Builder">Developer / Builder</option>
                      <option value="Resident">Resident</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="communityName" className={labelClass}>
                      Community or project name
                    </label>
                    <input
                      id="communityName"
                      name="communityName"
                      type="text"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className={labelClass}>
                      Anything you want us to cover?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      placeholder="Tell us what you're hoping to solve."
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              {/* RIGHT — calendar / time picker */}
              <div className="rounded-2xl border border-border bg-white p-6 md:p-8 shadow-sm reveal-on-scroll stagger-1">
                <h2 className="font-display text-[20px] font-bold text-bark mb-1">Pick a time</h2>
                <p className="font-body text-[13px] text-text-light mb-6">
                  Times shown in your local timezone ({getBrowserTimezone()}).
                </p>

                {loadingSlots ? (
                  <div className="flex flex-col items-center justify-center py-16 text-text-light">
                    <Loader2 className="h-8 w-8 animate-spin text-accent" />
                    <p className="mt-4 font-body text-[14px]">Loading availability…</p>
                  </div>
                ) : slotsError ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <AlertCircle className="h-8 w-8 text-[#C0392B]" />
                    <p className="mt-4 font-body text-[14px] text-text">{slotsError}</p>
                  </div>
                ) : datesWithSlots.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <p className="font-body text-[15px] text-text">
                      No open demo slots in the next two weeks.
                    </p>
                    <p className="mt-2 font-body text-[13px] text-text-light">
                      Email{" "}
                      <a
                        href="mailto:hello@neighborspace.app"
                        className="font-semibold text-accent hover:underline"
                      >
                        hello@neighborspace.app
                      </a>{" "}
                      and we'll find a time.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_1fr]">
                    {/* Date list */}
                    <div className="flex max-h-[360px] flex-col gap-2 overflow-y-auto pr-1">
                      {datesWithSlots.map((date) => {
                        const daySlots = slotsByDate[date]?.slots ?? [];
                        const sample: string = daySlots[0] ?? date;
                        return (
                          <button
                            key={date}
                            type="button"
                            onClick={() => handleDateClick(date)}
                            className={`flex items-center justify-between rounded-lg border px-4 py-3 text-left transition-all ${
                              selectedDate === date
                                ? "border-accent bg-accent/5"
                                : "border-border bg-white hover:border-accent/50"
                            }`}
                          >
                            <span className="font-body text-[14px] font-semibold text-bark">
                              {formatSlotDate(sample)}
                            </span>
                            <span className="font-body text-[12px] text-text-light">
                              {daySlots.length} open
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Time list */}
                    <div className="flex max-h-[360px] flex-col gap-2 overflow-y-auto pr-1">
                      {selectedDate ? (
                        (slotsByDate[selectedDate]?.slots ?? []).map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedSlot(slot)}
                            className={`flex items-center justify-between rounded-lg border px-4 py-3 text-left transition-all ${
                              selectedSlot === slot
                                ? "border-accent bg-accent text-white"
                                : "border-border bg-white text-text hover:border-accent/50"
                            }`}
                          >
                            <span className="font-body text-[14px] font-semibold">
                              {formatSlotLabel(slot)}
                            </span>
                            {selectedSlot === slot && <Check className="h-4 w-4" />}
                          </button>
                        ))
                      ) : (
                        <div className="flex h-full items-center justify-center text-center">
                          <p className="font-body text-[14px] text-text-light">
                            Pick a date to see open times.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Submit */}
                {!loadingSlots && !slotsError && datesWithSlots.length > 0 && (
                  <div className="mt-8 border-t border-border pt-6">
                    {selectedSlot && (
                      <p className="mb-4 font-body text-[14px] text-text">
                        <span className="text-text-light">Selected: </span>
                        <span className="font-semibold text-bark">
                          {formatSlotDate(selectedSlot)} at {formatSlotLabel(selectedSlot)}
                        </span>
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={status === "submitting" || !selectedSlot}
                      className="inline-flex w-full items-center justify-center h-13 rounded-[100px] bg-accent px-8 py-3 font-body text-[16px] font-bold text-white transition-all hover:bg-accent-hover hover:translate-y-[-2px] disabled:opacity-50 disabled:hover:translate-y-0"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Booking…
                        </>
                      ) : (
                        <>
                          Confirm booking <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </form>
          )}
        </div>
      </section>
    </CC_Layout>
  );
}

export const Route = createFileRoute("/demo")({
  head: () => ({
    meta: [
      { title: "Book a Demo | NeighborSpace" },
      {
        name: "description",
        content:
          "Book a free 20-minute demo of NeighborSpace. See the platform with your community's data — for HOAs, condo associations, neighborhoods, property managers, and builders.",
      },
      { property: "og:title", content: "Book a Demo | NeighborSpace" },
      {
        property: "og:description",
        content:
          "Book a free 20-minute demo of NeighborSpace for your HOA, condo association, neighborhood, or development.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CC_Demo,
});
