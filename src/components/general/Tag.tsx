import React from "react";
import { mergeClasses } from "@/lib/utils";
import Typography from "@/components/general/Typography";

interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
}

const Tag = React.forwardRef<HTMLDivElement, TagProps>(
  ({ label, className, ...props }: TagProps, ref) => {
    return (
      <div
        className={mergeClasses(
          "flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 px-5 py-2 border border-blue-200 dark:border-blue-700/50 transition-all duration-300 hover:shadow-md dark:hover:bg-blue-900/50",
          className,
        )}
        {...props}
        ref={ref}
      >
        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
        <Typography
          variant="body3"
          className="font-semibold text-blue-700 dark:text-blue-300 transition-colors duration-300"
        >
          {label}
        </Typography>
      </div>
    );
  },
);

Tag.displayName = "Tag";

export default Tag;
