import { createFileRoute } from "@tanstack/react-router";
import CC_About from "@/views/CC_About";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About | Country Close" }] }),
  component: CC_About,
});
