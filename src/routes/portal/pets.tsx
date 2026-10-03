import { createFileRoute } from "@tanstack/react-router";
import { CC_FeatureGuard } from "@/components/CC_FeatureGuard";
import { CC_Pets } from "@/views/CC_Pets";

function PortalPage() {
  return (
    <CC_FeatureGuard feature="petRegistry" tier="Neighbor">
      <CC_Pets />
    </CC_FeatureGuard>
  );
}

export const Route = createFileRoute("/portal/pets")({
  component: PortalPage,
});
