import { Check } from "lucide-react";

const BENEFITS = [
  "Private — only verified residents of your community",
  "No drama — moderated, not a free-for-all",
  "Actually useful — maintenance, calendar, safety alerts",
  "Off Facebook — your community, your data",
  "Always free for residents",
];

const STATS = [
  { num: "1,200+", label: "Communities" },
  { num: "180k", label: "Residents" },
  { num: "100%", label: "Private" },
];

export const CC_JoinBenefits = () => {
  return (
    <div className="bg-primary rounded-[16px] p-[40px_32px] text-white">
      <h3 className="font-display font-bold text-[24px] mb-[24px]">Why NeighborSpace?</h3>

      <ul className="space-y-[16px]">
        {BENEFITS.map((benefit, i) => (
          <li key={i} className="flex items-start gap-[12px]">
            <div className="w-[20px] h-[20px] rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-[12px] h-[12px] text-accent" strokeWidth={3} />
            </div>
            <span className="font-body text-[15px] leading-normal text-white/90">{benefit}</span>
          </li>
        ))}
      </ul>

      <hr className="border-white/15 my-[32px]" />

      <div className="space-y-[20px]">
        {STATS.map((stat, i) => (
          <div key={i}>
            <div className="font-display font-bold text-[28px] text-accent leading-none mb-1">
              {stat.num}
            </div>
            <div className="font-body text-[12px] text-white/70 uppercase tracking-[1px]">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <hr className="border-white/15 my-[32px]" />

      <div className="bg-white/5 rounded-[12px] p-[20px] relative">
        <div className="font-display text-[48px] text-accent leading-none absolute top-[10px] left-[16px] opacity-40">
          "
        </div>
        <p className="font-body italic text-[14px] text-white/85 relative z-10 pt-4 mb-4">
          Finally a place to stay connected without all the noise.
        </p>
        <p className="font-body font-bold text-[12px] text-accent">— A NeighborSpace resident</p>
      </div>
    </div>
  );
};
