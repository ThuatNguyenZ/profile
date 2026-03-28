import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useSpring } from 'framer-motion'

export default function AnimatedCounter({ value, duration = 2 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const springValue = useSpring(0, {
    duration: duration * 1000,
    ease: 'easeOut',
  })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (isInView) {
      springValue.set(value)
    }
  }, [isInView, value, springValue])

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(Math.round(latest))
    })
    return () => unsubscribe()
  }, [springValue, setDisplayValue])

  return (
    <motion.span ref={ref}>
      {displayValue}
    </motion.span>
  )
}
