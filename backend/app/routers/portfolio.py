"""
Aggregate endpoint — returns the full portfolio in one request.
Also exposes the /api/seed endpoint.
Also exposes hero and about read/update endpoints.
"""

from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..cache import get_cached, set_cached, invalidate
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
from ..utils.validators import validate_language
from ..utils.crud import get_first_or_404, update_entity
from .experiences import _build_out as _exp_out
from .projects import _build_out as _proj_out

router = APIRouter(tags=["portfolio"])


# ── Hero ──────────────────────────────────────────────────────────────────────

@router.get("/api/hero/{lang}", response_model=HeroOut)
def get_hero(lang: str, db: Session = Depends(get_db)):
    """Get hero section for the requested language."""
    validate_language(lang)
    cache_key = f"hero:{lang}"
    cached = get_cached(cache_key)
    if cached is not None:
        return HeroOut.model_validate(cached)
    row = get_first_or_404(
        db,
        HeroTranslation,
        {"lang": lang},
        "Hero not found. Run /api/seed first."
    )
    out = HeroOut.model_validate(row)
    set_cached(cache_key, out.model_dump())
    return out


@router.put("/api/hero/{lang}", response_model=HeroOut)
def update_hero(lang: str, payload: HeroUpdate, db: Session = Depends(get_db)):
    """Update hero section for the requested language."""
    validate_language(lang)
    row = get_first_or_404(
        db,
        HeroTranslation,
        {"lang": lang},
        "Hero not found. Run /api/seed first."
    )
    result = update_entity(row, payload, db)
    invalidate(f"hero:{lang}", f"portfolio:{lang}")
    return result


# ── About ──────────────────────────────────────────────────────────────────────

def _get_about(lang: str, db: Session) -> AboutOut:
    """Helper to build AboutOut for a given language."""
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
    """Get about section for the requested language."""
    validate_language(lang)
    cache_key = f"about:{lang}"
    cached = get_cached(cache_key)
    if cached is not None:
        return AboutOut.model_validate(cached)
    out = _get_about(lang, db)
    set_cached(cache_key, out.model_dump())
    return out


@router.put("/api/about/{lang}", response_model=AboutOut)
def update_about(lang: str, payload: AboutUpdate, db: Session = Depends(get_db)):
    """Update about section for the requested language."""
    validate_language(lang)

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
    invalidate(f"about:{lang}", f"portfolio:{lang}")
    return _get_about(lang, db)


# ── Full portfolio ─────────────────────────────────────────────────────────────

@router.get("/api/portfolio/{lang}", response_model=FullPortfolioOut)
def get_full_portfolio(lang: str, db: Session = Depends(get_db)):
    """
    Single endpoint that returns every piece of data needed to render
    the portfolio in the requested language.
    """
    validate_language(lang)

    cache_key = f"portfolio:{lang}"
    cached = get_cached(cache_key)
    if cached is not None:
        return FullPortfolioOut.model_validate(cached)

    personal = get_first_or_404(
        db,
        PersonalInfo,
        {"id": 1},
        "Database is empty. POST /api/seed to populate it first."
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

    out = FullPortfolioOut(
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
    set_cached(cache_key, out.model_dump())
    return out


# ── Seed ──────────────────────────────────────────────────────────────────────

@router.post("/api/seed", response_model=MessageOut, status_code=201)
def run_seed(db: Session = Depends(get_db)):
    """
    (Re)populate the database with default portfolio data.
    WARNING: this deletes all existing rows first.
    """
    seed_all(db)
    invalidate("portfolio:es", "portfolio:en", "hero:es", "hero:en", "about:es", "about:en")
    return MessageOut(message="Database seeded successfully.")
