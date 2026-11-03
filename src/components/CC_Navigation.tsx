import { useState, useEffect } from "react";
import { NavLink, Link } from "@/lib/router-compat";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export const CC_Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

    // Focus close button initially
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
          "fixed top-0 left-0 right-0 z-100 transition-all duration-300 flex items-center px-4 sm:px-6 md:px-12",
          // Under 768px: solid navy bar (#0B1426), exactly 64px tall
          "h-[64px] md:h-[72px] bg-[#0B1426] md:bg-transparent",
          scrolled && "md:bg-white md:shadow-md",
        )}
      >
        {/* Wordmark: hidden under 768px; visible from md (768px+) */}
        <div className="hidden md:flex flex-1">
          <Link
            to="/"
            className={cn(
              "font-display text-[20px] font-extrabold tracking-tight transition-colors",
              !scrolled ? "text-white" : "text-bark",
            )}
          >
            Neighbor<span className="text-accent">Space</span>
          </Link>
        </div>

        {/* Desktop nav links: hidden below lg (1024px) */}
        <div className="hidden lg:flex flex-1 justify-center items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                cn(
                  "relative font-body text-[15px] font-semibold transition-colors duration-200 py-2 group",
                  isActive
                    ? "text-accent"
                    : !scrolled
                      ? "text-white hover:text-white/80"
                      : "text-text hover:text-primary",
                )
              }
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent transform scale-x-0 origin-left transition-transform duration-200 ease-out group-hover:scale-x-100" />
            </NavLink>
          ))}
        </div>

        {/* Right side actions:
            - Under 768px: Member Portal (15px font, 10px 16px padding) + Menu button (hamburger + "Menu"), 12px gap
            - Desktop: Book a demo + Member Portal + hamburger if <1024px
        */}
        <div className="w-full md:w-auto md:flex-1 flex justify-end items-center gap-3">
          <Link
            to="/demo"
            className="hidden lg:inline-flex items-center justify-center whitespace-nowrap border-2 border-accent/40 bg-transparent text-accent font-body font-bold text-[15px] rounded-[100px] px-[20px] py-[10px] transition-all duration-200 ease-out hover:bg-accent hover:text-white"
          >
            Book a demo
          </Link>
          <Link
            to="/portal"
            className="inline-flex items-center justify-center whitespace-nowrap bg-accent text-white font-body font-bold text-[15px] rounded-[100px] px-[16px] py-[10px] border-none transition-all duration-200 ease-out hover:bg-accent-hover hover:translate-y-[-2px] hover:shadow-[0_6px_20px_rgba(2,132,199,0.35)]"
          >
            Member Portal
          </Link>
          <button
            className="lg:hidden flex items-center justify-center gap-1.5 px-3 py-2 text-white font-body text-[15px] font-semibold rounded-md transition-colors hover:bg-white/10"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu-drawer"
          >
            <Menu className="w-6 h-6 text-white" />
            <span className="md:hidden text-white">Menu</span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer (shown below lg = 1024px) */}
      <div
        id="mobile-menu-drawer"
        className={cn(
          "fixed inset-0 z-200 bg-primary transition-transform duration-300 ease-in-out lg:hidden flex flex-col overflow-y-auto",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex justify-end p-6">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-white p-3 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Close mobile menu"
          >
            <X className="w-8 h-8" />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center gap-8 pt-12">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="text-white font-display text-[28px]"
            >
              {link.name}
            </NavLink>
          ))}
          <NavLink
            to="/demo"
            onClick={() => setMobileMenuOpen(false)}
            className="text-accent font-display text-[28px] whitespace-nowrap"
          >
            Book a demo
          </NavLink>
          <NavLink
            to="/portal"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white font-display text-[28px] mt-4 whitespace-nowrap"
          >
            Member Portal
          </NavLink>
        </div>
      </div>
    </>
  );
};
