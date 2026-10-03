import { createFileRoute } from "@tanstack/react-router";
import { CC_FeatureGuard } from "@/components/CC_FeatureGuard";
import { CC_Carpool } from "@/views/CC_Carpool";

function PortalPage() {
  return (
    <CC_FeatureGuard feature="carpoolBoard" tier="Community">
      <CC_Carpool />
    </CC_FeatureGuard>
  );
}

export const Route = createFileRoute("/portal/carpool")({
  component: PortalPage,
});
