# N-MENASHE

Heritage library & media — Torah, zmanim, and community. A mobile-first Next.js app with a Hebrew-calendar prayer-time schedule ("Zmanim Train"), the Tanakh library, curated video and audio teachings, and a community Q&A feed. Bilingual: English & עברית (RTL).

## Features

- **Zmanim Calendar** — live "train line" schedule of daily zmanim (dawn → nightfall) with a countdown board, live clock, animated status indicators, and a location picker (Israeli cities + browser geolocation)
- **Library** — the books of the Tanakh (Torah, Nevi'im, Ketuvim) with chapter counts
- **Videos** — curated YouTube teachings on Torah and holidays, embedded responsively (privacy-enhanced `youtube-nocookie`)
- **Audio** — shiurim and podcasts with inline players
- **Q&A** — community feed where visitors can ask questions, answer, and upvote
- **Hebrew date** in the header, powered by `@hebcal/core`
- **Bilingual UI** — full English/Hebrew translation via `next-intl` (`/en/…`, `/he/…` routes, automatic RTL)
- **PWA** — installable, offline-capable via Serwist service worker
- **Fully responsive** — mobile-first layout with a floating tab bar, safe-area support, and dark mode via `prefers-color-scheme`

## Tech Stack

- Next.js 16 (App Router, Turbopack) + React 19 + TypeScript
- Tailwind CSS v4 + plain CSS custom properties for theming
- styled-components for parts of the Zmanim UI
- `@hebcal/core` for Hebrew calendar dates, Hebcal API for zmanim
- next-intl (i18n) · zod (API validation) · date-fns (date math) · framer-motion (animations)
- Serwist (PWA) · Vitest (unit tests) · Playwright (e2e)

## Getting Started

```javascript
npm install
npm run dev
```

Open http://localhost:3000 — you'll be redirected to `/en` (or use the globe button to switch to עברית).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server (service worker disabled) |
| `npm run build` | Production build (generates `public/sw.js`) |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Type-check without emitting (`tsc --noEmit`) |
| `npm run format` | Format everything with Prettier |
| `npm run format:check` | Check formatting (CI-safe) |
| `npm run test` | Run unit tests (Vitest) |
| `npm run test:watch` | Unit tests in watch mode |
| `npm run test:e2e` | Run Playwright e2e tests (boots dev server automatically) |

## Project Structure

```javascript
app/
├── page.tsx              # Home (translated)
├── layout.tsx            # Root layout (locale-aware html lang/dir, nav, tab bar)
├── globals.css           # Design system (tokens, cards, grids, tab bar, locale switcher)
├── calendar/             # Zmanim Train schedule
├── library/              # Tanakh library (translated)
├── videos/               # Video teachings (translated)
├── audio/                # Audio teachings (translated)
├── qa/                   # Community Q&A feed (translated)
├── sw.ts                 # Serwist service worker source
├── error.tsx             # Route error boundary
├── global-error.tsx      # Root error boundary
├── loading.tsx           # Route loading UI
├── not-found.tsx         # 404 page
├── components/
│   ├── Header/           # Nav, TabBar, LocaleSwitcher
│   ├── Feedback/         # ErrorPanel
│   ├── Zmanim/           # Transit board (header, timeline stations, app)
│   └── icons/            # Animated WiFi status icon
├── lib/
│   ├── hebcal.ts         # Zod-validated Hebcal API client
│   └── registry.tsx      # styled-components SSR registry
└── utils/
    ├── zmanimLocations.ts    # Preset cities + geolocation + localStorage
    ├── wifiStatus.ts         # Event status/countdown logic
    ├── zmanimLocations.test.ts
    └── wifiStatus.test.ts
i18n/
├── routing.ts            # Locales: en, he (prefix: always)
├── navigation.ts         # Locale-aware Link/usePathname/useRouter
└── request.ts            # Per-request message loading
messages/
├── en.json
└── he.json
e2e/
└── app.spec.ts           # Playwright smoke tests (mobile + desktop)
.github/workflows/
└── ci.yml                # Lint + typecheck + build on PRs
```

## Deployment

The easiest way to deploy is Vercel — push to GitHub and import the repo. GitHub Actions runs lint + typecheck + build on every PR.

## License

MIT (add a `LICENSE` file if you want others to reuse this code)