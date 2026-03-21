import Link from "@/components/navigation/Link";
import ThemeSwitcher from "@/components/general/ThemeSwitcher";
import Typography from "@/components/general/Typography";
import { Menu, X } from "lucide-react";
import { usePortfolio } from "@/hooks/usePortfolio";
import { motion } from "framer-motion";
import { Disclosure } from "@headlessui/react";

const Logo = () => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    className="flex items-center gap-2"
  >
    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
      <Typography variant="h3" className="font-bold text-white text-lg">
        Y
      </Typography>
    </div>
    <Typography
      variant="h3"
      className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
    >
      Yemi Dev
    </Typography>
  </motion.div>
);

const Header = () => {
  const { navLinks } = usePortfolio();

  return (
    <header className="fixed top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg dark:shadow-2xl transition-all duration-300 overflow-x-hidden">
      <Disclosure>
        {({ open }) => (
          <>
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
              <Logo />

              {/* Desktop Navigation */}
              <nav className="hidden gap-1 md:flex">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className="px-4 py-2 rounded-lg transition-all duration-300 font-medium relative group text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {link.label}
                      <span className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300 w-0 group-hover:w-full" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Theme Switcher & Mobile Menu Button */}
              <div className="flex items-center gap-3">
                <ThemeSwitcher />
                <Disclosure.Button className="md:hidden inline-flex items-center justify-center rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  {open ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </Disclosure.Button>
              </div>
            </div>

            {/* Mobile Navigation */}
            <Disclosure.Panel className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md transition-colors duration-300">
              <motion.nav
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-1 p-4"
              >
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Disclosure.Button
                      as={Link}
                      href={link.href}
                      className="block px-4 py-2 rounded-lg transition-all duration-300 font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 w-full text-left"
                    >
                      {link.label}
                    </Disclosure.Button>
                  </motion.div>
                ))}
              </motion.nav>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </header>
  );
};

export default Header;
