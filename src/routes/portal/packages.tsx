import { createFileRoute } from "@tanstack/react-router";
import { CC_FeatureGuard } from "@/components/CC_FeatureGuard";
import { CC_Packages } from "@/views/CC_Packages";

function PortalPage() {
  return (
    <CC_FeatureGuard feature="packageAlerts" tier="Community">
      <CC_Packages />
    </CC_FeatureGuard>
  );
}

export const Route = createFileRoute("/portal/packages")({
  component: PortalPage,
});
