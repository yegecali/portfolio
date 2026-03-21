import { useTheme } from "@/hooks/useTheme";
import { Sun, MoonStar } from "lucide-react";
import IconButton from "./IconButton";
import { motion } from "framer-motion";

const ThemeSwitcher = () => {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <IconButton>
        <Sun className="h-5 w-5" />
      </IconButton>
    );
  }

  return (
    <IconButton onClick={() => toggleTheme()}>
      <motion.div
        key={theme}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: 180 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {theme === "dark" ? (
          <Sun className="h-5 w-5" />
        ) : (
          <MoonStar className="h-5 w-5" />
        )}
      </motion.div>
    </IconButton>
  );
};

export default ThemeSwitcher;
