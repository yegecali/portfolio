/**
 * Centralized design tokens: gradients, accent palettes, and semantic color
 * class strings for dark/light mode. Import from here instead of duplicating
 * Tailwind class strings across components.
 */

// ── Brand gradients ───────────────────────────────────────────────────────────

export const BRAND = {
  /** Main heading gradient used on section h2 titles */
  gradient:
    "from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400",
  /** CTA button base gradient */
  ctaGradient: "from-blue-600 to-purple-600",
  /** CTA button hover gradient */
  ctaGradientHover: "hover:from-blue-700 hover:to-purple-700",
  /** Section divider accent lines (left / right of label) */
  lineGradient: "from-blue-500 to-purple-500",
  /** Section label text colour */
  labelText: "text-blue-600 dark:text-blue-400",
  /** Progress bar / language skill bar */
  progressGradient: "from-blue-500 to-purple-500",
  /** Logo gradient */
  logoGradient:
    "from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400",
  /** Logo icon background */
  logoIcon: "from-blue-500 via-purple-500 to-pink-500",
} as const;

// ── Semantic section colours ──────────────────────────────────────────────────
// These map to CSS variables defined in index.css.
// Use them via Tailwind: bg-section-bg, text-heading, etc.

export const SECTION = {
  /** Alternating section background A: gray-50 / gray-900 */
  bgA: "bg-section-bg",
  /** Alternating section background B: white / gray-950 */
  bgB: "bg-section-alt",
  /** Card background: white / gray-800 */
  card: "bg-card-bg",
  /** Card border: gray-100 / gray-700 */
  cardBorder: "border-card-border",
  /** Heading text: gray-900 / white */
  heading: "text-heading",
  /** Body text: gray-600 / gray-300 */
  body: "text-body",
  /** Muted text: gray-500 / gray-400 */
  muted: "text-subtle",
} as const;

// ── Per-card accent palettes ──────────────────────────────────────────────────
// Used by WorkSection (project cards) and AboutMeSection (highlight boxes).
// Access by index: CARD_ACCENTS[index % CARD_ACCENTS.length]

export const CARD_ACCENTS = [
  {
    gradient: "from-blue-500 to-cyan-500",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200/60 dark:border-blue-800/40",
    chip: "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/50",
    highlight:
      "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700/50",
    highlightBg:
      "bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800/40",
    chipSolid:
      "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300",
    glow: "from-blue-500/10",
    num: "text-blue-100 dark:text-blue-900/60",
  },
  {
    gradient: "from-purple-500 to-pink-500",
    bg: "bg-purple-50 dark:bg-purple-950/30",
    border: "border-purple-200/60 dark:border-purple-800/40",
    chip: "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800/50",
    highlight:
      "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700/50",
    highlightBg:
      "bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-800/40",
    chipSolid:
      "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300",
    glow: "from-purple-500/10",
    num: "text-purple-100 dark:text-purple-900/60",
  },
  {
    gradient: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-200/60 dark:border-emerald-800/40",
    chip: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/50",
    highlight:
      "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/50",
    highlightBg:
      "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800/40",
    chipSolid:
      "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300",
    glow: "from-emerald-500/10",
    num: "text-emerald-100 dark:text-emerald-900/60",
  },
  {
    gradient: "from-orange-500 to-red-500",
    bg: "bg-orange-50 dark:bg-orange-950/30",
    border: "border-orange-200/60 dark:border-orange-800/40",
    chip: "bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800/50",
    highlight:
      "bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-700/50",
    highlightBg:
      "bg-orange-50 dark:bg-orange-900/20 border-orange-100 dark:border-orange-800/40",
    chipSolid:
      "bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300",
    glow: "from-orange-500/10",
    num: "text-orange-100 dark:text-orange-900/60",
  },
] as const;

export type CardAccent = (typeof CARD_ACCENTS)[number];

// ── Skills category accent palettes ──────────────────────────────────────────
// Used by SkillsSection. Keys must match category names.

export const SKILL_ACCENTS: Record<
  string,
  { gradient: string; border: string; bg: string; glow: string }
> = {
  Frontend: {
    gradient: "from-blue-500 to-cyan-500",
    border: "border-blue-200 dark:border-blue-800/50",
    bg: "bg-blue-50/50 dark:bg-blue-950/20",
    glow: "group-hover:shadow-blue-500/10",
  },
  Backend: {
    gradient: "from-purple-500 to-pink-500",
    border: "border-purple-200 dark:border-purple-800/50",
    bg: "bg-purple-50/50 dark:bg-purple-950/20",
    glow: "group-hover:shadow-purple-500/10",
  },
  Databases: {
    gradient: "from-orange-500 to-red-500",
    border: "border-orange-200 dark:border-orange-800/50",
    bg: "bg-orange-50/50 dark:bg-orange-950/20",
    glow: "group-hover:shadow-orange-500/10",
  },
  DevOps: {
    gradient: "from-emerald-500 to-teal-500",
    border: "border-emerald-200 dark:border-emerald-800/50",
    bg: "bg-emerald-50/50 dark:bg-emerald-950/20",
    glow: "group-hover:shadow-emerald-500/10",
  },
};
