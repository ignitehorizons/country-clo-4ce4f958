import React from "react";
import { CC_Layout } from "../components/CC_Layout";
import { useMeta } from "@/hooks/useMeta";

const createPublicPlaceholder = (name: string, path: string) => {
  return () => (
    <CC_Layout>
      <div
        style={{
          padding: "40px",
          fontFamily: "Lato, sans-serif",
          background: "#F7F3ED",
          minHeight: "60vh",
          color: "#3D3229",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1
          style={{
            fontFamily: "Playfair Display, serif",
            marginBottom: "1rem",
          }}
        >
          {name}
        </h1>
        <p style={{ fontFamily: "monospace", opacity: 0.7 }}>Route: {path}</p>
      </div>
    </CC_Layout>
  );
};

const createPortalPlaceholder = (name: string, path: string) => {
  return () => (
    <div
      style={{
        padding: "40px",
        fontFamily: "Lato, sans-serif",
        background: "#F7F3ED",
        minHeight: "60vh",
        color: "#3D3229",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1 style={{ fontFamily: "Playfair Display, serif", marginBottom: "1rem" }}>{name}</h1>
      <p style={{ fontFamily: "monospace", opacity: 0.7 }}>Route: {path}</p>
    </div>
  );
};

// Legal Pages
export const CC_Privacy = () => {
  useMeta({
    title: "Privacy Policy | Country Close",
    description:
      "Country Close privacy policy — how we collect, use, and protect your personal information. Your data is private, shared only within your community, and never sold.",
  });
  return (
    <CC_Layout>
      <div className="min-h-screen bg-[#F7F3ED]">
        <div className="w-full h-[300px] bg-linear-to-br from-[#2D5016] to-[#3D6B20] flex items-center justify-center text-center px-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white">Privacy Policy</h1>
        </div>
        <div className="max-w-4xl mx-auto px-6 py-16 font-body text-text">
          <p className="text-sm text-text-light mb-8">Last updated: January 2026</p>
          <div className="space-y-6">
            <section>
              <h2 className="font-display text-2xl font-bold text-bark mb-4">
                1. Information We Collect
              </h2>
              <p className="leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </section>
            <section>
              <h2 className="font-display text-2xl font-bold text-bark mb-4">
                2. How We Use Your Information
              </h2>
              <p className="leading-relaxed">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
              </p>
            </section>
          </div>
        </div>
      </div>
    </CC_Layout>
  );
};

export const CC_Terms = () => {
  useMeta({
    title: "Terms of Use | Country Close",
    description:
      "Country Close terms of use — community guidelines, resident responsibilities, and the rules that keep our private neighborhood platform useful and respectful.",
  });
  return (
    <CC_Layout>
      <div className="min-h-screen bg-[#F7F3ED]">
        <div className="w-full h-[300px] bg-linear-to-br from-[#2D5016] to-[#3D6B20] flex items-center justify-center text-center px-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white">Terms of Use</h1>
        </div>
        <div className="max-w-4xl mx-auto px-6 py-16 font-body text-text">
          <p className="text-sm text-text-light mb-8">Last updated: January 2026</p>
          <div className="space-y-6">
            <section>
              <h2 className="font-display text-2xl font-bold text-bark mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </section>
            <section>
              <h2 className="font-display text-2xl font-bold text-bark mb-4">
                2. User Responsibilities
              </h2>
              <p className="leading-relaxed">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
              </p>
            </section>
          </div>
        </div>
      </div>
    </CC_Layout>
  );
};

// Public Routes
export const CC_Home = createPublicPlaceholder("Home", "/");
export const CC_About = createPublicPlaceholder("About", "/about");
export const CC_Sponsors = createPublicPlaceholder("Sponsors", "/sponsors");
export const CC_Development = createPublicPlaceholder("Development", "/development");

// Portal Routes
export const CC_Calendar = createPortalPlaceholder("Calendar", "/portal/calendar");
export const CC_Maintenance = createPortalPlaceholder("Maintenance", "/portal/maintenance");
export const CC_Marketplace = createPortalPlaceholder("Marketplace", "/portal/marketplace");
export const CC_LostFound = createPortalPlaceholder("Lost & Found", "/portal/lost-found");
export const CC_Packages = createPortalPlaceholder("Packages", "/portal/packages");
export const CC_Pets = createPortalPlaceholder("Pet Registry", "/portal/pets");
export const CC_Tools = createPortalPlaceholder("Tool Library", "/portal/tools");
export const CC_Carpool = createPortalPlaceholder("Carpool", "/portal/carpool");
export const CC_Safety = createPortalPlaceholder("Safety Center", "/portal/safety");
export const CC_Complaints = createPortalPlaceholder("Complaints", "/portal/complaints");
export const CC_Voting = createPortalPlaceholder("Voting", "/portal/voting");
export const CC_Board = createPortalPlaceholder("Board Hub", "/portal/board");
export const CC_Documents = createPortalPlaceholder("Documents", "/portal/documents");
export const CC_Amenities = createPortalPlaceholder("Amenities", "/portal/amenities");
