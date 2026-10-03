import { createFileRoute } from "@tanstack/react-router";
import { CC_FeatureGuard } from "@/components/CC_FeatureGuard";
import { CC_Documents } from "@/views/CC_Documents";

function PortalPage() {
  return (
    <CC_FeatureGuard feature="documentLibrary" tier="Community">
      <CC_Documents />
    </CC_FeatureGuard>
  );
}

export const Route = createFileRoute("/portal/documents")({
  component: PortalPage,
});
