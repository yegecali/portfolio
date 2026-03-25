"""
Read + update endpoints for Work Experience.
"""

from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Experience, ExperiencePosition, ExperienceSummary
from ..schemas import ExperienceOut, ExperienceTranslationUpdate, ExperienceUpdate

router = APIRouter(prefix="/api/experiences", tags=["experiences"])

SUPPORTED_LANGS = {"es", "en"}


def _build_out(exp: Experience, lang: str) -> ExperienceOut:
    position = next(
        (p.position for p in exp.positions if p.lang == lang),
        exp.positions[0].position if exp.positions else "",
    )
    summary = [
        s.text
        for s in sorted(exp.summaries, key=lambda s: s.order)
        if s.lang == lang
    ]
    return ExperienceOut(
        id=exp.id,
        company=exp.company,
        logo_alt=exp.logo_alt,
        position=position,
        start_date=exp.start_date,
        end_date=exp.end_date,
        currently_work_here=exp.currently_work_here,
        summary=summary,
        order=exp.order,
    )


@router.get("", response_model=List[ExperienceOut])
def list_experiences(lang: str = "es", db: Session = Depends(get_db)):
    """List all experiences in the requested language, ordered by `order`."""
    if lang not in SUPPORTED_LANGS:
        raise HTTPException(422, f"lang must be one of {SUPPORTED_LANGS}")
    exps = db.query(Experience).order_by(Experience.order).all()
    return [_build_out(e, lang) for e in exps]


@router.get("/{exp_id}", response_model=ExperienceOut)
def get_experience(exp_id: int, lang: str = "es", db: Session = Depends(get_db)):
    exp = db.query(Experience).filter(Experience.id == exp_id).first()
    if not exp:
        raise HTTPException(404, "Experience not found")
    return _build_out(exp, lang)


@router.put("/{exp_id}", response_model=ExperienceOut)
def update_experience(
    exp_id: int,
    payload: ExperienceUpdate,
    lang: str = "es",
    db: Session = Depends(get_db),
):
    """Update non-translatable fields (company, dates, order)."""
    exp = db.query(Experience).filter(Experience.id == exp_id).first()
    if not exp:
        raise HTTPException(404, "Experience not found")
    for field, value in payload.model_dump(exclude_none=True).items():
        setattr(exp, field, value)
    db.commit()
    db.refresh(exp)
    return _build_out(exp, lang)


@router.put("/{exp_id}/translation/{lang}", response_model=ExperienceOut)
def update_experience_translation(
    exp_id: int,
    lang: str,
    payload: ExperienceTranslationUpdate,
    db: Session = Depends(get_db),
):
    """Replace the position title and all bullet-point summaries for a given language."""
    if lang not in SUPPORTED_LANGS:
        raise HTTPException(422, f"lang must be one of {SUPPORTED_LANGS}")

    exp = db.query(Experience).filter(Experience.id == exp_id).first()
    if not exp:
        raise HTTPException(404, "Experience not found")

    # Update position
    pos_row = next((p for p in exp.positions if p.lang == lang), None)
    if pos_row:
        pos_row.position = payload.position
    else:
        db.add(ExperiencePosition(experience_id=exp_id, lang=lang, position=payload.position))

    # Replace summaries for this lang
    db.query(ExperienceSummary).filter(
        ExperienceSummary.experience_id == exp_id,
        ExperienceSummary.lang == lang,
    ).delete()
    for i, text in enumerate(payload.summary):
        db.add(ExperienceSummary(experience_id=exp_id, lang=lang, order=i, text=text))

    db.commit()
    db.refresh(exp)
    return _build_out(exp, lang)
