import { motion } from 'framer-motion'
import { ArrowDown, Mail, Github, Linkedin } from 'lucide-react'
import DataPipelineBackground from './DataPipelineBackground'

const profile = {
  name: 'Nguyen Thien Thuat',
  title: 'Data Engineer',
  tagline: 'Building scalable data pipelines that power intelligent products',
  contact: {
    github: 'https://github.com/ThuatNguyenZ',
    linkedin: 'https://linkedin.com/in/thuat-nguyen1306/',
    email: 'thuatnguyen2k2info@gmail.com',
  },
}

export default function Hero() {
  return (
    <>
      <DataPipelineBackground />

      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-20 text-center text-white relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-secondary font-medium mb-4"
            >
              Hello, I'm
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold mb-4"
            >
              {profile.name}
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-4xl text-secondary mb-6"
            >
              {profile.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8"
            >
              {profile.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center gap-4 mb-12"
            >
              <a
                href={profile.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              >
                <Github size={24} />
              </a>
              <a
                href={profile.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              >
                <Linkedin size={24} />
              </a>
              <a
                href={`mailto:${profile.contact.email}`}
                className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              >
                <Mail size={24} />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center gap-4"
            >
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 bg-secondary rounded-full font-medium hover:bg-blue-600 transition-colors"
              >
                View My Work
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 bg-white/10 border border-white/30 rounded-full font-medium hover:bg-white/20 transition-colors"
              >
                Contact Me
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <ArrowDown size={32} className="text-white/50" />
          </motion.div>
        </div>
      </section>
    </>
  )
}
