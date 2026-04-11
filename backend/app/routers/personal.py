"""
CRUD for PersonalInfo (single row, id=1).
"""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..cache import get_cached, set_cached, invalidate
from ..database import get_db
from ..models import PersonalInfo
from ..schemas import PersonalInfoOut, PersonalInfoUpdate
from ..utils.crud import get_first_or_404, update_entity

router = APIRouter(prefix="/api/personal", tags=["personal"])

_CACHE_KEY = "personal"


def _get_or_404(db: Session) -> PersonalInfo:
    """Get the personal info record (id=1) or raise 404."""
    return get_first_or_404(
        db,
        PersonalInfo,
        {"id": 1},
        "Personal info not found. Run /api/seed first."
    )


@router.get("", response_model=PersonalInfoOut)
def get_personal(db: Session = Depends(get_db)):
    """Return the portfolio owner's personal info."""
    cached = get_cached(_CACHE_KEY)
    if cached is not None:
        return PersonalInfoOut.model_validate(cached)
    row = _get_or_404(db)
    out = PersonalInfoOut.model_validate(row)
    set_cached(_CACHE_KEY, out.model_dump())
    return out


@router.put("", response_model=PersonalInfoOut)
def update_personal(payload: PersonalInfoUpdate, db: Session = Depends(get_db)):
    """Partial-update personal info (only supplied fields are changed)."""
    row = _get_or_404(db)
    result = update_entity(row, payload, db)
    invalidate(_CACHE_KEY, "portfolio:es", "portfolio:en")
    return result
