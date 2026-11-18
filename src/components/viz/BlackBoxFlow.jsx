function Item({ tone, children }) {
  const color = tone === 'out' ? 'bg-em' : 'bg-cy'
  return (
    <li className="panel flex items-center gap-2 px-3 py-2.5 text-[14px]">
      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${color}`} />
      {children}
    </li>
  )
}

function Arrow() {
  return (
    <p aria-hidden="true" className="text-center font-mono text-[18px] text-cy">
      <span className="md:hidden">↓</span>
      <span className="hidden md:inline">→</span>
    </p>
  )
}

export default function BlackBoxFlow({ inputs, layer, outputs }) {
  return (
    <div className="grid items-center gap-4 md:grid-cols-[1fr_auto_1.2fr_auto_1fr]">
      <div>
        <p className="label-code mb-2">Input</p>
        <ul className="space-y-2">
          {inputs.map((x) => (
            <Item key={x}>{x}</Item>
          ))}
        </ul>
      </div>
      <Arrow />
      <div className="relative overflow-hidden border border-vi/50 bg-vi/[0.06] px-6 py-10 text-center">
        <div aria-hidden="true" className="scan absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-transparent via-vi/25 to-transparent" />
        <p className="label-code relative text-[#b4b6ff]">Processing layer</p>
        <p className="relative mt-2 font-display text-[20px] font-semibold">{layer}</p>
        <p className="relative mt-2 font-mono text-[10.5px] text-dim">internals withheld</p>
      </div>
      <Arrow />
      <div>
        <p className="label-code mb-2">Output</p>
        <ul className="space-y-2">
          {outputs.map((x) => (
            <Item key={x} tone="out">
              {x}
            </Item>
          ))}
        </ul>
      </div>
    </div>
  )
}
