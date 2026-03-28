# Technical Skills UI Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace progress bars with Devicon logos and 2-level proficiency badges (Core/Familiar) for a more professional Technical Skills section.

**Architecture:** Install devicon package, create custom SVG icons for domain-specific skills, redesign SkillNode component to display icons instead of progress bars, update Skills.jsx with new data structure, remove modal popup.

**Tech Stack:** React, Devicon, Framer Motion, Tailwind CSS, custom SVGs

---

### Task 1: Install Devicon Package

**Files:**
- Modify: `package.json`
- Modify: `src/components/Skills.jsx` (import devicon CSS)

- [ ] **Step 1: Install devicon package**

Run:
```bash
npm install devicon
```

Expected: Package installed successfully

- [ ] **Step 2: Import devicon CSS**

Add to top of `src/components/Skills.jsx`:
```jsx
import 'devicon/devicon.min.css'
```

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json src/components/Skills.jsx
git commit -m "chore: install devicon for technology logos"
```

---

### Task 2: Create Custom SVG Icons for Domain Skills

**Files:**
- Create: `src/components/icons/ETLIcon.jsx`
- Create: `src/components/icons/DataWarehouseIcon.jsx`
- Create: `src/components/icons/WebScrapingIcon.jsx`
- Create: `src/components/icons/NLPIcon.jsx`
- Create: `src/components/icons/LLMIcon.jsx`
- Create: `src/components/icons/DeepLearningIcon.jsx`
- Create: `src/components/icons/CICDIcon.jsx`
- Create: `src/components/icons/index.jsx`

- [ ] **Step 1: Create icons directory**

```bash
mkdir src/components/icons
```

- [ ] **Step 2: Create ETLIcon.jsx**

```jsx
export default function ETLIcon({ size = 48, color = '#3B82F6' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="4" y="8" width="12" height="8" rx="2" fill={color} opacity="0.8"/>
      <rect x="18" y="20" width="12" height="8" rx="2" fill={color}/>
      <rect x="32" y="32" width="12" height="8" rx="2" fill={color} opacity="0.8"/>
      <path d="M16 12L18 12" stroke={color} strokeWidth="2"/>
      <path d="M30 24L32 24" stroke={color} strokeWidth="2"/>
      <path d="M24 16L24 20" stroke={color} strokeWidth="2"/>
      <path d="M24 28L24 32" stroke={color} strokeWidth="2"/>
    </svg>
  )
}
```

- [ ] **Step 3: Create DataWarehouseIcon.jsx**

```jsx
export default function DataWarehouseIcon({ size = 48, color = '#10B981' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <ellipse cx="24" cy="12" rx="16" ry="4" fill={color} opacity="0.8"/>
      <ellipse cx="24" cy="24" rx="16" ry="4" fill={color} opacity="0.6"/>
      <ellipse cx="24" cy="36" rx="16" ry="4" fill={color} opacity="0.4"/>
      <path d="M8 12L8 36" stroke={color} strokeWidth="2"/>
      <path d="M40 12L40 36" stroke={color} strokeWidth="2"/>
    </svg>
  )
}
```

- [ ] **Step 4: Create WebScrapingIcon.jsx**

```jsx
export default function WebScrapingIcon({ size = 48, color = '#F59E0B' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="8" y="8" width="32" height="24" rx="2" stroke={color} strokeWidth="2"/>
      <circle cx="24" cy="20" r="6" fill={color} opacity="0.3"/>
      <path d="M20 38L24 42L28 38" stroke={color} strokeWidth="2"/>
      <path d="M24 32L24 42" stroke={color} strokeWidth="2"/>
    </svg>
  )
}
```

- [ ] **Step 5: Create NLPIcon.jsx**

```jsx
export default function NLPIcon({ size = 48, color = '#8B5CF6' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="8" y="12" width="32" height="24" rx="4" fill={color} opacity="0.2"/>
      <path d="M14 20L20 20" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M14 28L24 28" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <circle cx="32" cy="16" r="4" fill={color}/>
      <path d="M32 20L32 32" stroke={color} strokeWidth="2"/>
      <circle cx="32" cy="36" r="3" fill={color} opacity="0.6"/>
    </svg>
  )
}
```

- [ ] **Step 6: Create LLMIcon.jsx**

```jsx
export default function LLMIcon({ size = 48, color = '#EC4899' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="14" fill={color} opacity="0.2"/>
      <circle cx="24" cy="24" r="8" fill={color} opacity="0.4"/>
      <circle cx="24" cy="24" r="4" fill={color}/>
      <circle cx="24" cy="10" r="3" fill={color} opacity="0.6"/>
      <circle cx="38" cy="24" r="3" fill={color} opacity="0.6"/>
      <circle cx="24" cy="38" r="3" fill={color} opacity="0.6"/>
      <circle cx="10" cy="24" r="3" fill={color} opacity="0.6"/>
    </svg>
  )
}
```

- [ ] **Step 7: Create DeepLearningIcon.jsx**

```jsx
export default function DeepLearningIcon({ size = 48, color = '#3B82F6' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="8" r="3" fill={color}/>
      <circle cx="12" cy="24" r="3" fill={color} opacity="0.8"/>
      <circle cx="36" cy="24" r="3" fill={color} opacity="0.8"/>
      <circle cx="24" cy="40" r="3" fill={color}/>
      <path d="M24 11L14 21" stroke={color} strokeWidth="2"/>
      <path d="M24 11L34 21" stroke={color} strokeWidth="2"/>
      <path d="M14 27L24 37" stroke={color} strokeWidth="2"/>
      <path d="M34 27L24 37" stroke={color} strokeWidth="2"/>
      <path d="M15 24L33 24" stroke={color} strokeWidth="2"/>
    </svg>
  )
}
```

- [ ] **Step 8: Create CICDIcon.jsx**

```jsx
export default function CICDIcon({ size = 48, color = '#F59E0B' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="6" y="14" width="10" height="8" rx="2" fill={color} opacity="0.6"/>
      <rect x="20" y="14" width="10" height="8" rx="2" fill={color}/>
      <rect x="34" y="14" width="10" height="8" rx="2" fill={color} opacity="0.6"/>
      <path d="M16 18L20 18" stroke={color} strokeWidth="2"/>
      <path d="M30 18L34 18" stroke={color} strokeWidth="2"/>
      <path d="M25 22L25 32L20 32" stroke={color} strokeWidth="2"/>
      <path d="M25 32L30 32" stroke={color} strokeWidth="2"/>
    </svg>
  )
}
```

- [ ] **Step 9: Create index.jsx**

```jsx
export { default as ETLIcon } from './ETLIcon'
export { default as DataWarehouseIcon } from './DataWarehouseIcon'
export { default as WebScrapingIcon } from './WebScrapingIcon'
export { default as NLPIcon } from './NLPIcon'
export { default as LLMIcon } from './LLMIcon'
export { default as DeepLearningIcon } from './DeepLearningIcon'
export { default as CICDIcon } from './CICDIcon'
```

- [ ] **Step 10: Commit**

```bash
git add src/components/icons/
git commit -m "feat: add custom SVG icons for domain-specific skills"
```

---

### Task 3: Update SkillNode Component

**Files:**
- Modify: `src/components/common/SkillNode.jsx`

- [ ] **Step 1: Rewrite SkillNode to display icons instead of progress bars**

Replace entire file content:

```jsx
import { motion } from 'framer-motion'

