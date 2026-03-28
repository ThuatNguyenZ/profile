# Nguyen Thien Thuat Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a React-based personal portfolio website for a Data Engineer with 7 interactive sections, data-driven visualizations, and smooth animations.

**Architecture:** Single-page React application with component-based architecture, static JSON data layer, custom hooks for data access, and Framer Motion for animations. Components are organized by section with shared utilities for animations and common UI elements.

**Tech Stack:** React 18+, Vite, Tailwind CSS, Framer Motion, Recharts, Lucide React icons

---

## File Structure

```
profile/
├── public/
│   ├── cv.pdf
│   └── images/
│       └── profile.jpg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── common/
│   │   │   ├── Section.jsx
│   │   │   ├── AnimatedCounter.jsx
│   │   │   ├── SkillNode.jsx
│   │   │   └── SocialLink.jsx
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Experience.jsx
│   │   ├── Projects.jsx
│   │   ├── Life.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── data/
│   │   ├── profile.js
│   │   ├── skills.js
│   │   ├── experience.js
│   │   ├── projects.js
│   │   └── life.js
│   ├── hooks/
│   │   ├── useScrollAnimation.js
│   │   └── useClipboard.js
│   ├── styles/
│   │   └── index.css
│   ├── utils/
│   │   └── animations.js
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

---

## Phase 1: Project Setup

### Task 1: Initialize Vite + React Project

**Files:**
- Create: `package.json`, `vite.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`

- [ ] **Step 1: Initialize npm project and install dependencies**

```bash
cd "D:/career/MyApp/profile"
npm create vite@latest . -- --template react
npm install framer-motion recharts lucide-react react-router-dom
npm install -D tailwindcss postcss autoprefixer
```

- [ ] **Step 2: Initialize Tailwind CSS**

```bash
npx tailwindcss init -p
```

- [ ] **Step 3: Configure tailwind.config.js**

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A5F',
        secondary: '#3B82F6',
        accent: '#10B981',
        surface: '#F8FAFC',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'flow': 'flow 3s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        flow: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 4: Update src/styles/index.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', system-ui, sans-serif;
  @apply text-primary bg-white;
}

.font-mono {
  font-family: 'JetBrains Mono', monospace;
}
```

- [ ] **Step 5: Update src/main.jsx**

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 6: Update src/App.jsx**

```jsx
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Life from './components/Life'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Life />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
```

- [ ] **Step 7: Update index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Nguyen Thien Thuat - Data Engineer portfolio showcasing scalable data pipelines, ETL systems, and AI/ML projects" />
    <meta name="author" content="Nguyen Thien Thuat" />
    <title>Nguyen Thien Thuat | Data Engineer</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 8: Update vite.config.js**

```javascript
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
})
```

- [ ] **Step 9: Verify setup runs**

```bash
npm run dev
```

Expected: Vite dev server starts on http://localhost:5173

- [ ] **Step 10: Commit**

```bash
git add .
git commit -m "feat: initialize Vite + React project with Tailwind CSS"
```

---

### Task 2: Create Data Layer

**Files:**
- Create: `src/data/profile.js`, `src/data/skills.js`, `src/data/experience.js`, `src/data/projects.js`, `src/data/life.js`

- [ ] **Step 1: Create src/data/profile.js**

```javascript
export const profile = {
  name: 'Nguyen Thien Thuat',
  title: 'Data Engineer',
  tagline: 'Building scalable data pipelines that power intelligent products',
  location: 'Ho Chi Minh City, Vietnam',
  contact: {
    email: 'thuatnguyen2k2info@gmail.com',
    phone: '+84 942 389 852',
    github: 'https://github.com/ThuatNguyenZ',
    linkedin: 'https://linkedin.com/in/thuat-nguyen1306/',
    facebook: 'https://www.facebook.com/ThuatNguyen992',
  },
  bio: `Results-driven Data Engineer with a strong product-thinking mindset, experienced in architecting scalable ETL pipelines, automated ingestion systems, and real-time streaming architectures (Kafka, Spark). Proficient in the AWS ecosystem with a readiness to adapt to hybrid cloud environments. Proven ability to deliver high-quality data products to downstream consumers and bridge the gap between robust data infrastructure and advanced AI/ML research.`,
}

export const education = [
  {
    degree: 'Master of Science in Artificial Intelligence',
    school: 'University of Science – VNU-HCM',
    period: 'Sep. 2025 – Present',
    location: 'Ho Chi Minh City, Vietnam',
  },
  {
    degree: 'Bachelor of Science in Data Science',
    school: 'University of Information Technology – VNU-HCM',
    period: 'Sep. 2020 – May 2024',
    location: 'Ho Chi Minh City, Vietnam',
    gpa: '8.22/10.0',
    highlight: 'Graduated early (completed 4-year program in 3.5 years)',
  },
]
```

- [ ] **Step 2: Create src/data/skills.js**

