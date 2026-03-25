"""
Seed the SQLite database with Yemi Genderson's portfolio data.
Supports both Spanish and English translations.

Run once (or call via POST /api/seed to reset).
"""

from sqlalchemy.orm import Session

from .models import (
    AboutClosing, AboutParagraph, Experience, ExperiencePosition,
    ExperienceSummary, HeroTranslation, NavLink, PersonalInfo, Project,
    ProjectTranslation, SpokenLanguage, Technology,
)


def seed_all(db: Session) -> None:
    """Drop all rows and re-insert fresh seed data."""
    _clear(db)
    _seed_personal(db)
    _seed_hero(db)
    _seed_about(db)
    _seed_nav(db)
    _seed_experiences(db)
    _seed_projects(db)
    _seed_technologies(db)
    _seed_spoken_languages(db)
    db.commit()


def _clear(db: Session) -> None:
    for model in [
        ExperienceSummary, ExperiencePosition, Experience,
        ProjectTranslation, Project,
        AboutParagraph, AboutClosing,
        HeroTranslation,
        NavLink,
        Technology,
        SpokenLanguage,
        PersonalInfo,
    ]:
        db.query(model).delete()


# ── Personal info ──────────────────────────────────────────────────────────────

def _seed_personal(db: Session) -> None:
    db.add(PersonalInfo(
        id=1,
        name="Yemi Genderson",
        role="Full Stack Developer",
        email="yemi@example.com",
        phone="+51 (123) 456-7890",
        location="Lima, Perú",
        cv_url="/portfolio/cv-yemi-genderson.pdf",
        hero_image=(
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
            "?w=500&h=500&fit=crop"
        ),
        github_url="https://github.com/yemigenderson",
        linkedin_url="https://linkedin.com/in/yemigenderson",
        whatsapp_url="https://wa.me/51987654321",
        instagram_url="https://instagram.com/yemigenderson",
    ))


# ── Hero translations ─────────────────────────────────────────────────────────

def _seed_hero(db: Session) -> None:
    db.add(HeroTranslation(
        lang="es",
        badge="⚡ Full Stack Developer",
        title="Hola, soy Yemi Genderson 👋",
        description=(
            "Full Stack Developer con especialización en React para frontend y "
            "Java (Spring Boot, Quarkus) para backend. Diseño y desarrollo de "
            "aplicaciones de alto rendimiento en proyectos bancarios. Mi pasión "
            "es crear soluciones escalables, seguras y eficientes que transforman "
            "ideas en realidad."
        ),
        location="Lima, Perú",
        status="Disponible para nuevos proyectos",
    ))
    db.add(HeroTranslation(
        lang="en",
        badge="⚡ Full Stack Developer",
        title="Hi, I'm Yemi Genderson 👋",
        description=(
            "Full Stack Developer specializing in React for frontend and Java "
            "(Spring Boot, Quarkus) for backend. I design and build "
            "high-performance applications for banking projects. My passion is "
            "creating scalable, secure and efficient solutions that turn ideas "
            "into reality."
        ),
        location="Lima, Peru",
        status="Available for new projects",
    ))


# ── About translations ────────────────────────────────────────────────────────

def _seed_about(db: Session) -> None:
    paragraphs_es = [
        (
            "Soy Yemi Genderson, un Full Stack Developer apasionado con "
            "experiencia en el desarrollo de aplicaciones empresariales de alto "
            "rendimiento. Mi especialidad es crear soluciones que combinan "
            "frontend moderno (React, TypeScript) con backends robustos en Java "
            "(Spring Boot y Quarkus)."
        ),
        (
            "He trabajado en proyectos bancarios de Lima, Perú, donde he aplicado "
            "mejores prácticas en seguridad, optimización de rendimiento y "
            "arquitectura de software. Estoy comprometido con escribir código "
            "limpio, mantenible y eficiente que cumple con los más altos "
            "estándares de calidad."
        ),
        (
            "Me apasiona trabajar en proyectos desafiantes que requieren "
            "soluciones innovadoras. Desde la ideación hasta la implementación y "
            "deployment, me gusta estar involucrado en todo el ciclo de "
            "desarrollo, asegurando que cada proyecto sea un éxito."
        ),
    ]
    paragraphs_en = [
        (
            "I'm Yemi Genderson, a passionate Full Stack Developer with experience "
            "building high-performance enterprise applications. My specialty is "
            "creating solutions that combine modern frontend (React, TypeScript) "
            "with robust Java backends (Spring Boot and Quarkus)."
        ),
        (
            "I've worked on banking projects in Lima, Peru, applying best "
            "practices in security, performance optimization and software "
            "architecture. I'm committed to writing clean, maintainable and "
            "efficient code that meets the highest quality standards."
        ),
        (
            "I'm passionate about working on challenging projects that require "
            "innovative solutions. From ideation to implementation and deployment, "
            "I love being involved in the full development lifecycle, ensuring "
            "every project is a success."
        ),
    ]

    for i, text in enumerate(paragraphs_es):
        db.add(AboutParagraph(lang="es", order=i, text=text))
    for i, text in enumerate(paragraphs_en):
        db.add(AboutParagraph(lang="en", order=i, text=text))

    db.add(AboutClosing(lang="es", text="¿Tienes un proyecto desafiante? ¡Me encantaría trabajar contigo! 🚀"))
    db.add(AboutClosing(lang="en", text="Got a challenging project? I'd love to work with you! 🚀"))


