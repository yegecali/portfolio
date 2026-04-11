"""
CV generation endpoint — returns a PDF file for download.
"""

from fastapi import APIRouter, Depends
from fastapi.responses import Response
from sqlalchemy.orm import Session

from ..database import get_db
from ..utils.validators import validate_language
from ..routers.portfolio import get_full_portfolio
from ..services.cv_generator import generate_cv

router = APIRouter(prefix="/api/cv", tags=["cv"])


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
    validate_language(lang)

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
