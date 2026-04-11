"""
FastAPI application entry point.

Start the server with:
    uvicorn app.main:app --reload --port 8000

Interactive docs:
    http://localhost:8000/docs   (Swagger UI)
    http://localhost:8000/redoc  (ReDoc)

Seed the database on first run:
    POST http://localhost:8000/api/seed

Required environment variables (see .env.example):
    MYSQL_USER, MYSQL_PASSWORD, MYSQL_HOST, MYSQL_PORT, MYSQL_DB
    REDIS_URL
"""

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .cache import init_cache, close_cache
from .database import Base, engine, SessionLocal
from .routers import cv, experiences, personal, portfolio, projects, technologies
from .seed import seed_all


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize Redis cache
    init_cache()

    # Create all tables on startup
    Base.metadata.create_all(bind=engine)

    # Auto-seed if the DB is empty
    with SessionLocal() as db:
        from .models import PersonalInfo
        if not db.query(PersonalInfo).first():
            seed_all(db)

    yield

    # Shutdown: close Redis connection
    close_cache()


app = FastAPI(
    title="Portfolio API",
    description=(
        "Backend for Yemi Genderson's portfolio. "
        "Supports multilanguage (ES / EN) and PDF CV generation."
    ),
    version="1.0.0",
    lifespan=lifespan,
)

# ── CORS ──────────────────────────────────────────────────────────────────────
# Allow the Vite dev server (port 5173) and any local origin during development.

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ───────────────────────────────────────────────────────────────────

app.include_router(portfolio.router)
app.include_router(personal.router)
app.include_router(experiences.router)
app.include_router(projects.router)
app.include_router(technologies.router)
app.include_router(cv.router)


# ── Health check ──────────────────────────────────────────────────────────────

@app.get("/api/health", tags=["meta"])
def health():
    return {"status": "ok", "version": app.version}
