# Light Mode + Motto Implementation Plan

> Implementers run via `codex exec` (cannot write `.git`; the controller commits). Auditor: Claude Sonnet.

**Goal:** Add a light theme. Default follows the browser/OS (`prefers-color-scheme`), with a nav toggle cycling **System → Light → Dark** that is remembered. Also change the motto.

**Branch:** `feat/light-mode` (checked out). Repo `D:\career\MyApp\profile`, Git Bash on Windows. No `npm install`.

**Commit trailer:** blank line + `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

**Constraints:** `npm run check` must pass; keep the reduced-motion policy (ambient loops slower, never off); no horizontal overflow at 390 px; no flash of the wrong theme on load.

## Design

All colours become CSS variables holding space-separated RGB channels, consumed by Tailwind as `rgb(var(--c-x) / <alpha-value>)` so existing classes (`bg-canvas`, `text-mu`, `border-cy/50`, `bg-s1/75` …) keep working in both themes.

| token | dark (current) | light |
|---|---|---|
| canvas | 8 9 12 (#08090C) | 247 248 250 (#F7F8FA) |
| s1 | 14 16 21 (#0E1015) | 255 255 255 (#FFFFFF) |
| s2 | 21 24 33 (#151821) | 241 245 249 (#F1F5F9) |
| line | 30 34 48 (#1E2230) | 226 232 240 (#E2E8F0) |
| cy | 0 240 255 (#00F0FF) | 14 116 144 (#0E7490) |
| vi | 99 102 241 (#6366F1) | 79 70 229 (#4F46E5) |
| em | 16 185 129 (#10B981) | 4 120 87 (#047857) |
| am | 245 158 11 (#F59E0B) | 217 119 6 (#D97706) |
| tx | 248 250 252 (#F8FAFC) | 15 23 42 (#0F172A) |
| mu | 148 163 184 (#94A3B8) | 71 85 105 (#475569) |
| dim | 71 85 105 (#475569) | 100 116 139 (#64748B) |
| code (terminal/SQL bg) | 5 6 10 (#05060A) | 241 245 249 (#F1F5F9) |
| codetx (terminal text) | 201 209 217 (#C9D1D9) | 51 65 85 (#334155) |
| cy-soft (chip text) | 143 247 255 (#8FF7FF) | 21 94 117 (#155E75) |
| vi-soft | 180 182 255 (#B4B6FF) | 67 56 202 (#4338CA) |
| em-soft | 126 226 189 (#7EE2BD) | 6 95 70 (#065F46) |
| dot (bg grid dots) | 255 255 255 / .035 | 15 23 42 / .06 |
| glow alpha | .18 | .25 (glows use `--c-cy`) |

Theme selection: `<html data-theme="light|dark">` holds the **resolved** theme; the user preference (`system|light|dark`) lives in `localStorage['theme']`. CSS defines dark on `:root`, light on `:root[data-theme="light"]`, and (for no-JS) light under `@media (prefers-color-scheme: light) { :root:not([data-theme="dark"]) {…} }`.

---

### Task 1: Tokens, theme switching, toggle, Tailwind-class colours, motto  *(codex)*

- [ ] **Step 1: `src/theme/tokens.js`** — replace with variable-backed colours:

```js
const v = (name) => `rgb(var(--c-${name}) / <alpha-value>)`

export const colors = {
  canvas: v('canvas'),
  s1: v('s1'),
  s2: v('s2'),
  line: v('line'),
  cy: v('cy'),
  vi: v('vi'),
  em: v('em'),
  am: v('am'),
  tx: v('tx'),
  mu: v('mu'),
  dim: v('dim'),
  code: v('code'),
  codetx: v('codetx'),
  'cy-soft': v('cy-soft'),
  'vi-soft': v('vi-soft'),
  'em-soft': v('em-soft'),
}

