import React from "react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const CC_EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="text-[48px] mb-4 leading-none">{icon}</div>
      <h3 className="font-display font-bold text-[20px] text-[#4A3728] mb-2">{title}</h3>
      <p className="font-body text-[14px] text-[#7A6A5A] max-w-sm mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          className="bg-[#E8A020] text-[#4A3728] font-body font-bold hover:bg-[#D4911A]"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
