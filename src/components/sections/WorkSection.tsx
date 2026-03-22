import Container from "@/components/layout/Container";
import WordReveal from "@/components/general/WordReveal";
import TiltCard from "@/components/general/TiltCard";
import { usePortfolio } from "@/hooks/usePortfolio";
import { motion } from "framer-motion";
import BackgroundBlobs from "@/components/general/BackgroundBlobs";
import { sectionHeaderProps } from "@/lib/animations";
import Reveal from "@/components/general/Reveal";
import {
  Gauge,
  ShieldCheck,
  Activity,
  Database,
  Github,
  ArrowUpRight,
} from "lucide-react";

// One icon per project (backend-themed, no images needed)
const PROJECT_ICONS = [Gauge, ShieldCheck, Activity, Database];

const PROJECT_ACCENTS = [
  {
    gradient: "from-blue-500 to-cyan-500",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200/60 dark:border-blue-800/40",
    chip: "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/50",
    glow: "from-blue-500/10",
    num: "text-blue-100 dark:text-blue-900/60",
  },
  {
    gradient: "from-purple-500 to-pink-500",
    bg: "bg-purple-50 dark:bg-purple-950/30",
    border: "border-purple-200/60 dark:border-purple-800/40",
    chip: "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800/50",
    glow: "from-purple-500/10",
    num: "text-purple-100 dark:text-purple-900/60",
  },
  {
    gradient: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-200/60 dark:border-emerald-800/40",
    chip: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/50",
    glow: "from-emerald-500/10",
    num: "text-emerald-100 dark:text-emerald-900/60",
  },
  {
    gradient: "from-orange-500 to-red-500",
    bg: "bg-orange-50 dark:bg-orange-950/30",
    border: "border-orange-200/60 dark:border-orange-800/40",
    chip: "bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800/50",
    glow: "from-orange-500/10",
    num: "text-orange-100 dark:text-orange-900/60",
  },
];

// Extract a key metric from the description to highlight
const extractMetric = (description: string): string | null => {
  const patterns = [
    /(\d+[MK%]?\s*(?:millones?|registros?|records?|%|ms|x)[\w\s]*)/i,
    /(\d+%\s*(?:de mejora|mejor|más rápido|reducción|improvement|perf\w*))/i,
    /mejora[\w\s]*en\s+(\d+%)/i,
    /(35%[^.]*)/i,
    /(20\s*millones?[^.]*)/i,
  ];
  for (const p of patterns) {
    const m = description.match(p);
    if (m) return m[1] || m[0];
  }
  return null;
};

const WorkSection = () => {
  const { projects } = usePortfolio();

  return (
    <Container
      id="work"
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 overflow-hidden"
    >
      <BackgroundBlobs
        blobs={[
          {
            className: "absolute top-0 right-0 w-48 h-48 md:w-96 md:h-96 bg-blue-200/25 dark:bg-blue-900/10 rounded-full blur-3xl",
            animate: { x: [0, 30, 0], y: [0, -20, 0] },
            transition: { duration: 14, repeat: Infinity, ease: "easeInOut" },
          },
          {
            className: "absolute bottom-0 left-0 w-48 h-48 md:w-96 md:h-96 bg-purple-200/25 dark:bg-purple-900/10 rounded-full blur-3xl",
            animate: { x: [0, -20, 0], y: [0, 20, 0] },
            transition: { duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 },
          },
        ]}
      />

      <div className="relative z-10 w-full flex flex-col gap-14">

        {/* Header */}
        <motion.div
          className="flex flex-col items-center gap-4 text-center"
          {...sectionHeaderProps}
        >
          <div className="flex items-center gap-2">
            <div className="h-px w-8 bg-gradient-to-r from-blue-500 to-purple-500" />
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
              Proyectos destacados
            </span>
            <div className="h-px w-8 bg-gradient-to-r from-purple-500 to-blue-500" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            <WordReveal text="Sistemas de" trigger="inView" delay={0} stagger={0.1} once={true} />
            {" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              <WordReveal text="Alto Rendimiento" trigger="inView" delay={0.2} stagger={0.1} once={true} />
            </span>
          </h2>

          <p className="max-w-2xl text-gray-500 dark:text-gray-400 text-sm md:text-base leading-relaxed">
            Arquitecturas distribuidas, resiliencia extrema y observabilidad en
            tiempo real — proyectos con impacto real en producción bancaria.
          </p>
        </motion.div>

        {/* Projects 2x2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects?.map((project, index) => {
            const accent = PROJECT_ACCENTS[index % PROJECT_ACCENTS.length];
            const Icon = PROJECT_ICONS[index % PROJECT_ICONS.length];
            const metric = extractMetric(project.description);
            const num = String(index + 1).padStart(2, "0");

            return (
              <Reveal
                key={index}
                animation={index % 2 === 0 ? "fade-right" : "fade-left"}
                delay={index * 0.1}
              >
              <TiltCard maxTilt={8} scale={1.01} className="h-full">
                <div
                  className={`group relative flex flex-col gap-4 rounded-2xl border p-4 md:p-6 shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden ${accent.bg} ${accent.border}`}
                >
                {/* Big number watermark */}
                <span className={`absolute -top-4 -right-2 text-6xl md:text-8xl font-black pointer-events-none select-none leading-none ${accent.num}`}>
                  {num}
                </span>

                {/* Bottom glow on hover */}
                <div className={`absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t ${accent.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                {/* Header row */}
                <div className="flex items-start gap-4 relative z-10">
                  <div className={`flex-shrink-0 p-3 rounded-xl bg-gradient-to-br ${accent.gradient} shadow-md`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex flex-col gap-1 min-w-0">
                    <h3 className={`font-bold text-lg leading-tight bg-gradient-to-r ${accent.gradient} bg-clip-text text-transparent`}>
                      {project.name}
                    </h3>
                    {metric && (
                      <span className={`inline-flex w-fit text-[11px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r ${accent.gradient} text-white`}>
                        ⚡ {metric.trim()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Divider */}
                <div className={`h-px bg-gradient-to-r ${accent.gradient} opacity-20`} />

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed relative z-10 line-clamp-4">
                  {project.description}
                </p>

                {/* Tech chips */}
                <div className="flex flex-wrap gap-1.5 relative z-10">
                  {project.technologies?.map((tech, i) => (
                    <span
                      key={i}
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${accent.chip}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Footer link */}
                <div className="relative z-10 pt-1">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${accent.gradient} bg-clip-text text-transparent hover:opacity-80 transition-opacity`}
                  >
                    <Github className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    Ver en GitHub
                    <ArrowUpRight className="w-3.5 h-3.5 text-gray-400" />
                  </a>
                </div>
                </div>
              </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default WorkSection;
