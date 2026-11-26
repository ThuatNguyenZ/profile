# Motion, Wayfinding & BA3 Generalization Implementation Plan

> **For agentic workers:** Execute task by task. Steps use checkbox (`- [ ]`) syntax. Implementers run via `codex exec`; auditors (Claude Sonnet/Haiku) verify after each task.

**Goal:** Address owner feedback on the live site: (1) the site feels static, (2) after clicking into a case study or section there is no sense of "where am I", (3) the hero needs an animated 3D network background like the Stitch reference at 50% speed, (4) the BA3 content still reveals too much and must be generalized further.

**Architecture:** Same React 19 + Vite + Tailwind SPA. New pieces: `HeroNetwork` (three.js, lazy-loaded), `useScrollSpy` hook, nav active state + scroll progress, case-study left sidebar TOC (mobile: sticky chip bar), breadcrumb, route transitions, hover "lift", status-strip marquee, `PipelinePulse` (replaces the home terminal). BA3 content is rewritten at principle level and the confidentiality lint is tightened.

**Tech Stack:** React 19, Vite 6, Tailwind 3, react-router 7, framer-motion 12, three 0.170 (already installed on this branch).

**Branch:** `feat/motion-wayfinding` (checked out; `three` already in package.json — do not run npm install). Shell: Git Bash on Windows. Repo: `D:\career\MyApp\profile`.

**Existing spec:** `docs/superpowers/specs/2026-11-19-data-engineer-portfolio-redesign-design.md`. This plan overrides it where they differ.

**Commit trailer:** every commit message ends with a blank line and `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

---

## Design decisions (approved by owner 2026-11-26)

### D1 — BA3 "strong hide" level
- No platform names (Shopee, Lazada, TikTok, Amazon, Meta Ads, Google Ads). Use "marketplaces" and "ad platforms" only.
- No counts that describe the system: no 6 sources, ~140 tables, ~3.4k tests, 20+ checks, 8 dashboards, cron cadences (daily / every 4h / every 15m).
- No AWS service names beyond "AWS" (no SSM, SES, EC2, S3 in BA3 copy). The personal stack list on the home page may still name tools the owner knows.
- No terminal / dry-run demo, no "one host", no "five cutover phases", no raw/clean warehouse split, no "Vietnamese reviews"/"star ratings" in the BA3 copy.
- Architecture = 4 blocks: Sources → Data Lake → Warehouse → Product, plus a Monitoring band.
- "Key decisions" become "Principles" (4 general lines).
- Review NLP becomes "Text enrichment": unstructured customer text → [black box] → clean text · themes · sentiment.
- Hero headline no longer says "six": **"Turning scattered commerce data into one warehouse."**

### D2 — Motion
- Hero: three.js node network behind the hero, ported from the Stitch reference, **every speed multiplied by 0.5**. Masked on the left so the headline stays readable. Lazy-loaded. Pauses off-screen and in background tabs. Reduced motion → one static frame. DPR capped at 1.5, fewer nodes/packets below 768px.
- Hero headline: words rise in with a stagger.
- Hero DAG: glowing packets travel along edges (SVG `animateMotion`, hidden under reduced motion).
- Status strip: slow marquee (pauses on hover, static under reduced motion).
- Cards: hover "lift" (−2px, cyan-tinted border, soft glow).
- Home platform section: `PipelinePulse` — 4 generic stages with looping progress bars and OK chips (replaces the terminal).
- Route change: page fades/slides in; a cyan progress bar sweeps across the top.

### D3 — Wayfinding
- Top nav: the link for the current section is cyan with an animated underline (shared `layoutId`). On `/work/ba3-data-platform` the active link is `// 01 PLATFORM`; on `/work/lunch-order` it is `// 02 BUILDS`. On home it follows scroll (scroll-spy).
- Thin scroll-progress bar under the nav on every page.
- Case pages: breadcrumb `~ / work / <slug>` in the header; a **left sticky sidebar** (≥1024px) listing the page's sections with the active one highlighted and a vertical progress line; below 1024px a sticky horizontal chip bar under the nav with the active chip highlighted and scrolled into view.
- Sidebar/chip clicks smooth-scroll to the section.

---

## File map

| Path | Change |
|---|---|
| `src/content/platform.js` | Rewrite (D1) |
| `src/content/profile.js` | New headline, status strip, KPIs |
| `src/content/stack.js` | ORCHESTRATE row wording |
| `scripts/check-content.mjs` | Stricter rules; also scan `scripts/og.html` |
| `scripts/og.html`, `public/og.png`, `index.html` | New headline/description; re-render PNG (auditor task) |
| `src/components/viz/HeroDag.jsx` | Rewrite: 2 source groups, 3 nodes, packets |
| `src/components/viz/HeroNetwork.jsx` | New (three.js) |
| `src/components/viz/ArchitectureDiagram.jsx` | Width computed from node count |
| `src/components/viz/StatusBoard.jsx` | unchanged API |
| `src/components/ui/PipelinePulse.jsx` | New |
| `src/components/ui/Terminal.jsx` | keep (still used by 404) |
| `src/lib/useScrollSpy.js` | New |
| `src/components/layout/Nav.jsx` | Active state + progress bar |
| `src/components/layout/StatusStrip.jsx` | Marquee |
| `src/components/layout/RouteTransition.jsx` | New (page fade + top sweep bar) |
| `src/App.jsx` | Wrap routes with transitions |
| `src/components/case/CaseHeader.jsx` | Breadcrumb |
| `src/components/case/CaseSection.jsx` | `id` prop, no own container |
| `src/components/case/CaseToc.jsx` | New sidebar / chip bar |
| `src/components/case/CaseBody.jsx` | New grid wrapper (TOC + sections) |
| `src/pages/Home.jsx` | Network bg, headline motion, PipelinePulse, lift |
| `src/pages/CaseStudyPlatform.jsx` | New content structure + TOC |
| `src/pages/CaseStudyLunchOrder.jsx` | TOC + ids |
| `src/styles/index.css` | `.lift`, marquee, packet, sweep keyframes |

