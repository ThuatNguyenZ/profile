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
      <h4 className="font-bold text-primary mb-4">{architecture.title}</h4>

      {/* Single row flow */}
      <div className="flex flex-wrap items-center gap-2">
        {architecture.services.map((service, index) => (
          <motion.div
            key={service.name}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="flex items-center"
          >
            <div
              className="bg-white rounded-lg p-3 text-center min-w-[90px] shadow border-l-4"
              style={{ borderLeftColor: serviceColors[service.name] || '#3B82F6' }}
            >
              <div className="text-2xl mb-1">{serviceIcons[service.icon]}</div>
              <div className="font-bold text-primary text-xs">{service.name}</div>
              <div className="text-xs text-gray-500">{service.description}</div>
            </div>
            {index < architecture.services.length - 1 && (
              <ArrowRight className="text-secondary mx-1 flex-shrink-0" size={18} />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
