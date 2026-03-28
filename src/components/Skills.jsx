import { useState } from 'react'
import { motion } from 'framer-motion'
import 'devicon/devicon.min.css'
import { Code, Database, Cloud, Settings, Brain, X } from 'lucide-react'
import Section from './common/Section'
import SkillNode from './common/SkillNode'

const skillCategories = [
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
