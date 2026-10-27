import { createFileRoute } from "@tanstack/react-router";
import CC_Join from "@/views/CC_Join";

export const Route = createFileRoute("/join")({
  head: () => ({
    meta: [
      { title: "Join | neighborspace" },
      {
        name: "description",
        content:
          "Join your community on neighborspace — free for verified residents. Create your account, set your privacy preferences, and connect with your neighbors.",
      },
      { property: "og:title", content: "Join | neighborspace" },
      {
        property: "og:description",
        content: "Join your community on neighborspace — free for verified residents.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CC_Join,
});
