import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Motion rates are half of the Stitch reference (a quarter when the OS asks for reduced motion).
const SPEED = 0.5

export default function HeroNetwork() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return undefined

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const speed = reduce ? SPEED * 0.5 : SPEED
    const small = window.innerWidth < 768
    let width = mount.clientWidth || window.innerWidth
    let height = mount.clientHeight || 600

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    } catch {
      return undefined
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
    renderer.setSize(width, height)
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
    camera.position.set(0, 0, 85)

    const group = new THREE.Group()
    scene.add(group)

    const nodeCount = small ? 30 : 55
    const sphereGeo = new THREE.SphereGeometry(0.85, 16, 16)
    const coreGeo = new THREE.IcosahedronGeometry(1.4, 1)
    const cyanMat = new THREE.MeshPhongMaterial({ color: 0x00f0ff, emissive: 0x004455, wireframe: true })
    const violetMat = new THREE.MeshPhongMaterial({ color: 0x6366f1, emissive: 0x221144, wireframe: true })
    const greenMat = new THREE.MeshPhongMaterial({ color: 0x10b981, emissive: 0x053322 })

    const positions = []
    const nodes = []
    for (let i = 0; i < nodeCount; i++) {
      const t = (i / nodeCount) * Math.PI * 4
      const pos = new THREE.Vector3(
        (i - nodeCount / 2) * 2.2 + (Math.random() - 0.5) * 8,
        Math.sin(t) * 12 + (Math.random() - 0.5) * 10,
        Math.cos(t) * 14 + (Math.random() - 0.5) * 14,
      )
      positions.push(pos)
      const geo = i % 6 === 0 ? coreGeo : sphereGeo
      const mat = i % 6 === 0 ? (i % 2 === 0 ? cyanMat : violetMat) : i % 3 === 0 ? greenMat : i % 2 === 0 ? cyanMat : violetMat
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.copy(pos)
      group.add(mesh)
      nodes.push({ mesh, origin: pos.clone(), speed: 0.002 + Math.random() * 0.005, phase: Math.random() * Math.PI * 2 })
    }

    const lineCoords = []
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (positions[i].distanceTo(positions[j]) < 18) {
          lineCoords.push(positions[i].x, positions[i].y, positions[i].z, positions[j].x, positions[j].y, positions[j].z)
        }
      }
    }
    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(lineCoords, 3))
    const lineMat = new THREE.LineBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.25 })
    group.add(new THREE.LineSegments(lineGeo, lineMat))

    const packetCount = small ? 200 : 400
    const packetPositions = new Float32Array(packetCount * 3)
    const packetSpeeds = []
    for (let i = 0; i < packetCount; i++) {
      packetPositions[i * 3] = (Math.random() - 0.5) * 120
      packetPositions[i * 3 + 1] = (Math.random() - 0.5) * 60
      packetPositions[i * 3 + 2] = (Math.random() - 0.5) * 50
      packetSpeeds.push(0.15 + Math.random() * 0.35)
    }
    const packetGeo = new THREE.BufferGeometry()
    packetGeo.setAttribute('position', new THREE.BufferAttribute(packetPositions, 3))
    const packetMat = new THREE.PointsMaterial({ color: 0x00f0ff, size: 0.85, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending })
    scene.add(new THREE.Points(packetGeo, packetMat))

    scene.add(new THREE.AmbientLight(0xffffff, 0.8))
    const light1 = new THREE.PointLight(0x00f0ff, 2.5, 120)
    light1.position.set(30, 20, 40)
    scene.add(light1)
    const light2 = new THREE.PointLight(0x6366f1, 2.5, 120)
    light2.position.set(-30, -20, 40)
    scene.add(light2)

    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0
    const onPointer = (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.03
      mouseY = (e.clientY - window.innerHeight / 2) * 0.03
    }
    window.addEventListener('pointermove', onPointer, { passive: true })

    let clock = 0
    function step() {
      clock += 0.015 * speed
      targetX += (mouseX - targetX) * 0.05
      targetY += (mouseY - targetY) * 0.05
      group.rotation.y = clock * 0.08 + targetX * 0.02
      group.rotation.x = Math.sin(clock * 0.05) * 0.15 + targetY * 0.02
      for (const n of nodes) {
        n.mesh.rotation.x += n.speed * speed
        n.mesh.rotation.y += n.speed * 1.5 * speed
        n.mesh.position.y = n.origin.y + Math.sin(clock * 2 + n.phase) * 1.2
      }
      const arr = packetGeo.attributes.position.array
      for (let i = 0; i < packetCount; i++) {
        arr[i * 3] += packetSpeeds[i] * speed
        if (arr[i * 3] > 60) arr[i * 3] = -60
      }
      packetGeo.attributes.position.needsUpdate = true
      renderer.render(scene, camera)
    }

    let frame = 0
    let running = false
    const loop = () => {
      if (!running) return
      step()
      frame = requestAnimationFrame(loop)
    }
    const start = () => {
      if (running) return
      running = true
      frame = requestAnimationFrame(loop)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(frame)
    }

    step()
    let onScreen = true
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      if (onScreen && !document.hidden) start()
      else stop()
    })
    io.observe(mount)
    const onVisibility = () => (document.hidden || !onScreen ? stop() : start())
    document.addEventListener('visibilitychange', onVisibility)

    const ro = new ResizeObserver(() => {
      width = mount.clientWidth
      height = mount.clientHeight
      if (!width || !height) return
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
      if (!running) renderer.render(scene, camera)
    })
    ro.observe(mount)

    return () => {
      stop()
      io.disconnect()
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pointermove', onPointer)
      ;[sphereGeo, coreGeo, lineGeo, packetGeo].forEach((g) => g.dispose())
      ;[cyanMat, violetMat, greenMat, lineMat, packetMat].forEach((m) => m.dispose())
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_right,transparent_0%,black_45%,black_100%)] md:opacity-75"
    />
  )
}