---

### Task 1: Generalize BA3 content + tighten the lint  *(implementer: codex)*

**Files:** `src/content/platform.js`, `src/content/profile.js`, `src/content/stack.js`, `scripts/check-content.mjs`, `scripts/og.html`, `index.html`, `src/components/viz/HeroDag.jsx`, `src/components/viz/ArchitectureDiagram.jsx`, `src/components/ui/PipelinePulse.jsx`, `src/pages/Home.jsx`, `src/pages/CaseStudyPlatform.jsx`, `src/styles/index.css`

- [ ] **Step 1: Tighten `scripts/check-content.mjs` first (it must fail on the current tree)**

Change `TARGETS` to `['src', 'index.html', 'scripts/og.html']` and append these rules to `RULES`:

```js
  [/shopee|lazada|tiktok|amazon|meta ads|google ads/i, 'do not name BA3 source platforms'],
  [/\bSSM\b|\bSES\b/, 'do not name BA3 AWS services'],
  [/~140|3\.4k|20\+ checks|8 dashboards|every 4h|every 15 ?m|six marketplaces|6 sources/i, 'do not state BA3 system counts or cadences'],
  [/one host|five cutover|cutover phases|vietnamese reviews|star ratings|names redacted|dry-run|dry run/i, 'BA3 implementation detail'],
```

Run `npm run check; echo exit=$?` → expect many problems and `exit=1` (proves the rules bite).

- [ ] **Step 2: Replace `src/content/platform.js`**

```js
export const platform = {
  slug: 'ba3-data-platform',
  name: 'BA3 Data Platform',
  company: 'BA3 Studio',
  role: 'Data Engineer — owner of the data platform',
  period: '03/2025 → now',
  pitch:
    'The data platform behind an e-commerce analytics product: commerce and advertising data collected, stored, modeled and monitored end to end.',
  chips: ['Python', 'AWS', 'PostgreSQL', 'Parquet', 'Grafana', 'CI/CD'],

  sourceGroups: [
    { id: 'marketplaces', label: 'MARKETPLACES' },
    { id: 'ads', label: 'AD PLATFORMS' },
  ],
  heroNodes: {
    sources: { label: 'SOURCES', role: 'Marketplace and advertising data, collected on schedule.' },
    lake: { label: 'DATA LAKE', role: 'Raw data kept as-is, so history can be replayed.' },
    warehouse: { label: 'WAREHOUSE', role: 'Cleaned, analysis-ready models.' },
    analytics: { label: 'ANALYTICS', role: 'Dashboards and recommendations brands act on.' },
    observe: { label: 'MONITORING', role: 'Automated checks watch every stage and raise alerts.' },
  },
  heroHint: 'Hover or focus a node to see what it does.',

  pulse: [
    { label: 'Collect', note: 'commerce & ads' },
    { label: 'Land', note: 'raw, replayable' },
    { label: 'Model', note: 'clean tables' },
    { label: 'Serve', note: 'analytics' },
  ],

  steps: [
    { label: 'COLLECT', title: 'Multi-source intake', detail: 'scheduled · resilient' },
    { label: 'LAND', title: 'Data lake', detail: 'raw · replayable' },
    { label: 'MODEL', title: 'Warehouse', detail: 'clean · analysis-ready', highlight: true },
    { label: 'ENRICH', title: 'Text signals', detail: 'unstructured → structured' },
    { label: 'OBSERVE', title: 'Monitoring', detail: 'automated checks · alerts' },
  ],

  problem: [
    'Commerce and advertising data arrived from many places, each with its own access rules and limits.',
    'Processing was spread across ad-hoc scripts that were hard to rerun or reason about.',
    'There was no single place to see whether data was complete and on time.',
  ],

  architecture: [
    { id: 'sources', step: '01', label: 'SOURCES', title: 'Commerce & ads', role: 'Marketplace and advertising data, collected on schedule.' },
    { id: 'lake', step: '02', label: 'DATA LAKE', title: 'Raw, replayable', role: 'Data lands untouched first, so any period can be reprocessed.' },
    { id: 'warehouse', step: '03', label: 'WAREHOUSE', title: 'Clean models', role: 'Consistent, analysis-ready tables across sources.' },
    { id: 'product', step: '04', label: 'PRODUCT', title: 'Analytics', role: 'Powers the dashboards and recommendations brands use.' },
  ],
  observability: {
    title: 'MONITORING — across every stage',
    role: 'Automated checks on every stage, with alerts when something drifts.',
  },

  principles: [
    { title: 'Simple, resumable orchestration', why: 'Jobs can stop and pick up where they left off, so a failure costs minutes, not days.', tradeoff: 'Fewer built-in features than a heavyweight scheduler.' },
    { title: 'Raw first, transform later', why: 'Keeping source data untouched makes every fix replayable.', tradeoff: 'More storage to manage.' },
    { title: 'Clear boundaries between layers', why: 'Each layer has one job and depends in one direction, which keeps changes local.', tradeoff: 'A little more structure up front.' },
    { title: 'Migrate in small, verified steps', why: 'Old and new paths ran side by side until results matched.', tradeoff: 'A period of running both.' },
  ],

  checkCategories: [
    { name: 'Runs', detail: 'Did scheduled work start and finish on time?' },
    { name: 'Freshness', detail: 'Is new data still arriving?' },
    { name: 'Completeness', detail: 'Did each load write what it should?' },
    { name: 'Sources', detail: 'Are upstream systems healthy and reachable?' },
    { name: 'Access', detail: 'Are credentials valid before they expire?' },
    { name: 'Infrastructure', detail: 'Is the platform itself healthy?' },
  ],
  observabilityStats: [
    { value: '24/7', label: 'automated checks' },
    { value: 'alerts', label: 'with mute & reminders' },
    { value: 'boards', label: 'for every stage' },
    { value: 'early', label: 'problems surface before anyone asks' },
  ],

  enrichment: {
    note: 'Customer text is messy — slang, abbreviations, missing accents. A dedicated layer turns it into signals analysts can count.',
    inputs: ['Unstructured customer text'],
    layer: 'Text enrichment',
    outputs: ['Clean text', 'Themes', 'Sentiment'],
  },

  lessons: [
    'Monitoring pays for itself quickly — problems now surface before anyone asks.',
    'Writing the runbook while building leads to simpler designs.',
    'Next: clearer data contracts between layers.',
  ],
}
```

