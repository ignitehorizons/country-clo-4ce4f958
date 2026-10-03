import { createFileRoute } from "@tanstack/react-router";
import { CC_FeatureGuard } from "@/components/CC_FeatureGuard";
import { CC_Complaints } from "@/views/CC_Complaints";

function PortalPage() {
  return (
    <CC_FeatureGuard feature="violationTracking" tier="Association">
      <CC_Complaints />
    </CC_FeatureGuard>
  );
}

export const Route = createFileRoute("/portal/complaints")({
  component: PortalPage,
});
