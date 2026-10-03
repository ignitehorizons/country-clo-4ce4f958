import { createFileRoute } from "@tanstack/react-router";
import { CC_FeatureGuard } from "@/components/CC_FeatureGuard";
import { CC_Board } from "@/views/CC_Board";

function PortalPage() {
  return (
    <CC_FeatureGuard feature="boardMeetingHub" tier="Association">
      <CC_Board />
    </CC_FeatureGuard>
  );
}

export const Route = createFileRoute("/portal/board")({
  component: PortalPage,
});