- [ ] **Step 3: In `src/content/profile.js`** set:

```js
  headline: 'Turning scattered commerce data into one warehouse.',
```
and replace `statusStrip` and `kpis`:

```js
export const statusStrip = [
  { label: 'role', value: 'data engineer' },
  { label: 'based in', value: 'ho chi minh city' },
  { label: 'focus', value: 'pipelines · warehousing · monitoring' },
  { label: 'stack', value: 'python · aws · postgres' },
  { label: 'research', value: 'recommender systems · nlp' },
]

export const kpis = [
  { value: '2', label: 'data domains — commerce and advertising' },
  { value: '4', label: 'layers — sources, lake, warehouse, product' },
  { value: '24/7', label: 'automated monitoring with alerts' },
  { value: '1', label: 'owner — design, build and operate' },
]
```

- [ ] **Step 4: In `src/content/stack.js`** change the ORCHESTRATE row tools to `['custom orchestration', 'cron', 'Celery', 'GitHub Actions', 'Docker']`.

- [ ] **Step 5: `index.html` and `scripts/og.html`** — replace "Turning six marketplaces into one warehouse." with "Turning scattered commerce data into one warehouse." (og:description and the og.html `<h1>`). In `scripts/og.html` replace the bottom-right text `6 sources · ~140 tables · 20+ checks` with `pipelines · warehousing · monitoring`. Do NOT re-render `public/og.png` (the auditor does it; the sandbox has no browser).

- [ ] **Step 6: Replace `src/components/viz/HeroDag.jsx`**

```jsx
import { useState } from 'react'
import { platform } from '../../content/platform'

const CY = '#00F0FF'
const VI = '#6366F1'
const EM = '#10B981'
const LINE = '#1E2230'
const MONO = 'JetBrains Mono, monospace'
const ARIA = 'Marketplace and advertising data flow into a data lake, then a warehouse and analytics, with monitoring across every stage.'

function Edge({ d, color, packets = 1, delay = 0 }) {
  return (
    <>
      <path d={d} fill="none" stroke={color} strokeOpacity="0.22" strokeWidth="1.2" />
      <path d={d} fill="none" stroke={color} strokeWidth="1.4" className="flow" />
      {Array.from({ length: packets }, (_, i) => (
        <circle key={i} r="2.6" fill={color} className="packet" style={{ filter: `drop-shadow(0 0 4px ${color})` }}>
          <animateMotion dur="4.8s" repeatCount="indefinite" begin={`${delay + i * 1.6}s`} path={d} />
        </circle>
      ))}
    </>
  )
}

function Box({ id, x, y, w, h = 36, label, active, highlight, onActivate, roleKey = id }) {
  const node = platform.heroNodes[roleKey]
  const lit = active === roleKey || highlight
  return (
    <g tabIndex={0} aria-label={`${label}: ${node.role}`} onMouseEnter={() => onActivate(roleKey)} onFocus={() => onActivate(roleKey)} className="cursor-default outline-none">
      <rect x={x} y={y} width={w} height={h} fill="#0E1015" stroke={lit ? CY : LINE} style={active === roleKey ? { filter: 'drop-shadow(0 0 8px rgba(0,240,255,0.45))' } : undefined} />
      <text x={x + w / 2} y={y + h / 2 + 3.5} textAnchor="middle" fontFamily={MONO} fontSize="10" letterSpacing="0.06em" fill={highlight ? CY : '#F8FAFC'}>
        {label}
      </text>
    </g>
  )
}

function Monitor({ d, ticks, text, tx, ty, anchor = 'start', active, onActivate }) {
  const node = platform.heroNodes.observe
  return (
    <g tabIndex={0} aria-label={`${node.label}: ${node.role}`} onMouseEnter={() => onActivate('observe')} onFocus={() => onActivate('observe')} className="cursor-default outline-none">
      <path d={d} stroke={EM} strokeOpacity={active === 'observe' ? 0.9 : 0.5} strokeDasharray="2 4" />
      {ticks.map((t) => (
        <path key={t} d={t} stroke={EM} strokeOpacity="0.4" strokeDasharray="2 4" />
      ))}
      <text x={tx} y={ty} textAnchor={anchor} fontFamily={MONO} fontSize="10" fill={EM}>
        {text}
      </text>
    </g>
  )
}

function Horizontal({ active, onActivate }) {
  const [market, ads] = platform.sourceGroups
  return (
    <svg viewBox="0 0 760 214" className="w-full" role="img" aria-label={ARIA}>
      {[56, 67, 78].map((y, i) => (
        <Edge key={`m${y}`} d={`M140 ${y} C180 ${y} 180 110 220 110`} color={CY} delay={i * 0.5} />
      ))}
      {[142, 153, 164].map((y, i) => (
        <Edge key={`a${y}`} d={`M140 ${y} C180 ${y} 180 110 220 110`} color={VI} delay={0.25 + i * 0.5} />
      ))}
      <Edge d="M350 110 H390" color={CY} packets={2} />
      <Edge d="M550 110 H590" color={EM} packets={2} delay={0.8} />

      <Box id="marketplaces" roleKey="sources" x={0} y={44} w={140} h={46} label={market.label} active={active} onActivate={onActivate} />
      <Box id="ads" roleKey="sources" x={0} y={130} w={140} h={46} label={ads.label} active={active} onActivate={onActivate} />
      <Box id="lake" x={220} y={92} w={130} label={platform.heroNodes.lake.label} active={active} onActivate={onActivate} />
      <Box id="warehouse" x={390} y={92} w={160} label={platform.heroNodes.warehouse.label} active={active} highlight onActivate={onActivate} />
      <Box id="analytics" x={590} y={92} w={170} label={platform.heroNodes.analytics.label} active={active} onActivate={onActivate} />

      <Monitor d="M220 176 H760" ticks={['M285 128 V176', 'M470 128 V176', 'M675 128 V176']} text="● MONITORING · automated checks · alerts" tx={220} ty={198} active={active} onActivate={onActivate} />
    </svg>
  )
}

function Vertical({ active, onActivate }) {
  const [market, ads] = platform.sourceGroups
  return (
    <svg viewBox="0 0 340 330" className="w-full" role="img" aria-label={ARIA}>
      <Edge d="M85 48 C85 80 170 70 170 104" color={CY} />
      <Edge d="M255 48 C255 80 170 70 170 104" color={VI} delay={0.4} />
      <Edge d="M170 138 V164" color={CY} />
      <Edge d="M170 198 V224" color={EM} delay={0.6} />

      <Box id="marketplaces" roleKey="sources" x={10} y={12} w={150} label={market.label} active={active} onActivate={onActivate} />
      <Box id="ads" roleKey="sources" x={180} y={12} w={150} label={ads.label} active={active} onActivate={onActivate} />
      <Box id="lake" x={100} y={104} w={140} h={34} label={platform.heroNodes.lake.label} active={active} onActivate={onActivate} />
      <Box id="warehouse" x={100} y={164} w={140} h={34} label={platform.heroNodes.warehouse.label} active={active} highlight onActivate={onActivate} />
      <Box id="analytics" x={100} y={224} w={140} h={34} label={platform.heroNodes.analytics.label} active={active} onActivate={onActivate} />

      <Monitor d="M300 121 V241" ticks={['M240 121 H300', 'M240 181 H300', 'M240 241 H300']} text="● MONITORING · automated checks" tx={170} ty={300} anchor="middle" active={active} onActivate={onActivate} />
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

Append to `src/styles/index.css` (before the reduced-motion media query), and add `.packet` to the reduced-motion selector list with `display: none !important;` as a separate rule inside that media query:

```css
.packet {
  opacity: 0.9;
}
```
Inside `@media (prefers-reduced-motion: reduce) { … }` add:
```css
  .packet {
    display: none !important;
  }
