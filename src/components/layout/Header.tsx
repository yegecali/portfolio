import { useEffect, useRef, useState, useMemo } from "react";
import ThemeSwitcher from "@/components/general/ThemeSwitcher";
import LanguageSwitcher from "@/components/general/LanguageSwitcher";
import { Menu, X, Code2 } from "lucide-react";
import { usePortfolio } from "@/hooks/usePortfolio";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import useActiveSection from "@/hooks/useActiveSection";
import useScrolled from "@/hooks/useScrolled";
import DesktopNav from "@/components/navigation/DesktopNav";
import MobileMenu from "@/components/navigation/MobileMenu";
import { scrollToSection } from "@/lib/utils";

// ── Logo ──────────────────────────────────────────────────────────────────────
const Logo = () => (
  <motion.a
    href="#hero"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    className="flex items-center gap-2.5 group"
  >
    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
      <Code2 className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
    </div>
    <span className="font-black text-lg bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent tracking-tight">
      Yemi<span className="text-gray-500 dark:text-gray-400 font-light">.dev</span>
    </span>
  </motion.a>
);

// ── Main Header ───────────────────────────────────────────────────────────────
const Header = () => {
  const { navLinks } = usePortfolio();
  const scrolled = useScrolled();
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const sectionIds = useMemo(() => {
    return navLinks
      .filter((l) => l.href.startsWith("#"))
      .map((l) => l.href.slice(1));
  }, [navLinks]);

  const activeSection = useActiveSection(sectionIds);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  // Close mobile menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    setTimeout(() => scrollToSection(href), 300);
  };

  const mainLinks = navLinks.filter((l) => l.label !== "Contact");
  const ctaLink = navLinks.find((l) => l.label === "Contact");

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 w-screen max-w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-section-alt/90 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/20 border-b border-card-border/60"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      {/* Scroll progress bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-10"
        style={{ scaleX }}
      />

      <div className={`mx-auto w-full max-w-7xl flex items-center justify-between px-4 md:px-8 transition-all duration-300 ${scrolled ? "py-3" : "py-4"}`}>

        <Logo />

        <DesktopNav
          links={mainLinks}
          activeSection={activeSection}
          onNavigate={scrollTo}
        />

        {/* Right side: theme + CTA + hamburger */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeSwitcher />

          {ctaLink && (
            <motion.button
              onClick={() => scrollTo(ctaLink.href)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              {ctaLink.label}
            </motion.button>
          )}

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2.5 rounded-lg hover:bg-section-bg transition-colors"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileOpen ? "x" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      <MobileMenu
        open={mobileOpen}
        links={navLinks}
        activeSection={activeSection}
        onNavigate={scrollTo}
      />
    </header>
  );
};

export default Header;
