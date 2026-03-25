"""
SQLAlchemy ORM models — every table in the portfolio database.

Design decisions:
- Translatable text (hero, about, experience bullets, project descriptions,
  nav labels) is stored with a `lang` column ('es' | 'en').
- Non-translatable data (emails, URLs, dates, tech list) lives in plain tables.
- A single PersonalInfo row (id=1) holds all contact / meta fields.
"""

from sqlalchemy import (
    Boolean, Column, ForeignKey, Integer, JSON, String, Text, UniqueConstraint
)
from sqlalchemy.orm import relationship

from .database import Base


# ── Personal info ──────────────────────────────────────────────────────────────

class PersonalInfo(Base):
    __tablename__ = "personal_info"

    id            = Column(Integer, primary_key=True, default=1)
    name          = Column(String(120), nullable=False)
    role          = Column(String(120), nullable=False)
    email         = Column(String(120), nullable=False)
    phone         = Column(String(40))
    location      = Column(String(120))
    cv_url        = Column(String(300))
    hero_image    = Column(String(500))
    github_url    = Column(String(300))
    linkedin_url  = Column(String(300))
    whatsapp_url  = Column(String(300))
    instagram_url = Column(String(300))


# ── Hero section (translatable) ───────────────────────────────────────────────

class HeroTranslation(Base):
    __tablename__ = "hero_translations"
    __table_args__ = (UniqueConstraint("lang", name="uq_hero_lang"),)

    id          = Column(Integer, primary_key=True)
    lang        = Column(String(5), nullable=False)  # 'es' | 'en'
    badge       = Column(String(120))
    title       = Column(String(200))
    description = Column(Text)
    location    = Column(String(120))
    status      = Column(String(120))


# ── About section (translatable) ─────────────────────────────────────────────

class AboutParagraph(Base):
    """One row per paragraph per language."""
    __tablename__ = "about_paragraphs"

    id       = Column(Integer, primary_key=True)
    lang     = Column(String(5), nullable=False)
    order    = Column(Integer, nullable=False, default=0)
    text     = Column(Text, nullable=False)


class AboutClosing(Base):
    __tablename__ = "about_closing"
    __table_args__ = (UniqueConstraint("lang", name="uq_closing_lang"),)

    id   = Column(Integer, primary_key=True)
    lang = Column(String(5), nullable=False)
    text = Column(String(300), nullable=False)


# ── Work experience ────────────────────────────────────────────────────────────

class Experience(Base):
    """Non-translatable experience header."""
    __tablename__ = "experiences"

    id                 = Column(Integer, primary_key=True)
    company            = Column(String(120), nullable=False)
    logo_alt           = Column(String(120))
    start_date         = Column(String(10), nullable=False)  # "YYYY-MM"
    end_date           = Column(String(10))                   # null = present
    currently_work_here = Column(Boolean, default=False)
    order              = Column(Integer, default=0)

    positions = relationship(
        "ExperiencePosition", back_populates="experience", cascade="all, delete-orphan"
    )
    summaries = relationship(
        "ExperienceSummary", back_populates="experience", cascade="all, delete-orphan"
    )


class ExperiencePosition(Base):
    """Job title per language."""
    __tablename__ = "experience_positions"

    id            = Column(Integer, primary_key=True)
    experience_id = Column(Integer, ForeignKey("experiences.id"), nullable=False)
    lang          = Column(String(5), nullable=False)
    position      = Column(String(200), nullable=False)

    experience = relationship("Experience", back_populates="positions")


class ExperienceSummary(Base):
    """Bullet-point summary per language."""
    __tablename__ = "experience_summaries"

    id            = Column(Integer, primary_key=True)
    experience_id = Column(Integer, ForeignKey("experiences.id"), nullable=False)
    lang          = Column(String(5), nullable=False)
    order         = Column(Integer, default=0)
    text          = Column(Text, nullable=False)

    experience = relationship("Experience", back_populates="summaries")


# ── Projects ───────────────────────────────────────────────────────────────────

class Project(Base):
    """Non-translatable project header."""
    __tablename__ = "projects"

    id           = Column(Integer, primary_key=True)
    name         = Column(String(120), nullable=False)
    url          = Column(String(300))
    technologies = Column(JSON, default=list)   # ["Java", "Kafka", ...]
    order        = Column(Integer, default=0)

    translations = relationship(
        "ProjectTranslation", back_populates="project", cascade="all, delete-orphan"
    )


class ProjectTranslation(Base):
    """Project description per language."""
    __tablename__ = "project_translations"

    id          = Column(Integer, primary_key=True)
    project_id  = Column(Integer, ForeignKey("projects.id"), nullable=False)
    lang        = Column(String(5), nullable=False)
    description = Column(Text, nullable=False)

    project = relationship("Project", back_populates="translations")


# ── Technologies / skills ─────────────────────────────────────────────────────

class Technology(Base):
    __tablename__ = "technologies"

    id        = Column(Integer, primary_key=True)
    label     = Column(String(80), nullable=False)
    url       = Column(String(300))
    icon_name = Column(String(80))
    category  = Column(String(40))   # Frontend | Backend | Databases | DevOps
    order     = Column(Integer, default=0)


# ── Languages spoken ──────────────────────────────────────────────────────────

class SpokenLanguage(Base):
    __tablename__ = "spoken_languages"

    id          = Column(Integer, primary_key=True)
    name        = Column(String(80), nullable=False)
    flag        = Column(String(10))
    level       = Column(String(80))
    proficiency = Column(Integer, default=0)  # 0-100
    order       = Column(Integer, default=0)


# ── Navigation links (translatable) ──────────────────────────────────────────

class NavLink(Base):
    __tablename__ = "nav_links"

    id    = Column(Integer, primary_key=True)
    lang  = Column(String(5), nullable=False)
    label = Column(String(80), nullable=False)
    href  = Column(String(80), nullable=False)
    order = Column(Integer, default=0)
