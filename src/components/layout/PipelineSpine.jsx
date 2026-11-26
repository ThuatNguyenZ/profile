import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'

// Continuous pipeline line behind the home sections; a packet and a fill follow the scroll.
export default function PipelineSpine({ children }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 60%', 'end 60%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 })
  const top = useTransform(progress, (v) => `${v * 100}%`)

  return (
    <div ref={ref} className="relative">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
        <div className="container-site relative h-full">
          <div className="absolute bottom-16 left-[calc(2rem+10.5px)] top-16 w-px xl:left-[calc(2.5rem+10.5px)]">
            <div className="absolute inset-0 bg-line" />
            <motion.div className="absolute inset-x-0 top-0 origin-top bg-gradient-to-b from-cy via-vi to-em" style={{ scaleY: progress, height: '100%' }} />
            <motion.span
              className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cy shadow-glow"
              style={{ top }}
            />
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}
