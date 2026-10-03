import {
  HardHat,
  Map,
  Smartphone,
  ClipboardList,
  Key,
  Package,
  Users,
  ShieldCheck,
  Wrench,
  PawPrint,
  Car,
  MessageSquare,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export const CC_DevelopmentValueProp = () => {
  useScrollReveal();

  return (
    <section id="value-prop" className="scroll-mt-20 bg-white px-10 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-[60px] md:grid-cols-2">
          {/* The Problem */}
          <div>
            <span className="mb-4 block font-body text-[12px] font-bold uppercase tracking-[3px] text-[#E8A020]">
              The Problem
            </span>
            <h2 className="mb-6 font-display text-[clamp(28px,3.5vw,42px)] font-bold text-[#4A3728]">
              Your buyers deserve more than a Facebook Group.
            </h2>
            <div className="space-y-4 font-body text-[17px] leading-[1.8] text-[#3D3229]">
              <p>
                When buyers sign a contract, they wait months with almost no visibility into what's
                happening to their investment. Phone calls pile up. Anxiety builds. Trust erodes.
              </p>
              <p>
                Most builders point buyers to a Facebook group or a generic email thread. It's not
                enough — and your buyers know it.
              </p>
              <p>
                CountryClose gives every buyer a branded portal from contract to closing and beyond.
                They watch their home get built in real time. You get fewer calls and happier
                buyers.
              </p>
            </div>
          </div>

          {/* Available Today + Roadmap */}
          <div className="flex flex-col gap-12">
            {/* Available Today */}
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-[#2D5016] px-3 py-1 font-body text-[11px] font-bold uppercase tracking-[2px] text-white">
                  Available Today
                </span>
              </div>
              <p className="mb-6 font-body text-[15px] text-[#7A6A5A]">
                These are built, working, and live in this demo right now — not a mockup.
              </p>
              <div className="grid gap-5">
                {[
                  {
                    icon: <Users className="w-5 h-5 text-primary" />,
                    title: "Resident Directory with Privacy Controls",
                    desc: "Per-field visibility toggles — residents choose exactly what neighbors can see",
                  },
                  {
                    icon: <ShieldCheck className="w-5 h-5 text-primary" />,
                    title: "Board Approval Workflows",
                    desc: "Submit applications, review pending requests, and approve or deny — end to end",
                  },
                  {
                    icon: <Wrench className="w-5 h-5 text-primary" />,
                    title: "Tool Library",
                    desc: "Lend and borrow tools with due dates and reminders",
                  },
                  {
                    icon: <PawPrint className="w-5 h-5 text-primary" />,
                    title: "Pet Registry",
                    desc: "Register pets and connect with neighbors nearby",
                  },
                  {
                    icon: <Package className="w-5 h-5 text-primary" />,
                    title: "Package Alerts",
                    desc: "Flag misdelivered or at-risk packages for neighbors",
                  },
                  {
                    icon: <Car className="w-5 h-5 text-primary" />,
                    title: "Carpool Board",
                    desc: "Offer and request rides with your neighbors",
                  },
                  {
                    icon: <MessageSquare className="w-5 h-5 text-primary" />,
                    title: "Community Communication",
                    desc: "Bulletin board, calendar, and announcements in one place",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-4 reveal-on-scroll stagger-${(i % 4) + 1}`}
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#2D5016]/10">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-body text-[16px] font-bold text-[#4A3728]">
                        {item.title}
                      </h3>
                      <p className="mt-1 font-body text-[14px] text-[#7A6A5A]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Coming to the Developer Tier */}
            <div className="rounded-[16px] border border-[#DDD5C8] bg-[#F7F3ED] p-8">
              <div className="mb-2 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center rounded-full border border-[#E8A020] px-3 py-1 font-body text-[11px] font-bold uppercase tracking-[2px] text-[#8B6914]">
                  Roadmap
                </span>
                <h3 className="font-display text-[22px] font-bold text-[#4A3728]">
                  Coming to the Developer Tier
                </h3>
              </div>
              <p className="mb-6 font-body text-[15px] text-[#7A6A5A]">
                Built specifically for new-construction communities — from a builder's initial admin
                control through the handoff to an elected resident board.
              </p>
              <div className="grid gap-4">
                {[
                  {
                    icon: <HardHat className="w-5 h-5 text-primary" />,
                    title: "Construction Progress Tracker",
                    desc: "Buyers track every milestone with photos in real time",
                  },
                  {
                    icon: <Map className="w-5 h-5 text-primary" />,
                    title: "Interactive Lot Map",
                    desc: "Available, under contract, and sold lots at a glance",
                  },
                  {
                    icon: <Smartphone className="w-5 h-5 text-primary" />,
                    title: "Branded Mobile App",
                    desc: "White-labeled app with your community's name and colors",
                  },
                  {
                    icon: <ClipboardList className="w-5 h-5 text-primary" />,
                    title: "Pre-Sale Lead Capture",
                    desc: "Interest forms feed directly into your sales pipeline",
                  },
                  {
                    icon: <Key className="w-5 h-5 text-primary" />,
                    title: "Buyer Portal",
                    desc: "From contract signing through closing and warranty",
                  },
                  {
                    icon: <Package className="w-5 h-5 text-primary" />,
                    title: "Warranty Management",
                    desc: "Post-closing claims tracked and managed in one place",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-4 reveal-on-scroll stagger-${(i % 4) + 1}`}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-body text-[15px] font-bold text-[#4A3728]">
                          {item.title}
                        </h4>
                        <span className="inline-flex items-center rounded-full bg-[#E8A020]/15 px-2 py-0.5 font-body text-[10px] font-bold uppercase tracking-[1px] text-[#8B6914]">
                          Roadmap
                        </span>
                      </div>
                      <p className="mt-1 font-body text-[13px] text-[#7A6A5A]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