// Devicon class mapping
const deviconClassMap = {
  'Python': 'devicon-python-plain',
  'SQL': 'devicon-postgresql-plain',
  'JavaScript': 'devicon-javascript-plain',
  'C++': 'devicon-cplusplus-plain',
  'HTML/CSS': 'devicon-html5-plain',
  'PostgreSQL': 'devicon-postgresql-plain',
  'MongoDB': 'devicon-mongodb-plain',
  'Cassandra': 'devicon-cassandra-plain',
  'Redis': 'devicon-redis-plain',
  'Apache Spark': 'devicon-spark-plain',
  'Apache Kafka': 'devicon-apachekafka-plain',
  'Hadoop': 'devicon-hadoop-plain',
  'AWS (EC2, S3, RDS, Glue, Lambda)': 'devicon-amazonwebservices-plain',
  'Docker': 'devicon-docker-plain',
  'CI/CD Pipelines': 'cicd',
  'Celery': 'devicon-celery-plain',
  'GitHub Actions': 'devicon-github-plain',
  'FastAPI': 'devicon-fastapi-plain',
  'Playwright': 'devicon-playwright-plain',
  'Selenium': 'devicon-selenium-plain',
  'React': 'devicon-react-original',
  'Git': 'devicon-git-plain',
}

// Custom icon mapping
const customIconMap = {
  'ETL Pipelines': 'etl',
  'Data Warehousing': 'datawarehouse',
  'Web Scraping': 'webscraping',
  'NLP (PhoBERT, FastText)': 'nlp',
  'LLMs (LangChain, DeepSeek)': 'llm',
  'Deep Learning (Keras)': 'deeplearning',
}

