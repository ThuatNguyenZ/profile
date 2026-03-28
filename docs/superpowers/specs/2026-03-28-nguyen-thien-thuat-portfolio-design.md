# Portfolio Website Design Specification

**Author:** Nguyen Thien Thuat
**Role:** Data Engineer
**Date:** March 28, 2026
**Status:** Approved

---

## 1. Overview

### 1.1 Purpose
Build a personal portfolio website for a 24-year-old Data Engineer to showcase skills, experience, and projects to potential employers (job-seeking focused).

### 1.2 Target Audience
- Recruiters and HR managers at tech companies
- Hiring managers for Data Engineering positions
- Technical leads evaluating candidate fit

### 1.3 Success Criteria
- Clear, scannable presentation of technical skills within 5 seconds
- Demonstrates product-thinking mindset through project case studies
- Shows personality and cultural fit through Life & Interests section
- Easy to navigate with smooth UX on desktop and mobile

---

## 2. Design System

### 2.1 Color Palette

| Role | Color | Hex Code | Usage |
|------|-------|----------|-------|
| Primary | Deep Blue | `#1E3A5F` | Headers, navigation, primary buttons |
| Secondary | Sky Blue | `#3B82F6` | Links, icons, skill highlights |
| Accent | Emerald Green | `#10B981` | CTAs, success states, metrics |
| Background | Pure White | `#FFFFFF` | Main background |
| Surface | Light Gray | `#F8FAFC` | Card backgrounds, section dividers |
| Text Primary | Charcoal | `#1E293B` | Body text |
| Text Secondary | Slate Gray | `#64748B` | Supporting text, labels |

### 2.2 Typography

| Element | Font Family | Weight | Size (Desktop) | Size (Mobile) |
|---------|-------------|--------|----------------|---------------|
| Headings | Inter | 700 | 48px (H1), 36px (H2), 24px (H3) | 32px, 28px, 20px |
| Body | Inter | 400 | 16px | 14px |
| Code/Mono | JetBrains Mono | 400 | 14px | 12px |

### 2.3 Spacing Scale
- Base unit: `4px`
- Scale: `4, 8, 12, 16, 24, 32, 48, 64, 96, 128px`

### 2.4 Animation Principles
- **Duration:** 200-400ms for micro-interactions, 600-800ms for section transitions
- **Easing:** `cubic-bezier(0.4, 0, 0.2, 1)` for smooth, professional feel
- **Trigger:** Scroll-based (Intersection Observer), hover, click

---

## 3. Architecture

### 3.1 Technical Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Framework | React 18+ | Component-based, large ecosystem |
| Styling | Tailwind CSS + CSS Modules | Rapid development, custom animations |
| Animation | Framer Motion | Declarative, performant animations |
| Data Viz | Recharts or Visx | React-friendly, customizable |
| Icons | Lucide React | Clean, modern icon set |
| Build | Vite | Fast HMR, optimized builds |
| Deployment | Vercel / Netlify | CI/CD, preview deployments |

### 3.2 Component Hierarchy

```
App
├── Header (Navigation)
├── HeroSection
│   ├── Tagline
│   └── DataPipelineAnimation (Canvas/SVG)
├── AboutSection
│   ├── Bio
│   └── EducationTimeline
├── SkillsSection
│   ├── SkillGroup (x5)
│   │   ├── SkillCategory
│   │   └── SkillItem (interactive)
│   └── SkillDetailModal
├── ExperienceSection
│   └── ExperienceCard
│       ├── RoleHeader
│       ├── AchievementMetrics
│       └── PipelineDiagram
├── ProjectsSection
│   └── ProjectCard
│       ├── ProjectHeader
│       ├── CaseStudy (Problem/Solution/Impact)
│       └── TechStack
├── LifeSection
│   └── LifeDashboard
│       ├── MusicWidget
│       ├── SportsWidget
│       ├── TravelWidget
│       └── SocialWidget
├── ContactSection
│   ├── ContactLinks
│   └── DownloadCVButton
└── Footer
```

### 3.3 Data Flow

```
Static JSON Data (CV content)
        ↓
Custom Hooks (useProfile, useProjects, useSkills)
        ↓
Context Provider (ProfileContext)
        ↓
Components consume via useContext
```

---

## 4. Section Specifications

### 4.1 Hero Section

**Purpose:** Capture attention, establish identity within 3 seconds.

**Content:**
- Name: "Nguyen Thien Thuat"
- Title: "Data Engineer"
- Tagline: "Building scalable data pipelines that power intelligent products"
- Location: "Ho Chi Minh City, Vietnam"
- CTA Buttons: "View My Work", "Contact Me"

**Visual:**
- Background: Animated data pipeline flow (nodes → edges → particles)
- Color: Deep blue gradient with subtle particle animation
- Animation: Continuous flow from left to right, speed ~2px/sec

**Interaction:**
- Scroll down indicator (bounce animation)
- Cursor parallax effect on particle system

---

### 4.2 About Section

