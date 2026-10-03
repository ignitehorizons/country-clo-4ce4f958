import { Link } from "@/lib/router-compat";
import communityConfig from "@/config/communityConfig";

export const CC_Footer = () => {
  return (
    <footer className="w-full bg-bark pt-[60px] pb-[40px] text-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Column 1 */}
          <div className="flex flex-col items-start gap-4">
            <img
              src="https://vibe.filesafe.space/1775231453582117442/attachments/21c06b2f-3ba0-45cb-9ca8-eb3e44b03d61.png"
              alt={communityConfig.name}
              loading="lazy"
              style={{
                height: "36px",
                width: "auto",
                objectFit: "contain",
              }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <h3 className="font-display text-xl text-cream m-0">{communityConfig.name}</h3>
            <p className="font-body text-sm text-cream/80 m-0">{communityConfig.tagline}</p>
            <p className="font-body text-sm text-cream/60 mt-4">
              © {new Date().getFullYear()} {communityConfig.name}. All rights reserved.
            </p>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col items-start gap-4">
            <h4 className="font-accent text-accent text-lg m-0">Quick Links</h4>
            <div className="flex flex-col gap-3">
              <Link
                to="/"
                className="font-body text-sm text-white hover:text-accent transition-colors"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="font-body text-sm text-white hover:text-accent transition-colors"
              >
                About
              </Link>
              <Link
                to="/join"
                className="font-body text-sm text-white hover:text-accent transition-colors"
              >
                Join Us
              </Link>
              <Link
                to="/sponsors"
                className="font-body text-sm text-white hover:text-accent transition-colors"
              >
                Sponsors
              </Link>
              <Link
                to="/portal"
                className="font-body text-sm text-white hover:text-accent transition-colors"
              >
                Member Login
              </Link>
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col items-start gap-4">
            <h4 className="font-accent text-accent text-lg m-0">Community</h4>
            <div className="flex flex-col gap-3 font-body text-sm text-white">
              <a
                href={`mailto:${communityConfig.adminEmail || "admin@countryclose.com"}`}
                className="hover:text-accent transition-colors"
              >
                {communityConfig.adminEmail || "admin@countryclose.com"}
              </a>
              <p className="m-0">{communityConfig.location}</p>
              <Link to="/privacy" className="hover:text-accent transition-colors mt-2">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-accent transition-colors">
                Terms of Use
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-white/40 m-0">
            © {new Date().getFullYear()} Country Close
          </p>
          <p className="font-body text-xs text-white/40 m-0">
            Platform powered by {communityConfig.poweredBy || "Community Connect Pro"}
          </p>
        </div>
      </div>
    </footer>
  );
};
