import { useEffect, useState } from "react";
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
} from "lucide-react";

export default function CC_Home() {
  useScrollReveal();
  useMeta({
    title: "neighborspace — The operating system for connected communities",
    description:
      "neighborspace is the all-in-one community management platform for HOAs, condo associations, and neighborhoods — dues, maintenance, violations, voting, and resident communication in one place.",
  });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <CC_Layout>
      {/* SECTION 1 — HERO (dashboard-style) */}
      <section className="relative flex min-h-[92vh] w-full items-center justify-center overflow-hidden bg-primary">
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            background: "linear-gradient(135deg, #0F172A 0%, #1E293B 55%, #0F172A 100%)",
            transform: `translateY(${Math.min(scrollY * 0.4, 30)}px)`,
          }}
        />
        {/* Glow accents */}
        <div
          className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, #0284C7 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(circle, #06B6D4 0%, transparent 70%)" }}
        />

        <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-24 md:grid-cols-2">
          {/* Left — copy */}
          <div className="text-center md:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 font-body text-[13px] font-semibold text-accent">
              <span className="h-2 w-2 rounded-full bg-accent" />
              Now in early access
            </span>
            <h1
              className="mt-6 font-display font-extrabold leading-[1.05] tracking-tight text-white animate-text-reveal pb-2"
              style={{ fontSize: "clamp(40px, 6vw, 72px)" }}
            >
              The operating system for <span className="text-accent">connected communities</span>
            </h1>
            <p className="mt-6 font-body text-[20px] font-light leading-relaxed text-white/80 max-w-xl mx-auto md:mx-0">
              Dues, maintenance, violations, voting, and resident communication — one platform for
              HOAs, condo associations, and neighborhoods. Built for boards, managers, and the
              people who live there.
            </p>
            <div className="mt-10 flex flex-col w-full sm:w-auto items-center justify-center gap-4 sm:flex-row md:justify-start">
              <Link
                to="/pricing"
                className="w-full sm:w-auto flex items-center justify-center h-14 rounded-[100px] bg-accent px-8 text-base font-bold text-white transition-all hover:bg-accent-hover hover:translate-y-[-2px] hover:shadow-[0_8px_24px_rgba(2,132,199,0.4)] active:translate-y-0 active:scale-[0.98]"
              >
                See pricing
              </Link>
              <Link
                to="/demo"
                className="w-full sm:w-auto flex items-center justify-center h-14 rounded-[100px] border-2 border-white/30 bg-transparent px-8 text-base font-semibold text-white transition-all hover:bg-white/10 hover:text-white"
              >
                Book a demo
              </Link>
            </div>
            <div className="mt-8 flex items-center justify-center md:justify-start gap-2 font-body text-[13px] text-white/60">
              <CheckCircle2 className="h-4 w-4 text-accent" />
              Free for residents · No setup fees · Cancel anytime
            </div>
          </div>

          {/* Right — dashboard mockup */}
          <div className="reveal-on-scroll hidden md:block">
            <div
              className="rounded-2xl border border-white/10 bg-white/5 p-2 shadow-2xl backdrop-blur"
              style={{ boxShadow: "0 30px 60px -20px rgba(0,0,0,0.6)" }}
            >
              <div className="rounded-xl bg-cream p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-display text-[15px] font-bold text-bark">
                    Community overview
                  </span>
                  <span className="rounded-full bg-accent/10 px-3 py-1 font-body text-[11px] font-semibold text-accent">
                    Live
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Dues collected", value: "$48,200", icon: CreditCard },
                    { label: "Open requests", value: "12", icon: Wrench },
                    { label: "Violations", value: "3", icon: ShieldAlert },
                    { label: "Active votes", value: "2", icon: Vote },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-lg border border-border bg-white p-4">
                      <stat.icon className="h-5 w-5 text-accent" />
                      <div className="mt-3 font-display text-[22px] font-bold text-bark">
                        {stat.value}
                      </div>
                      <div className="font-body text-[12px] text-text-light">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-lg border border-border bg-white p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-body text-[13px] font-semibold text-bark">
                      Spring cookout announcement
                    </span>
                    <span className="font-body text-[11px] text-text-light">Apr 12</span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-light-gray">
                    <div className="h-2 w-3/4 rounded-full bg-accent" />
                  </div>
                </div>
              </div>
            </div>
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
              Everything your community needs, in one place.
            </h2>
            <p className="mt-3 font-body text-[18px] text-text-light">
              Stop juggling spreadsheets, group chats, and paper notices. neighborspace brings it
              all together.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: CreditCard,
                title: "Dues & payments",
                desc: "Collect dues online by ACH or card. Automated reminders, late fees, and a clear ledger for every household.",
                path: "/features",
              },
              {
                icon: Wrench,
                title: "Maintenance requests",
                desc: "Residents submit requests with photos. Assign vendors and track each one through completion.",
                path: "/features",
              },
              {
                icon: ShieldAlert,
                title: "Violations & compliance",
                desc: "Document violations against the right rule, track architectural reviews, and keep a full record.",
                path: "/features",
              },
              {
                icon: Vote,
                title: "Voting & elections",
                desc: "Run board elections and surveys with verifiable, transparent results — no more paper ballots.",
                path: "/features",
              },
              {
                icon: CalendarIcon,
                title: "Calendar & events",
                desc: "Meetings, amenities, and community events in one shared calendar with reminders.",
                path: "/features",
              },
              {
                icon: Users,
                title: "Resident directory",
                desc: "A private, verified directory so neighbors can find the skills and contacts they need.",
                path: "/features",
              },
              {
                icon: Bell,
                title: "Safety alerts",
                desc: "Emergency broadcasts that reach every resident instantly — by app, email, or text.",
                path: "/features",
              },
              {
                icon: ClipboardList,
                title: "Bulletin board",
                desc: "Community announcements without the drama. Moderated, organized, and actually useful.",
                path: "/features",
              },
              {
                icon: Building2,
                title: "Board hub",
                desc: "Documents, meeting notes, and governance in one place the whole board can actually use.",
                path: "/features",
              },
            ].map((card, i) => (
              <Link
                key={i}
                to={card.path}
                className={`group flex flex-col rounded-2xl border border-border bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-lg reveal-on-scroll stagger-${(i % 3) + 1}`}
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <card.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-[18px] font-bold text-bark group-hover:text-accent transition-colors">
                  {card.title}
                </h3>
                <p className="mt-2 font-body text-[14px] leading-relaxed text-text-light">
                  {card.desc}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 font-body text-[13px] font-semibold text-accent">
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
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
            We're building neighborspace in the open — with founding communities, not for them.
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
                label: "Simple, honest pricing",
                desc: "Free for residents, no setup fees, cancel anytime.",
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
              We set up your community, import your records, and walk your board through every
              setting. You go live with real data — and us on call.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Import your data",
                desc: "Our team migrates owner and resident records, financial data, and documents from your current system.",
              },
              {
                step: "02",
                title: "Configure & review",
                desc: "Set up dues, roles, and rules. We walk your board through every setting before you go live.",
              },
              {
                step: "03",
                title: "Go live",
                desc: "Invite residents and start collecting dues, requests, and votes — with us on call while you're getting started.",
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
            neighborspace is in early access. We onboard a small number of founding communities
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
            neighborspace with your community's data.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/demo"
              className="inline-flex items-center justify-center h-14 rounded-[100px] bg-white px-10 font-body text-[18px] font-bold text-accent transition-all hover:translate-y-[-3px] hover:shadow-[0_8px_32px_rgba(0,0,0,0.2)] active:translate-y-0 active:scale-[0.98]"
            >
              Book a demo
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center h-14 rounded-[100px] border-2 border-white/60 bg-transparent px-10 font-body text-[18px] font-bold text-white transition-all hover:bg-white/10"
            >
              View pricing
            </Link>
          </div>
        </div>
      </section>
    </CC_Layout>
  );
}
