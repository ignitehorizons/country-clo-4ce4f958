import { createFileRoute } from "@tanstack/react-router";
import CC_Home from "@/views/CC_Home";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "NeighborSpace — Where Communities Connect",
      },
      {
        name: "description",
        content:
          "NeighborSpace is a private, branded home for your community — announcements, events, a verified neighbor directory, and local resources in one place for your HOA, condo association, or neighborhood.",
      },
      { property: "og:title", content: "NeighborSpace" },
      {
        property: "og:description",
        content:
          "A private, branded home for your community — announcements, events, a verified neighbor directory, and local resources in one place.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CC_Home,
});
