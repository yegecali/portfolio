import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Container from "@/components/layout/Container";
import ProfileImage from "@/components/sections/ProfileImage";
import HeroContent from "@/components/sections/HeroContent";
import { usePortfolio } from "@/hooks/usePortfolio";
import type { TechDetails } from "@/lib/types";

const codeSnippets = [
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
];

// Hook: parallax value from a section ref
const useSectionParallax = (ref: React.RefObject<HTMLElement | null>, outputRange: [number, number]) => {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], outputRange);
  return useSpring(raw, { stiffness: 80, damping: 20, mass: 0.5 });
};

const HeroSection = () => {
  const { hero, technologies } = usePortfolio();
  const ref = useRef<HTMLElement>(null);

  const [floatingTechs] = useState<TechDetails[]>(() => {
    const shuffled = [...technologies].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 4);
  });

  // Different layers move at different speeds
  const blobY      = useSectionParallax(ref, [0, -160]); // fastest (background)
  const gridY      = useSectionParallax(ref, [0, -40]);  // very subtle
  const snippetsY  = useSectionParallax(ref, [0, -100]); // medium
  const contentY   = useSectionParallax(ref, [0, -60]);  // text — slowest
  const imageY     = useSectionParallax(ref, [0, -80]);  // image — between text & blobs
  const indicatorY = useSectionParallax(ref, [0, 40]);   // scroll indicator drifts down

  // Fade out scroll indicator as user scrolls
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <Container
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 via-white to-transparent dark:from-blue-950/10 dark:via-gray-900 dark:to-gray-950 overflow-hidden"
    >
      {/* Layer 1 — Blobs (fastest parallax) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{ y: blobY }}
      >
        <motion.div
          className="absolute top-0 right-0 w-64 h-64 md:w-[500px] md:h-[500px] bg-blue-300 dark:bg-blue-900/50 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-25 dark:opacity-15 -mr-20 -mt-20 md:-mr-40 md:-mt-40"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-64 h-64 md:w-[500px] md:h-[500px] bg-purple-300 dark:bg-purple-900/50 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-25 dark:opacity-15 -ml-20 -mb-20 md:-ml-40 md:-mb-40"
          animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-300 dark:bg-pink-900/40 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-15 dark:opacity-10 -translate-x-1/2 -translate-y-1/2"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </motion.div>
      </div>

      {/* Layer 2 — Grid (very subtle parallax) */}
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none"
        style={{ y: gridY }}
      />

      {/* Layer 3 — Code snippets (medium parallax) */}
      {/* Static wrapper holds overflow-hidden so iOS Safari respects it even with inner transforms */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{ y: snippetsY }}
        >
          {codeSnippets.map((snippet, i) => (
            <motion.span
              key={i}
              className="absolute font-mono text-xs font-medium text-blue-600/20 dark:text-blue-400/15 select-none whitespace-nowrap"
              style={{ left: snippet.x, top: snippet.y }}
              animate={{ y: [0, -18, 0], opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: snippet.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: snippet.delay,
              }}
            >
              {snippet.text}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Layer 4 — Main content (slowest, stays readable) */}
      <div className="relative flex flex-col gap-8 md:gap-12 md:flex-row md:items-center md:justify-between w-full">
        <motion.div style={{ y: contentY }} className="flex-grow">
          <HeroContent
            badge={hero.badge}
            title={hero.title}
            description={hero.description}
            location={hero.location}
            status={hero.status}
          />
        </motion.div>

        {/* Layer 5 — Image (slightly faster than text) */}
        <motion.div style={{ y: imageY }}>
          <ProfileImage image={hero.image} floatingTechs={floatingTechs} />
        </motion.div>
      </div>

      {/* Scroll indicator — fades + drifts as user scrolls */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        style={{ y: indicatorY, opacity: indicatorOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        onClick={() =>
          document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <span className="text-xs text-gray-400 dark:text-gray-500 tracking-widest uppercase font-medium">
          Scroll
        </span>
        <motion.div
          className="w-5 h-9 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-start justify-center pt-1.5"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-blue-500"
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </Container>
  );
};

export default HeroSection;
