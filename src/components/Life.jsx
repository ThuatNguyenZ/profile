import { motion } from 'framer-motion'
import { Music, Trophy, Map, Users, Facebook, Circle, Target, Wind } from 'lucide-react'
import Section from './common/Section'
import { lifeInterests } from '../data/life'

const iconMap = {
  Music,
  Trophy,
  Map,
  Users,
}

const sportIconMap = {
  football: Circle,
  target: Target,
  wind: Wind,
}

export default function Life() {
  return (
    <Section id="life" backgroundColor="white">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-primary mb-4"
        >
          Life & Interests
        </motion.h2>
        <div className="w-20 h-1 bg-secondary mx-auto mb-4" />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-gray-600 max-w-2xl mx-auto"
        >
          Beyond data pipelines and algorithms
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {Object.entries(lifeInterests).map(([key, interest], index) => {
          const Icon = iconMap[interest.icon]
          const color = interest.color

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="rounded-2xl p-6 shadow-md border-l-4 relative overflow-hidden"
              style={{
                borderColor: color,
                background: `linear-gradient(to right, ${color}08 0%, ${color}10 50%, ${color}25 100%)`,
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: `${color}20` }}
                >
                  <Icon size={24} style={{ color }} />
                </div>
                <div className="flex-1">
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ color }}
                  >
                    {interest.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{interest.description}</p>

                  {key === 'sports' && interest.activities && (
                    <div className="flex gap-3">
                      {interest.activities.map((activity) => {
                        const SportIcon = sportIconMap[activity.icon]
                        return (
                          <div
                            key={activity.name}
                            className="px-3 py-2 bg-white rounded-lg text-center"
                          >
                            <div className="flex justify-center mb-1">
                              {SportIcon ? <SportIcon size={20} style={{ color }} strokeWidth={2} /> : <Circle size={20} style={{ color }} />}
                            </div>
                            <div className="text-xs text-gray-500">{activity.name}</div>
                            <div className="text-xs text-secondary font-medium">{activity.level}</div>
                          </div>
                        )
                      })}
                    </div>
                  )}

                  {key === 'travel' && interest.places && (
                    <div className="flex flex-wrap gap-2">
                      {interest.places.map((place) => (
                        <span
                          key={place}
                          className="px-3 py-1 bg-white rounded-full text-sm"
                          style={{ color }}
                        >
                          {place}
                        </span>
                      ))}
                    </div>
                  )}

                  {key === 'social' && interest.links?.facebook && (
                    <a
                      href={interest.links.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#1877F2] text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
                    >
                      <Facebook size={18} />
                      Connect on Facebook
                    </a>
                  )}

                  {key === 'music' && (
                    <div className="flex items-end gap-1 h-12 mt-4">
                      {interest.visualization?.data?.map((value, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${value}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05 }}
                          className="flex-1 rounded-t"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}
