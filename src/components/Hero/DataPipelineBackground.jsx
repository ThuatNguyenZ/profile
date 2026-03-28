import { useEffect, useRef } from 'react'

export default function CinematicBilliardData() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: null, y: null })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationId
    let particles = []
    
    // --- CẤU HÌNH CHUYỂN ĐỘNG ĐỀU & NÉT ---
    const PARTICLE_COUNT = 60 
    const CONSTANT_SPEED = 0.4    // Tốc độ di chuyển chậm cố định
    const MOUSE_SENSITIVITY = 0.0002 
    
    const PARTICLE_SIZE_BASE = 6
    const PARTICLE_SIZE_VAR = 8
    const FOCAL_LENGTH = 500 
    const CONNECTION_DISTANCE = 200

    const COLOR_PRIMARY = '59, 130, 246'   
    const COLOR_SECONDARY = '191, 219, 254' 

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouseMove)

    class Particle {
      constructor() {
        this.init()
      }

      init() {
        this.x3d = (Math.random() - 0.5) * window.innerWidth * 1.8
        this.y3d = (Math.random() - 0.5) * window.innerHeight * 1.8
        this.z3d = Math.random() * FOCAL_LENGTH

        // Khởi tạo vận tốc ngẫu nhiên nhưng có hướng
        this.vx = (Math.random() - 0.5) * CONSTANT_SPEED
        this.vy = (Math.random() - 0.5) * CONSTANT_SPEED
        this.vz = (Math.random() - 0.5) * CONSTANT_SPEED

        this.size = PARTICLE_SIZE_BASE + Math.random() * PARTICLE_SIZE_VAR
      }

      update() {
        // Tương tác chuột (đẩy nhẹ)
        if (mouseRef.current.x) {
            const scale = FOCAL_LENGTH / (FOCAL_LENGTH + this.z3d)
            const x2d = this.x3d * scale + canvas.width / 2
            const y2d = this.y3d * scale + canvas.height / 2

            const dx = mouseRef.current.x - x2d
            const dy = mouseRef.current.y - y2d
            const dist = Math.sqrt(dx * dx + dy * dy)

            if (dist < 300) {
              const force = (300 - dist) / 300
              this.vx -= dx * force * MOUSE_SENSITIVITY
              this.vy -= dy * force * MOUSE_SENSITIVITY
            }
        }

        // ĐẢM BẢO LUÔN DI CHUYỂN: Duy trì tốc độ ổn định
        const currentSpeed = Math.sqrt(this.vx**2 + this.vy**2 + this.vz**2)
        if (currentSpeed < CONSTANT_SPEED) {
            this.vx *= 1.01; // Tăng tốc nhẹ nếu quá chậm
            this.vy *= 1.01;
            this.vz *= 1.01;
        } else if (currentSpeed > CONSTANT_SPEED * 1.5) {
            this.vx *= 0.98; // Giảm tốc nếu quá nhanh
            this.vy *= 0.98;
            this.vz *= 0.98;
        }

        this.x3d += this.vx
        this.y3d += this.vy
        this.z3d += this.vz

        // Giới hạn biên 3D
        const bound = 1000
        if (Math.abs(this.x3d) > bound) this.vx *= -1
        if (Math.abs(this.y3d) > bound) this.vy *= -1
        if (this.z3d > FOCAL_LENGTH || this.z3d < -150) this.vz *= -1
      }

      draw() {
        const scale = FOCAL_LENGTH / (FOCAL_LENGTH + this.z3d)
        if (scale < 0.1) return 

        const x = this.x3d * scale + canvas.width / 2
        const y = this.y3d * scale + canvas.height / 2
        const finalSize = this.size * scale

        // Độ mờ cố định theo độ sâu (Không chớp tắt)
        const opacity = 0.6 * scale

        ctx.save()
        ctx.shadowBlur = 35 * scale
        ctx.shadowColor = `rgba(${COLOR_PRIMARY}, 0.6)`

        const grad = ctx.createRadialGradient(x, y, 0, x, y, finalSize)
        grad.addColorStop(0, `rgba(255, 255, 255, ${opacity})`)
        grad.addColorStop(0.5, `rgba(${COLOR_PRIMARY}, ${opacity * 0.7})`)
        grad.addColorStop(1, `rgba(${COLOR_PRIMARY}, 0)`)

        ctx.beginPath()
        ctx.fillStyle = grad
        ctx.arc(x, y, finalSize, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle())

    const drawConnections = () => {
      ctx.save()
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i]
          const p2 = particles[j]
          
          const dx = p1.x3d - p2.x3d
          const dy = p1.y3d - p2.y3d
          const dz = p1.z3d - p2.z3d
          const dist3d = Math.sqrt(dx*dx + dy*dy + dz*dz)

          if (dist3d < CONNECTION_DISTANCE) {
            const scale1 = FOCAL_LENGTH / (FOCAL_LENGTH + p1.z3d)
            const scale2 = FOCAL_LENGTH / (FOCAL_LENGTH + p2.z3d)
            
            // Độ mờ nét vẽ cố định, chỉ phụ thuộc khoảng cách
            const opacity = (1 - dist3d / CONNECTION_DISTANCE) * 0.4
            
            ctx.beginPath()
            ctx.strokeStyle = `rgba(${COLOR_SECONDARY}, ${opacity})`
            ctx.lineWidth = 1.2 * ((scale1 + scale2) / 2)
            ctx.moveTo(p1.x3d * scale1 + canvas.width/2, p1.y3d * scale1 + canvas.height/2)
            ctx.lineTo(p2.x3d * scale2 + canvas.width/2, p2.y3d * scale2 + canvas.height/2)
            ctx.stroke()
          }
        }
      }
      ctx.restore()
    }

    const animate = () => {
      // Xóa sạch canvas mỗi frame để mất dấu chân hoàn toàn
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#030712' 
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      particles.sort((a, b) => b.z3d - a.z3d)
      
      drawConnections()
      particles.forEach(p => { 
        p.update()
        p.draw()
      })
      
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
      style={{ background: '#030712' }} 
    />
  )
}
