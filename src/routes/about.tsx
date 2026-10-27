import { createFileRoute } from "@tanstack/react-router";
import CC_About from "@/views/CC_About";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | neighborspace" },
      {
        name: "description",
        content:
          "neighborspace is the all-in-one community management platform for HOAs, condo associations, and neighborhoods — built to replace spreadsheets, group chats, and paper notices with one source of truth.",
      },
      { property: "og:title", content: "About | neighborspace" },
      {
        property: "og:description",
        content:
          "The all-in-one community management platform for HOAs, condo associations, and neighborhoods.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CC_About,
});