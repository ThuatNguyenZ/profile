export default function DeepLearningIcon({ size = 48, color = '#3B82F6' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="8" r="3" fill={color}/>
      <circle cx="12" cy="24" r="3" fill={color} opacity="0.8"/>
      <circle cx="36" cy="24" r="3" fill={color} opacity="0.8"/>
      <circle cx="24" cy="40" r="3" fill={color}/>
      <path d="M24 11L14 21" stroke={color} strokeWidth="2"/>
      <path d="M24 11L34 21" stroke={color} strokeWidth="2"/>
      <path d="M14 27L24 37" stroke={color} strokeWidth="2"/>
      <path d="M34 27L24 37" stroke={color} strokeWidth="2"/>
      <path d="M15 24L33 24" stroke={color} strokeWidth="2"/>
    </svg>
  )
}