export default function SkillNode({
  name,
  isCore,
  color,
  delay = 0
}) {
  const iconSize = isCore ? 48 : 40
  const borderWidth = isCore ? 3 : 1.5

  // Check if skill has devicon class
  const deviconClass = deviconClassMap[name]
  const customIconName = customIconMap[name]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{ scale: 1.1, boxShadow: '0 10px 40px rgba(0,0,0,0.15)' }}
      className="cursor-pointer bg-white rounded-xl p-4 shadow-md transition-all flex flex-col items-center text-center"
      style={{ borderLeftWidth: `${borderWidth}px`, borderLeftColor: color, borderLeftStyle: 'solid' }}
    >
      {/* Icon */}
      <div className="mb-3" style={{ width: iconSize, height: iconSize }}>
        {deviconClass ? (
          <i className={`${deviconClass}`} style={{ fontSize: iconSize, color }} />
        ) : customIconName ? (
          // Custom icon will be rendered via component
          <CustomIcon name={customIconName} size={iconSize} color={color} />
        ) : null}
      </div>

      {/* Skill Name */}
      <span className="font-semibold text-gray-800 text-xs mb-2 line-clamp-2">
        {name}
      </span>

      {/* Core Badge */}
      {isCore && (
        <span className="px-2 py-0.5 text-xs font-medium rounded-full" style={{ backgroundColor: `${color}20`, color }}>
          Core
        </span>
      )}
    </motion.div>
  )
}

