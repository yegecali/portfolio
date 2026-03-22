// ── Base ──────────────────────────────────────────────────────────────────────

const Skeleton = ({ className = "" }: { className?: string }) => (
  <div
    className={`animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700/60 ${className}`}
  />
);

// ── Project card skeleton ─────────────────────────────────────────────────────
// Mirrors the structure of WorkSection's project cards.

export const ProjectCardSkeleton = ({
  accent,
}: {
  accent: { bg: string; border: string };
}) => (
  <div
    className={`relative flex flex-col gap-4 rounded-2xl border p-4 md:p-6 overflow-hidden ${accent.bg} ${accent.border}`}
  >
    {/* Header row */}
    <div className="flex items-start gap-4">
      <Skeleton className="flex-shrink-0 w-12 h-12 rounded-xl" />
      <div className="flex flex-col gap-2 flex-1 min-w-0">
        <Skeleton className="h-5 w-3/4 rounded-full" />
        <Skeleton className="h-4 w-1/3 rounded-full" />
      </div>
    </div>

    {/* Divider */}
    <Skeleton className="h-px w-full rounded-none" />

    {/* Description lines */}
    <div className="flex flex-col gap-2">
      <Skeleton className="h-3.5 w-full rounded-full" />
      <Skeleton className="h-3.5 w-full rounded-full" />
      <Skeleton className="h-3.5 w-5/6 rounded-full" />
      <Skeleton className="h-3.5 w-4/6 rounded-full" />
    </div>

    {/* Tech chips — fixed Tailwind widths to avoid inline style */}
    <div className="flex flex-wrap gap-1.5">
      <Skeleton className="h-6 w-14 rounded-full" />
      <Skeleton className="h-6 w-16 rounded-full" />
      <Skeleton className="h-6 w-12 rounded-full" />
      <Skeleton className="h-6 w-20 rounded-full" />
      <Skeleton className="h-6 w-16 rounded-full" />
    </div>

    {/* Footer link */}
    <Skeleton className="h-4 w-32 rounded-full" />
  </div>
);

// ── Experience card skeleton ──────────────────────────────────────────────────
// Mirrors the structure of ExperienceSection's ExperienceCard.

export const ExperienceCardSkeleton = () => (
  <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-6 shadow-md border border-gray-100 dark:border-gray-700">
    {/* Position title */}
    <Skeleton className="h-5 w-2/3 rounded-full mb-3" />

    {/* Company row */}
    <div className="flex items-center gap-2 mb-2">
      <Skeleton className="w-4 h-4 rounded-full flex-shrink-0" />
      <Skeleton className="h-4 w-1/3 rounded-full" />
    </div>

    {/* Dates row */}
    <div className="flex items-center gap-2 mb-4">
      <Skeleton className="w-4 h-4 rounded-full flex-shrink-0" />
      <Skeleton className="h-3.5 w-2/5 rounded-full" />
    </div>

    {/* Divider */}
    <Skeleton className="h-px w-full rounded-none mb-4" />

    {/* Summary bullets — widths via Tailwind fractions */}
    <div className="flex flex-col gap-3">
      <div className="flex items-start gap-2">
        <Skeleton className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" />
        <Skeleton className="h-3.5 rounded-full w-full" />
      </div>
      <div className="flex items-start gap-2">
        <Skeleton className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" />
        <Skeleton className="h-3.5 rounded-full w-11/12" />
      </div>
      <div className="flex items-start gap-2">
        <Skeleton className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" />
        <Skeleton className="h-3.5 rounded-full w-4/5" />
      </div>
    </div>
  </div>
);

export default Skeleton;
