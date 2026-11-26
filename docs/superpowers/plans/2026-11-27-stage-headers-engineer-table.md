# Pipeline-Stage Headers, Scroll Spine & Engineer Table Implementation Plan

> Implementers run via `codex exec` (cannot write `.git`; the controller commits). Auditor: Claude Sonnet.

**Goal:** Bring the GitHub-README look to the site: (1) every section title becomes a "pipeline stage" header (node with pulse ring, outlined number, title, `STAGE · X` label + subtitle, a rule that grows in with a travelling packet); (2) on the home page a continuous vertical **pipeline spine** links the section nodes, with a glowing packet and a progress fill that follow the scroll; (3) on `/about`, the four fact cells are replaced by a `TABLE public.engineer` component.

**Branch:** `feat/stage-headers` (checked out). Repo `D:\career\MyApp\profile`, Git Bash on Windows. No `npm install`.

**Commit trailer:** blank line + `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

**Constraints:** keep the confidentiality lint passing (`npm run check`); keep the "gentle under reduced motion" policy (ambient loops slower, never off; large reveal motions off under reduced motion); no horizontal overflow at 390 px.

---

### Task 1: Stage header + home spine  *(codex)*

**Files:** `src/components/ui/SectionHeader.jsx` (rewrite), `src/components/layout/PipelineSpine.jsx` (new), `src/styles/index.css`, `src/pages/Home.jsx`.

- [ ] **Step 1: CSS** — append to `src/styles/index.css` (outside `@layer`, before the reduced-motion media query):

```css
.stage-ring {
  animation: stage-ring 2.4s ease-out infinite;
}

@keyframes stage-ring {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  100% {
    transform: scale(2.2);
    opacity: 0;
  }
}

.stage-packet {
  animation: stage-packet 3.2s cubic-bezier(0.45, 0, 0.55, 1) 1.1s infinite;
}

@keyframes stage-packet {
  0% {
    left: 0%;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    left: 100%;
    opacity: 0;
  }
}
```
Inside the reduced-motion block add `.stage-ring { animation-duration: 4.8s; }` and `.stage-packet { animation-duration: 6.4s; }`.

- [ ] **Step 2: Rewrite `src/components/ui/SectionHeader.jsx`** (same props as before plus `stage`, `sub`, `tone`, `node`; existing callers keep working):

```jsx
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

const TONES = {
  cy: { text: 'text-cy', border: 'border-cy', bg: 'bg-cy', stroke: '#00F0FF', rule: 'from-cy' },
  vi: { text: 'text-vi', border: 'border-vi', bg: 'bg-vi', stroke: '#6366F1', rule: 'from-vi' },
  em: { text: 'text-em', border: 'border-em', bg: 'bg-em', stroke: '#10B981', rule: 'from-em' },
}

