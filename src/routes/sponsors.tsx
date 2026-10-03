import { createFileRoute } from "@tanstack/react-router";
import CC_Sponsors from "@/views/CC_Sponsors";

export const Route = createFileRoute("/sponsors")({
  head: () => ({ meta: [{ title: "Sponsors | Country Close" }] }),
  component: CC_Sponsors,
});
