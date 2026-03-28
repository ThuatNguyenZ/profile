# Work Experience Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign Work Experience section with two-column layout, skills sidebar with domain categories, and enhanced experience cards with tech stack chips, metrics, and AWS architecture diagram.

**Architecture:** Create new Experience.jsx with responsive grid layout (sticky sidebar on desktop), separate SkillsSidebar component, update experience data structure with metrics and architecture info, add AWS service icons for architecture diagram.

**Tech Stack:** React, Framer Motion, Tailwind CSS, Devicon, Lucide React icons

---

### Task 1: Create SkillsSidebar Component

**Files:**
- Create: `src/components/experience/SkillsSidebar.jsx`
- Modify: `src/data/experience.js` (add skills data)

- [ ] **Step 1: Create experience components directory**

```bash
mkdir src/components/experience
```

- [ ] **Step 2: Add skills data to experience.js**

Add at end of `src/data/experience.js`:

```js
export const skillDomains = [
  {
    name: 'Languages & Frameworks',
    level: 'Expert',
    levelColor: '#10B981',
    skills: ['Python', 'SQL', 'JavaScript', 'FastAPI', 'React'],
  },
  {
    name: 'Data Processing & Storage',
    level: 'Senior',
    levelColor: '#3B82F6',
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Apache Spark', 'Apache Kafka', 'Hadoop'],
  },
  {
    name: 'Cloud & DevOps',
    level: 'Senior',
    levelColor: '#3B82F6',
    skills: ['AWS (EC2, S3, RDS, Glue, Lambda)', 'Docker', 'Git', 'GitHub Actions', 'CI/CD Pipelines'],
  },
]
```

- [ ] **Step 3: Create SkillsSidebar component**

Create `src/components/experience/SkillsSidebar.jsx`:

```jsx
import { motion } from 'framer-motion'
import { skillDomains } from '../data/experience'

const deviconClassMap = {
  'Python': 'devicon-python-plain',
  'SQL': 'devicon-postgresql-plain',
  'JavaScript': 'devicon-javascript-plain',
  'FastAPI': 'devicon-fastapi-plain',
  'React': 'devicon-react-original',
  'PostgreSQL': 'devicon-postgresql-plain',
  'MongoDB': 'devicon-mongodb-plain',
  'Redis': 'devicon-redis-plain',
  'Apache Spark': 'devicon-spark-plain',
  'Apache Kafka': 'devicon-apachekafka-plain',
  'Hadoop': 'devicon-hadoop-plain',
  'AWS (EC2, S3, RDS, Glue, Lambda)': 'devicon-amazonwebservices-plain',
  'Docker': 'devicon-docker-plain',
  'Git': 'devicon-git-plain',
  'GitHub Actions': 'devicon-github-plain',
  'CI/CD Pipelines': 'devicon-githubactions-plain',
}

export default function SkillsSidebar() {
  return (
    <aside className="hidden md:block w-1/3 sticky top-20 self-start">
      <div className="space-y-6">
        {skillDomains.map((domain, domainIndex) => (
          <motion.div
            key={domain.name}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: domainIndex * 0.1 }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-primary">{domain.name}</h3>
              <span
                className="px-2 py-1 text-xs font-medium rounded-full text-white"
                style={{ backgroundColor: domain.levelColor }}
              >
                {domain.level}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {domain.skills.map((skill) => {
                const deviconClass = deviconClassMap[skill]
                return (
                  <motion.span
                    key={skill}
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-surface rounded-full text-xs font-medium text-gray-700 hover:shadow-md transition-shadow cursor-default"
                  >
                    {deviconClass ? (
                      <i className={`${deviconClass}`} style={{ fontSize: 14 }} />
                    ) : null}
                    <span>{skill.split(' ')[0]}</span>
                  </motion.span>
                )
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </aside>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/experience/SkillsSidebar.jsx src/data/experience.js
git commit -m "feat: create SkillsSidebar component with domain categories"
```

---

### Task 2: Update Experience Data Structure

**Files:**
- Modify: `src/data/experience.js`

- [ ] **Step 1: Update experiences array structure**

Replace the existing experiences array with:

