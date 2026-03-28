import { useEffect, useRef } from 'react'
import { motion, useInView, useSpring } from 'framer-motion'

export default function AnimatedCounter({ value, duration = 2 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [displayValue, setDisplayValue] = useSpring(0, {
    duration: duration * 1000,
    ease: 'easeOut',
  })

  useEffect(() => {
    if (isInView) {
      displayValue.set(value)
    }
  }, [isInView, value, displayValue])

  useEffect(() => {
    const unsubscribe = displayValue.on('change', (latest) => {
      if (typeof value === 'number') {
        setDisplayValue(Math.round(latest))
      } else {
        setDisplayValue(latest)
      }
    })
    return () => unsubscribe()
  }, [displayValue, setDisplayValue, value])

  return (
    <motion.span ref={ref}>
      {displayValue}
    </motion.span>
  )
}