```javascript
export const skillCategories = [
  {
    id: 'languages',
    name: 'Languages',
    icon: 'Code',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'SQL', level: 85 },
      { name: 'JavaScript', level: 75 },
      { name: 'C++', level: 70 },
      { name: 'HTML/CSS', level: 70 },
    ],
  },
  {
    id: 'databases',
    name: 'Databases & Big Data',
    icon: 'Database',
    skills: [
      { name: 'PostgreSQL', level: 85 },
      { name: 'MongoDB', level: 80 },
      { name: 'Cassandra', level: 75 },
      { name: 'Redis', level: 80 },
      { name: 'Apache Spark', level: 85 },
      { name: 'Apache Kafka', level: 80 },
      { name: 'Hadoop', level: 70 },
    ],
  },
  {
    id: 'cloud',
    name: 'Cloud & DevOps',
    icon: 'Cloud',
    skills: [
      { name: 'AWS (EC2, S3, RDS, Glue, Lambda)', level: 85 },
      { name: 'Docker', level: 80 },
      { name: 'CI/CD Pipelines', level: 80 },
    ],
  },
  {
    id: 'workflow',
    name: 'Workflow & Tools',
    icon: 'Settings',
    skills: [
      { name: 'Celery', level: 80 },
      { name: 'GitHub Actions', level: 85 },
      { name: 'FastAPI', level: 85 },
      { name: 'Playwright', level: 75 },
      { name: 'Selenium', level: 75 },
      { name: 'React', level: 70 },
      { name: 'Git', level: 85 },
    ],
  },
  {
    id: 'aiml',
    name: 'AI/ML & Domain',
    icon: 'Brain',
    skills: [
      { name: 'Data Warehousing', level: 80 },
      { name: 'ETL Pipelines', level: 90 },
      { name: 'Web Scraping', level: 85 },
      { name: 'NLP (PhoBERT, FastText)', level: 80 },
      { name: 'LLMs (LangChain, DeepSeek)', level: 75 },
      { name: 'Deep Learning (Keras)', level: 80 },
    ],
  },
]
```

- [ ] **Step 3: Create src/data/experience.js**

```javascript
export const experiences = [
  {
    company: 'BA3 Studio',
    website: 'https://demo.ba3.studio',
    role: 'Data Engineer',
    period: 'Nov. 2024 – Present',
    location: 'Ho Chi Minh City, Vietnam',
    description: 'Data-driven service & software for digital commerce. Helps brands optimize every move through data-driven innovation on dashboards, AI-powered recommendations on factors that directly affect revenue such as promotion and keyword on Shopee, TikTokshop, Lazada and other platforms.',
    technologies: [
      'AWS (EC2, S3, RDS, Glue, Lambda)',
      'GitHub Actions',
      'PostgreSQL',
      'FastAPI',
      'Redis',
      'Celery',
      'Docker',
      'React',
    ],
    achievements: [
      {
        metric: 'Millions',
        label: 'Records processed daily via ETL pipelines',
        icon: 'Database',
      },
      {
        metric: '3',
        label: 'E-commerce platforms automated (Shopee, TikTok, Lazada)',
        icon: 'ShoppingCart',
      },
      {
        metric: '-90%',
        label: 'Reduction in manual extraction time',
        icon: 'Clock',
      },
      {
        metric: 'Minutes',
        label: 'Deployment time with CI/CD (from hours)',
        icon: 'Rocket',
      },
    ],
    pipeline: {
      title: 'Data Architecture',
      stages: [
        { name: 'EC2', description: 'Data Ingestion' },
        { name: 'S3', description: 'Raw Storage' },
        { name: 'Glue', description: 'ETL Processing' },
        { name: 'Lambda', description: 'Real-time Processing' },
        { name: 'PostgreSQL', description: 'Structured Storage' },
      ],
    },
  },
]
```

- [ ] **Step 4: Create src/data/projects.js**

