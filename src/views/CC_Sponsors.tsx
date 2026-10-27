import { CC_Layout } from "../components/CC_Layout";
import { Check, Home, Lock, Handshake, Smartphone } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useMeta } from "@/hooks/useMeta";
import { Link } from "@/lib/router-compat";

const CC_Sponsors = () => {
  useScrollReveal();
  useMeta({
    title: "Partners | neighborspace",
    description:
      "Become a neighborspace community partner and reach verified local households. A trusted, hyper-local listing — no ad algorithms, just neighbor recommendations.",
  });

  return (
    <CC_Layout>
      {/* SECTION 1 — PAGE HERO */}
      <section className="relative flex h-[320px] flex-col items-center justify-center bg-linear-to-br from-primary via-primary-light to-primary text-center">
        <div className="z-10 px-4">
          <span className="font-body text-[20px] text-accent font-semibold">Support Local</span>
          <h1 className="mt-2 font-display text-[clamp(36px,5vw,64px)] font-extrabold text-white leading-tight">
            Community Partners
          </h1>
          <p className="mt-[12px] font-body text-[18px] font-light text-white/80">
            Local businesses that support neighborspace communities
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            className="block h-[40px] w-full"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118,130.83,120.3,192.51,105.7,243.68,93.6,285.5,75.4,321.39,56.44Z"
              fill="#F0F9FF"
            ></path>
          </svg>
        </div>
      </section>

      {/* SECTION 2 — FOUNDING PARTNER PITCH */}
      <section className="bg-cream px-10 py-20">
        <div className="mx-auto max-w-3xl text-center reveal-on-scroll">
          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-xs">
            <Handshake className="h-8 w-8 text-accent" />
          </div>
          <h2 className="font-display text-[clamp(28px,4vw,40px)] font-bold text-bark">
            Reach verified local households
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-[18px] leading-relaxed text-text-light">
            neighborspace puts your business in front of communities who already trust their
            neighbors' recommendations. No fake listings, no competing ads — just real local
            businesses, joining as communities grow.
          </p>

          <div className="mt-10 rounded-[16px] border border-border bg-white p-8 text-left shadow-xs">
            <h3 className="mb-5 font-display text-[22px] font-bold text-bark">
              What a partner gets
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Your business listed front and center",
                "Priority placement as we add partners",
                "A direct line to verified households",
                "Featured on community homepages",
                "No algorithms, no competing ads",
                "Neighbors trust neighbor recommendations",
              ].map((item, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 reveal-on-scroll stagger-${(i % 4) + 1}`}
                >
                  <Check className="mt-1 h-4 w-4 shrink-0 text-accent" />
                  <span className="font-body text-[15px] text-text">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — BECOME A PARTNER CTA */}
      <section className="bg-primary px-10 py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:items-center">
          {/* Left Column */}
          <div className="flex-1">
            <span className="font-body text-[20px] text-accent font-semibold">Grow With Us</span>
            <h2 className="mt-2 font-display text-[clamp(28px,3.5vw,42px)] font-bold text-white leading-tight">
              Support your neighbors.
              <br />
              Grow your business.
            </h2>
            <p className="mt-4 max-w-lg font-body text-[17px] leading-[1.7] text-cream/85">
              Community partner listings put your business in front of households who already
              trust their neighbors' recommendations. No algorithms. No competing ads. Just your
              business, front and center.
            </p>
          </div>

          {/* Right Column */}
          <div className="flex flex-1 flex-col gap-4">
            {[
              {
                name: "Basic Listing",
                desc: "Name, description & contact",
                price: "$49",
              },
              {
                name: "Featured Listing",
                desc: "Priority placement + logo",
                price: "$99",
              },
              {
                name: "Premium Partner",
                desc: "Top placement + homepage strip",
                price: "$199",
              },
            ].map((tier, i) => (
              <div
                key={tier.name}
                className={`flex items-center justify-between rounded-xl border border-white/15 bg-white/5 p-5 md:px-6 reveal-on-scroll stagger-${i + 1}`}
              >
                <div>
                  <h4 className="font-body text-[16px] font-bold text-white">{tier.name}</h4>
                  <p className="mt-1 font-body text-[13px] text-white/70">{tier.desc}</p>
                </div>
                <div className="text-right">
                  <span className="font-display text-[24px] font-bold text-accent">
                    {tier.price}
                  </span>
                  <span className="font-body text-[13px] text-white/70">/month</span>
                </div>
              </div>
            ))}

            <Link
              to="/contact"
              className="mt-6 inline-block w-fit rounded-full bg-accent px-9 py-3.5 font-body text-[16px] font-bold text-white transition-colors hover:bg-accent-hover"
            >
              Apply to Become a Partner &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 4 — TRUST BAR */}
      <section className="bg-cream px-10 py-10 text-center">
        <div className="mx-auto max-w-5xl">
          <h3 className="mb-8 font-body text-[13px] font-bold uppercase tracking-[3px] text-text-light">
            Why partner with neighborspace?
          </h3>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <Home className="w-8 h-8 text-accent" />,
                title: "Hyper-Local",
                desc: "Verified households, real communities",
              },
              {
                icon: <Lock className="w-8 h-8 text-accent" />,
                title: "No Ad Algorithms",
                desc: "Your listing, always visible",
              },
              {
                icon: <Handshake className="w-8 h-8 text-accent" />,
                title: "Neighbor Trust",
                desc: "Recommendations people believe",
              },
              {
                icon: <Smartphone className="w-8 h-8 text-accent" />,
                title: "Mobile Friendly",
                desc: "Seen on phones, tablets, desktops",
              },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center">
                <span className="flex items-center justify-center">{item.icon}</span>
                <h4 className="mt-3 font-body text-[15px] font-bold text-bark">{item.title}</h4>
                <p className="mt-1.5 font-body text-[13px] text-text-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </CC_Layout>
  );
};

export default CC_Sponsors;