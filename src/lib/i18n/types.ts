/**
 * Full locale shape. Every translatable string in the portfolio lives here.
 * Non-translatable data (URLs, emails, technologies, social links) stays in
 * PortfolioContext.
 */

export type LangCode = "es" | "en";

export interface NavLink {
  label: string;
  href: string;
}

export interface ProjectLocale {
  name: string;
  description: string;
  /** Non-translatable — same value in every locale */
  url: string;
  /** Non-translatable — same value in every locale */
  technologies: string[];
}

export interface ExperienceLocale {
  logoAlt: string;
  company: string;
  position: string;
  currentlyWorkHere?: boolean;
  /** Non-translatable */
  startDate: Date;
  /** Non-translatable */
  endDate?: Date;
  summary: string[];
}

export interface LanguageLocale {
  name: string;
  flag: string;
  level: string;
  proficiency: number;
}

// ── Section-level UI strings ──────────────────────────────────────────────────

export interface HeroLocale {
  badge: string;
  title: string;
  description: string;
  location: string;
  status: string;
}

export interface AboutLocale {
  paragraphs: string[];
  highlights: Array<{ items: string[] }>;
  closing: string;
}

export interface UIStrings {
  // ── Common ──────────────────────────────────────────────
  scroll: string;

  // ── Hero ────────────────────────────────────────────────
  hero: {
    contactBtn: string;
    viewWorkBtn: string;
    downloadCV: string;
    statYears: string;
    statTech: string;
    statProjects: string;
  };

  // ── About ───────────────────────────────────────────────
  about: {
    sectionLabel: string;
    title: string;
    languagesLabel: string;
    availableRemote: string;
    yearsExp: string;
    experienceOf: string;
    openToWork: string;
  };

  // ── Skills ──────────────────────────────────────────────
  skills: {
    sectionLabel: string;
    title1: string;
    title2: string;
    subtitle: string;
    allFilter: string;
    categoryLabels: Record<string, string>;
  };

  // ── Experience ──────────────────────────────────────────
  experience: {
    sectionLabel: string;
    title: string;
    subtitle: string;
    currentLabel: string;
    presentLabel: string;
  };

  // ── Work ────────────────────────────────────────────────
  work: {
    sectionLabel: string;
    title1: string;
    title2: string;
    subtitle: string;
    viewOnGithub: string;
  };

  // ── Contact ─────────────────────────────────────────────
  contact: {
    sectionLabel: string;
    title1: string;
    title2: string;
    subtitle: string;
    available: string;
    responseTime: string;
    responseValue: string;
    socialLabel: string;
    emailLabel: string;
    phoneLabel: string;
    copy: string;
    copied: string;
    ctaTitle: string;
    ctaSubtitle: string;
    ctaHighlights: string[];
    ctaButton: string;
  };
}

// ── Full locale ───────────────────────────────────────────────────────────────

export interface Locale {
  lang: LangCode;
  nav: NavLink[];
  hero: HeroLocale;
  about: AboutLocale;
  experiences: ExperienceLocale[];
  projects: ProjectLocale[];
  languages: LanguageLocale[];
  ui: UIStrings;
}
