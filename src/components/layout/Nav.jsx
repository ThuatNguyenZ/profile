import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { navLinks, profile } from '../../content/profile'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

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

        <div className="ml-auto hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              to={`/#${link.id}`}
              className="font-mono text-[11px] font-medium text-mu transition-colors hover:text-cy"
            >
              // {link.label}
            </Link>
          ))}
        </div>

        <a
          href={profile.cv}
          target="_blank"
          rel="noreferrer"
          className="ml-auto hidden border border-cy bg-cy px-3 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-canvas transition-colors hover:bg-transparent hover:text-cy sm:inline-flex lg:ml-0"
        >
          CV.PDF ↓
        </a>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="ml-auto grid h-9 w-9 place-items-center border border-line text-mu sm:ml-0 lg:hidden"
        >
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-line lg:hidden">
          <div className="container-site flex flex-col py-2">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                to={`/#${link.id}`}
                onClick={close}
                className="border-b border-line py-3 font-mono text-[12px] text-mu hover:text-cy"
              >
                // {link.label}
              </Link>
            ))}
            <a href={profile.cv} target="_blank" rel="noreferrer" className="py-3 font-mono text-[12px] text-cy">
              CV.PDF ↓
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
