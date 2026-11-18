# Data Engineer Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the portfolio as a dark "Obsidian Telemetry" site with a home page and two case-study pages that read as Data Engineer at a glance, using only true numbers and black-box descriptions of the employer's system.

**Architecture:** React 19 SPA (Vite 6, Tailwind 3, react-router 7). All copy/numbers live in `src/content/*`; components only render. Diagrams are hand-written SVG with CSS-only motion (disabled under `prefers-reduced-motion`). A Node script (`npm run check`) enforces the confidentiality rules from the spec.

**Tech Stack:** React 19, Vite 6, Tailwind CSS 3, react-router-dom 7, framer-motion 12, lucide-react 0.475. Fonts: Space Grotesk, Inter, JetBrains Mono (Google Fonts).

**Spec:** `docs/superpowers/specs/2026-11-19-data-engineer-portfolio-redesign-design.md`

**Branch:** `redesign/data-engineer-portfolio` (already checked out). Shell is Git Bash on Windows; repo root is `D:\career\MyApp\profile` (`/d/career/MyApp/profile`).

**Suggested model per task:** Haiku for copy-exact tasks (1, 2, 3, 4, 11); Sonnet for tasks needing layout judgment (5–10, 12).

**Commit trailer:** every commit message ends with a blank line and `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

---

## File map

| Path | Responsibility |
|---|---|
| `src/theme/tokens.js` | Color, font, size tokens (consumed by Tailwind config) |
| `tailwind.config.js` | Tailwind theme from tokens |
| `src/styles/index.css` | Base styles, component classes, keyframes, reduced-motion |
| `index.html` | Fonts, meta, OG tags, favicon |
| `vite.config.js` | `@` alias + `__BUILD_MONTH__` define |
| `vercel.json` | SPA rewrite |
| `scripts/check-content.mjs` | Confidentiality lint over `src/` and `index.html` |
| `src/content/profile.js` | Identity, contact, nav, status strip, KPIs |
| `src/content/platform.js` | BA3 platform copy (black-box) |
| `src/content/lunchOrder.js` | Lunch-Order copy |
| `src/content/stack.js` | Stack by pipeline layer |
| `src/content/research.js` | Papers, education |
| `src/components/ui/*` | Chip, Button, Panel, SectionHeader, KpiStrip, Terminal, CopyEmail, Reveal |
| `src/components/layout/*` | Nav, StatusStrip, Footer, ScrollManager, PageShell |
| `src/components/viz/*` | HeroDag, ArchitectureDiagram, BlackBoxFlow, StatusBoard, Erd |
| `src/components/case/*` | CaseHeader, CaseSection, CaseNav |
| `src/lib/useDocumentTitle.js` | Per-page `<title>` |
| `src/pages/*` | Home, CaseStudyPlatform, CaseStudyLunchOrder, NotFound |
| `src/App.jsx`, `src/main.jsx` | Router and routes |
| `public/favicon.svg`, `public/og.png`, `scripts/og.html` | Icon and social preview |

Files deleted: everything under `src/components/` that exists today, `src/data/`, `src/assets/react.svg`, `devicon` dependency.

---

### Task 1: Foundation — cleanup, tokens, Tailwind, base CSS, HTML, router entry  *(Haiku)*

**Files:**
- Delete: `src/components/` (entire current tree), `src/data/`, `src/assets/`
- Create: `src/theme/tokens.js`, `vercel.json`
- Modify: `tailwind.config.js`, `src/styles/index.css`, `index.html`, `vite.config.js`, `src/main.jsx`, `src/App.jsx`, `package.json` (via npm)

- [ ] **Step 1: Remove old code and the unused dependency**

```bash
cd /d/career/MyApp/profile
git rm -r -q src/components src/data src/assets
npm uninstall devicon
```
Expected: no errors; `package.json` no longer lists `devicon`.

- [ ] **Step 2: Create `src/theme/tokens.js`**

```js
export const colors = {
  canvas: '#08090C',
  s1: '#0E1015',
  s2: '#151821',
  line: '#1E2230',
  cy: '#00F0FF',
  vi: '#6366F1',
  em: '#10B981',
  am: '#F59E0B',
  tx: '#F8FAFC',
  mu: '#94A3B8',
  dim: '#475569',
}

export const fonts = {
  display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
  sans: ['Inter', 'system-ui', 'sans-serif'],
  mono: ['"JetBrains Mono"', 'ui-monospace', 'Consolas', 'monospace'],
}
```

- [ ] **Step 3: Replace `tailwind.config.js`**

```js
import { colors, fonts } from './src/theme/tokens.js'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors,
      fontFamily: fonts,
      maxWidth: { site: '1240px' },
      boxShadow: {
        glow: '0 0 16px rgba(0, 240, 255, 0.18)',
        'glow-em': '0 0 12px rgba(16, 185, 129, 0.35)',
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 4: Replace `src/styles/index.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    color-scheme: dark;
  }

  html {
    scroll-behavior: smooth;
    scroll-padding-top: 104px;
  }

  body {
    @apply bg-canvas font-sans text-tx antialiased;
    font-size: 15px;
    line-height: 1.6;
    background-image: radial-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px);
    background-size: 24px 24px;
  }

  ::selection {
    background: rgba(0, 240, 255, 0.25);
    color: #f8fafc;
  }

  :focus-visible {
    outline: 1px solid #00f0ff;
    outline-offset: 2px;
  }
}

@layer components {
  .container-site {
    @apply mx-auto w-full max-w-site px-4 md:px-8 xl:px-10;
  }

  .label-code {
    @apply font-mono text-[10.5px] font-medium uppercase tracking-[0.08em] text-mu;
  }

  .panel {
    @apply border border-line bg-s1/75 backdrop-blur-md;
  }

  .heading-display {
    @apply font-display font-bold uppercase leading-[1.02] tracking-[-0.035em];
  }

  .heading-section {
    @apply font-display font-semibold uppercase leading-[1.1] tracking-[-0.03em];
  }
}

@keyframes flow {
  to {
    stroke-dashoffset: -30;
  }
}

.flow {
  stroke-dasharray: 3 7;
  animation: flow 1s linear infinite;
}

@keyframes scan {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(400%);
  }
}

.scan {
  animation: scan 2.4s ease-in-out infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

.caret {
  animation: blink 1s steps(1) infinite;
}

@keyframes pulse-dot {
  50% {
    opacity: 0.4;
  }
}

.pulse-dot {
  animation: pulse-dot 2s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  .flow,
  .scan,
  .caret,
  .pulse-dot {
    animation: none !important;
  }
}
```

- [ ] **Step 5: Replace `index.html`**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#08090C" />
    <meta name="color-scheme" content="dark" />
    <title>Nguyen Thien Thuat · Data Engineer</title>
    <meta name="description" content="Data Engineer in Ho Chi Minh City. I design, ship and operate the data platform behind an e-commerce analytics product." />
    <meta name="author" content="Nguyen Thien Thuat" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Nguyen Thien Thuat · Data Engineer" />
    <meta property="og:description" content="Turning six marketplaces into one warehouse." />
    <meta property="og:image" content="/og.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 6: Replace `vite.config.js`**

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    __BUILD_MONTH__: JSON.stringify(new Date().toISOString().slice(0, 7)),
  },
})
```

- [ ] **Step 7: Create `vercel.json`**

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

- [ ] **Step 8: Replace `src/main.jsx`**

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
```

- [ ] **Step 9: Replace `src/App.jsx` with a temporary shell (real routes arrive in Task 5)**

```jsx
export default function App() {
  return (
    <main className="container-site py-24">
      <p className="label-code">// foundation</p>
      <h1 className="heading-display mt-2 text-[48px]">Foundation ready</h1>
    </main>
  )
}
```

- [ ] **Step 10: Build**

Run: `npm run build`
Expected: `✓ built in …` with no errors.

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -q -m "chore: reset to obsidian telemetry foundation

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 2: Confidentiality check script  *(Haiku)*

**Files:**
- Create: `scripts/check-content.mjs`
- Modify: `package.json` (`scripts.check`)

- [ ] **Step 1: Create `scripts/check-content.mjs`**

```js
// Fails when source text contains terms the spec forbids (see spec §3).
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const ROOT = process.cwd()
const TARGETS = ['src', 'index.html']
const EXTENSIONS = ['.js', '.jsx', '.css', '.html']

const RULES = [
  [/crawl/i, 'say "public data collection"'],
  [/playwright|devtools|\bCDP\b|pychrome/i, 'say "public-data collection tooling"'],
  [/\bapi_[a-z]+|silver_ecom|crawl_[a-z]+|pipeline_meta|api_control/i, 'internal table or schema name'],
  [/\bbronze\b|\bsilver\b/i, 'use "raw" / "clean" warehouse'],
  [/run_pipeline|ingestion\.|orchestration\/|transform\.enrichment/i, 'internal module or command'],
  [/xlm-?r\b|xlm-roberta|visobert|masked lm/i, 'internal model detail'],
  [/ap-southeast|BA3-tech-team|shopee_ads/i, 'infrastructure identifier'],
  [/\b(R[1-5]|E[12]|L[12]|F[12]|A[1-3]|S1|T1|H[1-6])\b/, 'monitor check code'],
]

function walk(path) {
  const stat = statSync(path)
  if (stat.isFile()) return [path]
  return readdirSync(path).flatMap((name) => walk(join(path, name)))
}

const files = TARGETS.flatMap((t) => walk(join(ROOT, t))).filter((f) =>
  EXTENSIONS.some((ext) => f.endsWith(ext)),
)

const problems = []
for (const file of files) {
  const lines = readFileSync(file, 'utf8').split(/\r?\n/)
  lines.forEach((line, i) => {
    for (const [pattern, hint] of RULES) {
      if (pattern.test(line)) {
        problems.push(`${relative(ROOT, file)}:${i + 1}  ${hint}  →  ${line.trim().slice(0, 100)}`)
      }
    }
  })
}

if (problems.length) {
  console.error(`check-content: ${problems.length} problem(s)\n` + problems.join('\n'))
  process.exit(1)
}
console.log(`check-content: ok (${files.length} files)`)
```

- [ ] **Step 2: Add the npm script**

Run: `npm pkg set scripts.check="node scripts/check-content.mjs"`

- [ ] **Step 3: Verify it catches a violation**

```bash
printf "export const x = 'we crawl shops'\n" > src/__probe.js
npm run check; echo "exit=$?"
rm src/__probe.js
```
Expected: output lists `src/__probe.js:1  say "public data collection"` and `exit=1`.

- [ ] **Step 4: Verify it passes on clean source**

Run: `npm run check`
Expected: `check-content: ok (N files)`, exit 0.

- [ ] **Step 5: Commit**

```bash
git add scripts/check-content.mjs package.json
git commit -q -m "chore: add confidentiality content check

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 3: Content files  *(Haiku)*

**Files:**
- Create: `src/content/profile.js`, `src/content/platform.js`, `src/content/lunchOrder.js`, `src/content/stack.js`, `src/content/research.js`

Copy text exactly; it was approved by the owner.

- [ ] **Step 1: Create `src/content/profile.js`**

```js
export const profile = {
  name: 'Nguyen Thien Thuat',
  initials: 'NT',
  role: 'Data Engineer',
  location: 'Ho Chi Minh City, Vietnam',
  locationShort: 'hcmc',
  headline: 'Turning six marketplaces into one warehouse.',
  subhead:
    'I design, ship and operate the data platform behind an e-commerce analytics product, from collection to the 3 a.m. alert.',
  email: 'thuatnguyen2k2info@gmail.com',
  github: 'https://github.com/ThuatNguyenZ',
  linkedin: 'https://linkedin.com/in/thuat-nguyen1306/',
  cv: '/cv.pdf',
}

export const navLinks = [
  { id: 'platform', label: '01 PLATFORM' },
  { id: 'builds', label: '02 BUILDS' },
  { id: 'stack', label: '03 STACK' },
  { id: 'research', label: '04 RESEARCH' },
  { id: 'contact', label: '05 CONTACT' },
]

export const statusStrip = [
  { label: 'schedules', value: 'daily · every 4h · every 15m' },
  { label: 'sources', value: '6' },
  { label: 'tables', value: '~140' },
  { label: 'tests', value: '~3.4k' },
]

export const kpis = [
  { value: '6', label: 'sources — 4 marketplaces, 2 ad platforms' },
  { value: '~140', label: 'warehouse tables, raw and clean' },
  { value: '20+', label: 'monitoring checks with email alerts' },
  { value: '~3.4k', label: 'tests guarding the pipeline' },
]
```

- [ ] **Step 2: Create `src/content/platform.js`**

```js
export const platform = {
  slug: 'ba3-data-platform',
  name: 'BA3 Data Platform',
  company: 'BA3 Studio',
  companyUrl: 'https://analytic.ba3.studio/',
  role: 'Data Engineer — owner of the pipeline',
  period: '03/2025 → now',
  pitch:
    'The data platform behind an e-commerce analytics product: six sources collected on schedule, landed in a lake, modeled in a warehouse, and watched around the clock.',
  chips: ['Python 3.11', 'AWS S3 · EC2 · SSM · SES', 'PostgreSQL', 'Parquet', 'Grafana', 'GitHub Actions'],

  sources: ['Shopee', 'Lazada', 'TikTok Shop', 'Amazon', 'Meta Ads', 'Google Ads'],

  heroNodes: {
    sources: { label: 'SOURCES', role: 'Official marketplace APIs, ad platforms and public data, collected on schedule.' },
    lake: { label: 'DATA LAKE', role: 'Immutable raw storage — any day can be replayed.' },
    raw: { label: 'WAREHOUSE · RAW', role: 'Source-shaped tables, loaded idempotently.' },
    clean: { label: 'WAREHOUSE · CLEAN', role: 'Cross-source, analysis-ready models.' },
    analytics: { label: 'ANALYTICS', role: 'Dashboards and recommendations brands act on.' },
    observe: { label: 'OBSERVE', role: '20+ checks run every 15 minutes and alert by email.' },
  },
  heroHint: 'Hover or focus a node to see what it does.',

  terminal: [
    { kind: 'dim', text: '# scripted demo — names redacted' },
    { kind: 'cmd', text: 'pipeline run --dry-run' },
    { kind: 'out', text: 'collect   ✓  6 sources planned' },
    { kind: 'out', text: 'land      ✓  lake partitions resolved' },
    { kind: 'out', text: 'load      ✓  warehouse targets resolved' },
    { kind: 'out', text: 'checks    ✓  monitors armed' },
    { kind: 'dim', text: 'exit 0 · nothing executed' },
  ],

  steps: [
    { label: 'COLLECT', title: 'APIs + public data', detail: '6 sources · retries · rate limits' },
    { label: 'LAND', title: 'Data lake', detail: 'immutable raw · columnar exports' },
    { label: 'MODEL', title: 'Raw → clean', detail: 'idempotent loads · cross-source', highlight: true },
    { label: 'ENRICH', title: 'Review text', detail: 'topics · sentiment' },
    { label: 'OBSERVE', title: '20+ checks', detail: '8 dashboards · email alerts' },
  ],

  problem: [
    'Six sources, six access patterns: official marketplace APIs, ad platforms with their own quotas and token lifecycles, and public web data.',
    'Logic lived in scattered scripts on several machines, each with its own configuration and failure modes.',
    'Nobody could say at a glance whether yesterday’s data had arrived — customers noticed first.',
  ],

  architecture: [
    { id: 'sources', step: '01', label: 'SOURCES', title: '6 sources', role: 'Marketplace APIs, ad platforms and public data.' },
    { id: 'collection', step: '02', label: 'COLLECTION', title: 'Scheduled extractors', role: 'Retries, rate limiting and token handling per source.' },
    { id: 'lake', step: '03', label: 'DATA LAKE', title: 'Immutable raw', role: 'Raw storage partitioned by date — enables replay.' },
    { id: 'warehouse', step: '04', label: 'WAREHOUSE', title: 'Raw → clean', role: 'Idempotent loads, then cross-source models.' },
    { id: 'product', step: '05', label: 'PRODUCT', title: 'Analytics', role: 'Feeds the dashboards and recommendations brands use.' },
  ],
  observability: {
    title: 'OBSERVABILITY — every stage, every 15 minutes',
    role: 'Watches runs, freshness, loads, APIs, credentials and hosts; alerts by email.',
  },

  decisions: [
    {
      title: 'Lightweight in-house orchestration',
      why: 'A handful of scheduled jobs on one host did not justify a scheduler cluster. A small runner gives locks, timeouts, resumable stages and clear exit codes.',
      tradeoff: 'No web UI out of the box — covered by run summaries and dashboards.',
    },
    {
      title: 'Raw data stays immutable',
      why: 'Every extract lands untouched before any parsing, so a bug fix can be replayed over past days instead of re-fetched.',
      tradeoff: 'More storage — kept in check with columnar exports and date partitions.',
    },
    {
      title: 'Layer boundaries enforced in code',
      why: 'Shared libraries, collectors, transforms and monitoring may only depend in one direction; a test fails the build when an import crosses a boundary.',
      tradeoff: 'Occasional indirection to keep the dependency graph clean.',
    },
    {
      title: 'Phased migration, zero downtime',
      why: 'The platform replaced the old scripts in five cutover phases, each verified side by side before switching.',
      tradeoff: 'Weeks of running two systems in parallel.',
    },
  ],

  checkCategories: [
    { name: 'Run health', detail: 'Did every scheduled run start, finish, and finish on time?' },
    { name: 'Data freshness', detail: 'Is new data still arriving for every source?' },
    { name: 'Load integrity', detail: 'Did loads complete and write the rows they should?' },
    { name: 'API health', detail: 'Rate limits, latency and server errors per endpoint.' },
    { name: 'Credentials', detail: 'Tokens refreshed before they expire.' },
    { name: 'Infrastructure', detail: 'Disk, schedules, deployed version and network rules.' },
  ],
  observabilityStats: [
    { value: '20+', label: 'checks' },
    { value: '8', label: 'dashboards' },
    { value: '15 min', label: 'check interval' },
    { value: 'email', label: 'alerts with mute & reminders' },
  ],

  enrichment: {
    note: 'Vietnamese reviews are full of slang, abbreviations and missing diacritics. A dedicated layer turns them into something analysts can aggregate — versioned, so results stay reproducible.',
    inputs: ['Raw Vietnamese reviews', 'Star ratings'],
    layer: 'Normalization & enrichment',
    outputs: ['Normalized text', 'Topics', 'Sentiment'],
  },

  lessons: [
    'Monitoring paid for itself in the first week — alerts now arrive before customers do.',
    'Writing the runbook while building forced simpler interfaces.',
    'Next: data contracts at the warehouse boundary and self-serve backfills.',
  ],
}
```

- [ ] **Step 3: Create `src/content/lunchOrder.js`**

```js
export const lunchOrder = {
  slug: 'lunch-order',
  name: 'Lunch-Order',
  role: 'Solo builder',
  period: '11/2026',
  pitch:
    'An internal app the whole office uses every day to order lunch and drinks. Built the way a data engineer would: the business rules live in Postgres, the client stays thin.',
  facts: [
    { value: 'daily', label: 'used by the whole office' },
    { value: '7', label: 'releases' },
    { value: '$0', label: 'per month on free tiers' },
  ],
  chips: ['Supabase', 'PostgreSQL · RLS', 'React 19 · TypeScript', 'PWA', 'VietQR / MoMo'],

  homeSnippet: `create policy "members read their own orders"
  on orders for select
  using (user_id = auth.uid());`,

  problem:
    'Orders were collected in a group chat, tallied by hand, and payments tracked in someone’s head. Small mistakes cost money and goodwill every day.',

  entities: [
    { id: 'members', name: 'Members', fields: ['role', 'approval status', 'default note'] },
    { id: 'sessions', name: 'Daily sessions', fields: ['cutoff time', 'collector', 'available items'] },
    { id: 'shops', name: 'Shops', fields: ['name', 'contact', 'menu photos'] },
    { id: 'payments', name: 'Payments & rewards', fields: ['amount', 'status', 'balance'] },
    { id: 'orders', name: 'Orders + items', fields: ['quantity', 'note', 'delivered'] },
    { id: 'menu', name: 'Menu items', fields: ['price', 'icon', 'rating'] },
  ],
  relations: [
    ['shops', 'menu', 'has'],
    ['shops', 'sessions', 'opens'],
    ['sessions', 'orders', 'collects'],
    ['members', 'orders', 'places'],
    ['menu', 'orders', 'ordered as'],
    ['members', 'payments', 'settles'],
  ],

  logic: [
    'Row-level security decides who sees what — members see their own orders and today’s board, never other people’s payments.',
    'Triggers enforce the cutoff time and keep totals consistent.',
    'RPC functions wrap multi-step actions, like settling a week or granting a reward, in one transaction.',
  ],
  rlsSnippet: `-- illustrative
create policy "members read their own orders"
  on orders for select
  using (user_id = auth.uid());

create policy "no edits after cutoff"
  on orders for update
  using (user_id = auth.uid() and not session_closed(session_id));`,

  testing:
    'Database behavior — policies, triggers and RPCs — runs against PGlite, a real Postgres compiled to WebAssembly, inside the test runner. No Docker, no shared database, seconds per run.',

  milestones: [
    { version: 'v1–v2', title: 'Core ordering', text: 'Sessions, menus, cutoff times, a summary to send to the shop, delivery ticks.' },
    { version: 'v3–v5', title: 'Money', text: 'Per-session collectors, weekly and monthly payment views, rewards that offset debt, bulk rewards.' },
    { version: 'v6–v7', title: 'Delight', text: 'Dish ratings, leaderboards, personal stats, QR bank/MoMo payments with admin confirmation.' },
  ],

  stack: [
    { key: 'Frontend', value: 'React 19 · TypeScript · Vite · Tailwind · PWA' },
    { key: 'Backend', value: 'Supabase — Postgres, Auth, Storage, Realtime' },
    { key: 'Auth', value: 'Google OAuth with admin approval' },
    { key: 'Hosting', value: 'Cloudflare Pages' },
    { key: 'Cost', value: '$0 / month on free tiers' },
  ],
}
```

- [ ] **Step 4: Create `src/content/stack.js`**

```js
export const stackLayers = [
  { layer: 'INGEST', tools: ['Python', 'REST / Graph APIs', 'public-data collection tooling'] },
  { layer: 'STORE', tools: ['AWS S3', 'Parquet', 'PostgreSQL', 'Redis', 'Cassandra', 'MongoDB'] },
  { layer: 'TRANSFORM', tools: ['pandas', 'pyarrow', 'SQL', 'AWS Glue', 'Spark', 'Kafka'] },
  { layer: 'ORCHESTRATE', tools: ['in-house runner', 'cron on EC2', 'Celery', 'GitHub Actions', 'Docker'] },
  { layer: 'OBSERVE', tools: ['Grafana', 'CloudWatch', 'email alerting'] },
  { layer: 'ML / NLP', tools: ['PyTorch', 'Transformers', 'Keras'] },
]
```

- [ ] **Step 5: Create `src/content/research.js`**

```js
export const papers = [
  {
    title: 'RRS: Review-based Recommendation System',
    subtitle: 'Deep learning for Vietnamese e-commerce',
    venue: 'SN Computer Science · Springer',
    year: '2024',
    rank: 'Q2 (SJR)',
    doi: 'https://doi.org/10.1007/s42979-024-02812-6',
  },
  {
    title: 'Co-NAML-LSTUR: News Recommendation',
    subtitle: 'Hybrid framework with dual-scale user modeling',
    venue: 'MIWAI 2025 · Springer Nature',
    year: '2025',
    rank: 'Conference',
    doi: 'https://doi.org/10.1007/978-981-95-4960-3_9',
  },
]

export const education = [
  {
    degree: 'M.Sc. Artificial Intelligence',
    school: 'University of Science — VNU-HCM',
    period: '09/2025 → now',
  },
  {
    degree: 'B.Sc. Data Science',
    school: 'University of Information Technology — VNU-HCM',
    period: '2020 → 2024',
    note: 'GPA 8.22/10 · finished in 3.5 years',
  },
]
```

- [ ] **Step 6: Check and build**

Run: `npm run check && npm run build`
Expected: `check-content: ok`, build succeeds.

- [ ] **Step 7: Commit**

```bash
git add src/content
git commit -q -m "feat(content): profile, platform, lunch-order, stack, research

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 4: UI primitives  *(Haiku)*

**Files:**
- Create: `src/components/ui/Chip.jsx`, `Button.jsx`, `Panel.jsx`, `SectionHeader.jsx`, `KpiStrip.jsx`, `Terminal.jsx`, `CopyEmail.jsx`, `Reveal.jsx`
- Create: `src/lib/useDocumentTitle.js`

- [ ] **Step 1: `src/components/ui/Chip.jsx`**

```jsx
const tones = {
  em: 'border-em/25 bg-em/[0.08] text-[#7ee2bd]',
  cy: 'border-cy/25 bg-cy/[0.07] text-[#8ff7ff]',
  vi: 'border-vi/30 bg-vi/10 text-[#b4b6ff]',
  plain: 'border-line bg-transparent text-mu',
}

const dots = {
  em: 'bg-em shadow-glow-em',
  cy: 'bg-cy shadow-glow',
  vi: 'bg-vi',
  plain: 'bg-mu',
}

export default function Chip({ tone = 'plain', dot = false, children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 border px-2 py-0.5 font-mono text-[10.5px] font-medium uppercase tracking-[0.04em] ${tones[tone]} ${className}`}
    >
      {dot && <span aria-hidden="true" className={`pulse-dot h-1.5 w-1.5 rounded-full ${dots[tone]}`} />}
      {children}
    </span>
  )
}
```

- [ ] **Step 2: `src/components/ui/Button.jsx`**

```jsx
import { Link } from 'react-router-dom'

const base =
  'inline-flex items-center gap-2 border px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.06em] transition-colors duration-150'

const variants = {
  primary: 'border-cy bg-cy text-canvas hover:bg-transparent hover:text-cy hover:shadow-glow',
  ghost: 'border-line text-mu hover:border-vi hover:text-tx',
}

export default function Button({ to, href, variant = 'primary', className = '', children, ...rest }) {
  const cls = `${base} ${variants[variant]} ${className}`
  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} className={cls} {...rest}>
      {children}
    </a>
  )
}
```

- [ ] **Step 3: `src/components/ui/Panel.jsx`**

```jsx
export default function Panel({ title, meta, className = '', bodyClassName = 'p-4', children }) {
  return (
    <div className={`panel ${className}`}>
      {(title || meta) && (
        <div className="flex items-center justify-between gap-3 border-b border-line px-3 py-2">
          {title && <span className="label-code">{title}</span>}
          {meta}
        </div>
      )}
      <div className={bodyClassName}>{children}</div>
    </div>
  )
}
```

- [ ] **Step 4: `src/components/ui/SectionHeader.jsx`**

```jsx
export default function SectionHeader({ index, label, title, children, className = '' }) {
  return (
    <header className={`mb-8 max-w-2xl ${className}`}>
      <p className="font-mono text-[11px] font-medium tracking-[0.08em] text-cy">
        {index ? `// ${index} · ${label}` : `// ${label}`}
      </p>
      {title && <h2 className="heading-section mt-2 text-[28px] md:text-[34px]">{title}</h2>}
      {children && <div className="mt-3 text-mu">{children}</div>}
    </header>
  )
}
```

- [ ] **Step 5: `src/components/ui/KpiStrip.jsx`**

```jsx
export default function KpiStrip({ items }) {
  return (
    <div className="grid grid-cols-2 border border-line bg-s1/60 md:grid-cols-4">
      {items.map((item, i) => (
        <div
          key={item.label}
          className={`border-line p-4 md:p-5 ${i % 2 === 0 ? 'border-r' : ''} ${i < 2 ? 'border-b md:border-b-0' : ''} md:border-r md:last:border-r-0`}
        >
          <p className="font-display text-[26px] font-semibold tracking-[-0.02em] md:text-[30px]">{item.value}</p>
          <p className="mt-1 text-[12px] leading-snug text-mu">{item.label}</p>
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 6: `src/components/ui/Terminal.jsx`** (lines appear one by one when scrolled into view; all at once under reduced motion)

```jsx
import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

const styles = {
  cmd: 'text-tx',
  out: 'text-[#c9d1d9]',
  dim: 'text-dim',
}

export default function Terminal({ title = 'terminal', lines, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const reduce = useReducedMotion()
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (reduce) {
      setShown(lines.length)
      return undefined
    }
    if (!inView || shown >= lines.length) return undefined
    const timer = setTimeout(() => setShown((s) => s + 1), shown === 0 ? 300 : 420)
    return () => clearTimeout(timer)
  }, [inView, shown, reduce, lines.length])

  return (
    <div ref={ref} className={`border border-line bg-[#05060a] ${className}`}>
      <div className="flex items-center gap-2 border-b border-line px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-[#ef4444]/70" />
        <span className="h-2 w-2 rounded-full bg-am/70" />
        <span className="h-2 w-2 rounded-full bg-em/70" />
        <span className="label-code ml-2">{title}</span>
      </div>
      <pre
        className="min-h-[220px] overflow-x-auto px-4 py-4 font-mono text-[12.5px] leading-[1.75]"
        aria-label={lines.map((l) => l.text).join('\n')}
      >
        {lines.slice(0, shown).map((line, i) => (
          <div key={i} className={styles[line.kind]}>
            {line.kind === 'cmd' && <span className="text-em">$ </span>}
            {line.text}
          </div>
        ))}
        <div>
          <span className="text-em">$ </span>
          <span className="caret inline-block h-[1em] w-[0.6em] translate-y-[2px] bg-cy" />
        </div>
      </pre>
    </div>
  )
}
```

- [ ] **Step 7: `src/components/ui/CopyEmail.jsx`**

```jsx
import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

export default function CopyEmail({ email }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${email}`
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <a
        href={`mailto:${email}`}
        className="border border-line px-3 py-2.5 font-mono text-[12.5px] text-tx transition-colors hover:border-cy"
      >
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-live="polite"
        className="inline-flex items-center gap-2 border border-cy bg-cy px-3 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-canvas transition-colors hover:bg-transparent hover:text-cy"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  )
}
```

- [ ] **Step 8: `src/components/ui/Reveal.jsx`**

```jsx
import { motion, useReducedMotion } from 'framer-motion'

export default function Reveal({ delay = 0, className = '', children }) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 9: `src/lib/useDocumentTitle.js`**

```js
import { useEffect } from 'react'

const SUFFIX = 'Nguyen Thien Thuat · Data Engineer'

export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — ${SUFFIX}` : SUFFIX
  }, [title])
}
```

- [ ] **Step 10: Build and check**

Run: `npm run check && npm run build`
Expected: both succeed (components are not imported yet; build still passes).

- [ ] **Step 11: Commit**

```bash
git add src/components/ui src/lib
git commit -q -m "feat(ui): chip, button, panel, section header, kpi strip, terminal, copy email, reveal

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 5: Layout shell and routes  *(Sonnet)*

**Files:**
- Create: `src/components/layout/Nav.jsx`, `StatusStrip.jsx`, `Footer.jsx`, `ScrollManager.jsx`, `PageShell.jsx`
- Create (stubs, replaced in later tasks): `src/pages/Home.jsx`, `src/pages/CaseStudyPlatform.jsx`, `src/pages/CaseStudyLunchOrder.jsx`, `src/pages/NotFound.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: `src/components/layout/Nav.jsx`**

Desktop (≥lg): logo, five `// 0N …` anchor links, CV button. sm–lg: logo, CV button, menu button. <sm: logo, menu button (CV inside menu).

```jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { navLinks, profile } from '../../content/profile'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <nav className="sticky top-0 z-40 border-b border-line bg-canvas/85 backdrop-blur-md" aria-label="Primary">
      <div className="container-site flex h-14 items-center gap-6">
        <Link to="/" onClick={close} className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center border border-cy font-mono text-[12px] font-semibold text-cy">
            {profile.initials}
          </span>
          <span className="leading-tight">
            <span className="block font-display text-[14px] font-semibold uppercase">{profile.name}</span>
            <span className="label-code block text-[9.5px]">
              {profile.role} · {profile.locationShort}
            </span>
          </span>
        </Link>

        <div className="ml-auto hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              to={`/#${link.id}`}
              className="font-mono text-[11px] font-medium text-mu transition-colors hover:text-cy"
            >
              // {link.label}
            </Link>
          ))}
        </div>

        <a
          href={profile.cv}
          target="_blank"
          rel="noreferrer"
          className="ml-auto hidden border border-cy bg-cy px-3 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-canvas transition-colors hover:bg-transparent hover:text-cy sm:inline-flex lg:ml-0"
        >
          CV.PDF ↓
        </a>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="ml-auto grid h-9 w-9 place-items-center border border-line text-mu sm:ml-0 lg:hidden"
        >
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-line lg:hidden">
          <div className="container-site flex flex-col py-2">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                to={`/#${link.id}`}
                onClick={close}
                className="border-b border-line py-3 font-mono text-[12px] text-mu hover:text-cy"
              >
                // {link.label}
              </Link>
            ))}
            <a href={profile.cv} target="_blank" rel="noreferrer" className="py-3 font-mono text-[12px] text-cy">
              CV.PDF ↓
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
```

- [ ] **Step 2: `src/components/layout/StatusStrip.jsx`** (first two items always, the rest from md)

```jsx
import { statusStrip } from '../../content/profile'

export default function StatusStrip() {
  return (
    <div className="border-b border-line">
      <div className="container-site flex h-9 items-center gap-6 overflow-hidden whitespace-nowrap font-mono text-[10.5px] text-mu">
        {statusStrip.map((item, i) => (
          <span key={item.label} className={i > 1 ? 'hidden md:inline' : ''}>
            {i === 0 && (
              <span aria-hidden="true" className="pulse-dot mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-em align-middle shadow-glow-em" />
            )}
            {item.label} <b className="font-medium text-tx">{item.value}</b>
          </span>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: `src/components/layout/Footer.jsx`**

```jsx
import { Github, Linkedin, Mail } from 'lucide-react'
import { profile } from '../../content/profile'

/* global __BUILD_MONTH__ */
const links = [
  { href: `mailto:${profile.email}`, label: 'Email', Icon: Mail },
  { href: profile.github, label: 'GitHub', Icon: Github },
  { href: profile.linkedin, label: 'LinkedIn', Icon: Linkedin },
]

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-site flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between">
        <p className="font-mono text-[11px] text-dim">
          built by hand · react + svg · last deploy {__BUILD_MONTH__}
        </p>
        <div className="flex gap-2">
          {links.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              aria-label={label}
              className="grid h-9 w-9 place-items-center border border-line text-mu transition-colors hover:border-cy hover:text-cy"
            >
              <Icon size={15} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 4: `src/components/layout/ScrollManager.jsx`** (top on route change; scroll to `#id` when the URL has a hash, also after navigating from a case page)

```jsx
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const timer = setTimeout(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start' })
      }, 50)
      return () => clearTimeout(timer)
    }
    window.scrollTo(0, 0)
    return undefined
  }, [pathname, hash])

  return null
}
```

- [ ] **Step 5: `src/components/layout/PageShell.jsx`**

```jsx
import Nav from './Nav'
import StatusStrip from './StatusStrip'
import Footer from './Footer'

export default function PageShell({ children }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-cy focus:px-3 focus:py-2 focus:font-mono focus:text-[12px] focus:text-canvas"
      >
        Skip to content
      </a>
      <Nav />
      <StatusStrip />
      <main id="main">{children}</main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 6: Stub pages** — create each file with this pattern (title text differs):

`src/pages/Home.jsx`
```jsx
export default function Home() {
  return <section className="container-site py-24"><h1 className="heading-display text-[48px]">Home</h1></section>
}
```
`src/pages/CaseStudyPlatform.jsx`
```jsx
export default function CaseStudyPlatform() {
  return <section className="container-site py-24"><h1 className="heading-display text-[48px]">Platform</h1></section>
}
```
`src/pages/CaseStudyLunchOrder.jsx`
```jsx
export default function CaseStudyLunchOrder() {
  return <section className="container-site py-24"><h1 className="heading-display text-[48px]">Lunch-Order</h1></section>
}
```
`src/pages/NotFound.jsx`
```jsx
export default function NotFound() {
  return <section className="container-site py-24"><h1 className="heading-display text-[48px]">404</h1></section>
}
```

- [ ] **Step 7: Replace `src/App.jsx`**

```jsx
import { Route, Routes } from 'react-router-dom'
import PageShell from './components/layout/PageShell'
import ScrollManager from './components/layout/ScrollManager'
import Home from './pages/Home'
import CaseStudyPlatform from './pages/CaseStudyPlatform'
import CaseStudyLunchOrder from './pages/CaseStudyLunchOrder'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <PageShell>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/ba3-data-platform" element={<CaseStudyPlatform />} />
        <Route path="/work/lunch-order" element={<CaseStudyLunchOrder />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PageShell>
  )
}
```

- [ ] **Step 8: Verify**

Run: `npm run check && npm run build`
Expected: both succeed. Then `npm run dev`, open `http://localhost:5173/`, `/work/ba3-data-platform`, `/work/lunch-order`, `/nope` — each shows nav, status strip, its stub heading, footer. Narrow the window below 640px: only logo + menu button; the menu opens and lists 5 links + CV. Stop the dev server.

