import type { Locale } from "./types";

export const es: Locale = {
  lang: "es",

  // ── Navigation ─────────────────────────────────────────────────────────────
  nav: [
    { label: "Inicio",      href: "#hero"       },
    { label: "Sobre mí",    href: "#about"       },
    { label: "Skills",      href: "#skills"      },
    { label: "Experiencia", href: "#experience"  },
    { label: "Proyectos",   href: "#work"        },
    { label: "Contacto",    href: "#contact"     },
  ],

  // ── Hero ───────────────────────────────────────────────────────────────────
  hero: {
    badge:       "⚡ Full Stack Developer",
    title:       "Hola, soy Yemi Genderson 👋",
    description:
      "Full Stack Developer con especialización en React para frontend y Java (Spring Boot, Quarkus) para backend. Diseño y desarrollo de aplicaciones de alto rendimiento en proyectos bancarios. Mi pasión es crear soluciones escalables, seguras y eficientes que transforman ideas en realidad.",
    location: "Lima, Perú",
    status:   "Disponible para nuevos proyectos",
  },

  // ── About ──────────────────────────────────────────────────────────────────
  about: {
    paragraphs: [
      "Soy Yemi Genderson, un Full Stack Developer apasionado con experiencia en el desarrollo de aplicaciones empresariales de alto rendimiento. Mi especialidad es crear soluciones que combinan frontend moderno (React, TypeScript) con backends robustos en Java (Spring Boot y Quarkus).",
      "He trabajado en proyectos bancarios de Lima, Perú, donde he aplicado mejores prácticas en seguridad, optimización de rendimiento y arquitectura de software. Estoy comprometido con escribir código limpio, mantenible y eficiente que cumple con los más altos estándares de calidad.",
      "Me apasiona trabajar en proyectos desafiantes que requieren soluciones innovadoras. Desde la ideación hasta la implementación y deployment, me gusta estar involucrado en todo el ciclo de desarrollo, asegurando que cada proyecto sea un éxito.",
    ],
    highlights: [
      { items: ["React & TypeScript", "Java Spring Boot & Quarkus", "Arquitectura de microservicios"] },
      { items: ["Proyectos bancarios", "Alto rendimiento", "Lima, Perú"] },
      { items: ["Aprendizaje continuo", "Mejores prácticas", "Código limpio"] },
    ],
    closing: "¿Tienes un proyecto desafiante? ¡Me encantaría trabajar contigo! 🚀",
  },

  // ── Experiences ────────────────────────────────────────────────────────────
  experiences: [
    {
      logoAlt:            "BCP logo",
      company:            "BCP",
      position:           "Full Stack Developer Senior",
      currentlyWorkHere:  true,
      startDate:          new Date(2022, 4),
      summary: [
        "Liderazgo técnico en el desarrollo del sistema de Rate Limiting event-driven para el módulo de pagos con Java Spring Boot y Apache Kafka",
        "Diseño e implementación de Resilience Proxy con fallback automático a caché para garantizar continuidad del servicio ante fallos de servicios externos",
        "Reducción de incidentes críticos en un 40% mediante implementación de circuit breakers y retry policies con Resilience4j",
        "Mentoría a un equipo de 4 desarrolladores junior en mejores prácticas de arquitectura de microservicios y DDD",
      ],
    },
    {
      logoAlt:   "Interbank logo",
      company:   "Interbank",
      position:  "Full Stack Developer",
      startDate: new Date(2020, 8),
      endDate:   new Date(2022, 4),
      summary: [
        "Desarrollo de APIs REST y microservicios con Java Spring Boot y Quarkus para el módulo de pagos digitales",
        "Implementación de plataforma de monitoreo y alertas con Grafana, ELK Stack y predicciones ML para detectar anomalías",
        "Creación de dashboards en React/TypeScript consumiendo métricas en tiempo real con WebSockets",
        "Integración con Jira y Power Automate para automatización de incidencias y notificaciones al equipo de soporte",
      ],
    },
    {
      logoAlt:   "Niubiz logo",
      company:   "Niubiz",
      position:  "Backend Developer",
      startDate: new Date(2019, 2),
      endDate:   new Date(2020, 7),
      summary: [
        "Desarrollo de microservicios de procesamiento de pagos con Java Spring Boot y arquitectura event-driven",
        "Optimización de consultas SQL Server reduciendo tiempos de respuesta en un 40% en módulos críticos de transacciones",
        "Implementación de pruebas unitarias e integración con JUnit 5 y Testcontainers, alcanzando 85% de cobertura",
      ],
    },
  ],

  // ── Projects ───────────────────────────────────────────────────────────────
  projects: [
    {
      name:        "Rate Limiting System",
      description: "Sistema de limitación de tasas event-driven que corta transacciones que superan umbrales definidos. Implementé orquestación mediante Saga pattern para garantizar consistencia distribuida. El sistema emite eventos de auditoría en cada transacción rechazada, permitiendo trazabilidad completa y análisis de patrones de fraude. Diseñado para mercados de pagos de alto volumen con latencia crítica.",
      url:          "https://github.com",
      technologies: ["Java", "Spring Boot", "Apache Kafka", "Event Sourcing", "Saga Pattern"],
    },
    {
      name:        "Resilience Proxy",
      description: "Proxy de resiliencia que mockea todas las peticiones a servicios externos con fallback automático a respuestas cacheadas. Cuando un servicio externo experimenta fallos, el sistema responde con datos previamente almacenados garantizando continuidad. Implementé tópicos de eventos internos que emiten alertas cuando se detecta alta tasa de errores, notificando automáticamente al equipo de soporte para investigación inmediata.",
      url:          "https://github.com",
      technologies: ["Spring Cloud", "Resilience4j", "Apache Kafka", "Redis", "Spring Boot"],
    },
    {
      name:        "Monitoring & Alerting Platform",
      description: "Plataforma integral de monitoreo y alertas con integraciones a Grafana, ELK Stack, y machine learning de Grafana. Implementé automatización en Jira para creación de tickets automáticos ante anomalías detectadas. Integración con Power Automate para notificaciones en tiempo real al equipo de soporte con métricas contextuales y recomendaciones de acción. Detección de comportamientos anómalos mediante algoritmos ML predictivos.",
      url:          "https://github.com",
      technologies: ["Grafana", "ELK Stack", "Grafana ML", "Jira", "Power Automate", "Python"],
    },
    {
      name:        "Database Migration (On-Premise to Cloud)",
      description: "Migración compleja de base de datos on-premise a cloud con 20 millones de registros. Diseñé y ejecuté pipelines ETL robustos usando SQL Server Data Factory con transformaciones en Scala. Implementé validaciones de integridad de datos, sincronización bidireccional durante la transición, y roll-back automático en caso de fallos. Optimicé índices y particiones para mejorar rendimiento post-migración en 35%.",
      url:          "https://github.com",
      technologies: ["SQL Server", "Azure Data Factory", "Scala", "Azure", "ETL"],
    },
  ],

  // ── Languages ──────────────────────────────────────────────────────────────
  languages: [
    { name: "Español", flag: "🇵🇪", level: "Nativo",       proficiency: 100 },
    { name: "English", flag: "🇺🇸", level: "Professional", proficiency: 80  },
  ],

  // ── Personal Info ──────────────────────────────────────────────────────────
  personalInfo: {
    fullName: "Yemi Genderson",
    role: "Full Stack Developer",
    shortDescription: "Full Stack Developer especializado en sistemas bancarios de alto rendimiento. Construyendo soluciones escalables con Java y React.",
    brandName: "Yemi.dev",
  },

  // ── Language Options ───────────────────────────────────────────────────────
  languageOptions: [
    { code: "es", flag: "🇵🇪", short: "ES" },
    { code: "en", flag: "🇺🇸", short: "EN" },
  ],

  // ── Skills Config ──────────────────────────────────────────────────────────
  skillsConfig: {
    categoryLabels: {
      Frontend:  "Interfaces modernas y responsivas",
      Backend:   "APIs robustas y microservicios",
      Databases: "Almacenamiento y persistencia",
      DevOps:    "Infraestructura y despliegue",
    },
    categoryIcons: {
      Frontend:  "⚛️",
      Backend:   "🔧",
      Databases: "🗄️",
      DevOps:    "🚀",
    },
    categories: {
      Frontend:  ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      Backend:   ["Java", "Spring Boot", "Quarkus", "Apache Kafka"],
      Databases: ["PostgreSQL", "SQL Server", "Redis", "MongoDB"],
      DevOps:    ["Docker", "Kubernetes", "AWS", "CI/CD"],
    },
  },

  // ── Footer Strings ────────────────────────────────────────────────────────
  footerStrings: {
    builtWith: "usando React & TypeScript",
  },

  // ── UI strings ─────────────────────────────────────────────────────────────
  ui: {
    scroll: "Scroll",

    hero: {
      contactBtn:   "Contáctame",
      viewWorkBtn:  "Ver mi trabajo",
      downloadCV:   "Descargar CV",
      statYears:    "Años de exp.",
      statTech:     "Tecnologías",
      statProjects: "Proyectos",
    },

    about: {
      sectionLabel:   "Sobre mí",
      title:          "¿Quieres saber más? Aquí está",
      languagesLabel: "Idiomas",
      availableRemote:"Disponible remote",
      yearsExp:       "5+ años",
      experienceOf:   "de experiencia",
      openToWork:     "Open to work",
    },

    skills: {
      sectionLabel: "Stack técnico",
      title1:       "Mis",
      title2:       "Habilidades",
      subtitle:     "Stack completo especializado en desarrollo bancario de alto rendimiento",
      allFilter:    "Todos",
      categoryLabels: {
        Frontend:  "Interfaces modernas y responsivas",
        Backend:   "APIs robustas y microservicios",
        Databases: "Almacenamiento y persistencia",
        DevOps:    "Infraestructura y despliegue",
      },
    },

    experience: {
      sectionLabel: "Experiencia Laboral",
      title:        "Experiencia Laboral",
      subtitle:     "Mi trayectoria profesional en el sector bancario peruano, construyendo sistemas de alto rendimiento y arquitecturas distribuidas.",
      currentLabel: "Actualmente aquí",
      presentLabel: "Presente",
    },

    work: {
      sectionLabel: "Proyectos destacados",
      title1:       "Sistemas de",
      title2:       "Alto Rendimiento",
      subtitle:     "Arquitecturas distribuidas, resiliencia extrema y observabilidad en tiempo real — proyectos con impacto real en producción bancaria.",
      viewOnGithub: "Ver en GitHub",
    },

    contact: {
      sectionLabel:  "Contacto",
      title1:        "Hablemos sobre tu",
      title2:        "próximo proyecto",
      subtitle:      "Estoy disponible para nuevos desafíos y colaboraciones. Escríbeme y te respondo pronto.",
      available:     "Disponible para nuevos proyectos",
      responseTime:  "Tiempo de respuesta:",
      responseValue: "menos de 24 horas",
      socialLabel:   "Redes sociales",
      emailLabel:    "Email",
      phoneLabel:    "Teléfono",
      copy:          "Copiar",
      copied:        "Copiado",
      ctaTitle:      "¿Listo para construir algo increíble?",
      ctaSubtitle:   "Ya sea un sistema bancario de alto rendimiento, una arquitectura de microservicios o una migración cloud — me encantaría ser parte del equipo.",
      ctaHighlights: [
        "✅ Backend con Java, Spring Boot & Quarkus",
        "✅ Frontend moderno con React & TypeScript",
        "✅ Experiencia en proyectos bancarios reales",
      ],
      ctaButton: "Enviarme un mensaje",
    },
  },
};
