// Matches numeric metrics inside text (percentages, ms, multipliers, large numbers)
export const METRIC_PATTERN =
  /(\d+(?:[.,]\d+)?\s*(?:millones?|M\b|K\b)?\s*(?:%|ms|x\b)|99[.,]\d+%|\d+\s+millones?)/gi;

interface HighlightedMetricTextProps {
  text: string;
  /** Extra Tailwind classes applied to the `<mark>` chip. */
  markClassName?: string;
}

/**
 * Renders text with numeric metrics wrapped in a colored chip.
 * Works for bullet points (ExperienceSection) and descriptions (WorkSection).
 */
const HighlightedMetricText = ({
  text,
  markClassName = "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700/50",
}: HighlightedMetricTextProps) => {
  const parts: Array<{ value: string; isMetric: boolean }> = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  METRIC_PATTERN.lastIndex = 0;
  while ((match = METRIC_PATTERN.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ value: text.slice(lastIndex, match.index), isMetric: false });
    }
    parts.push({ value: match[0], isMetric: true });
    lastIndex = METRIC_PATTERN.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push({ value: text.slice(lastIndex), isMetric: false });
  }

  return (
    <>
      {parts.map((part, i) =>
        part.isMetric ? (
          <mark
            key={i}
            className={`inline-flex items-center px-1.5 py-0.5 rounded-md text-[11px] font-bold leading-tight align-middle mx-0.5 ${markClassName}`}
          >
            {part.value.trim()}
          </mark>
        ) : (
          <span key={i}>{part.value}</span>
        )
      )}
    </>
  );
};

export default HighlightedMetricText;
