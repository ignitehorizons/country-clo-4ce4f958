import { createFileRoute } from "@tanstack/react-router";
import { CC_FeatureGuard } from "@/components/CC_FeatureGuard";
import { CC_Maintenance } from "@/views/CC_Maintenance";

function PortalPage() {
  return (
    <CC_FeatureGuard feature="maintenanceRequests" tier="Community">
      <CC_Maintenance />
    </CC_FeatureGuard>
  );
}

export const Route = createFileRoute("/portal/maintenance")({
  component: PortalPage,
});
