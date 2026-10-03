import { createFileRoute } from "@tanstack/react-router";
import { CC_FeatureGuard } from "@/components/CC_FeatureGuard";
import { CC_Calendar } from "@/views/CC_Calendar";

function PortalPage() {
  return (
    <CC_FeatureGuard feature="communityCalendar" tier="Neighbor">
      <CC_Calendar />
    </CC_FeatureGuard>
  );
}

export const Route = createFileRoute("/portal/calendar")({
  component: PortalPage,
});
