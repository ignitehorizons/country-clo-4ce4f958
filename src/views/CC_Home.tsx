import { CC_Layout } from "@/components/CC_Layout";
import { Link } from "@/lib/router-compat";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useMeta } from "@/hooks/useMeta";
import {
  ClipboardList,
  Wrench,
  Calendar as CalendarIcon,
  Users,
  ShieldAlert,
  Vote,
  Building2,
  CreditCard,
  Bell,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Landmark,
} from "lucide-react";

const HERO_BANNER =
  "https://vibe.filesafe.space/1791050574073732793/assets/232e9ddb-86fb-428e-8e33-cf7d7311b7f9.png";

type Status = "live" | "dev" | "soon";

const STATUS_LABEL: Record<Status, string> = {
  live: "Live",
  dev: "In development",
  soon: "Coming soon",
};

const FEATURES: {
  icon: typeof ClipboardList;
  title: string;
  desc: string;
  status: Status;
}[] = [
  // Live
  {
    icon: ClipboardList,
    title: "Bulletin board",
    desc: "Announcements without the drama. Moderated, organized, and actually useful.",
    status: "live",
  },
  {
    icon: Users,
    title: "Resident directory",
    desc: "A private, verified directory so neighbors can find the skills and contacts they need.",
    status: "live",
  },
  {
    icon: CalendarIcon,
    title: "Calendar & events",
    desc: "Meetings, amenities, and community events in one shared calendar with reminders.",
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
  // In development
  {
    icon: ShieldAlert,
    title: "Violations & compliance",
    desc: "Document issues, notify homeowners, and track cure deadlines — being shaped with our founding communities.",
    status: "dev",
  },
  // Coming soon
  {
    icon: CreditCard,
    title: "Dues & payments",
    desc: "Online dues collection is coming soon — a clear ledger for every household.",
    status: "soon",
  },
  {
    icon: Wrench,
    title: "Maintenance requests",
    desc: "Residents will submit requests with photos and track each one through completion.",
    status: "soon",
  },
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
  {
    icon: Bell,
    title: "Safety alerts",
    desc: "Emergency broadcasts that reach every resident instantly — coming soon.",
    status: "soon",
  },
];

export default function CC_Home() {
  useScrollReveal();
  useMeta({
    title: "NeighborSpace — Where Communities Connect",
    description:
      "NeighborSpace is a private, branded home for your community — announcements, events, a verified neighbor directory, and local resources in one place for your HOA, condo association, or neighborhood.",
  });

  return (
    <CC_Layout>
      {/* SECTION 1 — HERO (banner + headline block) */}
      <section className="relative w-full">
        <div className="relative w-full">
          <img
            src={HERO_BANNER}
            alt="A park bench under a shade tree in a quiet neighborhood at golden hour"
            className="w-full h-[58vh] md:h-[70vh] object-cover"
          />
          {/* Gradient for nav legibility (top) and transition into navy (bottom) */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(15,23,42,0.55) 0%, rgba(15,23,42,0.10) 38%, rgba(15,23,42,0.92) 100%)",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <h1
              className="font-display font-extrabold text-white text-center leading-[1.05] tracking-tight animate-text-reveal"
              style={{ fontSize: "clamp(34px, 6vw, 72px)" }}
            >
              Where Communities Connect.
            </h1>
          </div>
        </div>

        {/* Centered text block on navy */}
        <div className="bg-primary px-6 py-[64px] md:py-[88px]">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 font-body text-[13px] font-semibold text-accent">
              <span className="h-2 w-2 rounded-full bg-accent" />
              Now in early access
            </span>
            <h2
              className="mt-6 font-display font-extrabold leading-[1.1] tracking-tight text-white"
              style={{ fontSize: "clamp(30px, 5vw, 52px)" }}
            >
              A private, branded home for your community.
            </h2>
            <p className="mt-6 font-body text-[18px] md:text-[20px] font-light leading-relaxed text-white/80 max-w-2xl mx-auto">
              Announcements, events, a verified neighbor directory, and local resources — all in one
              place for your HOA, condo association, or neighborhood.
            </p>
            <div className="mt-10 flex flex-col w-full sm:w-auto items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/demo"
                className="w-full sm:w-auto flex items-center justify-center h-14 rounded-[100px] bg-accent px-8 text-base font-bold text-white transition-all hover:bg-accent-hover hover:translate-y-[-2px] hover:shadow-[0_8px_24px_rgba(2,132,199,0.4)] active:translate-y-0 active:scale-[0.98]"
              >
                Book a demo
              </Link>
              <Link
                to="/portal"
                className="w-full sm:w-auto flex items-center justify-center h-14 rounded-[100px] border-2 border-white/30 bg-transparent px-8 text-base font-semibold text-white transition-all hover:bg-white/10 hover:text-white"
              >
                Member Portal
              </Link>
            </div>
            <p className="mt-8 font-body text-[13px] text-white/60">
              Built by a 30-year public safety leader · Hands-on onboarding · Your data is never
              sold
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2 — LOGO / SOCIAL PROOF BAR */}
      <section className="bg-primary-light px-6 py-10 border-t border-white/5">
        <div className="mx-auto max-w-6xl text-center">
          <p className="font-body text-[13px] font-semibold uppercase tracking-[2px] text-white/40 mb-6">
            Built for every kind of community
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 font-display text-[18px] font-bold text-white/50">
            <span className="flex items-center gap-2">
              <Building2 className="h-5 w-5" /> HOAs
            </span>
            <span>Condo associations</span>
            <span>Neighborhoods</span>
            <span>Property managers</span>
            <span>Self-managed boards</span>
          </div>
        </div>
      </section>

      {/* SECTION 3 — FEATURE GRID */}
      <section className="bg-cream px-6 md:px-10 py-[80px]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16 reveal-on-scroll">
            <h2 className="font-display text-[clamp(28px,4vw,42px)] font-bold text-bark">
              Everything your community needs to stay connected.
            </h2>
            <p className="mt-3 font-body text-[18px] text-text-light max-w-2xl mx-auto">
              Start with the essentials today. More tools are on the way — shaped by the communities
              using NeighborSpace.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((card, i) => (
              <div
                key={card.title}
                className={`group relative flex flex-col rounded-2xl border border-border bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-lg reveal-on-scroll stagger-${(i % 3) + 1}`}
              >
                <span className={`status-badge status-${card.status} absolute top-4 right-4`}>
                  {STATUS_LABEL[card.status]}
                </span>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <card.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-[18px] font-bold text-bark group-hover:text-accent transition-colors pr-16">
                  {card.title}
                </h3>
                <p className="mt-2 font-body text-[14px] leading-relaxed text-text-light">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — EARLY ACCESS STATUS */}
      <section className="bg-primary px-6 py-[80px]">
        <div className="mx-auto max-w-5xl text-center">
          <span className="font-body text-[13px] font-semibold uppercase tracking-[2px] text-accent">
            Now in early access
          </span>
          <h2 className="mt-4 font-display text-[clamp(26px,4vw,38px)] font-bold text-white max-w-3xl mx-auto leading-tight">
            We're building NeighborSpace in the open — with founding communities, not for them.
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              {
                label: "Hands-on onboarding",
                desc: "We set up your community and walk your board through it personally.",
              },
              {
                label: "Public roadmap",
                desc: "What ships next is shaped by the boards and managers using it today.",
              },
              {
                label: "Your data stays yours",
                desc: "We never sell or share resident information without express permission.",
              },
            ].map((item, i) => (
              <div key={item.label} className={`reveal-on-scroll stagger-${i + 1}`}>
                <div className="font-display text-[20px] font-bold text-accent">{item.label}</div>
                <p className="mt-2 font-body text-[14px] leading-relaxed text-white/70">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — HOW IT WORKS */}
      <section className="bg-white px-6 md:px-10 py-[80px]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16 reveal-on-scroll">
            <span className="font-body text-[13px] font-semibold uppercase tracking-[2px] text-accent">
              How it works
            </span>
            <h2 className="mt-3 font-display text-[clamp(28px,4vw,42px)] font-bold text-bark">
              Onboarded personally, in days.
            </h2>
            <p className="mt-3 font-body text-[18px] text-text-light max-w-2xl mx-auto">
              We set up your community, load your documents and events, and configure resident
              verification. You go live — with us on call.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Tell us about your community",
                desc: "Book a short call. We learn how your board, manager, or neighborhood communicates today.",
              },
              {
                step: "02",
                title: "We set it up",
                desc: "We brand your site, load your documents and events, and configure resident verification.",
              },
              {
                step: "03",
                title: "Invite your neighbors",
                desc: "Residents sign up, get verified, and start connecting — with us on call while you get started.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`rounded-2xl border border-border bg-cream p-8 reveal-on-scroll stagger-${i + 1}`}
              >
                <span className="font-display text-[40px] font-extrabold text-accent/30">
                  {item.step}
                </span>
                <h3 className="mt-4 font-display text-[20px] font-bold text-bark">{item.title}</h3>
                <p className="mt-2 font-body text-[15px] leading-relaxed text-text-light">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — EARLY ACCESS INVITE */}
      <section className="bg-cream px-6 md:px-10 py-[80px]">
        <div className="mx-auto max-w-3xl text-center reveal-on-scroll">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
            <Sparkles className="h-7 w-7" />
          </div>
          <h2 className="font-display text-[clamp(26px,3vw,36px)] font-bold text-bark">
            Help us shape what community software should be.
          </h2>
          <p className="mt-4 font-body text-[18px] leading-relaxed text-text-light max-w-2xl mx-auto">
            NeighborSpace is in early access. We onboard a small number of founding communities
            personally, learn what actually matters, and ship it. If you want a say in how this
            turns out, we’d love to work with you.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/demo"
              className="inline-flex items-center justify-center h-14 rounded-[100px] bg-accent px-8 font-body text-base font-bold text-white transition-all hover:bg-accent-hover hover:translate-y-[-2px] hover:shadow-[0_8px_24px_rgba(2,132,199,0.4)]"
            >
              Book a demo
            </Link>
            <Link
              to="/join"
              className="inline-flex items-center justify-center h-14 rounded-[100px] border-2 border-bark/15 bg-transparent px-8 font-body text-base font-bold text-bark transition-all hover:border-accent hover:text-accent"
            >
              Join the waitlist
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 7 — FINAL CTA */}
      <section
        className="px-6 md:px-10 py-[100px] text-center"
        style={{ background: "linear-gradient(135deg, #0284C7, #06B6D4)" }}
      >
        <div className="mx-auto max-w-3xl reveal-on-scroll">
          <h2 className="font-display text-[clamp(32px,5vw,56px)] font-extrabold text-white leading-tight">
            Be one of our first communities.
          </h2>
          <p className="mt-5 font-body text-[18px] text-white/90">
            We're onboarding a small founding cohort now. Book a free 20-minute walkthrough and see
            NeighborSpace with your community's data.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/demo"
              className="inline-flex items-center justify-center h-14 rounded-[100px] bg-white px-10 font-body text-[18px] font-bold text-accent transition-all hover:translate-y-[-3px] hover:shadow-[0_8px_32px_rgba(0,0,0,0.2)] active:translate-y-0 active:scale-[0.98]"
            >
              Book a demo
            </Link>
            <Link
              to="/features"
              className="inline-flex items-center justify-center h-14 rounded-[100px] border-2 border-white/60 bg-transparent px-10 font-body text-[18px] font-bold text-white transition-all hover:bg-white/10"
            >
              Explore features <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </CC_Layout>
  );
}
