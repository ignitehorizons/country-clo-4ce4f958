import { createFileRoute } from "@tanstack/react-router";
import CC_Home from "@/views/CC_Home";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Country Close — A quiet community of neighbors" }] }),
  component: CC_Home,
});