// Pipeline-stage section header: node · outlined number · title · stage label, with a rule that grows in.
export default function SectionHeader({ index, label, title, stage, sub, tone = 'cy', node = true, children, className = '' }) {
  const t = TONES[tone] ?? TONES.cy
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '-35% 0px -55% 0px' })
  const seen = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()

  return (
    <header ref={ref} className={`relative mb-8 ${className}`}>
      <div className="flex items-center gap-3 sm:gap-4">
        {node && (
          <span data-stage-node className="relative grid h-[22px] w-[22px] shrink-0 place-items-center" aria-hidden="true">
            <span className={`stage-ring absolute inset-0 rounded-full border ${t.border}`} />
            <span className={`relative grid h-[22px] w-[22px] place-items-center rounded-full border-2 bg-canvas transition-shadow duration-500 ${t.border} ${inView ? 'shadow-glow' : ''}`}>
              <span className={`h-2 w-2 rounded-full transition-transform duration-500 ${t.bg} ${inView ? 'scale-125' : 'scale-100'}`} />
            </span>
          </span>
        )}
        {index && (
          <span
            className="font-mono text-[30px] font-bold leading-none text-transparent md:text-[40px]"
            style={{ WebkitTextStroke: `1.2px ${t.stroke}` }}
            aria-hidden="true"
          >
            {index}
          </span>
        )}
        <div className="min-w-0">
          <p className={`font-mono text-[10.5px] font-medium uppercase tracking-[0.12em] ${t.text}`}>{label}</p>
          {title && <h2 className="heading-section mt-1 text-[26px] md:text-[34px]">{title}</h2>}
        </div>
        {(stage || sub) && (
          <div className="ml-auto hidden shrink-0 text-right md:block">
            {stage && <p className={`font-mono text-[10.5px] tracking-[0.16em] ${t.text}`}>STAGE · {stage}</p>}
            {sub && <p className="mt-1 max-w-[280px] font-mono text-[11.5px] text-mu">{sub}</p>}
          </div>
        )}
      </div>

      <div className={`relative mt-4 h-[2px] ${node ? 'ml-[34px] sm:ml-[38px]' : ''}`}>
        <motion.div
          className={`absolute inset-0 origin-left bg-gradient-to-r ${t.rule} to-transparent`}
          initial={reduce ? false : { scaleX: 0 }}
          animate={seen || reduce ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1] }}
        />
        <span className={`stage-packet absolute top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${t.bg} shadow-glow`} />
      </div>

      {children && <div className="mt-4 max-w-2xl text-mu">{children}</div>}
    </header>
  )
}
```

- [ ] **Step 3: Create `src/components/layout/PipelineSpine.jsx`** — a vertical line in the container gutter, aligned with the 22-px stage nodes (node centre = container padding + 11 px), only on `lg` and up:

```jsx
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'

// Continuous pipeline line behind the home sections; a packet and a fill follow the scroll.
export default function PipelineSpine({ children }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 60%', 'end 60%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 })
  const top = useTransform(progress, (v) => `${v * 100}%`)

  return (
    <div ref={ref} className="relative">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
        <div className="container-site relative h-full">
          <div className="absolute bottom-16 left-[calc(2rem+10.5px)] top-16 w-px xl:left-[calc(2.5rem+10.5px)]">
            <div className="absolute inset-0 bg-line" />
            <motion.div className="absolute inset-x-0 top-0 origin-top bg-gradient-to-b from-cy via-vi to-em" style={{ scaleY: progress, height: '100%' }} />
            <motion.span
              className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cy shadow-glow"
              style={{ top }}
            />
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}
```

- [ ] **Step 4: `src/pages/Home.jsx`**
  - Import `PipelineSpine` and wrap `<Platform /> <Builds /> <Stack /> <Research /> <Contact />` (everything after `<Hero />`) in `<PipelineSpine>…</PipelineSpine>`.
  - In every section's top-level content (the element right inside `container-site`, or the `container-site` element itself when it is a grid), add `lg:pl-[56px]` so content clears the spine, and give each `SectionHeader` (except Education) `className="lg:-ml-[56px]"` (merge with any existing className, e.g. Builds keeps `mb-6`) so its node sits on the spine. For the two-column Research grid, apply `lg:pl-[56px]` to the grid; the Education header gets `node={false}` and no negative margin.
  - Stage props per section:

| Section | label | stage | sub | tone |
|---|---|---|---|---|
| 01 platform | FEATURED PLATFORM | BUILD | the platform I design, ship and operate | cy |
| 02 builds | SIDE BUILD | SHIP | a side project people use every day | cy |
| 03 stack | STACK, BY PIPELINE LAYER | LAYERS | tools, grouped by where they sit in a pipeline | vi |
| 04 research | RESEARCH | ENRICH | peer-reviewed work on recommendation & NLP | vi |
| (education) | EDUCATION | LEARN | — | vi |
| 05 contact | CONTACT | SERVE | the last stage: you | em |

  Titles stay as they are.

- [ ] **Step 5: Verify** — `npm run check && npm run build` pass. Do NOT commit.

---

### Task 2: Stages on case/about pages + engineer table  *(codex)*

**Files:** `src/components/case/CaseSection.jsx`, `src/pages/CaseStudyPlatform.jsx`, `src/pages/CaseStudyLunchOrder.jsx`, `src/pages/About.jsx`, `src/content/about.js`, new `src/components/about/EngineerTable.jsx`, `src/styles/index.css`.

- [ ] **Step 1: `CaseSection`** — accept `stage`, `sub`, `tone` and pass them to `SectionHeader`.

- [ ] **Step 2: Stage props** on each `CaseSection`:

| Page · section | stage | tone |
|---|---|---|
| Platform · problem | INPUT | cy |
| Platform · architecture | DESIGN | cy |
| Platform · principles | RULES | vi |
| Platform · monitoring | OBSERVE | em |
| Platform · enrichment | ENRICH | vi |
| Platform · lessons | OUTPUT | em |
| Lunch · problem | INPUT | cy |
| Lunch · data-model | MODEL | cy |
| Lunch · logic | RULES | vi |
| Lunch · testing | VERIFY | vi |
| Lunch · releases | SHIP | em |
| Lunch · stack | COST | em |
| About · story | SOURCE | cy |
| About · timeline | HISTORY | vi |
| About · how-i-work | RULES | em |

(no `sub` on these pages — the sidebar already carries context).

- [ ] **Step 3: Data** — in `src/content/about.js` replace `facts` with:

```js
  engineer: {
    table: 'engineer',
    meta: '1 row · fetched in 0.42 ms',
    query: 'SELECT * FROM engineer WHERE curious = true;',
    rows: [
      { column: 'name', type: 'text', value: 'Nguyen Thien Thuat', pk: true, strong: true },
      { column: 'role', type: 'text', value: 'Data Engineer', accent: true, comment: 'owner of the data platform: design → build → operate' },
      { column: 'focus', type: 'text[]', list: ['pipelines', 'warehousing', 'monitoring'] },
      { column: 'studying', type: 'text', value: 'M.Sc. Artificial Intelligence · University of Science, VNU-HCM' },
      { column: 'research', type: 'text[]', list: ['recommender systems', 'NLP'] },
      { column: 'based_in', type: 'geography', value: 'Ho Chi Minh City, Vietnam', comment: '10.82° N, 106.63° E' },
      { column: 'motto', type: 'text', value: '‘Boring in production — because it was designed with care.’', muted: true },
      { column: 'status', type: 'enum', status: 'shipping' },
    ],
  },