- [ ] **Step 9: Commit**

```bash
git add src/components/layout src/pages src/App.jsx
git commit -q -m "feat(layout): nav, status strip, footer, scroll manager, routes

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 6: Hero DAG  *(Sonnet)*

**Files:**
- Create: `src/components/viz/HeroDag.jsx`

Two SVG layouts from the same data: horizontal (`md` and up) and vertical (below `md`). Every node is focusable; hover/focus updates a caption below (`aria-live="polite"`). Edges are a faint base line plus an animated `.flow` overlay. Marketplace edges cyan, ad-platform edges violet (`index >= 4`).

- [ ] **Step 1: Create `src/components/viz/HeroDag.jsx`**

```jsx
import { useState } from 'react'
import { platform } from '../../content/platform'

const CY = '#00F0FF'
const VI = '#6366F1'
const EM = '#10B981'
const LINE = '#1E2230'
const MONO = 'JetBrains Mono, monospace'

function Edge({ d, color }) {
  return (
    <>
      <path d={d} fill="none" stroke={color} strokeOpacity="0.22" strokeWidth="1.2" />
      <path d={d} fill="none" stroke={color} strokeWidth="1.4" className="flow" />
    </>
  )
}

function NodeBox({ id, x, y, w, h = 36, active, highlight, onActivate }) {
  const { label, role } = platform.heroNodes[id]
  const lit = active === id || highlight
  return (
    <g
      tabIndex={0}
      aria-label={`${label}: ${role}`}
      onMouseEnter={() => onActivate(id)}
      onFocus={() => onActivate(id)}
      className="cursor-default outline-none"
    >
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill="#0E1015"
        stroke={lit ? CY : LINE}
        style={active === id ? { filter: 'drop-shadow(0 0 8px rgba(0,240,255,0.45))' } : undefined}
      />
      <text x={x + w / 2} y={y + h / 2 + 3.5} textAnchor="middle" fontFamily={MONO} fontSize="10" fill={highlight ? CY : '#F8FAFC'}>
        {label}
      </text>
    </g>
  )
}

