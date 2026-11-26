# Gentle Motion, Soft Hover & About Page Implementation Plan

> **For agentic workers:** Execute task by task. Implementers run via `codex exec` (they cannot write `.git`; the controller commits). Auditors (Claude Sonnet/Haiku) verify after each task.

**Goal:** (1) Keep ambient motion running even when the OS asks for reduced motion (the owner's Windows has "Animation effects" off, so the whole site looked frozen); (2) make hover states feel soft and animated instead of abrupt; (3) add an `/about` page introducing the owner.

**Branch:** `feat/motion-wayfinding` (continue on it; not pushed yet). Repo `D:\career\MyApp\profile`, Git Bash on Windows. No `npm install` (no new deps).

**Commit trailer:** blank line + `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## Decisions (owner, 2026-11-27)

- **Motion policy "gentle under reduce":** under `prefers-reduced-motion: reduce`, ambient motion keeps running but slower (hero network at 0.25× the reference instead of 0.5×; CSS loops at 2× duration; packets still visible). Large motion stays off: headline word rise, scroll reveals, page slide, smooth scrolling. Route change keeps an opacity-only fade and the top sweep bar.
- **Soft hover:** one easing for the whole site, `cubic-bezier(0.2, 0.7, 0.2, 1)`; buttons get a color sweep (left → right) and their trailing `→` nudges right; text links get an underline that grows from the left; cards lift over 350 ms with a fading glow; icon buttons rise slightly; TOC links slide right a few px.
- **About page:** route `/about`, nav item `// 00 ABOUT` first in the nav, hero gets an `About me →` ghost button. Sections: Story (+ photo `/images/profile.jpg`), Timeline, How I work. Uses the case-study sidebar/chip TOC and a breadcrumb `~ / about`. Copy below is a draft written by Claude, approved for implementation; the owner will edit later.

---

### Task 1: Gentle reduced-motion + soft hover  *(codex)*

**Files:** `src/styles/index.css`, `src/components/viz/HeroNetwork.jsx`, `src/components/layout/RouteTransition.jsx`, `src/components/ui/Button.jsx`, `src/components/ui/CopyEmail.jsx`, `src/components/layout/Nav.jsx`, `src/components/layout/Footer.jsx`, `src/components/case/CaseToc.jsx`, `src/components/case/CaseHeader.jsx`, `src/pages/Home.jsx`, `src/pages/CaseStudyPlatform.jsx`, `src/pages/NotFound.jsx`

- [ ] **Step 1: Reduced-motion block in `src/styles/index.css`** — replace the whole `@media (prefers-reduced-motion: reduce) { … }` block with:

```css
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  /* Ambient loops keep running, just slower. */
  .flow {
    animation-duration: 2s;
  }

  .scan {
    animation-duration: 4.8s;
  }

  .pulse-bar {
    animation-duration: 5.6s;
  }

  .marquee {
    animation-duration: 96s;
  }

  .pulse-dot {
    animation-duration: 4s;
  }
}
```
(`.packet` stays visible; `.caret` keeps blinking; `.lift:hover` keeps its small lift.)

- [ ] **Step 2: Soft-motion utilities in `src/styles/index.css`.** Add `--ease: cubic-bezier(0.2, 0.7, 0.2, 1);` inside the existing `:root { … }` rule in `@layer base`. Replace the existing `.lift` and `.lift:hover` rules with the block below, and append the rest (all outside `@layer`, before the media query):

```css
.lift {
  transition:
    transform 0.35s var(--ease),
    border-color 0.35s var(--ease),
    box-shadow 0.45s var(--ease),
    background-color 0.35s var(--ease);
}

.lift:hover {
  transform: translateY(-3px);
  border-color: rgba(0, 240, 255, 0.45);
  box-shadow:
    0 0 0 1px rgba(0, 240, 255, 0.12),
    0 10px 30px -12px rgba(0, 240, 255, 0.28);
}

/* Button colour sweep: set --sweep-bg per variant. */
.sweep {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  transition:
    color 0.3s var(--ease),
    border-color 0.3s var(--ease),
    box-shadow 0.4s var(--ease),
    transform 0.2s var(--ease);
}

.sweep::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background: var(--sweep-bg, rgba(0, 240, 255, 0.08));
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.4s var(--ease);
}

.sweep:hover::before,
.sweep:focus-visible::before {
  transform: scaleX(1);
  transform-origin: left;
}

.sweep:active {
  transform: scale(0.98);
}

.nudge {
  display: inline-block;
  transition: transform 0.3s var(--ease);
}

.group:hover .nudge,
.group:focus-visible .nudge {
  transform: translateX(4px);
}

/* Text link underline that grows from the left. */
.link-grow {
  background-image: linear-gradient(currentColor, currentColor);
  background-position: 0 100%;
  background-repeat: no-repeat;
  background-size: 0% 1px;
  transition:
    background-size 0.35s var(--ease),
    color 0.3s var(--ease);
}

.link-grow:hover,
.link-grow:focus-visible {
  background-size: 100% 1px;
}

.icon-btn {
  transition:
    transform 0.3s var(--ease),
    border-color 0.3s var(--ease),
    color 0.3s var(--ease),
    box-shadow 0.4s var(--ease);
}

.icon-btn:hover,
.icon-btn:focus-visible {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px -8px rgba(0, 240, 255, 0.5);
}
```

- [ ] **Step 3: `src/components/ui/Button.jsx`** — replace with:

```jsx
import { Link } from 'react-router-dom'

const base =
  'sweep group inline-flex items-center gap-2 border px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.06em]'

const variants = {
  primary: 'border-cy bg-cy text-canvas [--sweep-bg:#08090C] hover:text-cy hover:shadow-glow',
  ghost: 'border-line text-mu [--sweep-bg:rgba(0,240,255,0.08)] hover:border-cy/60 hover:text-tx',
}

// A trailing "→" in a string label slides right on hover.
function Label({ children }) {
  if (typeof children === 'string' && children.endsWith('→')) {
    return (
      <>
        {children.slice(0, -1).trimEnd()}
        <span aria-hidden="true" className="nudge">
          →
        </span>
      </>
    )
  }
  return children
}

export default function Button({ to, href, variant = 'primary', className = '', children, ...rest }) {
  const cls = `${base} ${variants[variant]} ${className}`
  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        <Label>{children}</Label>
      </Link>
    )
  }
  return (
    <a href={href} className={cls} {...rest}>
      <Label>{children}</Label>
    </a>
  )
}
```

- [ ] **Step 4: Apply the utilities elsewhere**
  - `Nav.jsx`: the CV button (desktop) → replace its hover classes `transition-colors hover:bg-transparent hover:text-cy` with `sweep [--sweep-bg:#08090C] hover:text-cy hover:shadow-glow`. Desktop section links: keep active styling, add `transition-colors duration-300` and, for non-active links, a hover underline via `link-grow` on an inner `<span>` wrapping the label text. Menu toggle button: add `icon-btn`.
  - `CopyEmail.jsx`: email anchor → add `sweep [--sweep-bg:rgba(0,240,255,0.08)]` and replace `transition-colors` with nothing; copy button → replace `transition-colors hover:bg-transparent hover:text-cy` with `sweep [--sweep-bg:#08090C] hover:text-cy hover:shadow-glow`.
  - `Footer.jsx`: icon links → replace `transition-colors` with `icon-btn`.
  - `CaseToc.jsx`: sidebar links → add `transition-[color,transform] duration-300 hover:translate-x-1` (replace `transition-colors`); chip links → add `transition-colors duration-300 hover:border-cy/60 hover:text-tx` for the inactive state.
  - `CaseHeader.jsx` breadcrumb links, `CaseStudyPlatform.jsx` "Related" link, `Home.jsx` paper title links → add `link-grow` (remove `hover:underline` where present).
  - Home step strip `<li>`s, principle panels, problem items already have `lift`; also add `lift` to `CaseNav` links (`src/components/case/CaseNav.jsx`, replace `transition-colors`).

- [ ] **Step 5: `HeroNetwork.jsx` keeps running under reduced motion** — change the speed and start logic:
  - After `const reduce = …`, add `const speed = reduce ? SPEED * 0.5 : SPEED`.
  - In `step()`, replace every `SPEED` with `speed`.
  - In `start()`, change `if (reduce || running) return` to `if (running) return`.
  - Update the top comment to: `// Motion rates are half of the Stitch reference (a quarter when the OS asks for reduced motion).`

- [ ] **Step 6: `RouteTransition.jsx`**
  - `RouteSweep`: remove the reduced-motion early return (always render the sweep).
  - `RouteTransition`: under reduced motion, use opacity only instead of returning children directly:

```jsx
export default function RouteTransition({ children }) {
  const location = useLocation()
  const reduce = useReducedMotion()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: reduce ? 0 : 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: reduce ? 0 : -8 }}
        transition={{ duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }}
      >
        {children(location)}
      </motion.div>
    </AnimatePresence>
  )
}
```

- [ ] **Step 7: Verify** — `npm run check && npm run build` both pass. Do NOT commit.

---

### Task 2: About page  *(codex)*

**Files:** create `src/content/about.js`, `src/pages/About.jsx`, `src/components/about/Timeline.jsx`; modify `src/content/profile.js`, `src/components/layout/Nav.jsx`, `src/App.jsx`, `src/pages/Home.jsx`, `src/components/case/CaseHeader.jsx`.

- [ ] **Step 1: `src/content/about.js`**

```js
export const about = {
  slug: 'about',
  kicker: 'ABOUT',
  title: 'Hi, I’m Thuat.',
  lead: 'Data engineer in Ho Chi Minh City. I like systems that are boring in production — because someone designed them with care.',
  photo: { src: '/images/profile.jpg', alt: 'Portrait of Nguyen Thien Thuat' },
  facts: [
    { label: 'role', value: 'Data Engineer · BA3 Studio' },
    { label: 'studying', value: 'M.Sc. AI · University of Science' },
    { label: 'based in', value: 'Ho Chi Minh City' },
    { label: 'research', value: 'Recommender systems · NLP' },
  ],
  story: [
    'I studied Data Science at the University of Information Technology (VNU-HCM) and finished the four-year program in three and a half. Research came early: a review-based recommender for Vietnamese e-commerce, later published in SN Computer Science.',
    'At BA3 Studio I found the work I enjoy most — owning the data platform behind an analytics product, from the first collection job to the alert at 3 a.m. I would rather build something small that runs every day than something clever that runs once.',
    'Today I split my time between that platform and a Master’s in Artificial Intelligence at the University of Science (VNU-HCM). On the side I build small tools people actually use — like the lunch-ordering app my office opens every morning.',
  ],
  timeline: [
    { when: '2020', title: 'B.Sc. Data Science begins', text: 'University of Information Technology, VNU-HCM.' },
    { when: '2023', title: 'First research project', text: 'Review-based recommendation for Vietnamese e-commerce.' },
    { when: '05/2024', title: 'Graduated early', text: 'GPA 8.22/10, in 3.5 years. The paper is published in SN Computer Science (Q2).' },
    { when: '11/2024', title: 'Joined BA3 Studio', text: 'Data Engineer on an e-commerce analytics product.' },
    { when: '03/2025', title: 'Building the data platform', text: 'Design, build and operate — end to end.', highlight: true },
    { when: '09/2025', title: 'M.Sc. Artificial Intelligence', text: 'University of Science, VNU-HCM.' },
    { when: '2025', title: 'Second paper', text: 'Co-NAML-LSTUR, news recommendation — MIWAI 2025, Springer Nature.' },
    { when: '11/2026', title: 'Lunch-Order', text: 'A side build the whole office now uses every day.' },
  ],
  principles: [
    { title: 'Own it end to end', text: 'From the first API call to the dashboard, I would rather understand the whole path than hand off halfway.' },
    { title: 'Make failure cheap', text: 'Resumable jobs, replayable data, small steps. Things will break; recovery should be boring.' },
    { title: 'Watch before you are asked', text: 'If a customer notices a problem first, the monitoring was not finished.' },
    { title: 'Write it down while building', text: 'Runbooks written alongside the code keep designs honest and onboarding short.' },
  ],
}
```

- [ ] **Step 2: Nav entry** — in `src/content/profile.js`, make `navLinks` entries carry a target and add About first:

```js
export const navLinks = [
  { id: 'about', label: '00 ABOUT', to: '/about' },
  { id: 'platform', label: '01 PLATFORM' },
  { id: 'builds', label: '02 BUILDS' },
  { id: 'stack', label: '03 STACK' },
  { id: 'research', label: '04 RESEARCH' },
  { id: 'contact', label: '05 CONTACT' },
]
```

In `Nav.jsx`:
  - `ROUTE_SECTION` gets `'/about': 'about'`.
  - Scroll-spy ids on home: `navLinks.filter((l) => !l.to).map((l) => l.id)`.
  - Every link target: `to={link.to ?? `/#${link.id}`}` (desktop and mobile).
  - With six links the desktop nav needs room: change the desktop link container gap from `gap-6` to `gap-5` and show it from `xl` instead of `lg` (`hidden … xl:flex`); the menu button and mobile menu switch from `lg:hidden` to `xl:hidden`; the CV button's `lg:ml-0` becomes `xl:ml-0`.

- [ ] **Step 3: `CaseHeader.jsx` breadcrumb** — accept an optional `crumbs` prop: an array of `{ label, to? }` rendered between `~` and the current slug. Default (when not passed) is `[{ label: 'work', to: '/#builds' }]` so existing pages are unchanged. The About page passes `crumbs={[]}` so it renders `~ / about`.

- [ ] **Step 4: `src/components/about/Timeline.jsx`**

```jsx
import Reveal from '../ui/Reveal'

export default function Timeline({ items }) {
  return (
    <ol className="relative ml-2 border-l border-line">
      {items.map((item, i) => (
        <li key={`${item.when}-${item.title}`} className="relative pb-8 pl-8 last:pb-0">
          <span
            aria-hidden="true"
            className={`absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border ${item.highlight ? 'border-cy bg-cy shadow-glow' : 'border-mu bg-canvas'}`}
          />
          <Reveal delay={Math.min(i * 0.05, 0.3)}>
            <div className="lift -ml-3 border border-transparent px-3 py-2">
              <p className={`font-mono text-[11px] tracking-[0.08em] ${item.highlight ? 'text-cy' : 'text-dim'}`}>{item.when}</p>
              <p className="mt-0.5 font-display text-[18px] font-semibold">{item.title}</p>
              <p className="mt-1 text-[14px] text-mu">{item.text}</p>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  )
}
```

- [ ] **Step 5: `src/pages/About.jsx`**

```jsx
import Button from '../components/ui/Button'
import CaseBody from '../components/case/CaseBody'
import CaseHeader from '../components/case/CaseHeader'
import CaseSection from '../components/case/CaseSection'
import Timeline from '../components/about/Timeline'
import { about } from '../content/about'
import { profile } from '../content/profile'
import { platform } from '../content/platform'
import useDocumentTitle from '../lib/useDocumentTitle'

const SECTIONS = [
  { id: 'story', label: 'Story' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'how-i-work', label: 'How I work' },
]

export default function About() {
  useDocumentTitle('About')
  return (
    <>
      <CaseHeader kicker={about.kicker} title={about.title} role={profile.role} period={profile.location} chips={[]} slug={about.slug} crumbs={[]}>
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_280px] md:items-center">
          <div>
            <p className="max-w-2xl text-[17px] text-mu md:text-[19px]">{about.lead}</p>
            <dl className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-2">
              {about.facts.map((f) => (
                <div key={f.label} className="lift relative bg-s1 p-4 hover:z-10">
                  <dt className="label-code">{f.label}</dt>
                  <dd className="mt-1 text-[14px]">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <figure className="lift relative mx-auto w-full max-w-[280px] border border-line bg-s1 p-2">
            <img src={about.photo.src} alt={about.photo.alt} className="aspect-[4/5] w-full object-cover grayscale-[35%] transition-[filter] duration-500 hover:grayscale-0" />
            <figcaption className="mt-2 flex items-center justify-between font-mono text-[10px] text-dim">
              <span>{profile.name.toLowerCase()}</span>
              <span className="text-em">● online</span>
            </figcaption>
          </figure>
        </div>
      </CaseHeader>

      <CaseBody sections={SECTIONS}>
        <CaseSection id="story" index="01" label="STORY" title="How I got here">
          <div className="max-w-2xl space-y-5 text-[16px] leading-relaxed text-mu">
            {about.story.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </CaseSection>

        <CaseSection id="timeline" index="02" label="TIMELINE" title="Milestones">
          <Timeline items={about.timeline} />
        </CaseSection>

        <CaseSection id="how-i-work" index="03" label="HOW I WORK" title="Four habits">
          <div className="grid gap-4 md:grid-cols-2">
            {about.principles.map((p, i) => (
              <div key={p.title} className="lift panel p-5">
                <p className="label-code text-cy">habit · {String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-2 font-display text-[19px] font-semibold">{p.title}</h3>
                <p className="mt-2 text-[14px] text-mu">{p.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button to={`/work/${platform.slug}`}>See the platform →</Button>
            <Button to="/#contact" variant="ghost">
              Get in touch →
            </Button>
          </div>
        </CaseSection>
      </CaseBody>
    </>
  )
}
```

- [ ] **Step 6: Route + entry points**
  - `src/App.jsx`: import `About` and add `<Route path="/about" element={<About />} />` before the `*` route.
  - `src/pages/Home.jsx` hero buttons: add a third button `<Button to="/about" variant="ghost">About me →</Button>` after the existing two.

- [ ] **Step 7: Verify** — `npm run check && npm run build` pass; `node -e "import('./src/content/about.js').then(()=>console.log('ok'))"` prints ok. Do NOT commit.

---

### Task 3: Verification  *(Sonnet)*

Update `.superpowers/verify2.mjs` (git-ignored) and run against `npm run preview -- --port 4173 --strictPort`:
- All existing checks, with these expectation changes: under `reducedMotion: 'reduce'` the `.packet` elements ARE displayed, and the hero canvas content changes between two screenshots 2 s apart (animation runs).
- `/about` at 1440 and 390: no horizontal overflow, title `About — …`, nav `// 00 ABOUT` has `aria-current="location"`, breadcrumb shows `~ / about`, sidebar (desktop) / chip bar (mobile) lists Story, Timeline, How I work, the image loads (`naturalWidth > 0`).
- Home hero has an `About me` link that navigates to `/about`.
- Hover softness: on home, hover the primary hero button; after 450 ms its `::before` transform is `matrix(1, 0, 0, 1, 0, 0)` (sweep complete) and the `.nudge` arrow has a non-zero translateX; a `.lift` card's computed `transition-duration` includes `0.35s`.
- Desktop nav at 1280 px fits on one line (no wrap: nav height stays 56 px); at 1279 px the menu button is shown.
- No console errors on any route; `npm run check` passes.
Screenshots of `/about` desktop + mobile and a hover state of a button; review them; fix defects; commit fixes; report.
