import React, { useState } from "react";
import { Link } from "@/lib/router-compat";
import { CC_PortalLayout } from "./CC_PortalLayout";
import { useAuth } from "../context/CC_AuthContext";
import { Lock, ArrowLeft, X } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

export const CC_PortalGuard = () => {
  const { isReady, isLoggedIn, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imgError, setImgError] = useState(false);

  // Wait for the saved session to load so members don't see the sign-in
  // form flash on every refresh.
  if (!isReady) {
    return <div className="min-h-screen bg-cream" aria-busy="true" />;
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream px-4 py-12">
        <div className="bg-white rounded-[20px] shadow-lg border border-border w-full max-w-[480px] p-10 md:p-14 text-center relative">
          <Link
            to="/"
            className="absolute top-[20px] right-[20px] w-8 h-8 rounded-full bg-light-gray flex items-center justify-center text-text-light hover:bg-border hover:text-bark transition-colors"
          >
            <X size={18} />
          </Link>

          <div className="text-left mb-4">
            <Link
              to="/"
              className="inline-flex items-center gap-1 font-body font-bold text-[13px] text-primary hover:text-accent transition-colors"
            >
              <ArrowLeft size={14} />
              Back to Home
            </Link>
          </div>

          <div className="mx-auto h-[48px] mb-6 flex justify-center items-center">
            {!imgError ? (
              <img
                src="https://vibe.filesafe.space/1775231453582117442/attachments/af76dd37-5259-4112-9afd-06ad80348466.png"
                alt="Country Close"
                style={{
                  height: "44px",
                  width: "auto",
                  objectFit: "contain",
                  display: "block",
                  margin: "0 auto",
                }}
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="h-[64px] w-[64px] bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-display text-2xl font-bold">CC</span>
              </div>
            )}
          </div>

          <h1 className="font-display font-bold text-[28px] text-bark mb-2">Member Access Only</h1>

          <p className="font-body text-[15px] text-text-light leading-[1.6] mb-8">
            CountryClose.com is a private platform for Country Close residents only. Please sign in
            to continue.
          </p>

          <div className="h-px w-full bg-border mb-8" />

          <form
            className="text-left"
            onSubmit={(e) => {
              e.preventDefault();
              login();
            }}
          >
            <div className="mb-4">
              <label className="block font-body font-bold text-sm text-bark mb-1.5">
                Email address
              </label>
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-4 rounded-md border border-border bg-white text-text font-body focus:outline-hidden focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>

            <div className="mb-2">
              <label className="block font-body font-bold text-sm text-bark mb-1.5">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 px-4 rounded-md border border-border bg-white text-text font-body focus:outline-hidden focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>

            <div className="flex justify-between items-center mb-6">
              <Tooltip>
                <TooltipTrigger asChild>
                  <span
                    tabIndex={0}
                    className="inline-flex rounded focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <button
                      type="button"
                      disabled
                      aria-label="Forgot password (coming soon)"
                      className="font-body text-[13px] text-primary/50 cursor-not-allowed"
                    >
                      Forgot password?
                    </button>
                  </span>
                </TooltipTrigger>
                <TooltipContent>Coming soon</TooltipContent>
              </Tooltip>
            </div>

            <button
              type="submit"
              className="w-full bg-accent hover:bg-accent-hover text-bark font-body font-bold text-[16px] py-3.5 rounded-full transition-colors"
            >
              Sign In
            </button>
          </form>

          <div className="flex items-center gap-4 my-6">
            <div className="h-px flex-1 bg-border" />
            <span className="font-body text-[13px] text-text-light">or</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="font-body text-[14px] text-text">
            New resident?{" "}
            <Link to="/join" className="text-primary hover:text-primary-light transition-colors">
              Join here &rarr;
            </Link>
          </div>

          <div className="mt-6 flex items-center justify-center gap-1.5 text-text-light">
            <Lock size={12} />
            <span className="font-body text-[12px]">Secured by CountryClose</span>
          </div>
        </div>
      </div>
    );
  }

  return <CC_PortalLayout />;
};
