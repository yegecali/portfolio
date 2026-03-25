"""
CRUD for PersonalInfo (single row, id=1).
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import PersonalInfo
from ..schemas import PersonalInfoOut, PersonalInfoUpdate, MessageOut

router = APIRouter(prefix="/api/personal", tags=["personal"])


def _get_or_404(db: Session) -> PersonalInfo:
    row = db.query(PersonalInfo).filter(PersonalInfo.id == 1).first()
    if not row:
        raise HTTPException(status_code=404, detail="Personal info not found. Run /api/seed first.")
    return row


@router.get("", response_model=PersonalInfoOut)
def get_personal(db: Session = Depends(get_db)):
    """Return the portfolio owner's personal info."""
    return _get_or_404(db)


@router.put("", response_model=PersonalInfoOut)
def update_personal(payload: PersonalInfoUpdate, db: Session = Depends(get_db)):
    """Partial-update personal info (only supplied fields are changed)."""
    row = _get_or_404(db)
    for field, value in payload.model_dump(exclude_none=True).items():
        setattr(row, field, value)
    db.commit()
    db.refresh(row)
    return row
