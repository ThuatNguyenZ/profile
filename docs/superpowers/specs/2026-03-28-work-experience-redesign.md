---
name: Work Experience Redesign
description: Two-column layout with Skills sidebar and redesigned Experience cards with tech stack chips, metrics, and AWS architecture diagram
type: spec
---

# Work Experience Redesign Design

## Problem

Phần Work Experience hiện tại có các vấn đề sau:
1. Layout đơn cột không tận dụng tốt không gian desktop
2. Skills và Experience trộn lẫn, khó scan thông tin
3. Metrics cards hiển thị lỗi "NaN" do AnimatedCounter không xử lý đúng kiểu data
4. Pipeline diagram đơn giản, không có AWS service icons
5. Tech stack hiển thị dưới dạng text-only tags, không nhất quán với phần Technical Skills

## Solution

Redesign phần Work Experience với layout 2 cột và các cải tiến visual:
- Skills sidebar bên trái với phân loại theo domain
- Experience cards bên phải với tech stack chips (devicon logos)
- Metrics cards với số liệu cụ thể, có impact thực tế
- AWS architecture diagram với service icons

## Design Specifications

### Layout Structure

**Responsive Breakpoint:** 768px (md)

**Desktop (≥768px):**
```
┌──────────────────┬─────────────────────────────────┐
│                  │  Experience Cards               │
│   Skills         │  ┌─────────────────────────┐    │
│   (30%, sticky)  │  │  Company Header         │    │
│                  │  │  Tech Stack Chips       │    │
│   [Domain 1]     │  │  Description            │    │
│   - Skill tags   │  │  Metrics Cards          │    │
│                  │  │  Architecture Diagram   │    │
│   [Domain 2]     │  └─────────────────────────┘    │
│   - Skill tags   │                                 │
│                  │                                 │
└──────────────────┴─────────────────────────────────┘
```

**Mobile (<768px):**
```
┌─────────────────────────┐
│   Skills Section        │
│   [Domain 1] [Domain 2] │
├─────────────────────────┤
│   Experience Section    │
│   Company Cards         │
└─────────────────────────┘
```

### Skills Sidebar (Left Column)

**3 Domain Categories:**

| Domain | Skills | Level Badge | Color |
|--------|--------|-------------|-------|
| **Languages & Frameworks** | Python, SQL, JavaScript, FastAPI, React | Expert | #10B981 |
| **Data Processing & Storage** | PostgreSQL, MongoDB, Redis, Apache Spark, Apache Kafka, Hadoop | Senior | #3B82F6 |
| **Cloud & DevOps** | AWS, Docker, Git, GitHub Actions, CI/CD | Senior | #3B82F6 |

**Skill Tag Design:**
- Devicon logo + skill name
- Rounded pill background
- Hover effect: scale 1.05 + shadow

