import { useEffect, useRef } from "react";
import "particles.js";
import { useTheme } from "@/hooks/useThemeHook";

// particles.js agrega estas propiedades al window global
declare global {
  interface Window {
    particlesJS: (id: string, config: object) => void;
    pJSDom: Array<{ pJS: { fn: { vendors: { destroypJS: () => void } } } }>;
  }
}

const buildConfig = (isDark: boolean) => ({
  particles: {
    number: { value: 60, density: { enable: true, value_area: 900 } },
    color: {
      value: isDark
        ? ["#3b82f6", "#8b5cf6", "#ec4899"]
        : ["#93c5fd", "#c4b5fd", "#f9a8d4"],
    },
    shape: { type: "circle" },
    opacity: {
      value: isDark ? 0.22 : 0.16,
      random: true,
      anim: { enable: true, speed: 0.6, opacity_min: 0.05, sync: false },
    },
    size: {
      value: 2.5,
      random: true,
      anim: { enable: true, speed: 1.5, size_min: 0.8, sync: false },
    },
    line_linked: {
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
      out_mode: "out",
      bounce: false,
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: false },
      resize: true,
    },
    modes: {
      grab: {
        distance: 120,
        line_linked: { opacity: isDark ? 0.35 : 0.45 },
      },
    },
  },
  retina_detect: true,
});

const CONTAINER_ID = "hero-particles-js";

const HeroParticles = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const instanceRef = useRef<number | null>(null);

  useEffect(() => {
    // Destruye instancia anterior si existe
    if (instanceRef.current !== null && window.pJSDom?.[instanceRef.current]) {
      window.pJSDom[instanceRef.current].pJS.fn.vendors.destroypJS();
    }

    window.particlesJS(CONTAINER_ID, buildConfig(isDark));

    // Guarda el índice de la nueva instancia
    instanceRef.current = (window.pJSDom?.length ?? 1) - 1;

    return () => {
      if (instanceRef.current !== null && window.pJSDom?.[instanceRef.current]) {
        window.pJSDom[instanceRef.current].pJS.fn.vendors.destroypJS();
        instanceRef.current = null;
      }
    };
  }, [isDark]);

  return (
    <div
      id={CONTAINER_ID}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default HeroParticles;
