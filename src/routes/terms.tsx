import { createFileRoute } from "@tanstack/react-router";
import { CC_Terms } from "@/views/CC_Placeholders";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use | NeighborSpace" },
      {
        name: "description",
        content:
          "NeighborSpace terms of use — community guidelines, resident responsibilities, and the rules that keep our community platform useful and respectful.",
      },
      { property: "og:title", content: "Terms of Use | NeighborSpace" },
      {
        property: "og:description",
        content:
          "NeighborSpace terms of use — community guidelines and the rules that keep the platform useful.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CC_Terms,
});