```javascript
export const projects = [
  {
    id: 'rrs',
    title: 'RRS: Review-based Recommendation System',
    subtitle: 'Using Deep Learning for Vietnamese E-commerce',
    period: 'Jan. 2023 – Dec. 2023',
    institution: 'University of Information Technology - VNU-HCM',
    description: 'A deep learning-based recommendation system combined with an advanced NLP model to capture context from real-time Vietnamese user comments, outperforming recent state-of-the-art (SOTA) methods.',
    problem: 'Vietnamese e-commerce reviews are unstructured; brands lack insight into customer sentiment and product feedback.',
    solution: 'Deep learning + NLP (PhoBERT, FastText, LSTM) to extract context from real-time comments using Neural Collaborative Filtering architecture.',
    impact: 'Outperformed SOTA methods on specialized datasets. Published in SN Computer Science journal (Q2 ranking according to SJR).',
    technologies: ['Apache Kafka', 'Apache Spark', 'Cassandra', 'Neural CF', 'PhoBERT', 'FastText', 'LSTM', 'Keras'],
    publication: {
      journal: 'SN Computer Science',
      rank: 'Q2 (SJR)',
      doi: 'https://doi.org/10.1007/s42979-024-02812-6',
      status: 'Published',
    },
    award: 'Submitted for UIT School Award',
  },
  {
    id: 'news-rec',
    title: 'Co-NAML-LSTUR: News Recommendation System',
    subtitle: 'Hybrid Framework with Dual-Scale User Modeling',
    period: 'Jan. 2024 – Nov. 2025',
    institution: 'University of Science - VNU-HCM',
    description: 'A resource-efficient hybrid news recommendation framework that integrates attentive multi-view news encoding with dual-scale user modeling (short- and long-term preferences).',
    problem: 'News recommendation requires understanding both short-term click behavior and long-term user interests while operating in resource-limited environments.',
    solution: 'Hybrid framework combining multi-view learning with BERT-based embeddings and dual-scale user modeling for efficient semantic representation.',
    impact: 'Outperformed strong baselines (NRMS, NAML) in practical resource-limited environments. Published at MIWAI 2025 conference.',
    technologies: ['BERT', 'Multi-view Learning', 'Dual-scale Modeling', 'Attention Mechanisms'],
    publication: {
      conference: '18th Multi-Disciplinary International Conference on AI (MIWAI 2025)',
      publisher: 'Springer Nature',
      doi: 'https://doi.org/10.1007/978-981-95-4960-3_9',
      status: 'Published',
    },
  },
]
```

- [ ] **Step 5: Create src/data/life.js**

```javascript
export const lifeInterests = {
  music: {
    title: 'Music',
    description: 'Passionate about music - always have melodies playing while coding.',
    icon: 'Music',
    color: '#8B5CF6',
    visualization: {
      type: 'waveform',
      data: [40, 65, 45, 80, 55, 90, 70, 85, 60, 75],
    },
  },
  sports: {
    title: 'Sports',
    description: 'Active lifestyle keeps mind and body sharp.',
    icon: 'Trophy',
    color: '#F97316',
    activities: [
      { name: 'Football', icon: 'Circle', level: 'Regular' },
      { name: 'Billiards', icon: 'CircleDot', level: 'Enthusiast' },
      { name: 'Badminton', icon: 'Circle', level: 'Casual' },
    ],
    visualization: {
      type: 'activity',
      weeklyHours: [2, 3, 1, 4, 2, 3, 2],
    },
  },
  travel: {
    title: 'Travel & Exploration',
    description: 'Love discovering new places, cultures, and perspectives.',
    icon: 'Map',
    color: '#10B981',
    places: ['Vietnam', 'Thailand', 'Singapore', 'Japan'],
    visualization: {
      type: 'map',
      markers: 4,
    },
  },
  social: {
    title: 'Networking & Connection',
    description: 'Enjoy building meaningful connections with diverse people.',
    icon: 'Users',
    color: '#3B82F6',
    links: {
      facebook: 'https://www.facebook.com/ThuatNguyen992',
    },
    visualization: {
      type: 'network',
      connections: 500,
    },
  },
}
```

- [ ] **Step 6: Create src/data/index.js (barrel export)**

```javascript
export * from './profile'
export * from './skills'
export * from './experience'
export * from './projects'
export * from './life'
```

- [ ] **Step 7: Commit**

```bash
git add src/data/
git commit -m "feat: create data layer with profile, skills, experience, projects, life content"
```

---

## Phase 2: Core Components

### Task 3: Create Common UI Components

**Files:**
- Create: `src/components/common/Section.jsx`, `src/components/common/AnimatedCounter.jsx`, `src/components/common/SkillNode.jsx`, `src/components/common/SocialLink.jsx`

- [ ] **Step 1: Create src/components/common/Section.jsx**

```jsx
import { motion } from 'framer-motion'

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

export default function Section({
  children,
  className = '',
  backgroundColor = 'white',
  id = ''
}) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={sectionVariants}
      className={`py-20 px-4 md:px-8 lg:px-16 ${className}`}
      style={{ backgroundColor }}
    >
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </motion.section>
  )
}
```

- [ ] **Step 2: Create src/components/common/AnimatedCounter.jsx**

```jsx
import { useEffect, useRef } from 'react'
import { motion, useInView, useSpring } from 'framer-motion'

export default function AnimatedCounter({ value, duration = 2 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [displayValue, setDisplayValue] = useSpring(0, {
    duration: duration * 1000,
    ease: 'easeOut',
  })

  useEffect(() => {
    if (isInView) {
      displayValue.set(value)
    }
  }, [isInView, value, displayValue])

  useEffect(() => {
    const unsubscribe = displayValue.on('change', (latest) => {
      setDisplayValue(Math.round(latest))
    })
    return () => unsubscribe()
  }, [displayValue, setDisplayValue])

  return (
    <motion.span ref={ref}>
      {displayValue}
    </motion.span>
  )
}
```

- [ ] **Step 3: Create src/components/common/SkillNode.jsx**

