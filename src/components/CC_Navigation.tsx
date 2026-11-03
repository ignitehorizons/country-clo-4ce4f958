import { useState, useEffect } from "react";
import { NavLink, Link } from "@/lib/router-compat";
import { Menu, X, ArrowRight, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export const CC_Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        return;
      }

      if (e.key === "Tab") {
        const drawer = document.getElementById("mobile-menu-drawer");
        if (!drawer) return;

        const focusableElements = drawer.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled])",
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        if (!firstElement || !lastElement) return;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const timer = setTimeout(() => {
      const closeBtn = document.querySelector("#mobile-menu-drawer button") as HTMLElement;
      if (closeBtn) closeBtn.focus();
    }, 50);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "Features", path: "/features" },
    { name: "Roadmap", path: "/roadmap" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-100 transition-all duration-300 flex items-center justify-between px-4 sm:px-6 md:px-12",
          "h-[64px] md:h-[72px] bg-[#0B1426]",
        )}
      >
        {/* 1. HEADER LEFT — WORDMARK */}
        <div className="flex items-center">
          <Link
            to="/"
            aria-label="NeighborSpace home"
            className="font-display font-bold text-[20px] md:text-[24px] tracking-tight transition-opacity hover:opacity-90"
          >
            <span className="text-white">Neighbor</span>
            <span className="text-[#4FA3F0]">Space</span>
          </Link>
        </div>

        {/* 2. HEADER RIGHT — MENU ONLY */}
        <div className="flex items-center justify-end">
          <button
            className="flex items-center justify-center gap-2 px-3 py-2 text-white font-body text-[16px] font-bold rounded-md transition-colors hover:bg-white/10 min-w-[44px] min-h-[44px]"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu-drawer"
          >
            <Menu className="w-6 h-6 text-white" />
            <span className="text-white">Menu</span>
          </button>
        </div>
      </nav>

      {/* 3. MEGA MENU DRAWER */}
      <div
        id="mobile-menu-drawer"
        className={cn(
          "fixed inset-0 z-200 bg-[#0B1426] transition-transform duration-300 ease-in-out flex flex-col overflow-y-auto",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 md:px-12 h-[64px] md:h-[72px] border-b border-white/10">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="NeighborSpace home"
            className="font-display font-bold text-[20px] md:text-[24px] tracking-tight"
          >
            <span className="text-white">Neighbor</span>
            <span className="text-[#4FA3F0]">Space</span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-white p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md hover:bg-white/10"
            aria-label="Close navigation menu"
          >
            <X className="w-7 h-7" />
          </button>
        </div>

        {/* Drawer Content / Mega Menu Layout */}
        <div className="flex-1 px-4 sm:px-6 md:px-12 py-8 max-w-5xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            {/* Column 1: Navigation Links */}
            <div className="md:col-span-5 flex flex-col gap-4">
              <span className="font-body text-[12px] font-bold uppercase tracking-wider text-white/40">
                Explore NeighborSpace
              </span>
              <div className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-white hover:text-[#4FA3F0] font-display text-[24px] md:text-[28px] font-semibold transition-colors flex items-center justify-between group py-1"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#4FA3F0]" />
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Column 2: For Members & Quick Access */}
            <div className="md:col-span-7 flex flex-col gap-6 pt-6 md:pt-0 border-t md:border-t-0 md:border-l border-white/10 md:pl-12">
              <span className="font-body text-[12px] font-bold uppercase tracking-wider text-white/40">
                For Members & Communities
              </span>

              {/* Members Portal Section */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-white/80 font-body text-[14px] font-medium">
                  <ShieldCheck className="w-4 h-4 text-[#4FA3F0]" />
                  <span>Private Community Member Access</span>
                </div>

                {/* Prominent Member Portal Button */}
                <Link
                  to="/portal"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-[#1E88E5] hover:bg-[#1976D2] text-white font-body text-[16px] font-bold py-3.5 px-6 rounded-lg transition-all shadow-md hover:shadow-lg active:scale-[0.99] text-center"
                >
                  Member Portal
                </Link>
              </div>

              {/* Highlight Card for Book a Demo */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col gap-3 mt-2">
                <h4 className="font-display text-[18px] font-bold text-white">
                  Bring NeighborSpace to your HOA or neighborhood
                </h4>
                <p className="font-body text-[14px] text-white/70 leading-relaxed">
                  Book a 15-minute walkthrough to see how NeighborSpace creates a verified, private
                  portal for your residents.
                </p>
                <Link
                  to="/demo"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center gap-2 border border-white/30 hover:border-white bg-transparent text-white font-body font-bold text-[15px] py-3 px-5 rounded-lg transition-all hover:bg-white/10 text-center mt-1"
                >
                  Book a demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
