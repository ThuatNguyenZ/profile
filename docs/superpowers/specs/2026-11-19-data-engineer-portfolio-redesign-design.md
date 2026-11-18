# Data Engineer Portfolio Redesign — Design

Date: 2026-11-19
Status: Approved in brainstorming, pending spec review

## 1. Goal

Replace the March 2026 portfolio (generic blue/green cards, skill % bars, "Life" section) with a site that reads as **Data Engineer** within seconds, and shows real, current work:

- BA3 data platform (Data Engineer at BA3 Studio, Nov 2024 – now; platform built and operated since Mar 2025)
- Lunch-Order, an internal app used daily by the whole office (side build)
- Two published papers, education

Purpose: polish the public profile (not an active job hunt — no "open to roles" signal).

### Audience

- **First screen**: a recruiter understands role, stack and scale in ~10 seconds.
- **Below / case-study pages**: a tech lead sees how the system is designed and operated.

Language: English only.

## 2. Visual direction

Based on the "Obsidian Telemetry" reference (Stitch export, `stitch_creative_data_engineer_portfolio.zip`), adapted:

- **Canvas**: `#08090C`, 24px micro-dot grid `rgba(255,255,255,.035)`.
- **Surfaces**: `#0E1015` (s1), `#151821` (s2), hairline `#1E2230`; panels `rgba(14,16,21,.75)` + 1px border + 12px backdrop blur.
- **Accents, signal-only**: cyan `#00F0FF` (ingest / primary action), violet `#6366F1` (transform / secondary), emerald `#10B981` (healthy), amber `#F59E0B` (warning, rarely used).
- **Text**: `#F8FAFC`, muted `#94A3B8`, dim `#475569`.
- **Type**: Space Grotesk (headlines, uppercase, tracking −0.03em), Inter (body), JetBrains Mono (labels, metadata, numbers; uppercase labels at 0.08em tracking).
- **Shape**: 0–4px radii, no drop shadows; glow only on highlighted nodes (`0 0 16px rgba(0,240,255,.15–.22)`).
- **Section labels**: `// 01 · FEATURED PLATFORM` style numbering.
- Dark mode only.

### What we deliberately do NOT copy from the reference

- No invented metrics (PB, $ savings, SLAs, talks, GitHub stars). **Every number on the site must be true.**
- No decorative three.js network. The hero visual is the real (high-level) architecture.

## 3. Confidentiality rules (BA3)

BA3-DATA-PIPELINE is a private company repo. On every page:

- Describe **inputs → processing layer → outputs** only (black box).
- Never show: table/schema names, module or folder names, flow names, real CLI commands/output, algorithms/model names used in the pipeline, check codes, shop/brand identifiers, region, credentials, business numbers, screenshots.
- Web scraping is always described as **"public data collection"**; Playwright/CDP is described as **"public-data collection tooling"**.

Allowed BA3 numbers (counted from the codebase, non-business): 6 sources (4 marketplaces + 2 ad platforms), ~140 tables, ~20 monitoring checks, 8 dashboards, ~3.4k tests, schedules daily / every 4h / every 15m.

Lunch-Order is the author's own non-core project: moderate detail is allowed (simplified ERD, one illustrative RLS snippet, testing approach, release timeline), but not the full schema.

## 4. Information architecture

Routes:

| Route | Page |
|---|---|
| `/` | Home (long scroll) |
| `/work/ba3-data-platform` | BA3 case study |
| `/work/lunch-order` | Lunch-Order case study |
| `*` | 404 in the same style |

### 4.1 Home `/`

