import { Link } from 'react-router-dom'

export default function CaseNav({ prev, next }) {
  return (
    <nav aria-label="Case studies" className="container-site grid gap-4 py-10 sm:grid-cols-2">
      {[prev, next].map((item, i) =>
        item ? (
          <Link
            key={item.to}
            to={item.to}
            className={`group border border-line bg-s1/40 p-6 lift hover:border-cy ${i === 1 ? 'sm:text-right' : ''}`}
          >
            <p className="label-code">{i === 0 ? '← previous' : 'next →'}</p>
            <p className="mt-1 font-display text-[20px] font-semibold uppercase group-hover:text-cy">{item.label}</p>
          </Link>
        ) : (
          <span key={i} />
        ),
      )}
    </nav>
  )
}
