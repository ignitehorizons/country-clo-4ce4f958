import { createFileRoute } from "@tanstack/react-router";
import { CC_FeatureGuard } from "@/components/CC_FeatureGuard";
import { CC_Marketplace } from "@/views/CC_Marketplace";

function PortalPage() {
  return (
    <CC_FeatureGuard feature="marketplace" tier="Community">
      <CC_Marketplace />
    </CC_FeatureGuard>
  );
}

export const Route = createFileRoute("/portal/marketplace")({
  component: PortalPage,
});
