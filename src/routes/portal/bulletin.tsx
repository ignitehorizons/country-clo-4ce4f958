import { createFileRoute } from "@tanstack/react-router";
import { CC_FeatureGuard } from "@/components/CC_FeatureGuard";
import { CC_Bulletin } from "@/views/CC_Bulletin";

function PortalPage() {
  return (
    <CC_FeatureGuard feature="bulletinBoard" tier="Neighbor">
      <CC_Bulletin />
    </CC_FeatureGuard>
  );
}

export const Route = createFileRoute("/portal/bulletin")({
  component: PortalPage,
});
