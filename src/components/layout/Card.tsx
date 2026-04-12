import { mergeClasses } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = ({ className, children, ...props }: CardProps) => {
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