# ── Navigation ─────────────────────────────────────────────────────────────────

def _seed_nav(db: Session) -> None:
    nav_es = [
        ("Inicio",      "#hero"),
        ("Sobre mí",    "#about"),
        ("Skills",      "#skills"),
        ("Experiencia", "#experience"),
        ("Proyectos",   "#work"),
        ("Contacto",    "#contact"),
    ]
    nav_en = [
        ("Home",       "#hero"),
        ("About",      "#about"),
        ("Skills",     "#skills"),
        ("Experience", "#experience"),
        ("Projects",   "#work"),
        ("Contact",    "#contact"),
    ]
    for i, (label, href) in enumerate(nav_es):
        db.add(NavLink(lang="es", label=label, href=href, order=i))
    for i, (label, href) in enumerate(nav_en):
        db.add(NavLink(lang="en", label=label, href=href, order=i))


# ── Work experience ────────────────────────────────────────────────────────────

def _seed_experiences(db: Session) -> None:
    # ── BCP ───────────────────────────────────────────────────────────────────
    bcp = Experience(
        company="BCP",
        logo_alt="BCP logo",
        start_date="2022-05",
        end_date=None,
        currently_work_here=True,
        order=0,
    )
    db.add(bcp)
    db.flush()

    db.add(ExperiencePosition(experience_id=bcp.id, lang="es", position="Full Stack Developer Senior"))
    db.add(ExperiencePosition(experience_id=bcp.id, lang="en", position="Senior Full Stack Developer"))

    bcp_bullets_es = [
        "Liderazgo técnico en el desarrollo del sistema de Rate Limiting event-driven para el módulo de pagos con Java Spring Boot y Apache Kafka",
        "Diseño e implementación de Resilience Proxy con fallback automático a caché para garantizar continuidad del servicio ante fallos de servicios externos",
        "Reducción de incidentes críticos en un 40% mediante implementación de circuit breakers y retry policies con Resilience4j",
        "Mentoría a un equipo de 4 desarrolladores junior en mejores prácticas de arquitectura de microservicios y DDD",
    ]
    bcp_bullets_en = [
        "Technical leadership in developing an event-driven Rate Limiting system for the payments module using Java Spring Boot and Apache Kafka",
        "Design and implementation of Resilience Proxy with automatic cache fallback to guarantee service continuity during external service failures",
        "Reduction of critical incidents by 40% through implementation of circuit breakers and retry policies with Resilience4j",
        "Mentoring a team of 4 junior developers in microservices architecture best practices and DDD",
    ]
    for i, text in enumerate(bcp_bullets_es):
        db.add(ExperienceSummary(experience_id=bcp.id, lang="es", order=i, text=text))
    for i, text in enumerate(bcp_bullets_en):
        db.add(ExperienceSummary(experience_id=bcp.id, lang="en", order=i, text=text))

    # ── Interbank ─────────────────────────────────────────────────────────────
    interbank = Experience(
        company="Interbank",
        logo_alt="Interbank logo",
        start_date="2020-09",
        end_date="2022-05",
        currently_work_here=False,
        order=1,
    )
    db.add(interbank)
    db.flush()

    db.add(ExperiencePosition(experience_id=interbank.id, lang="es", position="Full Stack Developer"))
    db.add(ExperiencePosition(experience_id=interbank.id, lang="en", position="Full Stack Developer"))

    interbank_bullets_es = [
        "Desarrollo de APIs REST y microservicios con Java Spring Boot y Quarkus para el módulo de pagos digitales",
        "Implementación de plataforma de monitoreo y alertas con Grafana, ELK Stack y predicciones ML para detectar anomalías",
        "Creación de dashboards en React/TypeScript consumiendo métricas en tiempo real con WebSockets",
        "Integración con Jira y Power Automate para automatización de incidencias y notificaciones al equipo de soporte",
    ]
    interbank_bullets_en = [
        "Development of REST APIs and microservices with Java Spring Boot and Quarkus for the digital payments module",
        "Implementation of monitoring and alerting platform with Grafana, ELK Stack and ML predictions to detect anomalies",
        "Creation of React/TypeScript dashboards consuming real-time metrics with WebSockets",
        "Integration with Jira and Power Automate for incident automation and notifications to the support team",
    ]
    for i, text in enumerate(interbank_bullets_es):
        db.add(ExperienceSummary(experience_id=interbank.id, lang="es", order=i, text=text))
    for i, text in enumerate(interbank_bullets_en):
        db.add(ExperienceSummary(experience_id=interbank.id, lang="en", order=i, text=text))

    # ── Niubiz ────────────────────────────────────────────────────────────────
    niubiz = Experience(
        company="Niubiz",
        logo_alt="Niubiz logo",
        start_date="2019-03",
        end_date="2020-08",
        currently_work_here=False,
        order=2,
    )
    db.add(niubiz)
    db.flush()

    db.add(ExperiencePosition(experience_id=niubiz.id, lang="es", position="Backend Developer"))
    db.add(ExperiencePosition(experience_id=niubiz.id, lang="en", position="Backend Developer"))

    niubiz_bullets_es = [
        "Desarrollo de microservicios de procesamiento de pagos con Java Spring Boot y arquitectura event-driven",
        "Optimización de consultas SQL Server reduciendo tiempos de respuesta en un 40% en módulos críticos de transacciones",
        "Implementación de pruebas unitarias e integración con JUnit 5 y Testcontainers, alcanzando 85% de cobertura",
    ]
    niubiz_bullets_en = [
        "Development of payment processing microservices with Java Spring Boot and event-driven architecture",
        "Optimization of SQL Server queries reducing response times by 40% in critical transaction modules",
        "Implementation of unit and integration tests with JUnit 5 and Testcontainers, achieving 85% coverage",
    ]
    for i, text in enumerate(niubiz_bullets_es):
        db.add(ExperienceSummary(experience_id=niubiz.id, lang="es", order=i, text=text))
    for i, text in enumerate(niubiz_bullets_en):
        db.add(ExperienceSummary(experience_id=niubiz.id, lang="en", order=i, text=text))


