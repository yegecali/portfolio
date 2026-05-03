import { mergeClasses } from "@/lib/utils";

const Card = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={mergeClasses(
        "rounded-xl bg-card-bg shadow-lg dark:shadow-2xl border border-card-border transition-colors duration-300",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
