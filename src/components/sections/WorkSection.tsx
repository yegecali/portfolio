import ProjectDetails from "@/components/data-display/ProjectDetails";
import Typography from "@/components/general/Typography";
import Container from "@/components/layout/Container";
import { usePortfolio } from "@/hooks/usePortfolio";
import { motion } from "framer-motion";

const WorkSection = () => {
  const { projects } = usePortfolio();

  return (
    <Container
      id="work"
      className="min-h-screen flex flex-col items-center justify-center py-16"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-6 mb-16 relative"
      >
        {/* Decorative background */}
        <div className="absolute -inset-20 bg-gradient-to-b from-blue-500/5 via-purple-500/5 to-transparent rounded-3xl blur-3xl -z-10" />

        <Typography
          variant="h1"
          className="text-5xl md:text-6xl font-bold text-center leading-tight"
        >
          <span className="block text-gray-900 dark:text-white drop-shadow-lg">
            Impulsando Sistemas
          </span>
          <span className="block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            de Alto Rendimiento
          </span>
        </Typography>
        <div className="h-1 w-24 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full" />
        <Typography className="max-w-3xl text-center text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
          Arquitecturas distribuidas, resiliencia extrema y observabilidad en
          tiempo real. Proyectos enfocados en escalabilidad, tolerancia a fallos
          y decisiones técnicas de alto impacto.
        </Typography>
      </motion.div>

      {/* Projects Grid */}
      <div className="w-full flex flex-col gap-8 max-w-6xl">
        {projects?.map((project, index) => (
          <ProjectDetails key={index} {...project} />
        ))}
      </div>
    </Container>
  );
};

export default WorkSection;