```jsx
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

export default function SkillNode({
  name,
  level,
  color,
  onClick,
  delay = 0
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{ scale: 1.1, boxShadow: '0 10px 40px rgba(0,0,0,0.15)' }}
      onClick={onClick}
      className="cursor-pointer bg-white rounded-xl p-4 shadow-md border-l-4 transition-all"
      style={{ borderColor: color }}
    >
      <div className="flex flex-col items-center text-center">
        <span className="font-semibold text-gray-800 text-sm">{name}</span>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div
            className="h-2 rounded-full transition-all duration-500"
            style={{
              width: `${level}%`,
              backgroundColor: color,
            }}
          />
        </div>
      </div>
    </motion.div>
  )
}
```

- [ ] **Step 4: Create src/components/common/SocialLink.jsx**

```jsx
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

export default function SocialLink({
  href,
  icon: Icon,
  label,
  color = 'text-primary'
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center gap-2 ${color} hover:opacity-80 transition-opacity`}
    >
      <Icon size={20} />
      <span className="hidden md:inline">{label}</span>
    </motion.a>
  )
}
```

- [ ] **Step 5: Commit**

```bash
git add src/components/common/
git commit -m "feat: create common UI components (Section, AnimatedCounter, SkillNode, SocialLink)"
```

---

### Task 4: Create Header Component

**Files:**
- Create: `src/components/Header.jsx`

- [ ] **Step 1: Create src/components/Header.jsx**

```jsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react'
import SocialLink from './common/SocialLink'

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'life', label: 'Life' },
  { id: 'contact', label: 'Contact' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-xl font-bold text-primary cursor-pointer"
            onClick={() => scrollToSection('home')}
          >
            NTT<span className="text-secondary">.</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-600 hover:text-secondary transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Social Links */}
          <div className="hidden md:flex items-center gap-4">
            <SocialLink href="https://github.com/ThuatNguyenZ" icon={Github} label="" />
            <SocialLink href="https://linkedin.com/in/thuat-nguyen1306/" icon={Linkedin} label="" />
            <SocialLink href="mailto:thuatnguyen2k2info@gmail.com" icon={Mail} label="" />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-primary"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4 border-t pt-4"
            >
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-left text-gray-600 hover:text-secondary font-medium py-2"
                  >
                    {item.label}
                  </button>
                ))}
                <div className="flex gap-4 pt-4 border-t">
                  <SocialLink href="https://github.com/ThuatNguyenZ" icon={Github} label="GitHub" />
                  <SocialLink href="https://linkedin.com/in/thuat-nguyen1306/" icon={Linkedin} label="LinkedIn" />
                  <SocialLink href="mailto:thuatnguyen2k2info@gmail.com" icon={Mail} label="Email" />
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Header.jsx
git commit -m "feat: create Header component with responsive navigation"
```

---

### Task 5: Create Hero Component

**Files:**
- Create: `src/components/Hero.jsx`, `src/components/Hero/DataPipelineBackground.jsx`

- [ ] **Step 1: Create src/components/Hero/DataPipelineBackground.jsx**

```jsx
import { useEffect, useRef } from 'react'

export default function DataPipelineBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationId
    let particles = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Create particles
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = Math.random() * 0.5 + 0.5
        this.vy = Math.random() * 0.5 - 0.25
        this.radius = Math.random() * 2 + 1
        this.opacity = Math.random() * 0.5 + 0.2
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`
        ctx.fill()
      }
    }

    // Initialize particles
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle())
    }

    // Draw connections
    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / 100)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(30, 58, 95, 0.95)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })
      drawConnections()

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ top: 0 }}
    />
  )
}
```

- [ ] **Step 2: Create src/components/Hero.jsx**

```jsx
import { motion } from 'framer-motion'
import { ArrowDown, Mail, Github, Linkedin } from 'lucide-react'
import DataPipelineBackground from './DataPipelineBackground'
import { profile } from '../data/profile'

export default function Hero() {
  return (
    <>
      <DataPipelineBackground />

      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-20 text-center text-white relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-secondary font-medium mb-4"
            >
              Hello, I'm
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold mb-4"
            >
              {profile.name}
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-4xl text-secondary mb-6"
            >
              {profile.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8"
            >
              {profile.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center gap-4 mb-12"
            >
              <a
                href={profile.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              >
                <Github size={24} />
              </a>
              <a
                href={profile.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              >
                <Linkedin size={24} />
              </a>
              <a
                href={`mailto:${profile.contact.email}`}
                className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              >
                <Mail size={24} />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center justify-center gap-4"
            >
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 bg-secondary rounded-full font-medium hover:bg-blue-600 transition-colors"
              >
                View My Work
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 bg-white/10 border border-white/30 rounded-full font-medium hover:bg-white/20 transition-colors"
              >
                Contact Me
              </button>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <ArrowDown size={32} className="text-white/50" />
          </motion.div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero/
git commit -m "feat: create Hero section with animated data pipeline background"
```

---

## Phase 3: Content Sections

### Task 6: Create About Component

**Files:**
- Create: `src/components/About.jsx`

- [ ] **Step 1: Create src/components/About.jsx**

