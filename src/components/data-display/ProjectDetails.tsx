import type { ProjectDetails as ProjectDetailsType } from "@/lib/types";
import { ExternalLink } from "lucide-react";
import Typography from "@/components/general/Typography";
import Link from "@/components/navigation/Link";
import Card from "@/components/layout/Card";
import { motion } from "framer-motion";

const GRADIENTS = [
  "from-blue-400 via-cyan-400 to-teal-400",
  "from-purple-400 via-pink-400 to-red-400",
  "from-amber-400 via-orange-400 to-rose-400",
];

type ProjectDetailsProps = ProjectDetailsType;

const ProjectDetails = ({
  name,
  description,
  technologies,
  url,
}: ProjectDetailsProps) => {
  // Use name hash to determine consistent gradient
  const gradientIndex = name.length % GRADIENTS.length;
  const randomGradient = GRADIENTS[gradientIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -3 }}
    >
      <Card className="w-full flex flex-col hover:shadow-2xl transition-shadow duration-300 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-purple-500">
        {/* Gradient Accent Bar */}
        <div className={`h-1 bg-gradient-to-r ${randomGradient}`} />

        {/* Content */}
        <div className="flex flex-col gap-5 p-8 md:p-10">
          <div className="flex items-start justify-between">
            <Typography
              variant="subtitle"
              className="font-bold text-2xl md:text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              {name}
            </Typography>
          </div>

          <Typography className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
            {description}
          </Typography>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {technologies?.map((technology, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs md:text-sm rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium border border-blue-200 dark:border-blue-800/50 hover:border-purple-400 dark:hover:border-purple-400 transition-colors"
              >
                {technology}
              </span>
            ))}
          </div>

          {/* Link */}
          <Link
            href={url}
            noCustomization
            externalLink
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-purple-600 dark:hover:text-purple-400 font-semibold transition-colors duration-200 w-fit"
          >
            Ver Proyecto en GitHub
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProjectDetails;
