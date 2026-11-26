import { Link } from 'react-router-dom'

const base =
  'sweep group inline-flex items-center gap-2 border px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.06em]'

const variants = {
  primary: 'border-cy bg-cy text-canvas [--sweep-bg:rgb(var(--c-canvas))] hover:text-cy hover:shadow-glow',
  ghost: 'border-line text-mu [--sweep-bg:rgb(var(--c-cy)/0.08)] hover:border-cy/60 hover:text-tx',
}

// A trailing "→" in a string label slides right on hover.
function Label({ children }) {
  if (typeof children === 'string' && children.endsWith('→')) {
    return (
      <>
        {children.slice(0, -1).trimEnd()}
        <span aria-hidden="true" className="nudge">
          →
        </span>
      </>
    )
  }
  return children
}

export default function Button({ to, href, variant = 'primary', className = '', children, ...rest }) {
  const cls = `${base} ${variants[variant]} ${className}`
  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        <Label>{children}</Label>
      </Link>
    )
  }
  return (
    <a href={href} className={cls} {...rest}>
      <Label>{children}</Label>
    </a>
  )
}
