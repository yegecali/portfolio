import { useCallback, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";
import { useTheme } from "@/hooks/useThemeHook";

// Initialise the engine once (singleton — safe to call multiple times)
let engineReady = false;
let enginePromise: Promise<void> | null = null;

const ensureEngine = () => {
  if (!enginePromise) {
    enginePromise = initParticlesEngine((engine) => loadSlim(engine)).then(
      () => { engineReady = true; }
    );
  }
  return enginePromise;
};

const buildOptions = (isDark: boolean): ISourceOptions => ({
  fullScreen: { enable: false },
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  particles: {
    number: { value: 55, density: { enable: true } },
    color: {
      value: isDark
        ? ["#3b82f6", "#8b5cf6", "#ec4899"]   // blue-500, violet-500, pink-500
        : ["#93c5fd", "#c4b5fd", "#f9a8d4"],   // blue-300, violet-300, pink-300
    },
    shape: { type: "circle" },
    opacity: {
      value: { min: 0.08, max: isDark ? 0.25 : 0.18 },
      animation: { enable: true, speed: 0.6, sync: false },
    },
    size: {
      value: { min: 1, max: 3 },
      animation: { enable: true, speed: 1.5, sync: false },
    },
    links: {
      enable: true,
      distance: 140,
      color: isDark ? "#6366f1" : "#a5b4fc", // indigo-500 / indigo-300
      opacity: isDark ? 0.12 : 0.18,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.5,
      direction: "none" as const,
      random: true,
      straight: false,
      outModes: { default: "out" as const },
    },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "grab" },
      resize: { enable: true },
    },
    modes: {
      grab: {
        distance: 120,
        links: { opacity: isDark ? 0.35 : 0.45 },
      },
    },
  },
  detectRetina: true,
});

const HeroParticles = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [ready, setReady] = useState(engineReady);

  useEffect(() => {
    if (!ready) {
      ensureEngine().then(() => setReady(true));
    }
  }, [ready]);

  const options = buildOptions(isDark);

  // Stable no-op callback for particlesLoaded
  const particlesInit = useCallback(async () => {}, []);

  if (!ready) return null;

  return (
    <Particles
      key={theme} // remount on theme change so colours update instantly
      id="hero-particles"
      className="absolute inset-0 pointer-events-none"
      options={options}
      particlesLoaded={particlesInit}
    />
  );
};

export default HeroParticles;
