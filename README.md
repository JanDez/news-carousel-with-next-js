# News Carousel

Responsive news carousel with Next.js 16, TypeScript, and pure CSS.

> 📖 See [ARCHITECTURE.md](./ARCHITECTURE.md) for technical decisions.

## Quick Start

```bash
pnpm install
cp .env.example .env.local   # Add your NEWS_API_KEY
pnpm dev
```

Get the API key from [NewsAPI](https://newsapi.org/).

## Features

- Infinite scroll carousel with edge blur effect
- Responsive: 1-4 cards based on viewport
- SEO: Dynamic metadata, OpenGraph, JSON-LD
- Accessibility: ARIA labels, keyboard navigation
- 38 passing tests

## Tech

Next.js 16 • React 19 • TypeScript • CSS Modules • Jest

## Scripts

```bash
pnpm dev       # Development
pnpm test      # Run tests
pnpm build     # Production build
```

## Design

Based on [Adobe XD specs](https://xd.adobe.com/view/5e26d9f1-ec91-434f-9896-f3c6aa98118e-0b75/specs/) — Card: 423×532px, 8px radius.
