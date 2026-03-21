import { mergeClasses } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = ({ className, children, ...props }: CardProps) => {
  return (
    <div
      className={mergeClasses(
        "rounded-xl bg-white dark:bg-gray-800 shadow-lg dark:shadow-2xl border border-gray-100 dark:border-gray-700 transition-colors duration-300",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