# ── Projects ───────────────────────────────────────────────────────────────────

def _seed_projects(db: Session) -> None:
    projects_data = [
        {
            "name": "Rate Limiting System",
            "url": "https://github.com",
            "technologies": ["Java", "Spring Boot", "Apache Kafka", "Event Sourcing", "Saga Pattern"],
            "order": 0,
            "description_es": (
                "Sistema de limitación de tasas event-driven que corta transacciones que "
                "superan umbrales definidos. Implementé orquestación mediante Saga pattern "
                "para garantizar consistencia distribuida. El sistema emite eventos de "
                "auditoría en cada transacción rechazada, permitiendo trazabilidad completa "
                "y análisis de patrones de fraude. Diseñado para mercados de pagos de alto "
                "volumen con latencia crítica."
            ),
            "description_en": (
                "Event-driven rate limiting system that cuts transactions exceeding defined "
                "thresholds. Implemented Saga pattern orchestration to guarantee distributed "
                "consistency. The system emits audit events on every rejected transaction, "
                "enabling full traceability and fraud pattern analysis. Designed for "
                "high-volume payment markets with critical latency requirements."
            ),
        },
        {
            "name": "Resilience Proxy",
            "url": "https://github.com",
            "technologies": ["Spring Cloud", "Resilience4j", "Apache Kafka", "Redis", "Spring Boot"],
            "order": 1,
            "description_es": (
                "Proxy de resiliencia que mockea todas las peticiones a servicios externos "
                "con fallback automático a respuestas cacheadas. Cuando un servicio externo "
                "experimenta fallos, el sistema responde con datos previamente almacenados "
                "garantizando continuidad. Implementé tópicos de eventos internos que emiten "
                "alertas cuando se detecta alta tasa de errores, notificando automáticamente "
                "al equipo de soporte para investigación inmediata."
            ),
            "description_en": (
                "Resilience proxy that mocks all requests to external services with "
                "automatic fallback to cached responses. When an external service fails, "
                "the system responds with previously stored data guaranteeing continuity. "
                "Implemented internal event topics that emit alerts when a high error rate "
                "is detected, automatically notifying the support team for immediate "
                "investigation."
            ),
        },
        {
            "name": "Monitoring & Alerting Platform",
            "url": "https://github.com",
            "technologies": ["Grafana", "ELK Stack", "Grafana ML", "Jira", "Power Automate", "Python"],
            "order": 2,
            "description_es": (
                "Plataforma integral de monitoreo y alertas con integraciones a Grafana, "
                "ELK Stack, y machine learning de Grafana. Implementé automatización en "
                "Jira para creación de tickets automáticos ante anomalías detectadas. "
                "Integración con Power Automate para notificaciones en tiempo real al "
                "equipo de soporte con métricas contextuales y recomendaciones de acción. "
                "Detección de comportamientos anómalos mediante algoritmos ML predictivos."
            ),
            "description_en": (
                "Comprehensive monitoring and alerting platform with integrations to "
                "Grafana, ELK Stack, and Grafana ML. Implemented Jira automation for "
                "automatic ticket creation on detected anomalies. Integration with "
                "Power Automate for real-time notifications to the support team with "
                "contextual metrics and action recommendations. Anomaly detection using "
                "predictive ML algorithms."
            ),
        },
        {
            "name": "Database Migration (On-Premise to Cloud)",
            "url": "https://github.com",
            "technologies": ["SQL Server", "Azure Data Factory", "Scala", "Azure", "ETL"],
            "order": 3,
            "description_es": (
                "Migración compleja de base de datos on-premise a cloud con 20 millones "
                "de registros. Diseñé y ejecuté pipelines ETL robustos usando SQL Server "
                "Data Factory con transformaciones en Scala. Implementé validaciones de "
                "integridad de datos, sincronización bidireccional durante la transición, "
                "y roll-back automático en caso de fallos. Optimicé índices y particiones "
                "para mejorar rendimiento post-migración en 35%."
            ),
            "description_en": (
                "Complex on-premise to cloud database migration with 20 million records. "
                "Designed and executed robust ETL pipelines using SQL Server Data Factory "
                "with Scala transformations. Implemented data integrity validations, "
                "bidirectional synchronization during the transition, and automatic "
                "roll-back on failure. Optimized indexes and partitions to improve "
                "post-migration performance by 35%."
            ),
        },
    ]

    for pd in projects_data:
        proj = Project(
            name=pd["name"],
            url=pd["url"],
            technologies=pd["technologies"],
            order=pd["order"],
        )
        db.add(proj)
        db.flush()
        db.add(ProjectTranslation(project_id=proj.id, lang="es", description=pd["description_es"]))
        db.add(ProjectTranslation(project_id=proj.id, lang="en", description=pd["description_en"]))


