export default function LLMIcon({ size = 48, color = '#EC4899' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="14" fill={color} opacity="0.2"/>
      <circle cx="24" cy="24" r="8" fill={color} opacity="0.4"/>
      <circle cx="24" cy="24" r="4" fill={color}/>
      <circle cx="24" cy="10" r="3" fill={color} opacity="0.6"/>
      <circle cx="38" cy="24" r="3" fill={color} opacity="0.6"/>
      <circle cx="24" cy="38" r="3" fill={color} opacity="0.6"/>
      <circle cx="10" cy="24" r="3" fill={color} opacity="0.6"/>
    </svg>
  )
}
