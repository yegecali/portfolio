import Container from "@/components/layout/Container";
import WordReveal from "@/components/general/WordReveal";
import { usePortfolio } from "@/hooks/usePortfolio";
import { useI18n } from "@/hooks/useI18n";
import { motion, AnimatePresence } from "framer-motion";
import BackgroundBlobs from "@/components/general/BackgroundBlobs";
import { sectionHeaderProps } from "@/lib/animations";
import Reveal from "@/components/general/Reveal";
import { useState } from "react";
import { Monitor, Server, Database, Container as ContainerIcon, ExternalLink } from "lucide-react";
import { getDevicon } from "@/lib/devicons";
import type { TechDetails } from "@/lib/types";
import { BRAND, SKILL_ACCENTS } from "@/lib/theme";

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  Frontend:  Monitor,
  Backend:   Server,
  Databases: Database,
  DevOps:    ContainerIcon,
};

const CATEGORY_ORDER = ["Frontend", "Backend", "Databases", "DevOps"];

interface SkillCardProps {
  tech: TechDetails;
  index: number;
}

const SkillCard = ({ tech, index }: SkillCardProps) => {
  const Icon = getDevicon(tech.iconName);
  return (
    <motion.a
      href={tech.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col items-center gap-2 cursor-pointer"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      whileHover={{ y: -4 }}
    >
      <div className="relative p-4 rounded-2xl bg-card-bg border border-card-border shadow-sm group-hover:shadow-md group-hover:border-gray-200 dark:group-hover:border-gray-600 transition-all duration-300">
        {Icon && <Icon size={40} />}
        <span className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <ExternalLink className="w-2.5 h-2.5 text-gray-400" />
        </span>
      </div>
      <span className="text-xs font-semibold text-subtle group-hover:text-heading transition-colors duration-200 text-center leading-tight">
        {tech.label}
      </span>
    </motion.a>
  );
};

const SkillsSection = () => {
  const { technologies } = usePortfolio();
  const { t } = useI18n();
  const ui = t.ui.skills;
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Derive categories dynamically from tech.category; respect preferred order
  const allCategories = [...new Set(technologies.map((t) => t.category ?? "Other"))];
  const orderedCategories = [
    ...CATEGORY_ORDER.filter((c) => allCategories.includes(c)),
    ...allCategories.filter((c) => !CATEGORY_ORDER.includes(c)),
  ];

  const getTechs = (category: string) =>
    technologies.filter((t) => (t.category ?? "Other") === category);

  const totalSkills = technologies.length;

  return (
    <Container
      id="skills"
      className="min-h-screen flex items-center justify-center bg-section-alt overflow-hidden"
    >
      <BackgroundBlobs
        blobs={[
          {
            className: "absolute top-16 right-16 w-80 h-80 bg-blue-200/30 dark:bg-blue-900/15 rounded-full blur-3xl",
            animate: { y: [0, 40, 0] },
            transition: { duration: 10, repeat: Infinity, ease: "easeInOut" },
          },
          {
            className: "absolute bottom-16 left-16 w-80 h-80 bg-purple-200/30 dark:bg-purple-900/15 rounded-full blur-3xl",
            animate: { y: [0, -40, 0] },
            transition: { duration: 12, repeat: Infinity, ease: "easeInOut" },
          },
        ]}
      />

      <div className="relative z-10 w-full flex flex-col gap-12">

        {/* Header */}
        <motion.div
          className="flex flex-col items-center gap-4 text-center"
          {...sectionHeaderProps}
        >
          <div className="flex items-center gap-2">
            <div className={`h-px w-8 bg-gradient-to-r ${BRAND.lineGradient}`} />
            <span className={`text-xs font-semibold ${BRAND.labelText} uppercase tracking-widest`}>
              {ui.sectionLabel}
            </span>
            <div className={`h-px w-8 bg-gradient-to-r ${BRAND.lineGradient}`} />
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-heading">
            <WordReveal text={ui.title1} trigger="inView" delay={0} stagger={0.1} once={true} />
            {" "}
            <span className={`bg-gradient-to-r ${BRAND.gradient} bg-clip-text text-transparent`}>
              <WordReveal text={ui.title2} trigger="inView" delay={0.1} stagger={0.1} once={true} />
            </span>
          </h2>

          <p className="max-w-xl text-subtle text-sm md:text-base leading-relaxed">
            {ui.subtitle} —{" "}
            <span className="font-semibold text-body">
              {totalSkills} {t.lang === "es" ? "tecnologías" : "technologies"}
            </span>{" "}
            {t.lang === "es" ? "dominadas." : "mastered."}
          </p>
        </motion.div>

        {/* Category filter tabs */}
        <Reveal animation="fade-up" delay={0.2} className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
              activeCategory === null
                ? `bg-gradient-to-r ${BRAND.ctaGradient} text-white shadow-lg shadow-blue-500/20`
                : "bg-gray-100 dark:bg-gray-800 text-subtle hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {ui.allFilter} · {totalSkills}
          </button>
          {orderedCategories.map((cat) => {
            const accent = SKILL_ACCENTS[cat] ?? SKILL_ACCENTS["Frontend"];
            const Icon = CATEGORY_ICONS[cat] ?? Monitor;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeCategory === cat
                    ? `bg-gradient-to-r ${accent.gradient} text-white shadow-lg`
                    : "bg-gray-100 dark:bg-gray-800 text-subtle hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {cat} · {getTechs(cat).length}
              </button>
            );
          })}
        </Reveal>

        {/* Category cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {orderedCategories.map((category, idx) => {
            const cfg = SKILL_ACCENTS[category] ?? SKILL_ACCENTS["Frontend"];
            const Icon = CATEGORY_ICONS[category] ?? Monitor;
            const techs = getTechs(category);
            const isFiltered = activeCategory !== null && activeCategory !== category;
            const catLabel = ui.categoryLabels[category] ?? category;

            return (
              <AnimatePresence key={category}>
                {!isFiltered && (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.45, delay: idx * 0.1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    className={`group relative flex flex-col gap-4 md:gap-6 rounded-2xl border p-4 md:p-6 shadow-sm hover:shadow-xl transition-all duration-300 ${cfg.border} ${cfg.bg} ${cfg.glow}`}
                  >
                    {/* Card header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl bg-gradient-to-br ${cfg.gradient} shadow-md`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-heading text-base">{category}</h3>
                          <p className="text-xs text-subtle">{catLabel}</p>
                        </div>
                      </div>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full bg-gradient-to-r ${cfg.gradient} text-white`}>
                        {techs.length}
                      </span>
                    </div>

                    {/* Divider */}
                    <div className={`h-px bg-gradient-to-r ${cfg.gradient} opacity-20`} />

                    {/* Skills grid */}
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      {techs.map((tech, i) => (
                        <SkillCard key={tech.label} tech={tech} index={i} />
                      ))}
                    </div>

                    {/* Decorative corner glow */}
                    <div className={`absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br ${cfg.gradient} rounded-full blur-2xl opacity-10 pointer-events-none`} />
                  </motion.div>
                )}
              </AnimatePresence>
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default SkillsSection;
