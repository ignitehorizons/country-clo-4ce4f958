import { createFileRoute } from "@tanstack/react-router";
import CC_Development from "@/views/CC_Development";

export const Route = createFileRoute("/development")({
  head: () => ({
    meta: [
      { title: "Development | NeighborSpace" },
      {
        name: "description",
        content:
          "NeighborSpace powers community platforms for developers, builders, and new neighborhoods — from pre-sale through the handoff to an elected resident board.",
      },
      { property: "og:title", content: "Development | NeighborSpace" },
      {
        property: "og:description",
        content:
          "NeighborSpace for developers, builders, and new neighborhoods — from pre-sale through handoff.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CC_Development,
});