function SourceLabel({ name, x, y, anchor = 'start', active, onActivate }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontFamily={MONO}
      fontSize="10"
      letterSpacing="0.06em"
      fill={active === 'sources' ? '#F8FAFC' : '#94A3B8'}
      tabIndex={0}
      aria-label={`${name}: ${platform.heroNodes.sources.role}`}
      onMouseEnter={() => onActivate('sources')}
      onFocus={() => onActivate('sources')}
      className="cursor-default outline-none"
    >
      {name.toUpperCase()}
    </text>
  )
}

function Horizontal({ active, onActivate }) {
  const ys = platform.sources.map((_, i) => 26 + i * 40)
  const mid = 126
  return (
    <svg viewBox="0 0 760 236" className="w-full" role="img" aria-label="Six sources flow into a data lake, then a raw warehouse, a clean warehouse and analytics, all monitored every 15 minutes.">
      {platform.sources.map((name, i) => (
        <g key={name}>
          <SourceLabel name={name} x={0} y={ys[i] + 3.5} active={active} onActivate={onActivate} />
          <Edge d={`M118 ${ys[i]} C165 ${ys[i]} 165 ${mid} 210 ${mid}`} color={i >= 4 ? VI : CY} />
        </g>
      ))}
      <Edge d={`M314 ${mid} H344`} color={CY} />
      <Edge d={`M474 ${mid} H504`} color={CY} />
      <Edge d={`M640 ${mid} H664`} color={EM} />

      <NodeBox id="lake" x={210} y={108} w={104} active={active} onActivate={onActivate} />
      <NodeBox id="raw" x={344} y={108} w={130} active={active} onActivate={onActivate} />
      <NodeBox id="clean" x={504} y={108} w={136} active={active} highlight onActivate={onActivate} />
      <NodeBox id="analytics" x={664} y={108} w={96} active={active} onActivate={onActivate} />

      <g
        tabIndex={0}
        aria-label={`${platform.heroNodes.observe.label}: ${platform.heroNodes.observe.role}`}
        onMouseEnter={() => onActivate('observe')}
        onFocus={() => onActivate('observe')}
        className="cursor-default outline-none"
      >
        <path d="M210 186 H760" stroke={EM} strokeOpacity={active === 'observe' ? 0.9 : 0.5} strokeDasharray="2 4" />
        {[262, 409, 572, 712].map((x) => (
          <path key={x} d={`M${x} 144 V186`} stroke={EM} strokeOpacity="0.4" strokeDasharray="2 4" />
        ))}
        <text x={210} y={208} fontFamily={MONO} fontSize="10" fill={EM}>
          ● OBSERVE · 20+ checks · every 15 min
        </text>
      </g>
    </svg>
  )
}