**Purpose:** Humanize the candidate, show career trajectory.

**Content:**
- Bio paragraph (from Professional Summary)
- Education timeline:
  - M.S. Artificial Intelligence @ University of Science (2025-Present)
  - B.S. Data Science @ University of Information Technology (2020-2024, GPA 8.22/10)
- Key highlights: "Graduated 6 months early", "Q2 Publication Author"

**Visual:**
- Vertical timeline with connecting line
- Icons for each education milestone
- Card-based layout with hover elevation

**Interaction:**
- Timeline items animate in on scroll (stagger 100ms)
- Hover on cards: slight lift + shadow increase

---

### 4.3 Skills Section

**Purpose:** Demonstrate technical breadth and depth at a glance.

**Content - 5 Skill Groups:**

| Group | Skills |
|-------|--------|
| Languages | Python, SQL, JavaScript, C++, HTML/CSS |
| Databases & Big Data | PostgreSQL, MongoDB, Cassandra, Redis, Apache Spark, Apache Kafka, Hadoop |
| Cloud & DevOps | AWS (EC2, S3, RDS, Glue, Lambda, Athena, SSM), Docker, CI/CD |
| Workflow & Tools | Celery, GitHub Actions, FastAPI, Postman, Playwright, Selenium, React, Git |
| AI/ML & Domain | Data Warehousing, ETL, Web Scraping, NLP (PhoBERT, FastText), LLMs, Deep Learning |

**Visual:**
- NOT progress bars (anti-pattern for skills)
- Interactive node graph: each skill = node, grouped by category
- Node size = proficiency (implicit), color = category
- Click node → modal with: skill name, years of experience, project examples

**Interaction:**
- Hover node: glow effect, show tooltip with skill name
- Click node: open SkillDetailModal with context
- Filter buttons: "All", "Core", "Nice to have"

---

### 4.4 Experience Section

**Purpose:** Prove impact through measurable achievements.

**Content - BA3 Studio (Nov 2024 - Present):**

**Role:** Data Engineer

**Achievements (as metrics):**
- 📊 "Architected ETL pipelines processing **millions of records** daily"
- ⚡ "Reduced manual extraction time by **automating API ingestion** across 3 platforms"
- 🚀 "Deployed CI/CD pipelines reducing deployment time from hours to **minutes**"
- 📈 "Built APIs serving data with **minimal latency** to downstream dashboards"

**Visual:**
- Company logo/header
- Metric cards with animated counters (0 → value on scroll)
- Mini pipeline diagram: EC2 → S3 → Glue → Lambda → PostgreSQL

**Interaction:**
- Pipeline diagram: animated data flow (particles moving through nodes)
- Metric cards: count up animation when in viewport
- Expandable details: click to see full job description

---

### 4.5 Projects & Publications Section

**Purpose:** Showcase depth through case study format.

**Project 1: RRS - Review-based Recommendation System**

| Field | Content |
|-------|---------|
| Problem | Vietnamese e-commerce reviews are unstructured; brands lack insight into customer sentiment |
| Solution | Deep learning + NLP (PhoBERT, FastText, LSTM) to extract context from real-time comments |
| Impact | Outperformed SOTA methods; Published in SN Computer Science (Q2, SJR) |
| Tech Stack | Kafka, Spark, Cassandra, Neural CF, Keras |
| Link | doi.org/10.1007/s42979-024-02812-6 |

**Project 2: Co-NAML-LSTUR - News Recommendation System**

| Field | Content |
|-------|---------|
| Problem | News recommendation requires understanding both short-term clicks and long-term interests |
| Solution | Hybrid framework with dual-scale user modeling + BERT embeddings |
| Impact | Published at MIWAI 2025 (Springer); Outperformed NRMS, NAML baselines |
| Tech Stack | BERT, Multi-view learning, Dual-scale modeling |
| Link | doi.org/10.1007/978-981-95-4960-3_9 |

**Visual:**
- Card-based layout with tab/accordion for each project
- Each project: Problem (red icon) → Solution (blue icon) → Impact (green icon)
- Publication badge for Q2 journal + conference

**Interaction:**
- Card hover: lift + reveal "View Details" button
- Expand: accordion animation to show full case study
- External link: open in new tab with icon indicator

---

### 4.6 Life & Interests Section

**Purpose:** Show personality and cultural fit - the "human behind the data".

**Content:**

| Widget | Content | Visual Metaphor |
|--------|---------|-----------------|
| Music | "Passionate about music" | Audio waveform visualization |
| Sports | Football, Billiards, Badminton | Activity tracker with icons |
| Travel | "Love exploring new places" | Mini world map with markers |
| Social | Facebook: ThuatNguyen992, Networking | Connection graph / network nodes |

**Visual:**
- Dashboard grid layout (2x2 on desktop, 1x4 on mobile)
- Each widget: icon + short text + mini-visualization
- Color-coded: Music (purple), Sports (orange), Travel (green), Social (blue)

