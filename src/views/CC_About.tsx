import { CC_Layout } from "@/components/CC_Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Shield, Layers } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useMeta } from "@/hooks/useMeta";
import { Link } from "@/lib/router-compat";

export default function CC_About() {
  useScrollReveal();
  useMeta({
    title: "About | neighborspace",
    description:
      "neighborspace is the all-in-one community management platform for HOAs, condo associations, and neighborhoods — built to replace spreadsheets, group chats, and paper notices with one source of truth.",
  });
  return (
    <CC_Layout>
      {/* Hero */}
      <section
        className="w-full flex items-center justify-center text-center px-4"
        style={{
          height: "440px",
          background: "linear-gradient(135deg, #0F172A 0%, #1E293B 60%, #0F172A 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto">
          <span className="font-body text-accent text-[20px] block mb-4 font-semibold">
            The operating system for connected communities
          </span>
          <h1 className="font-display text-white text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
            About neighborspace
          </h1>
          <p className="text-white/90 font-body text-lg md:text-xl">
            One platform for dues, maintenance, violations, voting, and resident communication —
            built for boards, managers, and the people who live there.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="reveal-on-scroll">
            <h2 className="text-3xl md:text-4xl font-display text-bark font-bold mb-6">
              Built to replace the chaos
            </h2>
            <div className="space-y-4 text-text-light font-body text-lg leading-relaxed">
              <p>
                Every community ends up running on the same stack: a spreadsheet for dues, a group
                chat for announcements, a paper log for violations, and a filing cabinet for
                documents. neighborspace replaces all of it with one source of truth.
              </p>
              <p>
                We built it for the boards who volunteer their time, the managers who juggle
                portfolios, and the residents who just want to know what's going on — without
                scrolling through a Facebook group at 11 p.m.
              </p>
              <p>
                From a 26-home neighborhood to a 500-unit association, neighborspace is built to
                grow with your community and keep every record in one place.
              </p>
            </div>
          </div>
          <div
            className="reveal-on-scroll stagger-2 rounded-2xl border border-border bg-cream p-8"
            style={{ boxShadow: "0 10px 40px -10px rgba(15,23,42,0.15)" }}
          >
            <div className="grid grid-cols-2 gap-6">
              {[
                { number: "Beta", label: "Now in early access" },
                { number: "1:1", label: "Hands-on onboarding" },
                { number: "Open", label: "Public roadmap" },
                { number: "$0", label: "For residents, always" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-[36px] font-extrabold text-accent leading-none">
                    {stat.number}
                  </div>
                  <div className="mt-1 font-body text-[13px] uppercase tracking-[1px] text-text-light">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 md:px-8 bg-light-gray border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal-on-scroll">
            <span className="font-body text-accent text-[20px] block mb-2 font-semibold">
              What we believe
            </span>
            <h2 className="text-3xl md:text-4xl font-display text-bark font-bold">
              Community-first principles
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white border-border shadow-xs hover:shadow-md transition-shadow reveal-on-scroll stagger-1">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6 text-accent">
                  <Users size={32} />
                </div>
                <h3 className="text-xl font-display text-bark font-bold mb-3">Connection</h3>
                <p className="text-text-light font-body">
                  Communities are stronger when neighbors can actually find and help each other.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white border-border shadow-xs hover:shadow-md transition-shadow reveal-on-scroll stagger-2">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6 text-accent">
                  <Shield size={32} />
                </div>
                <h3 className="text-xl font-display text-bark font-bold mb-3">Trust</h3>
                <p className="text-text-light font-body">
                  One verified, private source of truth — no ad algorithms, no data selling.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white border-border shadow-xs hover:shadow-md transition-shadow reveal-on-scroll stagger-3">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6 text-accent">
                  <Layers size={32} />
                </div>
                <h3 className="text-xl font-display text-bark font-bold mb-3">Simplicity</h3>
                <p className="text-text-light font-body">
                  Every tool shares the same records, so nothing lives in three different places.
                </p>
              </CardContent>
            </Card>
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
            See it for yourself.
          </h2>
          <p className="mt-4 font-body text-[18px] text-white/90">
            Book a free demo and we'll show you how neighborspace fits your community.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center justify-center h-14 rounded-[100px] bg-white px-10 font-body text-[18px] font-bold text-accent transition-all hover:translate-y-[-3px] hover:shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
          >
            Book a demo
          </Link>
        </div>
      </section>
    </CC_Layout>
  );
}
