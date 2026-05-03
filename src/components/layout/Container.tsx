import React from "react";
import { mergeClasses } from "@/lib/utils";

const Container = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <section
        className={mergeClasses(
          "w-full overflow-hidden bg-gradient-to-b from-section-alt to-section-bg py-16 md:py-28 2xl:py-40 transition-colors duration-500",
          className,
        )}
        ref={ref}
        {...props}
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 md:gap-16 md:px-8">
          {children}
        </div>
      </section>
    );
  },
);

Container.displayName = "Container";

export default Container;
