import { motion } from 'framer-motion'
import { ArrowRight, Server, HardDrive, Zap, Database } from 'lucide-react'

const serviceColors = {
  EC2: '#FF9900',
  S3: '#569A31',
  Glue: '#FF9900',
  Lambda: '#FF9900',
  PostgreSQL: '#336791',
}

// AWS Glue Icon - Custom SVG
function GlueIcon({ size = 24, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="18" r="3" />
      <path d="M9 6h6" />
      <path d="M9 18h6" />
      <path d="M6 9v6" />
      <path d="M18 9v6" />
    </svg>
  )
}

// AWS Lambda Icon - Custom SVG (λ symbol)
function LambdaIcon({ size = 24, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 4h2l6 12" />
      <path d="M12 8l6 12" />
      <path d="M8 20h10" />
    </svg>
  )
}

// Custom SVG icons for each service
const serviceIcons = {
  compute: ({ size = 24, color }) => (
    <Server size={size} strokeWidth={2} color={color} />
  ),
  storage: ({ size = 24, color }) => (
    <HardDrive size={size} strokeWidth={2} color={color} />
  ),
  etl: ({ size = 24, color }) => (
    <GlueIcon size={size} color={color} />
  ),
  function: ({ size = 24, color }) => (
    <LambdaIcon size={size} color={color} />
  ),
  database: ({ size = 24, color }) => (
    <Database size={size} strokeWidth={2} color={color} />
  ),
}

export default function ArchitectureDiagram({ architecture }) {
  return (
    <div className="bg-surface rounded-xl p-6">
      <h4 className="font-bold text-primary mb-4 text-center">{architecture.title}</h4>

      {/* Single row flow - nowrap with scroll on mobile */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto py-2">
        {architecture.services.map((service, index) => {
          const IconComponent = serviceIcons[service.icon] || serviceIcons.compute
          const color = serviceColors[service.name] || '#3B82F6'

          return (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="flex items-center flex-shrink-0"
            >
              <div
                className="bg-white rounded-lg p-2.5 text-center min-w-[80px] shadow border-l-4"
                style={{ borderLeftColor: color }}
              >
                <div className="flex justify-center mb-1" style={{ color }}>
                  <IconComponent size={24} strokeWidth={2} />
                </div>
                <div className="font-bold text-primary text-[10px] leading-tight">{service.name}</div>
                <div className="text-[9px] text-gray-500 leading-tight">{service.description}</div>
              </div>
              {index < architecture.services.length - 1 && (
                <ArrowRight className="text-secondary mx-1 flex-shrink-0" size={16} strokeWidth={2} />
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
