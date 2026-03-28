import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink } from 'lucide-react'
import Section from './common/Section'
import AnimatedCounter from './common/AnimatedCounter'

const experiences = [
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

          <p className="text-gray-600 mb-6">{exp.description}</p>

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
