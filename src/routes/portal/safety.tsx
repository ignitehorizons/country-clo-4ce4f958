import { createFileRoute } from "@tanstack/react-router";
import { CC_FeatureGuard } from "@/components/CC_FeatureGuard";
import { CC_Safety } from "@/views/CC_Safety";

function PortalPage() {
  return (
    <CC_FeatureGuard feature="safetyAlerts" tier="Community">
      <CC_Safety />
    </CC_FeatureGuard>
  );
}

export const Route = createFileRoute("/portal/safety")({
  component: PortalPage,
});
