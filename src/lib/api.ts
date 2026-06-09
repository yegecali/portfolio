/**
 * API client for the Portfolio FastAPI backend.
 *
 * All HTTP calls are centralised here to avoid duplication.
 * Endpoints match the documentation in backend/README.md.
 *
 * Base URL: http://localhost:8000  (configurable via VITE_API_URL env var)
 */

import type { LangCode } from "@/lib/i18n/types";

/** Default request timeout in milliseconds. */
const REQUEST_TIMEOUT_MS = 10_000;

export const API_BASE_URL =
  (import.meta.env.VITE_API_URL as string | undefined) ??
  "http://localhost:8000";

/** True only when VITE_API_URL is explicitly configured. */
export const API_ENABLED = Boolean(import.meta.env.VITE_API_URL);

// ── Response types (mirror backend/app/schemas.py) ────────────────────────────

export interface PersonalInfoOut {
  id: number;
  name: string;
  role: string;
  email: string;
  phone?: string;
  location?: string;
  cv_url?: string;
  hero_image?: string;
  github_url?: string;
  linkedin_url?: string;
  whatsapp_url?: string;
  instagram_url?: string;
}

export interface HeroOut {
  lang: string;
  badge?: string;
  title?: string;
  description?: string;
  location?: string;
  status?: string;
}

export interface AboutOut {
  lang: string;
  paragraphs: string[];
  closing: string;
}

export interface NavLinkOut {
  label: string;
  href: string;
}

export interface ExperienceOut {
  id: number;
  company: string;
  logo_alt?: string;
  position: string;
  start_date: string; // "YYYY-MM"
  end_date?: string;  // "YYYY-MM" | null
  currently_work_here: boolean;
  summary: string[];
  order: number;
}

export interface ProjectOut {
  id: number;
  name: string;
  url?: string;
  technologies: string[];
  description: string;
  order: number;
}

export interface TechnologyOut {
  id: number;
  label: string;
  url?: string;
  icon_name?: string;
  category?: string;
  order: number;
}

export interface SpokenLanguageOut {
  id: number;
  name: string;
  flag?: string;
  level: string;
  proficiency: number;
  order: number;
}

export interface FullPortfolioOut {
  lang: string;
  personal: PersonalInfoOut;
  hero: HeroOut;
  about: AboutOut;
  nav: NavLinkOut[];
  experiences: ExperienceOut[];
  projects: ProjectOut[];
  technologies: TechnologyOut[];
  spoken_languages: SpokenLanguageOut[];
}

// ── Update payload types ──────────────────────────────────────────────────────

export interface PersonalInfoUpdate {
  name?: string;
  role?: string;
  email?: string;
  phone?: string;
  location?: string;
  cv_url?: string;
  hero_image?: string;
  github_url?: string;
  linkedin_url?: string;
  whatsapp_url?: string;
  instagram_url?: string;
}

export interface HeroUpdate {
  badge?: string;
  title?: string;
  description?: string;
  location?: string;
  status?: string;
}

export interface AboutUpdate {
  paragraphs?: string[];
  closing?: string;
}

export interface ExperienceUpdate {
  company?: string;
  logo_alt?: string;
  start_date?: string;
  end_date?: string;
  currently_work_here?: boolean;
  order?: number;
}

export interface ExperienceTranslationUpdate {
  position: string;
  summary: string[];
}

export interface ProjectUpdate {
  name?: string;
  url?: string;
  technologies?: string[];
  order?: number;
}

export interface ProjectTranslationUpdate {
  description: string;
}

// ── Core fetch helper ─────────────────────────────────────────────────────────

/**
 * Low-level fetch wrapper used by all API helpers.
 *
 * Features:
 * - Automatic 10-second timeout via `AbortSignal.timeout`.
 * - Accepts an optional external `signal` (e.g. from an `AbortController`);
 *   the request is aborted as soon as either the timeout or the external
 *   signal fires (`AbortSignal.any`).
 * - On non-2xx responses the error message includes the `detail` field from
 *   the JSON body when the backend provides one.
 */
