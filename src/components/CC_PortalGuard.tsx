import React, { useState } from "react";
import { Link } from "@/lib/router-compat";
import { CC_PortalLayout } from "./CC_PortalLayout";
import { useAuth } from "../context/CC_AuthContext";
import { Lock, ArrowLeft, X, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { signIn, signUp, resetPassword } from "@/lib/auth.functions";

type Mode = "signin" | "signup" | "forgot";

export const CC_PortalGuard = () => {
  const { isReady, isLoggedIn } = useAuth();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  // Wait for the saved session to load so members don't see the sign-in
  // form flash on every refresh.
  if (!isReady) {
    return <div className="min-h-screen bg-cream" aria-busy="true" />;
  }

  if (isLoggedIn) {
    return <CC_PortalLayout />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setFormError(null);
    setFormSuccess(null);

    try {
      if (mode === "signin") {
        const result = await signIn({ email, password });
        if (!result.ok || !result.user) {
          setFormError(result.error ?? "Sign-in failed. Please try again.");
          setBusy(false);
          return;
        }
        // Session is now in the httpOnly cookie; reload so the provider
        // restores it from the server.
        window.location.assign("/portal");
        return;
      }

      if (mode === "signup") {
        const result = await signUp({ email, password });
        if (!result.ok) {
          setFormError(result.error ?? "Sign-up failed. Please try again.");
          setBusy(false);
          return;
        }
        setFormSuccess("Check your inbox — we sent a confirmation link. Click it, then sign in.");
        setMode("signin");
        setBusy(false);
        return;
      }

      // forgot
      const result = await resetPassword({ email });
      if (!result.ok) {
        setFormError(result.error ?? "Couldn't send reset email. Please try again.");
        setBusy(false);
        return;
      }
      setFormSuccess("If an account exists for that email, a reset link is on its way.");
      setMode("signin");
      setBusy(false);
    } catch (error) {
      console.error("[auth] sign-in/sign-up/reset failed", error);
      setFormError("We couldn't complete that request. Please try again.");
      setBusy(false);
    }
  };

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

        <Link
          to="/"
          className="inline-flex items-center h-[48px] mb-6 font-display text-[28px] font-extrabold tracking-tight text-bark hover:opacity-80 transition-opacity"
        >
          Neighbor<span className="text-accent">Space</span>
        </Link>

        <h1 className="font-display font-bold text-[28px] text-bark mb-2">
          {mode === "signin"
            ? "Member Access Only"
            : mode === "signup"
              ? "Create Your Account"
              : "Reset Password"}
        </h1>

        <p className="font-body text-[15px] text-text-light leading-[1.6] mb-8">
          {mode === "signin"
            ? "NeighborSpace is a private platform for community members only. Please sign in to continue."
            : mode === "signup"
              ? "Sign up with your email. We'll send a confirmation link before you can sign in."
              : "Enter your email and we'll send a link to reset your password."}
        </p>

        <div className="h-px w-full bg-border mb-8" />

        {formSuccess && (
          <div className="mb-6 flex items-start gap-3 bg-primary/6 border border-primary/20 rounded-xl p-4 text-left">
            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <p className="font-body text-sm text-text">{formSuccess}</p>
          </div>
        )}
        {formError && (
          <div className="mb-6 flex items-start gap-3 bg-[#C0392B]/8 border border-[#C0392B]/30 rounded-xl p-4 text-left">
            <AlertCircle className="w-5 h-5 text-[#C0392B] shrink-0 mt-0.5" />
            <p className="font-body text-sm text-text">{formError}</p>
          </div>
        )}

        <form className="text-left" onSubmit={handleSubmit}>
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

          {mode !== "forgot" && (
            <div className="mb-2">
              <label className="block font-body font-bold text-sm text-bark mb-1.5">Password</label>
              <input
                type="password"
                required
                minLength={mode === "signup" ? 8 : 1}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 px-4 rounded-md border border-border bg-white text-text font-body focus:outline-hidden focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
          )}

          {mode === "signin" && (
            <div className="flex justify-end items-center mb-6">
              <button
                type="button"
                onClick={() => {
                  setMode("forgot");
                  setFormError(null);
                  setFormSuccess(null);
                }}
                className="font-body text-[13px] text-primary hover:text-primary-light transition-colors"
              >
                Forgot password?
              </button>
            </div>
          )}

          {mode === "signup" && <div className="mb-6" />}

          <button
            type="submit"
            disabled={busy}
            className="w-full bg-accent hover:bg-accent-hover text-bark font-body font-bold text-[16px] py-3.5 rounded-full transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {busy && <Loader2 className="w-4 h-4 animate-spin" />}
            {mode === "signin"
              ? "Sign In"
              : mode === "signup"
                ? "Create Account"
                : "Send Reset Link"}
          </button>
        </form>

        {mode !== "forgot" && (
          <>
            <div className="flex items-center gap-4 my-6">
              <div className="h-px flex-1 bg-border" />
              <span className="font-body text-[13px] text-text-light">or</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <button
              type="button"
              onClick={() => {
                setMode(mode === "signin" ? "signup" : "signin");
                setFormError(null);
                setFormSuccess(null);
              }}
              className="font-body text-[14px] text-text"
            >
              {mode === "signin" ? (
                <>
                  New resident?{" "}
                  <span className="text-primary hover:text-primary-light transition-colors">
                    Create an account &rarr;
                  </span>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <span className="text-primary hover:text-primary-light transition-colors">
                    Sign in &rarr;
                  </span>
                </>
              )}
            </button>
          </>
        )}

        {mode === "forgot" && (
          <div className="mt-6">
            <button
              type="button"
              onClick={() => {
                setMode("signin");
                setFormError(null);
                setFormSuccess(null);
              }}
              className="font-body text-[14px] text-primary hover:text-primary-light transition-colors"
            >
              Back to sign in
            </button>
          </div>
        )}

        <div className="mt-6 flex items-center justify-center gap-1.5 text-text-light">
          <Lock size={12} />
          <span className="font-body text-[12px]">Secured by NeighborSpace</span>
        </div>
      </div>
    </div>
  );
};
