import React from "react";
import { Target, PenTool, HardHat, Key, Home, Heart } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export const CC_DevelopmentLifecycle = () => {
  useScrollReveal();

  return (
    <section className="bg-white px-10 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-[60px] text-center font-display text-[clamp(28px,3.5vw,40px)] font-bold text-[#4A3728]">
          One platform. The entire buyer journey.
        </h2>

        <div className="overflow-x-auto pb-8">
          <div className="flex min-w-[800px] items-start justify-between px-4">
            {[
              {
                icon: <Target className="w-8 h-8 text-white" />,
                title: "Prospect",
                desc: "Interest captured",
              },
              {
                icon: <PenTool className="w-8 h-8 text-white" />,
                title: "Buyer",
                desc: "Contract signed",
              },
              {
                icon: <HardHat className="w-8 h-8 text-white" />,
                title: "Under Construction",
                desc: "Milestone updates",
              },
              {
                icon: <Key className="w-8 h-8 text-white" />,
                title: "Closing",
                desc: "Welcome home",
              },
              {
                icon: <Home className="w-8 h-8 text-white" />,
                title: "Resident",
                desc: "Full portal access",
              },
              {
                icon: <Heart className="w-8 h-8 text-white" />,
                title: "Community Member",
                desc: "Long-term engagement",
              },
            ].map((stage, i, arr) => (
              <React.Fragment key={i}>
                <div className="flex w-32 flex-col items-center text-center">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-full text-[28px] ${i % 2 === 0 ? "bg-[#2D5016]" : "bg-[#E8A020]"}`}
                  >
                    {stage.icon}
                  </div>
                  <div className="mt-3 font-body text-[13px] font-bold text-[#4A3728]">
                    {stage.title}
                  </div>
                  <div className="font-body text-[12px] text-[#7A6A5A]">{stage.desc}</div>
                </div>
                {i < arr.length - 1 && <div className="mt-6 text-[20px] text-[#DDD5C8]">→</div>}
              </React.Fragment>
            ))}
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-[560px] text-center font-body text-[17px] text-[#7A6A5A]">
          At every stage, CountryClose keeps buyers engaged and informed — automatically.
        </p>
      </div>
    </section>
  );
};