```

- [ ] **Step 4: CSS** — append (before the reduced-motion query):

```css
.row-scan {
  animation: row-scan 5s cubic-bezier(0.45, 0, 0.55, 1) 1.4s infinite;
}

@keyframes row-scan {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(800%);
  }
}
```
Reduced-motion block: `.row-scan { animation-duration: 10s; }`.

- [ ] **Step 5: `src/components/about/EngineerTable.jsx`**

```jsx
import { motion, useReducedMotion } from 'framer-motion'

function Value({ row }) {
  if (row.list) {
    return (
      <span className="text-mu">
        {'{'}
        {row.list.map((item, i) => (
          <span key={item}>
            <span className="text-tx">{item}</span>
            {i < row.list.length - 1 ? ', ' : ''}
          </span>
        ))}
        {'}'}
      </span>
    )
  }
  if (row.status) {
    return (
      <span className="inline-flex items-center gap-1.5 border border-em/50 bg-em/10 px-2 py-0.5 text-[11.5px] text-em">
        <span aria-hidden="true" className="pulse-dot h-1.5 w-1.5 rounded-full bg-em" />
        {row.status}
      </span>
    )
  }
  return (
    <span className={row.accent ? 'text-cy' : row.muted ? 'text-mu' : 'text-tx'}>
      <span className={row.strong ? 'font-semibold' : ''}>{row.value}</span>
      {row.comment && <span className="ml-3 hidden text-dim sm:inline">-- {row.comment}</span>}
    </span>
  )
}

