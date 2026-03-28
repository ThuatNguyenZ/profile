import { useEffect, useRef } from 'react'

export default function DataPipelineBackground() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: null, y: null })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationId
    let particles = []
    
    // Cấu hình
    const PARTICLE_COUNT = 80
    const CONNECTION_DISTANCE = 150
    const MOUSE_RADIUS = 150

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouseMove)

    class Particle {
      constructor() {
        this.reset()
      }

      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 0.8 // Chậm lại để tạo cảm giác mượt
        this.vy = (Math.random() - 0.5) * 0.8
        this.radius = Math.random() * 2 + 0.5
        this.pulse = Math.random() * Math.PI
      }

      update() {
        // Tương tác chuột
        if (mouseRef.current.x) {
          const dx = mouseRef.current.x - this.x
          const dy = mouseRef.current.y - this.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MOUSE_RADIUS) {
            const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS
            this.x -= dx * force * 0.02
            this.y -= dy * force * 0.02
          }
        }

        this.x += this.vx
        this.y += this.vy
        this.pulse += 0.05

        // Repel boundaries
        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height
      }

      draw() {
        const opacity = 0.4 + Math.sin(this.pulse) * 0.3
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(96, 165, 250, ${opacity})`
        ctx.shadowBlur = 10
        ctx.shadowColor = '#60a5fa'
        ctx.fill()
        ctx.shadowBlur = 0 // Reset shadow để không lag
      }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle())
    }

    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < CONNECTION_DISTANCE) {
            const opacity = (1 - distance / CONNECTION_DISTANCE) * 0.2
            ctx.beginPath()
            ctx.strokeStyle = `rgba(147, 197, 253, ${opacity})`
            ctx.lineWidth = 1
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()

            // Thêm hiệu ứng Data Pulse (chạy dọc theo dây)
            if (Math.random() > 0.995) { // Hiệu ứng thỉnh thoảng xuất hiện
               drawPulse(particles[i], particles[j])
            }
          }
        }
      }
    }

    const drawPulse = (p1, p2) => {
        // Vẽ một điểm sáng chạy nhanh từ p1 đến p2
        // (Để tối ưu, ta chỉ vẽ line highlight nhẹ thay vì animation phức tạp bên trong vòng lặp)
        ctx.beginPath()
        ctx.strokeStyle = `rgba(255, 255, 255, 0.5)`
        ctx.lineWidth = 2
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.stroke()
    }

    const animate = () => {
      // Tạo hiệu ứng trail bằng cách không xóa sạch canvas
      ctx.fillStyle = 'rgba(10, 25, 47, 0.2)' 
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })
      drawLines()

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ 
        background: 'linear-gradient(to bottom right, #0a192f, #112240, #0a192f)',
      }}
    />
  )
}