import { statusStrip } from '../../content/profile'

export default function StatusStrip() {
  return (
    <div className="border-b border-line">
      <div className="container-site flex h-9 items-center gap-6 overflow-hidden whitespace-nowrap font-mono text-[10.5px] text-mu">
        {statusStrip.map((item, i) => (
          <span key={item.label} className={i > 1 ? 'hidden md:inline' : ''}>
            {i === 0 && (
              <span aria-hidden="true" className="pulse-dot mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-em align-middle shadow-glow-em" />
            )}
            {item.label} <b className="font-medium text-tx">{item.value}</b>
          </span>
        ))}
      </div>
    </div>
  )
}
