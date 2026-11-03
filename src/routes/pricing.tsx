import { createFileRoute, redirect } from "@tanstack/react-router";

// Pricing has been removed. Any visit to /pricing redirects to the homepage.
export const Route = createFileRoute("/pricing")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
});
