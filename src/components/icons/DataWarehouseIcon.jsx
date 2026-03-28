export default function DataWarehouseIcon({ size = 48, color = '#10B981' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <ellipse cx="24" cy="12" rx="16" ry="4" fill={color} opacity="0.8"/>
      <ellipse cx="24" cy="24" rx="16" ry="4" fill={color} opacity="0.6"/>
      <ellipse cx="24" cy="36" rx="16" ry="4" fill={color} opacity="0.4"/>
      <path d="M8 12L8 36" stroke={color} strokeWidth="2"/>
      <path d="M40 12L40 36" stroke={color} strokeWidth="2"/>
    </svg>
  )
}
