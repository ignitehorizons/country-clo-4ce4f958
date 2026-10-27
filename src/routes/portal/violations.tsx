import { createFileRoute } from "@tanstack/react-router";
import { CC_FeatureGuard } from "@/components/CC_FeatureGuard";
import { CC_Violations } from "@/views/CC_Violations";

function PortalPage() {
  return (
    <CC_FeatureGuard feature="violationTracking" tier="Association">
      <CC_Violations />
    </CC_FeatureGuard>
  );
}

export const Route = createFileRoute("/portal/violations")({
  component: PortalPage,
});
