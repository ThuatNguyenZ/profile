# Blueprint + Aurora Background Implementation Plan

> Implementer: `codex exec` (cannot write `.git`; the controller commits). Auditor: Claude Sonnet.

**Goal:** The page below the hero reads as one flat colour, especially in light mode. Give the whole site depth, in both themes:
1. A fixed **blueprint backdrop** for every page: minor dot grid + faint major grid lines every 120 px + very fine film grain + soft edge vignette.
2. Per-section **aurora**: two blurred glows in the section's stage colour (cyan / violet / emerald), alternating sides, drifting slowly and with a small scroll parallax, plus corner **registration marks** and a mono section coordinate.
3. Home sections **alternate band tints** (canvas / s2) with a thin gradient hairline at the top of each tinted band.

**Branch:** `feat/light-mode` (continue; not pushed). Repo `D:\career\MyApp\profile`, Git Bash on Windows. No `npm install`. **Restart note:** the controller will restart the dev server; you only need `npm run build`.

**Constraints:** `npm run check` passes; both themes; "gentle under reduced motion" (ambient loops slower, never off; parallax off); no horizontal overflow at 390 px; the home pipeline spine must stay visible above section backgrounds; text contrast unchanged (backgrounds stay subtle).

---

### Task 1  *(codex)*

- [ ] **Step 1: Theme variables** — in `src/styles/index.css` add to the dark `:root` set:
  `--grid: 255 255 255; --grid-a: 0.035; --grain-a: 0.05; --aura-a: 0.16; --band: var(--c-s2); --band-a: 0.35;`
  and to BOTH light sets (`:root[data-theme='light']` and the `prefers-color-scheme: light` block):
  `--grid: 15 23 42; --grid-a: 0.05; --grain-a: 0.06; --aura-a: 0.14; --band: var(--c-s2); --band-a: 0.9;`
  Remove the dot-grid `background-image` / `background-size` from the `body` rule (the backdrop takes over).

- [ ] **Step 2: CSS** — append (outside `@layer`, before the reduced-motion block):

```css
.backdrop-grid {
  background-image:
    radial-gradient(rgb(var(--dot) / var(--dot-a)) 1px, transparent 1px),
    linear-gradient(to right, rgb(var(--grid) / var(--grid-a)) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(var(--grid) / var(--grid-a)) 1px, transparent 1px);
  background-size: 24px 24px, 120px 120px, 120px 120px;
}

.backdrop-grain {
  opacity: var(--grain-a);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.5 0 0 0 0 0.5 0 0 0 0 0.5 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  mix-blend-mode: overlay;
}

.aura {
  opacity: var(--aura-a);
  animation: aura-drift 28s ease-in-out infinite alternate;
}

.aura-b {
  animation-duration: 34s;
  animation-direction: alternate-reverse;
}

@keyframes aura-drift {
  to {
    transform: translate3d(6%, 4%, 0) scale(1.08);
  }
}
```
Reduced-motion block: `.aura { animation-duration: 60s; }`.

- [ ] **Step 3: `src/components/layout/PageBackdrop.jsx`** (new) and render it as the first child of `PageShell`'s fragment:

```jsx
// Fixed blueprint backdrop behind every page: dot grid, 120-px major grid, fine grain, edge vignette.
export default function PageBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <div className="backdrop-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_100%)]" />
      <div className="backdrop-grain absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgb(var(--c-canvas)/0.6)_100%)]" />
    </div>
  )
}
```

- [ ] **Step 4: `src/components/layout/SectionAura.jsx`** (new)

