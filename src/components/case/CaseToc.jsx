import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import useScrollSpy from '../../lib/useScrollSpy'

function go(e, id) {
  e.preventDefault()
  const el = document.getElementById(id)
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  history.replaceState(null, '', `#${id}`)
}

export default function CaseToc({ sections }) {
  const active = useScrollSpy(sections.map((s) => s.id))
  const activeIndex = Math.max(0, sections.findIndex((s) => s.id === active))
  const chipBar = useRef(null)

  useEffect(() => {
    const chip = chipBar.current?.querySelector('[data-active="true"]')
    chip?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
  }, [active])

  return (
    <>
      <aside className="hidden lg:block" aria-label="On this page">
        <div className="sticky top-28 py-14">
          <p className="label-code mb-4">on this page</p>
          <ol className="relative border-l border-line">
            <span
              aria-hidden="true"
              className="absolute -left-px top-0 w-px bg-cy shadow-glow transition-all duration-300"
              style={{ height: `${((activeIndex + 1) / sections.length) * 100}%` }}
            />
            {sections.map((s, i) => {
              const on = s.id === active
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={(e) => go(e, s.id)}
                    aria-current={on ? 'location' : undefined}
                    className={`block py-2 pl-4 font-mono text-[11px] uppercase tracking-[0.06em] transition-[color,transform] duration-300 hover:translate-x-1 ${on ? 'text-cy' : 'text-mu hover:text-tx'}`}
                  >
                    <span className={on ? 'text-cy' : 'text-dim'}>{String(i + 1).padStart(2, '0')}</span> {s.label}
                  </a>
                </li>
              )
            })}
          </ol>
          <Link to="/" className="mt-8 inline-block font-mono text-[11px] text-mu hover:text-cy">
            ← back home
          </Link>
        </div>
      </aside>

      <div ref={chipBar} className="sticky top-14 z-30 -mx-4 overflow-x-auto border-b border-line bg-canvas/90 px-4 py-2 backdrop-blur-md md:-mx-8 md:px-8 lg:hidden">
        <ol className="flex w-max gap-2">
          {sections.map((s, i) => {
            const on = s.id === active
            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  data-active={on}
                  onClick={(e) => go(e, s.id)}
                  className={`block whitespace-nowrap border px-2.5 py-1 font-mono text-[10.5px] uppercase ${on ? 'border-cy bg-cy/10 text-cy' : 'border-line text-mu transition-colors duration-300 hover:border-cy/60 hover:text-tx'}`}
                >
                  {String(i + 1).padStart(2, '0')} {s.label}
                </a>
              </li>
            )
          })}
        </ol>
      </div>
    </>
  )
}
