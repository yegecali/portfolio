interface StatusBadgeProps {
  label: string;
  /** Dot size: "sm" = h-2 w-2, "md" = h-2.5 w-2.5 */
  size?: "sm" | "md";
  className?: string;
}

/**
 * Pulsing green "available/active" badge used across sections.
 * Wrap in a motion.div at the call site if animation is needed.
 */
const StatusBadge = ({ label, size = "md", className = "" }: StatusBadgeProps) => {
  const dotSize = size === "sm" ? "h-2 w-2" : "h-2.5 w-2.5";

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-700/50 bg-emerald-50 dark:bg-emerald-900/20 ${className}`}
    >
      <span className={`relative flex ${dotSize}`}>
        <span className={`absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75`} />
        <span className={`relative inline-flex ${dotSize} rounded-full bg-emerald-500`} />
      </span>
      <span className="font-semibold text-emerald-700 dark:text-emerald-400">
        {label}
      </span>
    </span>
  );
};

export default StatusBadge;
