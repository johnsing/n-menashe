# N-MENASHE

Heritage library & media — Torah, zmanim, and community. A mobile-first Next.js app with a Hebrew-calendar prayer-time schedule ("Zmanim Train"), the Tanakh library, curated video and audio teachings, and a community Q&A feed.

## Features

- **Zmanim Calendar** — live "train line" schedule of daily services (Shacharit, Mincha, Maariv) with a countdown board, live clock, and animated status indicators
- **Library** — the books of the Tanakh (Torah, Nevi'im, Ketuvim) with chapter counts
- **Videos** — curated YouTube teachings on Torah and holidays, embedded responsively
- **Audio** — shiurim and podcasts with inline players
- **Q&A** — community feed where visitors can ask questions, answer, and upvote
- **Hebrew date** in the header, powered by `@hebcal/core`
- **Fully responsive** — mobile-first layout with a floating tab bar, safe-area support, and dark mode via `prefers-color-scheme`

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack) + React 19 + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) + plain CSS custom properties for theming
- [styled-components](https://styled-components.com) for the Zmanim transit-board UI
- [Hebcal](https://github.com/hebcal/hebcal-core) for Hebrew calendar dates

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Project Structure

```javascript
app/
├── page.tsx              # Home
├── layout.tsx            # Root layout (nav, tab bar, styled-components registry)
├── globals.css           # Design system (tokens, cards, grids, tab bar)
├── calendar/             # Zmanim Train schedule
├── library/              # Tanakh library
├── videos/               # Video teachings
├── audio/                # Audio teachings
├── qa/                   # Community Q&A feed
├── components/
│   ├── Header/           # Top nav + floating TabBar
│   ├── Zmanim/           # Transit board (header, timeline stations)
│   └── icons/            # Animated WiFi status icon
├── lib/registry.tsx      # styled-components SSR registry
└── utils/wifiStatus.ts   # Event status/countdown logic
```

## Deployment

The easiest way to deploy is [Vercel](https://vercel.com/new) — the platform from the creators of Next.js. Push to GitHub and import the repo.

## License

MIT (add a `LICENSE` file if you want others to reuse this code)