import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

const styles = {
  cmd: 'text-tx',
  out: 'text-codetx',
  dim: 'text-dim',
}

export default function Terminal({ title = 'terminal', lines, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const reduce = useReducedMotion()
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (reduce) {
      setShown(lines.length)
      return undefined
    }
    if (!inView || shown >= lines.length) return undefined
    const timer = setTimeout(() => setShown((s) => s + 1), shown === 0 ? 300 : 420)
    return () => clearTimeout(timer)
  }, [inView, shown, reduce, lines.length])

  return (
    <div ref={ref} className={`border border-line bg-code ${className}`}>
      <div className="flex items-center gap-2 border-b border-line px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-red-500/70" />
        <span className="h-2 w-2 rounded-full bg-am/70" />
        <span className="h-2 w-2 rounded-full bg-em/70" />
        <span className="label-code ml-2">{title}</span>
      </div>
      <pre
        className="min-h-[220px] overflow-x-auto px-4 py-4 font-mono text-[12.5px] leading-[1.75]"
        aria-label={lines.map((l) => l.text).join('\n')}
      >
        {lines.slice(0, shown).map((line, i) => (
          <div key={i} className={styles[line.kind]}>
            {line.kind === 'cmd' && <span className="text-em">$ </span>}
            {line.text}
          </div>
        ))}
        <div>
          <span className="text-em">$ </span>
          <span className="caret inline-block h-[1em] w-[0.6em] translate-y-[2px] bg-cy" />
        </div>
      </pre>
    </div>
  )
}
