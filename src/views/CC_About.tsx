import { CC_Layout } from "@/components/CC_Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, ShieldCheck, Users, Linkedin, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useMeta } from "@/hooks/useMeta";
import { Link } from "@/lib/router-compat";

const FOUNDER_IMAGE =
  "https://assets.cdn.filesafe.space/fTWpkc2JrzTyLdcaKxJD/media/6ae9240bce53a65ab21e1457.webp";

const BELIEFS = [
  {
    icon: Lock,
    title: "Privacy first",
    desc: "We never sell or share resident information without express permission.",
  },
  {
    icon: ShieldCheck,
    title: "Verified neighbors",
    desc: "Every member is verified by address, so your community stays your community.",
  },
  {
    icon: Users,
    title: "Built with you",
    desc: "Our founding communities shape what we build next.",
  },
];

export default function CC_About() {
  useScrollReveal();
  useMeta({
    title: "About NeighborSpace — Built on One Street, Made for Every Community",
    description:
      "NeighborSpace started as Country Close, a private website for one Pasco County, Florida neighborhood. Founded by 30-year public safety leader Jeremy Sidlauskas.",
  });

  return (
    <CC_Layout>
      {/* SECTION 1 — HERO */}
      <section
        className="w-full flex items-center justify-center text-center px-4"
        style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E293B 60%, #0F172A 100%)" }}
      >
        <div className="max-w-3xl mx-auto py-[88px] md:py-[112px]">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 font-body text-[13px] font-semibold text-accent mb-6">
            <span className="h-2 w-2 rounded-full bg-accent" />
            Our story
          </span>
          <h1 className="font-display text-white text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-[1.05]">
            Built on one street. Made for every community.
          </h1>
          <p className="font-body text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            NeighborSpace started as a website for a single neighborhood in Pasco County, Florida.
            It worked so well, we built it for everyone.
          </p>
        </div>
      </section>

      {/* SECTION 2 — HOW IT STARTED */}
      <section className="bg-cream px-6 md:px-10 py-[80px] md:py-[100px]">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="reveal-on-scroll">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-bark mb-6">
              It started with Country Close.
            </h2>
            <div className="space-y-4 font-body text-lg leading-relaxed text-text-light">
              <p>
                Country Close Drive is a small neighborhood in Pasco County, Florida. Like most
                communities, news traveled by group text, flyers, and word of mouth — and important
                updates still slipped through the cracks.
              </p>
              <p>
                So we built Country Close: a private, verified website just for our neighbors.
                Announcements, events, a resident directory, and local resources, all in one place.
              </p>
              <p>
                Neighbors used it. Boards and managers started asking for it. That beta became
                NeighborSpace.
              </p>
            </div>
          </div>
          <div
            className="reveal-on-scroll stagger-2 rounded-2xl border border-border bg-white p-6 md:p-8"
            style={{ boxShadow: "0 10px 40px -10px rgba(15,23,42,0.15)" }}
          >
            <div className="flex items-center justify-center rounded-xl bg-cream overflow-hidden">
              <img
                src={FOUNDER_IMAGE}
                alt="NeighborSpace — Where Communities Connect"
                className="w-full h-auto max-h-[340px] object-contain block"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — MEET THE FOUNDER */}
      <section className="bg-light-gray px-6 md:px-10 py-[80px] md:py-[100px] border-y border-border">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12 reveal-on-scroll">
            <span className="font-body text-[13px] font-semibold uppercase tracking-[2px] text-accent block mb-2">
              The people behind it
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-bark">
              Meet the founder
            </h2>
          </div>
          <Card
            className="bg-white border-border shadow-md reveal-on-scroll"
            style={{ boxShadow: "0 10px 40px -10px rgba(15,23,42,0.12)" }}
          >
            <CardContent className="p-8 md:p-10">
              <div className="grid md:grid-cols-[auto_1fr] gap-8 items-start">
                {/* Headshot placeholder */}
                <div className="flex-shrink-0">
                  <div
                    className="flex items-center justify-center rounded-2xl bg-accent/10 text-accent font-display font-extrabold"
                    style={{ width: "128px", height: "128px", fontSize: "40px" }}
                  >
                    JS
                  </div>
                </div>
                {/* Bio */}
                <div>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-bark leading-tight">
                    Jeremy Sidlauskas, MPA, EFO, CFO, NREMT-P
                  </h3>
                  <p className="mt-1 font-body text-[15px] text-text-light">
                    Founder, NeighborSpace · President, Ignite Horizons, LLC
                  </p>
                  <div className="mt-5 space-y-4 font-body text-[15px] md:text-[16px] leading-relaxed text-text-light">
                    <p>
                      Jeremy has spent nearly 30 years in public safety as a paramedic, flight
                      paramedic, and fire chief. He has led emergency operations, public
                      information, and community programs across the Tampa Bay region.
                    </p>
                    <p>
                      That career taught him one thing above all: communities are safer and stronger
                      when people can reach each other quickly and trust the information they get.
                      NeighborSpace brings that same discipline to everyday neighborhood life.
                    </p>
                  </div>
                  <a
                    href="https://www.linkedin.com/in/jeremy-sidlauskasmpa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 inline-flex items-center justify-center gap-2 h-12 rounded-[100px] border border-border bg-white px-6 font-body text-[15px] font-semibold text-bark transition-all hover:border-accent hover:text-accent"
                  >
                    <Linkedin className="h-5 w-5" />
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* SECTION 4 — WHAT WE BELIEVE */}
      <section className="bg-white px-6 md:px-10 py-[80px] md:py-[100px]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-14 reveal-on-scroll">
            <span className="font-body text-[13px] font-semibold uppercase tracking-[2px] text-accent block mb-2">
              What we believe
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-bark">
              Community-first principles
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {BELIEFS.map((item, i) => (
              <Card
                key={item.title}
                className="bg-cream border-border shadow-xs hover:shadow-md transition-shadow reveal-on-scroll"
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6 text-accent">
                    <item.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-bark mb-3">{item.title}</h3>
                  <p className="text-text-light font-body leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — CALL TO ACTION */}
      <section
        className="px-6 md:px-10 py-[80px] md:py-[100px] text-center"
        style={{ background: "linear-gradient(135deg, #0284C7, #06B6D4)" }}
      >
        <div className="mx-auto max-w-3xl reveal-on-scroll">
          <h2 className="font-display text-[clamp(28px,4vw,44px)] font-extrabold text-white leading-tight">
            Bring NeighborSpace to your community.
          </h2>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/demo"
              className="w-full sm:w-auto inline-flex items-center justify-center whitespace-nowrap h-14 rounded-[100px] bg-white px-10 font-body text-[18px] font-bold text-accent transition-all hover:translate-y-[-3px] hover:shadow-[0_8px_32px_rgba(0,0,0,0.2)] active:translate-y-0 active:scale-[0.98]"
            >
              Book a demo
            </Link>
            <Link
              to="/roadmap"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 whitespace-nowrap h-14 rounded-[100px] border-2 border-white/60 bg-transparent px-10 font-body text-[18px] font-bold text-white transition-all hover:bg-white/10"
            >
              View the roadmap <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </CC_Layout>
  );
}
