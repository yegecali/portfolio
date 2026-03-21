import { mergeClasses } from "@/lib/utils";

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  noCustomization?: boolean;
  externalLink?: boolean;
  withUnderline?: boolean;
}

const Link = ({
  className,
  noCustomization,
  externalLink,
  withUnderline,
  ...props
}: LinkProps) => {
  const baseClasses = noCustomization
    ? ""
    : "text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors";

  const underlineClasses = withUnderline ? "underline" : "";

  return (
    <a
      className={mergeClasses(baseClasses, underlineClasses, className)}
      {...(externalLink
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      {...props}
    />
  );
};

export default Link;