**Interaction:**
- Widget hover: scale 1.05, show more details
- Click widget: expand to show more content (e.g., travel photos, favorite songs)
- Facebook link: opens in new tab

---

### 4.7 Contact Section

**Purpose:** Make it easy for recruiters to reach out.

**Content:**
- Email: thuatnguyen2k2info@gmail.com
- GitHub: github.com/ThuatNguyenZ
- LinkedIn: linkedin.com/in/thuat-nguyen1306/
- Phone: +84 942 389 852
- Location: Ho Chi Minh City, Vietnam

**Visual:**
- Large, clear contact cards with icons
- "Download CV" button (prominent, green CTA)
- Social links as icon row

**Interaction:**
- Click email: copy to clipboard + toast notification
- Click social: open in new tab
- Download CV: trigger PDF download

---

## 5. Responsive Behavior

### 5.1 Breakpoints

| Name | Width | Layout Changes |
|------|-------|----------------|
| Mobile | < 640px | Single column, stacked widgets |
| Tablet | 640px - 1024px | 2-column grid for skills/projects |
| Desktop | > 1024px | Full multi-column layouts |

### 5.2 Mobile-Specific Adaptations

- Navigation: Hamburger menu → slide-in drawer
- Hero: Reduce particle density for performance
- Skills: Horizontal scroll instead of grid
- Timeline: Compact vertical layout
- Life Dashboard: Stack widgets vertically

---

## 6. Error Handling & Edge Cases

| Scenario | Behavior |
|----------|----------|
| Slow network | Show skeleton loaders, lazy load sections |
| JS disabled | Graceful degradation: static content visible |
| Image fail | Fallback to colored placeholder with alt text |
| Mobile Safari | Test animations for performance issues |
| PDF download fail | Show error toast with "Try again" option |

---

## 7. Testing Strategy

### 7.1 Automated Tests

| Test Type | Coverage | Tool |
|-----------|----------|------|
| Unit Tests | Utility functions, hooks | Jest + React Testing Library |
| Component Tests | All interactive components | React Testing Library |
| E2E Tests | Critical user flows (nav, contact, download) | Playwright |

### 7.2 Manual QA Checklist

- [ ] All sections render correctly on mobile/tablet/desktop
- [ ] Animations are smooth (60fps) on mid-range devices
- [ ] All external links work
- [ ] CV download works
- [ ] Contact links (email, LinkedIn, GitHub) functional
- [ ] Accessibility: keyboard navigation, screen reader basics

---

## 8. Performance Goals

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.5s |
| Time to Interactive | < 3s |
| Lighthouse Performance | > 90 |
| Bundle Size (gzipped) | < 200KB |

### 8.1 Optimization Strategies

- Code splitting by section
- Lazy load images and animations
- Defer non-critical JS
- Use SVG for icons/diagrams
- Compress CV PDF

---

## 9. Accessibility Requirements

- [ ] Semantic HTML (header, main, section, footer)
- [ ] ARIA labels on interactive elements
- [ ] Keyboard navigation for all interactions
- [ ] Color contrast ratio > 4.5:1
- [ ] Alt text on all images
- [ ] Focus indicators visible

---

## 10. Future Enhancements (Out of Scope v1)

- Blog section for technical writing
- Dark mode toggle
- Multi-language support (EN/VI)
- Contact form with backend
- Analytics dashboard integration
- Real-time visitor counter (fun data engineer flex)

---

## 11. File Structure

```
profile/
├── src/
│   ├── components/
│   │   ├── Header/
│   │   ├── Hero/
│   │   ├── About/
│   │   ├── Skills/
│   │   ├── Experience/
│   │   ├── Projects/
│   │   ├── Life/
│   │   ├── Contact/
│   │   └── Footer/
│   ├── hooks/
│   │   ├── useProfile.js
│   │   ├── useScrollAnimation.js
│   │   └── useClipboard.js
│   ├── context/
│   │   └── ProfileContext.js
│   ├── data/
│   │   ├── cv.json
│   │   ├── projects.json
│   │   └── skills.json
│   ├── styles/
│   │   ├── globals.css
│   │   └── animations.css
│   ├── utils/
│   │   └── animations.js
│   ├── App.jsx
│   └── main.jsx
├── public/
│   ├── cv.pdf
│   ├── images/
│   └── favicon.ico
├── docs/
│   └── superpowers/specs/
│       └── 2026-03-28-nguyen-thien-thuat-portfolio-design.md
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 12. Acceptance Criteria

Portfolio is complete when:

1. [ ] All 7 sections implemented and responsive
2. [ ] Animations are smooth and not distracting
3. [ ] CV PDF downloadable
4. [ ] All external links functional
5. [ ] Passes basic Lighthouse audit (>90 performance, >90 accessibility)
6. [ ] Tested on Chrome, Firefox, Safari, Edge
7. [ ] Mobile tested on iOS and Android devices
8. [ ] Deployed to production URL

---

*Document Version: 1.0*
*Last Updated: March 28, 2026*
