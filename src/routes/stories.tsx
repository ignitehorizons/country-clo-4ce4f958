import { createFileRoute } from "@tanstack/react-router";
import { CC_Layout } from "@/components/CC_Layout";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useMeta } from "@/hooks/useMeta";
import { Link } from "@/lib/router-compat";
import { ArrowRight } from "lucide-react";

const EARLY_ACCESS = [
  {
    badge: "Live now",
    title: "The resident experience",
    desc: "Bulletin board, community calendar, resident directory, lost & found, and a pet registry — the everyday pieces that keep a neighborhood connected.",
  },
  {
    badge: "Live now",
    title: "Dues & payments",
    desc: "Collect dues online by ACH or card, with a clear per-household ledger and automated reminders. Secure checkout, no card data on your board's plate.",
  },
  {
    badge: "Onboarding now",
    title: "Violations & voting",
    desc: "We're rolling violations tracking and board elections out alongside our founding communities — shaping the workflow around how boards actually run.",
  },
  {
    badge: "Roadmap",
    title: "Built for builders",
    desc: "Construction trackers, pre-sale pages, warranty portals, and a clean handoff to an elected resident board — in active development.",
  },
];

function CC_Stories() {
  useScrollReveal();
  useMeta({
    title: "Early Access | neighborspace",
    description:
      "neighborspace is in early access. See what's live, what's onboarding now, and what's on the roadmap — shaped by the boards, managers, and builders using it.",
  });

  return (
    <CC_Layout>
      {/* HERO */}
      <section className="bg-primary px-6 py-[100px] text-center">
        <div className="mx-auto max-w-3xl reveal-on-scroll">
          <span className="font-body text-[13px] font-semibold uppercase tracking-[2px] text-accent">
            Early access
          </span>
          <h1 className="mt-4 font-display text-[clamp(36px,6vw,64px)] font-extrabold text-white leading-tight">
            We're building neighborspace with our first communities.
          </h1>
          <p className="mt-5 font-body text-[20px] font-light text-white/80">
            Here's what's live, what's onboarding now, and what's on the roadmap — shaped by the
            boards, managers, and builders using it.
          </p>
        </div>
      </section>

      {/* EARLY ACCESS GRID */}
      <section className="bg-cream px-6 md:px-10 py-[80px]">
        <div className="mx-auto max-w-6xl grid grid-cols-1 gap-6 md:grid-cols-2">
          {EARLY_ACCESS.map((card, i) => (
            <div
              key={card.title}
              className={`flex flex-col rounded-2xl border border-border bg-white p-8 reveal-on-scroll stagger-${(i % 2) + 1}`}
            >
              <span className="w-fit rounded-full bg-accent/10 px-3 py-1 font-body text-[12px] font-semibold text-accent">
                {card.badge}
              </span>
              <h3 className="mt-4 font-display text-[20px] font-bold text-bark">{card.title}</h3>
              <p className="mt-3 flex-1 font-body text-[15px] leading-relaxed text-text-light">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        className="px-6 md:px-10 py-[80px] text-center"
        style={{ background: "linear-gradient(135deg, #0284C7, #06B6D4)" }}
      >
        <div className="mx-auto max-w-2xl reveal-on-scroll">
          <h2 className="font-display text-[clamp(28px,4vw,40px)] font-extrabold text-white">
            Join the founding cohort.
          </h2>
          <p className="mt-4 font-body text-[18px] text-white/90">
            We onboard a small number of communities personally. Book a demo and let's see if yours
            is a fit.
          </p>
          <Link
            to="/demo"
            className="mt-8 inline-flex items-center justify-center h-14 rounded-[100px] bg-white px-10 font-body text-[18px] font-bold text-accent transition-all hover:translate-y-[-3px] hover:shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
          >
            Book a demo <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </CC_Layout>
  );
}

export const Route = createFileRoute("/stories")({
  head: () => ({
    meta: [
      { title: "Early Access | neighborspace" },
      {
        name: "description",
        content:
          "neighborspace is in early access. See what's live, what's onboarding now, and what's on the roadmap — shaped by the boards, managers, and builders using it.",
      },
      { property: "og:title", content: "Early Access | neighborspace" },
      {
        property: "og:description",
        content:
          "neighborspace is in early access — what's live, what's onboarding now, and what's on the roadmap.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CC_Stories,
});

export default CC_Stories;
