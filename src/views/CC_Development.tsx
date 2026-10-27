import { CC_Layout } from "../components/CC_Layout";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useMeta } from "@/hooks/useMeta";
import { CC_DevelopmentValueProp } from "@/components/CC_DevelopmentValueProp";
import { CC_DevelopmentTracker } from "@/components/CC_DevelopmentTracker";
import { CC_DevelopmentLifecycle } from "@/components/CC_DevelopmentLifecycle";
import { CC_DevelopmentInterestForm } from "@/components/CC_DevelopmentInterestForm";
import { CC_DevelopmentTiers } from "@/components/CC_DevelopmentTiers";

export default function CC_Development() {
  useScrollReveal();
  useMeta({
    title: "Development | neighborspace",
    description:
      "neighborspace powers community platforms for developers, builders, and new neighborhoods — from pre-sale through the handoff to an elected resident board. See what's available today and what's on the roadmap.",
  });

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <CC_Layout>
      {/* SECTION 1 — PAGE HERO */}
      <section className="relative flex min-h-[500px] flex-col items-center justify-center overflow-hidden bg-linear-to-br from-primary via-primary-light to-primary text-center">
        {/* SVG leaf pattern overlay */}
        <div
          className="absolute inset-0 z-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.83-28.284 28.284-.83-.83L54.627 0zm-14.142 0l.83.83-28.284 28.284-.83-.83L40.485 0zm-14.142 0l.83.83-28.284 28.284-.83-.83L26.343 0zm-14.142 0l.83.83-28.284 28.284-.83-.83L12.2 0zM60 5.373l-.83-.83-28.284 28.284.83.83L60 5.373zm0 14.142l-.83-.83-28.284 28.284.83.83L60 19.515zm0 14.142l-.83-.83-28.284 28.284.83.83L60 33.657zm0 14.142l-.83-.83-28.284 28.284.83.83L60 47.8z' fill='%23FFFFFF' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 px-4 py-20">
          <span className="font-accent text-[22px] text-accent font-semibold">For Developers & Builders</span>
          <h1 className="mt-4 font-display text-[clamp(40px,6vw,80px)] font-extrabold leading-[1.1] text-white">
            Build Community
            <br />
            From Day One
          </h1>
          <p className="mx-auto mt-4 max-w-[680px] font-body text-[19px] font-light text-white/85">
            neighborspace powers community platforms for developers, builders, and new neighborhoods
            — from pre-sale to long after closing.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={() => scrollToSection("value-prop")}
              className="rounded-full bg-accent px-8 py-[14px] font-body text-[16px] font-bold text-white transition-colors hover:bg-accent-hover"
            >
              See How It Works
            </button>
            <button
              onClick={() => scrollToSection("interest-form")}
              className="rounded-full border-2 border-white/70 bg-transparent px-8 py-[14px] font-body text-[16px] font-bold text-white transition-colors hover:bg-white/10"
            >
              Request a Demo
            </button>
          </div>
        </div>

        {/* Cream wave SVG divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0">
          <svg
            className="block h-[40px] w-full md:h-[60px]"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118,152.41,114.6,227.14,81.3,258.9,67.14,290.5,62.16,321.39,56.44Z"
              fill="#F0F9FF"
            ></path>
          </svg>
        </div>
      </section>

      {/* SECTION 2 — VALUE PROP (Available Today + Roadmap) */}
      <CC_DevelopmentValueProp />

      {/* SECTION 3 — CONSTRUCTION TRACKER PREVIEW (Roadmap) */}
      <CC_DevelopmentTracker />

      {/* SECTION 4 — BUYER LIFECYCLE */}
      <CC_DevelopmentLifecycle />

      {/* SECTION 5 — INTEREST FORM */}
      <CC_DevelopmentInterestForm />

      {/* SECTION 6 — PLATFORM TIERS */}
      <CC_DevelopmentTiers />
    </CC_Layout>
  );
}
