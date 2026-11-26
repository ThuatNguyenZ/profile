import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useLocation } from 'react-router-dom'

export function RouteSweep() {
  const { pathname } = useLocation()
  return (
    <motion.div
      key={pathname}
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-cy via-vi to-em"
      initial={{ scaleX: 0, opacity: 1 }}
      animate={{ scaleX: 1, opacity: 0 }}
      transition={{ scaleX: { duration: 0.55, ease: 'easeOut' }, opacity: { duration: 0.3, delay: 0.5 } }}
    />
  )
}

export default function RouteTransition({ children }) {
  const location = useLocation()
  const reduce = useReducedMotion()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: reduce ? 0 : 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: reduce ? 0 : -8 }}
        transition={{ duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }}
      >
        {children(location)}
      </motion.div>
    </AnimatePresence>
  )
}
