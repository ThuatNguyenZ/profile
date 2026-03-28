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
