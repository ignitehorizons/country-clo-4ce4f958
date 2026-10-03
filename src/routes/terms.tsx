import { createFileRoute } from "@tanstack/react-router";
import { CC_Terms } from "@/views/CC_Placeholders";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms of Use | Country Close" }] }),
  component: CC_Terms,
});