export const fonts = {
  display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
  sans: ['Inter', 'system-ui', 'sans-serif'],
  mono: ['"JetBrains Mono"', 'ui-monospace', 'Consolas', 'monospace'],
}
```

In `tailwind.config.js` change the box shadows to `glow: '0 0 16px rgb(var(--c-cy) / var(--glow-a))'` and `'glow-em': '0 0 12px rgb(var(--c-em) / 0.35)'`.

- [ ] **Step 2: `src/styles/index.css` variables** — at the top of `@layer base`, replace the `:root { color-scheme: dark; … }` rule with the full variable sets (keep `--ease` there):

```css
  :root {
    color-scheme: dark;
    --ease: cubic-bezier(0.2, 0.7, 0.2, 1);
    --c-canvas: 8 9 12;
    --c-s1: 14 16 21;
    --c-s2: 21 24 33;
    --c-line: 30 34 48;
    --c-cy: 0 240 255;
    --c-vi: 99 102 241;
    --c-em: 16 185 129;
    --c-am: 245 158 11;
    --c-tx: 248 250 252;
    --c-mu: 148 163 184;
    --c-dim: 71 85 105;
    --c-code: 5 6 10;
    --c-codetx: 201 209 217;
    --c-cy-soft: 143 247 255;
    --c-vi-soft: 180 182 255;
    --c-em-soft: 126 226 189;
    --dot: 255 255 255;
    --dot-a: 0.035;
    --glow-a: 0.18;
  }

  :root[data-theme='light'] {
    color-scheme: light;
    --c-canvas: 247 248 250;
    --c-s1: 255 255 255;
    --c-s2: 241 245 249;
    --c-line: 226 232 240;
    --c-cy: 14 116 144;
    --c-vi: 79 70 229;
    --c-em: 4 120 87;
    --c-am: 217 119 6;
    --c-tx: 15 23 42;
    --c-mu: 71 85 105;
    --c-dim: 100 116 139;
    --c-code: 241 245 249;
    --c-codetx: 51 65 85;
    --c-cy-soft: 21 94 117;
    --c-vi-soft: 67 56 202;
    --c-em-soft: 6 95 70;
    --dot: 15 23 42;
    --dot-a: 0.06;
    --glow-a: 0.25;
  }
```

Then add, outside `@layer` (so it works before JS runs):

```css
@media (prefers-color-scheme: light) {
  :root:not([data-theme='dark']) {
    color-scheme: light;
    --c-canvas: 247 248 250;
    --c-s1: 255 255 255;
    --c-s2: 241 245 249;
    --c-line: 226 232 240;
    --c-cy: 14 116 144;
    --c-vi: 79 70 229;
    --c-em: 4 120 87;
    --c-am: 217 119 6;
    --c-tx: 15 23 42;
    --c-mu: 71 85 105;
    --c-dim: 100 116 139;
    --c-code: 241 245 249;
    --c-codetx: 51 65 85;
    --c-cy-soft: 21 94 117;
    --c-vi-soft: 67 56 202;
    --c-em-soft: 6 95 70;
    --dot: 15 23 42;
    --dot-a: 0.06;
    --glow-a: 0.25;
  }
}
```

Replace every remaining literal colour in `index.css` with variables: body dot grid → `radial-gradient(rgb(var(--dot) / var(--dot-a)) 1px, transparent 1px)`; `::selection` → `background: rgb(var(--c-cy) / 0.25); color: rgb(var(--c-tx));`; `:focus-visible` outline → `rgb(var(--c-cy))`; `.lift:hover`, `.icon-btn:hover`, `.ambient-grid` and any other rgba/hex → the matching `rgb(var(--c-…) / a)`. Add `body { transition: background-color .3s var(--ease), color .3s var(--ease); }`.

- [ ] **Step 3: No-flash script** — in `index.html`, as the first child of `<head>` after the charset meta:

```html
    <script>
      ;(function () {
        try {
          var p = localStorage.getItem('theme') || 'system'
          var dark = p === 'dark' || (p === 'system' && !window.matchMedia('(prefers-color-scheme: light)').matches)
          document.documentElement.dataset.theme = dark ? 'dark' : 'light'
        } catch (e) {}
      })()
    </script>
```
Change `<meta name="color-scheme" content="dark" />` to `content="dark light"` and replace the single theme-color meta with two: `<meta name="theme-color" content="#08090C" media="(prefers-color-scheme: dark)" />` and `<meta name="theme-color" content="#F7F8FA" media="(prefers-color-scheme: light)" />`.

- [ ] **Step 4: `src/lib/useTheme.js`**

```js
import { useCallback, useEffect, useSyncExternalStore } from 'react'

const KEY = 'theme'
const query = () => window.matchMedia('(prefers-color-scheme: light)')

function readPreference() {
  try {
    return localStorage.getItem(KEY) || 'system'
  } catch {
    return 'system'
  }
}

function resolve(pref) {
  if (pref === 'light' || pref === 'dark') return pref
  return query().matches ? 'light' : 'dark'
}

function apply(pref) {
  const theme = resolve(pref)
  document.documentElement.dataset.theme = theme
  window.dispatchEvent(new CustomEvent('themechange', { detail: theme }))
}

