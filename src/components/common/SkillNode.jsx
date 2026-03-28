import { motion } from 'framer-motion'

export default function SkillNode({
  name,
  level,
  color,
  onClick,
  delay = 0
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{ scale: 1.1, boxShadow: '0 10px 40px rgba(0,0,0,0.15)' }}
      onClick={onClick}
      className="cursor-pointer bg-white rounded-xl p-4 shadow-md border-l-4 transition-all"
      style={{ borderColor: color }}
    >
      <div className="flex flex-col items-center text-center">
        <span className="font-semibold text-gray-800 text-sm">{name}</span>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div
            className="h-2 rounded-full transition-all duration-500"
            style={{
              width: `${level}%`,
              backgroundColor: color,
            }}
          />
        </div>
      </div>
    </motion.div>
  )
}
