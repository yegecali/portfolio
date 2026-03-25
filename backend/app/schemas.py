"""
Pydantic schemas — request/response shapes for every endpoint.
"""

from __future__ import annotations
from typing import List, Optional
from pydantic import BaseModel, ConfigDict


# ── Personal info ──────────────────────────────────────────────────────────────

class PersonalInfoOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    role: str
    email: str
    phone: Optional[str] = None
    location: Optional[str] = None
    cv_url: Optional[str] = None
    hero_image: Optional[str] = None
    github_url: Optional[str] = None
    linkedin_url: Optional[str] = None
    whatsapp_url: Optional[str] = None
    instagram_url: Optional[str] = None


class PersonalInfoUpdate(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    cv_url: Optional[str] = None
    hero_image: Optional[str] = None
    github_url: Optional[str] = None
    linkedin_url: Optional[str] = None
    whatsapp_url: Optional[str] = None
    instagram_url: Optional[str] = None


# ── Hero ───────────────────────────────────────────────────────────────────────

class HeroOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    lang: str
    badge: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    location: Optional[str] = None
    status: Optional[str] = None


class HeroUpdate(BaseModel):
    badge: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    location: Optional[str] = None
    status: Optional[str] = None


# ── About ──────────────────────────────────────────────────────────────────────

class AboutOut(BaseModel):
    lang: str
    paragraphs: List[str]
    closing: str


class AboutUpdate(BaseModel):
    paragraphs: Optional[List[str]] = None
    closing: Optional[str] = None


# ── Experiences ────────────────────────────────────────────────────────────────

class ExperienceOut(BaseModel):
    id: int
    company: str
    logo_alt: Optional[str] = None
    position: str            # resolved for requested lang
    start_date: str          # "YYYY-MM"
    end_date: Optional[str] = None
    currently_work_here: bool
    summary: List[str]       # resolved for requested lang
    order: int


class ExperienceUpdate(BaseModel):
    company: Optional[str] = None
    logo_alt: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    currently_work_here: Optional[bool] = None
    order: Optional[int] = None


class ExperienceTranslationUpdate(BaseModel):
    position: str
    summary: List[str]


# ── Projects ───────────────────────────────────────────────────────────────────

class ProjectOut(BaseModel):
    id: int
    name: str
    url: Optional[str] = None
    technologies: List[str]
    description: str   # resolved for requested lang
    order: int


class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    url: Optional[str] = None
    technologies: Optional[List[str]] = None
    order: Optional[int] = None


class ProjectTranslationUpdate(BaseModel):
    description: str


# ── Technologies ──────────────────────────────────────────────────────────────

class TechnologyOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    label: str
    url: Optional[str] = None
    icon_name: Optional[str] = None
    category: Optional[str] = None
    order: int


class TechnologyUpdate(BaseModel):
    label: Optional[str] = None
    url: Optional[str] = None
    icon_name: Optional[str] = None
    category: Optional[str] = None
    order: Optional[int] = None


# ── Spoken languages ──────────────────────────────────────────────────────────

class SpokenLanguageOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    flag: Optional[str] = None
    level: str
    proficiency: int
    order: int


# ── Nav links ─────────────────────────────────────────────────────────────────

class NavLinkOut(BaseModel):
    label: str
    href: str


# ── Full portfolio (single response for the frontend) ─────────────────────────

class FullPortfolioOut(BaseModel):
    lang: str
    personal: PersonalInfoOut
    hero: HeroOut
    about: AboutOut
    nav: List[NavLinkOut]
    experiences: List[ExperienceOut]
    projects: List[ProjectOut]
    technologies: List[TechnologyOut]
    spoken_languages: List[SpokenLanguageOut]


# ── Misc ──────────────────────────────────────────────────────────────────────

class MessageOut(BaseModel):
    message: str
