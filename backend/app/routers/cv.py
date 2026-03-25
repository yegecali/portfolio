"""
CV generation endpoint — returns a PDF file for download.
"""

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import Response
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import (
    Experience, HeroTranslation, NavLink, PersonalInfo,
    Project, SpokenLanguage, Technology,
)
from ..routers.portfolio import _get_about, get_full_portfolio
from ..schemas import FullPortfolioOut
from ..services.cv_generator import generate_cv

router = APIRouter(prefix="/api/cv", tags=["cv"])

SUPPORTED_LANGS = {"es", "en"}


@router.get("/{lang}")
def download_cv(lang: str, db: Session = Depends(get_db)):
    """
    Generate and stream a PDF CV in the requested language.

    Returns a PDF with:
    - Header: name, role, contact info
    - About section
    - Work experience with bullet points
    - Featured projects
    - Technical skills by category
    - Spoken languages with proficiency bars
    """
    if lang not in SUPPORTED_LANGS:
        raise HTTPException(422, f"lang must be one of {SUPPORTED_LANGS}")

    # Reuse the full portfolio aggregation
    portfolio = get_full_portfolio(lang=lang, db=db)

    pdf_bytes = generate_cv(portfolio, lang=lang)

    filename = f"cv-{portfolio.personal.name.lower().replace(' ', '-')}-{lang}.pdf"

    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={
            "Content-Disposition": f'attachment; filename="{filename}"',
            "Content-Length": str(len(pdf_bytes)),
        },
    )