```

- [ ] **Step 7: `src/components/viz/ArchitectureDiagram.jsx`** — make it work for any node count: replace the constants `W`/`GAP` usage so that `GAP = 60` and `W = (1000 - GAP * (nodes.length - 1)) / nodes.length` (compute inside the component after `const nodes = …`). Everything else unchanged.

- [ ] **Step 8: Create `src/components/ui/PipelinePulse.jsx`** (replaces the home terminal; generic, illustrative)

```jsx
import Chip from './Chip'

export default function PipelinePulse({ stages, title = 'pipeline · live status (illustrative)' }) {
  return (
    <div className="border border-line bg-[#05060a]">
      <div className="flex items-center justify-between gap-3 border-b border-line px-3 py-2">
        <span className="label-code">{title}</span>
        <Chip tone="em" dot>
          healthy
        </Chip>
      </div>
      <ul className="divide-y divide-line">
        {stages.map((s, i) => (
          <li key={s.label} className="grid grid-cols-[84px_1fr_auto] items-center gap-4 px-4 py-4">
            <div>
              <p className="font-mono text-[12px] text-tx">{s.label}</p>
              <p className="font-mono text-[10px] text-dim">{s.note}</p>
            </div>
            <div className="h-1.5 overflow-hidden bg-line">
              <div className="pulse-bar h-full bg-gradient-to-r from-cy/40 via-cy to-em" style={{ animationDelay: `${i * 0.7}s` }} />
            </div>
            <span className="font-mono text-[10.5px] text-em">OK</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

Append to `src/styles/index.css` (before the reduced-motion query):

```css
@keyframes pulse-bar {
  0% {
    transform: translateX(-100%);
  }
  60%,
  100% {
    transform: translateX(0);
  }
}

.pulse-bar {
  transform: translateX(-100%);
  animation: pulse-bar 2.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}
```
and inside the reduced-motion query add `.pulse-bar { animation: none !important; transform: none !important; }`.

- [ ] **Step 9: `src/pages/Home.jsx`**
  - Remove the `Terminal` import; import `PipelinePulse`.
  - In `Hero`, change the ghost button to `<Button href="#platform" variant="ghost">&gt; See the pipeline</Button>`.
  - In `Platform`, replace the `<div id="platform-terminal">…</div>` block with `<PipelinePulse stages={platform.pulse} />`.
  - In `Platform`, the label line becomes `{platform.company} · {platform.role} · {platform.period}` (unchanged code, new content).

- [ ] **Step 10: `src/pages/CaseStudyPlatform.jsx`** — keep the current structure but:
  - Section 01 title: `"Many sources, no single view"`.
  - Section 03: label `PRINCIPLES`, title `"How it's built"`, map `platform.principles` (same card markup as decisions; panel title `principle · 0N`).
  - Section 05: label `TEXT ENRICHMENT`, title `"From messy text to signals"`.
  - Section 06 unchanged (lessons).
  - Remove any reference to `platform.decisions`.

- [ ] **Step 11: Verify**

Run: `npm run check && npm run build`
Expected: `check-content: ok`, build succeeds. Also `grep -rniE "shopee|lazada|tiktok|amazon|meta ads|google ads|~140|3\.4k|terminal" src/content src/pages/Home.jsx src/pages/CaseStudyPlatform.jsx` → no matches (Terminal stays only in `src/pages/NotFound.jsx` and `src/components/ui/Terminal.jsx`).

- [ ] **Step 12: Commit**

```bash
git add -A src scripts index.html
git commit -q -m "feat(content): generalize BA3 platform, pipeline pulse, stricter lint

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 2: Motion — hero network, headline, packets, marquee, lift  *(implementer: codex)*

**Files:** create `src/components/viz/HeroNetwork.jsx`; modify `src/pages/Home.jsx`, `src/components/layout/StatusStrip.jsx`, `src/styles/index.css`, and add the `lift` class to cards in `src/pages/Home.jsx`, `src/pages/CaseStudyPlatform.jsx`, `src/pages/CaseStudyLunchOrder.jsx`, `src/components/viz/StatusBoard.jsx`, `src/components/ui/KpiStrip.jsx`.

- [ ] **Step 1: Create `src/components/viz/HeroNetwork.jsx`** — port of the Stitch reference at half speed.

```jsx
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Every motion rate is half of the Stitch reference animation.
const SPEED = 0.5

export default function HeroNetwork() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return undefined

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const small = window.innerWidth < 768
    let width = mount.clientWidth || window.innerWidth
    let height = mount.clientHeight || 600

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    } catch {
      return undefined
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
    renderer.setSize(width, height)
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
    camera.position.set(0, 0, 85)

    const group = new THREE.Group()
    scene.add(group)

    const nodeCount = small ? 30 : 55
    const sphereGeo = new THREE.SphereGeometry(0.85, 16, 16)
    const coreGeo = new THREE.IcosahedronGeometry(1.4, 1)
    const cyanMat = new THREE.MeshPhongMaterial({ color: 0x00f0ff, emissive: 0x004455, wireframe: true })
    const violetMat = new THREE.MeshPhongMaterial({ color: 0x6366f1, emissive: 0x221144, wireframe: true })
    const greenMat = new THREE.MeshPhongMaterial({ color: 0x10b981, emissive: 0x053322 })

    const positions = []
    const nodes = []
    for (let i = 0; i < nodeCount; i++) {
      const t = (i / nodeCount) * Math.PI * 4
      const pos = new THREE.Vector3(
        (i - nodeCount / 2) * 2.2 + (Math.random() - 0.5) * 8,
        Math.sin(t) * 12 + (Math.random() - 0.5) * 10,
        Math.cos(t) * 14 + (Math.random() - 0.5) * 14,
      )
      positions.push(pos)
      const geo = i % 6 === 0 ? coreGeo : sphereGeo
      const mat = i % 6 === 0 ? (i % 2 === 0 ? cyanMat : violetMat) : i % 3 === 0 ? greenMat : i % 2 === 0 ? cyanMat : violetMat
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.copy(pos)
      group.add(mesh)
      nodes.push({ mesh, origin: pos.clone(), speed: 0.002 + Math.random() * 0.005, phase: Math.random() * Math.PI * 2 })
    }

    const lineCoords = []
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (positions[i].distanceTo(positions[j]) < 18) {
          lineCoords.push(positions[i].x, positions[i].y, positions[i].z, positions[j].x, positions[j].y, positions[j].z)
        }
      }
    }
    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(lineCoords, 3))
    const lineMat = new THREE.LineBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.25 })
    group.add(new THREE.LineSegments(lineGeo, lineMat))

    const packetCount = small ? 200 : 400
    const packetPositions = new Float32Array(packetCount * 3)
    const packetSpeeds = []
    for (let i = 0; i < packetCount; i++) {
      packetPositions[i * 3] = (Math.random() - 0.5) * 120
      packetPositions[i * 3 + 1] = (Math.random() - 0.5) * 60
      packetPositions[i * 3 + 2] = (Math.random() - 0.5) * 50
      packetSpeeds.push(0.15 + Math.random() * 0.35)
    }
    const packetGeo = new THREE.BufferGeometry()
    packetGeo.setAttribute('position', new THREE.BufferAttribute(packetPositions, 3))
    const packetMat = new THREE.PointsMaterial({ color: 0x00f0ff, size: 0.85, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending })
    scene.add(new THREE.Points(packetGeo, packetMat))

    scene.add(new THREE.AmbientLight(0xffffff, 0.8))
    const light1 = new THREE.PointLight(0x00f0ff, 2.5, 120)
    light1.position.set(30, 20, 40)
    scene.add(light1)
    const light2 = new THREE.PointLight(0x6366f1, 2.5, 120)
    light2.position.set(-30, -20, 40)
    scene.add(light2)

    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0
    const onPointer = (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.03
      mouseY = (e.clientY - window.innerHeight / 2) * 0.03
    }
    window.addEventListener('pointermove', onPointer, { passive: true })

    let clock = 0
    function step() {
      clock += 0.015 * SPEED
      targetX += (mouseX - targetX) * 0.05
      targetY += (mouseY - targetY) * 0.05
      group.rotation.y = clock * 0.08 + targetX * 0.02
      group.rotation.x = Math.sin(clock * 0.05) * 0.15 + targetY * 0.02
      for (const n of nodes) {
        n.mesh.rotation.x += n.speed * SPEED
        n.mesh.rotation.y += n.speed * 1.5 * SPEED
        n.mesh.position.y = n.origin.y + Math.sin(clock * 2 + n.phase) * 1.2
      }
      const arr = packetGeo.attributes.position.array
      for (let i = 0; i < packetCount; i++) {
        arr[i * 3] += packetSpeeds[i] * SPEED
        if (arr[i * 3] > 60) arr[i * 3] = -60
      }
      packetGeo.attributes.position.needsUpdate = true
      renderer.render(scene, camera)
    }

    let frame = 0
    let running = false
    const loop = () => {
      if (!running) return
      step()
      frame = requestAnimationFrame(loop)
    }
    const start = () => {
      if (reduce || running) return
      running = true
      frame = requestAnimationFrame(loop)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(frame)
    }

    step()
    let onScreen = true
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      if (onScreen && !document.hidden) start()
      else stop()
    })
    io.observe(mount)
    const onVisibility = () => (document.hidden || !onScreen ? stop() : start())
    document.addEventListener('visibilitychange', onVisibility)

    const ro = new ResizeObserver(() => {
      width = mount.clientWidth
      height = mount.clientHeight
      if (!width || !height) return
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
      if (!running) renderer.render(scene, camera)
    })
    ro.observe(mount)

    return () => {
      stop()
      io.disconnect()
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pointermove', onPointer)
      ;[sphereGeo, coreGeo, lineGeo, packetGeo].forEach((g) => g.dispose())
      ;[cyanMat, violetMat, greenMat, lineMat, packetMat].forEach((m) => m.dispose())
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_right,transparent_0%,black_45%,black_100%)] md:opacity-75"
    />
  )
}
```

- [ ] **Step 2: Use it in the home hero** (`src/pages/Home.jsx`)
  - `import { lazy, Suspense } from 'react'` and `const HeroNetwork = lazy(() => import('../components/viz/HeroNetwork'))`.
  - Inside the hero `<section>`, right after the existing radial-gradient overlay div, add `<Suspense fallback={null}><HeroNetwork /></Suspense>`.
  - Wrap the headline words: replace the `<h1>` content with a `HeadlineWords` component defined in the same file:

```jsx
import { motion, useReducedMotion } from 'framer-motion'

