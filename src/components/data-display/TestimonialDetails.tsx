import type { TestimonialDetails as TestimonialDetailsProps } from "@/lib/types";
import Typography from "@/components/general/Typography";
import Card from "@/components/layout/Card";
import { motion } from "framer-motion";

const TestimonialDetails = ({
  personName,
  testimonial,
  title,
}: TestimonialDetailsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
    >
      <Card className="mx-auto flex flex-col items-center gap-6 p-8 md:w-2/3 md:p-12 lg:w-1/3 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-800 dark:via-gray-850 dark:to-gray-800 hover:shadow-xl transition-all duration-300">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-2xl">
              ⭐
            </span>
          ))}
        </div>
        <Typography className="text-center italic text-lg leading-relaxed text-gray-700 dark:text-gray-200">
          &quot;{testimonial}&quot;
        </Typography>
        <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent dark:via-purple-500"></div>
        <div className="flex w-full flex-col gap-2">
          <Typography
            variant="subtitle"
            className="w-full text-center font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            {personName}
          </Typography>
          <Typography
            variant="body3"
            className="w-full text-center text-gray-600 dark:text-gray-400 font-medium"
          >
            {title}
          </Typography>
        </div>
      </Card>
    </motion.div>
  );
};

export default TestimonialDetails;
