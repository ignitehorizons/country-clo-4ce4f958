import { useState } from "react";
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
  ArrowRight,
  ArrowRightLeft,
  Sparkles,
  ShieldCheck,
  Landmark,
  CheckCircle2,
  Phone,
  Mail,
  CalendarCheck,
  BadgeCheck,
  Home,
  MapPin,
  Layers,
  FileStack,
  Wallet,
  Megaphone,
  ShoppingCart,
} from "lucide-react";

const HERO_BANNER_DESKTOP =
  "https://assets.cdn.filesafe.space/fTWpkc2JrzTyLdcaKxJD/media/6ae9240bce53a65ab21e1457.webp";
const HERO_BANNER_MOBILE =
  "https://vibe.filesafe.space/1791050574073732793/attachments/0c3e8476-2809-4f8c-8e0f-4cdd881795f6.webp";

type Status = "live" | "dev" | "soon" | "beta" | "builder";

const STATUS_LABEL: Record<Status, string> = {
  live: "Live",
  dev: "In development",
  soon: "Coming soon",
  beta: "In beta",
  builder: "Founding builders wanted",
};

export default function CC_Home() {
  useScrollReveal();
  const [heroLoaded, setHeroLoaded] = useState(false);
  useMeta({
    title: "NeighborSpace — Where Communities Connect",
    description:
      "NeighborSpace is a private, branded home for your community — announcements, events, a verified neighbor directory, violations tracking, and tools for builders in one place for your HOA, condo association, or neighborhood.",
  });

  return (
    <CC_Layout>
      {/* HERO — banner + headline block (unchanged structure) */}
      {/* Sits directly BELOW the 64px solid navy header on mobile, 72px on desktop */}
      <section className="relative w-full bg-[#0B1426] pt-[64px] md:pt-[72px]">
        <div className="w-full bg-[#0B1426] flex items-center justify-center overflow-hidden">
          <div
            className={`hero-lantern relative w-full max-w-[1400px] ${heroLoaded ? "lights-on" : ""}`}
          >
            <picture className="block w-full h-full">
              <source media="(min-width: 768px)" srcSet={HERO_BANNER_DESKTOP} />
              <img
                src={HERO_BANNER_MOBILE}
                alt="NeighborSpace hero banner — Where Communities Connect, with NS lantern and wooden park bench"
                className="hero-lantern__img block w-full h-auto object-contain"
                onLoad={() => setHeroLoaded(true)}
                onError={() => setHeroLoaded(false)}
              />
            </picture>
            {heroLoaded && (
              <div aria-hidden="true" className="hero-lantern__mask pointer-events-none absolute" />
            )}
            {heroLoaded && (
              <div aria-hidden="true" className="hero-lantern__glow pointer-events-none absolute" />
            )}
          </div>
        </div>

        {/* Centered text block on navy — UPDATED subheadline */}
        <div className="bg-primary px-5 md:px-6 pt-8 pb-14 md:py-[88px]">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 font-body text-[13px] font-semibold text-accent">
              <span className="h-2 w-2 rounded-full bg-accent" />
              Now in early access
            </span>
            <h2 className="mt-6 font-display font-extrabold text-[32px] md:text-[clamp(36px,5vw,52px)] leading-[1.2] tracking-tight text-white">
              A private, branded home for your community.
            </h2>
            <p className="mt-6 font-body text-[17px] md:text-[20px] font-normal leading-[1.65] text-[#E3EAF5] max-w-2xl mx-auto">
              Announcements, events, verified neighbors, violations tracking, and tools for builders
              — one private, branded platform for HOAs, condo associations, neighborhoods,
              management companies, and developers.
            </p>
            <div className="mt-8 md:mt-10 flex flex-col w-full sm:w-auto items-stretch sm:items-center justify-center gap-3 sm:gap-4 sm:flex-row">
              <Link
                to="/demo"
                className="w-full sm:w-auto flex items-center justify-center whitespace-nowrap min-h-[48px] h-12 sm:h-14 rounded-[100px] bg-accent px-8 text-base font-bold text-white transition-all hover:bg-accent-hover hover:translate-y-[-2px] hover:shadow-[0_8px_24px_rgba(2,132,199,0.4)] active:translate-y-0 active:scale-[0.98]"
              >
                Book a demo
              </Link>
              <Link
                to="/portal"
                className="w-full sm:w-auto flex items-center justify-center whitespace-nowrap min-h-[48px] h-12 sm:h-14 rounded-[100px] border-2 border-white/30 bg-transparent px-8 text-base font-semibold text-white transition-all hover:bg-white/10 hover:text-white"
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

      {/* SECTION 1 — WHO IT'S FOR */}
      <section className="bg-primary px-5 md:px-6 py-14 md:py-[80px]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-10 md:mb-14 reveal-on-scroll">
            <span className="font-body text-[13px] font-semibold uppercase tracking-[2px] text-accent">
              Built for every kind of community
            </span>
            <h2 className="mt-3 font-display text-[28px] md:text-[clamp(28px,4vw,42px)] font-bold text-white leading-tight">
              One platform. Every role in the community.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Users,
                title: "Residents & neighborhoods",
                desc: "Stay in the loop, find trusted neighbors, and never miss what's happening — even without an HOA.",
              },
              {
                icon: ShieldCheck,
                title: "HOA & condo boards",
                desc: "Communicate clearly, keep records organized, and handle issues consistently.",
              },
              {
                icon: Building2,
                title: "Management companies",
                desc: "Run every community in your portfolio from one login, each with its own branded site.",
              },
              {
                icon: Layers,
                title: "Builders & developers",
                desc: "Sell, build, and hand off your community with one platform from first sale to final board turnover.",
              },
            ].map((card, i) => (
              <div
                key={card.title}
                className={`group flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 md:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:bg-white/10 reveal-on-scroll stagger-${(i % 3) + 1}`}
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
                  <card.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-[17px] font-bold text-white group-hover:text-accent transition-colors">
                  {card.title}
                </h3>
                <p className="mt-2 font-body text-[14px] leading-relaxed text-white/70">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2 — THE CORE PLATFORM (Live cards) */}
      <section className="bg-cream px-5 md:px-10 py-14 md:py-[80px]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-10 md:mb-14 reveal-on-scroll">
            <span className="font-body text-[13px] font-semibold uppercase tracking-[2px] text-accent">
              Live today
            </span>
            <h2 className="mt-3 font-display text-[28px] md:text-[clamp(28px,4vw,42px)] font-bold text-bark leading-tight">
              The essentials every community needs.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: ClipboardList,
                title: "Bulletin board",
                desc: "Announcements without the drama. Moderated, organized, and actually useful.",
              },
              {
                icon: CalendarIcon,
                title: "Calendar & events",
                desc: "Meetings and community events in one shared calendar.",
              },
              {
                icon: Users,
                title: "Resident directory",
                desc: "A private, opt-in directory so neighbors can find the skills and contacts they need.",
              },
              {
                icon: ShieldCheck,
                title: "Resident verification",
                desc: "Every member is verified by address and approved by your board — no strangers, no spam.",
              },
              {
                icon: Landmark,
                title: "Resource & officials directory",
                desc: "Local services, utilities, and elected officials in one place.",
              },
              {
                icon: BadgeCheck,
                title: "Your brand, your site",
                desc: "Every community gets its own branded site with its name, colors, and logo.",
              },
            ].map((card, i) => (
              <div
                key={card.title}
                className={`group relative flex flex-col w-full rounded-2xl border border-border bg-white p-6 md:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-lg reveal-on-scroll stagger-${(i % 3) + 1}`}
              >
                <span className="status-badge status-live absolute top-4 right-4">Live</span>
                <div className="mb-4 md:mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <card.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-[18px] font-bold text-bark group-hover:text-accent transition-colors pr-16">
                  {card.title}
                </h3>
                <p className="mt-2 font-body text-[15px] md:text-[14px] leading-relaxed text-text-light">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — SPOTLIGHT: VIOLATIONS & COMPLIANCE */}
      <section className="bg-[#13213A] px-5 md:px-10 py-14 md:py-[88px]">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-10 md:gap-14 md:grid-cols-2 md:items-center">
            {/* Text column */}
            <div className="reveal-on-scroll">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="status-badge status-dev">In development</span>
                <span className="font-body text-[12px] font-bold uppercase tracking-wider text-accent">
                  For community managers
                </span>
              </div>
              <h2 className="font-display text-[28px] md:text-[clamp(28px,4vw,40px)] font-bold text-white leading-tight">
                Violations, handled in the field — not at the desk.
              </h2>
              <p className="mt-5 font-body text-[16px] md:text-[17px] leading-relaxed text-[#E3EAF5]">
                Community managers document an issue on the spot and the system does the rest: the
                right homeowner, the right rule, the right notice, and a clear record of every step.
              </p>
              <ul className="mt-6 flex flex-col gap-3">
                {[
                  "Snap photos and tag the exact location by GPS",
                  "Owner details fill in automatically from the address",
                  'Pick the rule from your community\'s documents — or add "Other"',
                  "Notices go to the homeowner and board automatically, with a cure deadline",
                  "See when a notice is opened, with color-coded deadlines at a glance",
                  "Export reports and see trends across your community",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 flex-none text-accent mt-0.5" />
                    <span className="font-body text-[15px] leading-relaxed text-white/85">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 font-body text-[14px] leading-relaxed text-[#C9D4E5]">
                NeighborSpace documents and delivers notices. Your association's governing documents
                and Florida law determine the enforcement process.
              </p>
              <Link
                to="/demo"
                className="mt-8 inline-flex items-center justify-center min-h-[48px] h-12 rounded-[100px] bg-accent px-7 font-body text-base font-bold text-white transition-all hover:bg-accent-hover hover:translate-y-[-2px] hover:shadow-[0_8px_24px_rgba(2,132,199,0.4)]"
              >
                Join the violations pilot
              </Link>
            </div>

            {/* Visual — phone mockup (CSS only) */}
            <div className="flex justify-center md:justify-end reveal-on-scroll">
              <div className="relative w-full max-w-[300px]">
                {/* Phone frame */}
                <div className="rounded-[2.5rem] border-4 border-white/15 bg-[#0B1426] p-3 shadow-2xl">
                  {/* Notch */}
                  <div className="absolute left-1/2 top-3 h-5 w-24 -translate-x-1/2 rounded-full bg-white/10" />
                  <div className="mt-6 overflow-hidden rounded-[2rem] bg-[#16233a]">
                    {/* Photo placeholder */}
                    <div className="relative h-36 w-full bg-gradient-to-br from-[#1e293b] to-[#0f172a] flex items-center justify-center">
                      <div className="h-12 w-16 rounded-md bg-white/10 border border-white/10 flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-white/40" />
                      </div>
                      <span className="absolute bottom-2 left-3 rounded-full bg-black/40 px-2 py-0.5 text-[10px] font-medium text-white/80">
                        GPS · 28.21° N
                      </span>
                    </div>
                    {/* Card body */}
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-display text-[15px] font-bold text-white">
                          123 Oak Lane
                        </span>
                        <span className="rounded-full bg-[#1e88e5] px-2.5 py-0.5 text-[10px] font-bold text-white">
                          Notice sent
                        </span>
                      </div>
                      <p className="mt-1 font-body text-[12px] text-white/60">Landscaping — 4.2</p>
                      <div className="mt-3 flex items-center gap-2 rounded-lg bg-[#f59e0b]/15 px-3 py-2">
                        <ShieldAlert className="h-4 w-4 text-[#f59e0b]" />
                        <span className="font-body text-[12px] font-semibold text-[#f59e0b]">
                          Cure by Dec 15
                        </span>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="font-body text-[11px] text-white/40">Opened 2h ago</span>
                        <span className="font-body text-[11px] text-white/40">Photo 1 of 3</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — SPOTLIGHT: BUILT FOR BUILDERS */}
      <section className="bg-primary px-5 md:px-10 py-14 md:py-[88px]">
        <div className="mx-auto max-w-6xl reveal-on-scroll">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <div className="flex justify-center mb-4">
              <span className="status-badge status-builder">Founding builders wanted</span>
            </div>
            <span className="font-body text-[13px] font-semibold uppercase tracking-[2px] text-accent">
              For builders & developers
            </span>
            <h2 className="mt-3 font-display text-[28px] md:text-[clamp(28px,4vw,42px)] font-bold text-white leading-tight">
              From first sale to final handoff.
            </h2>
            <p className="mt-4 font-body text-[16px] md:text-[17px] leading-relaxed text-[#E3EAF5]">
              Most community software starts after the builder leaves. NeighborSpace starts on day
              one — and makes the transition to a resident-run board smooth, documented, and
              drama-free.
            </p>
          </div>

          {/* Horizontal 5-step timeline (vertical on mobile) */}
          <div className="grid grid-cols-1 gap-8 md:gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {[
              {
                icon: Megaphone,
                step: "01",
                title: "Pre-sale",
                desc: "Branded landing pages and interest lists for future buyers.",
              },
              {
                icon: MapPin,
                step: "02",
                title: "Construction",
                desc: "Progress updates and a lot map buyers can follow.",
              },
              {
                icon: Home,
                step: "03",
                title: "Move-in",
                desc: "Buyer portal with documents, contacts, and community info.",
              },
              {
                icon: ShieldCheck,
                step: "04",
                title: "Warranty",
                desc: "Homeowners submit and track warranty requests in one place.",
              },
              {
                icon: ArrowRightLeft,
                step: "05",
                title: "Board handoff",
                desc: "A staged, documented transfer of control to the elected resident board.",
              },
            ].map((s, i) => (
              <div
                key={s.title}
                className={`flex flex-col items-center text-center reveal-on-scroll stagger-${i + 1}`}
              >
                <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 ring-4 ring-accent/5">
                  <s.icon className="h-6 w-6 text-accent" />
                  <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-white">
                    {s.step}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-[17px] font-bold text-white">{s.title}</h3>
                <p className="mt-2 font-body text-[13px] leading-relaxed text-white/65">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/demo"
              className="inline-flex items-center justify-center min-h-[48px] h-12 rounded-[100px] bg-accent px-7 font-body text-base font-bold text-white transition-all hover:bg-accent-hover hover:translate-y-[-2px] hover:shadow-[0_8px_24px_rgba(2,132,199,0.4)]"
            >
              Talk to us about your development
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 5 — FOR MANAGEMENT COMPANIES */}
      <section className="bg-cream px-5 md:px-10 py-14 md:py-[80px]">
        <div className="mx-auto max-w-6xl reveal-on-scroll">
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
            <div className="flex justify-center mb-4">
              <span className="status-badge status-beta">In beta</span>
            </div>
            <h2 className="font-display text-[28px] md:text-[clamp(28px,4vw,42px)] font-bold text-bark leading-tight">
              Your whole portfolio. One login.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 md:gap-6 md:grid-cols-3">
            {[
              {
                icon: BadgeCheck,
                title: "Every community, branded",
                desc: "Each community gets its own site, while you manage them all from one place.",
              },
              {
                icon: ShieldCheck,
                title: "The right access for every role",
                desc: "Corporate, community managers, lifestyle directors, board members, and residents each see what they should.",
              },
              {
                icon: Layers,
                title: "Built around how you work",
                desc: "Your hierarchy and workflows are configured, not hard-coded.",
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className={`flex flex-col rounded-2xl border border-border bg-white p-6 md:p-7 reveal-on-scroll stagger-${i + 1}`}
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-[18px] font-bold text-bark">{item.title}</h3>
                <p className="mt-2 font-body text-[14px] leading-relaxed text-text-light">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — COMMUNICATION THAT REACHES EVERYONE */}
      <section className="bg-primary px-5 md:px-10 py-14 md:py-[80px]">
        <div className="mx-auto max-w-4xl text-center reveal-on-scroll">
          <div className="flex justify-center mb-4">
            <span className="status-badge status-beta">In beta</span>
          </div>
          <h2 className="font-display text-[28px] md:text-[clamp(28px,4vw,42px)] font-bold text-white leading-tight">
            Email, text, and events — connected.
          </h2>
          <p className="mt-4 font-body text-[16px] md:text-[17px] leading-relaxed text-[#E3EAF5] max-w-2xl mx-auto">
            Send announcements by email and text, manage event sign-ups, and keep every resident
            contact organized in a built-in CRM.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-5 md:gap-8">
            {[
              { icon: Mail, label: "Email" },
              { icon: Phone, label: "Text" },
              { icon: CalendarCheck, label: "Events" },
            ].map((c) => (
              <div
                key={c.label}
                className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2"
              >
                <c.icon className="h-5 w-5 text-accent" />
                <span className="font-body text-[14px] font-semibold text-white/85">{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — COMING NEXT */}
      <section className="bg-cream px-5 md:px-10 py-14 md:py-[80px]">
        <div className="mx-auto max-w-6xl reveal-on-scroll">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="font-display text-[28px] md:text-[clamp(28px,4vw,42px)] font-bold text-bark leading-tight">
              What's coming next
            </h2>
            <p className="mt-3 font-body text-[16px] md:text-[17px] leading-relaxed text-text-light max-w-2xl mx-auto">
              Shaped by our founding communities. See the full roadmap.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Wallet,
                title: "Dues & payments",
                desc: "Online dues with a clear ledger for every household.",
              },
              {
                icon: Wrench,
                title: "Maintenance requests",
                desc: "Submit with photos, track to completion.",
              },
              {
                icon: Vote,
                title: "Voting & elections",
                desc: "Board elections and surveys, online.",
              },
              {
                icon: FileStack,
                title: "Board hub",
                desc: "Documents, minutes, and governance in one place.",
              },
              {
                icon: Megaphone,
                title: "Safety alerts",
                desc: "Emergency broadcasts to every resident, instantly.",
              },
              {
                icon: CalendarIcon,
                title: "Calendar & voice assistants",
                desc: "Community events in your phone's calendar — and on Alexa.",
              },
              {
                icon: ShoppingCart,
                title: "Community Fund",
                desc: "A community-run shopping portal where purchases earn money back for your association.",
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className={`group relative flex flex-col rounded-2xl border border-border bg-white p-5 md:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-md reveal-on-scroll stagger-${(i % 3) + 1}`}
              >
                <span className="status-badge status-soon absolute top-4 right-4">Coming soon</span>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-[16px] font-bold text-bark pr-16">{item.title}</h3>
                <p className="mt-1.5 font-body text-[13px] leading-relaxed text-text-light">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/roadmap"
              className="inline-flex items-center gap-2 font-body text-[15px] font-bold text-accent hover:text-accent-hover transition-colors"
            >
              View the full roadmap <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 8 — KEEP: "We're building NeighborSpace in the open" + "How it works" */}
      <section className="bg-primary px-5 md:px-6 py-14 md:py-[80px]">
        <div className="mx-auto max-w-5xl text-center">
          <span className="font-body text-[13px] font-semibold uppercase tracking-[2px] text-accent">
            Now in early access
          </span>
          <h2 className="mt-4 font-display text-[26px] md:text-[clamp(26px,4vw,38px)] font-bold text-white max-w-3xl mx-auto leading-tight">
            We're building NeighborSpace in the open — with founding communities, not for them.
          </h2>
          <div className="mt-10 md:mt-12 grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-3">
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
                <p className="mt-2 font-body text-[15px] md:text-[14px] leading-relaxed text-white/70">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 md:px-10 py-14 md:py-[80px]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-10 md:mb-16 reveal-on-scroll">
            <span className="font-body text-[13px] font-semibold uppercase tracking-[2px] text-accent">
              How it works
            </span>
            <h2 className="mt-3 font-display text-[28px] md:text-[clamp(28px,4vw,42px)] font-bold text-bark leading-tight">
              Onboarded personally, in days.
            </h2>
            <p className="mt-3 font-body text-[17px] md:text-[18px] leading-[1.65] text-text-light max-w-2xl mx-auto">
              We set up your community, load your documents and events, and configure resident
              verification. You go live — with us on call.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-3">
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
                className={`rounded-2xl border border-border bg-cream p-6 md:p-8 reveal-on-scroll stagger-${i + 1}`}
              >
                <span className="font-display text-[36px] md:text-[40px] font-extrabold text-accent/30">
                  {item.step}
                </span>
                <h3 className="mt-3 md:mt-4 font-display text-[20px] font-bold text-bark">
                  {item.title}
                </h3>
                <p className="mt-2 font-body text-[15px] leading-relaxed text-text-light">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9 — ONE FINAL CALL TO ACTION */}
      <section
        className="px-5 md:px-10 py-16 md:py-[100px] text-center"
        style={{ background: "linear-gradient(135deg, #0284C7, #06B6D4)" }}
      >
        <div className="mx-auto max-w-3xl reveal-on-scroll">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-white">
            <Sparkles className="h-7 w-7" />
          </div>
          <h2 className="font-display text-[30px] md:text-[clamp(32px,5vw,56px)] font-extrabold text-white leading-tight">
            Be one of our founding communities.
          </h2>
          <p className="mt-4 md:mt-5 font-body text-[17px] md:text-[18px] leading-[1.65] text-white/90">
            We onboard a small number of HOAs, managers, and builders personally. Book a free
            20-minute walkthrough and see NeighborSpace with your community's data.
          </p>
          <div className="mt-8 md:mt-10 flex flex-col w-full sm:w-auto items-stretch sm:items-center justify-center gap-3 sm:gap-4 sm:flex-row">
            <Link
              to="/demo"
              className="w-full sm:w-auto inline-flex items-center justify-center min-h-[48px] h-12 sm:h-14 rounded-[100px] bg-white px-8 md:px-10 font-body text-[16px] md:text-[18px] font-bold text-accent transition-all hover:translate-y-[-3px] hover:shadow-[0_8px_32px_rgba(0,0,0,0.2)] active:translate-y-0 active:scale-[0.98]"
            >
              Book a demo
            </Link>
            <Link
              to="/roadmap"
              className="w-full sm:w-auto inline-flex items-center justify-center min-h-[48px] h-12 sm:h-14 rounded-[100px] border-2 border-white/60 bg-transparent px-8 md:px-10 font-body text-[16px] md:text-[18px] font-bold text-white transition-all hover:bg-white/10"
            >
              View the roadmap
            </Link>
          </div>
        </div>
      </section>
    </CC_Layout>
  );
}
