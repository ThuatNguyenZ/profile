export default function SectionHeader({ index, label, title, children, className = '' }) {
  return (
    <header className={`mb-8 max-w-2xl ${className}`}>
      <p className="font-mono text-[11px] font-medium tracking-[0.08em] text-cy">
        {index ? `// ${index} · ${label}` : `// ${label}`}
      </p>
      {title && <h2 className="heading-section mt-2 text-[28px] md:text-[34px]">{title}</h2>}
      {children && <div className="mt-3 text-mu">{children}</div>}
    </header>
  )
}