1. **Nav (sticky)**: `NT` mono logo square + name + "data engineer · hcmc"; links `// 01 PLATFORM`, `// 02 BUILDS`, `// 03 STACK`, `// 04 RESEARCH`, `// 05 CONTACT` (scroll anchors); primary button `CV.PDF ↓` (`/cv.pdf`, unchanged file).
2. **Status strip** (mono, one line): `schedules: daily · every 4h · every 15m` · `sources 6` · `tables ~140` · `tests ~3.4k`.
3. **Hero**: headline *"Turning six marketplaces into one warehouse."*; sub *"I design, ship and operate the data platform behind an e-commerce analytics product, from collection to the 3 a.m. alert."*; animated SVG DAG: 6 source labels (Shopee, Lazada, TikTok Shop, Amazon, Meta Ads, Google Ads) → Data Lake → Warehouse (raw) → Warehouse (cleaned) → Analytics, with a "monitored every 15m" emerald tag. Packets flow along edges. Hovering/focusing a node shows a one-line role tooltip. Buttons: `EXPLORE THE PLATFORM →` (case study), `> RUN DRY-RUN` (scrolls to terminal). Optional faint CSS particle layer behind the DAG.
4. **KPI strip** (4 cells): 6 sources · ~140 tables · 20 checks · ~3.4k tests, each with a one-line caption.
5. **// 01 Featured platform — BA3 Data Platform**: two columns — short pitch + stack chips + `READ THE CASE STUDY →`; a generic terminal panel playing a scripted, non-revealing dry run (`$ pipeline run --dry-run` → `collect ✓ · land ✓ · load ✓ · checks ✓ · exit 0`). Below: 5-step horizontal DAG strip *Collect → Land → Model → Enrich → Observe* with one-line generic captions.
6. **// 02 Side build — Lunch-Order**: pitch (logic lives in Postgres; used daily by the whole office; 7 releases; $0/month on free tiers) + chips (Supabase, Postgres RLS, React 19 · TS, PWA, VietQR) + small code panel with an illustrative RLS policy + `v7 · LIVE` chip + link to case study.
7. **// 03 Stack, by pipeline layer** (replaces skill % bars). Rows:
   - INGEST: Python · REST/Graph APIs · public-data collection tooling
   - STORE: AWS S3 · Parquet · PostgreSQL · Redis · Cassandra · MongoDB
   - TRANSFORM: pandas · pyarrow · SQL · AWS Glue · Spark · Kafka
   - ORCHESTRATE: in-house runner · cron on EC2 · Celery · GitHub Actions · Docker
   - OBSERVE: Grafana · CloudWatch · email alerting
   - ML / NLP: PyTorch · Transformers · Keras
8. **// 04 Research & Education** (two columns, citation style, colored left rule):
   - RRS: Review-based Recommendation System for Vietnamese E-commerce — SN Computer Science (Springer), Q2, DOI 10.1007/s42979-024-02812-6
   - Co-NAML-LSTUR: Hybrid News Recommendation with Dual-Scale User Modeling — MIWAI 2025 (Springer Nature), DOI 10.1007/978-981-95-4960-3_9
   - M.Sc. Artificial Intelligence, University of Science – VNU-HCM, Sep 2025 – present
   - B.Sc. Data Science, University of Information Technology – VNU-HCM, 2020 – 2024, GPA 8.22/10, finished in 3.5 years
9. **// 05 Contact**: *"Have a pipeline that needs an owner?"*; email with copy-to-clipboard, GitHub, LinkedIn. No phone, no Facebook.
10. **Footer**: one mono line, e.g. `built by hand · react + svg · last deploy 2026-11`, plus social icons.

### 4.2 BA3 case study `/work/ba3-data-platform`

1. **Header**: title "BA3 Data Platform", role "Data Engineer — owner of the pipeline", period `03/2025 → now`, stack chips, the 4 KPIs.
2. **Problem**: many sources, each with its own access method; scattered scripts; no way to know when data went stale.
3. **Architecture** (large interactive SVG): `Sources (6) → Collection → Data Lake → Warehouse (raw → cleaned) → Analytics product`, with an Observability band underneath. Hover/focus shows role only (e.g. "Lake — immutable raw storage, enables replay"). No lanes, no table names.
4. **Key decisions** (4 cards: Decision → Why → Trade-off), principle level:
   - Lightweight in-house orchestration with resumable, idempotent runs
   - Raw data kept immutable so any day can be replayed
   - Layer boundaries enforced in code
   - Phased migration with zero downtime
5. **Observability**: status-board of check *categories* (run health · data freshness · load integrity · API health · credentials · infrastructure), all "healthy"; ~20 checks, 8 dashboards, alerts before customers notice. Generic SVG dashboard illustration (no real screenshots).
6. **Review enrichment**: black-box flow `Raw Vietnamese reviews → [Normalization & enrichment layer] → Normalized text · Topics · Sentiment`; middle box has a subtle "processing" animation. Link to Research section.
7. **Lessons / next**: 2–3 short lines.
8. Footer nav: ← Home · Next: Lunch-Order →

