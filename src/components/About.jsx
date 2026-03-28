import { motion } from 'framer-motion'
import { MapPin, GraduationCap, Award } from 'lucide-react'
import Section from './common/Section'
import { profile, education } from '../data/profile'

export default function About() {
  return (
    <Section id="about" backgroundColor="white">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-primary mb-4"
        >
          About Me
        </motion.h2>
        <div className="w-20 h-1 bg-secondary mx-auto" />
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="prose prose-lg"
        >
          <p className="text-gray-600 leading-relaxed">
            {profile.bio}
          </p>

          <div className="flex items-center gap-2 mt-6 text-gray-500">
            <MapPin size={20} />
            <span>{profile.location}</span>
          </div>
        </motion.div>

        {/* Education Timeline */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
            <GraduationCap size={24} />
            Education
          </h3>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-secondary" />

            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-12 pb-8 last:pb-0"
              >
                {/* Timeline dot */}
                <div className="absolute left-2 top-1 w-4 h-4 bg-secondary rounded-full border-4 border-white shadow" />

                <div className="bg-surface rounded-xl p-4">
                  <h4 className="font-bold text-primary">{edu.degree}</h4>
                  <p className="text-secondary font-medium">{edu.school}</p>
                  <p className="text-gray-500 text-sm mt-1">{edu.period}</p>
                  {edu.gpa && (
                    <p className="text-gray-500 text-sm">GPA: {edu.gpa}</p>
                  )}
                  {edu.highlight && (
                    <div className="flex items-center gap-2 mt-2 text-accent text-sm font-medium">
                      <Award size={16} />
                      <span>{edu.highlight}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
