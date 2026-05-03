# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **React + TypeScript portfolio website** built with Vite. It features a responsive design with multiple sections (Hero, About, Skills, Experience, Work, Contact), dark/light theme support, internationalization (i18n), and an admin interface for customization. The project is containerized with Docker and includes comprehensive testing (unit + E2E).

**Key Technologies:**
- React 19 + TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- Vitest (unit tests)
- Playwright (E2E tests)
- Framer Motion (animations)
- Zustand (state management)
- Docker/Docker Compose

## Commands

### Development
- **Start dev server:** `npm run dev` → Hot Module Replacement at http://localhost:5173/portfolio/
- **Build for production:** `npm run build` → Runs TypeScript check + Vite build to `/dist`
- **Preview production build:** `npm run preview` → Serve built app at http://localhost:4173/portfolio/

### Testing
- **Run unit tests once:** `npm run test`
- **Run tests in watch mode:** `npm run test:watch`
- **Generate coverage report:** `npm run test:coverage`
- **Run E2E tests:** `npm run test:e2e` → Requires `npm run build && npm run preview` running
- **Run a single test file:** `npm run test -- src/test/hooks/useTheme.test.ts`

### Code Quality
- **Lint code:** `npm run lint` → ESLint with TypeScript support
- **Type check only:** `tsc --noEmit` (run independently if needed)

### Docker
- **Build & run with Docker Compose:** `docker-compose up --build`
- **Access via Docker:** http://localhost:8080/portfolio/
- **Build image only:** `docker build -t portfolio-app .`

## Project Structure

```
src/
├── components/          # React components organized by category
│   ├── sections/        # Page sections (Hero, About, Skills, etc.)
│   ├── layout/          # Header, Footer, PageLayout
│   ├── navigation/      # Navigation components
│   ├── general/         # Reusable UI (CustomCursor, etc.)
│   └── data-display/    # Display components
├── hooks/               # Custom React hooks (useTheme, useI18n, etc.)
├── contexts/            # Context providers (Theme, I18n, Portfolio)
├── lib/                 # Utilities, constants, API, types
│   └── i18n/            # Internationalization data
├── pages/               # Full-page components (AdminPage)
├── test/                # Test files mirroring src/ structure
└── assets/              # Static assets
```

## Architecture & Key Patterns

### Routing & Admin Mode
- **Single-page application** (no router, smooth scroll nav)
- **Admin route detection** in `App.tsx` — detects admin mode from URL:
  - Query param: `?admin`
  - Path: `/admin`
  - Hash: `#/admin`
- **Admin page** bypasses normal portfolio flow, accesses different context

### Context & State
- **ThemeContext** — Dark/light mode, mounted state, preference persistence
- **I18nContext** — Language switching (i18n data in `src/lib/i18n/`)
- **PortfolioContext** — Portfolio data (fetched from API or defaults)
- **Zustand** in some components for local state (if needed)

### Styling & Responsive Design
- **Tailwind CSS** for all styling
- **Mobile-first responsive** — Header has mobile navigation
- **Dynamic theme variables** via CSS (see `ThemeContext` implementation)
- **CVA (class-variance-authority)** for component variants
- **Custom Tailwind config** in `tailwind.config.js` (design tokens)

### Animations
- **Framer Motion** for element animations
- **tsparticles** for background particle effects (in Hero section)
- **CSS animations** via Tailwind for utility-based effects
- **Custom cursor** with smooth following behavior

### API & HTTP
- **API calls** in `src/lib/api.ts` — with timeout, cancellation, error handling
- **HTTP utilities** provide request/response intercepting
- **Default fallback data** in `src/lib/defaults.ts` for offline/error states

### Testing Patterns
- **Unit tests** colocated in `src/test/` (mirrors src/ structure)
- **Setup file** at `src/test/setup.ts` — testing library config
- **Vitest globals** enabled (no need to import `describe`, `it`, `expect`)
- **E2E tests** in `e2e/` directory (Playwright)

## Important Configuration Notes

### TypeScript
- **Strict mode enabled** — `noUnusedLocals`, `noUnusedParameters`, etc.
- **Path alias:** `@/` points to `src/`
- **Target:** ES2023

### Vite
- **Base path:** `/portfolio/` (adjust if deploying elsewhere)
- **JSX handling:** React 17+ auto-transform (no need for React import)
- **Alias:** `@/` for clean imports

### Docker
- **Multi-stage build** — Builder stage compiles, then nginx serves
- **Nginx serves at:** `/usr/share/nginx/html/portfolio/` (matches Vite base)
- **Port:** 80 (exposed via Docker Compose as 8080)

## Key Files & Their Roles

| File | Purpose |
|------|---------|
| `src/App.tsx` | Root component; admin route detection; provider setup |
| `src/contexts/*` | Theme, I18n, Portfolio providers |
| `src/lib/api.ts` | HTTP request utilities with timeout & cancellation |
| `src/lib/constants.ts` | Portfolio data schema & defaults |
| `src/lib/theme.ts` | Theme color & style configuration |
| `vite.config.ts` | Vite build & test setup (includes Vitest config) |
| `tailwind.config.js` | Design tokens & Tailwind customization |
| `tsconfig.app.json` | App-specific TypeScript config |
| `eslint.config.js` | Linting rules (React, TypeScript, hooks) |
| `playwright.config.ts` | E2E test configuration |
| `Dockerfile` | Multi-stage Docker build (Node builder → Nginx server) |

## Common Development Tasks

### Adding a New Section
1. Create component in `src/components/sections/`
2. Import & add to `AppContent()` in `src/App.tsx`
3. Style with Tailwind, leverage design tokens from `src/lib/theme.ts`
4. Add smooth-scroll anchor in markup (id matching nav link href)

### Modifying Theme/Colors
- Edit `src/lib/theme.ts` for color definitions
- Update `tailwind.config.js` for Tailwind theme extension
- Changes auto-apply via `ThemeContext` CSS variable injection

### Testing Components
- Create test in `src/test/components/` or `src/test/hooks/` (mirror src structure)
- Use Testing Library for component tests
- Run with `npm run test:watch` for development

### Building for Production
- `npm run build` compiles TypeScript + runs Vite build
- Output in `dist/` directory
- Docker Compose will copy this to Nginx during container build
