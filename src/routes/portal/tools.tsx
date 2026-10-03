import { createFileRoute } from "@tanstack/react-router";
import { CC_FeatureGuard } from "@/components/CC_FeatureGuard";
import { CC_Tools } from "@/views/CC_Tools";

function PortalPage() {
  return (
    <CC_FeatureGuard feature="toolLibrary" tier="Community">
      <CC_Tools />
    </CC_FeatureGuard>
  );
}

export const Route = createFileRoute("/portal/tools")({
  component: PortalPage,
});
