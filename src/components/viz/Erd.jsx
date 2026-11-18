const MONO = 'JetBrains Mono, monospace'
const DISPLAY = 'Space Grotesk, sans-serif'
const BOX_W = 200
const BOX_H = 104
const COLS = [40, 350, 660]
const ROWS = [30, 220]

function positions(entities) {
  return Object.fromEntries(entities.map((e, i) => [e.id, { x: COLS[i % 3], y: ROWS[Math.floor(i / 3)] }]))
}

export default function Erd({ entities, relations }) {
  const pos = positions(entities)
  const center = (id) => ({ x: pos[id].x + BOX_W / 2, y: pos[id].y + BOX_H / 2 })
  const names = Object.fromEntries(entities.map((e) => [e.id, e.name]))

  return (
    <div>
      <svg viewBox="0 0 900 360" className="hidden w-full md:block" role="img" aria-label={`Data model: ${relations.map(([a, b, l]) => `${names[a]} ${l} ${names[b]}`).join('; ')}.`}>
        {relations.map(([a, b]) => {
          const p = center(a)
          const q = center(b)
          return <line key={`${a}-${b}`} x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke="#6366F1" strokeOpacity="0.6" strokeWidth="1.2" />
        })}
        {entities.map((e) => {
          const { x, y } = pos[e.id]
          return (
            <g key={e.id}>
              <rect x={x} y={y} width={BOX_W} height={BOX_H} fill="#0E1015" stroke="#1E2230" />
              <rect x={x} y={y} width={BOX_W} height="28" fill="#151821" stroke="#1E2230" />
              <text x={x + 12} y={y + 19} fontFamily={DISPLAY} fontSize="14" fontWeight="600" fill="#F8FAFC">
                {e.name}
              </text>
              {e.fields.map((f, i) => (
                <text key={f} x={x + 12} y={y + 48 + i * 20} fontFamily={MONO} fontSize="11" fill="#94A3B8">
                  · {f}
                </text>
              ))}
            </g>
          )
        })}
        {relations.map(([a, b, label]) => {
          const p = center(a)
          const q = center(b)
          const mx = (p.x + q.x) / 2
          const my = (p.y + q.y) / 2
          const w = label.length * 6.6 + 12
          return (
            <g key={`l-${a}-${b}`}>
              <rect x={mx - w / 2} y={my - 9} width={w} height="18" fill="#08090C" stroke="#6366F1" strokeOpacity="0.6" />
              <text x={mx} y={my + 3.5} textAnchor="middle" fontFamily={MONO} fontSize="10" fill="#b4b6ff">
                {label}
              </text>
            </g>
          )
        })}
      </svg>

      <div className="space-y-4 md:hidden">
        <div className="grid grid-cols-2 gap-2">
          {entities.map((e) => (
            <div key={e.id} className="panel p-3">
              <p className="font-display text-[14px] font-semibold">{e.name}</p>
              <ul className="mt-1 font-mono text-[10.5px] text-mu">
                {e.fields.map((f) => (
                  <li key={f}>· {f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <ul className="space-y-1 font-mono text-[12px] text-mu">
          {relations.map(([a, b, label]) => (
            <li key={`${a}-${b}`}>
              {names[a]} <span className="text-[#b4b6ff]">— {label} →</span> {names[b]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