function Vertical({ active, onActivate }) {
  const rows = [20, 48, 76]
  const cols = [{ x: 20, start: 70 }, { x: 320, start: 270, anchor: 'end' }]
  const centerX = 170
  return (
    <svg viewBox="0 0 340 420" className="w-full" role="img" aria-label="Six sources flow into a data lake, then a raw warehouse, a clean warehouse and analytics, all monitored every 15 minutes.">
      {platform.sources.map((name, i) => {
        const col = cols[i < 3 ? 0 : 1]
        const y = rows[i % 3]
        return (
          <g key={name}>
            <SourceLabel name={name} x={col.x} y={y} anchor={col.anchor} active={active} onActivate={onActivate} />
            <Edge d={`M${col.start} ${y + 8} C${col.start} 112 ${centerX} 100 ${centerX} 130`} color={i >= 4 ? VI : CY} />
          </g>
        )
      })}
      <Edge d="M170 164 V190" color={CY} />
      <Edge d="M170 224 V250" color={CY} />
      <Edge d="M170 284 V310" color={EM} />

      <NodeBox id="lake" x={110} y={130} w={120} h={34} active={active} onActivate={onActivate} />
      <NodeBox id="raw" x={110} y={190} w={120} h={34} active={active} onActivate={onActivate} />
      <NodeBox id="clean" x={110} y={250} w={120} h={34} active={active} highlight onActivate={onActivate} />
      <NodeBox id="analytics" x={110} y={310} w={120} h={34} active={active} onActivate={onActivate} />

      <g
        tabIndex={0}
        aria-label={`${platform.heroNodes.observe.label}: ${platform.heroNodes.observe.role}`}
        onMouseEnter={() => onActivate('observe')}
        onFocus={() => onActivate('observe')}
        className="cursor-default outline-none"
      >
        <path d="M300 147 V327" stroke={EM} strokeOpacity={active === 'observe' ? 0.9 : 0.5} strokeDasharray="2 4" />
        {[147, 207, 267, 327].map((y) => (
          <path key={y} d={`M230 ${y} H300`} stroke={EM} strokeOpacity="0.4" strokeDasharray="2 4" />
        ))}
        <text x={170} y={384} textAnchor="middle" fontFamily={MONO} fontSize="10" fill={EM}>
          ● OBSERVE · 20+ checks · every 15 min
        </text>
      </g>
    </svg>
  )
}

