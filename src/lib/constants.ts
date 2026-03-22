import { Github, Linkedin, Instagram, MessageCircle } from "lucide-react";

// ── Timing ────────────────────────────────────────────────────────────────────

export const ANIMATION_TIMINGS = {
  /** Duration (ms) of the CSS theme-transition class on <html>. */
  THEME_TRANSITION: 600,
  /** How long the "Copiado" feedback stays visible after copying. */
  COPY_NOTIFICATION: 2000,
} as const;

// ── Social ────────────────────────────────────────────────────────────────────

/** Metadata for each social platform, keyed by lowercase URL substring. */
export const SOCIAL_META: Record<
  string,
  {
    label: string;
    icon: React.ElementType;
    gradient: string;
    bg: string;
  }
> = {
  github: {
    label: "GitHub",
    icon: Github,
    gradient: "from-gray-700 to-gray-900",
    bg: "bg-gray-100 dark:bg-gray-800",
  },
  linkedin: {
    label: "LinkedIn",
    icon: Linkedin,
    gradient: "from-blue-600 to-blue-800",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
  instagram: {
    label: "Instagram",
    icon: Instagram,
    gradient: "from-pink-500 to-purple-600",
    bg: "bg-pink-50 dark:bg-pink-900/20",
  },
  whatsapp: {
    label: "WhatsApp",
    icon: MessageCircle,
    gradient: "from-emerald-500 to-green-600",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
  },
};

/** Returns the social metadata for a given URL, or null if unknown. */
export const getSocialMeta = (url: string) => {
  const lower = url.toLowerCase();
  for (const [key, meta] of Object.entries(SOCIAL_META)) {
    if (lower.includes(key)) return meta;
  }
  return null;
};

// ── Hero section ──────────────────────────────────────────────────────────────

/** Floating code snippets rendered in the Hero background layer. */
export const HERO_CODE_SNIPPETS = [
  { text: "const dev = () => 🚀",  x: "8%",  y: "12%", duration: 18, delay: 0,   parallax: -60 },
  { text: "<FullStack />",          x: "72%", y: "8%",  duration: 22, delay: 1,   parallax: -90 },
  { text: "async/await",            x: "85%", y: "30%", duration: 16, delay: 2.5, parallax: -50 },
  { text: "{ microservices }",      x: "5%",  y: "45%", duration: 20, delay: 0.8, parallax: -70 },
  { text: "git commit -m '✨'",     x: "78%", y: "65%", duration: 24, delay: 1.5, parallax: -40 },
  { text: "SELECT * FROM skills",   x: "10%", y: "75%", duration: 19, delay: 3,   parallax: -80 },
  { text: "@SpringBootApplication", x: "60%", y: "82%", duration: 21, delay: 0.4, parallax: -55 },
  { text: "docker build .",         x: "30%", y: "18%", duration: 17, delay: 2,   parallax: -65 },
  { text: "type Safe = true",       x: "50%", y: "90%", duration: 23, delay: 1.2, parallax: -45 },
  { text: "=> Promise<T>",          x: "88%", y: "50%", duration: 15, delay: 3.5, parallax: -75 },
] as const;
