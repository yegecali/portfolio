# Repository Guidelines

## Project Structure & Module Organization

This is a Vite, React, and TypeScript portfolio app. Application code lives in `src/`, with entry points in `src/main.tsx` and `src/App.tsx`. Reusable UI is grouped under `src/components/` by purpose: `general`, `layout`, `navigation`, `sections`, and `data-display`. Hooks are in `src/hooks/`, contexts in `src/contexts/`, and shared utilities, API helpers, types, theme, and i18n dictionaries are in `src/lib/`. Tests live in `src/test/` and mirror the source area they cover. Static public assets live in `public/`.

## Build, Test, and Development Commands

- `npm run dev`: start the local Vite development server with HMR.
- `npm run build`: run TypeScript project checks, then create the production Vite build.
- `npm run preview`: serve the built app locally for production-like checks.
- `npm run lint`: run ESLint across the repository.
- `npm test`: run the Vitest suite once.
- `npm run test:watch`: run Vitest in watch mode while developing.
- `npm run test:coverage`: run Vitest with V8 coverage output.
- `npm run test:e2e`: run Playwright tests; config expects specs in `e2e/` and starts preview automatically.

## Coding Style & Naming Conventions

Use TypeScript and React function components. Keep component files in PascalCase, for example `HeroSection.tsx`; hooks use `useName.ts`; tests use `Name.test.tsx` or `useName.test.ts`. Imports may use the `@/` alias for `src/`. Existing files use two-space indentation, double quotes, semicolons, and Tailwind utility classes. Prefer shared helpers such as `mergeClasses` from `src/lib/utils.ts`.

## Testing Guidelines

Vitest, Testing Library, and `@testing-library/jest-dom` are configured through `src/test/setup.ts`. Place focused tests under `src/test/components`, `src/test/hooks`, or `src/test/lib`. Test observable behavior through roles, text, user events, and public outputs rather than implementation details. Add or update tests when changing shared hooks, utilities, contexts, or user-facing components.

## Commit & Pull Request Guidelines

Recent history uses Conventional Commit-style subjects such as `feat: ...` and `refactor: ...`. Keep commits scoped and imperative. Pull requests should include a short summary, linked issue when available, commands run (`npm test`, `npm run lint`, etc.), and screenshots for visual changes. Note skipped checks or follow-up work explicitly.

## Security & Configuration Tips

Do not commit local secrets or generated build output. Keep environment-specific settings out of source unless they are safe defaults. When changing deployment paths, verify `vite.config.ts`, `playwright.config.ts`, `public/sitemap.xml`, and related metadata stay consistent.
