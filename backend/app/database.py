"""
MySQL database setup using SQLAlchemy + PyMySQL.

Required environment variables:
    MYSQL_USER      – database username (default: portfolio)
    MYSQL_PASSWORD  – database password (default: portfolio)
    MYSQL_HOST      – database host     (default: localhost)
    MYSQL_PORT      – database port     (default: 3306)
    MYSQL_DB        – database name     (default: portfolio)

Alternatively, set DATABASE_URL directly (takes precedence):
    DATABASE_URL=mysql+pymysql://user:password@host:port/dbname
"""

import os

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase

_user = os.getenv("MYSQL_USER", "portfolio")
_password = os.getenv("MYSQL_PASSWORD", "portfolio")
_host = os.getenv("MYSQL_HOST", "localhost")
_port = os.getenv("MYSQL_PORT", "3306")
_db = os.getenv("MYSQL_DB", "portfolio")
_pool_recycle = int(os.getenv("DB_POOL_RECYCLE", "1800"))

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    f"mysql+pymysql://{_user}:{_password}@{_host}:{_port}/{_db}",
)

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,         # reconnect automatically on stale connections
    pool_recycle=_pool_recycle, # recycle connections (default: 30 min)
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    pass


def get_db():
    """FastAPI dependency: yields a DB session and closes it afterwards."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
