import { createFileRoute } from "@tanstack/react-router";
import { CC_Layout } from "@/components/CC_Layout";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useMeta } from "@/hooks/useMeta";
import { Link } from "@/lib/router-compat";
import { ArrowRight } from "lucide-react";

type Phase = "live" | "dev" | "soon" | "roadmap";

const STATUS_LABEL: Record<Phase, string> = {
  live: "Live now",
  dev: "In development",
  soon: "Coming soon",
  roadmap: "Roadmap",
};

const ROADMAP = [
  {
    badge: "live" as Phase,
    title: "The resident experience",
    desc: "Bulletin board, community calendar, verified resident directory, and local resources.",
  },
  {
    badge: "dev" as Phase,
    title: "Violations & compliance",
    desc: "Document issues, notify homeowners, and track cure deadlines — being shaped with our founding communities.",
  },
  {
    badge: "soon" as Phase,
    title: "Dues & payments",
    desc: "Online dues collection with a clear ledger for every household.",
  },
  {
    badge: "roadmap" as Phase,
    title: "Built for builders",
    desc: "Construction tracking, pre-sale pages, warranty portals, and a clean handoff to an elected resident board.",
  },
];

function CC_Roadmap() {
  useScrollReveal();
  useMeta({
    title: "Roadmap | NeighborSpace",
    description:
      "NeighborSpace is in early access. See what's live, what's in development, and what's on the roadmap — shaped by the boards, managers, and builders using it.",
  });

  return (
    <CC_Layout>
      {/* HERO */}
      <section className="bg-primary px-6 py-[100px] text-center">
        <div className="mx-auto max-w-3xl reveal-on-scroll">
          <span className="font-body text-[13px] font-semibold uppercase tracking-[2px] text-accent">
            Roadmap
          </span>
          <h1 className="mt-4 font-display text-[clamp(36px,6vw,64px)] font-extrabold text-white leading-tight">
            We're building NeighborSpace with our first communities.
          </h1>
          <p className="mt-5 font-body text-[20px] font-light text-white/80">
            Here's what's live, what's in development, and what's on the roadmap — shaped by the
            boards, managers, and builders using it.
          </p>
        </div>
      </section>

      {/* ROADMAP GRID */}
      <section className="bg-cream px-6 md:px-10 py-[80px]">
        <div className="mx-auto max-w-6xl grid grid-cols-1 gap-6 md:grid-cols-2">
          {ROADMAP.map((card, i) => (
            <div
              key={card.title}
              className={`flex flex-col rounded-2xl border border-border bg-white p-8 reveal-on-scroll stagger-${(i % 2) + 1}`}
            >
              <span
                className={`status-badge status-${card.badge} w-fit`}
              >
                {STATUS_LABEL[card.badge]}
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

export const Route = createFileRoute("/roadmap")({
  head: () => ({
    meta: [
      { title: "Roadmap | NeighborSpace" },
      {
        name: "description",
        content:
          "NeighborSpace is in early access. See what's live, what's in development, and what's on the roadmap — shaped by the boards, managers, and builders using it.",
      },
      { property: "og:title", content: "Roadmap | NeighborSpace" },
      {
        property: "og:description",
        content:
          "NeighborSpace is in early access — what's live, what's in development, and what's on the roadmap.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CC_Roadmap,
});
