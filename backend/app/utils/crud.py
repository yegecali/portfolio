"""
CRUD utility functions for database operations.
"""

from typing import Type, TypeVar, Optional, Any, Dict

from fastapi import HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel

from ..database import Base


ModelType = TypeVar("ModelType", bound=Base)
SchemaType = TypeVar("SchemaType", bound=BaseModel)


def get_or_404(
    db: Session,
    model: Type[ModelType],
    entity_id: int,
    error_message: Optional[str] = None
) -> ModelType:
    """
    Get an entity by ID or raise 404 if not found.
    
    Args:
        db: Database session
        model: SQLAlchemy model class
        entity_id: ID of the entity to retrieve
        error_message: Custom error message (optional)
        
    Returns:
        The entity if found
        
    Raises:
        HTTPException: 404 if entity not found
    """
    entity = db.query(model).filter(model.id == entity_id).first()
    if not entity:
        message = error_message or f"{model.__name__} not found"
        raise HTTPException(status_code=404, detail=message)
    return entity


def update_entity(
    entity: ModelType,
    payload: SchemaType,
    db: Session
) -> ModelType:
    """
    Update an entity with data from a Pydantic schema.
    
    Args:
        entity: SQLAlchemy model instance to update
        payload: Pydantic schema with update data
        db: Database session
        
    Returns:
        The updated entity
    """
    for field, value in payload.model_dump(exclude_none=True).items():
        setattr(entity, field, value)
    db.commit()
    db.refresh(entity)
    return entity


def get_first_or_404(
    db: Session,
    model: Type[ModelType],
    filters: Dict[str, Any],
    error_message: Optional[str] = None
) -> ModelType:
    """
    Get the first entity matching filters or raise 404 if not found.
    
    Args:
        db: Database session
        model: SQLAlchemy model class
        filters: Dictionary of filter conditions (field_name: value)
        error_message: Custom error message (optional)
        
    Returns:
        The entity if found
        
    Raises:
        HTTPException: 404 if entity not found
    """
    query = db.query(model)
    for field, value in filters.items():
        query = query.filter(getattr(model, field) == value)
    
    entity = query.first()
    if not entity:
        message = error_message or f"{model.__name__} not found"
        raise HTTPException(status_code=404, detail=message)
    return entity
