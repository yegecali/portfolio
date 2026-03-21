import Typography from "@/components/general/Typography";
import Container from "@/components/layout/Container";
import TechDetails from "@/components/data-display/TechDetails";
import { usePortfolio } from "@/hooks/usePortfolio";
import { motion } from "framer-motion";
import { useState } from "react";

const SkillsSection = () => {
  const { technologies } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Categorize technologies
  const categories = {
    Frontend: ["JavaScript", "TypeScript", "React", "Tailwindcss", "Vite"],
    Backend: ["Java", "Spring Boot", "Quarkus", "Node.js", "Express.js"],
    Databases: ["MongoDB", "PostgreSQL", "SQL Server"],
    DevOps: ["Docker", "Linux", "Git"],
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Frontend: "from-blue-500 to-cyan-500",
      Backend: "from-purple-500 to-pink-500",
      Databases: "from-orange-500 to-red-500",
      DevOps: "from-green-500 to-emerald-500",
    };
    return colors[category] || "from-blue-500 to-purple-500";
  };

  const getTechsByCategory = (category: string) => {
    const techNames = categories[category as keyof typeof categories] || [];
    return technologies.filter((tech) => techNames.includes(tech.label));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Container
      id="skills"
      className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 bg-blue-200 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"
          animate={{ y: [0, 50, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 bg-purple-200 dark:bg-purple-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"
          animate={{ y: [0, -50, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="w-full flex flex-col gap-4 relative z-10">
        {/* Header */}
        <motion.div
          className="flex flex-col items-center gap-2 text-center"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div>
            <Typography
              variant="h2"
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent"
            >
              Mis Habilidades Técnicas
            </Typography>
          </div>
          <Typography className="max-w-2xl text-gray-700 dark:text-gray-300 text-xs md:text-sm leading-relaxed">
            Stack completo especializado en desarrollo bancario.
          </Typography>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-1.5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
              selectedCategory === null
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Todos
          </motion.button>
          {Object.keys(categories).map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? `bg-gradient-to-r ${getCategoryColor(category)} text-white shadow-lg`
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills by Category */}
        <div className="flex flex-col gap-4">
          {selectedCategory === null
            ? Object.keys(categories).map((category, idx) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="flex flex-col gap-2"
                >
                  <div className="flex items-center gap-1 mb-1">
                    <div
                      className={`h-0.5 w-6 bg-gradient-to-r ${getCategoryColor(category)} rounded`}
                    />
                    <Typography
                      variant="h3"
                      className="text-sm md:text-base font-bold text-gray-900 dark:text-white"
                    >
                      {category}
                    </Typography>
                  </div>
                  <motion.div
                    className="grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-5"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    {getTechsByCategory(category).map((technology, index) => (
                      <motion.div
                        key={index}
                        variants={categoryVariants}
                        whileHover={{ y: -3 }}
                      >
                        <TechDetails {...technology} />
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              ))
            : // Selected category view
              selectedCategory && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div className="grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-6">
                    {getTechsByCategory(selectedCategory).map(
                      (technology, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          whileHover={{ y: -3 }}
                        >
                          <TechDetails {...technology} />
                        </motion.div>
                      ),
                    )}
                  </motion.div>
                </motion.div>
              )}
        </div>
      </div>
    </Container>
  );
};

export default SkillsSection;
