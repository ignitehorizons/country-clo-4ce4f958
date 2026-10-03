import { createFileRoute } from "@tanstack/react-router";
import { CC_FeatureGuard } from "@/components/CC_FeatureGuard";
import { CC_LostFound } from "@/views/CC_LostFound";

function PortalPage() {
  return (
    <CC_FeatureGuard feature="lostAndFound" tier="Neighbor">
      <CC_LostFound />
    </CC_FeatureGuard>
  );
}

export const Route = createFileRoute("/portal/lost-found")({
  component: PortalPage,
});