```jsx
import { motion } from 'framer-motion'
import { MapPin, GraduationCap, Award } from 'lucide-react'
import Section from './common/Section'
import { profile, education } from '../data/profile'

export default function About() {
  return (
    <Section id="about" backgroundColor="white">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-primary mb-4"
        >
          About Me
        </motion.h2>
        <div className="w-20 h-1 bg-secondary mx-auto" />
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="prose prose-lg"
        >
          <p className="text-gray-600 leading-relaxed">
            {profile.bio}
          </p>

          <div className="flex items-center gap-2 mt-6 text-gray-500">
            <MapPin size={20} />
            <span>{profile.location}</span>
          </div>
        </motion.div>

        {/* Education Timeline */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
            <GraduationCap size={24} />
            Education
          </h3>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-secondary" />

            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-12 pb-8 last:pb-0"
              >
                {/* Timeline dot */}
                <div className="absolute left-2 top-1 w-4 h-4 bg-secondary rounded-full border-4 border-white shadow" />

                <div className="bg-surface rounded-xl p-4">
                  <h4 className="font-bold text-primary">{edu.degree}</h4>
                  <p className="text-secondary font-medium">{edu.school}</p>
                  <p className="text-gray-500 text-sm mt-1">{edu.period}</p>
                  {edu.gpa && (
                    <p className="text-gray-500 text-sm">GPA: {edu.gpa}</p>
                  )}
                  {edu.highlight && (
                    <div className="flex items-center gap-2 mt-2 text-accent text-sm font-medium">
                      <Award size={16} />
                      <span>{edu.highlight}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/About.jsx
git commit -m "feat: create About section with bio and education timeline"
```

---

### Task 7: Create Skills Component

**Files:**
- Create: `src/components/Skills.jsx`

- [ ] **Step 1: Create src/components/Skills.jsx**

```jsx
import { useState } from 'framer-motion'
import { motion } from 'framer-motion'
import { Code, Database, Cloud, Settings, Brain, X } from 'lucide-react'
import Section from './common/Section'
import SkillNode from './common/SkillNode'
import { skillCategories } from '../data/skills'

const iconMap = {
  Code,
  Database,
  Cloud,
  Settings,
  Brain,
}

const categoryColors = {
  languages: '#3B82F6',
  databases: '#10B981',
  cloud: '#F59E0B',
  workflow: '#8B5CF6',
  aiml: '#EC4899',
}

export default function Skills() {
  const [selectedSkill, setSelectedSkill] = useState(null)

  return (
    <Section id="skills" backgroundColor="#F8FAFC">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-primary mb-4"
        >
          Technical Skills
        </motion.h2>
        <div className="w-20 h-1 bg-secondary mx-auto mb-4" />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-gray-600 max-w-2xl mx-auto"
        >
          A comprehensive toolkit for building scalable data systems
        </motion.p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {skillCategories.map((category) => {
          const Icon = iconMap[category.icon]
          return (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-white rounded-full shadow-sm font-medium text-gray-700 flex items-center gap-2 hover:shadow-md transition-shadow"
            >
              <Icon size={18} style={{ color: categoryColors[category.id] }} />
              {category.name}
            </motion.button>
          )
        })}
      </div>

      {/* Skills Grid by Category */}
      <div className="space-y-12">
        {skillCategories.map((category, categoryIndex) => {
          const Icon = iconMap[category.icon]
          const color = categoryColors[category.id]

          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <h3
                className="text-xl font-bold text-primary mb-4 flex items-center gap-2"
                style={{ color }}
              >
                <Icon size={24} />
                {category.name}
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <SkillNode
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    color={color}
                    delay={skillIndex * 0.05}
                    onClick={() => setSelectedSkill(skill)}
                  />
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Skill Detail Modal */}
      {selectedSkill && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedSkill(null)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-primary">
                {selectedSkill.name}
              </h3>
              <button
                onClick={() => setSelectedSkill(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <p className="text-gray-600 mb-4">
              Proficiency Level: {selectedSkill.level}%
            </p>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="h-4 rounded-full bg-secondary transition-all duration-500"
                style={{ width: `${selectedSkill.level}%` }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </Section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Skills.jsx
git commit -m "feat: create Skills section with interactive skill nodes"
```

---

### Task 8: Create Experience Component

**Files:**
- Create: `src/components/Experience.jsx`

- [ ] **Step 1: Create src/components/Experience.jsx**

