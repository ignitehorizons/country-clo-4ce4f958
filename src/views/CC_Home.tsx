import { useEffect, useState } from "react";
import { CC_Layout } from "@/components/CC_Layout";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/router-compat";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useMeta } from "@/hooks/useMeta";
import {
  ClipboardList,
  Wrench,
  Calendar as CalendarIcon,
  Users,
  AlertTriangle,
  Store,
  MapPin,
} from "lucide-react";
import { CC_LazyMap } from "@/components/CC_LazyMap";

export default function CC_Home() {
  useScrollReveal();
  useMeta({
    title: "Country Close — A quiet community of neighbors",
    description:
      "Country Close is a private neighborhood community platform for residents in Lutz, Florida — bulletin board, maintenance requests, calendar, directory, and safety alerts in one place.",
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
      {/* SECTION 1 — HERO */}
      <section className="relative flex min-h-[92vh] w-full items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            background: "linear-gradient(135deg, #2D5016 0%, #3D6B20 50%, #4A7C2F 100%)",
            transform: `translateY(${Math.min(scrollY * 0.4, 30)}px)`,
          }}
        />

        {/* Subtle SVG Leaf Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 15c0 0 15-5 20 10-5 15-20 10-20 10S15 40 10 25c5-15 20-10 20-10z' fill='%23F7F3ED' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Floating Leaves Removed */}

        {/* Content */}
        <div className="relative z-10 flex w-full max-w-4xl flex-col items-center px-6 text-center">
          <span className="mb-2 font-accent text-[24px] text-accent-dark animate-in fade-in duration-500">
            Welcome to
          </span>
          <h1
            className="font-display font-black leading-tight tracking-[-1px] text-white animate-text-reveal pb-2"
            style={{ fontSize: "clamp(48px, 8vw, 96px)" }}
          >
            Country Close
          </h1>
          <p className="mt-4 font-body text-[22px] font-light text-white/85 animate-in fade-in slide-in-from-bottom-4 duration-600 delay-400 fill-mode-both">
            A quiet community of neighbors in Lutz, Florida
          </p>
          <p className="mt-3 font-body text-[16px] font-normal text-white/70 animate-in fade-in slide-in-from-bottom-4 duration-600 delay-400 fill-mode-both">
            26 homes. Established 1988. A place where neighbors are still neighbors.
          </p>

          <div className="mt-10 flex flex-col w-full sm:w-auto items-center justify-center gap-4 sm:flex-row animate-in fade-in slide-in-from-bottom-4 duration-500 delay-600 fill-mode-both">
            <Link
              to="/join"
              className="w-full sm:w-auto flex items-center justify-center h-14 rounded-[100px] bg-[#E8A020] px-8 text-base font-bold text-[#4A3728] transition-all hover:bg-[#D4911A] hover:translate-y-[-2px] hover:shadow-[0_8px_24px_rgba(232,160,32,0.4)] active:translate-y-0 active:scale-[0.98]"
            >
              Join Our Community
            </Link>
            <Link
              to="/portal"
              className="w-full sm:w-auto flex items-center justify-center h-14 rounded-[100px] border-2 border-white/30 bg-transparent px-8 text-base font-semibold text-white transition-all hover:bg-white/10 hover:text-white"
            >
              Member Login
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2 — QUICK ACTION CARDS */}
      <section className="bg-cream px-10 py-[80px]">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-display text-[clamp(28px,4vw,42px)] font-bold text-bark reveal-on-scroll">
            Everything your neighborhood needs, in one place.
          </h2>
          <p className="mt-3 mb-12 text-center font-body text-[18px] text-text-light reveal-on-scroll">
            Get off Facebook. Stay connected the right way.
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <ClipboardList className="w-8 h-8 text-primary" />,
                title: "Bulletin Board",
                desc: "Community announcements without the drama",
                path: "/portal/bulletin",
              },
              {
                icon: <Wrench className="w-8 h-8 text-primary" />,
                title: "Maintenance Requests",
                desc: "Submit and track neighborhood maintenance",
                path: "/portal/maintenance",
              },
              {
                icon: <CalendarIcon className="w-8 h-8 text-primary" />,
                title: "Community Calendar",
                desc: "Events, meetings, and reminders in one place",
                path: "/portal/calendar",
              },
              {
                icon: <Users className="w-8 h-8 text-primary" />,
                title: "Neighbor Directory",
                desc: "Find neighbors with the skills you need",
                path: "/portal/directory",
              },
              {
                icon: <AlertTriangle className="w-8 h-8 text-[#C0392B]" />,
                title: "Safety Alerts",
                desc: "Emergency broadcasts that reach everyone",
                path: "/portal/safety",
              },
              {
                icon: <Store className="w-8 h-8 text-primary" />,
                title: "Local Sponsors",
                desc: "Support the businesses that support us",
                path: "/sponsors",
              },
            ].map((card, i) => (
              <Link
                key={i}
                to={card.path}
                className={`group flex flex-col items-center rounded-xl border border-border bg-white p-6 px-6 py-8 text-center shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-lg reveal-on-scroll stagger-${(i % 3) + 1}`}
              >
                <div className="mb-4 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-cream text-3xl">
                  {card.icon}
                </div>
                <h3 className="font-body text-[18px] font-bold text-bark group-hover:text-primary transition-colors">
                  {card.title}
                </h3>
                <p className="mt-2 font-body text-[14px] text-text-light">{card.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — RECENT ANNOUNCEMENTS */}
      <section className="bg-white px-10 py-[80px]">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center font-display text-[clamp(28px,4vw,40px)] font-bold text-bark reveal-on-scroll">
            What's Happening in Country Close
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                badge: "Events",
                badgeColor: "bg-accent text-bark",
                title: "Spring Neighborhood Cookout",
                date: "April 12, 2026",
                excerpt:
                  "Join your neighbors for our annual spring cookout. Food, fun, and great company on Country Close.",
              },
              {
                badge: "Safety",
                badgeColor: "bg-[#C0392B] text-white",
                title: "Reminder: Gate Light on Oak Lane",
                date: "April 8, 2026",
                excerpt:
                  "The entrance light on the left pillar is out. Admin has submitted a maintenance request.",
              },
              {
                badge: "General",
                badgeColor: "bg-[#3D7A9E] text-white",
                title: "Welcome New Neighbors!",
                date: "April 3, 2026",
                excerpt:
                  "Please join us in welcoming the Johnson family who recently moved into 14 Country Close.",
              },
            ].map((post, i) => (
              <div
                key={i}
                className={`group rounded-xl border border-border p-7 transition-all duration-300 hover:shadow-md reveal-on-scroll stagger-${i + 1}`}
              >
                <span
                  className={`inline-block rounded-full px-3 py-1 font-body text-[12px] font-bold ${post.badgeColor}`}
                >
                  {post.badge}
                </span>
                <h3 className="mt-3 font-display text-[20px] font-semibold text-bark">
                  {post.title}
                </h3>
                <p className="mt-1.5 font-body text-[13px] text-text-light">{post.date}</p>
                <p className="mt-3 line-clamp-2 font-body text-[14px] leading-relaxed text-text">
                  {post.excerpt}
                </p>
                <Link
                  to="/portal/bulletin"
                  className="mt-4 inline-block font-body text-[14px] font-bold text-primary transition-colors hover:text-accent-dark"
                >
                  Read More →
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/portal/bulletin"
              className="font-body text-[15px] font-bold text-primary transition-colors hover:text-accent-dark"
            >
              View All Announcements →
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 4 — COMMUNITY IDENTITY */}
      <section className="relative overflow-hidden bg-primary px-10 py-[100px]">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10h80v80H10z' fill='none' stroke='%23C4A875' stroke-width='2'/%3E%3Cpath d='M30 30h40v40H30z' fill='none' stroke='%23C4A875' stroke-width='2'/%3E%3C/svg%3E")`,
            backgroundSize: "100px 100px",
          }}
        />

        <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-2 md:gap-8 items-center">
          <div className="reveal-on-scroll">
            <h2 className="font-display text-[clamp(28px,3.5vw,44px)] font-bold italic text-cream">
              "This isn't just a neighborhood. It's Country Close."
            </h2>
            <p className="mt-6 font-body text-[18px] font-light leading-[1.8] text-cream/75">
              A dead-end road with 26 homes and a whole lot of neighborly pride. We don't need an
              HOA to look out for each other.
            </p>
          </div>

          <div className="flex flex-col space-y-8 md:pl-12">
            {[
              { number: "26", label: "HOMES" },
              { number: "Est. 1988", label: "ESTABLISHED" },
              { number: "Lutz FL", label: "LOCATION" },
            ].map((stat, i) => (
              <div key={i} className={`relative reveal-on-scroll stagger-${i + 1}`}>
                {i > 0 && (
                  <div className="absolute -top-4 left-0 h-px w-full bg-cream/10 md:w-3/4" />
                )}
                <div className="font-display text-[clamp(40px,5vw,64px)] font-black text-accent leading-none">
                  {stat.number}
                </div>
                <div className="mt-1 font-body text-[14px] uppercase tracking-[2px] text-cream/70">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — LOCATION MAP WIDGET */}
      <section className="bg-white px-10 py-[100px] overflow-hidden">
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="reveal-on-scroll md:pr-8">
            <h2 className="mb-6 font-display text-[clamp(32px,4vw,48px)] font-bold text-bark leading-tight">
              Find Us in Lutz
            </h2>
            <p className="mb-8 font-body text-[18px] text-text-light leading-relaxed">
              Quietly tucked away, yet close to everything you need. Country Close is located just
              off the main roads, offering a peaceful retreat while keeping you connected to the
              best of Tampa Bay.
            </p>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cream text-primary shrink-0">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-bark">Location</h4>
                  <p className="text-[15px] text-text-light">Country Close, Lutz, FL 33548</p>
                </div>
              </div>
            </div>
          </div>

          <div className="reveal-on-scroll flex justify-center md:justify-end">
            {/* iPhone Mockup Wrapper */}
            <div
              className="relative w-full max-w-[320px] shadow-2xl rounded-[3.5rem] border-12 border-[#1a1a1a] overflow-hidden bg-cream"
              style={{
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(0,0,0,0.1)",
              }}
            >
              {/* iPhone Notch */}
              <div className="absolute top-0 inset-x-0 h-6 bg-[#1a1a1a] w-[140px] mx-auto rounded-b-2xl z-20" />

              <CC_LazyMap
                height="650px"
                zoom={15.4}
                pitch={0}
                bearing={0}
                initialLat={28.17375}
                initialLng={-82.4664}
                outlineGeoJson={{
                  type: "Feature",
                  properties: {},
                  geometry: {
                    type: "Polygon",
                    coordinates: [
                      [
                        [-82.4673, 28.1717],
                        [-82.465, 28.1717],
                        [-82.465, 28.1758],
                        [-82.4678, 28.1758],
                        [-82.4678, 28.1755],
                        [-82.4671, 28.1755],
                        [-82.4671, 28.1735],
                        [-82.4678, 28.1735],
                        [-82.4678, 28.1722],
                        [-82.4673, 28.1722],
                        [-82.4673, 28.1717],
                      ],
                    ],
                  },
                }}
                pins={[
                  {
                    id: 1,
                    lat: 28.1745,
                    lng: -82.4665,
                    title: "Community Clubhouse",
                    color: "#E8A020",
                  },
                  {
                    id: 2,
                    lat: 28.173,
                    lng: -82.4655,
                    title: "Tennis Court",
                    color: "#E8A020",
                  },
                  {
                    id: 3,
                    lat: 28.1735,
                    lng: -82.466,
                    title: "BBQ Pavilion",
                    color: "#E8A020",
                  },
                  {
                    id: 4,
                    lat: 28.1725,
                    lng: -82.467,
                    title: "Lake Access",
                    color: "#6BA3BE",
                  },
                ]}
                interactive={true}
                className="rounded-[2.5rem] border-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — FOUNDING PARTNER BANNER */}
      <section className="bg-cream px-10 py-[60px]">
        <div className="mx-auto max-w-3xl text-center reveal-on-scroll">
          <h2 className="mb-3 font-display text-[clamp(24px,3vw,32px)] font-bold text-bark">
            Be one of Country Close's first community partners
          </h2>
          <p className="mb-8 font-body text-[17px] text-text-light">
            We're building our founding partner program — local businesses that support Country
            Close residents. No fake logos, no placeholder listings. Just real local businesses,
            joining as we grow.
          </p>
          <Link
            to="/sponsors"
            className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3 font-body text-[15px] font-bold text-bark transition-all hover:bg-accent-hover hover:-translate-y-0.5"
          >
            Become a Community Partner →
          </Link>
        </div>
      </section>

      {/* SECTION 6 — JOIN CTA */}
      <section
        className="px-10 py-[100px] text-center"
        style={{ background: "linear-gradient(135deg, #E8A020, #C4A875)" }}
      >
        <div className="mx-auto max-w-3xl reveal-on-scroll">
          <h2 className="font-display text-[clamp(32px,5vw,56px)] font-black text-bark leading-tight">
            Your neighborhood is waiting for you.
          </h2>
          <p className="mt-5 font-body text-[18px] text-bark/85">
            Join CountryClose.com — free for Country Close residents. Private, simple, and actually
            useful.
          </p>

          <Link
            to="/join"
            className="mt-10 inline-flex items-center justify-center h-14 rounded-[100px] bg-primary px-12 py-[18px] font-body text-[18px] font-bold text-white shadow-[0_8px_32px_rgba(45,80,22,0.3)] transition-all hover:translate-y-[-3px] hover:bg-primary-light active:translate-y-0 active:scale-[0.98] reveal-on-scroll stagger-2"
          >
            Join the Community
          </Link>
        </div>
      </section>
    </CC_Layout>
  );
}
