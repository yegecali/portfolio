import { motion } from "framer-motion";

interface NavLink {
  href: string;
  label: string;
}

interface DesktopNavProps {
  links: NavLink[];
  activeSection: string;
  onNavigate: (href: string) => void;
}

const DesktopNav = ({ links, activeSection, onNavigate }: DesktopNavProps) => (
  <nav className="hidden md:flex items-center gap-1">
    {links.map((link, index) => {
      const id = link.href.slice(1);
      const isActive = activeSection === id;
      return (
        <motion.button
          key={link.href}
          onClick={() => onNavigate(link.href)}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.08 }}
          className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            isActive
              ? "text-blue-600 dark:text-blue-400"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          }`}
        >
          {isActive && (
            <motion.span
              layoutId="nav-pill"
              className="absolute inset-0 rounded-lg bg-blue-50 dark:bg-blue-900/30"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
          <span className="relative z-10">{link.label}</span>
        </motion.button>
      );
    })}
  </nav>
);

export default DesktopNav;
