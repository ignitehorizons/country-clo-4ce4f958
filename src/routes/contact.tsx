import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CC_Layout } from "@/components/CC_Layout";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useMeta } from "@/hooks/useMeta";
import { trackLeadSubmission } from "@/lib/leadTracking";
import { Check, Loader2, AlertCircle } from "lucide-react";

const inputClass =
  "w-full p-[12px_16px] border border-border rounded-[10px] font-body text-[15px] text-text bg-white focus:border-accent focus:outline-hidden focus:ring-[3px] focus:ring-accent/15 transition-all";
const labelClass =
  "block font-body font-semibold text-[13px] text-bark tracking-[0.3px] mb-[6px]";

function CC_Contact() {
  useScrollReveal();
  useMeta({
    title: "Contact | neighborspace",
    description:
      "Book a free demo or talk to the neighborspace team about your community. We'll map the right plan to your HOA, condo association, or neighborhood.",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = e.currentTarget as HTMLFormElement;
    const get = (id: string) =>
      (form.querySelector(`#${id}`) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null)
        ?.value ?? "";

    const data = {
      firstName: get("firstName"),
      lastName: get("lastName"),
      email: get("email"),
      phone: get("phone"),
      communityName: get("communityName"),
      unitCount: get("unitCount"),
      role: get("role"),
      message: get("message"),
    };

    try {
      trackLeadSubmission(data);
      setStatus("success");
      form.reset();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setStatus("error");
      setError("We couldn't send your request. Please try again.");
    }
  };

  return (
    <CC_Layout>
      {/* HERO */}
      <section className="bg-primary px-6 py-[100px] text-center">
        <div className="mx-auto max-w-3xl reveal-on-scroll">
          <span className="font-body text-[13px] font-semibold uppercase tracking-[2px] text-accent">
            Contact
          </span>
          <h1 className="mt-4 font-display text-[clamp(36px,6vw,64px)] font-extrabold text-white leading-tight">
            Let's see if neighborspace fits.
          </h1>
          <p className="mt-5 font-body text-[20px] font-light text-white/80">
            Book a free 20-minute demo or send us a note. We'll walk you through the platform with
            your community's data and map the right plan.
          </p>
        </div>
      </section>

      {/* FORM + INFO */}
      <section className="bg-cream px-6 md:px-10 py-[80px]">
        <div className="mx-auto max-w-5xl grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr]">
          {/* FORM */}
          <div className="reveal-on-scroll">
            {status === "success" ? (
              <div className="rounded-2xl border border-accent/30 bg-white p-10 text-center shadow-sm">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Check className="h-8 w-8" />
                </div>
                <h2 className="font-display text-[26px] font-bold text-bark">Request received</h2>
                <p className="mt-3 font-body text-[16px] text-text-light max-w-md mx-auto">
                  Thanks — we'll be in touch within one business day to schedule your demo.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-border bg-white p-6 md:p-10 shadow-sm"
              >
                <h2 className="font-display text-[24px] font-bold text-bark mb-2">
                  Request a demo
                </h2>
                <p className="font-body text-[14px] text-text-light mb-6">
                  Tell us about your community and we'll show you neighborspace in action.
                </p>

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
                      <input id="firstName" type="text" required className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="lastName" className={labelClass}>
                        Last name <span className="text-accent">*</span>
                      </label>
                      <input id="lastName" type="text" required className={inputClass} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="email" className={labelClass}>
                        Email <span className="text-accent">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="you@community.org"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className={labelClass}>
                        Phone
                      </label>
                      <input id="phone" type="tel" placeholder="(555) 555-5555" className={inputClass} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="communityName" className={labelClass}>
                        Community name
                      </label>
                      <input id="communityName" type="text" className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="unitCount" className={labelClass}>
                        Number of units
                      </label>
                      <input id="unitCount" type="number" min="1" className={inputClass} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="role" className={labelClass}>
                      Your role
                    </label>
                    <select id="role" className={inputClass}>
                      <option value="">Select one</option>
                      <option value="board">Board member</option>
                      <option value="manager">Property manager</option>
                      <option value="resident">Resident</option>
                      <option value="developer">Developer / builder</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className={labelClass}>
                      What are you looking for?
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      placeholder="Tell us about your community and what you're hoping to solve."
                      className={inputClass}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="inline-flex w-full items-center justify-center h-13 rounded-[100px] bg-accent px-8 py-3 font-body text-[16px] font-bold text-white transition-all hover:bg-accent-hover hover:translate-y-[-2px] disabled:opacity-60 disabled:hover:translate-y-0"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending…
                      </>
                    ) : (
                      "Request demo"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* INFO SIDEBAR */}
          <div className="reveal-on-scroll stagger-1">
            <div className="rounded-2xl bg-primary p-8 text-white">
              <h3 className="font-display text-[20px] font-bold">What happens next</h3>
              <ul className="mt-6 space-y-4">
                {[
                  "We review your community's needs",
                  "A 20-minute walkthrough on your schedule",
                  "We map the right plan and price",
                  "Onboarding and data migration included",
                ].map((step) => (
                  <li key={step} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <span className="font-body text-[15px] text-white/90">{step}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="font-body text-[13px] text-white/60">Prefer email?</p>
                <a
                  href="mailto:hello@neighborspace.app"
                  className="mt-1 inline-block font-body text-[15px] font-semibold text-accent hover:underline"
                >
                  hello@neighborspace.app
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </CC_Layout>
  );
}

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | neighborspace" },
      {
        name: "description",
        content:
          "Book a free demo or talk to the neighborspace team about your community. We'll map the right plan to your HOA, condo association, or neighborhood.",
      },
      { property: "og:title", content: "Contact | neighborspace" },
      {
        property: "og:description",
        content:
          "Book a free demo or talk to the neighborspace team about your community.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CC_Contact,
});

export default CC_Contact;