```js
export const experiences = [
  {
    company: 'BA3 Studio',
    website: 'https://analytic.ba3.studio/',
    role: 'Data Engineer',
    period: 'Nov. 2024 – Present',
    location: 'Ho Chi Minh City, Vietnam',
    description: 'Data-driven service & software for digital commerce. Helps brands optimize every move through data-driven innovation on dashboards, AI-powered recommendations on factors that directly affect revenue such as promotion and keyword on Shopee, TikTokshop, Lazada and other platforms.',
    techStack: [
      'AWS (EC2, S3, RDS, Glue, Lambda)',
      'GitHub Actions',
      'PostgreSQL',
      'FastAPI',
      'Redis',
      'Celery',
      'Docker',
      'React',
    ],
    metrics: [
      {
        value: '50M+',
        label: 'Records processed daily',
        icon: 'Database',
      },
      {
        value: '3',
        label: 'E-commerce platforms automated',
        icon: 'ShoppingCart',
      },
      {
        value: '-90%',
        label: 'Reduction in manual extraction time',
        icon: 'Clock',
      },
      {
        value: 'Minutes',
        label: 'CI/CD deployment (from hours)',
        icon: 'Rocket',
      },
    ],
    architecture: {
      title: 'Data Architecture',
      services: [
        { name: 'EC2', description: 'Data Ingestion', icon: 'compute' },
        { name: 'S3', description: 'Raw Storage', icon: 'storage' },
        { name: 'Glue', description: 'ETL Processing', icon: 'etl' },
        { name: 'Lambda', description: 'Real-time Processing', icon: 'function' },
        { name: 'PostgreSQL', description: 'Structured Storage', icon: 'database' },
      ],
    },
  },
]
```

- [ ] **Step 2: Remove old achievements and pipeline fields**

The old `achievements` and `pipeline` fields are replaced by `metrics` and `architecture`.

- [ ] **Step 3: Commit**

```bash
git add src/data/experience.js
git commit -m "feat: update experience data structure with metrics and architecture"
```

---

### Task 3: Create AWS Architecture Diagram Component

**Files:**
- Create: `src/components/experience/ArchitectureDiagram.jsx`

- [ ] **Step 1: Create ArchitectureDiagram component**

Create `src/components/experience/ArchitectureDiagram.jsx`:

```jsx
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const serviceIcons = {
  compute: '💻',
  storage: '🗄️',
  etl: '⚙️',
  function: '⚡',
  database: '🐘',
}

const serviceColors = {
  EC2: '#FF9900',
  S3: '#569A31',
  Glue: '#FF9900',
  Lambda: '#FF9900',
  PostgreSQL: '#336791',
}

export default function ArchitectureDiagram({ architecture }) {
  return (
    <div className="bg-surface rounded-xl p-6">
      <h4 className="font-bold text-primary mb-4">{architecture.title}</h4>
      <div className="space-y-4">
        {/* Main flow */}
        <div className="flex flex-wrap items-center gap-3">
          {architecture.services.slice(0, 4).map((service, index) => (
            <motion.div
              key={service.name}
              key={service.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center"
            >
              <div
                className="bg-white rounded-lg p-3 text-center min-w-[100px] shadow border-l-4"
                style={{ borderLeftColor: serviceColors[service.name] || '#3B82F6' }}
              >
                <div className="text-2xl mb-1">{serviceIcons[service.icon]}</div>
                <div className="font-bold text-primary text-sm">{service.name}</div>
                <div className="text-xs text-gray-500">{service.description}</div>
              </div>
              {index < 3 && (
                <ArrowRight className="text-secondary mx-1 flex-shrink-0" size={20} />
              )}
            </motion.div>
          ))}
        </div>

        {/* Final service (PostgreSQL) */}
        <div className="flex justify-center pt-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center"
          >
            <ArrowRight className="text-secondary mb-2" size={20} />
            <div
              className="bg-white rounded-lg p-3 text-center min-w-[120px] shadow border-l-4"
              style={{ borderLeftColor: serviceColors.PostgreSQL }}
            >
              <div className="text-2xl mb-1">{serviceIcons.database}</div>
              <div className="font-bold text-primary text-sm">PostgreSQL</div>
              <div className="text-xs text-gray-500">Structured Storage</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/experience/ArchitectureDiagram.jsx
git commit -m "feat: create ArchitectureDiagram component with AWS-style layout"
```

---

### Task 4: Update Experience Component Main Layout

