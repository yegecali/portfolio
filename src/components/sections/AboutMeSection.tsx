import Container from "@/components/layout/Container";
import Typography from "@/components/general/Typography";
import { usePortfolio } from "@/hooks/usePortfolio";
import { motion } from "framer-motion";

const AboutMeSection = () => {
  const { about, hero } = usePortfolio();

  return (
    <Container
      className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"
      id="about"
    >
      <div className="flex w-full flex-col justify-between gap-12 md:flex-row md:items-center">
        {/* Content */}
        <motion.div
          className="flex max-w-xl flex-col gap-6"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Typography variant="h3" className="text-gray-900 dark:text-white">
            {about.title}
          </Typography>

          {about.paragraphs.map((paragraph, index) => (
            <Typography
              key={index}
              className="text-gray-700 dark:text-gray-200 leading-relaxed"
            >
              {paragraph}
            </Typography>
          ))}

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              {about.highlights.map((highlight, idx) => (
                <ul
                  key={idx}
                  className="flex list-inside list-disc flex-col gap-2"
                >
                  {highlight.items.map((item, itemIdx) => (
                    <Typography
                      key={itemIdx}
                      component="li"
                      className="text-gray-700 dark:text-gray-200"
                    >
                      {item}
                    </Typography>
                  ))}
                </ul>
              ))}
            </div>
            <Typography className="text-gray-700 dark:text-gray-200 font-medium">
              {about.closing}
            </Typography>
          </div>
        </motion.div>

        {/* Profile Image */}
        <motion.div
          className="flex justify-center md:flex-shrink-0"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="relative w-96 h-[700px]">
            {/* Decorative background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 dark:from-blue-600/30 dark:to-purple-600/30 rounded-3xl blur-xl"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Border */}
            <motion.div
              className="absolute inset-0 rounded-3xl border-2 border-blue-500/30 dark:border-blue-400/40"
              animate={{
                borderColor: [
                  "rgba(59, 130, 246, 0.3)",
                  "rgba(168, 85, 247, 0.3)",
                  "rgba(59, 130, 246, 0.3)",
                ],
              }}
              transition={{ duration: 6, repeat: Infinity }}
            />

            {/* Image Container */}
            <div className="relative w-full h-full rounded-3xl overflow-hidden">
              <img
                src={hero.image}
                alt="Yemi Genderson"
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent dark:from-black/40" />
            </div>

            {/* Bottom accent */}
            <motion.div
              className="absolute -bottom-8 -right-8 w-48 h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-3xl opacity-30 dark:opacity-40"
              animate={{
                y: [0, -20, 0],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    </Container>
  );
};

export default AboutMeSection;
