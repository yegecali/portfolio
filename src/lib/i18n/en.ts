import type { Locale } from "./types";

export const en: Locale = {
  lang: "en",

  // ── Navigation ─────────────────────────────────────────────────────────────
  nav: [
    { label: "Home",       href: "#hero"       },
    { label: "About",      href: "#about"       },
    { label: "Skills",     href: "#skills"      },
    { label: "Experience", href: "#experience"  },
    { label: "Projects",   href: "#work"        },
    { label: "Contact",    href: "#contact"     },
  ],

  // ── Hero ───────────────────────────────────────────────────────────────────
  hero: {
    badge:       "⚡ Full Stack Developer",
    title:       "Hi, I'm Yemi Genderson 👋",
    description:
      "Full Stack Developer specializing in React for frontend and Java (Spring Boot, Quarkus) for backend. I design and build high-performance applications for banking projects. My passion is creating scalable, secure and efficient solutions that turn ideas into reality.",
    location: "Lima, Peru",
    status:   "Available for new projects",
  },

  // ── About ──────────────────────────────────────────────────────────────────
  about: {
    paragraphs: [
      "I'm Yemi Genderson, a passionate Full Stack Developer with experience building high-performance enterprise applications. My specialty is creating solutions that combine modern frontend (React, TypeScript) with robust Java backends (Spring Boot and Quarkus).",
      "I've worked on banking projects in Lima, Peru, applying best practices in security, performance optimization and software architecture. I'm committed to writing clean, maintainable and efficient code that meets the highest quality standards.",
      "I'm passionate about working on challenging projects that require innovative solutions. From ideation to implementation and deployment, I love being involved in the full development lifecycle, ensuring every project is a success.",
    ],
    highlights: [
      { items: ["React & TypeScript", "Java Spring Boot & Quarkus", "Microservices architecture"] },
      { items: ["Banking projects", "High performance", "Lima, Peru"] },
      { items: ["Continuous learning", "Best practices", "Clean code"] },
    ],
    closing: "Got a challenging project? I'd love to work with you! 🚀",
  },

  // ── Experiences ────────────────────────────────────────────────────────────
  experiences: [
    {
      logoAlt:            "BCP logo",
      company:            "BCP",
      position:           "Senior Full Stack Developer",
      currentlyWorkHere:  true,
      startDate:          new Date(2022, 4),
      summary: [
        "Technical leadership in developing an event-driven Rate Limiting system for the payments module using Java Spring Boot and Apache Kafka",
        "Design and implementation of Resilience Proxy with automatic cache fallback to guarantee service continuity when external services fail",
        "Reduced critical incidents by 40% through circuit breakers and retry policies with Resilience4j",
        "Mentored a team of 4 junior developers on microservices architecture best practices and DDD",
      ],
    },
    {
      logoAlt:   "Interbank logo",
      company:   "Interbank",
      position:  "Full Stack Developer",
      startDate: new Date(2020, 8),
      endDate:   new Date(2022, 4),
      summary: [
        "Built REST APIs and microservices with Java Spring Boot and Quarkus for the digital payments module",
        "Implemented monitoring and alerting platform with Grafana, ELK Stack and ML predictions to detect anomalies",
        "Created React/TypeScript dashboards consuming real-time metrics via WebSockets",
        "Integrated with Jira and Power Automate to automate incident management and support notifications",
      ],
    },
    {
      logoAlt:   "Niubiz logo",
      company:   "Niubiz",
      position:  "Backend Developer",
      startDate: new Date(2019, 2),
      endDate:   new Date(2020, 7),
      summary: [
        "Built payment processing microservices with Java Spring Boot and event-driven architecture",
        "Optimized SQL Server queries reducing response times by 40% in critical transaction modules",
        "Implemented unit and integration tests with JUnit 5 and Testcontainers, achieving 85% coverage",
      ],
    },
  ],

  // ── Projects ───────────────────────────────────────────────────────────────
  projects: [
    {
      name:        "Rate Limiting System",
      description: "Event-driven rate limiting system that cuts transactions exceeding defined thresholds. I implemented orchestration via Saga pattern to guarantee distributed consistency. The system emits audit events on every rejected transaction, enabling full traceability and fraud pattern analysis. Designed for high-volume payment markets with critical latency requirements.",
      url:          "https://github.com",
      technologies: ["Java", "Spring Boot", "Apache Kafka", "Event Sourcing", "Saga Pattern"],
    },
    {
      name:        "Resilience Proxy",
      description: "Resilience proxy that mocks all requests to external services with automatic fallback to cached responses. When an external service experiences failures, the system responds with previously stored data guaranteeing continuity. Implemented internal event topics that emit alerts when high error rates are detected, automatically notifying the support team for immediate investigation.",
      url:          "https://github.com",
      technologies: ["Spring Cloud", "Resilience4j", "Apache Kafka", "Redis", "Spring Boot"],
    },
    {
      name:        "Monitoring & Alerting Platform",
      description: "Comprehensive monitoring and alerting platform integrating Grafana, ELK Stack and Grafana ML. Implemented Jira automation for automatic ticket creation on detected anomalies. Integration with Power Automate for real-time notifications to the support team with contextual metrics and action recommendations. Anomaly detection via predictive ML algorithms.",
      url:          "https://github.com",
      technologies: ["Grafana", "ELK Stack", "Grafana ML", "Jira", "Power Automate", "Python"],
    },
    {
      name:        "Database Migration (On-Premise to Cloud)",
      description: "Complex migration of an on-premise database to cloud with 20 million records. Designed and executed robust ETL pipelines using Azure Data Factory with Scala transformations. Implemented data integrity validations, bidirectional sync during transition, and automatic rollback on failure. Optimized indexes and partitions improving post-migration performance by 35%.",
      url:          "https://github.com",
      technologies: ["SQL Server", "Azure Data Factory", "Scala", "Azure", "ETL"],
    },
  ],

  // ── Languages ──────────────────────────────────────────────────────────────
  languages: [
    { name: "Spanish", flag: "🇵🇪", level: "Native",       proficiency: 100 },
    { name: "English", flag: "🇺🇸", level: "Professional", proficiency: 80  },
  ],

  // ── UI strings ─────────────────────────────────────────────────────────────
  ui: {
    scroll: "Scroll",

    hero: {
      contactBtn:   "Contact me",
      viewWorkBtn:  "View my work",
      downloadCV:   "Download CV",
      statYears:    "Years of exp.",
      statTech:     "Technologies",
      statProjects: "Projects",
    },

    about: {
      sectionLabel:    "About me",
      title:           "Want to know more? Here it is",
      languagesLabel:  "Languages",
      availableRemote: "Available remote",
      yearsExp:        "5+ years",
      experienceOf:    "of experience",
      openToWork:      "Open to work",
    },

    skills: {
      sectionLabel: "Tech stack",
      title1:       "My",
      title2:       "Skills",
      subtitle:     "Full stack specialized in high-performance banking development",
      allFilter:    "All",
      categoryLabels: {
        Frontend:  "Modern responsive interfaces",
        Backend:   "Robust APIs and microservices",
        Databases: "Storage and persistence",
        DevOps:    "Infrastructure and deployment",
      },
    },

    experience: {
      sectionLabel: "Work Experience",
      title:        "Work Experience",
      subtitle:     "My professional journey in the Peruvian banking sector, building high-performance systems and distributed architectures.",
      currentLabel: "Currently here",
      presentLabel: "Present",
    },

    work: {
      sectionLabel: "Featured projects",
      title1:       "High-Performance",
      title2:       "Systems",
      subtitle:     "Distributed architectures, extreme resilience and real-time observability — projects with real production banking impact.",
      viewOnGithub: "View on GitHub",
    },

    contact: {
      sectionLabel:  "Contact",
      title1:        "Let's talk about your",
      title2:        "next project",
      subtitle:      "I'm available for new challenges and collaborations. Write to me and I'll reply soon.",
      available:     "Available for new projects",
      responseTime:  "Response time:",
      responseValue: "less than 24 hours",
      socialLabel:   "Social networks",
      emailLabel:    "Email",
      phoneLabel:    "Phone",
      copy:          "Copy",
      copied:        "Copied",
      ctaTitle:      "Ready to build something amazing?",
      ctaSubtitle:   "Whether it's a high-performance banking system, a microservices architecture or a cloud migration — I'd love to be part of your team.",
      ctaHighlights: [
        "✅ Backend with Java, Spring Boot & Quarkus",
        "✅ Modern frontend with React & TypeScript",
        "✅ Experience in real banking projects",
      ],
      ctaButton: "Send me a message",
    },
  },
};
