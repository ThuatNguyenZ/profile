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
      <div className="space-y-4">
        {/* Main flow */}
        <div className="flex flex-wrap items-center gap-3">
          {architecture.services.slice(0, 4).map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center"
            >
              <div
                className="bg-white rounded-lg p-3 text-center min-w-[100px] shadow border-l-4"
                style={{ borderLeftColor: serviceColors[service.name] || '#3B82F6' }}
              >
                <div className="text-2xl mb-1">{serviceIcons[service.icon]}</div>
                <div className="font-bold text-primary text-sm">{service.name}</div>
                <div className="text-xs text-gray-500">{service.description}</div>
              </div>
              {index < 3 && (
                <ArrowRight className="text-secondary mx-1 flex-shrink-0" size={20} />
              )}
            </motion.div>
          ))}
        </div>

        {/* Final service (PostgreSQL) */}
        <div className="flex justify-center pt-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center"
          >
            <ArrowRight className="text-secondary mb-2" size={20} />
            <div
              className="bg-white rounded-lg p-3 text-center min-w-[120px] shadow border-l-4"
              style={{ borderLeftColor: serviceColors.PostgreSQL }}
            >
              <div className="text-2xl mb-1">{serviceIcons.database}</div>
              <div className="font-bold text-primary text-sm">PostgreSQL</div>
              <div className="text-xs text-gray-500">Structured Storage</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
