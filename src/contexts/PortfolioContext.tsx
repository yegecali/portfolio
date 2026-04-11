/**
 * PortfolioContext — non-translatable site data (URLs, contacts, technologies).
 * All translatable content (hero, about, projects, experiences, languages, nav)
 * is pulled from I18nContext so it switches automatically with the locale.
 *
 * On mount the context attempts to load live data from the backend API
 * (GET /api/portfolio/{lang}). If the backend is unreachable it falls back
 * to the static defaults defined in src/lib/defaults.ts.
 */
import React, { createContext, useEffect, useState, useContext } from "react";
import type {
  ProjectDetails,
  TechDetails,
  TestimonialDetails,
  ExperienceDetails,
  LanguageDetails,
} from "@/lib/types";
import I18nContext from "@/contexts/I18nContext";
import { readAdminConfig } from "@/lib/adminOverrides";
import { DEFAULTS } from "@/lib/defaults";
import { api } from "@/lib/api";
import type { FullPortfolioOut } from "@/lib/api";

interface PortfolioContextType {
  // ── Site meta ─────────────────────────────────────────────────────────────
  siteName: string;
  siteDescription: string;
  author: string;
  email: string;
  phone: string;
  location: string;
  cvUrl: string;

  // ── Navigation (locale-driven) ────────────────────────────────────────────
  navLinks: Array<{ label: string; href: string }>;
  socialLinks: Array<{ url: string }>;

  // ── Translatable sections (locale-driven) ─────────────────────────────────
  about: {
    title: string;
    paragraphs: string[];
    highlights: Array<{ items: string[] }>;
    closing: string;
  };
  hero: {
    badge: string;
    title: string;
    description: string;
    location: string;
    status: string;
    image: string;
  };

  // ── Static content ────────────────────────────────────────────────────────
  technologies: TechDetails[];
  projects: ProjectDetails[];
  testimonials: TestimonialDetails[];
  experiences: ExperienceDetails[];
  languages: LanguageDetails[];

  externalLinks: {
    GITHUB: string;
    TWITTER: string;
    LINKEDIN: string;
  };

  // ── Loading state ─────────────────────────────────────────────────────────
  isLoading: boolean;

  // ── Methods ───────────────────────────────────────────────────────────────
  getProjectByName: (name: string) => ProjectDetails | undefined;
  getTechByLabel: (label: string) => TechDetails | undefined;
}

