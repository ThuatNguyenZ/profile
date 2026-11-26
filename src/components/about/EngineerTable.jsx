import { motion, useReducedMotion } from 'framer-motion'

function Value({ row }) {
  if (row.list) {
    return (
      <span className="text-mu">
        {'{'}
        {row.list.map((item, i) => (
          <span key={item}>
            <span className="text-tx">{item}</span>
            {i < row.list.length - 1 ? ', ' : ''}
          </span>
        ))}
        {'}'}
      </span>
    )
  }
  if (row.status) {
    return (
      <span className="inline-flex items-center gap-1.5 border border-em/50 bg-em/10 px-2 py-0.5 text-[11.5px] text-em">
        <span aria-hidden="true" className="pulse-dot h-1.5 w-1.5 rounded-full bg-em" />
        {row.status}
      </span>
    )
  }
  return (
    <span className={row.accent ? 'text-cy' : row.muted ? 'text-mu' : 'text-tx'}>
      <span className={row.strong ? 'font-semibold' : ''}>{row.value}</span>
      {row.comment && <span className="ml-3 hidden text-dim sm:inline">-- {row.comment}</span>}
    </span>
  )
}

export default function EngineerTable({ data }) {
  const reduce = useReducedMotion()
  return (
    <div className="lift border border-line bg-s1/80 font-mono text-[13px] backdrop-blur-sm">
      <div className="flex items-center justify-between gap-3 border-b border-line border-l-4 border-l-cy px-4 py-3">
        <span className="text-dim">
          TABLE <span className="text-mu">public.</span>
          <span className="font-bold text-tx">{data.table}</span>
        </span>
        <span className="flex items-center gap-2 text-[11px] text-mu">
          <span aria-hidden="true" className="pulse-dot h-1.5 w-1.5 rounded-full bg-em shadow-glow-em" />
          <span className="hidden sm:inline">{data.meta}</span>
        </span>
      </div>
      <div className="grid grid-cols-[110px_minmax(0,1fr)] gap-x-4 border-b border-line bg-canvas/60 px-4 py-2 text-[10.5px] tracking-[0.14em] text-dim sm:grid-cols-[130px_110px_minmax(0,1fr)]">
        <span>COLUMN</span>
        <span className="hidden sm:block">TYPE</span>
        <span>VALUE</span>
      </div>
      <div className="relative overflow-hidden">
        <div aria-hidden="true" className="row-scan pointer-events-none absolute inset-x-0 top-0 h-[12.5%] bg-gradient-to-r from-transparent via-cy/10 to-transparent" />
        <dl>
          {data.rows.map((row, i) => (
            <motion.div
              key={row.column}
              className="grid grid-cols-[110px_minmax(0,1fr)] items-baseline gap-x-4 border-b border-line px-4 py-2.5 last:border-b-0 sm:grid-cols-[130px_110px_minmax(0,1fr)]"
              initial={reduce ? false : { opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.45, delay: reduce ? 0 : 0.08 * i, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <dt className="flex items-center gap-2 text-tx">
                {row.pk && <span className="border border-am/50 bg-am/10 px-1 text-[9.5px] text-am">PK</span>}
                {row.column}
              </dt>
              <dd className="hidden text-vi sm:block">{row.type}</dd>
              <dd className="min-w-0 break-words">
                <Value row={row} />
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
      <div className="border-t border-line px-4 py-2.5 text-[11.5px] text-dim">
        <span className="text-em">thuat=#</span> {data.query}
        <span aria-hidden="true" className="caret ml-1 inline-block h-[1em] w-[0.55em] translate-y-[2px] bg-cy" />
      </div>
    </div>
  )
}