const listeners = new Set()
function subscribe(cb) {
  listeners.add(cb)
  return () => listeners.delete(cb)
}
function notify() {
  listeners.forEach((cb) => cb())
}

// Preference: 'system' | 'light' | 'dark'. Resolved theme: 'light' | 'dark' (also on <html data-theme>).
export default function useTheme() {
  const preference = useSyncExternalStore(subscribe, readPreference, () => 'system')
  const theme = useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.theme || resolve(readPreference()),
    () => 'dark',
  )

  useEffect(() => {
    if (preference !== 'system') return undefined
    const mq = query()
    const onChange = () => {
      apply('system')
      notify()
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [preference])

  const setPreference = useCallback((pref) => {
    try {
      localStorage.setItem(KEY, pref)
    } catch {
      /* private mode: keep it for this page view only */
    }
    apply(pref)
    notify()
  }, [])

  return { preference, theme, setPreference }
}
```

- [ ] **Step 5: `src/components/layout/ThemeToggle.jsx`**

```jsx
import { Monitor, Moon, Sun } from 'lucide-react'
import useTheme from '../../lib/useTheme'

const NEXT = { system: 'light', light: 'dark', dark: 'system' }
const ICON = { system: Monitor, light: Sun, dark: Moon }
const LABEL = { system: 'Theme: follow system', light: 'Theme: light', dark: 'Theme: dark' }

export default function ThemeToggle({ className = '' }) {
  const { preference, setPreference } = useTheme()
  const Icon = ICON[preference]
  return (
    <button
      type="button"
      onClick={() => setPreference(NEXT[preference])}
      aria-label={`${LABEL[preference]} (click to change)`}
      title={LABEL[preference]}
      className={`icon-btn grid h-9 w-9 place-items-center border border-line text-mu hover:border-cy hover:text-cy ${className}`}
    >
      <Icon size={15} />
    </button>
  )
}
```

In `Nav.jsx`, render `<ThemeToggle />` right before the CV button (visible at every width; keep the nav on one line at 1280 px — reduce the desktop link gap from `gap-5` to `gap-4` if needed).

- [ ] **Step 6: Tailwind arbitrary colours in JSX** — replace every hard-coded colour inside class names under `src/` with tokens:
  - `text-[#7ee2bd]` → `text-em-soft`; `text-[#8ff7ff]` → `text-cy-soft`; `text-[#b4b6ff]` → `text-vi-soft`
  - `bg-[#05060a]` → `bg-code`; `text-[#c9d1d9]` → `text-codetx`
  - `bg-[#ef4444]/70` → `bg-red-500/70`
  - `shadow-[inset_0_2px_0_#00F0FF]` → `shadow-[inset_0_2px_0_rgb(var(--c-cy))]`
  - radial-gradient arbitrary backgrounds with `rgba(0,240,255,a)` / `rgba(99,102,241,a)` → `rgb(var(--c-cy)/a)` / `rgb(var(--c-vi)/a)` (Tailwind arbitrary values: use `_` for spaces, e.g. `bg-[radial-gradient(circle_at_85%_20%,rgb(var(--c-cy)/0.10),transparent_50%)]`)
  - `[--sweep-bg:#08090C]` → `[--sweep-bg:rgb(var(--c-canvas))]`; `[--sweep-bg:rgba(0,240,255,0.08)]` → `[--sweep-bg:rgb(var(--c-cy)/0.08)]`
  - `SectionHeader` `TONES.*.stroke` hex values → `'rgb(var(--c-cy))'`, `'rgb(var(--c-vi))'`, `'rgb(var(--c-em))'`
  - any other `#RRGGBB`/`rgba(` in a className → the nearest token.
  (SVG attribute colours in `src/components/viz/*` are Task 2 — leave them.)

- [ ] **Step 7: Motto** — in `src/content/about.js` the `motto` row value becomes `'“Fearless in exploration — meticulous in creation.”'` (curly double quotes inside a single-quoted JS string).

- [ ] **Step 8: Verify** — `npm run check && npm run build` pass. Do NOT commit.

---

### Task 2: Theme-aware SVG diagrams and the three.js network  *(codex)*

- [ ] **Step 1: SVG colours** — in `src/components/viz/HeroDag.jsx`, `ArchitectureDiagram.jsx`, `Erd.jsx`, `StatusBoard.jsx`, `BlackBoxFlow.jsx` (and any other file under `src/` still containing `#RRGGBB` or `rgba(` outside `src/theme/` and `index.html`): SVG presentation attributes cannot read CSS variables, so move colours into `style` (or Tailwind `fill-*`/`stroke-*` classes). Use one shared helper, `src/theme/svg.js`:

```js
// CSS colour strings for SVG `style` props; they follow the active theme.
export const C = {
  canvas: 'rgb(var(--c-canvas))',
  s1: 'rgb(var(--c-s1))',
  s2: 'rgb(var(--c-s2))',
  line: 'rgb(var(--c-line))',
  cy: 'rgb(var(--c-cy))',
  vi: 'rgb(var(--c-vi))',
  em: 'rgb(var(--c-em))',
  tx: 'rgb(var(--c-tx))',
  mu: 'rgb(var(--c-mu))',
  dim: 'rgb(var(--c-dim))',
  viSoft: 'rgb(var(--c-vi-soft))',
}
export const alpha = (name, a) => `rgb(var(--c-${name}) / ${a})`
```
  Map: `#08090C`→canvas, `#0E1015`→s1, `#151821`→s2, `#1E2230`→line, `#00F0FF`→cy, `#6366F1`→vi, `#10B981`→em, `#F8FAFC`→tx, `#94A3B8`→mu, `#475569`→dim, `#b4b6ff`→viSoft, `rgba(r,g,b,a)` of those → `alpha(name, a)`. Example: `<rect fill="#0E1015" stroke={lit ? CY : LINE} />` → `<rect style={{ fill: C.s1, stroke: lit ? C.cy : C.line }} />`; text `fill=` likewise; `stopColor` likewise; `drop-shadow(... rgba(0,240,255,0.45))` → `drop-shadow(0 0 8px ${alpha('cy', 0.45)})`. `strokeOpacity`/`opacity` attributes may stay as attributes. Keep every geometry value unchanged.

- [ ] **Step 2: `HeroNetwork.jsx` theme support**
  - Read the resolved theme via `useTheme()` (`const { theme } = useTheme()`), add `theme` to the effect's dependency array so the scene is rebuilt on theme change.
  - Inside the effect: `const light = theme === 'light'`. Colours: cyan `light ? 0x0e7490 : 0x00f0ff`, violet `light ? 0x4f46e5 : 0x6366f1`, green `light ? 0x047857 : 0x10b981`; emissive values `light ? 0x000000 : <current>`; line material opacity `light ? 0.35 : 0.25`; packet material `blending: light ? THREE.NormalBlending : THREE.AdditiveBlending`, `opacity: light ? 0.65 : 0.8`; point lights unchanged.
  - Wrapper opacity: `opacity-60 md:opacity-75` in dark, `opacity-50 md:opacity-60` in light.

- [ ] **Step 3: Verify** — `npm run check && npm run build`; `grep -rnE "#[0-9A-Fa-f]{6}\b|rgba\(" src --include=*.jsx` prints nothing except `HeroNetwork.jsx` hex numbers written as `0x…` (those are not matched) — i.e. no matches. Do NOT commit.

---

### Task 3: Verification  *(Sonnet)*

Playwright + Chrome (swiftshader args) against `npm run preview -- --port 4173 --strictPort`:
- `colorScheme: 'light'` context with no stored preference → `html[data-theme="light"]`, body background `rgb(247, 248, 250)`; `colorScheme: 'dark'` → `dark`, `rgb(8, 9, 12)`.
- Toggle cycles System → Light → Dark → System; preference persists across reload (`localStorage.theme`); on `System`, switching the emulated colour scheme (`page.emulateMedia({ colorScheme })`) flips the theme live.
- No theme flash: with `colorScheme: 'light'`, the first paint already has `data-theme="light"` (check `document.documentElement.dataset.theme` in an `addInitScript`-free run right after `domcontentloaded`).
- In light mode on `/`, `/about`, both case studies, 404: no console errors; scrollWidth == viewport at 1440 and 390; contrast of `.text-mu` body text against canvas ≥ 4.5:1 and of the cyan primary button text against its background ≥ 4.5:1 (compute from computed colours).
- `/about` engineer table motto shows “Fearless in exploration — meticulous in creation.”
- Screenshots light + dark of: home hero, home `#about`, `/work/ba3-data-platform` header + architecture, `/work/lunch-order` ERD, `/about` header. Review: diagrams readable in light mode (no white-on-white), hero network visible but subtle, spine visible.
- Fix defects minimally, commit `fix: light mode verification adjustments`, report.
