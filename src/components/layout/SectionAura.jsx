import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const TONE = { cy: 'cy', vi: 'vi', em: 'em' }

// Stage-coloured glows + registration marks behind one section, placed as its first child.
// Default `layer` (-z-10) needs a `relative isolate overflow-hidden` section. On the home page the
// sections cannot isolate (the spine must pass between the aura and the stage nodes), so they use
// layer="z-0" and lift their content with `relative z-[1]`.
export default function SectionAura({ tone = 'cy', side = 'left', mark, layer = '-z-10' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -60])
  const c = TONE[tone] ?? 'cy'
  const main = side === 'left' ? '-left-[12%] top-[-10%]' : '-right-[12%] top-[-10%]'
  const second = side === 'left' ? 'right-[-8%] bottom-[-25%]' : 'left-[-8%] bottom-[-25%]'

  return (
    <div ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 ${layer}`}>
      <motion.div style={{ y }} className="absolute inset-0">
        <div className={`aura absolute ${main} h-[42rem] w-[42rem] rounded-full blur-[110px]`} style={{ background: `rgb(var(--c-${c}))` }} />
        <div className={`aura aura-b absolute ${second} h-[30rem] w-[30rem] rounded-full blur-[120px]`} style={{ background: `rgb(var(--c-${c === 'em' ? 'cy' : c === 'cy' ? 'vi' : 'em'}))`, opacity: 'calc(var(--aura-a) * 0.6)' }} />
      </motion.div>
      <div className="container-site relative h-full">
        <span className={`absolute left-4 top-6 h-3 w-3 border-l border-t border-${c}/40 md:left-8 xl:left-10`} />
        <span className={`absolute right-4 top-6 h-3 w-3 border-r border-t border-${c}/40 md:right-8 xl:right-10`} />
        <span className={`absolute bottom-6 left-4 h-3 w-3 border-b border-l border-${c}/40 md:left-8 xl:left-10`} />
        <span className={`absolute bottom-6 right-4 h-3 w-3 border-b border-r border-${c}/40 md:right-8 xl:right-10`} />
        {mark && (
          <span className="absolute right-4 top-11 hidden font-mono text-[10px] tracking-[0.14em] text-dim md:right-8 md:block xl:right-10">
            {mark}
          </span>
        )}
      </div>
    </div>
  )
}
