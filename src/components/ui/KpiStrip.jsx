export default function KpiStrip({ items }) {
  return (
    <div className="grid grid-cols-2 border border-line bg-s1/60 md:grid-cols-4">
      {items.map((item, i) => (
        <div
          key={item.label}
          className={`lift border-line p-4 md:p-5 ${i % 2 === 0 ? 'border-r' : ''} ${i < 2 ? 'border-b md:border-b-0' : ''} md:border-r md:last:border-r-0`}
        >
          <p className="font-display text-[26px] font-semibold tracking-[-0.02em] md:text-[30px]">{item.value}</p>
          <p className="mt-1 text-[12px] leading-snug text-mu">{item.label}</p>
        </div>
      ))}
    </div>
  )
}
