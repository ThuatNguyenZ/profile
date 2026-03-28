import { motion } from 'framer-motion'

export default function SocialLink({
  href,
  icon: Icon,
  label,
  color = 'text-primary'
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center gap-2 ${color} hover:opacity-80 transition-colors duration-300`}
    >
      <Icon size={20} />
      <span className="hidden md:inline">{label}</span>
    </motion.a>
  )
}