```jsx
import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink } from 'lucide-react'
import Section from './common/Section'
import AnimatedCounter from './common/AnimatedCounter'
import { experiences } from '../data/experience'

const iconMap = {
  Database: '📊',
  ShoppingCart: '🛒',
  Clock: '⏱️',
  Rocket: '🚀',
}

export default function Experience() {
  return (
    <Section id="experience" backgroundColor="white">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-primary mb-4"
        >
          Work Experience
        </motion.h2>
        <div className="w-20 h-1 bg-secondary mx-auto" />
      </div>

      {experiences.map((exp, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          {/* Company Header */}
          <div className="bg-primary rounded-2xl p-6 mb-6 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold">{exp.company}</h3>
                <p className="text-secondary font-medium">{exp.role}</p>
                <p className="text-gray-300 text-sm mt-1">
                  {exp.period} • {exp.location}
                </p>
              </div>
              {exp.website && (
                <a
                  href={exp.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-secondary hover:text-blue-300 transition-colors"
                >
                  <span>Visit Website</span>
                  <ExternalLink size={18} />
                </a>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-6">{exp.description}</p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-8">
            {exp.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-surface rounded-full text-sm text-gray-600"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Achievement Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {exp.achievements.map((achievement, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-surface rounded-xl p-4 text-center"
              >
                <div className="text-3xl mb-2">{iconMap[achievement.icon]}</div>
                <div className="text-2xl md:text-3xl font-bold text-secondary mb-1">
                  <AnimatedCounter value={achievement.metric} />
                </div>
                <p className="text-gray-600 text-sm">{achievement.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Pipeline Diagram */}
          {exp.pipeline && (
            <div className="bg-surface rounded-xl p-6">
              <h4 className="font-bold text-primary mb-4">{exp.pipeline.title}</h4>
              <div className="flex flex-wrap items-center gap-4">
                {exp.pipeline.stages.map((stage, i) => (
                  <motion.div
                    key={stage.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center"
                  >
                    <div className="bg-white rounded-lg p-3 text-center min-w-[100px] shadow">
                      <div className="font-bold text-primary">{stage.name}</div>
                      <div className="text-xs text-gray-500">{stage.description}</div>
                    </div>
                    {i < exp.pipeline.stages.length - 1 && (
                      <ArrowRight className="text-secondary mx-2" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      ))}
    </Section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Experience.jsx
git commit -m "feat: create Experience section with metrics and pipeline visualization"
```

---

### Task 9: Create Projects Component

**Files:**
- Create: `src/components/Projects.jsx`

- [ ] **Step 1: Create src/components/Projects.jsx**

```jsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, BookOpen, Award, Lightbulb, Zap, Target } from 'lucide-react'
import Section from './common/Section'
import { projects } from '../data/projects'

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <Section id="projects" backgroundColor="#F8FAFC">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-primary mb-4"
        >
          Projects & Publications
        </motion.h2>
        <div className="w-20 h-1 bg-secondary mx-auto mb-4" />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-gray-600 max-w-2xl mx-auto"
        >
          Research and projects at the intersection of Data Engineering and AI/ML
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
            onClick={() => setSelectedProject(project)}
            className="bg-white rounded-2xl p-6 cursor-pointer shadow-md hover:shadow-xl transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-primary">{project.title}</h3>
                <p className="text-secondary text-sm mt-1">{project.subtitle}</p>
              </div>
              {project.publication?.rank && (
                <span className="px-3 py-1 bg-accent text-white text-xs font-medium rounded-full">
                  Q2 Journal
                </span>
              )}
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-surface rounded text-xs text-gray-600"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="px-2 py-1 text-xs text-gray-400">
                  +{project.technologies.length - 4} more
                </span>
              )}
            </div>

            {project.publication && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <BookOpen size={16} />
                <span>{project.publication.journal || project.publication.conference}</span>
              </div>
            )}

            <button className="mt-4 text-secondary font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
              View Details <ExternalLink size={14} />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl p-8 max-w-3xl w-full my-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-primary">
                    {selectedProject.title}
                  </h3>
                  <p className="text-secondary">{selectedProject.subtitle}</p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Case Study Format */}
              <div className="space-y-6">
                {/* Problem */}
                <div className="bg-red-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-red-600 font-bold mb-2">
                    <Target size={20} />
                    Problem
                  </div>
                  <p className="text-gray-700">{selectedProject.problem}</p>
                </div>

                {/* Solution */}
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-blue-600 font-bold mb-2">
                    <Lightbulb size={20} />
                    Solution
                  </div>
                  <p className="text-gray-700">{selectedProject.solution}</p>
                </div>

                {/* Impact */}
                <div className="bg-green-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-green-600 font-bold mb-2">
                    <Zap size={20} />
                    Impact
                  </div>
                  <p className="text-gray-700">{selectedProject.impact}</p>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="font-bold text-primary mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-surface rounded-full text-sm text-gray-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Publication */}
                {selectedProject.publication && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Award size={18} className="text-accent" />
                    <span>
                      Published in {selectedProject.publication.journal || selectedProject.publication.conference}
                      {selectedProject.publication.rank && ` (${selectedProject.publication.rank})`}
                    </span>
                  </div>
                )}

                {/* DOI Link */}
                {selectedProject.publication?.doi && (
                  <a
                    href={selectedProject.publication.doi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-secondary hover:text-blue-600 transition-colors"
                  >
                    <ExternalLink size={16} />
                    <span>View Publication</span>
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Projects.jsx
git commit -m "feat: create Projects section with case study modals"
```

---

### Task 10: Create Life Component

