import { Check } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export const CC_DevelopmentInterestForm = () => {
  useScrollReveal();

  return (
    <section id="interest-form" className="scroll-mt-20 bg-[#F7F3ED] px-10 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-[40px] md:grid-cols-2">
          {/* Form Column */}
          <div className="rounded-[16px] bg-white p-10 shadow-md md:p-12">
            <h2 className="mb-2 font-display text-[28px] font-bold text-[#4A3728]">Let's Talk</h2>
            <p className="mb-8 font-body text-[14px] text-[#7A6A5A]">
              Tell us about your development and we'll show you how CountryClose can help.
            </p>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const name = (form.elements.namedItem("name") as HTMLInputElement).value;
                const email = (form.elements.namedItem("email") as HTMLInputElement).value;
                const phone = (form.elements.namedItem("phone") as HTMLInputElement).value;
                const development = (form.elements.namedItem("development") as HTMLInputElement)
                  .value;
                const units = (form.elements.namedItem("units") as HTMLInputElement).value;
                const timeline = (form.elements.namedItem("timeline") as HTMLSelectElement).value;
                const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

                const trackingPayload = {
                  type: "external_form_submission",
                  timestamp: Date.now(),
                  formId: "Developer Interest Form",
                  formData: {
                    first_name: name.split(" ")[0] || "",
                    last_name: name.split(" ").slice(1).join(" ") || "",
                    email: email,
                    phone: phone,
                    "contact.development__project_name": development,
                    "contact.number_of_homes_or_units": units,
                    "contact.estimated_project_timeline": timeline,
                    "contact.message__questions": message,
                  },
                  formLabels: {
                    first_name: "First Name",
                    last_name: "Last Name",
                    email: "Email Address",
                    phone: "Phone Number",
                    "contact.development__project_name": "Development / Project Name",
                    "contact.number_of_homes_or_units": "Number of homes or units",
                    "contact.estimated_project_timeline": "Estimated project timeline",
                    "contact.message__questions": "Message / Questions",
                  },
                  url: window.location.href,
                  title: document.title,
                  path: window.location.pathname,
                  userAgent: navigator.userAgent,
                  trackingId: "tk_faae8523bf484a41923022470df2cf7b",
                  locationId: "fTWpkc2JrzTyLdcaKxJD",
                  sessionId: crypto.randomUUID(),
                  properties: {
                    deviceType: /Mobile|Android|iPhone/i.test(navigator.userAgent)
                      ? "mobile"
                      : "desktop",
                  },
                };

                fetch("https://backend.leadconnectorhq.com/external-tracking/events", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    version: "2021-07-28",
                  },
                  body: JSON.stringify(trackingPayload),
                }).catch(() => {});

                alert("Thanks for your interest! We'll be in touch soon.");
                e.currentTarget.reset();
              }}
            >
              <div>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Full Name *"
                  className="w-full rounded-md border border-[#DDD5C8] px-4 py-3 font-body text-[15px] outline-hidden transition-colors focus:border-[#2D5016] focus:ring-1 focus:ring-[#2D5016]"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email Address *"
                  className="w-full rounded-md border border-[#DDD5C8] px-4 py-3 font-body text-[15px] outline-hidden transition-colors focus:border-[#2D5016] focus:ring-1 focus:ring-[#2D5016]"
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="Phone Number *"
                  className="w-full rounded-md border border-[#DDD5C8] px-4 py-3 font-body text-[15px] outline-hidden transition-colors focus:border-[#2D5016] focus:ring-1 focus:ring-[#2D5016]"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="development"
                  placeholder="Development / Project Name"
                  className="w-full rounded-md border border-[#DDD5C8] px-4 py-3 font-body text-[15px] outline-hidden transition-colors focus:border-[#2D5016] focus:ring-1 focus:ring-[#2D5016]"
                />
              </div>
              <div>
                <input
                  type="number"
                  name="units"
                  placeholder="Number of homes or units"
                  className="w-full rounded-md border border-[#DDD5C8] px-4 py-3 font-body text-[15px] outline-hidden transition-colors focus:border-[#2D5016] focus:ring-1 focus:ring-[#2D5016]"
                />
              </div>
              <div>
                <select
                  name="timeline"
                  className="w-full rounded-md border border-[#DDD5C8] bg-white px-4 py-3 font-body text-[15px] text-[#7A6A5A] outline-hidden transition-colors focus:border-[#2D5016] focus:ring-1 focus:ring-[#2D5016]"
                >
                  <option value="">-- Estimated project timeline --</option>
                  <option value="Currently selling">Currently selling</option>
                  <option value="Breaking ground within 6 months">
                    Breaking ground within 6 months
                  </option>
                  <option value="12-24 months out">12-24 months out</option>
                  <option value="Planning phase">Planning phase</option>
                </select>
              </div>
              <div>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Message / Questions"
                  className="w-full rounded-md border border-[#DDD5C8] px-4 py-3 font-body text-[15px] outline-hidden transition-colors focus:border-[#2D5016] focus:ring-1 focus:ring-[#2D5016]"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-[#E8A020] px-8 py-[14px] font-body text-[16px] font-bold text-[#4A3728] transition-colors hover:bg-[#D4911A]"
              >
                Request a Demo
              </button>
            </form>
          </div>

          {/* Value Summary Column */}
          <div className="rounded-[16px] bg-[#2D5016] p-[32px] md:p-[40px]">
            <h2 className="mb-6 font-display text-[22px] font-bold text-white">What you get</h2>

            <div className="space-y-3">
              {[
                "Pre-sale landing page",
                "Interactive lot map",
                "Buyer portal from contract to close",
                "Construction milestone tracker",
                "Automated buyer notifications",
                "Warranty claims management",
                "Full community platform at closing",
                "White-labeled mobile app option",
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-[#E8A020]" />
                  <span className="font-body text-[15px] leading-[1.6] text-white">{feature}</span>
                </div>
              ))}
            </div>

            <div className="my-6 h-px w-full bg-white/15" />

            <p className="font-body text-[14px] text-white/70">
              Developer tier starts at $799/month. Includes full platform access for your entire
              development.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
