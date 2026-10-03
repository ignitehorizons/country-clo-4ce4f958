import { createFileRoute } from "@tanstack/react-router";
import { CC_ApprovalQueue } from "@/views/CC_ApprovalQueue";

export const Route = createFileRoute("/portal/approvals")({
  component: CC_ApprovalQueue,
});
