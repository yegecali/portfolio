import { useEffect, useRef, useState } from "react";
import ThemeSwitcher from "@/components/general/ThemeSwitcher";
import { Menu, X, Code2 } from "lucide-react";
import { usePortfolio } from "@/hooks/usePortfolio";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";

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
      Yemi<span className="text-gray-400 dark:text-gray-500 font-light">.dev</span>
    </span>
  </motion.a>
);

// ── Hook: active section via IntersectionObserver ─────────────────────────────
const useActiveSection = (ids: string[]) => {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const ratio: Record<string, number> = {};

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          ratio[id] = entry.intersectionRatio;
          const top = Object.entries(ratio).sort((a, b) => b[1] - a[1])[0];
          if (top && top[1] > 0) setActive(top[0]);
        },
        { threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [ids]);

  return active;
};

// ── Hook: scroll position ─────────────────────────────────────────────────────
const useScrolled = (threshold = 20) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);
  return scrolled;
};

// ── Main Header ───────────────────────────────────────────────────────────────
const Header = () => {
  const { navLinks } = usePortfolio();
  const scrolled = useScrolled();
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Extract section ids from nav links (strip "#")
  const sectionIds = navLinks
    .filter((l) => l.href.startsWith("#"))
    .map((l) => l.href.slice(1));

  const activeSection = useActiveSection(sectionIds);

  // Scroll progress bar
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
    const id = href.startsWith("#") ? href.slice(1) : href;
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // Separate "Contact" as CTA, rest as normal links
  const mainLinks = navLinks.filter((l) => l.label !== "Contact");
  const ctaLink = navLinks.find((l) => l.label === "Contact");

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 w-screen max-w-full z-50 overflow-hidden transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/20 border-b border-gray-200/60 dark:border-gray-700/60"
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

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {mainLinks.map((link, index) => {
            const id = link.href.slice(1);
            const isActive = activeSection === id;
            return (
              <motion.button
                key={link.href}
                onClick={() => scrollTo(link.href)}
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

        {/* Right side: theme + CTA + hamburger */}
        <div className="flex items-center gap-3">
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
            className="md:hidden p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl"
          >
            <nav className="flex flex-col gap-1 p-4">
              {navLinks.map((link, index) => {
                const id = link.href.slice(1);
                const isActive = activeSection === id;
                const isContact = link.label === "Contact";
                return (
                  <motion.button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isContact
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold mt-2"
                        : isActive
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
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
    </header>
  );
};

export default Header;
