"""
Read + update endpoints for Technologies / Skills.
"""

from typing import List, Optional

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..cache import get_cached, set_cached, invalidate
from ..database import get_db
from ..models import Technology
from ..schemas import TechnologyOut, TechnologyUpdate
from ..utils.validators import validate_category
from ..utils.crud import get_or_404, update_entity

router = APIRouter(prefix="/api/technologies", tags=["technologies"])


@router.get("", response_model=List[TechnologyOut])
def list_technologies(category: Optional[str] = None, db: Session = Depends(get_db)):
    """List all technologies, optionally filtered by category."""
    cache_key = f"technologies:{category or 'all'}"
    cached = get_cached(cache_key)
    if cached is not None:
        return [TechnologyOut.model_validate(t) for t in cached]
    q = db.query(Technology)
    if category:
        validate_category(category)
        q = q.filter(Technology.category == category)
    rows = q.order_by(Technology.category, Technology.order).all()
    out = [TechnologyOut.model_validate(r) for r in rows]
    set_cached(cache_key, [o.model_dump() for o in out])
    return out


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
    result = update_entity(tech, payload, db)
    # Invalidate the all-categories cache plus every known category-specific key
    from ..utils.constants import TECHNOLOGY_CATEGORIES
    category_keys = [f"technologies:{c}" for c in TECHNOLOGY_CATEGORIES]
    invalidate("technologies:all", "portfolio:es", "portfolio:en", *category_keys)
    return result
