import { createFileRoute } from "@tanstack/react-router";
import CC_Join from "@/views/CC_Join";

export const Route = createFileRoute("/join")({
  head: () => ({ meta: [{ title: "Join Us | Country Close" }] }),
  component: CC_Join,
});
