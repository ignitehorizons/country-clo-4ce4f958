import { createFileRoute } from "@tanstack/react-router";
import { CC_Dashboard } from "@/views/CC_Dashboard";

export const Route = createFileRoute("/portal/")({
  component: CC_Dashboard,
});
