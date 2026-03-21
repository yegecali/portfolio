import { useEffect, useRef } from "react";
import { useMotionValue, useSpring, useInView, motion } from "framer-motion";

interface AnimatedCounterProps {
  value: string;        // e.g. "5+", "16+", "100%"
  className?: string;
  duration?: number;    // spring duration hint (stiffness-based)
}

/**
 * Parses a value string like "5+", "16+", "100%" into
 * { num: 5, suffix: "+" } so we can animate just the number.
 */
const parse = (val: string) => {
  const match = val.match(/^(\d+)(.*)$/);
  if (!match) return { num: 0, suffix: val };
  return { num: parseInt(match[1], 10), suffix: match[2] };
};

const AnimatedCounter = ({ value, className = "" }: AnimatedCounterProps) => {
  const { num, suffix } = parse(value);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });

  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, {
    stiffness: 60,
    damping: 18,
    mass: 0.8,
  });

  // Display value — rounded integer
  const displayRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isInView) return;
    // Small delay so the card entrance animation finishes first
    const t = setTimeout(() => motionVal.set(num), 200);
    return () => clearTimeout(t);
  }, [isInView, motionVal, num]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => {
      if (displayRef.current) {
        displayRef.current.textContent = Math.round(v).toString();
      }
    });
    return unsub;
  }, [spring]);

  return (
    <motion.span ref={ref} className={className}>
      <span ref={displayRef}>0</span>
      {suffix}
    </motion.span>
  );
};

export default AnimatedCounter;
