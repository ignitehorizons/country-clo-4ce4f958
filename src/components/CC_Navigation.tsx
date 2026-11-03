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
          "fixed top-0 left-0 right-0 z-100 h-[72px] transition-all duration-300 flex items-center px-6 md:px-12",
          scrolled ? "bg-white shadow-md" : "bg-transparent",
        )}
      >
        <div className="flex-1">
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

        <div className="hidden md:flex flex-1 justify-center items-center gap-8">
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

        <div className="flex-1 flex justify-end items-center gap-3">
          <Link
            to="/demo"
            className="hidden md:inline-flex items-center justify-center border-2 border-accent/40 bg-transparent text-accent font-body font-bold text-[15px] rounded-[100px] px-[20px] py-[10px] transition-all duration-200 ease-out hover:bg-accent hover:text-white"
          >
            Book a demo
          </Link>
          <Link
            to="/portal"
            className="hidden md:inline-flex items-center justify-center bg-accent text-white font-body font-bold text-[15px] rounded-[100px] px-[24px] py-[10px] border-none transition-all duration-200 ease-out hover:bg-accent-hover hover:translate-y-[-2px] hover:shadow-[0_6px_20px_rgba(2,132,199,0.35)]"
          >
            Member Portal
          </Link>
          <button
            className="md:hidden p-3 min-w-[44px] min-h-[44px] z-201 flex items-center justify-center"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu-drawer"
          >
            <Menu
              className={cn("w-6 h-6", !scrolled && !mobileMenuOpen ? "text-white" : "text-text")}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div
        id="mobile-menu-drawer"
        className={cn(
          "fixed inset-0 z-200 bg-primary transition-transform duration-300 ease-in-out md:hidden flex flex-col overflow-y-auto",
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
            className="text-accent font-display text-[28px]"
          >
            Book a demo
          </NavLink>
          <NavLink
            to="/portal"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white font-display text-[28px] mt-4"
          >
            Member Portal
          </NavLink>
        </div>
      </div>
    </>
  );
};