No terminal on this page.

### 4.3 Lunch-Order case study `/work/lunch-order`

Same frame, shorter, moderate detail:

1. **Header**: "Lunch-Order", role "Solo builder", Nov 2026, chips, facts: used daily by the whole office · 7 releases · $0/month.
2. **Problem**: daily office lunch ordering via chat, manual tallying and payment tracking.
3. **Data model**: simplified ERD with 6 entities — Members, Shops, Menu items, Daily sessions, Orders (+ items), Payments & rewards — and their relations. Not the full schema.
4. **Logic in the database**: short explanation (row-level security, triggers, RPC functions; client stays thin) + one illustrative RLS policy snippet.
5. **Testing**: database behavior (RLS, triggers, RPC) tested in-process with PGlite — no Docker, no live DB.
6. **Releases**: timeline condensed to 3 milestones (v1 core ordering → v3–v5 payments, collectors & rewards → v6–v7 ratings, leaderboards, QR payments).
7. **Stack & cost**: React 19 + TS, Supabase (DB/Auth/Storage/Realtime), Google OAuth, Cloudflare Pages, PWA — all free tier.
8. Footer nav: ← BA3 Data Platform · Home →

## 5. Technical design

### Stack

Rewrite in place. Keep React 19, Vite 6, Tailwind 3, react-router-dom 7, framer-motion (scroll reveals), lucide-react (a few UI icons). Remove `devicon`.

Fonts: Google Fonts (Space Grotesk 500/600/700, Inter 400/500, JetBrains Mono 400/500/600) linked in `index.html`.

### Structure

```
src/
  content/        profile.js, platform.js, lunchOrder.js, stack.js, research.js
  theme/          tokens consumed by tailwind.config.js (colors, fonts, radii)
  components/
    ui/           Panel, Chip, Button, SectionHeader, KpiStrip, Terminal, CopyEmail
    viz/          HeroDag, ArchitectureDiagram, BlackBoxFlow, StatusBoard, Erd
    layout/       Nav, StatusStrip, Footer, PageShell
  pages/          Home, CaseStudyPlatform, CaseStudyLunchOrder, NotFound
  App.jsx         routes
```

All copy and numbers live in `content/`; components only render. Old components/data not used by the new design are deleted (`Life`, `Skills`, `Hero/*` backgrounds, `icons/*`, `SoftPattern`, `ArchitectureDiagram`, `SkillsSidebar`, `AnimatedCounter`, `SkillNode`, old `data/*`).

### Motion & accessibility

- SVG diagrams; packet flow via CSS `stroke-dashoffset` / `offset-path`. No WebGL.
- `prefers-reduced-motion: reduce` stops all looping animation and reveals.
- Diagram nodes are focusable; tooltips appear on hover and focus; diagrams have `role="img"` + `aria-label` summaries.
- Text contrast meets WCAG AA on the dark canvas.

### Responsive

- ≥1280: 12-col grid, 1240px max content, 40px side padding.
- 768–1279: 2-col sections collapse where needed.
- <768: single column, 16px gutters, hero DAG switches to a **vertical** layout, KPI strip 2×2, nav collapses to a menu button. No horizontal page scroll.

### Routing, SEO, deploy

- Routes as in §4; scroll-to-top on route change; nav anchors work from case-study pages (navigate home then scroll).
- `vercel.json` SPA rewrite to `index.html`.
- `<title>`, meta description, Open Graph/Twitter tags, a static OG image (1200×630) in the same style, favicon `NT`.

### Verification

No test framework is added (static site). Verification = `npm run build` succeeds, then browser screenshots of each page at 1440px and 390px compared against the approved mockup, plus checks: no horizontal scroll on mobile, reduced-motion respected, all links (CV, DOIs, email copy, socials, routes) work, and a confidentiality pass grepping `src/` for forbidden terms (table names, `crawl`, `Playwright`, `CDP`, module names).

## 6. Out of scope

- Updating `cv.pdf` (kept as is).
- Blog/articles, light mode, i18n, analytics.
- Real Grafana screenshots or live data feeds.
