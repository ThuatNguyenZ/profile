import { memo } from 'react'

// Soft decorative pattern component
const SoftPattern = memo(function SoftPattern({ color = '#3B82F6', opacity = 0.03 }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{
        backgroundImage: `
          radial-gradient(circle at 20% 50%, ${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')} 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, ${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')} 0%, transparent 50%),
          radial-gradient(circle at 40% 20%, ${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')} 0%, transparent 50%)
        `,
        backgroundSize: '100% 100%, 100% 100%, 100% 100%',
      }}
    />
  )
})

export default SoftPattern
