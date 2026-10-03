import { createFileRoute } from "@tanstack/react-router";
import { CC_FeatureGuard } from "@/components/CC_FeatureGuard";
import { CC_Voting } from "@/views/CC_Voting";

function PortalPage() {
  return (
    <CC_FeatureGuard feature="votingAndPolls" tier="Association">
      <CC_Voting />
    </CC_FeatureGuard>
  );
}

export const Route = createFileRoute("/portal/voting")({
  component: PortalPage,
});
