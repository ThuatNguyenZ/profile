---
name: Technical Skills UI Redesign
description: Replace progress bars with Devicon logos and 2-level proficiency badges (Core/Familiar)
type: spec
---

# Technical Skills UI Redesign Design

## Problem

Hiện tại phần Technical Skills đang sử dụng progress bars để thể hiện mức độ thành thạo, điều này:
1. Tạo cảm giác "game hóa" không phù hợp với portfolio chuyên nghiệp
2. Các con số % mang tính chủ quan, không có ý nghĩa thực tế với nhà tuyển dụng
3. Không có icon/logo chính thức của công nghệ, giảm tính nhận diện
4. Modal popup khi click làm phức tạp UX không cần thiết

## Solution

Redesign phần Technical Skills theo hướng hiện đại, chuyên nghiệp hơn:
- Dùng Devicon (logo chính thức của các công nghệ)
- Thay progress bars bằng 2-level proficiency badges (Core/Familiar)
- Loại bỏ modal popup
- Giữ layout grid theo categories để dễ scan

## Design Specifications

### Icon Library: Devicon

**Package:** `devicon` npm package
**Usage:** Import colored SVG logos chính thức của từng công nghệ

**Supported skills in devicon:**
- Languages: Python, SQL, JavaScript, C++, HTML5, CSS3
- Databases: PostgreSQL, MongoDB, Redis, Cassandra
- Big Data: Apache Spark, Apache Kafka, Hadoop
- Cloud: AWS, Docker
- DevOps: GitHub Actions, Git
- Workflow: FastAPI, Celery, Playwright, Selenium, React
- AI/ML: (dùng icon placeholder cho domain concepts như ETL, Data Warehousing, NLP, LLMs, Deep Learning)

### Proficiency Levels

**2-tier system based on current level %:**

| Level | Threshold | Visual Treatment |
|-------|-----------|------------------|
| **Core** | ≥85% | 48px icon, 3px border, "Core" badge |
| **Familiar** | <85% | 40px icon, 1.5px border, no badge |

**Skill Mapping:**

**Core Skills (≥85%):**
- Python, SQL, PostgreSQL, Apache Spark, AWS, GitHub Actions, FastAPI, Git, ETL Pipelines, Web Scraping

**Familiar (<85%):**
- JavaScript, C++, HTML/CSS, MongoDB, Redis, Kafka, Cassandra, Hadoop, Docker, CI/CD, Celery, Playwright, Selenium, React, Data Warehousing, NLP, LLMs, Deep Learning

### Category Structure

Giữ nguyên 5 categories hiện tại:

```js
[
  { id: 'languages', name: 'Languages', color: '#3B82F6' },
  { id: 'databases', name: 'Databases & Big Data', color: '#10B981' },
  { id: 'cloud', name: 'Cloud & DevOps', color: '#F59E0B' },
  { id: 'workflow', name: 'Workflow & Tools', color: '#8B5CF6' },
  { id: 'aiml', name: 'AI/ML & Domain', color: '#EC4899' }
]
```

### Card Design

**Core Skill Card:**
```
┌─────────────────────────┐
│  ┌─────────────────┐    │
│  │                 │    │
│  │   [48px Icon]   │    │
│  │                 │    │
│  └─────────────────┘    │
│     Skill Name          │
│   ╭──────────╮          │
│   │   Core   │          │
│   ╰──────────╯          │
└─────────────────────────┘
```

**Familiar Skill Card:**
```
┌─────────────────────────┐
│  ┌─────────────────┐    │
│  │                 │    │
│  │   [40px Icon]   │    │
│  │                 │    │
│  └─────────────────┘    │
│     Skill Name          │
└─────────────────────────┘
```

### Skills Not in Devicon

Một số kỹ năng domain-specific không có icon chính thức trong Devicon. Xử lý như sau:

| Skill | Icon Replacement |
|-------|------------------|
| ETL Pipelines | Data pipeline icon (custom SVG) |
| Data Warehousing | Database warehouse icon (custom SVG) |
| Web Scraping | Browser/scrape icon (custom SVG) |
| NLP | Brain/text icon (custom SVG) |
| LLMs | AI/chatbot icon (custom SVG) |
| Deep Learning | Neural network icon (custom SVG) |
| CI/CD Pipelines | Pipeline/icon (custom SVG) |

### Removed Features

1. **Progress bars** - Loại bỏ hoàn toàn khỏi SkillNode và modal
2. **Modal popup** - Loại bỏ state `selectedSkill` và modal component
3. **Level percentage** - Không hiển thị % nữa

### Animation & Interactions

- **Hover effect**: Scale 1.1 + shadow (giữ nguyên)
- **Entrance animation**: Fade + scale từ dưới lên (giữ nguyên)
- **Category filter buttons**: Giữ nguyên functionality (nếu có)

## Success Criteria

- [ ] Devicon installed và hiển thị đúng logo cho các skills supported
- [ ] Custom SVG icons cho skills không có trong Devicon
- [ ] 2-level proficiency thể hiện rõ qua visual (size, border, badge)
- [ ] Progress bars được loại bỏ hoàn toàn
- [ ] Modal popup được loại bỏ hoàn toàn
- [ ] Layout grid theo categories được giữ nguyên
- [ ] Hover animations hoạt động mượt mà
