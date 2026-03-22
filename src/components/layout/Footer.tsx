import { motion } from "framer-motion";
import { Code2, Heart, ArrowUp } from "lucide-react";
import { usePortfolio } from "@/hooks/usePortfolio";
import { getSocialMeta } from "@/lib/constants";
import { scrollToSection } from "@/lib/utils";
import Reveal from "@/components/general/Reveal";

const NAV_COLS = [
  {
    title: "Navegación",
    links: [
      { label: "Inicio",      href: "#hero"       },
      { label: "Sobre mí",    href: "#about"      },
      { label: "Habilidades", href: "#skills"     },
      { label: "Experiencia", href: "#experience" },
    ],
  },
  {
    title: "Proyectos",
    links: [
      { label: "Trabajo",   href: "#work"    },
      { label: "Contacto",  href: "#contact" },
    ],
  },
];

const Footer = () => {
  const { siteName, socialLinks, email } = usePortfolio();
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-950 dark:bg-gray-950 text-gray-400 overflow-hidden">

      {/* Top gradient separator */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-10 md:py-14 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">

        {/* Brand column */}
        <Reveal animation="fade-right" className="col-span-2 md:col-span-2 flex flex-col gap-5">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-md">
              <Code2 className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-black text-lg text-white tracking-tight">
              Yemi<span className="text-gray-600 font-light">.dev</span>
            </span>
          </div>

          <p className="text-sm leading-relaxed max-w-xs text-gray-400">
            Full Stack Developer especializado en sistemas bancarios de alto rendimiento. Construyendo soluciones escalables con Java y React.
          </p>

          {/* Email */}
          <a
            href={`mailto:${email}`}
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors w-fit"
          >
            {email}
          </a>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map((link, i) => {
              const meta = getSocialMeta(link.url);
              if (!meta) return null;
              const Icon = meta.icon;
              return (
                <motion.a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={meta.label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4 text-gray-300" />
                </motion.a>
              );
            })}
          </div>
        </Reveal>

        {/* Nav columns */}
        {NAV_COLS.map((col, colIdx) => (
          <Reveal
            key={col.title}
            animation="fade-left"
            delay={colIdx * 0.1 + 0.15}
            className="flex flex-col gap-4"
          >
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">
              {col.title}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200 text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <Reveal animation="fade-up" delay={0.2} className="mx-auto max-w-7xl px-4 md:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">

          <p className="text-xs text-gray-600 flex items-center gap-1.5">
            © {year} {siteName} · Hecho con
            <Heart className="w-3 h-3 text-red-500 fill-red-500 inline" />
            usando React & TypeScript
          </p>

          {/* Back to top */}
          <motion.button
            onClick={() => scrollToSection("#hero")}
            whileHover={{ y: -2 }}
            className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors group"
          >
            Volver arriba
            <span className="w-6 h-6 rounded-md bg-gray-800 group-hover:bg-gray-700 flex items-center justify-center transition-colors">
              <ArrowUp className="w-3 h-3" />
            </span>
          </motion.button>
        </Reveal>
      </div>
    </footer>
  );
};

export default Footer;
