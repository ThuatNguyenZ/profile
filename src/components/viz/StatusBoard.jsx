import Chip from '../ui/Chip'

function DashboardSketch() {
  const line = [40, 52, 47, 60, 58, 66, 63, 72, 70, 78, 74, 82]
  const points = line.map((v, i) => `${24 + i * 20},${190 - v * 1.2}`).join(' ')
  const bars = [60, 85, 40, 95, 70]
  return (
    <svg viewBox="0 0 400 210" className="w-full" role="img" aria-label="Illustration of a monitoring dashboard">
      <rect x="0.5" y="0.5" width="399" height="209" fill="#0E1015" stroke="#1E2230" />
      {['#00F0FF', '#10B981', '#6366F1'].map((c, i) => (
        <g key={c}>
          <rect x={12 + i * 128} y="12" width="120" height="44" fill="#151821" stroke="#1E2230" />
          <rect x={22 + i * 128} y="22" width="40" height="5" fill="#475569" />
          <rect x={22 + i * 128} y="34" width={60 - i * 12} height="12" fill={c} opacity="0.85" />
        </g>
      ))}
      <rect x="12" y="66" width="248" height="134" fill="#151821" stroke="#1E2230" />
      <polyline points={points} fill="none" stroke="#00F0FF" strokeWidth="1.5" />
      <rect x="268" y="66" width="120" height="134" fill="#151821" stroke="#1E2230" />
      {bars.map((h, i) => (
        <rect key={i} x={280 + i * 21} y={190 - h} width="13" height={h} fill="#6366F1" opacity="0.8" />
      ))}
      <text x="388" y="205" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#475569">
        ILLUSTRATION
      </text>
    </svg>
  )
}

export default function StatusBoard({ categories, stats }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <div key={c.name} className="lift relative bg-s1 p-4 hover:z-10">
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.08em]">{c.name}</p>
              <Chip tone="em" dot>
                OK
              </Chip>
            </div>
            <p className="mt-2 text-[13px] text-mu">{c.detail}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr] lg:items-center">
        <dl className="grid grid-cols-2 gap-px border border-line bg-line">
          {stats.map((s) => (
            <div key={s.label} className="bg-s1 p-4">
              <dt className="font-display text-[24px] font-semibold">{s.value}</dt>
              <dd className="text-[12px] text-mu">{s.label}</dd>
            </div>
          ))}
        </dl>
        <DashboardSketch />
      </div>
    </div>
  )
}
