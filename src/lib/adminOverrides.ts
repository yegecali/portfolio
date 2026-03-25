/**
 * Admin overrides — localStorage-based configuration that overrides
 * the default values in PortfolioContext and I18nContext.
 *
 * Portfolio owners can edit their data from /admin without touching code.
 */

export const ADMIN_STORAGE_KEY = "portfolio_admin_cfg";

// ── Personal / static overrides ──────────────────────────────────────────────

export interface PersonalConfig {
  siteName?: string;
  siteDescription?: string;
  email?: string;
  phone?: string;
  location?: string;
  cvUrl?: string;
  heroImage?: string;
}

export interface SocialConfig {
  github?: string;
  linkedin?: string;
  whatsapp?: string;
  instagram?: string;
}

// ── i18n content overrides ────────────────────────────────────────────────────

export interface HeroConfig {
  badge?: string;
  title?: string;
  description?: string;
  location?: string;
  status?: string;
}

export interface AboutConfig {
  paragraph0?: string;
  paragraph1?: string;
  paragraph2?: string;
  closing?: string;
}

export interface ProjectOverrideItem {
  name: string;
  description: string;
  url: string;
  technologies: string[];
}

export interface ExperienceOverrideItem {
  company: string;
  position: string;
  logoAlt: string;
  summary: string[];
  startDate: string;       // "YYYY-MM"
  endDate?: string;        // "YYYY-MM" | undefined = present
  currentlyWorkHere?: boolean;
}

// ── Root config shape ─────────────────────────────────────────────────────────

export interface AdminConfig {
  personal?: PersonalConfig;
  social?: SocialConfig;
  hero?: { es?: HeroConfig; en?: HeroConfig };
  about?: { es?: AboutConfig; en?: AboutConfig };
  projects?: { es?: ProjectOverrideItem[]; en?: ProjectOverrideItem[] };
  experiences?: { es?: ExperienceOverrideItem[]; en?: ExperienceOverrideItem[] };
}

// ── Utilities ─────────────────────────────────────────────────────────────────

export function readAdminConfig(): AdminConfig {
  try {
    const raw = localStorage.getItem(ADMIN_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AdminConfig) : {};
  } catch {
    return {};
  }
}

export function writeAdminConfig(config: AdminConfig): void {
  localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(config));
}

export function clearAdminConfig(): void {
  localStorage.removeItem(ADMIN_STORAGE_KEY);
}

/** Merge two partial configs deeply (second wins). */
export function mergeAdminConfig(
  base: AdminConfig,
  patch: AdminConfig
): AdminConfig {
  return {
    personal: { ...base.personal, ...patch.personal },
    social: { ...base.social, ...patch.social },
    hero: {
      es: { ...base.hero?.es, ...patch.hero?.es },
      en: { ...base.hero?.en, ...patch.hero?.en },
    },
    about: {
      es: { ...base.about?.es, ...patch.about?.es },
      en: { ...base.about?.en, ...patch.about?.en },
    },
    projects: {
      es: patch.projects?.es ?? base.projects?.es,
      en: patch.projects?.en ?? base.projects?.en,
    },
    experiences: {
      es: patch.experiences?.es ?? base.experiences?.es,
      en: patch.experiences?.en ?? base.experiences?.en,
    },
  };
}
