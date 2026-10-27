import { createFileRoute } from "@tanstack/react-router";
import CC_Home from "@/views/CC_Home";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "neighborspace — The operating system for connected communities",
      },
      {
        name: "description",
        content:
          "neighborspace is the all-in-one community management platform for HOAs, condo associations, and neighborhoods — dues, maintenance, violations, voting, and resident communication in one place.",
      },
      { property: "og:title", content: "neighborspace" },
      {
        property: "og:description",
        content:
          "The all-in-one community management platform for HOAs, condo associations, and neighborhoods.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CC_Home,
});