// Custom Icon Component
function CustomIcon({ name, size, color }) {
  const icons = {
    'cicd': (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        <rect x="6" y="14" width="10" height="8" rx="2" fill={color} opacity="0.6"/>
        <rect x="20" y="14" width="10" height="8" rx="2" fill={color}/>
        <rect x="34" y="14" width="10" height="8" rx="2" fill={color} opacity="0.6"/>
        <path d="M16 18L20 18" stroke={color} strokeWidth="2"/>
        <path d="M30 18L34 18" stroke={color} strokeWidth="2"/>
        <path d="M25 22L25 32L20 32" stroke={color} strokeWidth="2"/>
        <path d="M25 32L30 32" stroke={color} strokeWidth="2"/>
      </svg>
    ),
    'etl': (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        <rect x="4" y="8" width="12" height="8" rx="2" fill={color} opacity="0.8"/>
        <rect x="18" y="20" width="12" height="8" rx="2" fill={color}/>
        <rect x="32" y="32" width="12" height="8" rx="2" fill={color} opacity="0.8"/>
        <path d="M16 12L18 12" stroke={color} strokeWidth="2"/>
        <path d="M30 24L32 24" stroke={color} strokeWidth="2"/>
        <path d="M24 16L24 20" stroke={color} strokeWidth="2"/>
        <path d="M24 28L24 32" stroke={color} strokeWidth="2"/>
      </svg>
    ),
    'datawarehouse': (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        <ellipse cx="24" cy="12" rx="16" ry="4" fill={color} opacity="0.8"/>
        <ellipse cx="24" cy="24" rx="16" ry="4" fill={color} opacity="0.6"/>
        <ellipse cx="24" cy="36" rx="16" ry="4" fill={color} opacity="0.4"/>
        <path d="M8 12L8 36" stroke={color} strokeWidth="2"/>
        <path d="M40 12L40 36" stroke={color} strokeWidth="2"/>
      </svg>
    ),
    'webscraping': (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        <rect x="8" y="8" width="32" height="24" rx="2" stroke={color} strokeWidth="2"/>
        <circle cx="24" cy="20" r="6" fill={color} opacity="0.3"/>
        <path d="M20 38L24 42L28 38" stroke={color} strokeWidth="2"/>
        <path d="M24 32L24 42" stroke={color} strokeWidth="2"/>
      </svg>
    ),
    'nlp': (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        <rect x="8" y="12" width="32" height="24" rx="4" fill={color} opacity="0.2"/>
        <path d="M14 20L20 20" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <path d="M14 28L24 28" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <circle cx="32" cy="16" r="4" fill={color}/>
        <path d="M32 20L32 32" stroke={color} strokeWidth="2"/>
        <circle cx="32" cy="36" r="3" fill={color} opacity="0.6"/>
      </svg>
    ),
    'llm': (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="14" fill={color} opacity="0.2"/>
        <circle cx="24" cy="24" r="8" fill={color} opacity="0.4"/>
        <circle cx="24" cy="24" r="4" fill={color}/>
        <circle cx="24" cy="10" r="3" fill={color} opacity="0.6"/>
        <circle cx="38" cy="24" r="3" fill={color} opacity="0.6"/>
        <circle cx="24" cy="38" r="3" fill={color} opacity="0.6"/>
        <circle cx="10" cy="24" r="3" fill={color} opacity="0.6"/>
      </svg>
    ),
    'deeplearning': (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="8" r="3" fill={color}/>
        <circle cx="12" cy="24" r="3" fill={color} opacity="0.8"/>
        <circle cx="36" cy="24" r="3" fill={color} opacity="0.8"/>
        <circle cx="24" cy="40" r="3" fill={color}/>
        <path d="M24 11L14 21" stroke={color} strokeWidth="2"/>
        <path d="M24 11L34 21" stroke={color} strokeWidth="2"/>
        <path d="M14 27L24 37" stroke={color} strokeWidth="2"/>
        <path d="M34 27L24 37" stroke={color} strokeWidth="2"/>
        <path d="M15 24L33 24" stroke={color} strokeWidth="2"/>
      </svg>
    ),
  }
  return icons[name] || null
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/common/SkillNode.jsx
git commit -m "feat: redesign SkillNode with devicon logos and Core badge"
```

---

### Task 4: Update Skills Component Data Structure

**Files:**
- Modify: `src/components/Skills.jsx`

- [ ] **Step 1: Update skill data structure**

Change from `level` (percentage) to `isCore` (boolean):

```jsx
const skillCategories = [
  {
    id: 'languages',
    name: 'Languages',
    icon: 'Code',
    skills: [
      { name: 'Python', isCore: true },
      { name: 'SQL', isCore: true },
      { name: 'JavaScript', isCore: false },
      { name: 'C++', isCore: false },
      { name: 'HTML/CSS', isCore: false },
    ],
  },
  {
    id: 'databases',
    name: 'Databases & Big Data',
    icon: 'Database',
    skills: [
      { name: 'PostgreSQL', isCore: true },
      { name: 'MongoDB', isCore: false },
      { name: 'Cassandra', isCore: false },
      { name: 'Redis', isCore: false },
      { name: 'Apache Spark', isCore: true },
      { name: 'Apache Kafka', isCore: false },
      { name: 'Hadoop', isCore: false },
    ],
  },
  {
    id: 'cloud',
    name: 'Cloud & DevOps',
    icon: 'Cloud',
    skills: [
      { name: 'AWS (EC2, S3, RDS, Glue, Lambda)', isCore: true },
      { name: 'Docker', isCore: false },
      { name: 'CI/CD Pipelines', isCore: false },
    ],
  },
  {
    id: 'workflow',
    name: 'Workflow & Tools',
    icon: 'Settings',
    skills: [
      { name: 'Celery', isCore: false },
      { name: 'GitHub Actions', isCore: true },
      { name: 'FastAPI', isCore: true },
      { name: 'Playwright', isCore: false },
      { name: 'Selenium', isCore: false },
      { name: 'React', isCore: false },
      { name: 'Git', isCore: true },
    ],
  },
  {
    id: 'aiml',
    name: 'AI/ML & Domain',
    icon: 'Brain',
    skills: [
      { name: 'Data Warehousing', isCore: false },
      { name: 'ETL Pipelines', isCore: true },
      { name: 'Web Scraping', isCore: true },
      { name: 'NLP (PhoBERT, FastText)', isCore: false },
      { name: 'LLMs (LangChain, DeepSeek)', isCore: false },
      { name: 'Deep Learning (Keras)', isCore: false },
    ],
  },
]
```

- [ ] **Step 2: Remove modal state and related code**

Remove:
- `useState` import (or keep if used elsewhere)
- `selectedSkill` state
- Modal popup JSX (lines 169-205)

- [ ] **Step 3: Update SkillNode usage**

Change from:
```jsx
<SkillNode
  key={skill.name}
  name={skill.name}
  level={skill.level}
  color={color}
  delay={skillIndex * 0.05}
  onClick={() => setSelectedSkill(skill)}
/>
```

To:
```jsx
<SkillNode
  key={skill.name}
  name={skill.name}
  isCore={skill.isCore}
  color={color}
  delay={skillIndex * 0.05}
/>
```

- [ ] **Step 4: Remove onClick handler from SkillNode**

The SkillNode no longer needs onClick since modal is removed.

- [ ] **Step 5: Commit**

```bash
git add src/components/Skills.jsx
git commit -m "feat: update Skills data structure with isCore boolean and remove modal"
```

---

### Task 5: Verify and Test

**Files:**
- None (testing only)

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

Expected: Server starts without errors

- [ ] **Step 2: Verify Devicon icons render correctly**

Open browser to localhost and check:
- Python, SQL, PostgreSQL icons show official logos
- AWS, Docker, React, Git icons show official logos
- Apache Spark, Kafka, MongoDB, Redis, Cassandra show official logos
- No missing icon placeholders

- [ ] **Step 3: Verify Core badges display correctly**

Check that Core Skills (Python, SQL, PostgreSQL, Spark, AWS, GitHub Actions, FastAPI, Git, ETL, Web Scraping) show:
- Larger icon (48px)
- Thicker border (3px)
- "Core" badge pill

- [ ] **Step 4: Verify Familiar skills display correctly**

Check that Familiar skills show:
- Standard icon size (40px)
- Thin border (1.5px)
- No badge

- [ ] **Step 5: Verify modal is removed**

Click on any skill card - verify no modal popup appears

- [ ] **Step 6: Verify hover animations**

Hover over skill cards - verify scale 1.1 + shadow effect works

- [ ] **Step 7: Verify category sections render correctly**

Check all 5 categories display with correct icons and colors:
- Languages (blue)
- Databases & Big Data (green)
- Cloud & DevOps (amber)
- Workflow & Tools (purple)
- AI/ML & Domain (pink)
