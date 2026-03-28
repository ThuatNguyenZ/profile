import 'devicon/devicon.min.css'
import { motion } from 'framer-motion'
import { skillDomains } from '../../data/experience'

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
