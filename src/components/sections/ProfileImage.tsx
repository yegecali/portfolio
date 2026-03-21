import { motion } from "framer-motion";
import { getDevicon } from "@/lib/devicons";
import type { TechDetails } from "@/lib/types";

interface ProfileImageProps {
  image: string;
  floatingTechs: TechDetails[];
}

const ProfileImage = ({ image, floatingTechs }: ProfileImageProps) => {
  return (
    <div className="hidden md:flex md:flex-shrink-0 justify-center relative w-full max-w-md">
      {/* Floating tech icons */}
      {floatingTechs.map((tech, index) => {
        const Icon = getDevicon(tech.iconName);
        const positions = [
          "top-0 left-0 -translate-x-1/2 -translate-y-1/2", // top-left
          "top-0 right-0 translate-x-1/2 -translate-y-1/2", // top-right
          "bottom-0 left-0 -translate-x-1/2 translate-y-1/2", // bottom-left
          "bottom-0 right-0 translate-x-1/2 translate-y-1/2", // bottom-right
        ];
        const floatingY = [
          [0, -12, 0], // top-left
          [0, -15, 0], // top-right
          [0, 12, 0], // bottom-left
          [0, 15, 0], // bottom-right
        ];

        return (
          <motion.div
            key={tech.label}
            className={`absolute ${positions[index]} w-14 h-14 bg-gradient-to-br from-blue-400/80 to-purple-400/80 dark:from-blue-600/60 dark:to-purple-600/60 rounded-lg flex items-center justify-center shadow-lg backdrop-blur-sm`}
            animate={{
              y: floatingY[index],
            }}
            transition={{
              duration: 3 + index * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.15,
            }}
          >
            {Icon && <Icon size={32} />}
          </motion.div>
        );
      })}

      <motion.div
        className="relative w-96 h-96"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Pulsing outer ring - synchronized with gradient */}
        <motion.div
          className="absolute -inset-4 rounded-full border-2 border-blue-400/30 dark:border-blue-500/30"
          animate={{
            scale: [0.95, 1.08, 0.95],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Animated dashed border circle */}
        <motion.div
          className="absolute inset-0 rounded-full border-3 border-dashed border-blue-500 dark:border-blue-400"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />

        {/* Gradient background with pulse - synchronized */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 dark:from-blue-900/40 dark:via-purple-900/40 dark:to-pink-900/40 rounded-full blur-2xl"
          animate={{
            scale: [0.95, 1.05, 0.95],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating glow effect - synchronized */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-t from-blue-500/15 to-transparent blur-3xl"
          animate={{
            opacity: [0.1, 0.4, 0.1],
            scale: [0.95, 1.02, 0.95],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Image with floating animation - synchronized */}
        <motion.img
          src={image}
          alt="Profile"
          className="relative w-full h-full object-cover rounded-full shadow-2xl border border-white/20 dark:border-gray-700/30"
          animate={{
            y: [0, -12, 0],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{
            scale: 1.05,
            y: 0,
          }}
        />
      </motion.div>
    </div>
  );
};

export default ProfileImage;
