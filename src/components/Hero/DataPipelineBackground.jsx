import { useEffect, useRef } from 'react'

export default function GrandDataPipelineBackground() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: null, y: null, clickTime: 0 })
  const binaryRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationId
    let particles = []
    
    // Cấu hình hoành tráng
    const PARTICLE_COUNT = 150
    const CONNECTION_DISTANCE = 220
    const MOUSE_REPULSE_RADIUS = 200
    const FOCAL_LENGTH = 400 // Cho phép chiếu 3D
    const COLOR_PRIMARY = '59, 130, 246' // blue-500
    const COLOR_SECONDARY = '147, 197, 253' // blue-300
    const COLOR_TERTIARY = '96, 165, 250' // blue-400

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initBinaryStreams()
    }
    
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    const handleMouseDown = () => {
      mouseRef.current.clickTime = Date.now()
    }

    // Khởi tạo dòng nhị phân chạy nền
    const initBinaryStreams = () => {
        binaryRef.current = []
        const columns = Math.floor(canvas.width / 20)
        for (let i = 0; i < columns; i++) {
            binaryRef.current.push({
                x: i * 20,
                y: Math.random() * canvas.height,
                speed: 1 + Math.random() * 3,
                chars: Array(15 + Math.floor(Math.random() * 10)).fill(0).map(() => (Math.random() > 0.5 ? '1' : '0'))
            })
        }
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)

    class Particle {
      constructor() {
        this.reset(true)
      }

      reset(init = false) {
        // Tọa độ 3D
        this.x3d = (Math.random() - 0.5) * canvas.width * 2
        this.y3d = (Math.random() - 0.5) * canvas.height * 2
        this.z3d = init ? Math.random() * FOCAL_LENGTH : FOCAL_LENGTH

        this.vx = (Math.random() - 0.5) * 1.5
        this.vy = (Math.random() - 0.5) * 1.5
        this.vz = -(1 + Math.random() * 2) // Bay về phía người xem

        this.size = 2 + Math.random() * 4
        this.type = Math.random() > 0.8 ? 'cube' : 'node' // 2 loại hạt
        this.pulse = Math.random() * Math.PI
      }

      update() {
        this.x3d += this.vx
        this.y3d += this.vy
        this.z3d += this.vz

        // Tương tác chuột và Click
        const timeSinceClick = Date.now() - mouseRef.current.clickTime
        if (mouseRef.current.x) {
            // Phép chiếu 2D ngược để tính tương tác
            const scale = FOCAL_LENGTH / (FOCAL_LENGTH + this.z3d)
            this.x = this.x3d * scale + canvas.width / 2
            this.y = this.y3d * scale + canvas.height / 2

            const dx = mouseRef.current.x - this.x
            const dy = mouseRef.current.y - this.y
            const dist = Math.sqrt(dx * dx + dy * dy)

            // Click Burst: Nổ mạnh
            if (timeSinceClick < 500) {
              const burstForce = (500 - timeSinceClick) / 500 * 20
              if (dist < MOUSE_REPULSE_RADIUS * 1.5) {
                this.vx -= dx * burstForce * 0.005
                this.vy -= dy * burstForce * 0.005
                this.vz -= burstForce * 0.01 // Nổ tung về phía sau
              }
            } 
            // Hover Repulse: Đẩy nhẹ
            else if (dist < MOUSE_REPULSE_RADIUS) {
              const force = (MOUSE_REPULSE_RADIUS - dist) / MOUSE_REPULSE_RADIUS
              this.vx -= dx * force * 0.01
              this.vy -= dy * force * 0.01
            }
        }

        this.pulse += 0.04

        // Reset khi bay quá gần hoặc quá xa
        if (this.z3d < -FOCAL_LENGTH || this.z3d > FOCAL_LENGTH * 2) {
            this.reset()
        }
      }

      draw() {
        // Phép chiếu 3D sang 2D
        const scale = FOCAL_LENGTH / (FOCAL_LENGTH + this.z3d)
        this.x = this.x3d * scale + canvas.width / 2
        this.y = this.y3d * scale + canvas.height / 2
        const finalSize = this.size * scale

        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) return

        const opacity = (0.5 + Math.sin(this.pulse) * 0.3) * (scale) // Mờ khi ở xa
        ctx.fillStyle = `rgba(${this.type === 'cube' ? COLOR_TERTIARY : COLOR_PRIMARY}, ${opacity})`
        ctx.shadowBlur = 15 * scale
        ctx.shadowColor = `rgba(${COLOR_SECONDARY}, 0.8)`

        if (this.type === 'cube') {
          // Vẽ khối 3D đơn giản
          ctx.fillRect(this.x, this.y, finalSize * 1.5, finalSize * 1.5)
          // Vẽ thêm cạnh để tạo khối
          ctx.fillStyle = `rgba(${COLOR_TERTIARY}, ${opacity * 0.5})`
          ctx.fillRect(this.x + finalSize * 0.5, this.y - finalSize * 0.5, finalSize * 1.5, finalSize * 1.5)
        } else {
          // Vẽ nút tròn sáng
          ctx.beginPath()
          ctx.arc(this.x, this.y, finalSize, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.shadowBlur = 0 // Reset shadow
      }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle())
    }

    const drawBinaryMatrix = () => {
        ctx.font = '10px monospace'
        binaryRef.current.forEach(stream => {
            stream.y += stream.speed
            if (stream.y > canvas.height + stream.chars.length * 12) stream.y = -stream.chars.length * 12
            
            stream.chars.forEach((char, index) => {
                const opacity = (index + 1) / stream.chars.length
                ctx.fillStyle = `rgba(59, 130, 246, ${opacity * 0.15})`
                ctx.fillText(char, stream.x, stream.y - index * 12)
                
                // Cập nhật thỉnh thoảng thay đổi số
                if (Math.random() > 0.999) stream.chars[index] = (char === '1' ? '0' : '1')
            })
        })
    }

    const drawConnections = () => {
      // Sắp xếp hạt theo chiều sâu Z để vẽ đúng thứ tự connections
      const sortedParticles = [...particles].sort((a, b) => b.z3d - a.z3d);

      for (let i = 0; i < sortedParticles.length; i++) {
        for (let j = i + 1; j < sortedParticles.length; j++) {
          const dx = sortedParticles[i].x - sortedParticles[j].x
          const dy = sortedParticles[i].y - sortedParticles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < CONNECTION_DISTANCE) {
            const scale1 = FOCAL_LENGTH / (FOCAL_LENGTH + sortedParticles[i].z3d)
            const scale2 = FOCAL_LENGTH / (FOCAL_LENGTH + sortedParticles[j].z3d)
            
            // Chỉ kết nối các hạt có độ sâu tương đối gần nhau
            if (Math.abs(scale1 - scale2) > 0.3) continue;

            const opacity = (1 - distance / CONNECTION_DISTANCE) * 0.25 * (scale1 * scale2)
            ctx.beginPath()
            ctx.strokeStyle = `rgba(${COLOR_SECONDARY}, ${opacity})`
            ctx.lineWidth = 1 * scale1
            ctx.moveTo(sortedParticles[i].x, sortedParticles[i].y)
            ctx.lineTo(sortedParticles[j].x, sortedParticles[j].y)
            ctx.stroke()

            // Data Pulse: Gói dữ liệu chạy dọc
            if (Math.random() > 0.99) {
               drawDataPacket(sortedParticles[i], sortedParticles[j], scale1)
            }
          }
        }
      }
    }

    const drawDataPacket = (p1, p2, scale) => {
        // Một vệt sáng mạnh chạy từ p1 đến p2
        ctx.beginPath()
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.4 * scale})`
        ctx.lineWidth = 3 * scale
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.stroke()
    }

    const animate = () => {
      // Tạo hiệu ứng Trail mạnh hơn
      ctx.fillStyle = 'rgba(5, 12, 24, 0.3)' 
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Vẽ Ma trận nền
      drawBinaryMatrix()

      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })
      
      drawConnections()

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ 
        background: 'linear-gradient(135deg, #050c18 0%, #0a192f 50%, #050c18 100%)',
      }}
    />
  )
}