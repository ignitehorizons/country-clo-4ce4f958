import { createFileRoute } from "@tanstack/react-router";
import { CC_FeatureGuard } from "@/components/CC_FeatureGuard";
import { CC_Directory } from "@/views/CC_Directory";

function PortalPage() {
  return (
    <CC_FeatureGuard feature="neighborDirectory" tier="Neighbor">
      <CC_Directory />
    </CC_FeatureGuard>
  );
}

export const Route = createFileRoute("/portal/directory")({
  component: PortalPage,
});