# ── Technologies ──────────────────────────────────────────────────────────────

def _seed_technologies(db: Session) -> None:
    techs = [
        # Frontend
        ("JavaScript",  "https://developer.mozilla.org/en-US/docs/Web/JavaScript", "javascript",  "Frontend", 0),
        ("TypeScript",  "https://www.typescriptlang.org/",                          "typescript",  "Frontend", 1),
        ("React",       "https://react.dev/",                                       "react",       "Frontend", 2),
        ("Tailwindcss", "https://tailwindcss.com/",                                 "tailwindcss", "Frontend", 3),
        ("Vite",        "https://vitejs.dev/",                                      "vite",        "Frontend", 4),
        # Backend
        ("Java",        "https://www.java.com/",                                    "java",        "Backend",  0),
        ("Spring Boot", "https://spring.io/projects/spring-boot",                   "spring",      "Backend",  1),
        ("Quarkus",     "https://quarkus.io/",                                      "quarkus",     "Backend",  2),
        ("Node.js",     "https://nodejs.org/en",                                    "nodejs",      "Backend",  3),
        ("Express.js",  "https://expressjs.com/",                                   "expressjs",   "Backend",  4),
        # Databases
        ("PostgreSQL",  "https://www.postgresql.org/",                              "postgresql",  "Databases", 0),
        ("MongoDB",     "https://www.mongodb.com/",                                 "mongodb",     "Databases", 1),
        ("SQL Server",  "https://www.microsoft.com/en-us/sql-server",               "sqlserver",   "Databases", 2),
        ("Redis",       "https://redis.io/",                                        "redis",       "Databases", 3),
        # DevOps
        ("Docker",      "https://www.docker.com/",                                  "docker",      "DevOps",   0),
        ("Git",         "https://git-scm.com/",                                     "git",         "DevOps",   1),
        ("Linux",       "https://www.linux.org/",                                   "linux",       "DevOps",   2),
        ("Apache Kafka","https://kafka.apache.org/",                                "apachekafka", "DevOps",   3),
    ]
    for label, url, icon_name, category, order in techs:
        db.add(Technology(label=label, url=url, icon_name=icon_name, category=category, order=order))


# ── Spoken languages ──────────────────────────────────────────────────────────

def _seed_spoken_languages(db: Session) -> None:
    db.add(SpokenLanguage(name="Español", flag="🇵🇪", level="Nativo",       proficiency=100, order=0))
    db.add(SpokenLanguage(name="English", flag="🇺🇸", level="Professional", proficiency=80,  order=1))