**Level Badge:**
- Expert: Green badge (#10B981)
- Senior: Blue badge (#3B82F6)
- Mid-Level: Gray badge (#6B7280)

**Sticky Behavior:**
- `position: sticky; top: 20px` trên desktop
- Scroll cùng với Experience content

### Experience Cards (Right Column)

#### Company Header
- Background: `bg-primary` (#1E3A5F)
- Rounded-2xl corners
- White text
- Company name: bold, 2xl
- Role: secondary color, medium
- Period + Location: gray-300, small
- Website link: secondary color + external icon

#### Tech Stack Chips
- Devicon logos trong rounded pills
- Background: `bg-surface` (#F8FAFC)
- Hover: scale + shadow
- Gap-2 spacing

#### Description
- Text: gray-600
- Margin bottom: 6 (24px)

#### Metrics Cards (4 stats)

Grid layout: 2 columns mobile, 4 columns desktop

| Metric | Value | Label | Icon |
|--------|-------|-------|------|
| Data Volume | 50M+ | Records processed daily | Database |
| Platforms | 3 | E-commerce platforms automated | ShoppingCart |
| Time Saved | -90% | Reduction in manual extraction | Clock |
| Deployment | Minutes | CI/CD deployment (from hours) | Rocket |

**Card Design:**
- Background: `bg-surface`
- Rounded-xl
- Icon: 3xl, margin bottom
- Value: 2xl-3xl, bold, secondary color
- Label: gray-600, small

#### Architecture Diagram

**Container:**
- Background: `bg-surface`
- Rounded-xl
- Padding: 6 (24px)
- Title: bold, primary color

**Diagram Layout (AWS-style):**
```
┌─────────────────────────────────────────────────────┐
│  Data Architecture                                  │
├─────────────────────────────────────────────────────┤
│                                                     │
│   [EC2] ──→ [S3] ──→ [Glue] ──→ [Lambda]          │
│   Ingestion   Raw      ETL         Real-time       │
│               Data                   │              │
│                                      ↓              │
│                              [PostgreSQL]           │
│                              Structured             │
│                              Storage                │
└─────────────────────────────────────────────────────┘
```

**Service Icons:**
- EC2: Server/compute icon
- S3: Storage/database icon
- Glue: ETL/process icon
- Lambda: Function/bolt icon
- PostgreSQL: Database elephant icon

**Arrows:**
- Animated flow (optional)
- Secondary color (#3B82F6)

### Color Scheme

| Role | Color | Usage |
|------|-------|-------|
| Primary | #1E3A5F | Company headers, text headings |
| Secondary | #3B82F6 | Accents, badges, arrows |
| Accent/Expert | #10B981 | Expert level badges |
| Surface | #F8FAFC | Card backgrounds |
| Text | #6B7280 | Labels, descriptions |

### Animation & Interactions

**Entrance:**
- Fade + slide up (duration 0.3s)
- Stagger delay cho metrics cards

**Hover Effects:**
- Tech chips: scale 1.05 + shadow
- Company header: none (static)
- Architecture nodes: subtle scale

**Scroll Behavior:**
- Skills sidebar sticky trên desktop
- Smooth scroll to section

## Success Criteria

- [ ] Layout 2 cột hoạt động trên desktop, stack trên mobile
- [ ] Skills sidebar sticky khi scroll (desktop only)
- [ ] 3 domain categories với devicon logos
- [ ] Level badges hiển thị đúng màu (Expert/Senior)
- [ ] Tech stack chips dùng devicon logos
- [ ] Metrics cards hiển thị đúng số liệu (không NaN)
- [ ] Architecture diagram với AWS-style icons
- [ ] Hover effects mượt mà
- [ ] Responsive design hoạt động tốt

## Data Structure Changes

**New skills data structure:**
```js
const skillDomains = [
  {
    name: 'Languages & Frameworks',
    level: 'Expert',
    skills: ['Python', 'SQL', 'JavaScript', 'FastAPI', 'React'],
  },
  {
    name: 'Data Processing & Storage',
    level: 'Senior',
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Apache Spark', 'Apache Kafka', 'Hadoop'],
  },
  {
    name: 'Cloud & DevOps',
    level: 'Senior',
    skills: ['AWS', 'Docker', 'Git', 'GitHub Actions', 'CI/CD'],
  },
]
```

**Updated experience data:**
```js
{
  company: 'BA3 Studio',
  role: 'Data Engineer',
  period: 'Nov. 2024 – Present',
  location: 'Ho Chi Minh City, Vietnam',
  website: 'https://analytic.ba3.studio/',
  description: '...',
  techStack: ['AWS', 'PostgreSQL', 'FastAPI', 'Redis', 'Celery', 'Docker', 'React', 'GitHub Actions'],
  metrics: [
    { value: '50M+', label: 'Records processed daily', icon: 'Database' },
    { value: '3', label: 'E-commerce platforms automated', icon: 'ShoppingCart' },
    { value: '-90%', label: 'Reduction in manual extraction time', icon: 'Clock' },
    { value: 'Minutes', label: 'CI/CD deployment (from hours)', icon: 'Rocket' },
  ],
  architecture: {
    title: 'Data Architecture',
    services: [
      { name: 'EC2', description: 'Data Ingestion', icon: 'ec2' },
      { name: 'S3', description: 'Raw Storage', icon: 's3' },
      { name: 'Glue', description: 'ETL Processing', icon: 'glue' },
      { name: 'Lambda', description: 'Real-time Processing', icon: 'lambda' },
      { name: 'PostgreSQL', description: 'Structured Storage', icon: 'postgresql' },
    ],
  },
}
```