export default function HeroDag() {
  const [active, setActive] = useState(null)
  const node = active ? platform.heroNodes[active] : null

  return (
    <div onMouseLeave={() => setActive(null)}>
      <div className="hidden md:block">
        <Horizontal active={active} onActivate={setActive} />
      </div>
      <div className="mx-auto max-w-sm md:hidden">
        <Vertical active={active} onActivate={setActive} />
      </div>
      <p aria-live="polite" className="mt-3 min-h-[2.5rem] font-mono text-[12px] text-mu">
        {node ? (
          <>
            <span className="text-cy">› {node.label}</span> — {node.role}
          </>
        ) : (
          <span className="text-dim">› {platform.heroHint}</span>
        )}
      </p>
    </div>
  )
}
```

- [ ] **Step 2: Temporarily render it to eyeball** — replace the stub body of `src/pages/Home.jsx` with:

```jsx
import HeroDag from '../components/viz/HeroDag'

export default function Home() {
  return (
    <section className="container-site py-16">
      <HeroDag />
    </section>
  )
}
```

Run `npm run dev`, open `/`. Check at ≥768px: six labels left, edges curve into DATA LAKE, dashes move, WAREHOUSE · CLEAN outlined cyan, green OBSERVE rail underneath. Hover each node and a source label → caption changes. Tab through → same. Below 768px: vertical layout, sources in two columns of three, nothing clipped. If any text overlaps or clips, adjust coordinates in this file only.

- [ ] **Step 3: Check, build, commit**

```bash
npm run check && npm run build
git add src/components/viz/HeroDag.jsx src/pages/Home.jsx
git commit -q -m "feat(viz): interactive hero DAG with horizontal and vertical layouts

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 7: Home page  *(Sonnet)*

**Files:**
- Modify: `src/pages/Home.jsx` (full replacement)

Sections in order: Hero (headline, sub, DAG, buttons, KPI strip) → `#platform` → `#builds` → `#stack` → `#research` → `#contact`. Each section is `border-b border-line py-16 md:py-24` except contact (no bottom border).

- [ ] **Step 1: Replace `src/pages/Home.jsx`**

```jsx
import { Github, Linkedin } from 'lucide-react'
import Button from '../components/ui/Button'
import Chip from '../components/ui/Chip'
import CopyEmail from '../components/ui/CopyEmail'
import KpiStrip from '../components/ui/KpiStrip'
import Panel from '../components/ui/Panel'
import Reveal from '../components/ui/Reveal'
import SectionHeader from '../components/ui/SectionHeader'
import Terminal from '../components/ui/Terminal'
import HeroDag from '../components/viz/HeroDag'
import { kpis, profile } from '../content/profile'
import { platform } from '../content/platform'
import { lunchOrder } from '../content/lunchOrder'
import { stackLayers } from '../content/stack'
import { education, papers } from '../content/research'
import useDocumentTitle from '../lib/useDocumentTitle'

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_85%,rgba(99,102,241,0.14),transparent_55%),radial-gradient(circle_at_12%_8%,rgba(0,240,255,0.08),transparent_45%)]"
      />
      <div className="container-site relative py-14 md:py-20">
        <Reveal>
          <h1 className="heading-display max-w-4xl text-[38px] sm:text-[48px] lg:text-[60px]">{profile.headline}</h1>
          <p className="mt-5 max-w-2xl text-[16px] text-mu md:text-[17px]">{profile.subhead}</p>
        </Reveal>
        <div className="mt-10">
          <HeroDag />
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button to={`/work/${platform.slug}`}>Explore the platform →</Button>
          <Button href="#platform-terminal" variant="ghost">
            &gt; Run dry-run
          </Button>
        </div>
        <div className="mt-12">
          <KpiStrip items={kpis} />
        </div>
      </div>
    </section>
  )
}

function Platform() {
  return (
    <section id="platform" className="border-b border-line py-16 md:py-24">
      <div className="container-site">
        <SectionHeader index="01" label="FEATURED PLATFORM" title={platform.name}>
          {platform.pitch}
        </SectionHeader>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <p className="label-code">
              {platform.company} · {platform.role} · {platform.period}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {platform.chips.map((c) => (
                <Chip key={c}>{c}</Chip>
              ))}
            </div>
            <div className="mt-8">
              <Button to={`/work/${platform.slug}`}>Read the case study →</Button>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div id="platform-terminal">
              <Terminal title="pipeline · dry run" lines={platform.terminal} />
            </div>
          </Reveal>
        </div>
        <ol className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {platform.steps.map((step, i) => (
            <li key={step.label} className={`bg-s1 p-4 ${step.highlight ? 'shadow-[inset_0_2px_0_#00F0FF]' : ''}`}>
              <p className="label-code text-[9.5px]">
                {String(i + 1).padStart(2, '0')} · {step.label}
              </p>
              <p className={`mt-1 font-display text-[16px] font-semibold ${step.highlight ? 'text-cy' : ''}`}>{step.title}</p>
              <p className="mt-1 font-mono text-[11px] text-mu">{step.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Builds() {
  return (
    <section id="builds" className="border-b border-line py-16 md:py-24">
      <div className="container-site grid gap-10 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <SectionHeader index="02" label="SIDE BUILD" title={lunchOrder.name} className="mb-6">
            {lunchOrder.pitch}
          </SectionHeader>
          <dl className="grid grid-cols-3 gap-px border border-line bg-line">
            {lunchOrder.facts.map((f) => (
              <div key={f.label} className="bg-s1 p-3">
                <dt className="font-display text-[22px] font-semibold">{f.value}</dt>
                <dd className="text-[12px] leading-snug text-mu">{f.label}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-5 flex flex-wrap gap-2">
            {lunchOrder.chips.map((c) => (
              <Chip key={c}>{c}</Chip>
            ))}
          </div>
          <div className="mt-8">
            <Button to={`/work/${lunchOrder.slug}`}>See how it works →</Button>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <Panel
            title="policies.sql // illustrative"
            meta={
              <Chip tone="em" dot>
                v7 · live
              </Chip>
            }
            bodyClassName="p-0"
          >
            <pre className="overflow-x-auto bg-[#05060a] px-4 py-5 font-mono text-[12.5px] leading-[1.75] text-[#c9d1d9]">
              {lunchOrder.homeSnippet}
            </pre>
          </Panel>
        </Reveal>
      </div>
    </section>
  )
}

function Stack() {
  return (
    <section id="stack" className="border-b border-line py-16 md:py-24">
      <div className="container-site">
        <SectionHeader index="03" label="STACK, BY PIPELINE LAYER" title="What I reach for" />
        <div className="border-b border-line">
          {stackLayers.map((row) => (
            <Reveal key={row.layer}>
              <div className="grid gap-2 border-t border-line py-4 md:grid-cols-[180px_1fr]">
                <span className="label-code text-cy">{row.layer}</span>
                <span>{row.tools.join(' · ')}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Research() {
  return (
    <section id="research" className="border-b border-line py-16 md:py-24">
      <div className="container-site grid gap-12 md:grid-cols-2">
        <div>
          <SectionHeader index="04" label="RESEARCH" title="Published" />
          {papers.map((p) => (
            <article key={p.doi} className="mb-6 border-l-2 border-vi pl-4">
              <a href={p.doi} target="_blank" rel="noreferrer" className="font-display text-[17px] font-semibold transition-colors hover:text-cy">
                {p.title} ↗
              </a>
              <p className="text-[14px] text-mu">{p.subtitle}</p>
              <p className="mt-1 font-mono text-[11px] text-dim">
                {p.venue} · {p.year} · {p.rank}
              </p>
            </article>
          ))}
        </div>
        <div>
          <SectionHeader label="EDUCATION" title="Studied" />
          {education.map((e) => (
            <article key={e.degree} className="mb-6 border-l-2 border-cy pl-4">
              <p className="font-display text-[17px] font-semibold">{e.degree}</p>
              <p className="text-[14px] text-mu">{e.school}</p>
              <p className="mt-1 font-mono text-[11px] text-dim">
                {e.period}
                {e.note ? ` · ${e.note}` : ''}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="container-site">
        <SectionHeader index="05" label="CONTACT" title="Have a pipeline that needs an owner?">
          Based in {profile.location}. Email is the fastest way to reach me.
        </SectionHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
          <CopyEmail email={profile.email} />
          <div className="flex gap-2">
            <Button href={profile.github} variant="ghost" target="_blank" rel="noreferrer">
              <Github size={14} /> GitHub
            </Button>
            <Button href={profile.linkedin} variant="ghost" target="_blank" rel="noreferrer">
              <Linkedin size={14} /> LinkedIn
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  useDocumentTitle(null)
  return (
    <>
      <Hero />
      <Platform />
      <Builds />
      <Stack />
      <Research />
      <Contact />
    </>
  )
}
```

- [ ] **Step 2: Verify in the browser**

Run `npm run dev`. At 1440px: hero headline ≤3 lines, DAG full width, KPI strip 4 columns; terminal types out when scrolled into view; step strip 5 columns with "Model" highlighted; nav `// 0N` links jump to each section with the heading visible below the sticky nav. At 390px: no horizontal scroll (`document.documentElement.scrollWidth === 390` in console), KPI strip 2×2, step strip 1 column, Lunch-Order facts 3 columns still readable. Click "Copy" → turns "Copied".

- [ ] **Step 3: Check, build, commit**

```bash
npm run check && npm run build
git add src/pages/Home.jsx
git commit -q -m "feat(home): hero, platform, builds, stack, research, contact

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 8: Case-study visualizations  *(Sonnet)*

**Files:**
- Create: `src/components/viz/ArchitectureDiagram.jsx`, `src/components/viz/BlackBoxFlow.jsx`, `src/components/viz/StatusBoard.jsx`

- [ ] **Step 1: `src/components/viz/ArchitectureDiagram.jsx`** — desktop SVG (md+) with hover/focus caption; mobile stacked cards with role text inline.

```jsx
import { useState } from 'react'
import { platform } from '../../content/platform'

