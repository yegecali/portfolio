import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Custom cursor: a soft spring-lagged circle that expands on interactive elements.
 * Hidden on touch devices.
 */
const CustomCursor = () => {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const isTouchDevice = useRef(
    typeof window !== "undefined" &&
      (window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window)
  );

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Outer ring: heavy spring (lag behind cursor)
  const outerX = useSpring(rawX, { stiffness: 80, damping: 18, mass: 0.6 });
  const outerY = useSpring(rawY, { stiffness: 80, damping: 18, mass: 0.6 });

  // Inner dot: tight spring (nearly instant)
  const dotX = useSpring(rawX, { stiffness: 500, damping: 30, mass: 0.2 });
  const dotY = useSpring(rawY, { stiffness: 500, damping: 30, mass: 0.2 });

  useEffect(() => {
    if (isTouchDevice.current) return;

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, [role='button'], input, textarea, select, label") ||
        target.closest("[data-cursor-expand]")
      ) {
        setExpanded(true);
      }
    };

    const onLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, [role='button'], input, textarea, select, label") ||
        target.closest("[data-cursor-expand]")
      ) {
        setExpanded(false);
      }
    };

    const onMouseLeaveWindow = () => setVisible(false);
    const onMouseEnterWindow = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);
    document.addEventListener("mouseleave", onMouseLeaveWindow);
    document.addEventListener("mouseenter", onMouseEnterWindow);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      document.removeEventListener("mouseleave", onMouseLeaveWindow);
      document.removeEventListener("mouseenter", onMouseEnterWindow);
    };
  }, [rawX, rawY, visible]);

  if (isTouchDevice.current) return null;

  return (
    <>
      {/* Outer ring — spring lagged */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-blue-500/60 dark:border-blue-400/60 mix-blend-difference"
        style={{
          x: outerX,
          y: outerY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
        animate={{
          width: expanded ? 48 : 28,
          height: expanded ? 48 : 28,
        }}
        transition={{ type: "spring", stiffness: 250, damping: 22, mass: 0.4 }}
      />

      {/* Inner dot — nearly instant */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-blue-500/80 dark:bg-blue-400/80"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
        animate={{
          width: expanded ? 6 : 5,
          height: expanded ? 6 : 5,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      />
    </>
  );
};

export default CustomCursor;
