"""
Read + update endpoints for Technologies / Skills.
"""

from typing import List, Optional

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Technology
from ..schemas import TechnologyOut, TechnologyUpdate
from ..utils.validators import validate_category
from ..utils.crud import get_or_404, update_entity

router = APIRouter(prefix="/api/technologies", tags=["technologies"])


@router.get("", response_model=List[TechnologyOut])
def list_technologies(category: Optional[str] = None, db: Session = Depends(get_db)):
    """List all technologies, optionally filtered by category."""
    q = db.query(Technology)
    if category:
        validate_category(category)
        q = q.filter(Technology.category == category)
    return q.order_by(Technology.category, Technology.order).all()


@router.get("/{tech_id}", response_model=TechnologyOut)
def get_technology(tech_id: int, db: Session = Depends(get_db)):
    """Get a single technology by ID."""
    return get_or_404(db, Technology, tech_id, "Technology not found")


@router.put("/{tech_id}", response_model=TechnologyOut)
def update_technology(
    tech_id: int,
    payload: TechnologyUpdate,
    db: Session = Depends(get_db),
):
    """Update a technology."""
    tech = get_or_404(db, Technology, tech_id, "Technology not found")
    return update_entity(tech, payload, db)
