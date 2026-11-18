const tones = {
  em: 'border-em/25 bg-em/[0.08] text-[#7ee2bd]',
  cy: 'border-cy/25 bg-cy/[0.07] text-[#8ff7ff]',
  vi: 'border-vi/30 bg-vi/10 text-[#b4b6ff]',
  plain: 'border-line bg-transparent text-mu',
}

const dots = {
  em: 'bg-em shadow-glow-em',
  cy: 'bg-cy shadow-glow',
  vi: 'bg-vi',
  plain: 'bg-mu',
}

export default function Chip({ tone = 'plain', dot = false, children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 border px-2 py-0.5 font-mono text-[10.5px] font-medium uppercase tracking-[0.04em] ${tones[tone]} ${className}`}
    >
      {dot && <span aria-hidden="true" className={`pulse-dot h-1.5 w-1.5 rounded-full ${dots[tone]}`} />}
      {children}
    </span>
  )
}