function HeadlineWords({ text, className }) {
  const reduce = useReducedMotion()
  const words = text.split(' ')
  if (reduce) return <h1 className={className}>{text}</h1>
  return (
    <h1 className={className} aria-label={text}>
      {words.map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          aria-hidden="true"
          className="mr-[0.25em] inline-block"
          initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.6, delay: 0.08 * i, ease: [0.2, 0.7, 0.2, 1] }}
        >
          {w}
        </motion.span>
      ))}
    </h1>
  )
}
```
  Use `<HeadlineWords text={profile.headline} className="heading-display max-w-4xl text-[38px] sm:text-[48px] lg:text-[60px]" />`. Remove the `Reveal` wrapper around the h1 only (keep it around the sub paragraph).

- [ ] **Step 3: Marquee status strip** — replace `src/components/layout/StatusStrip.jsx`:

```jsx
import { statusStrip } from '../../content/profile'

function Items({ hidden = false }) {
  return (
    <div className="flex shrink-0 items-center gap-8 pr-8" aria-hidden={hidden || undefined}>
      {statusStrip.map((item) => (
        <span key={item.label} className="whitespace-nowrap">
          <span aria-hidden="true" className="pulse-dot mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-em align-middle shadow-glow-em" />
          {item.label} <b className="font-medium text-tx">{item.value}</b>
        </span>
      ))}
    </div>
  )
}

