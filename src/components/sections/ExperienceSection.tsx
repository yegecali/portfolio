import Container from "@/components/layout/Container";
import Typography from "@/components/general/Typography";
import WordReveal from "@/components/general/WordReveal";
import TiltCard from "@/components/general/TiltCard";
import { usePortfolio } from "@/hooks/usePortfolio";
import { useI18n } from "@/hooks/useI18n";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import StatusBadge from "@/components/general/StatusBadge";
import Reveal from "@/components/general/Reveal";
import { ExperienceCardSkeleton } from "@/components/general/Skeleton";
import { BRAND } from "@/lib/theme";

const formatDate = (date: Date) =>
  date.toLocaleDateString("es-PE", { month: "short", year: "numeric" });

// Matches numeric metrics inside bullet text (percentages, ms, multipliers, large numbers)
const METRIC_PATTERN =
  /(\d+(?:[.,]\d+)?\s*(?:millones?|M\b|K\b)?\s*(?:%|ms|x\b)|99[.,]\d+%|\d+\s+millones?)/gi;

/**
 * Renders bullet text with numeric metrics wrapped in a colored chip.
 */
const HighlightedBullet = ({ text }: { text: string }) => {
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
            className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[11px] font-bold leading-tight align-middle mx-0.5 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700/50"
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

const ExperienceSection = () => {
  const { experiences, isLoading } = usePortfolio();
  const { t } = useI18n();
  const ui = t.ui.experience;

  const SKELETON_COUNT = 3;

  return (
    <Container
      id="experience"
      className="min-h-screen flex flex-col items-center justify-center bg-section-bg overflow-hidden"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-4 mb-10 md:mb-16 w-full"
      >
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-2xl bg-gradient-to-br ${BRAND.ctaGradient} shadow-lg`}>
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <Typography
            variant="h1"
            className="text-4xl md:text-5xl font-bold text-heading"
          >
            <WordReveal
              text={ui.title}
              trigger="inView"
              delay={0}
              stagger={0.1}
              once={true}
            />
          </Typography>
        </div>
        <div className={`h-1 w-24 bg-gradient-to-r ${BRAND.lineGradient} via-purple-500 to-pink-500 rounded-full`} />
        <Typography className="max-w-2xl text-center text-body text-lg">
          {ui.subtitle}
        </Typography>
      </motion.div>

      {/* Timeline */}
      <div className="relative w-full max-w-4xl">
        {/* Vertical line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 -translate-x-1/2 hidden md:block" />
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 md:hidden" />

        <div className="flex flex-col gap-8 md:gap-12">
          {isLoading
            ? Array.from({ length: SKELETON_COUNT }).map((_, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <div
                    key={index}
                    className={`relative flex items-start gap-6 md:gap-0 ${
                      isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Mobile dot placeholder */}
                    <div className="relative z-10 flex-shrink-0 md:hidden w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700/60 animate-pulse" />

                    {/* Desktop left slot */}
                    <div className="hidden md:flex md:w-1/2 md:justify-end md:pr-10">
                      {isLeft && (
                        <div className="w-full max-w-sm">
                          <ExperienceCardSkeleton />
                        </div>
                      )}
                    </div>

                    {/* Desktop center dot placeholder */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10 w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700/60 animate-pulse" />

                    {/* Desktop right slot */}
                    <div className="hidden md:flex md:w-1/2 md:pl-10">
                      {!isLeft && (
                        <div className="w-full max-w-sm">
                          <ExperienceCardSkeleton />
                        </div>
                      )}
                    </div>

                    {/* Mobile skeleton */}
                    <div className="md:hidden flex-1">
                      <ExperienceCardSkeleton />
                    </div>
                  </div>
                );
              })
            : experiences.map((exp, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    className={`relative flex items-start gap-6 md:gap-0 ${
                      isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Mobile dot */}
                    <div className="relative z-10 flex-shrink-0 md:hidden">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${BRAND.ctaGradient} flex items-center justify-center shadow-lg ring-4 ring-white dark:ring-gray-900`}>
                        <Briefcase className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    {/* Desktop: left half */}
                    <div className="hidden md:flex md:w-1/2 md:justify-end md:pr-10">
                      {isLeft && (
                        <div className="w-full max-w-sm">
                          <ExperienceCard exp={exp} currentLabel={ui.currentLabel} presentLabel={ui.presentLabel} />
                        </div>
                      )}
                    </div>

                    {/* Desktop center dot */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 items-center justify-center shadow-lg ring-4 ring-white dark:ring-gray-900">
                      <Briefcase className="w-5 h-5 text-white" />
                    </div>

                    {/* Desktop: right half */}
                    <div className="hidden md:flex md:w-1/2 md:pl-10">
                      {!isLeft && (
                        <div className="w-full max-w-sm">
                          <ExperienceCard exp={exp} currentLabel={ui.currentLabel} presentLabel={ui.presentLabel} />
                        </div>
                      )}
                    </div>

                    {/* Mobile card */}
                    <div className="md:hidden flex-1">
                      <ExperienceCard exp={exp} currentLabel={ui.currentLabel} presentLabel={ui.presentLabel} />
                    </div>
                  </motion.div>
                );
              })}
        </div>
      </div>
    </Container>
  );
};

interface CardProps {
  exp: {
    company: string;
    position: string;
    currentlyWorkHere?: boolean;
    startDate: Date;
    endDate?: Date;
    summary: string[];
  };
  currentLabel: string;
  presentLabel: string;
}

const ExperienceCard = ({ exp, currentLabel, presentLabel }: CardProps) => (
  <TiltCard maxTilt={6} scale={1.01}>
    <div className="group relative bg-card-bg rounded-2xl p-4 md:p-6 shadow-md hover:shadow-xl border border-card-border hover:border-blue-200 dark:hover:border-blue-700 transition-shadow duration-300">
      {/* Gradient accent top bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${BRAND.lineGradient} via-purple-500 to-pink-500 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      {/* Current badge */}
      {exp.currentlyWorkHere && (
        <StatusBadge label={currentLabel} size="sm" className="text-xs mb-3" />
      )}

      {/* Position */}
      <Typography variant="h3" className="text-lg font-bold text-heading mb-1">
        {exp.position}
      </Typography>

      {/* Company */}
      <div className="flex items-center gap-2 mb-1">
        <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
        <Typography className={`${BRAND.labelText} font-semibold text-sm`}>
          {exp.company}
        </Typography>
      </div>

      {/* Dates */}
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-4 h-4 text-faint flex-shrink-0" />
        <Typography className="text-subtle text-sm">
          {formatDate(exp.startDate)} —{" "}
          {exp.currentlyWorkHere
            ? presentLabel
            : exp.endDate
              ? formatDate(exp.endDate)
              : ""}
        </Typography>
      </div>

      {/* Divider */}
      <div className="h-px bg-card-border mb-4" />

      {/* Summary with metric highlighting */}
      <ul className="flex flex-col gap-2">
        {exp.summary.map((point, i) => (
          <Reveal
            key={i}
            as="li"
            animation="fade-right"
            delay={i * 0.08}
            amount={0.05}
            className="flex items-start gap-2"
          >
            <span className={`mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gradient-to-br ${BRAND.progressGradient}`} />
            <Typography className="text-body text-sm leading-relaxed">
              <HighlightedBullet text={point} />
            </Typography>
          </Reveal>
        ))}
      </ul>
    </div>
  </TiltCard>
);

export default ExperienceSection;
