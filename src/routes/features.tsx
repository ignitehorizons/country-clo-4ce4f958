import { createFileRoute } from "@tanstack/react-router";
import { CC_Layout } from "@/components/CC_Layout";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useMeta } from "@/hooks/useMeta";
import { Link } from "@/lib/router-compat";
import {
  CreditCard,
  FileText,
  Wrench,
  ShieldAlert,
  Bell,
  ClipboardList,
  Calendar,
  Users,
  Vote,
  Building2,
  ShieldCheck,
  Landmark,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

type Status = "live" | "dev" | "soon";

const STATUS_LABEL: Record<Status, string> = {
  live: "Live",
  dev: "In development",
  soon: "Coming soon",
};

type FeatureItem = {
  icon: typeof CreditCard;
  title: string;
  desc: string;
  status: Status;
};

const FEATURE_GROUPS: { title: string; desc: string; items: FeatureItem[] }[] = [
  {
    title: "Community",
    desc: "Keep residents informed, engaged, and connected to their neighbors.",
    items: [
      {
        icon: ClipboardList,
        title: "Bulletin board",
        desc: "Announcements without the drama. Moderated, organized, and actually useful.",
        status: "live",
      },
      {
        icon: Calendar,
        title: "Calendar & amenities",
        desc: "Meetings, amenity bookings, and community events in one shared calendar with reminders.",
        status: "live",
      },
      {
        icon: Users,
        title: "Resident directory",
        desc: "A private, verified directory so neighbors can find the skills and contacts they need.",
        status: "live",
      },
      {
        icon: ShieldCheck,
        title: "Resident verification",
        desc: "Every member is verified by address and approved by your board — no strangers, no spam.",
        status: "live",
      },
      {
        icon: Landmark,
        title: "Resource & officials directory",
        desc: "Local services, utilities, and elected officials in one place for every resident.",
        status: "live",
      },
    ],
  },
  {
    title: "Operations",
    desc: "Turn resident requests and rule enforcement into a clean, auditable record.",
    items: [
      {
        icon: ShieldAlert,
        title: "Violations & compliance",
        desc: "Document issues, notify homeowners, and track cure deadlines — being shaped with our founding communities.",
        status: "dev",
      },
      {
        icon: Wrench,
        title: "Maintenance requests",
        desc: "Residents will submit requests with photos and track each one through completion.",
        status: "soon",
      },
      {
        icon: Bell,
        title: "Safety alerts",
        desc: "Emergency broadcasts that reach every resident instantly — coming soon.",
        status: "soon",
      },
    ],
  },
  {
    title: "Financial",
    desc: "Tools to collect and track community funds — on the roadmap.",
    items: [
      {
        icon: CreditCard,
        title: "Online dues & payments",
        desc: "Online dues collection is coming soon — a clear per-household ledger.",
        status: "soon",
      },
      {
        icon: FileText,
        title: "Accounting & reporting",
        desc: "Board-ready statements and fund tracking are on the roadmap.",
        status: "soon",
      },
    ],
  },
  {
    title: "Governance",
    desc: "Run the board the way your bylaws say you should — without the paperwork.",
    items: [
      {
        icon: Vote,
        title: "Voting & elections",
        desc: "Board elections and surveys with verifiable, transparent results are on the way.",
        status: "soon",
      },
      {
        icon: Building2,
        title: "Board hub",
        desc: "Documents, meeting notes, and governance in one place — coming soon.",
        status: "soon",
      },
    ],
  },
];

function CC_Features() {
  useScrollReveal();
  useMeta({
    title: "Features | NeighborSpace",
    description:
      "Explore NeighborSpace features — bulletin board, calendar, verified resident directory, local resources, and the violations, dues, voting, and board tools on the roadmap.",
  });

  return (
    <CC_Layout>
      {/* HERO */}
      <section className="bg-primary px-6 py-[100px] text-center">
        <div className="mx-auto max-w-3xl reveal-on-scroll">
          <span className="font-body text-[13px] font-semibold uppercase tracking-[2px] text-accent">
            Features
          </span>
          <h1 className="mt-4 font-display text-[clamp(36px,6vw,64px)] font-extrabold text-white leading-tight">
            Everything your community needs to stay connected.
          </h1>
          <p className="mt-5 font-body text-[20px] font-light text-white/80">
            Start with the essentials today. More tools are on the way — shaped by the communities
            using NeighborSpace.
          </p>
        </div>
      </section>

      {/* FEATURE GROUPS */}
      <section className="bg-cream px-6 md:px-10 py-[80px]">
        <div className="mx-auto max-w-6xl space-y-20">
          {FEATURE_GROUPS.map((group, gi) => (
            <div key={group.title}>
              <div className="mb-10 reveal-on-scroll">
                <h2 className="font-display text-[clamp(26px,3.5vw,36px)] font-bold text-bark">
                  {group.title}
                </h2>
                <p className="mt-2 font-body text-[17px] text-text-light max-w-2xl">{group.desc}</p>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item, i) => (
                  <div
                    key={item.title}
                    className={`relative rounded-2xl border border-border bg-white p-7 transition-all hover:-translate-y-1 hover:shadow-lg reveal-on-scroll stagger-${i + 1}`}
                  >
                    <span className={`status-badge status-${item.status} absolute top-4 right-4`}>
                      {STATUS_LABEL[item.status]}
                    </span>
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-display text-[18px] font-bold text-bark pr-16">
                      {item.title}
                    </h3>
                    <p className="mt-2 font-body text-[14px] leading-relaxed text-text-light">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
              {gi < FEATURE_GROUPS.length - 1 && <div className="mt-16 h-px w-full bg-border" />}
            </div>
          ))}
        </div>
      </section>

      {/* WHY NEIGHBORSPACE */}
      <section className="bg-white px-6 md:px-10 py-[80px]">
        <div className="mx-auto max-w-4xl text-center reveal-on-scroll">
          <h2 className="font-display text-[clamp(28px,4vw,42px)] font-bold text-bark">
            Why communities choose NeighborSpace
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[
              "One source of truth — no more three spreadsheets and a group chat",
              "Hands-on onboarding — we set up your community and walk your board through it",
              "Built for every role — residents, boards, and managers all get what they need",
              "Your data stays yours — we never sell or share resident information",
            ].map((point) => (
              <div
                key={point}
                className="flex items-start gap-3 rounded-xl border border-border bg-cream p-5 text-left"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span className="font-body text-[15px] text-text">{point}</span>
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
            See it with your community's data.
          </h2>
          <p className="mt-4 font-body text-[18px] text-white/90">
            Book a free 20-minute walkthrough and we'll show you exactly how it fits.
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

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features | NeighborSpace" },
      {
        name: "description",
        content:
          "Explore NeighborSpace features — bulletin board, calendar, verified resident directory, local resources, and the violations, dues, voting, and board tools on the roadmap.",
      },
      { property: "og:title", content: "Features | NeighborSpace" },
      {
        property: "og:description",
        content:
          "Everything your community needs to stay connected — what's live today and what's on the NeighborSpace roadmap.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CC_Features,
});
