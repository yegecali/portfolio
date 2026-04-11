"""
Redis cache helpers.

Required environment variables:
    REDIS_URL  – full Redis URL (default: redis://localhost:6379/0)

Usage:
    from .cache import get_cached, set_cached, invalidate

    # In a GET endpoint:
    data = get_cached(key)
    if data is None:
        data = compute_data()
        set_cached(key, data, ttl=300)
    return data

    # After a write:
    invalidate("portfolio:es", "hero:es", ...)
"""

import json
import logging
import os
from typing import Any

import redis

logger = logging.getLogger(__name__)

REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")
try:
    DEFAULT_TTL = int(os.getenv("CACHE_TTL", "300") or "300")  # seconds
except ValueError:
    DEFAULT_TTL = 300
    logger.warning("Invalid CACHE_TTL value; defaulting to %d seconds.", DEFAULT_TTL)

_client: redis.Redis | None = None


def get_client() -> redis.Redis | None:
    """Return the shared Redis client, or None if Redis is unavailable."""
    global _client
    return _client


def init_cache() -> None:
    """Initialize the Redis connection. Called once at application startup."""
    global _client
    try:
        _client = redis.from_url(REDIS_URL, decode_responses=True)
        _client.ping()
        logger.info("Redis cache connected at %s", REDIS_URL)
    except Exception as exc:  # pragma: no cover
        logger.warning("Redis unavailable (%s) – caching disabled.", exc)
        _client = None


def close_cache() -> None:
    """Close the Redis connection. Called at application shutdown."""
    global _client
    if _client is not None:
        _client.close()
        _client = None


def get_cached(key: str) -> Any | None:
    """Return the cached value for *key*, or None on miss / error."""
    client = get_client()
    if client is None:
        return None
    try:
        raw = client.get(key)
        return json.loads(raw) if raw is not None else None
    except Exception as exc:
        logger.warning("Cache GET error for key '%s': %s", key, exc)
        return None


def set_cached(key: str, value: Any, ttl: int = DEFAULT_TTL) -> None:
    """Serialize *value* as JSON and store it in Redis with the given TTL."""
    client = get_client()
    if client is None:
        return
    try:
        client.setex(key, ttl, json.dumps(value))
    except Exception as exc:
        logger.warning("Cache SET error for key '%s': %s", key, exc)


def invalidate(*keys: str) -> None:
    """Delete one or more cache keys."""
    client = get_client()
    if client is None:
        return
    try:
        client.delete(*keys)
    except Exception as exc:
        logger.warning("Cache DELETE error for keys %s: %s", keys, exc)
