import React from "react";
import { mergeClasses } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        className={mergeClasses(
          "inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/40 hover:scale-105 active:scale-95 dark:from-blue-500 dark:to-purple-500",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export default Button;
