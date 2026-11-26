import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navLinks, profile } from '../../content/profile'

import useScrollSpy from '../../lib/useScrollSpy'
import ThemeToggle from './ThemeToggle'

const ROUTE_SECTION = { '/about': 'about', '/work/ba3-data-platform': 'platform', '/work/lunch-order': 'builds' }

export default function Nav() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  const { pathname } = useLocation()
  const spied = useScrollSpy(pathname === '/' ? navLinks.filter((l) => !l.to).map((l) => l.id) : [])
  const activeId = pathname === '/' ? spied : ROUTE_SECTION[pathname] ?? null
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })

  return (
    <nav className="sticky top-0 z-40 border-b border-line bg-canvas/85 backdrop-blur-md" aria-label="Primary">
      <div className="container-site flex h-14 items-center gap-6">
        <Link to="/" onClick={close} className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center border border-cy font-mono text-[12px] font-semibold text-cy">
            {profile.initials}
          </span>
          <span className="leading-tight">
            <span className="block font-display text-[14px] font-semibold uppercase">{profile.name}</span>
            <span className="label-code block text-[9.5px]">
              {profile.role} · {profile.locationShort}
            </span>
          </span>
        </Link>

        <div className="ml-auto hidden items-center gap-5 xl:flex">
          {navLinks.map((link) => {
            const active = link.id === activeId
            return (
              <Link
                key={link.id}
                to={link.to ?? `/#${link.id}`}
                className={'relative py-1 font-mono text-[11px] font-medium transition-colors duration-300 ' + (active ? 'text-cy' : 'text-mu hover:text-cy')}
                aria-current={active ? 'location' : undefined}
              >
                <span className={active ? undefined : 'link-grow'}>// {link.label}</span>
                {active && <motion.span layoutId="nav-active" className="absolute inset-x-0 -bottom-[17px] h-[2px] bg-cy shadow-glow" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
              </Link>
            )
          })}
        </div>

        <ThemeToggle />
        <a
          href={profile.cv}
          target="_blank"
          rel="noreferrer"
          className="ml-auto hidden border border-cy bg-cy px-3 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-canvas sweep [--sweep-bg:rgb(var(--c-canvas))] hover:text-cy hover:shadow-glow sm:inline-flex xl:ml-0"
        >
          CV.PDF ↓
        </a>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="ml-auto grid h-9 w-9 place-items-center border border-line text-mu icon-btn sm:ml-0 xl:hidden"
        >
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-line xl:hidden">
          <div className="container-site flex flex-col py-2">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                to={link.to ?? `/#${link.id}`}
                onClick={close}
                className={`border-b border-line py-3 font-mono text-[12px] ${link.id === activeId ? 'text-cy' : 'text-mu hover:text-cy'}`}
              >
                {link.id === activeId && '▸ '}// {link.label}
              </Link>
            ))}
            <a href={profile.cv} target="_blank" rel="noreferrer" className="py-3 font-mono text-[12px] text-cy">
              CV.PDF ↓
            </a>
          </div>
        </div>
      )}
      <motion.div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-cy via-vi to-em" style={{ scaleX: progress }} />
    </nav>
  )
}
