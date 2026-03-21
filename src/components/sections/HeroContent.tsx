import { MapPin, Download, Code2, Briefcase, Clock } from "lucide-react";
import SocialIcons from "@/components/data-display/SocialIcons";
import Typography from "@/components/general/Typography";
import WordReveal from "@/components/general/WordReveal";
import AnimatedCounter from "@/components/general/AnimatedCounter";
import MagneticButton from "@/components/general/MagneticButton";
import { motion } from "framer-motion";
import { usePortfolio } from "@/hooks/usePortfolio";

interface HeroContentProps {
  badge: string;
  title: string;
  description: string;
  location: string;
  status: string;
}

const stats = [
  { icon: Clock,    label: "Años de exp.", value: "5+"  },
  { icon: Code2,    label: "Tecnologías",  value: "16+" },
  { icon: Briefcase,label: "Proyectos",    value: "10+" },
];

// ── Shared variants ────────────────────────────────────────────────────────────
const container = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.15,   // wait for page paint
      staggerChildren: 0.14, // each block 140ms after previous
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 32,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Faster variant for small sub-elements (stat cards)
const subItem = {
  hidden: { opacity: 0, y: 16, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

// ── Component ──────────────────────────────────────────────────────────────────
const HeroContent = ({ badge, title, description, location, status }: HeroContentProps) => {
  const { cvUrl } = usePortfolio();

  // Split: "Hola, soy Yemi Genderson 👋" → ["Hola, soy ", "Yemi Genderson", " 👋"]
  const titleParts = title.split(/(Yemi Genderson)/);

  return (
    <motion.div
      className="flex max-w-2xl flex-grow flex-col justify-center gap-6 md:items-start"
      variants={container}
      initial="hidden"
      animate="visible"
    >

      {/* 1 — Badge */}
      <motion.div
        variants={item}
        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-bold w-fit border border-blue-200/80 dark:border-blue-700/40 shadow-sm"
      >
        {badge}
      </motion.div>

      {/* 2 — Title block */}
      <motion.div variants={item} className="flex flex-col gap-3">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-[1.1] text-gray-900 dark:text-white">
          {/* "Hola, soy" — words stagger within the title block stagger */}
          <WordReveal
            text={titleParts[0].trim()}
            trigger="mount"
            delay={0.28}     // starts after the title block fades in
            stagger={0.09}
            duration={0.5}
            className="text-gray-900 dark:text-white"
          />
          {/* "Yemi Genderson" — gradient, slightly after */}
          {titleParts[1] && (
            <>
              {" "}
              <WordReveal
                text={titleParts[1]}
                trigger="mount"
                delay={0.55}
                stagger={0.11}
                duration={0.55}
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent"
              />
            </>
          )}
          {/* "👋" — spring bounce at the very end */}
          {titleParts[2] && (
            <motion.span
              initial={{ opacity: 0, scale: 0.3, rotate: -30 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.9, duration: 0.5, type: "spring", bounce: 0.6 }}
              className="inline-block ml-2 origin-bottom-right"
            >
              {titleParts[2].trim()}
            </motion.span>
          )}
        </h1>

        {/* Description fades with the title block */}
        <Typography className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          {description}
        </Typography>
      </motion.div>

      {/* 3 — Location + Status pills */}
      <motion.div variants={item} className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
          <MapPin className="w-4 h-4 text-blue-500" />
          <Typography className="text-sm text-gray-700 dark:text-gray-300">
            {location}
          </Typography>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-gray-800 border border-emerald-200 dark:border-emerald-700/50 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <Typography className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
            {status}
          </Typography>
        </div>
      </motion.div>

      {/* 4 — Stats (sub-stagger within parent stagger) */}
      <motion.div variants={item} className="flex gap-3">
        <motion.div
          className="flex flex-wrap gap-3"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {stats.map(({ icon: Icon, label, value }) => (
            <motion.div
              key={label}
              variants={subItem}
              className="flex flex-col items-center gap-0.5 px-3 py-2 md:px-4 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 backdrop-blur-sm shadow-sm"
            >
              <div className="flex items-center gap-1.5">
                <Icon className="w-3.5 h-3.5 text-blue-500" />
                <AnimatedCounter
                  value={value}
                  className="text-lg font-bold text-gray-900 dark:text-white"
                />
              </div>
              <Typography className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                {label}
              </Typography>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* 5 — CTA buttons */}
      <motion.div variants={item} className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-3">
          <MagneticButton
            as="a"
            href="#contact"
            strength={20}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
          >
            Contáctame
          </MagneticButton>
          <MagneticButton
            as="a"
            href="#work"
            strength={20}
            className="px-6 py-3 rounded-xl border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
          >
            Ver mi trabajo
          </MagneticButton>
          <MagneticButton
            as="a"
            href={cvUrl}
            download
            strength={20}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold hover:bg-gray-700 dark:hover:bg-gray-100 transition-all duration-300 hover:shadow-lg"
          >
            <Download className="w-4 h-4" />
            Descargar CV
          </MagneticButton>
        </div>

        {/* 6 — Social icons (last, softest entrance) */}
        <SocialIcons />
      </motion.div>

    </motion.div>
  );
};

export default HeroContent;
