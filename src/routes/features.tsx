import { createFileRoute } from "@tanstack/react-router";
import { CC_Layout } from "@/components/CC_Layout";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useMeta } from "@/hooks/useMeta";
import { Link } from "@/lib/router-compat";
import {
  CreditCard,
  Wrench,
  ShieldAlert,
  Vote,
  Calendar,
  Users,
  Bell,
  ClipboardList,
  Building2,
  FileText,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const FEATURE_GROUPS = [
  {
    title: "Financial",
    desc: "Collect and track every dollar with fund accounting built for associations.",
    items: [
      {
        icon: CreditCard,
        title: "Online dues & payments",
        desc: "Collect dues by ACH or card. Automated reminders, late fees, and a clear per-household ledger.",
      },
      {
        icon: FileText,
        title: "Accounting & reporting",
        desc: "Keep operating and reserve funds separate, reconcile bank accounts, and share board-ready statements.",
      },
    ],
  },
  {
    title: "Operations",
    desc: "Turn resident requests and rule enforcement into a clean, auditable record.",
    items: [
      {
        icon: Wrench,
        title: "Maintenance requests",
        desc: "Residents submit requests with photos. Assign vendors and track each one through completion.",
      },
      {
        icon: ShieldAlert,
        title: "Violations & compliance",
        desc: "Document violations against the right rule, manage architectural reviews, and keep a full record.",
      },
      {
        icon: Bell,
        title: "Safety alerts",
        desc: "Emergency broadcasts that reach every resident instantly — by app, email, or text.",
      },
    ],
  },
  {
    title: "Community",
    desc: "Keep residents informed, engaged, and connected to their neighbors.",
    items: [
      {
        icon: ClipboardList,
        title: "Bulletin board",
        desc: "Announcements without the drama. Moderated, organized, and actually useful.",
      },
      {
        icon: Calendar,
        title: "Calendar & amenities",
        desc: "Meetings, amenity bookings, and community events in one shared calendar with reminders.",
      },
      {
        icon: Users,
        title: "Resident directory",
        desc: "A private, verified directory so neighbors can find the skills and contacts they need.",
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
        desc: "Run board elections and surveys with verifiable, transparent results — no more paper ballots.",
      },
      {
        icon: Building2,
        title: "Board hub",
        desc: "Documents, meeting notes, and governance in one place the whole board can actually use.",
      },
    ],
  },
];

function CC_Features() {
  useScrollReveal();
  useMeta({
    title: "Features | neighborspace",
    description:
      "Explore every feature of neighborspace — dues and payments, maintenance, violations, voting, calendar, directory, safety alerts, and board governance in one platform.",
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
            One platform. Every part of community life.
          </h1>
          <p className="mt-5 font-body text-[20px] font-light text-white/80">
            From dues collection to board elections, neighborspace replaces the spreadsheets, group
            chats, and paper notices your community has been juggling.
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
                    className={`rounded-2xl border border-border bg-white p-7 transition-all hover:-translate-y-1 hover:shadow-lg reveal-on-scroll stagger-${i + 1}`}
                  >
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-display text-[18px] font-bold text-bark">{item.title}</h3>
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
            Why communities choose neighborspace
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[
              "One source of truth — no more three spreadsheets and a group chat",
              "Hands-on onboarding — we set up your community and walk your board through it",
              "Built for every role — residents, boards, and managers all get what they need",
              "Secure payments — PCI-compliant dues collection your board never touches",
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
      { title: "Features | neighborspace" },
      {
        name: "description",
        content:
          "Explore every feature of neighborspace — dues and payments, maintenance, violations, voting, calendar, directory, safety alerts, and board governance in one platform.",
      },
      { property: "og:title", content: "Features | neighborspace" },
      {
        property: "og:description",
        content:
          "Every feature of neighborspace — dues, maintenance, violations, voting, calendar, directory, and board governance in one platform.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CC_Features,
});

export default CC_Features;
