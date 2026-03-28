import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const serviceIcons = {
  compute: '💻',
  storage: '🗄️',
  etl: '⚙️',
  function: '⚡',
  database: '🐘',
}

const serviceColors = {
  EC2: '#FF9900',
  S3: '#569A31',
  Glue: '#FF9900',
  Lambda: '#FF9900',
  PostgreSQL: '#336791',
}

export default function ArchitectureDiagram({ architecture }) {
  return (
    <div className="bg-surface rounded-xl p-6">
      <h4 className="font-bold text-primary mb-4 text-center">{architecture.title}</h4>

      {/* Single row flow - nowrap with scroll on mobile */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto py-2">
        {architecture.services.map((service, index) => (
          <motion.div
            key={service.name}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="flex items-center flex-shrink-0"
          >
            <div
              className="bg-white rounded-lg p-2 text-center min-w-[75px] shadow border-l-4"
              style={{ borderLeftColor: serviceColors[service.name] || '#3B82F6' }}
            >
              <div className="text-xl mb-0.5">{serviceIcons[service.icon]}</div>
              <div className="font-bold text-primary text-[10px] leading-tight">{service.name}</div>
              <div className="text-[9px] text-gray-500 leading-tight">{service.description}</div>
            </div>
            {index < architecture.services.length - 1 && (
              <ArrowRight className="text-secondary mx-1 flex-shrink-0" size={16} />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
