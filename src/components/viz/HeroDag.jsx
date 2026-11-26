import { useState } from 'react'
import { platform } from '../../content/platform'
import { C, alpha } from '../../theme/svg'

const MONO = 'JetBrains Mono, monospace'
const ARIA = 'Marketplace and advertising data flow into a data lake, then a warehouse and analytics, with monitoring across every stage.'

function Edge({ d, color, packets = 1, delay = 0 }) {
  return (
    <>
      <path d={d} fill="none" style={{ stroke: color }} strokeOpacity="0.22" strokeWidth="1.2" />
      <path d={d} fill="none" style={{ stroke: color }} strokeWidth="1.4" className="flow" />
      {Array.from({ length: packets }, (_, i) => (
        <circle key={i} r="2.6" className="packet" style={{ fill: color, filter: `drop-shadow(0 0 4px ${color})` }}>
          <animateMotion dur="4.8s" repeatCount="indefinite" begin={`${delay + i * 1.6}s`} path={d} />
        </circle>
      ))}
    </>
  )
}

function Box({ id, x, y, w, h = 36, label, active, highlight, onActivate, roleKey = id }) {
  const node = platform.heroNodes[roleKey]
  const lit = active === roleKey || highlight
  return (
    <g tabIndex={0} aria-label={`${label}: ${node.role}`} onMouseEnter={() => onActivate(roleKey)} onFocus={() => onActivate(roleKey)} className="cursor-default outline-none">
      <rect x={x} y={y} width={w} height={h} style={{ fill: C.s1, stroke: lit ? C.cy : C.line, filter: active === roleKey ? `drop-shadow(0 0 8px ${alpha('cy', 0.45)})` : undefined }} />
      <text x={x + w / 2} y={y + h / 2 + 3.5} textAnchor="middle" fontFamily={MONO} fontSize="10" letterSpacing="0.06em" style={{ fill: highlight ? C.cy : C.tx }}>
        {label}
      </text>
    </g>
  )
}

function Monitor({ d, ticks, text, tx, ty, anchor = 'start', active, onActivate }) {
  const node = platform.heroNodes.observe
  return (
    <g tabIndex={0} aria-label={`${node.label}: ${node.role}`} onMouseEnter={() => onActivate('observe')} onFocus={() => onActivate('observe')} className="cursor-default outline-none">
      <path d={d} style={{ stroke: C.em }} strokeOpacity={active === 'observe' ? 0.9 : 0.5} strokeDasharray="2 4" />
      {ticks.map((t) => (
        <path key={t} d={t} style={{ stroke: C.em }} strokeOpacity="0.4" strokeDasharray="2 4" />
      ))}
      <text x={tx} y={ty} textAnchor={anchor} fontFamily={MONO} fontSize="10" style={{ fill: C.em }}>
        {text}
      </text>
    </g>
  )
}

function Horizontal({ active, onActivate }) {
  const [market, ads] = platform.sourceGroups
  return (
    <svg viewBox="0 0 760 214" className="w-full" role="img" aria-label={ARIA}>
      {[56, 67, 78].map((y, i) => (
        <Edge key={`m${y}`} d={`M140 ${y} C180 ${y} 180 110 220 110`} color={C.cy} delay={i * 0.5} />
      ))}
      {[142, 153, 164].map((y, i) => (
        <Edge key={`a${y}`} d={`M140 ${y} C180 ${y} 180 110 220 110`} color={C.vi} delay={0.25 + i * 0.5} />
      ))}
      <Edge d="M350 110 H390" color={C.cy} packets={2} />
      <Edge d="M550 110 H590" color={C.em} packets={2} delay={0.8} />

      <Box id="marketplaces" roleKey="sources" x={0} y={44} w={140} h={46} label={market.label} active={active} onActivate={onActivate} />
      <Box id="ads" roleKey="sources" x={0} y={130} w={140} h={46} label={ads.label} active={active} onActivate={onActivate} />
      <Box id="lake" x={220} y={92} w={130} label={platform.heroNodes.lake.label} active={active} onActivate={onActivate} />
      <Box id="warehouse" x={390} y={92} w={160} label={platform.heroNodes.warehouse.label} active={active} highlight onActivate={onActivate} />
      <Box id="analytics" x={590} y={92} w={170} label={platform.heroNodes.analytics.label} active={active} onActivate={onActivate} />

      <Monitor d="M220 176 H760" ticks={['M285 128 V176', 'M470 128 V176', 'M675 128 V176']} text="● MONITORING · automated checks · alerts" tx={220} ty={198} active={active} onActivate={onActivate} />
    </svg>
  )
}

function Vertical({ active, onActivate }) {
  const [market, ads] = platform.sourceGroups
  return (
    <svg viewBox="0 0 340 330" className="w-full" role="img" aria-label={ARIA}>
      <Edge d="M85 48 C85 80 170 70 170 104" color={C.cy} />
      <Edge d="M255 48 C255 80 170 70 170 104" color={C.vi} delay={0.4} />
      <Edge d="M170 138 V164" color={C.cy} />
      <Edge d="M170 198 V224" color={C.em} delay={0.6} />

      <Box id="marketplaces" roleKey="sources" x={10} y={12} w={150} label={market.label} active={active} onActivate={onActivate} />
      <Box id="ads" roleKey="sources" x={180} y={12} w={150} label={ads.label} active={active} onActivate={onActivate} />
      <Box id="lake" x={100} y={104} w={140} h={34} label={platform.heroNodes.lake.label} active={active} onActivate={onActivate} />
      <Box id="warehouse" x={100} y={164} w={140} h={34} label={platform.heroNodes.warehouse.label} active={active} highlight onActivate={onActivate} />
      <Box id="analytics" x={100} y={224} w={140} h={34} label={platform.heroNodes.analytics.label} active={active} onActivate={onActivate} />

      <Monitor d="M300 121 V241" ticks={['M240 121 H300', 'M240 181 H300', 'M240 241 H300']} text="● MONITORING · automated checks" tx={170} ty={300} anchor="middle" active={active} onActivate={onActivate} />
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
