import { Moon, Sun } from 'lucide-react'
import useTheme from '../../lib/useTheme'

export default function ThemeToggle({ className = '' }) {
  const { preference, setPreference } = useTheme()
  const next = preference === 'light' ? 'dark' : 'light'
  const Icon = next === 'light' ? Sun : Moon
  const label = `Switch to ${next} theme`
  return (
    <button
      type="button"
      onClick={() => setPreference(next)}
      aria-label={label}
      title={label}
      className={`icon-btn grid h-9 w-9 place-items-center border border-line text-mu hover:border-cy hover:text-cy ${className}`}
    >
      <Icon size={15} />
    </button>
  )
}
