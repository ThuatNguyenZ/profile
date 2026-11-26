import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useContext, useRef } from 'react'
import { SpineContext } from '../layout/PipelineSpine'

const TONES = {
  cy: { text: 'text-cy', border: 'border-cy', bg: 'bg-cy', stroke: '#00F0FF', rule: 'from-cy' },
  vi: { text: 'text-vi', border: 'border-vi', bg: 'bg-vi', stroke: '#6366F1', rule: 'from-vi' },
  em: { text: 'text-em', border: 'border-em', bg: 'bg-em', stroke: '#10B981', rule: 'from-em' },
}

// Pipeline-stage section header: node · outlined number · title · stage label, with a rule that grows in.
export default function SectionHeader({ index, label, title, stage, sub, tone = 'cy', node = true, onSpine = false, children, className = '' }) {
  const t = TONES[tone] ?? TONES.cy
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '-35% 0px -55% 0px' })
  const spine = useContext(SpineContext)
  const lit = spine && index ? spine.activeKey === index : inView
  const seen = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()

  return (
    <header ref={ref} className={`relative mb-8 ${onSpine ? 'lg:-ml-[56px]' : ''} ${className}`}>
      <div className="flex items-center gap-3 sm:gap-4">
        {node && (
          <span data-stage-node data-stage-index={index} className="relative grid h-[22px] w-[22px] shrink-0 place-items-center" aria-hidden="true">
            <span className={`stage-ring absolute inset-0 rounded-full border ${t.border}`} />
            <span className={`relative grid h-[22px] w-[22px] place-items-center rounded-full border-2 bg-canvas transition-shadow duration-500 ${t.border} ${lit ? 'shadow-glow' : ''}`}>
              <span className={`h-2 w-2 rounded-full transition-transform duration-500 ${t.bg} ${lit ? 'scale-125' : 'scale-100'}`} />
            </span>
          </span>
        )}
        {index && (
          <span
            className="font-mono text-[30px] font-bold leading-none text-transparent md:text-[40px]"
            style={{ WebkitTextStroke: `1.2px ${t.stroke}` }}
            aria-hidden="true"
          >
            {index}
          </span>
        )}
        <div className="min-w-0">
          <p className={`font-mono text-[10.5px] font-medium uppercase tracking-[0.12em] ${t.text}`}>{label}</p>
          {title && <h2 className="heading-section mt-1 text-[26px] md:text-[34px]">{title}</h2>}
        </div>
        {(stage || sub) && (
          <div className="ml-auto hidden shrink-0 text-right md:block">
            {stage && <p className={`font-mono text-[10.5px] tracking-[0.16em] ${t.text}`}>STAGE · {stage}</p>}
            {sub && <p className="mt-1 max-w-[280px] font-mono text-[11.5px] text-mu">{sub}</p>}
          </div>
        )}
      </div>

      <div className={`relative mt-4 h-[2px] ${node ? 'ml-[34px] sm:ml-[38px]' : ''}`}>
        <motion.div
          className={`absolute inset-0 origin-left bg-gradient-to-r ${t.rule} to-transparent`}
          initial={reduce ? false : { scaleX: 0 }}
          animate={seen || reduce ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1] }}
        />
        <span className={`stage-packet absolute top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${t.bg} shadow-glow`} />
      </div>

      {children && <div className={`mt-4 max-w-2xl text-mu ${onSpine ? 'lg:ml-[56px]' : ''}`}>{children}</div>}
    </header>
  )
}
