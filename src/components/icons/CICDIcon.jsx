export default function CICDIcon({ size = 48, color = '#F59E0B' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect x="6" y="14" width="10" height="8" rx="2" fill={color} opacity="0.6"/>
      <rect x="20" y="14" width="10" height="8" rx="2" fill={color}/>
      <rect x="34" y="14" width="10" height="8" rx="2" fill={color} opacity="0.6"/>
      <path d="M16 18L20 18" stroke={color} strokeWidth="2"/>
      <path d="M30 18L34 18" stroke={color} strokeWidth="2"/>
      <path d="M25 22L25 32L20 32" stroke={color} strokeWidth="2"/>
      <path d="M25 32L30 32" stroke={color} strokeWidth="2"/>
    </svg>
  )
}
