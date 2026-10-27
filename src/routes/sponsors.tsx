import { createFileRoute } from "@tanstack/react-router";
import CC_Sponsors from "@/views/CC_Sponsors";

export const Route = createFileRoute("/sponsors")({
  head: () => ({
    meta: [
      { title: "Partners | neighborspace" },
      {
        name: "description",
        content:
          "Become a neighborspace community partner and reach verified local households. A trusted, hyper-local listing — no ad algorithms, just neighbor recommendations.",
      },
      { property: "og:title", content: "Partners | neighborspace" },
      {
        property: "og:description",
        content:
          "Become a neighborspace community partner and reach verified local households.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CC_Sponsors,
});