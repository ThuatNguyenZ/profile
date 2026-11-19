import { Github, Linkedin, Mail } from 'lucide-react'
import { profile } from '../../content/profile'

/* global __BUILD_MONTH__ */
const links = [
  { href: `mailto:${profile.email}`, label: 'Email', Icon: Mail },
  { href: profile.github, label: 'GitHub', Icon: Github },
  { href: profile.linkedin, label: 'LinkedIn', Icon: Linkedin },
]

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-site flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between">
        <p className="font-mono text-[11px] text-dim">
          built by hand · react + svg · last deploy {__BUILD_MONTH__}
        </p>
        <div className="flex gap-2">
          {links.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              aria-label={label}
              className="grid h-9 w-9 place-items-center border border-line text-mu transition-colors hover:border-cy hover:text-cy"
            >
              <Icon size={15} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