async function apiFetch<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const timeoutSignal = AbortSignal.timeout(REQUEST_TIMEOUT_MS);
  const signal = options?.signal
    ? AbortSignal.any([options.signal as AbortSignal, timeoutSignal])
    : timeoutSignal;

  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
    signal,
  });

  if (!res.ok) {
    let detail = "";
    try {
      const body = await res.json() as { detail?: unknown };
      if (typeof body.detail === "string" && body.detail) {
        detail = `: ${body.detail}`;
      }
    } catch {
      // Ignore JSON parse errors — the status code is enough context.
    }
    throw new Error(
      `API ${options?.method ?? "GET"} ${path} failed: ${res.status}${detail}`,
    );
  }

  return res.json() as Promise<T>;
}

function apiGet<T>(path: string, signal?: AbortSignal): Promise<T> {
  return apiFetch<T>(path, { signal });
}

function apiPut<T>(path: string, body: unknown): Promise<T> {
  return apiFetch<T>(path, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

function apiPost<T>(path: string, body?: unknown): Promise<T> {
  return apiFetch<T>(path, {
    method: "POST",
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
}

// ── Health ────────────────────────────────────────────────────────────────────

export const api = {
  /** GET /api/health */
  health: () => apiGet<{ status: string; version: string }>("/api/health"),

  // ── Portfolio (aggregate) ─────────────────────────────────────────────────

  /** GET /api/portfolio/{lang} — returns all portfolio data in one request */
  getPortfolio: (lang: LangCode, signal?: AbortSignal) =>
    apiGet<FullPortfolioOut>(`/api/portfolio/${lang}`, signal),

  // ── Personal info ─────────────────────────────────────────────────────────

  /** GET /api/personal */
  getPersonal: () => apiGet<PersonalInfoOut>("/api/personal"),

  /** PUT /api/personal */
  updatePersonal: (data: PersonalInfoUpdate) =>
    apiPut<PersonalInfoOut>("/api/personal", data),

  // ── Hero ─────────────────────────────────────────────────────────────────

  /** GET /api/hero/{lang} */
  getHero: (lang: LangCode) => apiGet<HeroOut>(`/api/hero/${lang}`),

  /** PUT /api/hero/{lang} */
  updateHero: (lang: LangCode, data: HeroUpdate) =>
    apiPut<HeroOut>(`/api/hero/${lang}`, data),

  // ── About ─────────────────────────────────────────────────────────────────

  /** GET /api/about/{lang} */
  getAbout: (lang: LangCode) => apiGet<AboutOut>(`/api/about/${lang}`),

  /** PUT /api/about/{lang} */
  updateAbout: (lang: LangCode, data: AboutUpdate) =>
    apiPut<AboutOut>(`/api/about/${lang}`, data),

  // ── Experiences ──────────────────────────────────────────────────────────

  /** GET /api/experiences?lang={lang} */
  getExperiences: (lang: LangCode) =>
    apiGet<ExperienceOut[]>(`/api/experiences?lang=${lang}`),

  /** PUT /api/experiences/{id}?lang={lang} */
  updateExperience: (id: number, lang: LangCode, data: ExperienceUpdate) =>
    apiPut<ExperienceOut>(`/api/experiences/${id}?lang=${lang}`, data),

  /** PUT /api/experiences/{id}/translation/{lang} */
  updateExperienceTranslation: (
    id: number,
    lang: LangCode,
    data: ExperienceTranslationUpdate,
  ) =>
    apiPut<ExperienceOut>(
      `/api/experiences/${id}/translation/${lang}`,
      data,
    ),

  // ── Projects ─────────────────────────────────────────────────────────────

  /** GET /api/projects?lang={lang} */
  getProjects: (lang: LangCode) =>
    apiGet<ProjectOut[]>(`/api/projects?lang=${lang}`),

  /** PUT /api/projects/{id}/translation/{lang} */
  updateProjectTranslation: (
    id: number,
    lang: LangCode,
    data: ProjectTranslationUpdate,
  ) =>
    apiPut<ProjectOut>(`/api/projects/${id}/translation/${lang}`, data),

  // ── Technologies ─────────────────────────────────────────────────────────

  /** GET /api/technologies */
  getTechnologies: () => apiGet<TechnologyOut[]>("/api/technologies"),

  // ── Seed ─────────────────────────────────────────────────────────────────

  /** POST /api/seed */
  seed: () => apiPost<{ message: string }>("/api/seed"),
};
