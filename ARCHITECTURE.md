# Architecture

## Structure

```
app/                → Next.js App Router (pages, API, loading/error states)
components/         → NewsCarousel, NewsCard, ErrorBoundary, Icons
lib/                → utils.ts, constants.ts, env.ts (Zod validation)
__tests__/          → Jest + React Testing Library
```

## Key Decisions

- **Infinite scroll** — Articles tripled for seamless looping
- **Edge blur** — Cards blur + scale down near viewport edges
- **React cache()** — Deduplicates fetch between metadata and render
- **Zod** — Runtime env validation
- **Husky** — Pre-commit linting + tests

## Commands

```bash
pnpm dev            # Development
pnpm test           # Run tests (38 passing)
pnpm build          # Production build
```
