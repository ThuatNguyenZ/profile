import { Monitor, Moon, Sun } from 'lucide-react'
import useTheme from '../../lib/useTheme'

const NEXT = { system: 'light', light: 'dark', dark: 'system' }
const ICON = { system: Monitor, light: Sun, dark: Moon }
const LABEL = { system: 'Theme: follow system', light: 'Theme: light', dark: 'Theme: dark' }

export default function ThemeToggle({ className = '' }) {
  const { preference, setPreference } = useTheme()
  const Icon = ICON[preference]
  return (
    <button
      type="button"
      onClick={() => setPreference(NEXT[preference])}
      aria-label={`${LABEL[preference]} (click to change)`}
      title={LABEL[preference]}
      className={`icon-btn grid h-9 w-9 place-items-center border border-line text-mu hover:border-cy hover:text-cy ${className}`}
    >
      <Icon size={15} />
    </button>
  )
}
