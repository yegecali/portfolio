import { AnimatePresence, motion } from "framer-motion";

interface NavLink {
  href: string;
  label: string;
}

interface MobileMenuProps {
  open: boolean;
  links: NavLink[];
  activeSection: string;
  onNavigate: (href: string) => void;
}

const MobileMenu = ({ open, links, activeSection, onNavigate }: MobileMenuProps) => (
  <AnimatePresence>
    {open && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="md:hidden overflow-hidden border-t border-card-border bg-section-alt/95 backdrop-blur-xl"
      >
        <nav className="flex flex-col gap-1 p-4">
          {links.map((link, index) => {
            const id = link.href.slice(1);
            const isActive = activeSection === id;
            const isContact = link.label === "Contact";
            return (
              <motion.button
                key={link.href}
                onClick={() => onNavigate(link.href)}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isContact
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold mt-2"
                    : isActive
                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    : "text-body hover:bg-section-bg"
                }`}
              >
                {isActive && !isContact && (
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 mb-0.5" />
                )}
                {link.label}
              </motion.button>
            );
          })}
        </nav>
      </motion.div>
    )}
  </AnimatePresence>
);

export default MobileMenu;
