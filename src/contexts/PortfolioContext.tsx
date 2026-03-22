import React, { createContext, useEffect, useState } from "react";
import type {
  ProjectDetails,
  TechDetails,
  TestimonialDetails,
  ExperienceDetails,
  LanguageDetails,
} from "@/lib/types";

interface PortfolioContextType {
  // Site Info
  siteName: string;
  siteDescription: string;
  author: string;
  email: string;
  phone: string;
  location: string;
  cvUrl: string;

  // Navigation
  navLinks: Array<{ label: string; href: string }>;
  socialLinks: Array<{ url: string }>;

  // About Section
  about: {
    title: string;
    paragraphs: string[];
    highlights: Array<{ items: string[] }>;
    closing: string;
  };

  // Hero Section
  hero: {
    badge: string;
    title: string;
    description: string;
    location: string;
    status: string;
    image: string;
  };

  // Content
  technologies: TechDetails[];
  projects: ProjectDetails[];
  testimonials: TestimonialDetails[];
  experiences: ExperienceDetails[];
  languages: LanguageDetails[];

  // External Links
  externalLinks: {
    GITHUB: string;
    TWITTER: string;
    LINKEDIN: string;
  };

  // Loading state
  isLoading: boolean;

  // Methods
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

const defaultPortfolioData: PortfolioContextType = {
  // Site Info
  siteName: "Yemi Genderson",
  siteDescription: "Full Stack Developer",
  author: "Yemi Genderson",
  email: "yemi@example.com",
  phone: "+51 (123) 456-7890",
  location: "Lima, Peru",
  cvUrl: "/portfolio/cv-yemi-genderson.pdf",

  // Navigation
  navLinks: [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Work", href: "#work" },
    { label: "Contact", href: "#contact" },
  ],

  socialLinks: [
    { url: "https://github.com/yemigenderson" },
    { url: "https://linkedin.com/in/yemigenderson" },
    { url: "https://wa.me/51987654321" },
    { url: "https://instagram.com/yemigenderson" },
  ],

  // About Section
  about: {
    title: "¿Quieres saber más? Aquí está 👨‍💻",
    paragraphs: [
      "Soy Yemi Genderson, un Full Stack Developer apasionado con experiencia en el desarrollo de aplicaciones empresariales de alto rendimiento. Mi especialidad es crear soluciones que combinan frontend moderno (React, TypeScript) con backends robustos en Java (Spring Boot y Quarkus).",
      "He trabajado en proyectos bancarios de Lima, Perú, donde he aplicado mejores prácticas en seguridad, optimización de rendimiento y arquitectura de software. Estoy comprometido con escribir código limpio, mantenible y eficiente que cumple con los más altos estándares de calidad.",
      "Me apasiona trabajar en proyectos desafiantes que requieren soluciones innovadoras. Desde la ideación hasta la implementación y deployment, me gusta estar involucrado en todo el ciclo de desarrollo, asegurando que cada proyecto sea un éxito.",
    ],
    highlights: [
      {
        items: [
          "React & TypeScript",
          "Java Spring Boot & Quarkus",
          "Arquitectura de microservicios",
        ],
      },
      {
        items: ["Proyectos bancarios", "Alto rendimiento", "Lima, Perú"],
      },
      {
        items: ["Aprendizaje continuo", "Mejores prácticas", "Código limpio"],
      },
    ],
    closing:
      "¿Tienes un proyecto desafiante? ¡Me encantaría trabajar contigo! 🚀",
  },

  // Hero Section
  hero: {
    badge: "⚡ Full Stack Developer",
    title: "Hola, soy Yemi Genderson 👋",
    description:
      "Full Stack Developer con especialización en React para frontend y Java (Spring Boot, Quarkus) para backend. Diseño y desarrollo de aplicaciones de alto rendimiento en proyectos bancarios. Mi pasión es crear soluciones escalables, seguras y eficientes que transforman ideas en realidad.",
    location: "Lima, Perú",
    status: "Disponible para nuevos proyectos",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop",
  },

  // Technologies
  technologies: [
    {
      label: "JavaScript",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      iconName: "javascript",
    },
    {
      label: "TypeScript",
      url: "https://www.typescriptlang.org/",
      iconName: "typescript",
    },
    { label: "React", url: "https://react.dev/", iconName: "react" },
    { label: "Vite", url: "https://vitejs.dev/", iconName: "vite" },
    { label: "Node.js", url: "https://nodejs.org/en", iconName: "nodejs" },
    {
      label: "Express.js",
      url: "https://expressjs.com/",
      iconName: "expressjs",
    },
    { label: "MongoDB", url: "https://www.mongodb.com/", iconName: "mongodb" },
    {
      label: "PostgreSQL",
      url: "https://www.postgresql.org/",
      iconName: "postgresql",
    },
    {
      label: "Tailwindcss",
      url: "https://tailwindcss.com/",
      iconName: "tailwindcss",
    },
    { label: "Git", url: "https://git-scm.com/", iconName: "git" },
    { label: "Java", url: "https://www.java.com/", iconName: "java" },
    {
      label: "Spring Boot",
      url: "https://spring.io/projects/spring-boot",
      iconName: "spring",
    },
    {
      label: "Quarkus",
      url: "https://quarkus.io/",
      iconName: "quarkus",
    },
    {
      label: "SQL Server",
      url: "https://www.microsoft.com/en-us/sql-server",
      iconName: "sqlserver",
    },
    { label: "Docker", url: "https://www.docker.com/", iconName: "docker" },
    { label: "Linux", url: "https://www.linux.org/", iconName: "linux" },
  ],

  // Projects
  projects: [
    {
      name: "Rate Limiting System",
      description:
        "Sistema de limitación de tasas event-driven que corta transacciones que superan umbrales definidos. Implementé orquestación mediante Saga pattern para garantizar consistencia distribuida. El sistema emite eventos de auditoría en cada transacción rechazada, permitiendo trazabilidad completa y análisis de patrones de fraude. Diseñado para mercados de pagos de alto volumen con latencia crítica.",
      url: "https://github.com",
      technologies: [
        "Java",
        "Spring Boot",
        "Apache Kafka",
        "Event Sourcing",
        "Saga Pattern",
      ],
    },
    {
      name: "Resilience Proxy",
      description:
        "Proxy de resiliencia que mockea todas las peticiones a servicios externos con fallback automático a respuestas cacheadas. Cuando un servicio externo experimenta fallos, el sistema responde con datos previamente almacenados garantizando continuidad. Implementé tópicos de eventos internos que emiten alertas cuando se detecta alta tasa de errores, notificando automáticamente al equipo de soporte para investigación inmediata.",
      url: "https://github.com",
      technologies: [
        "Spring Cloud",
        "Resilience4j",
        "Apache Kafka",
        "Redis",
        "Spring Boot",
      ],
    },
    {
      name: "Monitoring & Alerting Platform",
      description:
        "Plataforma integral de monitoreo y alertas con integraciones a Grafana, ELK Stack, y machine learning de Grafana. Implementé automatización en Jira para creación de tickets automáticos ante anomalías detectadas. Integración con Power Automate para notificaciones en tiempo real al equipo de soporte con métricas contextuales y recomendaciones de acción. Detección de comportamientos anómalos mediante algoritmos ML predictivos.",
      url: "https://github.com",
      technologies: [
        "Grafana",
        "ELK Stack",
        "Grafana ML",
        "Jira",
        "Power Automate",
        "Python",
      ],
    },
    {
      name: "Database Migration (On-Premise to Cloud)",
      description:
        "Migración compleja de base de datos on-premise a cloud con 20 millones de registros. Diseñé y ejecuté pipelines ETL robustos usando SQL Server Data Factory con transformaciones en Scala. Implementé validaciones de integridad de datos, sincronización bidireccional durante la transición, y roll-back automático en caso de fallos. Optimicé índices y particiones para mejorar rendimiento post-migración en 35%.",
      url: "https://github.com",
      technologies: [
        "SQL Server",
        "Azure Data Factory",
        "Scala",
        "Azure",
        "ETL",
      ],
    },
  ],

  // Testimonials
  testimonials: [
    {
      personName: "John Doe",
      title: "CEO - Tech Company",
      testimonial:
        "Working with this developer was an absolute pleasure. Highly recommended for any complex project!",
    },
    {
      personName: "Jane Smith",
      title: "Product Manager - Startup",
      testimonial:
        "Outstanding work on our recent project. Great attention to detail and excellent communication throughout.",
    },
    {
      personName: "Mike Johnson",
      title: "Freelancer",
      testimonial:
        "Delivered exactly what was promised on time. Professional and skilled developer.",
    },
  ],

  // Experiences
  experiences: [
    {
      logoAlt: "BCP logo",
      company: "Banco de Crédito del Perú (BCP)",
      position: "Senior Full Stack Developer",
      startDate: new Date(2022, 5),
      currentlyWorkHere: true,
      summary: [
        "Diseño e implementación de sistemas de Rate Limiting con Saga Pattern sobre Apache Kafka para transacciones de alto volumen",
        "Desarrollo de Resilience Proxy con fallback automático y sistema de alertas en tiempo real para servicios críticos bancarios",
        "Migración de base de datos on-premise a Azure Cloud con 20M registros usando Azure Data Factory y pipelines ETL en Scala",
        "Liderazgo técnico del squad de plataforma, definiendo estándares de arquitectura y revisión de código",
      ],
    },
    {
      logoAlt: "Interbank logo",
      company: "Interbank",
      position: "Full Stack Developer",
      startDate: new Date(2020, 8),
      endDate: new Date(2022, 4),
      summary: [
        "Desarrollo de APIs REST y microservicios con Java Spring Boot y Quarkus para el módulo de pagos digitales",
        "Implementación de plataforma de monitoreo y alertas con Grafana, ELK Stack y predicciones ML para detectar anomalías",
        "Creación de dashboards en React/TypeScript consumiendo métricas en tiempo real con WebSockets",
        "Integración con Jira y Power Automate para automatización de incidencias y notificaciones al equipo de soporte",
      ],
    },
    {
      logoAlt: "Niubiz logo",
      company: "Niubiz",
      position: "Backend Developer",
      startDate: new Date(2019, 2),
      endDate: new Date(2020, 7),
      summary: [
        "Desarrollo de microservicios de procesamiento de pagos con Java Spring Boot y arquitectura event-driven",
        "Optimización de consultas SQL Server reduciendo tiempos de respuesta en un 40% en módulos críticos de transacciones",
        "Implementación de pruebas unitarias e integración con JUnit 5 y Testcontainers, alcanzando 85% de cobertura",
      ],
    },
  ],

  // Languages
  languages: [
    {
      name: "Español",
      flag: "🇵🇪",
      level: "Nativo",
      proficiency: 100,
    },
    {
      name: "English",
      flag: "🇺🇸",
      level: "Professional",
      proficiency: 80,
    },
  ],

  // External Links
  externalLinks: {
    GITHUB: "https://github.com",
    TWITTER: "https://twitter.com",
    LINKEDIN: "https://www.linkedin.com",
  },

  // Loading state
  isLoading: false,

  // Methods
  getProjectByName: () => undefined,
  getTechByLabel: () => undefined,
};

export const PortfolioProvider: React.FC<PortfolioProviderProps> = ({
  children,
  value,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // One animation frame is enough to let the initial paint happen
    // before we reveal real content, giving skeletons a chance to show.
    const id = requestAnimationFrame(() => setIsLoading(false));
    return () => cancelAnimationFrame(id);
  }, []);

  const mergedValue: PortfolioContextType = {
    ...defaultPortfolioData,
    ...value,
    isLoading,
    getProjectByName: (name: string) => {
      const data = value || defaultPortfolioData;
      return data.projects?.find((p) => p.name === name);
    },
    getTechByLabel: (label: string) => {
      const data = value || defaultPortfolioData;
      return data.technologies?.find((t) => t.label === label);
    },
  };

  return (
    <PortfolioContext.Provider value={mergedValue}>
      {children}
    </PortfolioContext.Provider>
  );
};

export default PortfolioContext;
