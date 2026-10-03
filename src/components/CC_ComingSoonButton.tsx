import * as React from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface CC_ComingSoonButtonProps extends ButtonProps {
  /** Tooltip text shown on hover/focus. Defaults to "Coming soon". */
  label?: string;
}

/**
 * A Button that is visually disabled (opacity-50, not clickable) and shows a
 * "Coming soon" tooltip on hover/focus. Used for controls whose backing
 * feature is planned but not yet built, so they read as intentionally
 * unavailable rather than silently broken.
 *
 * The disabled <Button> is wrapped in a focusable <span> because Radix
 * Tooltip triggers don't fire on elements with pointer-events:none (which
 * disabled buttons get). Hover/focus lands on the span instead.
 */
export const CC_ComingSoonButton = React.forwardRef<HTMLButtonElement, CC_ComingSoonButtonProps>(
  ({ children, label = "Coming soon", ...props }, ref) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          tabIndex={0}
          className="inline-flex rounded-md focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Button ref={ref} {...props} disabled>
            {children}
          </Button>
        </span>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  ),
);

CC_ComingSoonButton.displayName = "CC_ComingSoonButton";

export default CC_ComingSoonButton;
