import { CC_Layout } from "@/components/CC_Layout";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useMeta } from "@/hooks/useMeta";
import { CC_JoinForm } from "@/components/CC_JoinForm";
import { CC_JoinBenefits } from "@/components/CC_JoinBenefits";

export default function CC_Join() {
  useScrollReveal();
  useMeta({
    title: "Join | NeighborSpace",
    description:
      "Join your community on NeighborSpace — free for verified residents. Create your account, set your privacy preferences, and connect with your neighbors.",
  });

  return (
    <CC_Layout>
      <div className="min-h-screen bg-cream">
        {/* SECTION 1 — PAGE HERO */}
        <section
          className="relative h-[320px] flex items-center justify-center text-center"
          style={{
            background: "linear-gradient(135deg, #0F172A 0%, #1E293B 60%, #0F172A 100%)",
          }}
        >
          <div className="relative z-10 px-6">
            <span className="block font-body text-[20px] text-accent mb-2 font-semibold">
              Free for residents
            </span>
            <h1 className="font-display font-extrabold text-[clamp(36px,5vw,64px)] text-white leading-tight">
              Join your community
            </h1>
            <p className="font-body font-light text-[18px] text-white/80 mt-[12px]">
              Private. Verified. Actually useful.
            </p>
          </div>

          {/* Wave divider */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
            <svg
              className="relative block w-full h-[40px] md:h-[60px]"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.3,191.6,108.6,236.4,100.74,281.25,79.52,321.39,56.44Z"
                fill="#F0F9FF"
              ></path>
            </svg>
          </div>
        </section>

        {/* SECTION 2 — TWO COLUMN LAYOUT */}
        <section className="max-w-[1280px] mx-auto px-6 md:px-[40px] py-[40px] md:py-[80px]">
          <div className="flex flex-col-reverse lg:flex-row gap-10 lg:gap-12 items-start">
            {/* LEFT COLUMN — SIGNUP FORM */}
            <div className="w-full lg:w-[65%] reveal-on-scroll stagger-2">
              <CC_JoinForm />
            </div>

            {/* RIGHT COLUMN — BENEFITS PANEL */}
            <div className="w-full lg:w-[35%] lg:sticky lg:top-[100px] reveal-on-scroll stagger-1">
              <CC_JoinBenefits />
            </div>
          </div>
        </section>
      </div>
    </CC_Layout>
  );
}