const MONO = 'JetBrains Mono, monospace'
const DISPLAY = 'Space Grotesk, sans-serif'
const W = 160
const GAP = 50
const Y = 40
const H = 70

export default function ArchitectureDiagram() {
  const nodes = platform.architecture
  const [active, setActive] = useState(null)
  const caption =
    active === 'observability'
      ? { label: 'OBSERVABILITY', role: platform.observability.role }
      : nodes.find((n) => n.id === active)

  return (
    <div>
      <div className="hidden md:block" onMouseLeave={() => setActive(null)}>
        <svg viewBox="0 0 1000 260" className="w-full" role="img" aria-label="Sources, collection, data lake, warehouse and analytics product in sequence, with observability across every stage.">
          <defs>
            <marker id="arch-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="8" markerHeight="8" orient="auto">
              <path d="M0 0 L8 4 L0 8 z" fill="#00F0FF" />
            </marker>
          </defs>
          {nodes.slice(0, -1).map((n, i) => {
            const x1 = i * (W + GAP) + W
            return (
              <g key={`e-${n.id}`}>
                <path d={`M${x1} ${Y + H / 2} H${x1 + GAP - 4}`} stroke="#00F0FF" strokeOpacity="0.25" />
                <path d={`M${x1} ${Y + H / 2} H${x1 + GAP - 4}`} stroke="#00F0FF" className="flow" markerEnd="url(#arch-arrow)" />
              </g>
            )
          })}
          {nodes.map((n, i) => {
            const x = i * (W + GAP)
            const lit = active === n.id
            return (
              <g key={n.id} tabIndex={0} aria-label={`${n.label}: ${n.role}`} onMouseEnter={() => setActive(n.id)} onFocus={() => setActive(n.id)} className="cursor-default outline-none">
                <path d={`M${x + W / 2} ${Y + H} V190`} stroke="#10B981" strokeOpacity="0.4" strokeDasharray="2 4" />
                <rect x={x} y={Y} width={W} height={H} fill="#0E1015" stroke={lit ? '#00F0FF' : '#1E2230'} style={lit ? { filter: 'drop-shadow(0 0 8px rgba(0,240,255,0.45))' } : undefined} />
                <text x={x + 12} y={Y + 22} fontFamily={MONO} fontSize="10" letterSpacing="0.08em" fill="#94A3B8">
                  {n.step} · {n.label}
                </text>
                <text x={x + 12} y={Y + 50} fontFamily={DISPLAY} fontSize="17" fontWeight="600" fill="#F8FAFC">
                  {n.title}
                </text>
              </g>
            )
          })}
          <g tabIndex={0} aria-label={`Observability: ${platform.observability.role}`} onMouseEnter={() => setActive('observability')} onFocus={() => setActive('observability')} className="cursor-default outline-none">
            <rect x="0.5" y="190" width="999" height="50" fill="rgba(16,185,129,0.06)" stroke="#10B981" strokeOpacity={active === 'observability' ? 0.9 : 0.4} strokeDasharray="4 4" />
            <text x="16" y="220" fontFamily={MONO} fontSize="11" letterSpacing="0.08em" fill="#10B981">
              ● {platform.observability.title}
            </text>
          </g>
        </svg>
        <p aria-live="polite" className="mt-3 min-h-[2.5rem] font-mono text-[12px] text-mu">
          {caption ? (
            <>
              <span className="text-cy">› {caption.label}</span> — {caption.role}
            </>
          ) : (
            <span className="text-dim">› Hover or focus a stage to see its role.</span>
          )}
        </p>
      </div>

      <ol className="space-y-2 md:hidden">
        {nodes.map((n, i) => (
          <li key={n.id}>
            <div className="panel p-4">
              <p className="label-code text-[9.5px]">
                {n.step} · {n.label}
              </p>
              <p className="mt-1 font-display text-[17px] font-semibold">{n.title}</p>
              <p className="mt-1 text-[13px] text-mu">{n.role}</p>
            </div>
            {i < nodes.length - 1 && (
              <p aria-hidden="true" className="py-1 text-center font-mono text-cy">
                ↓
              </p>
            )}
          </li>
        ))}
        <li className="border border-dashed border-em/50 bg-em/[0.06] p-4">
          <p className="font-mono text-[11px] tracking-[0.08em] text-em">● OBSERVABILITY</p>
          <p className="mt-1 text-[13px] text-mu">{platform.observability.role}</p>
        </li>
      </ol>
    </div>
  )
}
```

- [ ] **Step 2: `src/components/viz/BlackBoxFlow.jsx`**

```jsx
function Item({ tone, children }) {
  const color = tone === 'out' ? 'bg-em' : 'bg-cy'
  return (
    <li className="panel flex items-center gap-2 px-3 py-2.5 text-[14px]">
      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${color}`} />
      {children}
    </li>
  )
}

function Arrow() {
  return (
    <p aria-hidden="true" className="text-center font-mono text-[18px] text-cy">
      <span className="md:hidden">↓</span>
      <span className="hidden md:inline">→</span>
    </p>
  )
}

export default function BlackBoxFlow({ inputs, layer, outputs }) {
  return (
    <div className="grid items-center gap-4 md:grid-cols-[1fr_auto_1.2fr_auto_1fr]">
      <div>
        <p className="label-code mb-2">Input</p>
        <ul className="space-y-2">
          {inputs.map((x) => (
            <Item key={x}>{x}</Item>
          ))}
        </ul>
      </div>
      <Arrow />
      <div className="relative overflow-hidden border border-vi/50 bg-vi/[0.06] px-6 py-10 text-center">
        <div aria-hidden="true" className="scan absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-transparent via-vi/25 to-transparent" />
        <p className="label-code relative text-[#b4b6ff]">Processing layer</p>
        <p className="relative mt-2 font-display text-[20px] font-semibold">{layer}</p>
        <p className="relative mt-2 font-mono text-[10.5px] text-dim">internals withheld</p>
      </div>
      <Arrow />
      <div>
        <p className="label-code mb-2">Output</p>
        <ul className="space-y-2">
          {outputs.map((x) => (
            <Item key={x} tone="out">
              {x}
            </Item>
          ))}
        </ul>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: `src/components/viz/StatusBoard.jsx`** (category grid + stats + generic dashboard illustration)

```jsx
import Chip from '../ui/Chip'

function DashboardSketch() {
  const line = [40, 52, 47, 60, 58, 66, 63, 72, 70, 78, 74, 82]
  const points = line.map((v, i) => `${24 + i * 20},${190 - v * 1.2}`).join(' ')
  const bars = [60, 85, 40, 95, 70]
  return (
    <svg viewBox="0 0 400 210" className="w-full" role="img" aria-label="Illustration of a monitoring dashboard">
      <rect x="0.5" y="0.5" width="399" height="209" fill="#0E1015" stroke="#1E2230" />
      {['#00F0FF', '#10B981', '#6366F1'].map((c, i) => (
        <g key={c}>
          <rect x={12 + i * 128} y="12" width="120" height="44" fill="#151821" stroke="#1E2230" />
          <rect x={22 + i * 128} y="22" width="40" height="5" fill="#475569" />
          <rect x={22 + i * 128} y="34" width={60 - i * 12} height="12" fill={c} opacity="0.85" />
        </g>
      ))}
      <rect x="12" y="66" width="248" height="134" fill="#151821" stroke="#1E2230" />
      <polyline points={points} fill="none" stroke="#00F0FF" strokeWidth="1.5" />
      <rect x="268" y="66" width="120" height="134" fill="#151821" stroke="#1E2230" />
      {bars.map((h, i) => (
        <rect key={i} x={280 + i * 21} y={190 - h} width="13" height={h} fill="#6366F1" opacity="0.8" />
      ))}
      <text x="388" y="205" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#475569">
        ILLUSTRATION
      </text>
    </svg>
  )
}

export default function StatusBoard({ categories, stats }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <div key={c.name} className="bg-s1 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.08em]">{c.name}</p>
              <Chip tone="em" dot>
                OK
              </Chip>
            </div>
            <p className="mt-2 text-[13px] text-mu">{c.detail}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr] lg:items-center">
        <dl className="grid grid-cols-2 gap-px border border-line bg-line">
          {stats.map((s) => (
            <div key={s.label} className="bg-s1 p-4">
              <dt className="font-display text-[24px] font-semibold">{s.value}</dt>
              <dd className="text-[12px] text-mu">{s.label}</dd>
            </div>
          ))}
        </dl>
        <DashboardSketch />
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Check, build, commit** (pages using these arrive in Task 9; build must still pass)

```bash
npm run check && npm run build
git add src/components/viz
git commit -q -m "feat(viz): architecture diagram, black-box flow, status board

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 9: Case-study frame and BA3 page  *(Sonnet)*

**Files:**
- Create: `src/components/case/CaseHeader.jsx`, `CaseSection.jsx`, `CaseNav.jsx`
- Modify: `src/pages/CaseStudyPlatform.jsx` (full replacement)

- [ ] **Step 1: `src/components/case/CaseHeader.jsx`**

```jsx
import Chip from '../ui/Chip'

export default function CaseHeader({ kicker, title, role, period, chips, children }) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(0,240,255,0.10),transparent_50%)]"
      />
      <div className="container-site relative py-14 md:py-20">
        <p className="font-mono text-[11px] font-medium tracking-[0.08em] text-cy">// {kicker}</p>
        <h1 className="heading-display mt-3 text-[38px] sm:text-[48px] lg:text-[56px]">{title}</h1>
        <p className="mt-4 font-mono text-[12px] text-mu">
          {role} · {period}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {chips.map((c) => (
            <Chip key={c}>{c}</Chip>
          ))}
        </div>
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: `src/components/case/CaseSection.jsx`**

```jsx
import Reveal from '../ui/Reveal'
import SectionHeader from '../ui/SectionHeader'

export default function CaseSection({ index, label, title, intro, children }) {
  return (
    <section className="border-b border-line py-14 md:py-20">
      <div className="container-site">
        <SectionHeader index={index} label={label} title={title}>
          {intro}
        </SectionHeader>
        <Reveal>{children}</Reveal>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: `src/components/case/CaseNav.jsx`**

```jsx
import { Link } from 'react-router-dom'

export default function CaseNav({ prev, next }) {
  return (
    <nav aria-label="Case studies" className="container-site grid gap-4 py-10 sm:grid-cols-2">
      {[prev, next].map((item, i) =>
        item ? (
          <Link
            key={item.to}
            to={item.to}
            className={`group border border-line bg-s1/40 p-6 transition-colors hover:border-cy ${i === 1 ? 'sm:text-right' : ''}`}
          >
            <p className="label-code">{i === 0 ? '← previous' : 'next →'}</p>
            <p className="mt-1 font-display text-[20px] font-semibold uppercase group-hover:text-cy">{item.label}</p>
          </Link>
        ) : (
          <span key={i} />
        ),
      )}
    </nav>
  )
}
```

- [ ] **Step 4: Replace `src/pages/CaseStudyPlatform.jsx`**

```jsx
import { Link } from 'react-router-dom'
import CaseHeader from '../components/case/CaseHeader'
import CaseNav from '../components/case/CaseNav'
import CaseSection from '../components/case/CaseSection'
import KpiStrip from '../components/ui/KpiStrip'
import Panel from '../components/ui/Panel'
import ArchitectureDiagram from '../components/viz/ArchitectureDiagram'
import BlackBoxFlow from '../components/viz/BlackBoxFlow'
import StatusBoard from '../components/viz/StatusBoard'
import { kpis } from '../content/profile'
import { platform } from '../content/platform'
import { lunchOrder } from '../content/lunchOrder'
import useDocumentTitle from '../lib/useDocumentTitle'

