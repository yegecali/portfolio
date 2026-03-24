import { MapPin, Download, Code2, Briefcase, Clock } from "lucide-react";
import SocialIcons from "@/components/data-display/SocialIcons";
import Typography from "@/components/general/Typography";
import WordReveal from "@/components/general/WordReveal";
import AnimatedCounter from "@/components/general/AnimatedCounter";
import MagneticButton from "@/components/general/MagneticButton";
import { motion } from "framer-motion";
import { usePortfolio } from "@/hooks/usePortfolio";
import { useI18n } from "@/hooks/useI18n";
import {
  heroContainerVariants,
  heroItemVariants,
  heroSubItemVariants,
} from "@/lib/animations";
import StatusBadge from "@/components/general/StatusBadge";
import { BRAND } from "@/lib/theme";

interface HeroContentProps {
  badge: string;
  title: string;
  description: string;
  location: string;
  status: string;
}

const HeroContent = ({
  badge,
  title,
  description,
  location,
  status,
}: HeroContentProps) => {
  const { cvUrl } = usePortfolio();
  const { t } = useI18n();
  const ui = t.ui.hero;

  const stats = [
    { icon: Clock,    label: ui.statYears,    value: "5+"  },
    { icon: Code2,    label: ui.statTech,     value: "16+" },
    { icon: Briefcase,label: ui.statProjects, value: "10+" },
  ];

  // Split: "Hi, I'm Yemi Genderson 👋" → ["Hi, I'm ", "Yemi Genderson", " 👋"]
  const titleParts = title.split(/(Yemi Genderson)/);

  return (
    <motion.div
      className="flex max-w-2xl flex-grow flex-col justify-center gap-6 md:items-start"
      variants={heroContainerVariants}
      initial="hidden"
      animate="visible"
    >

      {/* 1 — Badge */}
      <motion.div
        variants={heroItemVariants}
        className={`inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/30 ${BRAND.labelText} px-4 py-2 rounded-full text-sm font-bold w-fit border border-blue-200/80 dark:border-blue-700/40 shadow-sm`}
      >
        {badge}
      </motion.div>

      {/* 2 — Title block */}
      <motion.div variants={heroItemVariants} className="flex flex-col gap-3">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-[1.1] text-heading">
          <WordReveal
            text={titleParts[0].trim()}
            trigger="mount"
            delay={0.28}
            stagger={0.09}
            duration={0.5}
            className="text-heading"
          />
          {titleParts[1] && (
            <>
              {" "}
              <WordReveal
                text={titleParts[1]}
                trigger="mount"
                delay={0.55}
                stagger={0.11}
                duration={0.55}
                className={`bg-gradient-to-r ${BRAND.gradient} bg-clip-text text-transparent`}
              />
            </>
          )}
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

        <Typography className="text-base md:text-lg text-body leading-relaxed">
          {description}
        </Typography>
      </motion.div>

      {/* 3 — Location + Status pills */}
      <motion.div variants={heroItemVariants} className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card-bg border border-card-border shadow-sm">
          <MapPin className="w-4 h-4 text-blue-500" />
          <Typography className="text-sm text-body">
            {location}
          </Typography>
        </div>

        <StatusBadge label={status} size="sm" className="text-sm bg-card-bg shadow-sm" />
      </motion.div>

      {/* 4 — Stats */}
      <motion.div variants={heroItemVariants} className="flex gap-3">
        <motion.div
          className="flex flex-wrap gap-3"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {stats.map(({ icon: Icon, label, value }) => (
            <motion.div
              key={label}
              variants={heroSubItemVariants}
              className="flex flex-col items-center gap-0.5 px-3 py-2 md:px-4 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-card-border backdrop-blur-sm shadow-sm"
            >
              <div className="flex items-center gap-1.5">
                <Icon className="w-3.5 h-3.5 text-blue-500" />
                <AnimatedCounter
                  value={value}
                  className="text-lg font-bold text-heading"
                />
              </div>
              <Typography className="text-xs text-subtle whitespace-nowrap">
                {label}
              </Typography>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* 5 — CTA buttons */}
      <motion.div variants={heroItemVariants} className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-3">
          <MagneticButton
            as="a"
            href="#contact"
            strength={20}
            className={`px-6 py-3 rounded-xl bg-gradient-to-r ${BRAND.ctaGradient} ${BRAND.ctaGradientHover} text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25`}
          >
            {ui.contactBtn}
          </MagneticButton>
          <MagneticButton
            as="a"
            href="#work"
            strength={20}
            className="px-6 py-3 rounded-xl border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
          >
            {ui.viewWorkBtn}
          </MagneticButton>
          <MagneticButton
            as="a"
            href={cvUrl}
            download
            strength={20}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold hover:bg-gray-700 dark:hover:bg-gray-100 transition-all duration-300 hover:shadow-lg"
          >
            <Download className="w-4 h-4" />
            {ui.downloadCV}
          </MagneticButton>
        </div>

        <SocialIcons />
      </motion.div>

    </motion.div>
  );
};

export default HeroContent;
