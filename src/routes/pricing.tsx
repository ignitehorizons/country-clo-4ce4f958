import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CC_Layout } from "@/components/CC_Layout";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useMeta } from "@/hooks/useMeta";
import { Link } from "@/lib/router-compat";
import { PaymentCheckoutBlock } from "@/integrations/payments";
import { Check, ArrowRight, Sparkles } from "lucide-react";

const TIERS = [
  {
    name: "Neighbor",
    price: "$0",
    cadence: "free for residents",
    blurb: "Everything a resident needs to stay connected.",
    features: [
      "Bulletin board & announcements",
      "Community calendar & events",
      "Resident directory (privacy-controlled)",
      "Lost & found and pet registry",
      "Mobile app access",
    ],
    cta: "Get started free",
    highlight: false,
  },
  {
    name: "Community",
    price: "$79",
    cadence: "per month, billed yearly",
    blurb: "For self-managed HOAs and small associations.",
    features: [
      "Everything in Neighbor",
      "Online dues collection (ACH + card)",
      "Maintenance request tracking",
      "Safety alerts & emergency broadcasts",
      "Marketplace, tool library & package alerts",
      "Document library",
    ],
    cta: "Start free trial",
    highlight: true,
  },
  {
    name: "Association",
    price: "$199",
    cadence: "per month, billed yearly",
    blurb: "For boards that need the full toolkit.",
    features: [
      "Everything in Community",
      "Violations & architectural review",
      "Voting, elections & surveys",
      "Board hub & meeting management",
      "Amenity booking",
      "Multi-admin roles & reporting dashboard",
    ],
    cta: "Start free trial",
    highlight: false,
  },
  {
    name: "Developer",
    price: "$799",
    cadence: "per month, billed yearly",
    blurb: "For builders and new construction communities.",
    features: [
      "Everything in Association",
      "Construction tracker & lot map",
      "Pre-sale pages & warranty portal",
      "Rental applications & screening",
      "Design center",
      "Dedicated onboarding specialist",
    ],
    cta: "Talk to sales",
    highlight: false,
  },
];

