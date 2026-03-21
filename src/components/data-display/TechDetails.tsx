import type { TechDetails as TechDetailsProps } from "@/lib/types";
import Typography from "@/components/general/Typography";
import Link from "@/components/navigation/Link";
import { getDevicon } from "@/lib/devicons";
import { motion } from "framer-motion";

const TechDetails = ({ url, label, iconName }: TechDetailsProps) => {
  const IconComponent = getDevicon(iconName);

  return (
    <Link noCustomization href={url} externalLink>
      <motion.div
        className="flex flex-col items-center gap-3 transition-all duration-300 hover:scale-110 cursor-pointer"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
      >
        {IconComponent && (
          <div className="p-3 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 hover:shadow-lg transition-shadow duration-300">
            <IconComponent size={48} />
          </div>
        )}
        <Typography
          variant="body1"
          className="transition-transform duration-300 font-medium text-center"
        >
          {label}
        </Typography>
      </motion.div>
    </Link>
  );
};

export default TechDetails;
