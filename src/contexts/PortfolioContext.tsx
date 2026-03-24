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

// ── Non-translatable static data ──────────────────────────────────────────────

const STATIC = {
  siteName:        "Yemi Genderson",
  siteDescription: "Full Stack Developer",
  author:          "Yemi Genderson",
  email:           "yemi@example.com",
  phone:           "+51 (123) 456-7890",
  location:        "Lima, Peru",
  cvUrl:           "/portfolio/cv-yemi-genderson.pdf",

  socialLinks: [
    { url: "https://github.com/yemigenderson"      },
    { url: "https://linkedin.com/in/yemigenderson" },
    { url: "https://wa.me/51987654321"             },
    { url: "https://instagram.com/yemigenderson"   },
  ],

  technologies: [
    { label: "JavaScript",  url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", iconName: "javascript"  },
    { label: "TypeScript",  url: "https://www.typescriptlang.org/",                          iconName: "typescript"  },
    { label: "React",       url: "https://react.dev/",                                       iconName: "react"       },
    { label: "Vite",        url: "https://vitejs.dev/",                                      iconName: "vite"        },
    { label: "Node.js",     url: "https://nodejs.org/en",                                    iconName: "nodejs"      },
    { label: "Express.js",  url: "https://expressjs.com/",                                   iconName: "expressjs"   },
    { label: "MongoDB",     url: "https://www.mongodb.com/",                                 iconName: "mongodb"     },
    { label: "PostgreSQL",  url: "https://www.postgresql.org/",                              iconName: "postgresql"  },
    { label: "Tailwindcss", url: "https://tailwindcss.com/",                                 iconName: "tailwindcss" },
    { label: "Git",         url: "https://git-scm.com/",                                     iconName: "git"         },
    { label: "Java",        url: "https://www.java.com/",                                    iconName: "java"        },
    { label: "Spring Boot", url: "https://spring.io/projects/spring-boot",                   iconName: "spring"      },
    { label: "Quarkus",     url: "https://quarkus.io/",                                      iconName: "quarkus"     },
    { label: "SQL Server",  url: "https://www.microsoft.com/en-us/sql-server",               iconName: "sqlserver"   },
    { label: "Docker",      url: "https://www.docker.com/",                                  iconName: "docker"      },
    { label: "Linux",       url: "https://www.linux.org/",                                   iconName: "linux"       },
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
