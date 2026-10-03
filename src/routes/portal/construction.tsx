import { createFileRoute } from "@tanstack/react-router";
import { CC_FeatureGuard } from "@/components/CC_FeatureGuard";
import { CC_Construction } from "@/views/CC_Construction";

function PortalPage() {
  return (
    <CC_FeatureGuard feature="constructionTracker" tier="Developer">
      <CC_Construction />
    </CC_FeatureGuard>
  );
}

export const Route = createFileRoute("/portal/construction")({
  component: PortalPage,
});
