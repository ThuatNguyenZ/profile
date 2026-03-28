export default function NLPIcon({ size = 48, color = '#8B5CF6' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="8" y="12" width="32" height="24" rx="4" fill={color} opacity="0.2"/>
      <path d="M14 20L20 20" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M14 28L24 28" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <circle cx="32" cy="16" r="4" fill={color}/>
      <path d="M32 20L32 32" stroke={color} strokeWidth="2"/>
      <circle cx="32" cy="36" r="3" fill={color} opacity="0.6"/>
    </svg>
  )
}