export default function StatusStrip() {
  return (
    <div className="group overflow-hidden border-b border-line">
      <div className="marquee flex h-9 w-max items-center font-mono text-[10.5px] text-mu group-hover:[animation-play-state:paused]">
        <Items />
        <Items hidden />
      </div>
    </div>
  )
}
```

Append to `src/styles/index.css` (before the reduced-motion query):

```css
@keyframes marquee {
  to {
    transform: translateX(-50%);
  }
}

.marquee {
  animation: marquee 48s linear infinite;
}

.lift {
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.lift:hover {
  transform: translateY(-2px);
  border-color: rgba(0, 240, 255, 0.45);
  box-shadow: 0 0 18px rgba(0, 240, 255, 0.12);
}
```
Inside the reduced-motion query add `.marquee { animation: none !important; }` and `.lift:hover { transform: none; }`.

- [ ] **Step 4: Add `lift`** to: each `<li>` of the home step strip; the Lunch-Order facts cells on home; each `<article>` in Research/Education on home; each KPI cell in `KpiStrip.jsx`; each category card in `StatusBoard.jsx`; each principle `Panel` and problem `<li>` in `CaseStudyPlatform.jsx`; each milestone `<li>` in `CaseStudyLunchOrder.jsx`. For grid cells that sit inside a `gap-px bg-line` grid, `lift` is fine (they are `bg-s1` blocks); add `relative hover:z-10` alongside so the glow is not clipped by neighbours.

- [ ] **Step 5: Verify**

Run: `npm run check && npm run build`
Expected: both pass; build output shows a separate chunk for `HeroNetwork` (three is lazy-loaded), e.g. `dist/assets/HeroNetwork-*.js`.

- [ ] **Step 6: Commit**

```bash
git add -A src
git commit -q -m "feat(motion): hero network at half speed, headline stagger, packets, marquee, hover lift

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 3: Wayfinding — nav active state, progress, breadcrumb, case sidebar, route transitions  *(implementer: codex)*

**Files:** create `src/lib/useScrollSpy.js`, `src/components/case/CaseToc.jsx`, `src/components/case/CaseBody.jsx`, `src/components/layout/RouteTransition.jsx`; modify `src/components/layout/Nav.jsx`, `src/components/case/CaseHeader.jsx`, `src/components/case/CaseSection.jsx`, `src/pages/CaseStudyPlatform.jsx`, `src/pages/CaseStudyLunchOrder.jsx`, `src/App.jsx`, `src/styles/index.css`.

- [ ] **Step 1: `src/lib/useScrollSpy.js`**

```js
import { useEffect, useState } from 'react'

// Returns the id of the last section whose top has passed `offset` px from the viewport top.
export default function useScrollSpy(ids, offset = 140) {
  const [active, setActive] = useState(null)
  const key = ids.join('|')

  useEffect(() => {
    if (!ids.length) return undefined
    let raf = 0
    const update = () => {
      raf = 0
      let current = null
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top - offset <= 0) current = id
      }
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      if (atBottom) current = ids[ids.length - 1]
      setActive(current)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, offset])

  return active
}
```

- [ ] **Step 2: Nav active state + scroll progress** — in `src/components/layout/Nav.jsx`:
  - `import { useLocation } from 'react-router-dom'`, `import { motion, useScroll, useSpring } from 'framer-motion'`, `import useScrollSpy from '../../lib/useScrollSpy'`.
  - Compute:
```js
const ROUTE_SECTION = { '/work/ba3-data-platform': 'platform', '/work/lunch-order': 'builds' }
// inside component:
const { pathname } = useLocation()
const spied = useScrollSpy(pathname === '/' ? navLinks.map((l) => l.id) : [])
const activeId = pathname === '/' ? spied : ROUTE_SECTION[pathname] ?? null
const { scrollYProgress } = useScroll()
const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })
```
  - Desktop links: give each `Link` `className="relative py-1 font-mono text-[11px] font-medium transition-colors " + (active ? 'text-cy' : 'text-mu hover:text-cy')`, `aria-current={active ? 'location' : undefined}`, and when active render inside it:
```jsx
<motion.span layoutId="nav-active" className="absolute inset-x-0 -bottom-[17px] h-[2px] bg-cy shadow-glow" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />
```
  - Mobile menu links: active one gets `text-cy` and a leading `▸ `.
  - As the last child of `<nav>` (after the mobile menu), add the progress bar:
```jsx
<motion.div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-cy via-vi to-em" style={{ scaleX: progress }} />
```
  (the `<nav>` already has `sticky`; add `relative`-equivalent positioning is provided by `sticky`, so the absolute bar anchors to it.)

- [ ] **Step 3: Breadcrumb** — `src/components/case/CaseHeader.jsx` accepts a new `slug` prop and renders, above the kicker line:

```jsx
<nav aria-label="Breadcrumb" className="mb-5 font-mono text-[12px] text-mu">
  <Link to="/" className="hover:text-cy">~</Link>
  <span className="mx-2 text-dim">/</span>
  <Link to="/#builds" className="hover:text-cy">work</Link>
  <span className="mx-2 text-dim">/</span>
  <span className="text-cy" aria-current="page">{slug}</span>
</nav>
```
(import `Link` from `react-router-dom`). Pass `slug={platform.slug}` / `slug={lunchOrder.slug}` from the pages.

- [ ] **Step 4: `CaseSection` without its own container** — replace `src/components/case/CaseSection.jsx`:

```jsx
import Reveal from '../ui/Reveal'
import SectionHeader from '../ui/SectionHeader'

export default function CaseSection({ id, index, label, title, intro, children }) {
  return (
    <section id={id} className="scroll-mt-28 border-b border-line py-14 last:border-b-0 md:py-20">
      <SectionHeader index={index} label={label} title={title}>
        {intro}
      </SectionHeader>
      <Reveal>{children}</Reveal>
    </section>
  )
}
```

- [ ] **Step 5: `src/components/case/CaseToc.jsx`** — sidebar (lg+) and sticky chip bar (<lg)

```jsx
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import useScrollSpy from '../../lib/useScrollSpy'

function go(e, id) {
  e.preventDefault()
  const el = document.getElementById(id)
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  history.replaceState(null, '', `#${id}`)
}

