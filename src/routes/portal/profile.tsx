import { createFileRoute } from "@tanstack/react-router";
import { CC_Profile } from "@/views/CC_Profile";

export const Route = createFileRoute("/portal/profile")({
  component: CC_Profile,
});
