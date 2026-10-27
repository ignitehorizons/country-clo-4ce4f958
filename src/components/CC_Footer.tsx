import { Link } from "@/lib/router-compat";
import communityConfig from "@/config/communityConfig";

export const CC_Footer = () => {
  return (
    <footer className="w-full bg-bark pt-[60px] pb-[40px] text-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Column 1 */}
          <div className="flex flex-col items-start gap-4">
            <span className="font-display text-[24px] font-extrabold tracking-tight text-white">
              neighbor<span className="text-accent">space</span>
            </span>
            <p className="font-body text-sm text-cream/80 m-0">{communityConfig.tagline}</p>
            <p className="font-body text-sm text-cream/60 mt-4">
              © {new Date().getFullYear()} {communityConfig.name}. All rights reserved.
            </p>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col items-start gap-4">
            <h4 className="font-body text-accent text-sm font-bold uppercase tracking-[2px] m-0">
              Platform
            </h4>
            <div className="flex flex-col gap-3">
              <Link
                to="/"
                className="font-body text-sm text-white hover:text-accent transition-colors"
              >
                Home
              </Link>
              <Link
                to="/features"
                className="font-body text-sm text-white hover:text-accent transition-colors"
              >
                Features
              </Link>
              <Link
                to="/pricing"
                className="font-body text-sm text-white hover:text-accent transition-colors"
              >
                Pricing
              </Link>
              <Link
                to="/stories"
                className="font-body text-sm text-white hover:text-accent transition-colors"
              >
                Stories
              </Link>
              <Link
                to="/contact"
                className="font-body text-sm text-white hover:text-accent transition-colors"
              >
                Contact
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
            <h4 className="font-body text-accent text-sm font-bold uppercase tracking-[2px] m-0">
              Company
            </h4>
            <div className="flex flex-col gap-3 font-body text-sm text-white">
              <Link to="/about" className="hover:text-accent transition-colors">
                About
              </Link>
              <Link to="/sponsors" className="hover:text-accent transition-colors">
                Partners
              </Link>
              <a
                href={`mailto:${communityConfig.adminEmail}`}
                className="hover:text-accent transition-colors"
              >
                {communityConfig.adminEmail}
              </a>
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
            © {new Date().getFullYear()} {communityConfig.name}
          </p>
          <p className="font-body text-xs text-white/40 m-0">
            Platform powered by {communityConfig.poweredBy}
          </p>
        </div>
      </div>
    </footer>
  );
};