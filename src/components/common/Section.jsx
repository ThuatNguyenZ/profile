import { motion } from 'framer-motion'
import SoftPattern from './SoftPattern'

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

export default function Section({
  children,
  className = '',
  backgroundColor = 'white',
  patternColor,
  patternOpacity = 0.03,
  id = ''
}) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={sectionVariants}
      className={`py-20 px-4 md:px-8 lg:px-16 ${className} relative`}
      style={{ backgroundColor }}
    >
      {/* Soft decorative pattern */}
      {patternColor && <SoftPattern color={patternColor} opacity={patternOpacity} />}

      <div className="max-w-6xl mx-auto relative z-10">
        {children}
      </div>
    </motion.section>
  )
}
