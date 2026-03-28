export default function WebScrapingIcon({ size = 48, color = '#F59E0B' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="8" y="8" width="32" height="24" rx="2" stroke={color} strokeWidth="2"/>
      <circle cx="24" cy="20" r="6" fill={color} opacity="0.3"/>
      <path d="M20 38L24 42L28 38" stroke={color} strokeWidth="2"/>
      <path d="M24 32L24 42" stroke={color} strokeWidth="2"/>
    </svg>
  )
}
