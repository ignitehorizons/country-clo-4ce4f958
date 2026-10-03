import React from "react";
import { useFeature } from "../hooks/useFeature";
import FEATURE_FLAGS from "../config/featureFlags";
import { useAuth } from "../context/CC_AuthContext";

interface Props {
  feature: keyof typeof FEATURE_FLAGS;
  tier: string;
  children: React.ReactNode;
}

export const CC_FeatureGuard = ({ feature, tier, children }: Props) => {
  const { userRole } = useAuth();
  const canAccess = useFeature(feature);

  if (userRole === "admin" || userRole === "boardMember") {
    return <>{children}</>;
  }

  if (!canAccess) {
    return (
      <div
        style={{
          padding: "4rem 2rem",
          textAlign: "center",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <h2 style={{ marginBottom: "1rem", fontFamily: "var(--font-display)" }}>
          Upgrade Required
        </h2>
        <p>
          This feature is available on the {tier} plan. Contact your community administrator to
          upgrade.
        </p>
      </div>
    );
  }

  return <>{children}</>;
};