export default function EngineerTable({ data }) {
  const reduce = useReducedMotion()
  return (
    <div className="lift border border-line bg-s1/80 font-mono text-[13px] backdrop-blur-sm">
      <div className="flex items-center justify-between gap-3 border-b border-line border-l-4 border-l-cy px-4 py-3">
        <span className="text-dim">
          TABLE <span className="text-mu">public.</span>
          <span className="font-bold text-tx">{data.table}</span>
        </span>
        <span className="flex items-center gap-2 text-[11px] text-mu">
          <span aria-hidden="true" className="pulse-dot h-1.5 w-1.5 rounded-full bg-em shadow-glow-em" />
          <span className="hidden sm:inline">{data.meta}</span>
        </span>
      </div>
      <div className="grid grid-cols-[110px_minmax(0,1fr)] gap-x-4 border-b border-line bg-canvas/60 px-4 py-2 text-[10.5px] tracking-[0.14em] text-dim sm:grid-cols-[130px_110px_minmax(0,1fr)]">
        <span>COLUMN</span>
        <span className="hidden sm:block">TYPE</span>
        <span>VALUE</span>
      </div>
      <div className="relative overflow-hidden">
        <div aria-hidden="true" className="row-scan pointer-events-none absolute inset-x-0 top-0 h-[12.5%] bg-gradient-to-r from-transparent via-cy/10 to-transparent" />
        <dl>
          {data.rows.map((row, i) => (
            <motion.div
              key={row.column}
              className="grid grid-cols-[110px_minmax(0,1fr)] items-baseline gap-x-4 border-b border-line px-4 py-2.5 last:border-b-0 sm:grid-cols-[130px_110px_minmax(0,1fr)]"
              initial={reduce ? false : { opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.45, delay: reduce ? 0 : 0.08 * i, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <dt className="flex items-center gap-2 text-tx">
                {row.pk && <span className="border border-am/50 bg-am/10 px-1 text-[9.5px] text-am">PK</span>}
                {row.column}
              </dt>
              <dd className="hidden text-vi sm:block">{row.type}</dd>
              <dd className="min-w-0 break-words">
                <Value row={row} />
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
      <div className="border-t border-line px-4 py-2.5 text-[11.5px] text-dim">
        <span className="text-em">thuat=#</span> {data.query}
        <span aria-hidden="true" className="caret ml-1 inline-block h-[1em] w-[0.55em] translate-y-[2px] bg-cy" />
      </div>
    </div>
  )
}
```

- [ ] **Step 6: `src/pages/About.jsx`** — replace the facts `<dl>…</dl>` block with `<div className="mt-8"><EngineerTable data={about.engineer} /></div>` (import it). Change the header grid to `md:grid-cols-[minmax(0,1fr)_260px]` so the table gets more width. Remove any remaining `about.facts` reference.

- [ ] **Step 7: Verify** — `npm run check && npm run build` pass; `node -e "import('./src/content/about.js').then(()=>console.log('ok'))"` prints ok. Do NOT commit.

---

### Task 3: Verification  *(Sonnet)*

Against `npm run build` + `npm run preview -- --port 4173 --strictPort`, with playwright-core + Chrome (swiftshader args):
- Home 1440: spine visible (an element inside the PipelineSpine overlay with width 1px and height > 1000 px); each stage node's centre x is within ±2 px of the spine's x; scrolling from `#platform` to `#contact` moves the spine packet down (its `top` increases); the header of the section in the middle of the viewport has a node with the glow class (`shadow-glow`).
- Home 390: spine hidden; no horizontal overflow; stage label hidden below `md`.
- Every page (home, both case studies, about, 404): no console errors; `npm run check` clean; scrollWidth equals viewport at 1440 and 390.
- `/about`: `TABLE public.engineer` visible; 8 rows; PK chip; `shipping` status; TYPE column hidden at 390; the photo still visible.
- Screenshots (1440 viewport): home at `#stack` (spine + headers), `/about` header, `/work/ba3-data-platform` one section header; plus `/about` at 390. Review; fix defects (minimal), commit as `fix: stage header verification adjustments`; report.
