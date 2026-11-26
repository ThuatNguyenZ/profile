import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const TONE = { cy: 'cy', vi: 'vi', em: 'em' }
const MARK_LEFT = {
  none: 'left-4 md:left-8 xl:left-10',
  container: 'left-4 md:left-8 lg:left-[calc(2rem+36px)] xl:left-[calc(2.5rem+36px)]',
  column: 'left-0 lg:left-9',
}

// Stage-coloured glows + registration marks behind one section, placed as its first child.
// Default `layer` (-z-10) needs a `relative isolate overflow-hidden` section. Sections with a spine
// use layer="z-0" and lift their content with `relative z-[1]` so the spine can pass between them.
export default function SectionAura({ tone = 'cy', side = 'left', mark, layer = '-z-10', spine = 'none' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -60])
  const c = TONE[tone] ?? 'cy'
  const main = side === 'left' ? '-left-[12%] top-[-10%]' : '-right-[12%] top-[-10%]'
  const second = side === 'left' ? 'right-[-8%] bottom-[-25%]' : 'left-[-8%] bottom-[-25%]'
  const column = spine === 'column'
  const left = MARK_LEFT[spine]
  const right = column ? 'right-0' : 'right-4 md:right-8 xl:right-10'

  return (
    <div ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 ${layer}`}>
      <motion.div
        style={{ y }}
        className={`absolute inset-0 ${
          // Fade the glow at the edges of column-width sections.
          column || layer === '-z-10'
            ? '[mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,black_18%,black_82%,transparent),linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]'
            : ''
        }`}
      >
        <div className={`aura absolute ${main} h-[42rem] w-[42rem] rounded-full blur-[110px]`} style={{ background: `rgb(var(--c-${c}))` }} />
        <div className={`aura aura-b absolute ${second} h-[30rem] w-[30rem] rounded-full blur-[120px]`} style={{ background: `rgb(var(--c-${c === 'em' ? 'cy' : c === 'cy' ? 'vi' : 'em'}))`, opacity: 'calc(var(--aura-a) * 0.6)' }} />
      </motion.div>
      <div className={column ? 'absolute inset-0' : 'container-site relative h-full'}>
        <span className={`absolute top-6 h-3 w-3 border-l border-t border-${c}/40 ${left}`} />
        <span className={`absolute top-6 h-3 w-3 border-r border-t border-${c}/40 ${right}`} />
        <span className={`absolute bottom-6 h-3 w-3 border-b border-l border-${c}/40 ${left}`} />
        <span className={`absolute bottom-6 h-3 w-3 border-b border-r border-${c}/40 ${right}`} />
        {mark && (
          <span className="absolute right-4 top-11 hidden font-mono text-[10px] tracking-[0.14em] text-dim md:right-8 md:block xl:right-10">
            {mark}
          </span>
        )}
      </div>
    </div>
  )
}
