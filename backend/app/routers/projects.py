"""
Read + update endpoints for Projects.
"""

from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Project, ProjectTranslation
from ..schemas import ProjectOut, ProjectTranslationUpdate, ProjectUpdate

router = APIRouter(prefix="/api/projects", tags=["projects"])

SUPPORTED_LANGS = {"es", "en"}


def _build_out(proj: Project, lang: str) -> ProjectOut:
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
    if lang not in SUPPORTED_LANGS:
        raise HTTPException(422, f"lang must be one of {SUPPORTED_LANGS}")
    projects = db.query(Project).order_by(Project.order).all()
    return [_build_out(p, lang) for p in projects]


@router.get("/{project_id}", response_model=ProjectOut)
def get_project(project_id: int, lang: str = "es", db: Session = Depends(get_db)):
    proj = db.query(Project).filter(Project.id == project_id).first()
    if not proj:
        raise HTTPException(404, "Project not found")
    return _build_out(proj, lang)


@router.put("/{project_id}", response_model=ProjectOut)
def update_project(
    project_id: int,
    payload: ProjectUpdate,
    lang: str = "es",
    db: Session = Depends(get_db),
):
    """Update non-translatable fields (name, url, technologies, order)."""
    proj = db.query(Project).filter(Project.id == project_id).first()
    if not proj:
        raise HTTPException(404, "Project not found")
    for field, value in payload.model_dump(exclude_none=True).items():
        setattr(proj, field, value)
    db.commit()
    db.refresh(proj)
    return _build_out(proj, lang)


@router.put("/{project_id}/translation/{lang}", response_model=ProjectOut)
def update_project_translation(
    project_id: int,
    lang: str,
    payload: ProjectTranslationUpdate,
    db: Session = Depends(get_db),
):
    """Replace the project description for a given language."""
    if lang not in SUPPORTED_LANGS:
        raise HTTPException(422, f"lang must be one of {SUPPORTED_LANGS}")

    proj = db.query(Project).filter(Project.id == project_id).first()
    if not proj:
        raise HTTPException(404, "Project not found")

    trans = next((t for t in proj.translations if t.lang == lang), None)
    if trans:
        trans.description = payload.description
    else:
        db.add(ProjectTranslation(project_id=project_id, lang=lang, description=payload.description))

    db.commit()
    db.refresh(proj)
    return _build_out(proj, lang)