export default function CaseStudyPlatform() {
  useDocumentTitle(platform.name)
  return (
    <>
      <CaseHeader kicker="CASE STUDY · 01" title={platform.name} role={platform.role} period={platform.period} chips={platform.chips}>
        <p className="mb-8 max-w-2xl text-[16px] text-mu md:text-[17px]">{platform.pitch}</p>
        <KpiStrip items={kpis} />
      </CaseHeader>

      <CaseSection index="01" label="PROBLEM" title="Six sources, no single view">
        <ul className="grid gap-px border border-line bg-line md:grid-cols-3">
          {platform.problem.map((p, i) => (
            <li key={i} className="bg-s1 p-5">
              <p className="label-code text-am">pain · {String(i + 1).padStart(2, '0')}</p>
              <p className="mt-2 text-[14px] text-mu">{p}</p>
            </li>
          ))}
        </ul>
      </CaseSection>

      <CaseSection index="02" label="ARCHITECTURE" title="From source to product" intro="A high-level view. Internals are intentionally left out.">
        <ArchitectureDiagram />
      </CaseSection>

      <CaseSection index="03" label="KEY DECISIONS" title="Choices that shaped it">
        <div className="grid gap-4 md:grid-cols-2">
          {platform.decisions.map((d, i) => (
            <Panel key={d.title} title={`decision · ${String(i + 1).padStart(2, '0')}`} className="transition-colors hover:border-t-cy">
              <h3 className="font-display text-[19px] font-semibold">{d.title}</h3>
              <dl className="mt-3 space-y-3 text-[14px]">
                <div>
                  <dt className="label-code text-cy">why</dt>
                  <dd className="mt-1 text-mu">{d.why}</dd>
                </div>
                <div>
                  <dt className="label-code text-am">trade-off</dt>
                  <dd className="mt-1 text-mu">{d.tradeoff}</dd>
                </div>
              </dl>
            </Panel>
          ))}
        </div>
      </CaseSection>

      <CaseSection index="04" label="OBSERVABILITY" title="Alerts before customers notice">
        <StatusBoard categories={platform.checkCategories} stats={platform.observabilityStats} />
      </CaseSection>

      <CaseSection index="05" label="REVIEW ENRICHMENT" title="Making Vietnamese reviews countable" intro={platform.enrichment.note}>
        <BlackBoxFlow inputs={platform.enrichment.inputs} layer={platform.enrichment.layer} outputs={platform.enrichment.outputs} />
        <p className="mt-6 font-mono text-[12px] text-mu">
          Related:{' '}
          <Link to="/#research" className="text-cy hover:underline">
            my published research on Vietnamese review mining →
          </Link>
        </p>
      </CaseSection>

      <CaseSection index="06" label="LESSONS" title="What I'd keep, what's next">
        <ul className="space-y-3">
          {platform.lessons.map((l) => (
            <li key={l} className="flex gap-3 text-[15px]">
              <span aria-hidden="true" className="font-mono text-cy">›</span>
              <span className="text-mu">{l}</span>
            </li>
          ))}
        </ul>
      </CaseSection>

      <CaseNav prev={{ to: '/', label: 'Home' }} next={{ to: `/work/${lunchOrder.slug}`, label: lunchOrder.name }} />
    </>
  )
}
```

- [ ] **Step 5: Verify** — `npm run dev`, open `/work/ba3-data-platform` at 1440px and 390px: diagram (desktop SVG / mobile cards), decisions 2 columns → 1, status board, black-box flow with scanning bar (horizontal on desktop, vertical with ↓ on mobile), CaseNav. "Related" link lands on the research section of home. No horizontal scroll at 390px.

- [ ] **Step 6: Check, build, commit**

```bash
npm run check && npm run build
git add src/components/case src/pages/CaseStudyPlatform.jsx
git commit -q -m "feat(case): case study frame and BA3 platform page

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 10: ERD and Lunch-Order page  *(Sonnet)*

**Files:**
- Create: `src/components/viz/Erd.jsx`
- Modify: `src/pages/CaseStudyLunchOrder.jsx` (full replacement)

- [ ] **Step 1: `src/components/viz/Erd.jsx`** — desktop SVG (md+): 3×2 grid of entity boxes; relation lines drawn center-to-center under the boxes with labels at the midpoint. Mobile: entity cards + relation list.

```jsx
const MONO = 'JetBrains Mono, monospace'
const DISPLAY = 'Space Grotesk, sans-serif'
const BOX_W = 200
const BOX_H = 104
const COLS = [40, 350, 660]
const ROWS = [30, 220]

function positions(entities) {
  return Object.fromEntries(entities.map((e, i) => [e.id, { x: COLS[i % 3], y: ROWS[Math.floor(i / 3)] }]))
}

export default function Erd({ entities, relations }) {
  const pos = positions(entities)
  const center = (id) => ({ x: pos[id].x + BOX_W / 2, y: pos[id].y + BOX_H / 2 })
  const names = Object.fromEntries(entities.map((e) => [e.id, e.name]))

  return (
    <div>
      <svg viewBox="0 0 900 360" className="hidden w-full md:block" role="img" aria-label={`Data model: ${relations.map(([a, b, l]) => `${names[a]} ${l} ${names[b]}`).join('; ')}.`}>
        {relations.map(([a, b]) => {
          const p = center(a)
          const q = center(b)
          return <line key={`${a}-${b}`} x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke="#6366F1" strokeOpacity="0.6" strokeWidth="1.2" />
        })}
        {entities.map((e) => {
          const { x, y } = pos[e.id]
          return (
            <g key={e.id}>
              <rect x={x} y={y} width={BOX_W} height={BOX_H} fill="#0E1015" stroke="#1E2230" />
              <rect x={x} y={y} width={BOX_W} height="28" fill="#151821" stroke="#1E2230" />
              <text x={x + 12} y={y + 19} fontFamily={DISPLAY} fontSize="14" fontWeight="600" fill="#F8FAFC">
                {e.name}
              </text>
              {e.fields.map((f, i) => (
                <text key={f} x={x + 12} y={y + 48 + i * 20} fontFamily={MONO} fontSize="11" fill="#94A3B8">
                  · {f}
                </text>
              ))}
            </g>
          )
        })}
        {relations.map(([a, b, label]) => {
          const p = center(a)
          const q = center(b)
          const mx = (p.x + q.x) / 2
          const my = (p.y + q.y) / 2
          const w = label.length * 6.6 + 12
          return (
            <g key={`l-${a}-${b}`}>
              <rect x={mx - w / 2} y={my - 9} width={w} height="18" fill="#08090C" stroke="#6366F1" strokeOpacity="0.6" />
              <text x={mx} y={my + 3.5} textAnchor="middle" fontFamily={MONO} fontSize="10" fill="#b4b6ff">
                {label}
              </text>
            </g>
          )
        })}
      </svg>

      <div className="space-y-4 md:hidden">
        <div className="grid grid-cols-2 gap-2">
          {entities.map((e) => (
            <div key={e.id} className="panel p-3">
              <p className="font-display text-[14px] font-semibold">{e.name}</p>
              <ul className="mt-1 font-mono text-[10.5px] text-mu">
                {e.fields.map((f) => (
                  <li key={f}>· {f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <ul className="space-y-1 font-mono text-[12px] text-mu">
          {relations.map(([a, b, label]) => (
            <li key={`${a}-${b}`}>
              {names[a]} <span className="text-[#b4b6ff]">— {label} →</span> {names[b]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
```

Note: in the desktop SVG, a line between non-adjacent boxes (e.g. Members → Orders) passes under the middle box's area only if they share a row; the given entity order (`members, sessions, shops` / `payments, orders, menu`) keeps every relation between adjacent or diagonal cells, so no line crosses a box. Keep that order.

- [ ] **Step 2: Replace `src/pages/CaseStudyLunchOrder.jsx`**

```jsx
import CaseHeader from '../components/case/CaseHeader'
import CaseNav from '../components/case/CaseNav'
import CaseSection from '../components/case/CaseSection'
import Panel from '../components/ui/Panel'
import Erd from '../components/viz/Erd'
import { lunchOrder } from '../content/lunchOrder'
import { platform } from '../content/platform'
import useDocumentTitle from '../lib/useDocumentTitle'

export default function CaseStudyLunchOrder() {
  useDocumentTitle(lunchOrder.name)
  return (
    <>
      <CaseHeader kicker="CASE STUDY · 02 · SIDE BUILD" title={lunchOrder.name} role={lunchOrder.role} period={lunchOrder.period} chips={lunchOrder.chips}>
        <p className="mb-8 max-w-2xl text-[16px] text-mu md:text-[17px]">{lunchOrder.pitch}</p>
        <dl className="grid max-w-xl grid-cols-3 gap-px border border-line bg-line">
          {lunchOrder.facts.map((f) => (
            <div key={f.label} className="bg-s1 p-4">
              <dt className="font-display text-[26px] font-semibold">{f.value}</dt>
              <dd className="text-[12px] leading-snug text-mu">{f.label}</dd>
            </div>
          ))}
        </dl>
      </CaseHeader>

      <CaseSection index="01" label="PROBLEM" title="Lunch by group chat">
        <p className="max-w-2xl text-mu">{lunchOrder.problem}</p>
      </CaseSection>

      <CaseSection index="02" label="DATA MODEL" title="Six entities, simplified" intro="The real schema has more tables; this is the shape that matters.">
        <Erd entities={lunchOrder.entities} relations={lunchOrder.relations} />
      </CaseSection>

      <CaseSection index="03" label="LOGIC IN THE DATABASE" title="Thin client, strict Postgres">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <ul className="space-y-3">
            {lunchOrder.logic.map((l) => (
              <li key={l} className="flex gap-3">
                <span aria-hidden="true" className="font-mono text-cy">›</span>
                <span className="text-mu">{l}</span>
              </li>
            ))}
          </ul>
          <Panel title="policies.sql // illustrative" bodyClassName="p-0">
            <pre className="overflow-x-auto bg-[#05060a] px-4 py-5 font-mono text-[12.5px] leading-[1.75] text-[#c9d1d9]">{lunchOrder.rlsSnippet}</pre>
          </Panel>
        </div>
      </CaseSection>

      <CaseSection index="04" label="TESTING" title="A real Postgres inside the test runner">
        <p className="max-w-2xl text-mu">{lunchOrder.testing}</p>
      </CaseSection>

      <CaseSection index="05" label="RELEASES" title="Seven versions, three jumps">
        <ol className="grid gap-px border border-line bg-line md:grid-cols-3">
          {lunchOrder.milestones.map((m) => (
            <li key={m.version} className="bg-s1 p-5">
              <p className="font-mono text-[12px] text-cy">{m.version}</p>
              <p className="mt-1 font-display text-[18px] font-semibold">{m.title}</p>
              <p className="mt-2 text-[14px] text-mu">{m.text}</p>
            </li>
          ))}
        </ol>
      </CaseSection>

      <CaseSection index="06" label="STACK & COST" title="Free tier, all the way">
        <div className="border-b border-line">
          {lunchOrder.stack.map((row) => (
            <div key={row.key} className="grid gap-1 border-t border-line py-3 md:grid-cols-[180px_1fr]">
              <span className="label-code text-cy">{row.key}</span>
              <span>{row.value}</span>
            </div>
          ))}
        </div>
      </CaseSection>

      <CaseNav prev={{ to: `/work/${platform.slug}`, label: platform.name }} next={{ to: '/', label: 'Home' }} />
    </>
  )
}
```

