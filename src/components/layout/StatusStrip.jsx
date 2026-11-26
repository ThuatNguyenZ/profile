import { statusStrip } from '../../content/profile'

function Items({ hidden = false }) {
  return (
    <div className="flex shrink-0 items-center gap-8 pr-8" aria-hidden={hidden || undefined}>
      {statusStrip.map((item) => (
        <span key={item.label} className="whitespace-nowrap">
          <span aria-hidden="true" className="pulse-dot mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-em align-middle shadow-glow-em" />
          {item.label} <b className="font-medium text-tx">{item.value}</b>
        </span>
      ))}
    </div>
  )
}

export default function StatusStrip() {
  return (
    <div className="group overflow-hidden border-b border-line">
      <div className="marquee flex h-9 w-max items-center font-mono text-[10.5px] text-mu group-hover:[animation-play-state:paused]">
        <Items />
        <Items hidden />
      </div>
    </div>
  )
}
