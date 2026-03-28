import { motion } from 'framer-motion'
import { ArrowRight, Server, HardDrive, Database } from 'lucide-react'

const serviceColors = {
  EC2: '#FF9900',
  S3: '#569A31',
  Glue: '#FF9900',
  Lambda: '#FF9900',
  PostgreSQL: '#336791',
}

// AWS Glue Icon - ETL (Extract, Transform, Load)
function GlueIcon({ size = 24, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* Funnel shape for ETL */}
      <path d="M4 4h16l-6 8v6l-4 2v-8L4 4z" />
      {/* Data flow lines */}
      <path d="M8 12h8" />
      <path d="M10 15h4" />
    </svg>
  )
}

// AWS Lambda Icon - Real-time Processing/Event-driven
function LambdaIcon({ size = 24, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* Lightning bolt for fast/event-driven processing */}
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  )
}

export default function ArchitectureDiagram({ architecture }) {
  // Icon component mapping
  const getIconForService = (iconType, color) => {
    switch (iconType) {
      case 'compute':
        return <Server size={32} strokeWidth={2} color={color} />
      case 'storage':
        return <HardDrive size={32} strokeWidth={2} color={color} />
      case 'etl':
        return <GlueIcon size={32} color={color} />
      case 'function':
        return <LambdaIcon size={32} color={color} />
      case 'database':
        return <Database size={32} strokeWidth={2} color={color} />
      default:
        return <Server size={32} strokeWidth={2} color={color} />
    }
  }

  return (
    <div className="bg-surface rounded-xl p-8">
      <h4 className="font-bold text-primary mb-6 text-center text-xl">{architecture.title}</h4>

      {/* Single row flow - nowrap with scroll on mobile */}
      <div className="flex items-center justify-center gap-3 overflow-x-auto py-4">
        {architecture.services.map((service, index) => {
          const color = serviceColors[service.name] || '#3B82F6'
          const icon = getIconForService(service.icon, color)

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
                className="bg-white rounded-xl p-4 text-center min-w-[100px] shadow-lg border-l-4"
                style={{ borderLeftColor: color }}
              >
                <div className="flex justify-center mb-2" style={{ color }}>
                  {icon}
                </div>
                <div className="font-bold text-primary text-sm leading-tight mb-1">{service.name}</div>
                <div className="text-xs text-gray-500 leading-tight">{service.description}</div>
              </div>
              {index < architecture.services.length - 1 && (
                <ArrowRight className="text-secondary mx-2 flex-shrink-0" size={20} strokeWidth={2} />
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
