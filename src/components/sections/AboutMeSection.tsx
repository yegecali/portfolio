import Container from "@/components/layout/Container";
import Typography from "@/components/general/Typography";
import WordReveal from "@/components/general/WordReveal";
import { usePortfolio } from "@/hooks/usePortfolio";
import { motion } from "framer-motion";
import { Languages, Sparkles, MapPin, Briefcase, Rocket } from "lucide-react";
import BackgroundBlobs from "@/components/general/BackgroundBlobs";
import { staggerContainerVariants, fadeUpVariants } from "@/lib/animations";

const highlightIcons = [Rocket, Briefcase, Sparkles];
const highlightColors = [
  "from-blue-500 to-cyan-500",
  "from-purple-500 to-pink-500",
  "from-emerald-500 to-teal-500",
];
const highlightBg = [
  "bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800/40",
  "bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-800/40",
  "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800/40",
];
const chipColors = [
  "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300",
  "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300",
  "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300",
];

const AboutMeSection = () => {
  const { about, hero, languages } = usePortfolio();

  return (
    <Container
      className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 overflow-hidden"
      id="about"
    >
      <BackgroundBlobs
        blobs={[
          { className: "absolute top-20 right-10 w-72 h-72 bg-blue-200/40 dark:bg-blue-900/20 rounded-full blur-3xl" },
          { className: "absolute bottom-20 left-10 w-64 h-64 bg-purple-200/40 dark:bg-purple-900/20 rounded-full blur-3xl" },
        ]}
      />

      <div className="relative flex w-full flex-col justify-between gap-10 md:gap-16 md:flex-row md:items-center">

        {/* ── LEFT: Content ── */}
        <motion.div
          className="flex flex-col gap-8 md:max-w-lg"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Label */}
          <motion.div variants={fadeUpVariants} className="flex items-center gap-2">
            <div className="h-px w-8 bg-gradient-to-r from-blue-500 to-purple-500" />
            <Typography className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
              Sobre mí
            </Typography>
          </motion.div>

          {/* Title */}
          <motion.div variants={fadeUpVariants}>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-gray-900 dark:text-white">
              <WordReveal text="¿Quieres saber más? Aquí está" trigger="inView" delay={0} stagger={0.1} once={true} />
              {" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                <WordReveal text="👨‍💻" trigger="inView" delay={0.5} stagger={0.1} once={true} />
              </span>
            </h2>
          </motion.div>

          {/* Paragraphs */}
          <motion.div variants={fadeUpVariants} className="flex flex-col gap-4">
            {about.paragraphs.map((paragraph, index) => (
              <Typography
                key={index}
                className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base"
              >
                {paragraph}
              </Typography>
            ))}
          </motion.div>

          {/* Highlights as chip groups */}
          <motion.div variants={fadeUpVariants} className="flex flex-col gap-3">
            {about.highlights.map((highlight, idx) => {
              const Icon = highlightIcons[idx % highlightIcons.length];
              return (
                <div
                  key={idx}
                  className={`flex flex-col gap-2 rounded-xl border p-4 ${highlightBg[idx % highlightBg.length]}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`p-1.5 rounded-lg bg-gradient-to-br ${highlightColors[idx % highlightColors.length]}`}>
                      <Icon className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {highlight.items.map((item, itemIdx) => (
                      <span
                        key={itemIdx}
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${chipColors[idx % chipColors.length]}`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Languages */}
          {languages?.length > 0 && (
            <motion.div variants={fadeUpVariants} className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Languages className="w-4 h-4 text-blue-500" />
                <Typography className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                  Idiomas
                </Typography>
              </div>
              <div className="flex flex-wrap gap-3">
                {languages.map((lang, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex flex-col gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-3 shadow-sm min-w-[120px]"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{lang.flag}</span>
                      <div className="flex flex-col">
                        <Typography className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">
                          {lang.name}
                        </Typography>
                        <Typography className="text-xs text-blue-600 dark:text-blue-400">
                          {lang.level}
                        </Typography>
                      </div>
                    </div>
                    <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.proficiency}%` }}
                        transition={{ duration: 0.9, delay: idx * 0.15 + 0.3, ease: "easeOut" }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Closing CTA */}
          <motion.div
            variants={fadeUpVariants}
            className="flex items-start gap-3 rounded-xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-500/10 dark:to-purple-500/10 border border-blue-200/60 dark:border-blue-700/30 p-4"
          >
            <span className="text-2xl">🚀</span>
            <Typography className="text-gray-700 dark:text-gray-200 font-medium text-sm leading-relaxed">
              {about.closing}
            </Typography>
          </motion.div>
        </motion.div>

        {/* ── RIGHT: Image with floating cards ── */}
        <motion.div
          className="flex justify-center md:flex-shrink-0"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="relative w-full max-w-[300px] h-[420px] md:w-96 md:h-[680px]">

            {/* Glow behind image */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-purple-400/30 dark:from-blue-600/20 dark:to-purple-600/20 rounded-3xl blur-2xl"
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Image */}
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={hero.image}
                alt="Yemi Genderson"
                className="w-full h-full object-cover"
              />
              {/* Bottom gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />

              {/* Name tag at bottom */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/20">
                  <Typography className="text-white font-bold text-base leading-tight">
                    Yemi Genderson
                  </Typography>
                  <Typography className="text-blue-200 text-xs font-medium">
                    Full Stack Developer
                  </Typography>
                </div>
              </div>
            </div>

            {/* Floating card — Location */}
            <motion.div
              className="absolute -left-2 md:-left-10 top-16 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 px-3 py-2 flex items-center gap-2"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <Typography className="text-xs font-bold text-gray-900 dark:text-white leading-none">
                  Lima, Perú
                </Typography>
                <Typography className="text-[10px] text-gray-500 dark:text-gray-400">
                  Disponible remote
                </Typography>
              </div>
            </motion.div>

            {/* Floating card — Experiencia */}
            <motion.div
              className="absolute -right-2 md:-right-10 top-32 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 px-3 py-2 flex items-center gap-2"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            >
              <div className="p-1.5 rounded-lg bg-purple-100 dark:bg-purple-900/40">
                <Briefcase className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <Typography className="text-xs font-bold text-gray-900 dark:text-white leading-none">
                  5+ años
                </Typography>
                <Typography className="text-[10px] text-gray-500 dark:text-gray-400">
                  de experiencia
                </Typography>
              </div>
            </motion.div>

            {/* Floating card — Open to work */}
            <motion.div
              className="absolute -left-2 md:-left-8 bottom-24 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-emerald-200 dark:border-emerald-700/50 px-3 py-2 flex items-center gap-2"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <Typography className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                Open to work
              </Typography>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Container>
  );
};

export default AboutMeSection;
