export default function ETLIcon({ size = 48, color = '#3B82F6' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="4" y="8" width="12" height="8" rx="2" fill={color} opacity="0.8"/>
      <rect x="18" y="20" width="12" height="8" rx="2" fill={color}/>
      <rect x="32" y="32" width="12" height="8" rx="2" fill={color} opacity="0.8"/>
      <path d="M16 12L18 12" stroke={color} strokeWidth="2"/>
      <path d="M30 24L32 24" stroke={color} strokeWidth="2"/>
      <path d="M24 16L24 20" stroke={color} strokeWidth="2"/>
      <path d="M24 28L24 32" stroke={color} strokeWidth="2"/>
    </svg>
  )
}
