import React from "react";
import { mergeClasses } from "@/lib/utils";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  showTooltip?: boolean;
  tooltipText?: string;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, size = "md", showTooltip, tooltipText, ...props }, ref) => {
    const sizeClasses = {
      sm: "h-8 w-8",
      md: "h-10 w-10",
      lg: "h-12 w-12",
    };

    return (
      <button
        className={mergeClasses(
          "flex items-center justify-center rounded-lg bg-gray-200/50 text-gray-600 transition-colors duration-200 hover:bg-gray-300 dark:bg-gray-700/50 dark:text-gray-300 dark:hover:bg-gray-600",
          sizeClasses[size],
          className,
        )}
        ref={ref}
        title={showTooltip ? tooltipText : undefined}
        {...props}
      />
    );
  },
);

IconButton.displayName = "IconButton";

export default IconButton;