- [ ] **Step 3: Verify** — `/work/lunch-order` at 1440px: ERD boxes not overlapping, every relation label readable and not covering a box title; at 390px the card/list version shows, no horizontal page scroll (the SQL `pre` may scroll inside itself).

- [ ] **Step 4: Check, build, commit**

```bash
npm run check && npm run build
git add src/components/viz/Erd.jsx src/pages/CaseStudyLunchOrder.jsx
git commit -q -m "feat(case): lunch-order page with simplified ERD

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 11: 404, favicon, OG image, README  *(Haiku)*

**Files:**
- Modify: `src/pages/NotFound.jsx`, `README.md`
- Create: `public/favicon.svg`, `scripts/og.html`, `public/og.png` (rendered)

- [ ] **Step 1: Replace `src/pages/NotFound.jsx`**

```jsx
import Button from '../components/ui/Button'
import Terminal from '../components/ui/Terminal'
import useDocumentTitle from '../lib/useDocumentTitle'

const lines = [
  { kind: 'cmd', text: 'resolve route' },
  { kind: 'out', text: '404  no partition for this path' },
  { kind: 'dim', text: 'hint: go back to the home page' },
]

export default function NotFound() {
  useDocumentTitle('Not found')
  return (
    <section className="container-site grid gap-10 py-20 md:grid-cols-2 md:items-center">
      <div>
        <p className="font-mono text-[11px] tracking-[0.08em] text-am">// 404</p>
        <h1 className="heading-display mt-2 text-[44px] md:text-[56px]">Nothing landed here.</h1>
        <div className="mt-8">
          <Button to="/">← Back home</Button>
        </div>
      </div>
      <Terminal title="router" lines={lines} />
    </section>
  )
}
```

- [ ] **Step 2: Create `public/favicon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="#08090C"/>
  <rect x="4.5" y="4.5" width="55" height="55" fill="none" stroke="#00F0FF" stroke-width="3"/>
  <text x="32" y="41" text-anchor="middle" font-family="Consolas, monospace" font-size="24" font-weight="700" fill="#00F0FF">NT</text>
</svg>
```

- [ ] **Step 3: Create `scripts/og.html`** (1200×630 social card)

```html
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500&family=Space+Grotesk:wght@700&display=swap" rel="stylesheet">
<style>
  html,body{margin:0;width:1200px;height:630px;background:#08090C;color:#F8FAFC;overflow:hidden}
  body{background-image:radial-gradient(rgba(255,255,255,.05) 1px,transparent 1px),radial-gradient(circle at 85% 90%,rgba(99,102,241,.25),transparent 55%);background-size:24px 24px,auto;font-family:'Space Grotesk',sans-serif;padding:72px 80px;box-sizing:border-box;position:relative}
  .k{font:500 18px 'JetBrains Mono',monospace;color:#00F0FF;letter-spacing:.08em}
  h1{font-size:76px;line-height:1.02;letter-spacing:-.035em;text-transform:uppercase;margin:22px 0 0;max-width:900px}
  .b{position:absolute;left:80px;right:80px;bottom:64px;display:flex;justify-content:space-between;font:500 18px 'JetBrains Mono',monospace;color:#94A3B8;border-top:1px solid #1E2230;padding-top:22px}
  .b span:first-child{color:#F8FAFC}
  .dot{display:inline-block;width:10px;height:10px;border-radius:50%;background:#10B981;box-shadow:0 0 12px #10B981;margin-right:10px}
</style>
</head>
<body>
  <div class="k">// DATA ENGINEER · HO CHI MINH CITY</div>
  <h1>Turning six marketplaces into one warehouse.</h1>
  <div class="b"><span>NGUYEN THIEN THUAT</span><span><i class="dot"></i>6 sources · ~140 tables · 20+ checks</span></div>
</body>
</html>
```

- [ ] **Step 4: Render `public/og.png` with headless Chrome**

```bash
cd /d/career/MyApp/profile
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu --hide-scrollbars \
  --window-size=1200,630 --virtual-time-budget=4000 \
  --screenshot="$(cygpath -w "$PWD/public/og.png")" "file:///$(cygpath -m "$PWD/scripts/og.html")"
ls -la public/og.png
```
Expected: `public/og.png` exists (≈50–200 KB). Open it with the Read tool to confirm the text is fully visible and fonts rendered (not Times).

- [ ] **Step 5: Replace `README.md`**

````markdown
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

## Social preview

`public/og.png` is rendered from `scripts/og.html` with headless Chrome (see the implementation plan, Task 11).
````

- [ ] **Step 6: Check, build, commit**

```bash
npm run check && npm run build
git add src/pages/NotFound.jsx public/favicon.svg public/og.png scripts/og.html README.md
git commit -q -m "feat: 404 page, favicon, social preview, readme

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 12: Verification pass  *(Sonnet)*

**Files:**
- Create (git-ignored): `.superpowers/verify.mjs`
- Fixes only, wherever a check fails.

`playwright-core` drives the already-installed Chrome; it is installed with `--no-save` so `package.json` does not change.

- [ ] **Step 1: Static checks**

Run: `npm run check && npm run build`
Expected: both succeed.

- [ ] **Step 2: Install the driver (not saved)**

Run: `npm i --no-save playwright-core`
Expected: installs without touching `package.json` (`git status` shows no change to it).

- [ ] **Step 3: Create `.superpowers/verify.mjs`**

```js
import { mkdirSync } from 'node:fs'
import { chromium } from 'playwright-core'

const BASE = 'http://localhost:4173'
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const routes = { home: '/', platform: '/work/ba3-data-platform', lunch: '/work/lunch-order', 404: '/missing' }
mkdirSync('.superpowers/shots', { recursive: true })

const browser = await chromium.launch({ executablePath: CHROME })
let failed = false

for (const [width, label] of [[1440, 'desktop'], [390, 'mobile']]) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' })
  const page = await ctx.newPage()
  for (const [name, path] of Object.entries(routes)) {
    await page.goto(BASE + path, { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    const fontsOk = await page.evaluate(
      () => document.fonts.check('16px "Space Grotesk"') && document.fonts.check('12px "JetBrains Mono"') && document.fonts.check('15px Inter'),
    )
    const title = await page.title()
    await page.screenshot({ path: `.superpowers/shots/${name}-${label}.png`, fullPage: true })
    const overflow = scrollWidth > width
    if (overflow || !fontsOk) failed = true
    console.log(`${label.padEnd(7)} ${name.padEnd(8)} scrollWidth=${scrollWidth}${overflow ? ' OVERFLOW' : ''} fonts=${fontsOk ? 'ok' : 'MISSING'} title="${title}"`)
    if (overflow) {
      const offenders = await page.evaluate(
        (w) => [...document.querySelectorAll('body *')].filter((e) => e.getBoundingClientRect().right > w + 1).slice(0, 8).map((e) => `${e.tagName}.${String(e.className).slice(0, 80)}`),
        width,
      )
      console.log('  offenders:', offenders)
    }
  }
  await ctx.close()
}

// Anchor navigation from a case page lands on the home section.
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
const page = await ctx.newPage()
await page.goto(BASE + '/work/lunch-order', { waitUntil: 'networkidle' })
await page.locator('nav[aria-label="Primary"]').getByRole('link', { name: '// 03 STACK' }).click()
await page.waitForTimeout(600)
const top = await page.evaluate(() => document.getElementById('stack')?.getBoundingClientRect().top ?? -1)
const anchorOk = top >= 0 && top < 220
if (!anchorOk) failed = true
console.log(`anchor   /work/lunch-order → #stack top=${Math.round(top)} ${anchorOk ? 'ok' : 'FAIL'}`)

// Terminal finishes typing with motion enabled.
await page.goto(BASE + '/', { waitUntil: 'networkidle' })
await page.locator('#platform-terminal').scrollIntoViewIfNeeded()
await page.waitForTimeout(4000)
const typed = await page.locator('#platform-terminal pre > div').count()
const termOk = typed >= 8
if (!termOk) failed = true
console.log(`terminal lines rendered=${typed} ${termOk ? 'ok' : 'FAIL'}`)

await browser.close()
process.exit(failed ? 1 : 0)
```

- [ ] **Step 4: Run it against the production build**

Start `npm run preview -- --port 4173 --strictPort` in the background, then:

Run: `node .superpowers/verify.mjs`
Expected: 8 page lines with `scrollWidth` equal to the viewport width (1440 / 390), `fonts=ok`, titles like `BA3 Data Platform — Nguyen Thien Thuat · Data Engineer`, then `anchor … ok` and `terminal … ok`; exit code 0.

On `OVERFLOW`, fix the listed offender's classes (usually a missing `min-w-0`, `overflow-x-auto` on a `pre`, or a fixed width), rebuild, rerun.

- [ ] **Step 5: Review the screenshots**

Open each PNG in `.superpowers/shots/` with the Read tool and check against spec §4:
- Fonts render as Space Grotesk / Inter / JetBrains Mono (no serif fallback).
- Home: headline, DAG (horizontal on desktop, vertical on mobile), buttons, KPI strip, then platform, builds, stack, research, contact in order.
- Platform: header + KPIs, problem, architecture (SVG desktop / cards mobile), 4 decisions, status board, black-box flow, lessons, case nav.
- Lunch-Order: facts, ERD (SVG desktop / cards mobile), logic + SQL, testing, 3 milestones, stack, case nav.
- 404 renders inside the shell.
- Nothing overlaps or is clipped; ERD relation labels do not cover box titles.

Fix any visual defect, rebuild, rerun Step 4.

- [ ] **Step 6: Stop the preview server, final checks, commit**

```bash
npm run check && npm run build
git status --short   # package.json must be unchanged
git add -A src
git commit -q -m "fix: verification pass adjustments

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```
Skip the commit if nothing changed. Report: the verify output, which screenshots were reviewed, any remaining issues.
