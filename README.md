# Nguyen Thien Thuat — Data Engineer portfolio

Dark, "telemetry"-style portfolio: a home page and two case studies (BA3 Data Platform, Lunch-Order).

## Stack

React 19 · Vite 6 · Tailwind CSS 3 · react-router 7 · framer-motion · hand-written SVG diagrams.

## Run

```bash
npm install
npm run dev       # http://localhost:5173
npm run check     # confidentiality lint: forbidden internal terms in src/
npm run build
npm run preview
```

## Editing content

All copy and numbers live in `src/content/`. Components only render them.
Rules for what may be said about the employer's system: `docs/superpowers/specs/2026-11-19-data-engineer-portfolio-redesign-design.md` §3.
Run `npm run check` before every deploy.

## Theme

Colours are CSS variables (`src/styles/index.css`, dark on `:root`, light on `:root[data-theme="light"]`), exposed to Tailwind through `src/theme/tokens.js`. Dark by default; the nav toggle switches Light/Dark and is stored in `localStorage.theme`.

**After editing `src/theme/tokens.js` or `tailwind.config.js`, restart `npm run dev`** — the dev server does not reload the Tailwind config's imports, so it keeps serving the old colours.

## Social preview

`public/og.png` is rendered from `scripts/og.html` with headless Chrome (see the implementation plan, Task 11).
