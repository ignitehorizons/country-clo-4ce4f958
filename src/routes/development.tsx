import { createFileRoute } from "@tanstack/react-router";
import CC_Development from "@/views/CC_Development";

export const Route = createFileRoute("/development")({
  head: () => ({ meta: [{ title: "Development | Country Close" }] }),
  component: CC_Development,
});
