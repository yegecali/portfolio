import { MapPin } from "lucide-react";
import SocialIcons from "@/components/data-display/SocialIcons";
import Typography from "@/components/general/Typography";
import { motion } from "framer-motion";

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
  return (
    <div className="flex max-w-4xl flex-grow flex-col justify-center gap-8 md:items-start 2xl:gap-12">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="inline-block bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-800/20 text-blue-700 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-bold w-fit border border-blue-200 dark:border-blue-700/50 transition-all duration-300 hover:shadow-md dark:hover:bg-blue-900/50 hover:scale-105"
      >
        {badge}
      </motion.div>

      {/* Title and Description */}
      <motion.div
        className="flex flex-col gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Typography
          variant="h1"
          className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent transition-all duration-500"
        >
          {title}
        </Typography>
        <Typography className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl transition-colors duration-300">
          {description}
        </Typography>
      </motion.div>

      {/* Location and Status */}
      <motion.div
        className="flex flex-col gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="flex gap-2 items-center text-gray-700 dark:text-gray-300 transition-colors duration-300">
          <div className="p-2 rounded-lg bg-blue-100/50 dark:bg-blue-900/20">
            <MapPin className="stroke-primary dark:stroke-blue-400 w-5 h-5" />
          </div>
          <Typography>{location}</Typography>
        </div>

        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 transition-colors duration-300">
          <div className="p-2 rounded-lg bg-emerald-100/50 dark:bg-emerald-900/20">
            <div className="flex h-5 w-5 items-center justify-center">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 dark:bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500 dark:bg-emerald-400"></span>
              </span>
            </div>
          </div>
          <Typography className="font-medium">{status}</Typography>
        </div>
      </motion.div>

      {/* Social Icons and CTA */}
      <motion.div
        className="flex flex-col gap-6 pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <SocialIcons />
        <div className="flex flex-wrap gap-3">
          <a
            href="#contact"
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 transform"
          >
            Contáctame
          </a>
          <a
            href="#work"
            className="px-6 py-3 rounded-lg border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
          >
            Ver mi trabajo
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroContent;