```jsx
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const TONE = { cy: 'cy', vi: 'vi', em: 'em' }

// Stage-coloured glows + registration marks behind one section. Place as the first child of a
// `relative isolate overflow-hidden` section.
export default function SectionAura({ tone = 'cy', side = 'left', mark }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -60])
  const c = TONE[tone] ?? 'cy'
  const main = side === 'left' ? '-left-[12%] top-[-10%]' : '-right-[12%] top-[-10%]'
  const second = side === 'left' ? 'right-[-8%] bottom-[-25%]' : 'left-[-8%] bottom-[-25%]'

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <motion.div style={{ y }} className="absolute inset-0">
        <div className={`aura absolute ${main} h-[42rem] w-[42rem] rounded-full blur-[110px]`} style={{ background: `rgb(var(--c-${c}))` }} />
        <div className={`aura aura-b absolute ${second} h-[30rem] w-[30rem] rounded-full blur-[120px]`} style={{ background: `rgb(var(--c-${c === 'em' ? 'cy' : c === 'cy' ? 'vi' : 'em'}))`, opacity: 'calc(var(--aura-a) * 0.6)' }} />
      </motion.div>
      <div className="container-site relative h-full">
        <span className={`absolute left-4 top-6 h-3 w-3 border-l border-t border-${c}/40 md:left-8 xl:left-10`} />
        <span className={`absolute right-4 top-6 h-3 w-3 border-r border-t border-${c}/40 md:right-8 xl:right-10`} />
        <span className={`absolute bottom-6 left-4 h-3 w-3 border-b border-l border-${c}/40 md:left-8 xl:left-10`} />
        <span className={`absolute bottom-6 right-4 h-3 w-3 border-b border-r border-${c}/40 md:right-8 xl:right-10`} />
        {mark && (
          <span className="absolute right-4 top-11 hidden font-mono text-[10px] tracking-[0.14em] text-dim md:right-8 md:block xl:right-10">
            {mark}
          </span>
        )}
      </div>
    </div>
  )
}
```
Because the border colour class is built dynamically, add this safelist to `tailwind.config.js`: `safelist: ['border-cy/40', 'border-vi/40', 'border-em/40']`.

- [ ] **Step 5: Home sections** (`src/pages/Home.jsx`) — for each section after the hero (`#about`, `#platform`, `#builds`, `#stack`, `#research`, `#contact`):
  - add `relative isolate overflow-hidden` to the `<section>` className;
  - insert `<SectionAura tone=… side=… mark=… />` as its first child;
  - alternate bands: sections with odd position (`#platform`, `#stack`, `#contact`) also get `bg-[rgb(var(--band)/var(--band-a))]` and, as the second child, a top hairline `<div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cy/40 to-transparent" />`.

| section | tone | side | mark |
|---|---|---|---|
| about | cy | left | `SEC 00 · SOURCE · 10.82°N 106.63°E` |
| platform | cy | right | `SEC 01 · BUILD` |
| builds | cy | left | `SEC 02 · SHIP` |
| stack | vi | right | `SEC 03 · LAYERS` |
| research | vi | left | `SEC 04 · ENRICH` |
| contact | em | right | `SEC 05 · SERVE` |

- [ ] **Step 6: Keep the spine on top** — in `src/components/layout/PipelineSpine.jsx` add `z-[1]` to the overlay div (`pointer-events-none absolute inset-0 hidden lg:block` → `… z-[1]`). In `src/components/ui/SectionHeader.jsx` add `z-[2]` to the node wrapper span (the one with `data-stage-node`, which is already `relative`) so the line passes behind the node.

- [ ] **Step 7: Case study and about pages** — in `src/components/case/CaseSection.jsx` add `relative isolate overflow-hidden` to the `<section>` and insert `<SectionAura tone={tone} side={Number(index) % 2 ? 'left' : 'right'} />` as its first child (no `mark`, no band: those pages have the sidebar). In `src/components/case/CaseHeader.jsx` nothing changes (it already has its own backdrop).

- [ ] **Step 8: Verify** — `npm run check && npm run build` pass. Do NOT commit.

---

### Task 2: Verification  *(Sonnet)*

Against `npm run build` + `npm run preview -- --port 4173 --strictPort` (playwright-core + Chrome, swiftshader args), both `colorScheme: 'light'` and `'dark'`:
- Home: one fixed backdrop element (`.backdrop-grid`) exists; each of the 6 sections contains an `.aura`; `#platform`, `#stack`, `#contact` have a non-transparent background differing from canvas; spine overlay computed `z-index` is 1 and the spine is visible above the `#platform` band (pixel check: sample the spine x at the `#platform` mid-height in a screenshot — it should differ from the band colour).
- Every page (home, both case studies, about, 404) at 1440 and 390: no console errors; scrollWidth equals the viewport.
- Contrast pairs unchanged (`.text-mu` on the band background ≥ 4.5 in both themes).
- Reduced motion: `.aura` still animates (computed `animation-duration` 60s), parallax off.
- Screenshots (light and dark, 1440×900 viewport) at home `#platform`, `#stack`, `#research`, `/work/ba3-data-platform` scrolled to `#principles`, `/about` scrolled to `#timeline`. Review: is each section visibly distinct and is the page no longer "one flat colour"? Is anything too loud or reducing readability?
- Fix defects minimally, commit `fix: background verification adjustments`, report with the screenshots' observations.