function CC_Pricing() {
  useScrollReveal();
  useMeta({
    title: "Pricing | neighborspace",
    description:
      "Simple, transparent pricing for every community — from a free resident tier to full association and developer plans. No setup fees, cancel anytime.",
  });
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const openCheckout = (tier: string) => {
    setSelectedTier(tier);
    setCheckoutOpen(true);
  };

  return (
    <CC_Layout>
      {/* HERO */}
      <section className="bg-primary px-6 py-[100px] text-center">
        <div className="mx-auto max-w-3xl reveal-on-scroll">
          <span className="font-body text-[13px] font-semibold uppercase tracking-[2px] text-accent">
            Pricing
          </span>
          <h1 className="mt-4 font-display text-[clamp(36px,6vw,64px)] font-extrabold text-white leading-tight">
            One platform. Priced for every community.
          </h1>
          <p className="mt-5 font-body text-[20px] font-light text-white/80">
            Start free for residents. Add the tools your board needs as you grow. No setup fees, no
            contracts — cancel anytime.
          </p>
        </div>
      </section>

      {/* TIER GRID */}
      <section className="bg-cream px-6 md:px-10 py-[80px]">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {TIERS.map((tier, i) => (
              <div
                key={tier.name}
                className={`relative flex flex-col rounded-2xl border p-7 reveal-on-scroll stagger-${i + 1} ${
                  tier.highlight
                    ? "border-accent bg-white shadow-lg ring-2 ring-accent/20"
                    : "border-border bg-white"
                }`}
              >
                {tier.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-accent px-4 py-1 font-body text-[11px] font-bold uppercase tracking-[1px] text-white">
                    <Sparkles className="h-3 w-3" /> Recommended
                  </span>
                )}
                <h3 className="font-display text-[20px] font-bold text-bark">{tier.name}</h3>
                <p className="mt-1 font-body text-[13px] text-text-light">{tier.blurb}</p>
                <div className="mt-5">
                  <span className="font-display text-[40px] font-extrabold text-bark">
                    {tier.price}
                  </span>
                  <span className="ml-2 font-body text-[13px] text-text-light">{tier.cadence}</span>
                </div>
                <ul className="mt-6 flex flex-1 flex-col gap-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 font-body text-[14px] text-text">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => openCheckout(tier.name)}
                  className={`mt-7 inline-flex items-center justify-center h-12 rounded-[100px] font-body text-[15px] font-bold transition-all ${
                    tier.highlight
                      ? "bg-accent text-white hover:bg-accent-hover hover:translate-y-[-2px]"
                      : "border border-border bg-cream text-bark hover:border-accent hover:text-accent"
                  }`}
                >
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center font-body text-[14px] text-text-light">
            Need something custom?{" "}
            <Link to="/demo" className="font-semibold text-accent hover:underline">
              Book a demo
            </Link>{" "}
            or{" "}
            <Link to="/contact" className="font-semibold text-accent hover:underline">
              talk to our team
            </Link>
            . Enterprise and 500+ unit portfolios are priced per community.
          </p>
        </div>
      </section>

      {/* COMPARISON / FAQ STRIP */}
      <section className="bg-white px-6 md:px-10 py-[80px]">
        <div className="mx-auto max-w-3xl reveal-on-scroll">
          <h2 className="text-center font-display text-[clamp(28px,4vw,38px)] font-bold text-bark">
            Common questions
          </h2>
          <div className="mt-10 space-y-6">
            {[
              {
                q: "Is it really free for residents?",
                a: "Yes. The Neighbor tier is free for every resident in every community on neighborspace. Boards and managers pay for the tools they use.",
              },
              {
                q: "Are there setup fees?",
                a: "No. We onboard founding communities personally — most go live in a couple of weeks.",
              },
              {
                q: "Can I switch tiers later?",
                a: "Anytime. Upgrade or downgrade as your community grows — billing prorates automatically.",
              },
              {
                q: "How does payment processing work?",
                a: "Dues and payments run through our secure checkout. We handle PCI compliance so your board never touches card data.",
              },
            ].map((item) => (
              <div key={item.q} className="rounded-xl border border-border bg-cream p-6">
                <h3 className="font-display text-[17px] font-bold text-bark">{item.q}</h3>
                <p className="mt-2 font-body text-[15px] leading-relaxed text-text-light">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="px-6 md:px-10 py-[80px] text-center"
        style={{ background: "linear-gradient(135deg, #0284C7, #06B6D4)" }}
      >
        <div className="mx-auto max-w-2xl reveal-on-scroll">
          <h2 className="font-display text-[clamp(28px,4vw,40px)] font-extrabold text-white">
            Not sure which tier fits?
          </h2>
          <p className="mt-4 font-body text-[18px] text-white/90">
            Book a 20-minute demo and we'll map it to your community.
          </p>
          <Link
            to="/demo"
            className="mt-8 inline-flex items-center justify-center h-14 rounded-[100px] bg-white px-10 font-body text-[18px] font-bold text-accent transition-all hover:translate-y-[-3px] hover:shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
          >
            Book a demo <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* CHECKOUT MODAL — sealed block, opens when a tier CTA is clicked.
          Products are wired in More → Payments; until then the block
          renders the platform's configured checkout (or an empty state). */}
      {checkoutOpen && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center bg-black/60 p-4"
          onClick={() => setCheckoutOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-[20px] font-bold text-bark">
                Start your {selectedTier} plan
              </h2>
              <button
                onClick={() => setCheckoutOpen(false)}
                className="font-body text-[14px] font-semibold text-text-light hover:text-text"
                aria-label="Close checkout"
              >
                Close
              </button>
            </div>
            <p className="mb-4 font-body text-[14px] text-text-light">
              Complete checkout to activate your subscription. Payment is processed securely.
            </p>
            <PaymentCheckoutBlock
              checkoutMode="all"
              onSuccess={() => {
                setCheckoutOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </CC_Layout>
  );
}

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing | neighborspace" },
      {
        name: "description",
        content:
          "Simple, transparent pricing for every community — from a free resident tier to full association and developer plans. No setup fees, cancel anytime.",
      },
      { property: "og:title", content: "Pricing | neighborspace" },
      {
        property: "og:description",
        content:
          "Simple, transparent pricing for every community — from a free resident tier to full association and developer plans.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CC_Pricing,
});
