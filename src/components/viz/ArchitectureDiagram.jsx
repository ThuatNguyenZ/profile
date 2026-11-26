import { useState } from 'react'
import { platform } from '../../content/platform'

const MONO = 'JetBrains Mono, monospace'
const DISPLAY = 'Space Grotesk, sans-serif'
const Y = 40
const H = 70

export default function ArchitectureDiagram() {
  const nodes = platform.architecture
  const GAP = 60
  const W = (1000 - GAP * (nodes.length - 1)) / nodes.length
  const [active, setActive] = useState(null)
  const caption =
    active === 'observability'
      ? { label: 'OBSERVABILITY', role: platform.observability.role }
      : nodes.find((n) => n.id === active)

  return (
    <div>
      <div className="hidden md:block" onMouseLeave={() => setActive(null)}>
        <svg viewBox="0 0 1000 260" className="w-full" role="img" aria-label="Sources, data lake, warehouse and analytics product in sequence, with monitoring across every stage.">
          <defs>
            <marker id="arch-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="8" markerHeight="8" orient="auto">
              <path d="M0 0 L8 4 L0 8 z" fill="#00F0FF" />
            </marker>
          </defs>
          {nodes.slice(0, -1).map((n, i) => {
            const x1 = i * (W + GAP) + W
            return (
              <g key={`e-${n.id}`}>
                <path d={`M${x1} ${Y + H / 2} H${x1 + GAP - 4}`} stroke="#00F0FF" strokeOpacity="0.25" />
                <path d={`M${x1} ${Y + H / 2} H${x1 + GAP - 4}`} stroke="#00F0FF" className="flow" markerEnd="url(#arch-arrow)" />
              </g>
            )
          })}
          {nodes.map((n, i) => {
            const x = i * (W + GAP)
            const lit = active === n.id
            return (
              <g key={n.id} tabIndex={0} aria-label={`${n.label}: ${n.role}`} onMouseEnter={() => setActive(n.id)} onFocus={() => setActive(n.id)} className="cursor-default outline-none">
                <path d={`M${x + W / 2} ${Y + H} V190`} stroke="#10B981" strokeOpacity="0.4" strokeDasharray="2 4" />
                <rect x={x} y={Y} width={W} height={H} fill="#0E1015" stroke={lit ? '#00F0FF' : '#1E2230'} style={lit ? { filter: 'drop-shadow(0 0 8px rgba(0,240,255,0.45))' } : undefined} />
                <text x={x + 12} y={Y + 22} fontFamily={MONO} fontSize="10" letterSpacing="0.08em" fill="#94A3B8">
                  {n.step} · {n.label}
                </text>
                <text x={x + 12} y={Y + 50} fontFamily={DISPLAY} fontSize="17" fontWeight="600" fill="#F8FAFC">
                  {n.title}
                </text>
              </g>
            )
          })}
          <g tabIndex={0} aria-label={`Observability: ${platform.observability.role}`} onMouseEnter={() => setActive('observability')} onFocus={() => setActive('observability')} className="cursor-default outline-none">
            <rect x="0.5" y="190" width="999" height="50" fill="rgba(16,185,129,0.06)" stroke="#10B981" strokeOpacity={active === 'observability' ? 0.9 : 0.4} strokeDasharray="4 4" />
            <text x="16" y="220" fontFamily={MONO} fontSize="11" letterSpacing="0.08em" fill="#10B981">
              ● {platform.observability.title}
            </text>
          </g>
        </svg>
        <p aria-live="polite" className="mt-3 min-h-[2.5rem] font-mono text-[12px] text-mu">
          {caption ? (
            <>
              <span className="text-cy">› {caption.label}</span> — {caption.role}
            </>
          ) : (
            <span className="text-dim">› Hover or focus a stage to see its role.</span>
          )}
        </p>
      </div>

      <ol className="space-y-2 md:hidden">
        {nodes.map((n, i) => (
          <li key={n.id}>
            <div className="panel p-4">
              <p className="label-code text-[9.5px]">
                {n.step} · {n.label}
              </p>
              <p className="mt-1 font-display text-[17px] font-semibold">{n.title}</p>
              <p className="mt-1 text-[13px] text-mu">{n.role}</p>
            </div>
            {i < nodes.length - 1 && (
              <p aria-hidden="true" className="py-1 text-center font-mono text-cy">
                ↓
              </p>
            )}
          </li>
        ))}
        <li className="border border-dashed border-em/50 bg-em/[0.06] p-4">
          <p className="font-mono text-[11px] tracking-[0.08em] text-em">● OBSERVABILITY</p>
          <p className="mt-1 text-[13px] text-mu">{platform.observability.role}</p>
        </li>
      </ol>
    </div>
  )
}
