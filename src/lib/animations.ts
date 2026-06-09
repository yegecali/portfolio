/**
 * Shared Framer Motion variants and animation helpers.
 * Import from here instead of redefining per-component.
 */

// ── Hero section ──────────────────────────────────────────────────────────────

/** Stagger container used in HeroContent. */
export const heroContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0,
      staggerChildren: 0.08,
    },
  },
};

/** Fade-up — main items inside HeroContent. */
export const heroItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

/** Faster variant for small sub-elements (e.g. stat cards). */
export const heroSubItemVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

// ── Generic section ───────────────────────────────────────────────────────────

/** Simple stagger container for section content. */
export const staggerContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/** Simple fade-up — used in most section content blocks. */
export const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/**
 * Fade-up with a custom delay — useful when stagger isn't used
 * and each item has an explicit `custom` prop.
 *
 * Usage:
 *   <motion.div custom={0.3} variants={customDelayFadeUpVariants} ... />
 */
export const customDelayFadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay },
  }),
};

// ── Section header ────────────────────────────────────────────────────────────

/**
 * Spread-able props for the animated section header wrapper.
 *
 * Usage:
 *   <motion.div {...sectionHeaderProps} className="...">
 */
export const sectionHeaderProps = {
  initial: { opacity: 0, y: -24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true },
} as const;
