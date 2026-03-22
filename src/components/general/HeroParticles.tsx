import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";
import { useTheme } from "@/hooks/useThemeHook";

const buildConfig = (isDark: boolean): ISourceOptions => ({
  fullScreen: { enable: false },
  particles: {
    number: { value: 60, density: { enable: true, width: 900 } },
    color: {
      value: isDark
        ? ["#3b82f6", "#8b5cf6", "#ec4899"]
        : ["#93c5fd", "#c4b5fd", "#f9a8d4"],
    },
    shape: { type: "circle" },
    opacity: {
      value: { min: 0.05, max: isDark ? 0.22 : 0.16 },
      animation: { enable: true, speed: 0.6, sync: false },
    },
    size: {
      value: { min: 0.8, max: 2.5 },
      animation: { enable: true, speed: 1.5, sync: false },
    },
    links: {
      enable: true,
      distance: 140,
      color: isDark ? "#6366f1" : "#a5b4fc",
      opacity: isDark ? 0.12 : 0.18,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.5,
      direction: "none",
      random: true,
      straight: false,
      outModes: { default: "out" },
    },
  },
  interactivity: {
    detectsOn: "canvas",
    events: {
      onHover: { enable: true, mode: "grab" },
      onClick: { enable: false },
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
  const [engineReady, setEngineReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setEngineReady(true));
  }, []);

  if (!engineReady) return null;

  return (
    <Particles
      id="hero-particles-js"
      options={buildConfig(isDark)}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default HeroParticles;
