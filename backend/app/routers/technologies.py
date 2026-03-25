"""
Read + update endpoints for Technologies / Skills.
"""

from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Technology
from ..schemas import TechnologyOut, TechnologyUpdate

router = APIRouter(prefix="/api/technologies", tags=["technologies"])

CATEGORIES = {"Frontend", "Backend", "Databases", "DevOps"}


@router.get("", response_model=List[TechnologyOut])
def list_technologies(category: Optional[str] = None, db: Session = Depends(get_db)):
    """List all technologies, optionally filtered by category."""
    q = db.query(Technology)
    if category:
        if category not in CATEGORIES:
            raise HTTPException(422, f"category must be one of {CATEGORIES}")
        q = q.filter(Technology.category == category)
    return q.order_by(Technology.category, Technology.order).all()


@router.get("/{tech_id}", response_model=TechnologyOut)
def get_technology(tech_id: int, db: Session = Depends(get_db)):
    tech = db.query(Technology).filter(Technology.id == tech_id).first()
    if not tech:
        raise HTTPException(404, "Technology not found")
    return tech


@router.put("/{tech_id}", response_model=TechnologyOut)
def update_technology(
    tech_id: int,
    payload: TechnologyUpdate,
    db: Session = Depends(get_db),
):
    tech = db.query(Technology).filter(Technology.id == tech_id).first()
    if not tech:
        raise HTTPException(404, "Technology not found")
    for field, value in payload.model_dump(exclude_none=True).items():
        setattr(tech, field, value)
    db.commit()
    db.refresh(tech)
    return tech
