import { motion } from "framer-motion";
import { getDevicon } from "@/lib/devicons";
import type { TechDetails } from "@/lib/types";

interface ProfileImageProps {
  image: string;
  floatingTechs: TechDetails[];
}

const floatingPositions = [
  { className: "top-6 left-0 md:-left-14", yAnim: [0, -10, 0] as number[], delay: 0 },
  { className: "top-6 right-0 md:-right-14", yAnim: [0, -14, 0] as number[], delay: 0.5 },
  { className: "bottom-6 left-0 md:-left-14", yAnim: [0, 10, 0] as number[], delay: 1 },
  { className: "bottom-6 right-0 md:-right-14", yAnim: [0, 14, 0] as number[], delay: 1.5 },
];

const ProfileImage = ({ image, floatingTechs }: ProfileImageProps) => {
  return (
    <motion.div
      className="flex justify-center md:flex-shrink-0 relative"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
    >
      <div className="relative w-64 h-64 md:w-80 md:h-80">

        {/* Floating tech icons */}
        {floatingTechs.map((tech, index) => {
          const Icon = getDevicon(tech.iconName);
          const pos = floatingPositions[index];
          return (
            <motion.div
              key={tech.label}
              className={`absolute ${pos.className} w-11 h-11 md:w-13 md:h-13 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center shadow-lg border border-gray-100 dark:border-gray-700 z-10`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1, y: pos.yAnim }}
              transition={{
                opacity: { duration: 0.4, delay: 0.8 + pos.delay },
                scale: { duration: 0.4, delay: 0.8 + pos.delay, type: "spring", bounce: 0.4 },
                y: { duration: 3 + index * 0.4, repeat: Infinity, ease: "easeInOut", delay: pos.delay },
              }}
              whileHover={{ scale: 1.25, rotate: 8, zIndex: 20 }}
              title={tech.label}
            >
              {Icon && <Icon size={26} />}
            </motion.div>
          );
        })}

        {/* Glowing halo */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 dark:from-blue-600 dark:via-purple-600 dark:to-pink-600 blur-3xl opacity-25 dark:opacity-20"
          animate={{ scale: [1, 1.12, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Image */}
        <motion.img
          src={image}
          alt="Profile"
          className="absolute inset-0 w-full h-full object-cover rounded-full shadow-2xl z-[1]"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.04, y: 0 }}
        />
      </div>
    </motion.div>
  );
};

export default ProfileImage;
