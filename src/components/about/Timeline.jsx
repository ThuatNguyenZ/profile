import Reveal from '../ui/Reveal'

export default function Timeline({ items }) {
  return (
    <ol className="relative ml-2 border-l border-line">
      {items.map((item, i) => (
        <li key={`${item.when}-${item.title}`} className="relative pb-8 pl-8 last:pb-0">
          <span
            aria-hidden="true"
            className={`absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border ${item.highlight ? 'border-cy bg-cy shadow-glow' : 'border-mu bg-canvas'}`}
          />
          <Reveal delay={Math.min(i * 0.05, 0.3)}>
            <div className="lift -ml-3 border border-transparent px-3 py-2">
              <p className={`font-mono text-[11px] tracking-[0.08em] ${item.highlight ? 'text-cy' : 'text-dim'}`}>{item.when}</p>
              <p className="mt-0.5 font-display text-[18px] font-semibold">{item.title}</p>
              <p className="mt-1 text-[14px] text-mu">{item.text}</p>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  )
}
