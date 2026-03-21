import Container from "@/components/layout/Container";
import WordReveal from "@/components/general/WordReveal";
import { usePortfolio } from "@/hooks/usePortfolio";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Monitor, Server, Database, Container as ContainerIcon, ExternalLink } from "lucide-react";
import { getDevicon } from "@/lib/devicons";
import type { TechDetails } from "@/lib/types";

const categoryConfig: Record<
  string,
  {
    icon: React.ElementType;
    gradient: string;
    border: string;
    bg: string;
    glow: string;
    label: string;
  }
> = {
  Frontend: {
    icon: Monitor,
    gradient: "from-blue-500 to-cyan-500",
    border: "border-blue-200 dark:border-blue-800/50",
    bg: "bg-blue-50/50 dark:bg-blue-950/20",
    glow: "group-hover:shadow-blue-500/10",
    label: "Interfaces modernas y responsivas",
  },
  Backend: {
    icon: Server,
    gradient: "from-purple-500 to-pink-500",
    border: "border-purple-200 dark:border-purple-800/50",
    bg: "bg-purple-50/50 dark:bg-purple-950/20",
    glow: "group-hover:shadow-purple-500/10",
    label: "APIs robustas y microservicios",
  },
  Databases: {
    icon: Database,
    gradient: "from-orange-500 to-red-500",
    border: "border-orange-200 dark:border-orange-800/50",
    bg: "bg-orange-50/50 dark:bg-orange-950/20",
    glow: "group-hover:shadow-orange-500/10",
    label: "Almacenamiento y persistencia",
  },
  DevOps: {
    icon: ContainerIcon,
    gradient: "from-emerald-500 to-teal-500",
    border: "border-emerald-200 dark:border-emerald-800/50",
    bg: "bg-emerald-50/50 dark:bg-emerald-950/20",
    glow: "group-hover:shadow-emerald-500/10",
    label: "Infraestructura y despliegue",
  },
};

const categories: Record<string, string[]> = {
  Frontend: ["JavaScript", "TypeScript", "React", "Tailwindcss", "Vite"],
  Backend: ["Java", "Spring Boot", "Quarkus", "Node.js", "Express.js"],
  Databases: ["MongoDB", "PostgreSQL", "SQL Server"],
  DevOps: ["Docker", "Linux", "Git"],
};

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
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      whileHover={{ y: -4 }}
    >
      <div className="relative p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm group-hover:shadow-md group-hover:border-gray-200 dark:group-hover:border-gray-600 transition-all duration-300">
        {Icon && <Icon size={40} />}
        {/* External link hint on hover */}
        <span className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <ExternalLink className="w-2.5 h-2.5 text-gray-400" />
        </span>
      </div>
      <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors duration-200 text-center leading-tight">
        {tech.label}
      </span>
    </motion.a>
  );
};

const SkillsSection = () => {
  const { technologies } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const getTechs = (category: string) => {
    const names = categories[category] || [];
    return technologies.filter((t) => names.includes(t.label));
  };

  const totalSkills = Object.values(categories).flat().length;

  return (
    <Container
      id="skills"
      className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-16 right-16 w-80 h-80 bg-blue-200/30 dark:bg-blue-900/15 rounded-full blur-3xl"
          animate={{ y: [0, 40, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-16 left-16 w-80 h-80 bg-purple-200/30 dark:bg-purple-900/15 rounded-full blur-3xl"
          animate={{ y: [0, -40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 w-full flex flex-col gap-12">

        {/* Header */}
        <motion.div
          className="flex flex-col items-center gap-4 text-center"
          initial={{ opacity: 0, y: -24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2">
            <div className="h-px w-8 bg-gradient-to-r from-blue-500 to-purple-500" />
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
              Stack técnico
            </span>
            <div className="h-px w-8 bg-gradient-to-r from-purple-500 to-blue-500" />
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">
            <WordReveal text="Mis" trigger="inView" delay={0} stagger={0.1} once={true} />
            {" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              <WordReveal text="Habilidades" trigger="inView" delay={0.1} stagger={0.1} once={true} />
            </span>
          </h2>

          <p className="max-w-xl text-gray-500 dark:text-gray-400 text-sm md:text-base leading-relaxed">
            Stack completo especializado en desarrollo bancario de alto
            rendimiento —{" "}
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              {totalSkills} tecnologías
            </span>{" "}
            dominadas.
          </p>
        </motion.div>

        {/* Category filter tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
              activeCategory === null
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            Todos · {totalSkills}
          </button>
          {Object.keys(categories).map((cat) => {
            const cfg = categoryConfig[cat];
            const Icon = cfg.icon;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeCategory === cat
                    ? `bg-gradient-to-r ${cfg.gradient} text-white shadow-lg`
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {cat} · {categories[cat].length}
              </button>
            );
          })}
        </motion.div>

        {/* Category cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.keys(categories).map((category, idx) => {
            const cfg = categoryConfig[category];
            const Icon = cfg.icon;
            const techs = getTechs(category);
            const isFiltered = activeCategory !== null && activeCategory !== category;

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
                          <h3 className="font-bold text-gray-900 dark:text-white text-base">
                            {category}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {cfg.label}
                          </p>
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
