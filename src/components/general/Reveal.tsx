import { motion } from "framer-motion";
import type { HTMLMotionProps, TargetAndTransition } from "framer-motion";

// ── Animation presets (mirrors AOS vocabulary) ────────────────────────────────

export type RevealAnimation =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "zoom-in"
  | "zoom-out"
  | "flip-left"
  | "flip-right"
  | "flip-up"
  | "flip-down";

const DISTANCE = 40;

const hidden: Record<RevealAnimation, TargetAndTransition> = {
  "fade-up":    { opacity: 0, y: DISTANCE },
  "fade-down":  { opacity: 0, y: -DISTANCE },
  "fade-left":  { opacity: 0, x: DISTANCE },
  "fade-right": { opacity: 0, x: -DISTANCE },
  "zoom-in":    { opacity: 0, scale: 0.82 },
  "zoom-out":   { opacity: 0, scale: 1.18 },
  "flip-left":  { opacity: 0, rotateY: 90, transformPerspective: 1200 },
  "flip-right": { opacity: 0, rotateY: -90, transformPerspective: 1200 },
  "flip-up":    { opacity: 0, rotateX: 60, transformPerspective: 1200 },
  "flip-down":  { opacity: 0, rotateX: -60, transformPerspective: 1200 },
};

const visible: Record<RevealAnimation, TargetAndTransition> = {
  "fade-up":    { opacity: 1, y: 0 },
  "fade-down":  { opacity: 1, y: 0 },
  "fade-left":  { opacity: 1, x: 0 },
  "fade-right": { opacity: 1, x: 0 },
  "zoom-in":    { opacity: 1, scale: 1 },
  "zoom-out":   { opacity: 1, scale: 1 },
  "flip-left":  { opacity: 1, rotateY: 0, transformPerspective: 1200 },
  "flip-right": { opacity: 1, rotateY: 0, transformPerspective: 1200 },
  "flip-up":    { opacity: 1, rotateX: 0, transformPerspective: 1200 },
  "flip-down":  { opacity: 1, rotateX: 0, transformPerspective: 1200 },
};

// ── Component ─────────────────────────────────────────────────────────────────

interface RevealProps extends Omit<HTMLMotionProps<"div">, "initial" | "animate" | "whileInView" | "variants"> {
  animation?: RevealAnimation;
  /** Delay in seconds */
  delay?: number;
  /** Duration in seconds (default 0.55) */
  duration?: number;
  /** Trigger animation only the first time (default true) */
  once?: boolean;
  /** How much of the element must be visible to trigger (0–1, default 0.15) */
  amount?: number;
  /** Render as a different HTML element (default "div") */
  as?: keyof HTMLElementTagNameMap;
}

/**
 * Drop-in scroll-reveal wrapper powered by Framer Motion.
 * API mirrors AOS: just wrap any element and pick an animation preset.
 *
 * @example
 * <Reveal animation="fade-up" delay={0.1}>
 *   <MyCard />
 * </Reveal>
 */
const Reveal = ({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 0.55,
  once = true,
  amount = 0.15,
  className,
  as,
  ...rest
}: RevealProps) => {
  const Tag = (as ? motion[as as keyof typeof motion] : motion.div) as typeof motion.div;

  return (
    <Tag
      initial={hidden[animation]}
      whileInView={visible[animation]}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
