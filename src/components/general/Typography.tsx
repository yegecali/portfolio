import { cva, type VariantProps } from "class-variance-authority";
import { mergeClasses } from "@/lib/utils";
import React from "react";

const typographyVariants = cva("text-body", {
  variants: {
    variant: {
      h1: "text-4xl font-semibold md:font-bold md:text-5xl md:tracking-[-0.02em] lg:text-6xl lg:leading-[72px] text-heading",
      h2: "text-lg md:text-4xl font-semibold tracking-[-0.02em] text-heading",
      h3: "text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-heading",
      subtitle: "text-lg md:text-xl text-body",
      body1: "text-base md:text-lg text-body",
      body2: "text-base text-body",
      body3: "text-sm text-subtle",
    },
  },
  defaultVariants: {
    variant: "body2",
  },
});

interface TypographyProps
  extends
    React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof typographyVariants> {
  component?: React.ElementType;
}

const elementMapping = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  subtitle: "p",
  body1: "p",
  body2: "p",
  body3: "p",
};

const Typography = React.forwardRef<
  HTMLParagraphElement | HTMLHeadingElement,
  TypographyProps
>(({ component, className = "", variant, children, ...props }, ref) => {
  const Element = (component ||
    (variant && elementMapping[variant as keyof typeof elementMapping]) ||
    "p") as React.ElementType;

  return (
    <Element
      className={mergeClasses(typographyVariants({ variant }), className)}
      ref={ref}
      {...props}
    >
      {children}
    </Element>
  );
});

Typography.displayName = "Typography";

export default Typography;