export default function CaseToc({ sections }) {
  const active = useScrollSpy(sections.map((s) => s.id))
  const activeIndex = Math.max(0, sections.findIndex((s) => s.id === active))
  const chipBar = useRef(null)

  useEffect(() => {
    const chip = chipBar.current?.querySelector('[data-active="true"]')
    chip?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
  }, [active])

  return (
    <>
      <aside className="hidden lg:block" aria-label="On this page">
        <div className="sticky top-28 py-14">
          <p className="label-code mb-4">on this page</p>
          <ol className="relative border-l border-line">
            <span
              aria-hidden="true"
              className="absolute -left-px top-0 w-px bg-cy shadow-glow transition-all duration-300"
              style={{ height: `${((activeIndex + 1) / sections.length) * 100}%` }}
            />
            {sections.map((s, i) => {
              const on = s.id === active
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={(e) => go(e, s.id)}
                    aria-current={on ? 'location' : undefined}
                    className={`block py-2 pl-4 font-mono text-[11px] uppercase tracking-[0.06em] transition-colors ${on ? 'text-cy' : 'text-mu hover:text-tx'}`}
                  >
                    <span className={on ? 'text-cy' : 'text-dim'}>{String(i + 1).padStart(2, '0')}</span> {s.label}
                  </a>
                </li>
              )
            })}
          </ol>
          <Link to="/" className="mt-8 inline-block font-mono text-[11px] text-mu hover:text-cy">
            ← back home
          </Link>
        </div>
      </aside>

      <div ref={chipBar} className="sticky top-14 z-30 -mx-4 overflow-x-auto border-b border-line bg-canvas/90 px-4 py-2 backdrop-blur-md md:-mx-8 md:px-8 lg:hidden">
        <ol className="flex w-max gap-2">
          {sections.map((s, i) => {
            const on = s.id === active
            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  data-active={on}
                  onClick={(e) => go(e, s.id)}
                  className={`block whitespace-nowrap border px-2.5 py-1 font-mono text-[10.5px] uppercase ${on ? 'border-cy bg-cy/10 text-cy' : 'border-line text-mu'}`}
                >
                  {String(i + 1).padStart(2, '0')} {s.label}
                </a>
              </li>
            )
          })}
        </ol>
      </div>
    </>
  )
}
```

- [ ] **Step 6: `src/components/case/CaseBody.jsx`**

```jsx
import CaseToc from './CaseToc'

