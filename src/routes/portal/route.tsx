import { createFileRoute } from "@tanstack/react-router";
import { CC_PortalGuard } from "@/components/CC_PortalGuard";

// Layout for every /portal page: sign-in gate, then the portal shell
// (sidebar + top bar), which renders the child page.
export const Route = createFileRoute("/portal")({
  head: () => ({ meta: [{ name: "robots", content: "noindex" }] }),
  component: CC_PortalGuard,
});
