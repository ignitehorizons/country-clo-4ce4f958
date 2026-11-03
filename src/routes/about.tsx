import { createFileRoute } from "@tanstack/react-router";
import CC_About from "@/views/CC_About";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About NeighborSpace — Built on One Street, Made for Every Community" },
      {
        name: "description",
        content:
          "NeighborSpace started as Country Close, a private website for one Pasco County, Florida neighborhood. Founded by 30-year public safety leader Jeremy Sidlauskas.",
      },
      {
        property: "og:title",
        content: "About NeighborSpace — Built on One Street, Made for Every Community",
      },
      {
        property: "og:description",
        content:
          "NeighborSpace started as Country Close, a private website for one Pasco County, Florida neighborhood. Founded by 30-year public safety leader Jeremy Sidlauskas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CC_About,
});
