import { createFileRoute } from "@tanstack/react-router";
import { CC_Privacy } from "@/views/CC_Placeholders";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy Policy | Country Close" }] }),
  component: CC_Privacy,
});
