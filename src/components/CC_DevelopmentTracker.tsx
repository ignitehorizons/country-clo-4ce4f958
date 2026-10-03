import { Check, Camera } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export const CC_DevelopmentTracker = () => {
  useScrollReveal();

  return (
    <section className="bg-[#F7F3ED] px-10 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 flex justify-center">
          <span className="inline-flex items-center rounded-full border border-[#E8A020] px-3 py-1 font-body text-[11px] font-bold uppercase tracking-[2px] text-[#8B6914]">
            Roadmap · Concept Preview
          </span>
        </div>
        <h2 className="text-center font-display text-[clamp(28px,3.5vw,40px)] font-bold text-[#4A3728]">
          Your buyers will watch their home get built — in real time.
        </h2>
        <p className="mx-auto mb-10 mt-4 max-w-[600px] text-center font-body text-[17px] text-[#7A6A5A]">
          Automated milestone notifications with photos keep buyers excited and builder support
          calls down.
        </p>

        <div className="mx-auto max-w-[900px] rounded-[16px] border border-[#DDD5C8] bg-white p-10 shadow-md">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="font-body text-[16px] font-bold text-[#4A3728]">
              123 Country Close Drive
            </div>
            <div className="font-body text-[14px] text-[#7A6A5A]">Est. Closing: June 2026</div>
          </div>

          <div className="relative mb-12 overflow-x-auto pb-8">
            <div className="flex min-w-[800px] items-center justify-between px-4">
              <div className="absolute left-8 right-8 top-[20px] z-0 h-[2px] bg-[#DDD5C8]" />
              <div className="absolute left-8 top-[20px] z-0 h-[2px] w-[35%] bg-[#2D5016]" />

              {[
                { name: "Under Contract", status: "completed", date: "Jan 12" },
                { name: "Lot Prep", status: "completed", date: "Feb 05" },
                { name: "Foundation", status: "completed", date: "Feb 28" },
                { name: "Framing", status: "active" },
                { name: "Rough-In", status: "upcoming" },
                { name: "Drywall", status: "upcoming" },
                { name: "Finishing", status: "upcoming" },
                { name: "Final Inspection", status: "upcoming" },
                { name: "Cert of Occupancy", status: "upcoming" },
                { name: "Closing", status: "upcoming" },
              ].map((stage, i) => (
                <div
                  key={i}
                  className={`relative z-10 flex flex-col items-center reveal-on-scroll stagger-${(i % 4) + 1}`}
                >
                  {stage.status === "completed" && (
                    <>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2D5016]">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <div className="absolute top-10 w-24 text-center">
                        <div className="font-body text-[11px] font-bold text-[#2D5016]">
                          {stage.name}
                        </div>
                        <div className="font-body text-[10px] text-[#7A6A5A]">{stage.date}</div>
                      </div>
                    </>
                  )}
                  {stage.status === "active" && (
                    <>
                      <div className="flex h-10 w-10 animate-[pulse_2s_infinite] items-center justify-center rounded-full bg-[#E8A020] shadow-[0_0_0_8px_rgba(232,160,32,0.2)]" />
                      <div className="absolute top-12 w-24 text-center">
                        <div className="font-body text-[13px] font-bold text-[#4A3728]">
                          {stage.name}
                        </div>
                        <div className="mt-1 inline-block rounded bg-[#E8A020]/15 px-2 py-0.5 font-body text-[10px] font-bold text-[#8B6914]">
                          In Progress
                        </div>
                      </div>
                    </>
                  )}
                  {stage.status === "upcoming" && (
                    <>
                      <div className="h-7 w-7 rounded-full border-2 border-[#DDD5C8] bg-[#F0EDE8]" />
                      <div className="absolute top-10 w-24 text-center">
                        <div className="font-body text-[11px] text-[#7A6A5A]">{stage.name}</div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {[
              { name: "Foundation Pour", stage: "Foundation", date: "Feb 28" },
              { name: "Lot Clearing", stage: "Lot Prep", date: "Feb 05" },
              { name: "Site Survey", stage: "Under Contract", date: "Jan 15" },
            ].map((photo, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="flex h-[120px] w-[180px] items-center justify-center rounded-lg bg-linear-to-br from-[#2D5016] to-[#C4A875] p-4 text-center shadow-xs">
                  <span className="font-body text-[12px] font-bold text-white flex items-center gap-1.5">
                    {photo.name} <Camera className="w-4 h-4" />
                  </span>
                </div>
                <div className="mt-2 font-body text-[12px] text-[#7A6A5A]">
                  {photo.stage} • {photo.date}
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 text-center font-body text-[14px] italic text-[#7A6A5A]">
          Milestone photos uploaded by your build team. Buyers notified automatically via email and
          SMS.
        </p>
      </div>
    </section>
  );
};
