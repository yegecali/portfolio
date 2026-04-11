/**
 * Static default values for portfolio data.
 *
 * A single source of truth used by PortfolioContext and AdminPage.
 * When the backend is available these are overridden by the API response.
 */

import type { TechDetails, TestimonialDetails } from "@/lib/types";

export const DEFAULTS = {
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
    { label: "Node.js",     url: "https://nodejs.org/en",                                    iconName: "nodejs",      category: "Backend"   },
    { label: "Express.js",  url: "https://expressjs.com/",                                   iconName: "expressjs",   category: "Backend"   },
    { label: "Java",        url: "https://www.java.com/",                                    iconName: "java",        category: "Backend"   },
    { label: "Spring Boot", url: "https://spring.io/projects/spring-boot",                   iconName: "spring",      category: "Backend"   },
    { label: "Quarkus",     url: "https://quarkus.io/",                                      iconName: "quarkus",     category: "Backend"   },
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

  heroImage:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop",
} as const;
