"""
Read + update endpoints for Projects.
"""

from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..cache import get_cached, set_cached, invalidate
from ..database import get_db
from ..models import Project, ProjectTranslation
from ..schemas import ProjectOut, ProjectTranslationUpdate, ProjectUpdate
from ..utils.validators import validate_language
from ..utils.crud import get_or_404, update_entity

router = APIRouter(prefix="/api/projects", tags=["projects"])


def _build_out(proj: Project, lang: str) -> ProjectOut:
    """Build ProjectOut schema from Project model for given language."""
    description = next(
        (t.description for t in proj.translations if t.lang == lang),
        proj.translations[0].description if proj.translations else "",
    )
    return ProjectOut(
        id=proj.id,
        name=proj.name,
        url=proj.url,
        technologies=proj.technologies or [],
        description=description,
        order=proj.order,
    )


@router.get("", response_model=List[ProjectOut])
def list_projects(lang: str = "es", db: Session = Depends(get_db)):
    """List all projects in the requested language."""
    validate_language(lang)
    cache_key = f"projects:{lang}"
    cached = get_cached(cache_key)
    if cached is not None:
        return [ProjectOut.model_validate(p) for p in cached]
    projects = db.query(Project).order_by(Project.order).all()
    out = [_build_out(p, lang) for p in projects]
    set_cached(cache_key, [o.model_dump() for o in out])
    return out


@router.get("/{project_id}", response_model=ProjectOut)
def get_project(project_id: int, lang: str = "es", db: Session = Depends(get_db)):
    """Get a single project by ID."""
    validate_language(lang)
    proj = get_or_404(db, Project, project_id, "Project not found")
    return _build_out(proj, lang)


@router.put("/{project_id}", response_model=ProjectOut)
def update_project(
    project_id: int,
    payload: ProjectUpdate,
    lang: str = "es",
    db: Session = Depends(get_db),
):
    """Update non-translatable fields (name, url, technologies, order)."""
    validate_language(lang)
    proj = get_or_404(db, Project, project_id, "Project not found")
    proj = update_entity(proj, payload, db)
    invalidate("projects:es", "projects:en", "portfolio:es", "portfolio:en")
    return _build_out(proj, lang)


@router.put("/{project_id}/translation/{lang}", response_model=ProjectOut)
def update_project_translation(
    project_id: int,
    lang: str,
    payload: ProjectTranslationUpdate,
    db: Session = Depends(get_db),
):
    """Replace the project description for a given language."""
    validate_language(lang)
    proj = get_or_404(db, Project, project_id, "Project not found")

    trans = next((t for t in proj.translations if t.lang == lang), None)
    if trans:
        trans.description = payload.description
    else:
        db.add(ProjectTranslation(project_id=project_id, lang=lang, description=payload.description))

    db.commit()
    db.refresh(proj)
    invalidate(f"projects:{lang}", f"portfolio:{lang}")
    return _build_out(proj, lang)
