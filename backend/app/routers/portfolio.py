"""
Aggregate endpoint — returns the full portfolio in one request.
Also exposes the /api/seed endpoint.
Also exposes hero and about read/update endpoints.
"""

from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import (
    AboutClosing, AboutParagraph, HeroTranslation, NavLink,
    PersonalInfo, SpokenLanguage, Technology,
)
from ..schemas import (
    AboutOut, AboutUpdate, FullPortfolioOut, HeroOut, HeroUpdate,
    MessageOut, NavLinkOut, PersonalInfoOut, ProjectOut, ExperienceOut,
    SpokenLanguageOut, TechnologyOut,
)
from ..seed import seed_all
from .experiences import _build_out as _exp_out, list_experiences
from .projects import _build_out as _proj_out, list_projects

router = APIRouter(tags=["portfolio"])

SUPPORTED_LANGS = {"es", "en"}


# ── Hero ──────────────────────────────────────────────────────────────────────

@router.get("/api/hero/{lang}", response_model=HeroOut)
def get_hero(lang: str, db: Session = Depends(get_db)):
    if lang not in SUPPORTED_LANGS:
        raise HTTPException(422, f"lang must be one of {SUPPORTED_LANGS}")
    row = db.query(HeroTranslation).filter(HeroTranslation.lang == lang).first()
    if not row:
        raise HTTPException(404, "Hero not found. Run /api/seed first.")
    return row


@router.put("/api/hero/{lang}", response_model=HeroOut)
def update_hero(lang: str, payload: HeroUpdate, db: Session = Depends(get_db)):
    if lang not in SUPPORTED_LANGS:
        raise HTTPException(422, f"lang must be one of {SUPPORTED_LANGS}")
    row = db.query(HeroTranslation).filter(HeroTranslation.lang == lang).first()
    if not row:
        raise HTTPException(404, "Hero not found. Run /api/seed first.")
    for field, value in payload.model_dump(exclude_none=True).items():
        setattr(row, field, value)
    db.commit()
    db.refresh(row)
    return row


# ── About ──────────────────────────────────────────────────────────────────────

def _get_about(lang: str, db: Session) -> AboutOut:
    paragraphs = (
        db.query(AboutParagraph)
        .filter(AboutParagraph.lang == lang)
        .order_by(AboutParagraph.order)
        .all()
    )
    closing_row = db.query(AboutClosing).filter(AboutClosing.lang == lang).first()
    return AboutOut(
        lang=lang,
        paragraphs=[p.text for p in paragraphs],
        closing=closing_row.text if closing_row else "",
    )


@router.get("/api/about/{lang}", response_model=AboutOut)
def get_about(lang: str, db: Session = Depends(get_db)):
    if lang not in SUPPORTED_LANGS:
        raise HTTPException(422, f"lang must be one of {SUPPORTED_LANGS}")
    return _get_about(lang, db)


@router.put("/api/about/{lang}", response_model=AboutOut)
def update_about(lang: str, payload: AboutUpdate, db: Session = Depends(get_db)):
    if lang not in SUPPORTED_LANGS:
        raise HTTPException(422, f"lang must be one of {SUPPORTED_LANGS}")

    if payload.paragraphs is not None:
        db.query(AboutParagraph).filter(AboutParagraph.lang == lang).delete()
        for i, text in enumerate(payload.paragraphs):
            db.add(AboutParagraph(lang=lang, order=i, text=text))

    if payload.closing is not None:
        row = db.query(AboutClosing).filter(AboutClosing.lang == lang).first()
        if row:
            row.text = payload.closing
        else:
            db.add(AboutClosing(lang=lang, text=payload.closing))

    db.commit()
    return _get_about(lang, db)


# ── Full portfolio ─────────────────────────────────────────────────────────────

@router.get("/api/portfolio/{lang}", response_model=FullPortfolioOut)
def get_full_portfolio(lang: str, db: Session = Depends(get_db)):
    """
    Single endpoint that returns every piece of data needed to render
    the portfolio in the requested language.
    """
    if lang not in SUPPORTED_LANGS:
        raise HTTPException(422, f"lang must be one of {SUPPORTED_LANGS}")

    personal = db.query(PersonalInfo).filter(PersonalInfo.id == 1).first()
    if not personal:
        raise HTTPException(
            404,
            "Database is empty. POST /api/seed to populate it first.",
        )

    hero = db.query(HeroTranslation).filter(HeroTranslation.lang == lang).first()
    about = _get_about(lang, db)
    nav = (
        db.query(NavLink)
        .filter(NavLink.lang == lang)
        .order_by(NavLink.order)
        .all()
    )

    from ..models import Experience, Project
    from .experiences import _build_out as exp_build
    from .projects import _build_out as proj_build

    experiences = [
        exp_build(e, lang)
        for e in db.query(Experience).order_by(Experience.order).all()
    ]
    projects = [
        proj_build(p, lang)
        for p in db.query(Project).order_by(Project.order).all()
    ]
    technologies = (
        db.query(Technology)
        .order_by(Technology.category, Technology.order)
        .all()
    )
    spoken_languages = (
        db.query(SpokenLanguage)
        .order_by(SpokenLanguage.order)
        .all()
    )

    return FullPortfolioOut(
        lang=lang,
        personal=PersonalInfoOut.model_validate(personal),
        hero=HeroOut.model_validate(hero) if hero else HeroOut(lang=lang),
        about=about,
        nav=[NavLinkOut(label=n.label, href=n.href) for n in nav],
        experiences=experiences,
        projects=projects,
        technologies=[TechnologyOut.model_validate(t) for t in technologies],
        spoken_languages=[SpokenLanguageOut.model_validate(sl) for sl in spoken_languages],
    )


# ── Seed ──────────────────────────────────────────────────────────────────────

@router.post("/api/seed", response_model=MessageOut, status_code=201)
def run_seed(db: Session = Depends(get_db)):
    """
    (Re)populate the database with default portfolio data.
    WARNING: this deletes all existing rows first.
    """
    seed_all(db)
    return MessageOut(message="Database seeded successfully.")
