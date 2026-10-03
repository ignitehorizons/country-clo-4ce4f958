import { Check } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export const CC_DevelopmentTiers = () => {
  useScrollReveal();

  return (
    <section className="bg-white px-10 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center font-display text-[clamp(28px,3.5vw,40px)] font-bold text-[#4A3728]">
          Choose Your Platform
        </h2>
        <p className="mb-12 text-center font-body text-[17px] text-[#7A6A5A]">
          Scale features up or down based on your community's needs.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Tier 1 */}
          <div className="flex flex-col rounded-[16px] border border-[#DDD5C8] bg-white p-[28px] pt-[32px] reveal-on-scroll stagger-1">
            <div className="mb-2 font-body text-[13px] font-bold uppercase tracking-[2px] text-[#7A6A5A]">
              Neighbor
            </div>
            <div className="font-display text-[clamp(32px,4vw,48px)] font-black text-[#4A3728]">
              Free
            </div>
            <p className="my-3 font-body text-[14px] text-[#7A6A5A]">
              Basic tools for connected neighbors.
            </p>
            <div className="mb-8 flex-1 space-y-2">
              {[
                "Website",
                "Calendar",
                "Directory",
                "Bulletin Board",
                "Lost & Found",
                "Pet Registry",
              ].map((f, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#2D5016]" />
                  <span className="font-body text-[14px] text-[#3D3229]">{f}</span>
                </div>
              ))}
            </div>
            <button className="w-full rounded-md border-2 border-[#2D5016] py-2 font-body text-[14px] font-bold text-[#2D5016] transition-all duration-200 hover:bg-[#2D5016] hover:text-white">
              Get Started
            </button>
          </div>

          {/* Tier 2 */}
          <div className="flex flex-col rounded-[16px] border border-[#DDD5C8] bg-white p-[28px] pt-[32px] reveal-on-scroll stagger-2">
            <div className="mb-2 font-body text-[13px] font-bold uppercase tracking-[2px] text-[#7A6A5A]">
              Community
            </div>
            <div className="font-display text-[clamp(32px,4vw,48px)] font-black text-[#4A3728]">
              $79
              <span className="font-body text-[14px] font-normal text-[#7A6A5A]">/month</span>
            </div>
            <p className="my-3 font-body text-[14px] text-[#7A6A5A]">
              For active, growing neighborhoods.
            </p>
            <div className="mb-8 flex-1 space-y-2">
              <div className="font-body text-[14px] font-bold text-[#3D3229]">
                All Neighbor features, plus:
              </div>
              {[
                "Maintenance Requests",
                "Safety Alerts",
                "Marketplace",
                "Document Library",
                "Sponsor Directory",
              ].map((f, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#2D5016]" />
                  <span className="font-body text-[14px] text-[#3D3229]">{f}</span>
                </div>
              ))}
            </div>
            <button className="w-full rounded-md border-2 border-[#2D5016] py-2 font-body text-[14px] font-bold text-[#2D5016] transition-all duration-200 hover:bg-[#2D5016] hover:text-white">
              Start Trial
            </button>
          </div>

          {/* Tier 3 */}
          <div className="relative flex flex-col rounded-[16px] border-2 border-[#2D5016] bg-white p-[28px] pt-[32px] reveal-on-scroll stagger-3">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#2D5016] px-4 py-1 font-body text-[11px] font-bold text-white">
              Most Popular
            </div>
            <div className="mb-2 font-body text-[13px] font-bold uppercase tracking-[2px] text-[#7A6A5A]">
              Association
            </div>
            <div className="font-display text-[clamp(32px,4vw,48px)] font-black text-[#4A3728]">
              $199
              <span className="font-body text-[14px] font-normal text-[#7A6A5A]">/month</span>
            </div>
            <p className="my-3 font-body text-[14px] text-[#7A6A5A]">Full management for HOAs.</p>
            <div className="mb-8 flex-1 space-y-2">
              <div className="font-body text-[14px] font-bold text-[#3D3229]">
                All Community features, plus:
              </div>
              {[
                "Violation Tracking",
                "Voting & Polls",
                "Amenity Booking",
                "Dues Tracking",
                "Reporting Dashboard",
              ].map((f, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#2D5016]" />
                  <span className="font-body text-[14px] text-[#3D3229]">{f}</span>
                </div>
              ))}
            </div>
            <button className="w-full rounded-md bg-[#2D5016] py-2 font-body text-[14px] font-bold text-white transition-colors hover:bg-[#3D6B20]">
              Start Trial
            </button>
          </div>

          {/* Tier 4 */}
          <div className="flex flex-col rounded-[16px] border border-[#DDD5C8] bg-white p-[28px] pt-[32px] reveal-on-scroll stagger-4">
            <div className="mb-2 font-body text-[13px] font-bold uppercase tracking-[2px] text-[#7A6A5A]">
              Developer
            </div>
            <div className="font-display text-[clamp(32px,4vw,48px)] font-black text-[#4A3728]">
              $799
              <span className="font-body text-[14px] font-normal text-[#7A6A5A]">/month</span>
            </div>
            <p className="my-3 font-body text-[14px] text-[#7A6A5A]">
              Complete lifecycle platform.
            </p>
            <div className="mb-8 flex-1 space-y-2">
              <div className="font-body text-[14px] font-bold text-[#3D3229]">
                All Association features, plus:
              </div>
              {[
                "Construction Tracker",
                "Pre-Sale Page",
                "Buyer Portal",
                "Warranty Management",
                "Lot Map",
              ].map((f, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#2D5016]" />
                  <span className="font-body text-[14px] text-[#3D3229]">{f}</span>
                </div>
              ))}
            </div>
            <button className="w-full rounded-md bg-[#E8A020] py-2 font-body text-[14px] font-bold text-[#4A3728] transition-colors hover:bg-[#D4911A]">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