export default function CaseBody({ sections, children }) {
  return (
    <div className="container-site lg:grid lg:grid-cols-[190px_minmax(0,1fr)] lg:gap-14">
      <CaseToc sections={sections} />
      <div className="min-w-0">{children}</div>
    </div>
  )
}
```

- [ ] **Step 7: Use it in both case pages.** In each page define a `SECTIONS` array (ids + short labels) and wrap all `CaseSection`s (not the header, not `CaseNav`) in `<CaseBody sections={SECTIONS}>`. Pass `id` to each `CaseSection`.

`CaseStudyPlatform.jsx`:
```js
const SECTIONS = [
  { id: 'problem', label: 'Problem' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'principles', label: 'Principles' },
  { id: 'monitoring', label: 'Monitoring' },
  { id: 'enrichment', label: 'Text enrichment' },
  { id: 'lessons', label: 'Lessons' },
]
```
`CaseStudyLunchOrder.jsx`:
```js
const SECTIONS = [
  { id: 'problem', label: 'Problem' },
  { id: 'data-model', label: 'Data model' },
  { id: 'logic', label: 'Logic in DB' },
  { id: 'testing', label: 'Testing' },
  { id: 'releases', label: 'Releases' },
  { id: 'stack', label: 'Stack & cost' },
]
```
`CaseNav` stays after `CaseBody`, unchanged.

- [ ] **Step 8: Route transitions** — create `src/components/layout/RouteTransition.jsx`:

```jsx
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useLocation } from 'react-router-dom'

export function RouteSweep() {
  const { pathname } = useLocation()
  const reduce = useReducedMotion()
  if (reduce) return null
  return (
    <motion.div
      key={pathname}
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-cy via-vi to-em"
      initial={{ scaleX: 0, opacity: 1 }}
      animate={{ scaleX: 1, opacity: 0 }}
      transition={{ scaleX: { duration: 0.55, ease: 'easeOut' }, opacity: { duration: 0.3, delay: 0.5 } }}
    />
  )
}

export default function RouteTransition({ children }) {
  const location = useLocation()
  const reduce = useReducedMotion()
  if (reduce) return children
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }}
      >
        {children(location)}
      </motion.div>
    </AnimatePresence>
  )
}
```

Note `RouteTransition` takes a render-function child so `Routes` receives the frozen `location` during exit. Update `src/App.jsx`:

```jsx
import { Route, Routes } from 'react-router-dom'
import PageShell from './components/layout/PageShell'
import ScrollManager from './components/layout/ScrollManager'
import RouteTransition, { RouteSweep } from './components/layout/RouteTransition'
import Home from './pages/Home'
import CaseStudyPlatform from './pages/CaseStudyPlatform'
import CaseStudyLunchOrder from './pages/CaseStudyLunchOrder'
import NotFound from './pages/NotFound'

function AppRoutes(location) {
  return (
    <Routes location={location}>
      <Route path="/" element={<Home />} />
      <Route path="/work/ba3-data-platform" element={<CaseStudyPlatform />} />
      <Route path="/work/lunch-order" element={<CaseStudyLunchOrder />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default function App() {
  return (
    <PageShell>
      <RouteSweep />
      <ScrollManager />
      <RouteTransition>{AppRoutes}</RouteTransition>
    </PageShell>
  )
}
```

and make the reduced-motion branch of `RouteTransition` call the function too: `if (reduce) return children(location)`.

- [ ] **Step 9: ScrollManager timing** — in `src/components/layout/ScrollManager.jsx`, increase the hash-scroll timeout from `50` to `350` ms (the incoming page mounts after the 280 ms exit animation).

- [ ] **Step 10: Verify**

Run: `npm run check && npm run build` → both pass.

- [ ] **Step 11: Commit**

```bash
git add -A src
git commit -q -m "feat(nav): active section, scroll progress, breadcrumb, case sidebar, route transitions

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 4: Verification & OG re-render  *(auditor: Claude Sonnet)*

- [ ] **Step 1:** `npm run check && npm run build`.
- [ ] **Step 2:** Re-render `public/og.png` from `scripts/og.html` (same headless Chrome command as the 2026-11-19 plan, Task 11 Step 4); view it; commit.
- [ ] **Step 3:** Extend `.superpowers/verify.mjs` (git-ignored; `npm i --no-save playwright-core` if missing; Chrome at `C:/Program Files/Google/Chrome/Application/chrome.exe`) with:
  - all previous checks (scrollWidth == viewport, fonts with `'600 16px "Space Grotesk"'`, titles);
  - home desktop: a `<canvas>` exists inside the hero section; after scrolling `#stack` into view, the nav link `// 03 STACK` has `aria-current="location"`;
  - `/work/ba3-data-platform` desktop: nav link `// 01 PLATFORM` has `aria-current="location"`; an `aside[aria-label="On this page"]` is visible; after scrolling `#monitoring` into view, its TOC link has `aria-current="location"`; breadcrumb `nav[aria-label="Breadcrumb"]` exists;
  - `/work/lunch-order` at 390px: the chip bar is visible, the sidebar is hidden;
  - page text of `/` and `/work/ba3-data-platform` contains none of: Shopee, Lazada, TikTok, Amazon, Meta Ads, Google Ads, ~140, 3.4k, SSM, SES;
  - reduced-motion context: no `<canvas>` animation loop errors, `.packet` elements not displayed;
  - console errors on every page → fail.
- [ ] **Step 4:** Screenshot all routes desktop + 390 (reduced motion for stable shots) plus one normal-motion home desktop shot; review them.
- [ ] **Step 5:** Fix defects (or send them back to the implementer), commit, report.
