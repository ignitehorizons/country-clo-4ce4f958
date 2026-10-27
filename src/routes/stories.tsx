import { createFileRoute } from "@tanstack/react-router";
import { CC_Layout } from "@/components/CC_Layout";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useMeta } from "@/hooks/useMeta";
import { Link } from "@/lib/router-compat";
import { Star, Quote, ArrowRight } from "lucide-react";

const STORIES = [
  {
    quote:
      "We replaced three spreadsheets, a Facebook group, and a paper violations log with neighborspace. The board finally has one source of truth.",
    name: "Brenda W.",
    role: "Board President",
    community: "48-unit condo association",
    metric: "12 hrs saved per week",
  },
  {
    quote:
      "Dues collection went from chasing checks to automatic. Our reserve fund reporting is board-ready in a few clicks instead of a weekend.",
    name: "Tony T.",
    role: "Treasurer",
    community: "120-home HOA",
    metric: "$48k collected in week one",
  },
  {
    quote:
      "The violations module turned a contentious paper process into something transparent and fair. Residents actually trust it now.",
    name: "Betty M.",
    role: "Property Manager",
    community: "Multi-community portfolio",
    metric: "3x faster compliance review",
  },
  {
    quote:
      "As a developer, setting up the association before the first closing changed everything. Early dues, clean records, a smooth handoff.",
    name: "Patrick B.",
    role: "Developer",
    community: "New construction, 64 lots",
    metric: "Day-one community ready",
  },
];

function CC_Stories() {
  useScrollReveal();
  useMeta({
    title: "Stories | neighborspace",
    description:
      "See how HOAs, condo associations, and property managers use neighborspace to run their communities — from dues collection to violations and board elections.",
  });

  return (
    <CC_Layout>
      {/* HERO */}
      <section className="bg-primary px-6 py-[100px] text-center">
        <div className="mx-auto max-w-3xl reveal-on-scroll">
          <span className="font-body text-[13px] font-semibold uppercase tracking-[2px] text-accent">
            Customer stories
          </span>
          <h1 className="mt-4 font-display text-[clamp(36px,6vw,64px)] font-extrabold text-white leading-tight">
            Communities run better on neighborspace.
          </h1>
          <p className="mt-5 font-body text-[20px] font-light text-white/80">
            Boards, managers, and developers share how they replaced spreadsheets, group chats, and
            paper notices with one platform.
          </p>
        </div>
      </section>

      {/* STORIES GRID */}
      <section className="bg-cream px-6 md:px-10 py-[80px]">
        <div className="mx-auto max-w-6xl grid grid-cols-1 gap-6 md:grid-cols-2">
          {STORIES.map((story, i) => (
            <div
              key={story.name}
              className={`flex flex-col rounded-2xl border border-border bg-white p-8 reveal-on-scroll stagger-${(i % 2) + 1}`}
            >
              <Quote className="h-8 w-8 text-accent/30" />
              <blockquote className="mt-4 flex-1 font-display text-[18px] font-medium leading-relaxed text-bark">
                {story.quote}
              </blockquote>
              <div className="mt-6 flex items-center gap-1">
                {[0, 1, 2, 3, 4].map((s) => (
                  <Star key={s} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <div>
                  <p className="font-body text-[15px] font-bold text-bark">{story.name}</p>
                  <p className="font-body text-[13px] text-text-light">
                    {story.role} · {story.community}
                  </p>
                </div>
                <span className="rounded-full bg-accent/10 px-3 py-1 font-body text-[12px] font-semibold text-accent">
                  {story.metric}
                </span>
              </div>
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
            Add your story next.
          </h2>
          <p className="mt-4 font-body text-[18px] text-white/90">
            Book a demo and see what neighborspace can do for your community.
          </p>
          <Link
            to="/contact"
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
      { title: "Stories | neighborspace" },
      {
        name: "description",
        content:
          "See how HOAs, condo associations, and property managers use neighborspace to run their communities — from dues collection to violations and board elections.",
      },
      { property: "og:title", content: "Stories | neighborspace" },
      {
        property: "og:description",
        content:
          "How HOAs, condo associations, and property managers use neighborspace to run their communities.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CC_Stories,
});

export default CC_Stories;