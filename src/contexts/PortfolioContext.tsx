/**
 * PortfolioContext — non-translatable site data (URLs, contacts, technologies).
 * All translatable content (hero, about, projects, experiences, languages, nav)
 * is pulled from I18nContext so it switches automatically with the locale.
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

// ── Non-translatable static defaults ──────────────────────────────────────────

const DEFAULTS = {
  siteName:        "Yemi Genderson",
  siteDescription: "Full Stack Developer",
  author:          "Yemi Genderson",
  email:           "yemi@example.com",
  phone:           "+51 (123) 456-7890",
  location:        "Lima, Peru",
  cvUrl:           "/portfolio/cv-yemi-genderson.pdf",

  socialLinks: {
    github:    "https://github.com/yemigenderson",
    linkedin:  "https://linkedin.com/in/yemigenderson",
    whatsapp:  "https://wa.me/51987654321",
    instagram: "https://instagram.com/yemigenderson",
  },

  technologies: [
    { label: "JavaScript",  url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", iconName: "javascript",  category: "Frontend"  },
    { label: "TypeScript",  url: "https://www.typescriptlang.org/",                          iconName: "typescript",  category: "Frontend"  },
    { label: "React",       url: "https://react.dev/",                                       iconName: "react",       category: "Frontend"  },
    { label: "Vite",        url: "https://vitejs.dev/",                                      iconName: "vite",        category: "Frontend"  },
    { label: "Tailwindcss", url: "https://tailwindcss.com/",                                 iconName: "tailwindcss", category: "Frontend"  },
    { label: "Java",        url: "https://www.java.com/",                                    iconName: "java",        category: "Backend"   },
    { label: "Spring Boot", url: "https://spring.io/projects/spring-boot",                   iconName: "spring",      category: "Backend"   },
    { label: "Quarkus",     url: "https://quarkus.io/",                                      iconName: "quarkus",     category: "Backend"   },
    { label: "Node.js",     url: "https://nodejs.org/en",                                    iconName: "nodejs",      category: "Backend"   },
    { label: "Express.js",  url: "https://expressjs.com/",                                   iconName: "expressjs",   category: "Backend"   },
    { label: "MongoDB",     url: "https://www.mongodb.com/",                                 iconName: "mongodb",     category: "Databases" },
    { label: "PostgreSQL",  url: "https://www.postgresql.org/",                              iconName: "postgresql",  category: "Databases" },
    { label: "SQL Server",  url: "https://www.microsoft.com/en-us/sql-server",               iconName: "sqlserver",   category: "Databases" },
    { label: "Docker",      url: "https://www.docker.com/",                                  iconName: "docker",      category: "DevOps"    },
    { label: "Linux",       url: "https://www.linux.org/",                                   iconName: "linux",       category: "DevOps"    },
    { label: "Git",         url: "https://git-scm.com/",                                     iconName: "git",         category: "DevOps"    },
  ] satisfies TechDetails[],

  testimonials: [
    { personName: "John Doe",      title: "CEO - Tech Company",       testimonial: "Working with this developer was an absolute pleasure. Highly recommended for any complex project!" },
    { personName: "Jane Smith",    title: "Product Manager - Startup", testimonial: "Outstanding work on our recent project. Great attention to detail and excellent communication throughout." },
    { personName: "Mike Johnson",  title: "Freelancer",               testimonial: "Delivered exactly what was promised on time. Professional and skilled developer." },
  ] satisfies TestimonialDetails[],

  externalLinks: {
    GITHUB:   "https://github.com",
    TWITTER:  "https://twitter.com",
    LINKEDIN: "https://www.linkedin.com",
  },

  /** Hero image — not translatable */
  heroImage:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop",
};

/** Default technologies exported for AdminPage initialization. */
export const DEFAULT_TECHNOLOGIES = DEFAULTS.technologies;

/** Build the static (non-translatable) data, merging any admin overrides. */
function buildStatic() {
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
    technologies: cfg.technologies ?? DEFAULTS.technologies,
  };
}

// ── Provider ──────────────────────────────────────────────────────────────────

export const PortfolioProvider: React.FC<PortfolioProviderProps> = ({
  children,
  value,
}) => {
  const i18n = useContext(I18nContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const id = requestAnimationFrame(() => setIsLoading(false));
    return () => cancelAnimationFrame(id);
  }, []);

  // Rebuild static each render so overrides from localStorage are always fresh
  const STATIC = buildStatic();

  // Locale-driven content (falls back to Spanish if I18nContext is absent)
  const locale = i18n?.t;

  const heroLocale = locale?.hero;
  const aboutLocale = locale?.about;

  const projects: ProjectDetails[] = (locale?.projects ?? []) as ProjectDetails[];
  const experiences: ExperienceDetails[] = (locale?.experiences ?? []) as ExperienceDetails[];
  const languages: LanguageDetails[] = (locale?.languages ?? []) as LanguageDetails[];

  const mergedValue: PortfolioContextType = {
    ...STATIC,
    ...(value ?? {}),
    isLoading,

    navLinks: locale?.nav ?? [],

    about: {
      title:      (aboutLocale ? `${locale!.ui.about.title} 👨‍💻` : ""),
      paragraphs: aboutLocale?.paragraphs ?? [],
      highlights: aboutLocale?.highlights ?? [],
      closing:    aboutLocale?.closing ?? "",
    },

    hero: {
      badge:       heroLocale?.badge       ?? "",
      title:       heroLocale?.title       ?? "",
      description: heroLocale?.description ?? "",
      location:    heroLocale?.location    ?? "",
      status:      heroLocale?.status      ?? "",
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
