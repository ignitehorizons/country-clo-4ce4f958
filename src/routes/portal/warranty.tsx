import { createFileRoute } from "@tanstack/react-router";
import { CC_FeatureGuard } from "@/components/CC_FeatureGuard";
import { CC_Warranty } from "@/views/CC_Warranty";

function PortalPage() {
  return (
    <CC_FeatureGuard feature="warrantyPortal" tier="Developer">
      <CC_Warranty />
    </CC_FeatureGuard>
  );
}

export const Route = createFileRoute("/portal/warranty")({
  component: PortalPage,
});
