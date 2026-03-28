import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import Section from './common/Section'
import SkillsSidebar from './experience/SkillsSidebar'
import ArchitectureDiagram from './experience/ArchitectureDiagram'
import { experiences } from '../data/experience'
import 'devicon/devicon.min.css'

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
