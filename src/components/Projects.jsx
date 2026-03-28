import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, BookOpen, Award, Lightbulb, Zap, Target } from 'lucide-react'
import Section from './common/Section'
import { projects } from '../data/projects'

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <Section id="projects" backgroundColor="#F8FAFC">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-primary mb-4"
        >
          Projects & Publications
        </motion.h2>
        <div className="w-20 h-1 bg-secondary mx-auto mb-4" />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-gray-600 max-w-2xl mx-auto"
        >
          Research and projects at the intersection of Data Engineering and AI/ML
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
            onClick={() => setSelectedProject(project)}
            className="bg-white rounded-2xl p-6 cursor-pointer shadow-md hover:shadow-xl transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-primary">{project.title}</h3>
                <p className="text-secondary text-sm mt-1">{project.subtitle}</p>
              </div>
              {project.publication?.rank && (
                <span className="px-3 py-1 bg-accent text-white text-xs font-medium rounded-full">
                  Q2 Journal
                </span>
              )}
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-surface rounded text-xs text-gray-600"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="px-2 py-1 text-xs text-gray-400">
                  +{project.technologies.length - 4} more
                </span>
              )}
            </div>

            {project.publication && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <BookOpen size={16} />
                <span>{project.publication.journal || project.publication.conference}</span>
              </div>
            )}

            <button className="mt-4 text-secondary font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
              View Details <ExternalLink size={14} />
            </button>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl p-8 max-w-3xl w-full my-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-primary">
                    {selectedProject.title}
                  </h3>
                  <p className="text-secondary">{selectedProject.subtitle}</p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-red-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-red-600 font-bold mb-2">
                    <Target size={20} />
                    Problem
                  </div>
                  <p className="text-gray-700">{selectedProject.problem}</p>
                </div>

                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-blue-600 font-bold mb-2">
                    <Lightbulb size={20} />
                    Solution
                  </div>
                  <p className="text-gray-700">{selectedProject.solution}</p>
                </div>

                <div className="bg-green-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-green-600 font-bold mb-2">
                    <Zap size={20} />
                    Impact
                  </div>
                  <p className="text-gray-700">{selectedProject.impact}</p>
                </div>

                <div>
                  <h4 className="font-bold text-primary mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-surface rounded-full text-sm text-gray-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedProject.publication && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Award size={18} className="text-accent" />
                    <span>
                      Published in {selectedProject.publication.journal || selectedProject.publication.conference}
                      {selectedProject.publication.rank && ` (${selectedProject.publication.rank})`}
                    </span>
                  </div>
                )}

                {selectedProject.publication?.doi && (
                  <a
                    href={selectedProject.publication.doi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-secondary hover:text-blue-600 transition-colors"
                  >
                    <ExternalLink size={16} />
                    <span>View Publication</span>
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}
