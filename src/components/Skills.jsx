import { motion } from 'framer-motion'
import 'devicon/devicon.min.css'
import { Code, Database, Cloud, Settings, Brain } from 'lucide-react'
import Section from './common/Section'
import SkillNode from './common/SkillNode'

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
  return (
    <Section id="skills" backgroundColor="#F8FAFC">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.3 }}
          className="text-3xl md:text-4xl font-bold text-primary mb-4"
        >
          Technical Skills
        </motion.h2>
        <div className="w-20 h-1 bg-secondary mx-auto mb-4" />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.3 }}
          className="text-gray-600 max-w-2xl mx-auto"
        >
          A comprehensive toolkit for building scalable data systems
        </motion.p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {skillCategories.map((category) => {
          const Icon = iconMap[category.icon]
          return (
            <button
              key={category.id}
              className="px-4 py-2 bg-white rounded-full shadow-sm font-medium text-gray-700 flex items-center gap-2 hover:shadow-md transition-shadow hover:-translate-y-0.5 will-change-transform"
            >
              <Icon size={18} style={{ color: categoryColors[category.id] }} />
              {category.name}
            </button>
          )
        })}
      </div>

      <div className="space-y-12">
        {skillCategories.map((category, categoryIndex) => {
          const Icon = iconMap[category.icon]
          const color = categoryColors[category.id]

          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: categoryIndex * 0.05, duration: 0.2 }}
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
                    isCore={skill.isCore}
                    color={color}
                    delay={skillIndex * 0.03}
                  />
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}