interface PortfolioProviderProps {
  children: React.ReactNode;
  value?: Partial<PortfolioContextType>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(
  undefined,
);

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Parse "YYYY-MM" string into a Date (1st of that month). */
function parseYYYYMM(str: string): Date {
  const [year, month] = str.split("-").map(Number);
  return new Date(year, month - 1);
}

/**
 * Map a FullPortfolioOut (backend response) onto the static shape used by the
 * context, applying localStorage admin overrides on top.
 */
function buildStaticFromApi(data: FullPortfolioOut) {
  const cfg = readAdminConfig();
  const adminP = cfg.personal ?? {};
  const p = data.personal;
  return {
    ...DEFAULTS,
    siteName:        adminP.siteName        ?? p.name        ?? DEFAULTS.siteName,
    siteDescription: adminP.siteDescription ?? p.role        ?? DEFAULTS.siteDescription,
    author:          adminP.siteName        ?? p.name        ?? DEFAULTS.author,
    email:           adminP.email           ?? p.email       ?? DEFAULTS.email,
    phone:           adminP.phone           ?? p.phone       ?? DEFAULTS.phone,
    location:        adminP.location        ?? p.location    ?? DEFAULTS.location,
    cvUrl:           adminP.cvUrl           ?? p.cv_url      ?? DEFAULTS.cvUrl,
    heroImage:       adminP.heroImage       ?? p.hero_image  ?? DEFAULTS.heroImage,
    socialLinks: [
      { url: cfg.social?.github    ?? p.github_url    ?? DEFAULTS.socialLinks.github    },
      { url: cfg.social?.linkedin  ?? p.linkedin_url  ?? DEFAULTS.socialLinks.linkedin  },
      { url: cfg.social?.whatsapp  ?? p.whatsapp_url  ?? DEFAULTS.socialLinks.whatsapp  },
      { url: cfg.social?.instagram ?? p.instagram_url ?? DEFAULTS.socialLinks.instagram },
    ],
    technologies: data.technologies.map((t) => ({
      label:    t.label,
      url:      t.url ?? "",
      iconName: t.icon_name ?? "",
    })) satisfies TechDetails[],
  };
}

/** Build the static data using only localStorage overrides (backend offline). */
function buildStaticFromDefaults() {
  const cfg = readAdminConfig();
  const p = cfg.personal ?? {};
  const s = cfg.social ?? {};
  return {
    ...DEFAULTS,
    siteName:        p.siteName        ?? DEFAULTS.siteName,
    siteDescription: p.siteDescription ?? DEFAULTS.siteDescription,
    author:          p.siteName        ?? DEFAULTS.author,
    email:           p.email           ?? DEFAULTS.email,
    phone:           p.phone           ?? DEFAULTS.phone,
    location:        p.location        ?? DEFAULTS.location,
    cvUrl:           p.cvUrl           ?? DEFAULTS.cvUrl,
    heroImage:       p.heroImage       ?? DEFAULTS.heroImage,
    socialLinks: [
      { url: s.github    ?? DEFAULTS.socialLinks.github    },
      { url: s.linkedin  ?? DEFAULTS.socialLinks.linkedin  },
      { url: s.whatsapp  ?? DEFAULTS.socialLinks.whatsapp  },
      { url: s.instagram ?? DEFAULTS.socialLinks.instagram },
    ],
  };
}

// ── Provider ──────────────────────────────────────────────────────────────────

export const PortfolioProvider: React.FC<PortfolioProviderProps> = ({
  children,
  value,
}) => {
  const i18n = useContext(I18nContext);
  const [isLoading, setIsLoading] = useState(true);
  const [apiData, setApiData] = useState<FullPortfolioOut | null>(null);

  // Fetch the full portfolio from the backend API for the current language.
  // Falls back gracefully to static defaults when the backend is offline.
  useEffect(() => {
    const lang = i18n?.lang ?? "es";
    api
      .getPortfolio(lang)
      .then((data) => setApiData(data))
      .catch(() => setApiData(null))
      .finally(() => setIsLoading(false));
  }, [i18n?.lang]);

  // Static non-translatable data — prefer API response, fall back to defaults.
  const STATIC = apiData ? buildStaticFromApi(apiData) : buildStaticFromDefaults();

  // Locale-driven content (falls back to Spanish if I18nContext is absent)
  const locale = i18n?.t;

  const heroLocale = locale?.hero;
  const aboutLocale = locale?.about;

  // When the backend is available use its translatable content directly,
  // otherwise fall back to the bundled i18n locale files.
  const projects: ProjectDetails[] = apiData
    ? apiData.projects.map((p) => ({
        name:        p.name,
        description: p.description,
        url:         p.url ?? "",
        technologies: p.technologies,
      }))
    : ((locale?.projects ?? []) as ProjectDetails[]);

  const experiences: ExperienceDetails[] = apiData
    ? apiData.experiences.map((e) => ({
        logoAlt:           e.logo_alt ?? "",
        company:           e.company,
        position:          e.position,
        currentlyWorkHere: e.currently_work_here,
        startDate:         parseYYYYMM(e.start_date),
        endDate:           e.end_date ? parseYYYYMM(e.end_date) : undefined,
        summary:           e.summary,
      }))
    : ((locale?.experiences ?? []) as ExperienceDetails[]);

  const languages: LanguageDetails[] = apiData
    ? apiData.spoken_languages.map((l) => ({
        name:        l.name,
        flag:        l.flag ?? "",
        level:       l.level,
        proficiency: l.proficiency,
      }))
    : ((locale?.languages ?? []) as LanguageDetails[]);

  const mergedValue: PortfolioContextType = {
    ...STATIC,
    ...(value ?? {}),
    isLoading,

    navLinks: apiData
      ? apiData.nav
      : (locale?.nav ?? []),

    about: {
      title:      (aboutLocale ? `${locale!.ui.about.title} 👨‍💻` : ""),
      paragraphs: apiData?.about.paragraphs ?? aboutLocale?.paragraphs ?? [],
      highlights: aboutLocale?.highlights ?? [],
      closing:    apiData?.about.closing   ?? aboutLocale?.closing ?? "",
    },

    hero: {
      badge:       apiData?.hero.badge       ?? heroLocale?.badge       ?? "",
      title:       apiData?.hero.title       ?? heroLocale?.title       ?? "",
      description: apiData?.hero.description ?? heroLocale?.description ?? "",
      location:    apiData?.hero.location    ?? heroLocale?.location    ?? "",
      status:      apiData?.hero.status      ?? heroLocale?.status      ?? "",
      image:       STATIC.heroImage,
    },

    projects,
    experiences,
    languages,

    getProjectByName: (name: string) =>
      projects.find((p) => p.name === name),
    getTechByLabel: (label: string) =>
      STATIC.technologies.find((t) => t.label === label),
  };

  return (
    <PortfolioContext.Provider value={mergedValue}>
      {children}
    </PortfolioContext.Provider>
  );
};

export default PortfolioContext;
