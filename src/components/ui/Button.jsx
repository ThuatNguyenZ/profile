import { Link } from 'react-router-dom'

const base =
  'inline-flex items-center gap-2 border px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.06em] transition-colors duration-150'

const variants = {
  primary: 'border-cy bg-cy text-canvas hover:bg-transparent hover:text-cy hover:shadow-glow',
  ghost: 'border-line text-mu hover:border-vi hover:text-tx',
}

export default function Button({ to, href, variant = 'primary', className = '', children, ...rest }) {
  const cls = `${base} ${variants[variant]} ${className}`
  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} className={cls} {...rest}>
      {children}
    </a>
  )
}
