import { Link } from 'react-router-dom'
import Chip from '../ui/Chip'

export default function CaseHeader({ slug, kicker, title, role, period, chips, children }) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(0,240,255,0.10),transparent_50%)]"
      />
      <div className="container-site relative py-14 md:py-20">
        <nav aria-label="Breadcrumb" className="mb-5 font-mono text-[12px] text-mu">
          <Link to="/" className="hover:text-cy">~</Link>
          <span className="mx-2 text-dim">/</span>
          <Link to="/#builds" className="hover:text-cy">work</Link>
          <span className="mx-2 text-dim">/</span>
          <span className="text-cy" aria-current="page">{slug}</span>
        </nav>
        <p className="font-mono text-[11px] font-medium tracking-[0.08em] text-cy">// {kicker}</p>
        <h1 className="heading-display mt-3 text-[38px] sm:text-[48px] lg:text-[56px]">{title}</h1>
        <p className="mt-4 font-mono text-[12px] text-mu">
          {role} · {period}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {chips.map((c) => (
            <Chip key={c}>{c}</Chip>
          ))}
        </div>
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  )
}
