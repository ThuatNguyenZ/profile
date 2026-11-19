import { useState } from 'react'
import { platform } from '../../content/platform'

const CY = '#00F0FF'
const VI = '#6366F1'
const EM = '#10B981'
const LINE = '#1E2230'
const MONO = 'JetBrains Mono, monospace'

function Edge({ d, color }) {
  return (
    <>
      <path d={d} fill="none" stroke={color} strokeOpacity="0.22" strokeWidth="1.2" />
      <path d={d} fill="none" stroke={color} strokeWidth="1.4" className="flow" />
    </>
  )
}

function NodeBox({ id, x, y, w, h = 36, active, highlight, onActivate }) {
  const { label, role } = platform.heroNodes[id]
  const lit = active === id || highlight
  return (
    <g
      tabIndex={0}
      aria-label={`${label}: ${role}`}
      onMouseEnter={() => onActivate(id)}
      onFocus={() => onActivate(id)}
      className="cursor-default outline-none"
    >
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill="#0E1015"
        stroke={lit ? CY : LINE}
        style={active === id ? { filter: 'drop-shadow(0 0 8px rgba(0,240,255,0.45))' } : undefined}
      />
      <text x={x + w / 2} y={y + h / 2 + 3.5} textAnchor="middle" fontFamily={MONO} fontSize="10" fill={highlight ? CY : '#F8FAFC'}>
        {label}
      </text>
    </g>
  )
}

function SourceLabel({ name, x, y, anchor = 'start', active, onActivate }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontFamily={MONO}
      fontSize="10"
      letterSpacing="0.06em"
      fill={active === 'sources' ? '#F8FAFC' : '#94A3B8'}
      tabIndex={0}
      aria-label={`${name}: ${platform.heroNodes.sources.role}`}
      onMouseEnter={() => onActivate('sources')}
      onFocus={() => onActivate('sources')}
      className="cursor-default outline-none"
    >
      {name.toUpperCase()}
    </text>
  )
}

function Horizontal({ active, onActivate }) {
  const ys = platform.sources.map((_, i) => 26 + i * 40)
  const mid = 126
  return (
    <svg viewBox="0 0 760 236" className="w-full" role="img" aria-label="Six sources flow into a data lake, then a raw warehouse, a clean warehouse and analytics, all monitored every 15 minutes.">
      {platform.sources.map((name, i) => (
        <g key={name}>
          <SourceLabel name={name} x={0} y={ys[i] + 3.5} active={active} onActivate={onActivate} />
          <Edge d={`M118 ${ys[i]} C165 ${ys[i]} 165 ${mid} 210 ${mid}`} color={i >= 4 ? VI : CY} />
        </g>
      ))}
      <Edge d={`M314 ${mid} H344`} color={CY} />
      <Edge d={`M474 ${mid} H504`} color={CY} />
      <Edge d={`M640 ${mid} H664`} color={EM} />

      <NodeBox id="lake" x={210} y={108} w={104} active={active} onActivate={onActivate} />
      <NodeBox id="raw" x={344} y={108} w={130} active={active} onActivate={onActivate} />
      <NodeBox id="clean" x={504} y={108} w={136} active={active} highlight onActivate={onActivate} />
      <NodeBox id="analytics" x={664} y={108} w={96} active={active} onActivate={onActivate} />

      <g
        tabIndex={0}
        aria-label={`${platform.heroNodes.observe.label}: ${platform.heroNodes.observe.role}`}
        onMouseEnter={() => onActivate('observe')}
        onFocus={() => onActivate('observe')}
        className="cursor-default outline-none"
      >
        <path d="M210 186 H760" stroke={EM} strokeOpacity={active === 'observe' ? 0.9 : 0.5} strokeDasharray="2 4" />
        {[262, 409, 572, 712].map((x) => (
          <path key={x} d={`M${x} 144 V186`} stroke={EM} strokeOpacity="0.4" strokeDasharray="2 4" />
        ))}
        <text x={210} y={208} fontFamily={MONO} fontSize="10" fill={EM}>
          ● OBSERVE · 20+ checks · every 15 min
        </text>
      </g>
    </svg>
  )
}

function Vertical({ active, onActivate }) {
  const rows = [20, 48, 76]
  const cols = [{ x: 20, start: 114 }, { x: 320, start: 226, anchor: 'end' }]
  const centerX = 170
  return (
    <svg viewBox="0 0 340 420" className="w-full" role="img" aria-label="Six sources flow into a data lake, then a raw warehouse, a clean warehouse and analytics, all monitored every 15 minutes.">
      {platform.sources.map((name, i) => {
        const col = cols[i < 3 ? 0 : 1]
        const y = rows[i % 3]
        return (
          <g key={name}>
            <SourceLabel name={name} x={col.x} y={y} anchor={col.anchor} active={active} onActivate={onActivate} />
            <Edge d={`M${col.start} ${y - 3} C${col.start} 112 ${centerX} 100 ${centerX} 130`} color={i >= 4 ? VI : CY} />
          </g>
        )
      })}
      <Edge d="M170 164 V190" color={CY} />
      <Edge d="M170 224 V250" color={CY} />
      <Edge d="M170 284 V310" color={EM} />

      <NodeBox id="lake" x={110} y={130} w={120} h={34} active={active} onActivate={onActivate} />
      <NodeBox id="raw" x={110} y={190} w={120} h={34} active={active} onActivate={onActivate} />
      <NodeBox id="clean" x={110} y={250} w={120} h={34} active={active} highlight onActivate={onActivate} />
      <NodeBox id="analytics" x={110} y={310} w={120} h={34} active={active} onActivate={onActivate} />

      <g
        tabIndex={0}
        aria-label={`${platform.heroNodes.observe.label}: ${platform.heroNodes.observe.role}`}
        onMouseEnter={() => onActivate('observe')}
        onFocus={() => onActivate('observe')}
        className="cursor-default outline-none"
      >
        <path d="M300 147 V327" stroke={EM} strokeOpacity={active === 'observe' ? 0.9 : 0.5} strokeDasharray="2 4" />
        {[147, 207, 267, 327].map((y) => (
          <path key={y} d={`M230 ${y} H300`} stroke={EM} strokeOpacity="0.4" strokeDasharray="2 4" />
        ))}
        <text x={170} y={384} textAnchor="middle" fontFamily={MONO} fontSize="10" fill={EM}>
          ● OBSERVE · 20+ checks · every 15 min
        </text>
      </g>
    </svg>
  )
}

export default function HeroDag() {
  const [active, setActive] = useState(null)
  const node = active ? platform.heroNodes[active] : null

  return (
    <div onMouseLeave={() => setActive(null)}>
      <div className="hidden md:block">
        <Horizontal active={active} onActivate={setActive} />
      </div>
      <div className="mx-auto max-w-sm md:hidden">
        <Vertical active={active} onActivate={setActive} />
      </div>
      <p aria-live="polite" className="mt-3 min-h-[2.5rem] font-mono text-[12px] text-mu">
        {node ? (
          <>
            <span className="text-cy">› {node.label}</span> — {node.role}
          </>
        ) : (
          <span className="text-dim">› {platform.heroHint}</span>
        )}
      </p>
    </div>
  )
}
