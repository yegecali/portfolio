import Container from "@/components/layout/Container";
import Typography from "@/components/general/Typography";
import WordReveal from "@/components/general/WordReveal";
import TiltCard from "@/components/general/TiltCard";
import { usePortfolio } from "@/hooks/usePortfolio";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";

const formatDate = (date: Date) =>
  date.toLocaleDateString("es-PE", { month: "short", year: "numeric" });

const ExperienceSection = () => {
  const { experiences } = usePortfolio();

  return (
    <Container
      id="experience"
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 overflow-hidden"
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
          <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <Typography
            variant="h1"
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white"
          >
            <WordReveal text="Experiencia Laboral" trigger="inView" delay={0} stagger={0.1} once={true} />
          </Typography>
        </div>
        <div className="h-1 w-24 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full" />
        <Typography className="max-w-2xl text-center text-gray-600 dark:text-gray-300 text-lg">
          Mi trayectoria profesional en el sector bancario peruano, construyendo
          sistemas de alto rendimiento y arquitecturas distribuidas.
        </Typography>
      </motion.div>

      {/* Timeline */}
      <div className="relative w-full max-w-4xl">
        {/* Vertical line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 -translate-x-1/2 hidden md:block" />
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 md:hidden" />

        <div className="flex flex-col gap-8 md:gap-12">
          {experiences.map((exp, index) => {
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
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg ring-4 ring-white dark:ring-gray-900">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Desktop: left half space */}
                <div className="hidden md:flex md:w-1/2 md:justify-end md:pr-10">
                  {isLeft && (
                    <div className="w-full max-w-sm">
                      <ExperienceCard exp={exp} isLeft />
                    </div>
                  )}
                </div>

                {/* Desktop center dot */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 items-center justify-center shadow-lg ring-4 ring-white dark:ring-gray-900">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>

                {/* Desktop: right half space */}
                <div className="hidden md:flex md:w-1/2 md:pl-10">
                  {!isLeft && (
                    <div className="w-full max-w-sm">
                      <ExperienceCard exp={exp} isLeft={false} />
                    </div>
                  )}
                </div>

                {/* Mobile card */}
                <div className="md:hidden flex-1">
                  <ExperienceCard exp={exp} isLeft />
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
  isLeft: boolean;
}

const ExperienceCard = ({ exp }: CardProps) => (
  <TiltCard maxTilt={6} scale={1.01}>
  <div className="group relative bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-6 shadow-md hover:shadow-xl border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700 transition-shadow duration-300">
    {/* Gradient accent top bar */}
    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

    {/* Current badge */}
    {exp.currentlyWorkHere && (
      <div className="inline-flex items-center gap-1.5 mb-3 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700/50">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <Typography className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
          Actualmente aquí
        </Typography>
      </div>
    )}

    {/* Company & Position */}
    <Typography
      variant="h3"
      className="text-lg font-bold text-gray-900 dark:text-white mb-1"
    >
      {exp.position}
    </Typography>
    <div className="flex items-center gap-2 mb-1">
      <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
      <Typography className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
        {exp.company}
      </Typography>
    </div>

    {/* Dates */}
    <div className="flex items-center gap-2 mb-4">
      <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
      <Typography className="text-gray-500 dark:text-gray-400 text-sm">
        {formatDate(exp.startDate)} —{" "}
        {exp.currentlyWorkHere ? "Presente" : exp.endDate ? formatDate(exp.endDate) : ""}
      </Typography>
    </div>

    {/* Divider */}
    <div className="h-px bg-gray-100 dark:bg-gray-700 mb-4" />

    {/* Summary */}
    <ul className="flex flex-col gap-2">
      {exp.summary.map((point, i) => (
        <li key={i} className="flex items-start gap-2">
          <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
          <Typography className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            {point}
          </Typography>
        </li>
      ))}
    </ul>
  </div>
  </TiltCard>
);

export default ExperienceSection;