**Files:**
- Create: `src/components/Life.jsx`

- [ ] **Step 1: Create src/components/Life.jsx**

```jsx
import { motion } from 'framer-motion'
import { Music, Trophy, Map, Users, Facebook } from 'lucide-react'
import Section from './common/Section'
import { lifeInterests } from '../data/life'

const iconMap = {
  Music,
  Trophy,
  Map,
  Users,
}

export default function Life() {
  return (
    <Section id="life" backgroundColor="white">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-primary mb-4"
        >
          Life & Interests
        </motion.h2>
        <div className="w-20 h-1 bg-secondary mx-auto mb-4" />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-gray-600 max-w-2xl mx-auto"
        >
          Beyond data pipelines and algorithms
        </motion.p>
      </div>

      {/* Dashboard Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {Object.entries(lifeInterests).map(([key, interest], index) => {
          const Icon = iconMap[interest.icon]
          const color = interest.color

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="rounded-2xl p-6 shadow-md border-l-4"
              style={{
                borderColor: color,
                backgroundColor: `${color}08`,
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: `${color}20` }}
                >
                  <Icon size={24} style={{ color }} />
                </div>
                <div className="flex-1">
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ color }}
                  >
                    {interest.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{interest.description}</p>

                  {/* Content based on type */}
                  {key === 'sports' && interest.activities && (
                    <div className="flex gap-3">
                      {interest.activities.map((activity) => (
                        <div
                          key={activity.name}
                          className="px-3 py-2 bg-white rounded-lg text-center"
                        >
                          <div className="text-lg">{activity.icon === 'Circle' ? '⚽' : '🎱'}</div>
                          <div className="text-xs text-gray-500">{activity.name}</div>
                          <div className="text-xs text-secondary font-medium">{activity.level}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {key === 'travel' && interest.places && (
                    <div className="flex flex-wrap gap-2">
                      {interest.places.map((place) => (
                        <span
                          key={place}
                          className="px-3 py-1 bg-white rounded-full text-sm"
                          style={{ color }}
                        >
                          {place}
                        </span>
                      ))}
                    </div>
                  )}

                  {key === 'social' && interest.links?.facebook && (
                    <a
                      href={interest.links.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#1877F2] text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
                    >
                      <Facebook size={18} />
                      Connect on Facebook
                    </a>
                  )}

                  {key === 'music' && (
                    <div className="flex items-end gap-1 h-12 mt-4">
                      {interest.visualization?.data?.map((value, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${value}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05 }}
                          className="flex-1 rounded-t"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Life.jsx
git commit -m "feat: create Life & Interests section with dashboard-style widgets"
```

---

### Task 11: Create Contact & Footer Components

**Files:**
- Create: `src/components/Contact.jsx`, `src/components/Footer.jsx`

- [ ] **Step 1: Create src/components/Contact.jsx**

```jsx
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Github, Linkedin, Facebook, Download, Check } from 'lucide-react'
import Section from './common/Section'
import { profile } from '../data/profile'
import { useState } from 'react'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.contact.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const contactItems = [
    {
      icon: Mail,
      label: 'Email',
      value: profile.contact.email,
      href: `mailto:${profile.contact.email}`,
      onClick: copyEmail,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: profile.contact.phone,
      href: `tel:${profile.contact.phone.replace(/\s/g, '')}`,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: profile.location,
    },
  ]

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: profile.contact.github },
    { icon: Linkedin, label: 'LinkedIn', href: profile.contact.linkedin },
    { icon: Facebook, label: 'Facebook', href: profile.contact.facebook },
  ]

  return (
    <Section id="contact" backgroundColor="#F8FAFC">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-primary mb-4"
        >
          Get In Touch
        </motion.h2>
        <div className="w-20 h-1 bg-secondary mx-auto mb-4" />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-gray-600 max-w-2xl mx-auto"
        >
          Currently open to new opportunities in Data Engineering
        </motion.p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {contactItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow"
            >
              <item.icon className="mx-auto mb-4 text-secondary" size={32} />
              <h3 className="font-bold text-gray-500 text-sm mb-2">{item.label}</h3>
              {item.href ? (
                <a
                  href={item.href}
                  onClick={item.onClick}
                  className="text-primary font-medium hover:text-secondary transition-colors break-all"
                >
                  {item.value}
                </a>
              ) : (
                <p className="text-primary font-medium">{item.value}</p>
              )}
              {item.onClick && (
                <button
                  onClick={item.onClick}
                  className="mt-2 text-xs text-secondary flex items-center justify-center gap-1 mx-auto"
                >
                  {copied ? (
                    <>
                      <Check size={12} /> Copied!
                    </>
                  ) : (
                    'Click to copy'
                  )}
                </button>
              )}
            </motion.div>
          ))}
        </div>

        {/* Social Links */}
        <div className="text-center mb-8">
          <h3 className="font-bold text-primary mb-4">Connect With Me</h3>
          <div className="flex justify-center gap-6">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="flex items-center gap-2 text-gray-600 hover:text-secondary transition-colors"
              >
                <link.icon size={24} />
                <span className="hidden md:inline">{link.label}</span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Download CV Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href="/cv.pdf"
            download
            className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-white rounded-full font-medium hover:bg-green-600 transition-colors shadow-lg hover:shadow-xl"
          >
            <Download size={20} />
            Download Full CV (PDF)
          </a>
        </motion.div>
      </div>
    </Section>
  )
}
```

