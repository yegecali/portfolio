"""
Validation utilities for request parameters.
"""

from fastapi import HTTPException

from .constants import SUPPORTED_LANGS, TECHNOLOGY_CATEGORIES


def validate_language(lang: str) -> None:
    """
    Validate that the provided language is supported.
    
    Args:
        lang: Language code to validate
        
    Raises:
        HTTPException: If language is not supported
    """
    if lang not in SUPPORTED_LANGS:
        raise HTTPException(
            status_code=422,
            detail=f"lang must be one of {SUPPORTED_LANGS}"
        )


def validate_category(category: str) -> None:
    """
    Validate that the provided technology category is valid.
    
    Args:
        category: Category name to validate
        
    Raises:
        HTTPException: If category is not valid
    """
    if category not in TECHNOLOGY_CATEGORIES:
        raise HTTPException(
            status_code=422,
            detail=f"category must be one of {TECHNOLOGY_CATEGORIES}"
        )
