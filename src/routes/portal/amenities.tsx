import { createFileRoute } from "@tanstack/react-router";
import { CC_FeatureGuard } from "@/components/CC_FeatureGuard";
import { CC_Amenities } from "@/views/CC_Amenities";

function PortalPage() {
  return (
    <CC_FeatureGuard feature="amenityBooking" tier="Association">
      <CC_Amenities />
    </CC_FeatureGuard>
  );
}

export const Route = createFileRoute("/portal/amenities")({
  component: PortalPage,
});