**Files:**
- Modify: `src/components/Experience.jsx`

- [ ] **Step 1: Update imports**

Replace imports at top of file:

```jsx
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import Section from './common/Section'
import SkillsSidebar from './experience/SkillsSidebar'
import ArchitectureDiagram from './experience/ArchitectureDiagram'
import { experiences } from '../data/experience'
import 'devicon/devicon.min.css'
```

- [ ] **Step 2: Update main component structure**

Replace the return statement with:

```jsx
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

      {/* Two-column layout */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left column - Skills Sidebar */}
        <SkillsSidebar />

        {/* Right column - Experience Cards */}
        <div className="md:w-2/3">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
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

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-2 mb-6">
                {exp.techStack.map((tech) => (
                  <TechChip key={tech} name={tech} />
                ))}
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-6">{exp.description}</p>

              {/* Metrics Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {exp.metrics.map((metric, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-surface rounded-xl p-4 text-center"
                  >
                    <div className="text-3xl mb-2">{getMetricIcon(metric.icon)}</div>
                    <div className="text-2xl md:text-3xl font-bold text-secondary mb-1">
                      {metric.value}
                    </div>
                    <p className="text-gray-600 text-sm">{metric.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Architecture Diagram */}
              {exp.architecture && (
                <ArchitectureDiagram architecture={exp.architecture} />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
```

- [ ] **Step 3: Add helper components and functions**

Add before the main export:

```jsx
// Devicon mapping for tech chips
const techDeviconMap = {
  'AWS (EC2, S3, RDS, Glue, Lambda)': 'devicon-amazonwebservices-plain',
  'GitHub Actions': 'devicon-github-plain',
  'PostgreSQL': 'devicon-postgresql-plain',
  'FastAPI': 'devicon-fastapi-plain',
  'Redis': 'devicon-redis-plain',
  'Celery': 'devicon-celery-plain',
  'Docker': 'devicon-docker-plain',
  'React': 'devicon-react-original',
}

// TechChip component
function TechChip({ name }) {
  const deviconClass = techDeviconMap[name]
  const displayName = name.includes('(') ? name.split(' ')[0] : name

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface rounded-full text-sm font-medium text-gray-700 hover:shadow-md transition-shadow"
    >
      {deviconClass ? (
        <i className={`${deviconClass}`} style={{ fontSize: 16 }} />
      ) : null}
      <span>{displayName}</span>
    </motion.span>
  )
}

// Icon mapping for metrics
const metricIconMap = {
  Database: '📊',
  ShoppingCart: '🛒',
  Clock: '⏱️',
  Rocket: '🚀',
}

function getMetricIcon(iconName) {
  return metricIconMap[iconName] || '📊'
}
```

- [ ] **Step 4: Remove old AnimatedCounter import and iconMap**

Remove the old `AnimatedCounter` import and `iconMap` object since they're no longer used.

- [ ] **Step 5: Commit**

```bash
git add src/components/Experience.jsx
git commit -m "feat: redesign Experience component with two-column layout"
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

- [ ] **Step 2: Verify desktop layout**

Open browser on desktop width (≥768px). Check:
- Skills sidebar on left (30% width)
- Experience cards on right (70% width)
- Skills sidebar is sticky when scrolling
- All 3 domain categories visible with level badges

- [ ] **Step 3: Verify mobile layout**

Resize browser to mobile width (<768px). Check:
- Skills section stacks on top
- Experience cards below
- No horizontal scroll

- [ ] **Step 4: Verify Tech Stack Chips**

Check that tech stack displays with devicon logos:
- AWS, PostgreSQL, FastAPI, Redis, Celery, Docker, React icons visible
- Hover effect: scale 1.05 + shadow

- [ ] **Step 5: Verify Metrics Cards**

Check 4 metrics display correctly:
- 50M+ Records processed daily
- 3 E-commerce platforms
- -90% Reduction in manual time
- Minutes CI/CD deployment

No "NaN" errors should appear.

- [ ] **Step 6: Verify Architecture Diagram**

Check the data architecture diagram:
- EC2 → S3 → Glue → Lambda → PostgreSQL flow
- AWS-style icons visible
- Service names and descriptions correct
- Arrows between services

- [ ] **Step 7: Check browser console**

Open DevTools Console and verify no errors.

Expected: No JavaScript errors
