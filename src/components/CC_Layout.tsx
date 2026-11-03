import { useEffect } from "react";
import { Outlet, useLocation } from "@/lib/router-compat";
import { CC_Navigation } from "./CC_Navigation";
import { CC_Footer } from "./CC_Footer";

export const CC_Layout = ({ children }: { children?: React.ReactNode }) => {
  const location = useLocation();

  useEffect(() => {
    const titles: Record<string, string> = {
      "/": "NeighborSpace — Where Communities Connect",
      "/about": "About | NeighborSpace",
      "/join": "Join | NeighborSpace",
      "/sponsors": "Partners | NeighborSpace",
      "/development": "Development | NeighborSpace",
      "/features": "Features | NeighborSpace",
      "/roadmap": "Roadmap | NeighborSpace",
      "/contact": "Contact | NeighborSpace",
      "/demo": "Book a Demo | NeighborSpace",
      "/privacy": "Privacy Policy | NeighborSpace",
      "/terms": "Terms of Use | NeighborSpace",
    };
    document.title = titles[location.pathname] || "NeighborSpace";
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col page-transition-enter">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-9999 focus:p-4 focus:bg-white focus:text-primary"
      >
        Skip to main content
      </a>
      <CC_Navigation />
      <main id="main-content" role="main" className="flex-1">
        {children || <Outlet />}
      </main>
      <CC_Footer />
    </div>
  );
};