- [ ] **Step 2: Create src/components/Footer.jsx**

```jsx
import { Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="font-bold text-lg">{profile.name}</p>
            <p className="text-gray-400 text-sm">{profile.title}</p>
          </div>

          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>© {currentYear}</span>
            <span>•</span>
            <span>Built with</span>
            <Heart size={14} className="text-red-400" />
            <span>using React & Tailwind CSS</span>
          </div>

          <div className="text-gray-400 text-sm">
            {profile.location}
          </div>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: Update src/App.jsx to import profile**

```jsx
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Life from './components/Life'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { profile } from './data/profile'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Life />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
```

- [ ] **Step 4: Commit**

```bash
git add src/components/Contact.jsx src/components/Footer.jsx src/App.jsx
git commit -m "feat: create Contact and Footer components"
```

---

## Phase 4: Polish & Deployment

### Task 12: Add CV PDF and Final Assets

**Files:**
- Copy: `CV_DataEngineer_NguyenThienThuat.pdf` → `public/cv.pdf`

- [ ] **Step 1: Copy CV to public folder**

```bash
copy "D:\career\MyApp\profile\CV_DataEngineer_NguyenThienThuat.pdf" "D:\career\MyApp\profile\public\cv.pdf"
```

- [ ] **Step 2: Verify CV is accessible**

Start dev server and navigate to http://localhost:5173/cv.pdf

- [ ] **Step 3: Commit**

```bash
git add public/cv.pdf
git commit -m "feat: add CV PDF to public assets"
```

---

### Task 13: Update README and Package.json

**Files:**
- Modify: `README.md`, `package.json`

- [ ] **Step 1: Update README.md**

```markdown
# Nguyen Thien Thuat - Data Engineer Portfolio

Personal portfolio website showcasing my work in Data Engineering, ETL pipelines, and AI/ML projects.

## Tech Stack

- **Framework:** React 18+
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Charts:** Recharts
- **Icons:** Lucide React

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/     # React components organized by section
├── data/          # Static content (profile, skills, experience, etc.)
├── hooks/         # Custom React hooks
├── styles/        # Global styles
└── utils/         # Utility functions
```

## Deployment

This site is optimized for deployment on Vercel or Netlify.

### Vercel

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Drag and drop dist/ folder to Netlify
```

## License

© Nguyen Thien Thuat. All rights reserved.
```

- [ ] **Step 2: Update package.json metadata**

```json
{
  "name": "nguyen-thien-thuat-portfolio",
  "private": true,
  "version": "1.0.0",
  "description": "Personal portfolio website for Nguyen Thien Thuat - Data Engineer",
  "author": "Nguyen Thien Thuat <thuatnguyen2k2info@gmail.com>"
}
```

- [ ] **Step 3: Commit**

```bash
git add README.md package.json
git commit -m "docs: update README and package.json with project info"
```

---

### Task 14: Final Verification & Testing

**Files:**
- N/A

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: Build completes without errors, `dist/` folder created

- [ ] **Step 2: Preview production build**

```bash
npm run preview
```

Expected: Server starts, site loads correctly

- [ ] **Step 3: Lighthouse audit**

Open Chrome DevTools → Lighthouse → Run audit

Expected:
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

- [ ] **Step 4: Mobile testing**

Test on:
- Chrome DevTools responsive mode (iPhone, iPad, Android)
- Real mobile device if available

Checklist:
- [ ] Navigation menu works (hamburger on mobile)
- [ ] All sections are readable
- [ ] Buttons are tap-friendly
- [ ] No horizontal scroll
- [ ] Animations are smooth

- [ ] **Step 5: Cross-browser testing**

Test on: Chrome, Firefox, Safari, Edge

Checklist:
- [ ] All sections render correctly
- [ ] Animations work (or degrade gracefully)
- [ ] CV download works
- [ ] All external links functional

- [ ] **Step 6: Final commit**

```bash
git add .
git commit -m "chore: final verification and production readiness"
```

---

## Acceptance Criteria

Portfolio is complete when:

- [ ] All 7 sections implemented and responsive
- [ ] Animations are smooth and not distracting
- [ ] CV PDF downloadable
- [ ] All external links functional
- [ ] Passes Lighthouse audit (>90 all categories)
- [ ] Tested on Chrome, Firefox, Safari, Edge
- [ ] Mobile tested on iOS and Android
- [ ] Deployed to production URL

---

## Execution Options

**Plan complete and saved to** `docs/superpowers/plans/2026-03-28-nguyen-thien-thuat-portfolio-implementation.md`

**Two execution options:**

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach do you want to proceed with?**
