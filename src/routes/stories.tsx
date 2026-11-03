import { createFileRoute, redirect } from "@tanstack/react-router";

// "Stories" has been renamed to "Roadmap". Redirect old links to /roadmap.
export const Route = createFileRoute("/stories")({
  beforeLoad: () => {
    throw redirect({ to: "/roadmap" });
  },
});
