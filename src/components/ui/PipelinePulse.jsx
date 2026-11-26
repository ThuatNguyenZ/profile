import Chip from './Chip'

export default function PipelinePulse({ stages, title = 'pipeline · live status (illustrative)' }) {
  return (
    <div className="border border-line bg-code">
      <div className="flex items-center justify-between gap-3 border-b border-line px-3 py-2">
        <span className="label-code">{title}</span>
        <Chip tone="em" dot>
          healthy
        </Chip>
      </div>
      <ul className="divide-y divide-line">
        {stages.map((s, i) => (
          <li key={s.label} className="grid grid-cols-[84px_1fr_auto] items-center gap-4 px-4 py-4">
            <div>
              <p className="font-mono text-[12px] text-tx">{s.label}</p>
              <p className="font-mono text-[10px] text-dim">{s.note}</p>
            </div>
            <div className="h-1.5 overflow-hidden bg-line">
              <div className="pulse-bar h-full bg-gradient-to-r from-cy/40 via-cy to-em" style={{ animationDelay: `${i * 0.7}s` }} />
            </div>
            <span className="font-mono text-[10.5px] text-em">OK</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
