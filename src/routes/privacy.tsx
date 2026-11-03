import { createFileRoute } from "@tanstack/react-router";
import { CC_Privacy } from "@/views/CC_Placeholders";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | NeighborSpace" },
      {
        name: "description",
        content:
          "NeighborSpace privacy policy — how we collect, use, and protect your personal information. Your data is private, shared only within your community, and never sold.",
      },
      { property: "og:title", content: "Privacy Policy | NeighborSpace" },
      {
        property: "og:description",
        content:
          "NeighborSpace privacy policy — how we collect, use, and protect your personal information.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CC_Privacy,
});
