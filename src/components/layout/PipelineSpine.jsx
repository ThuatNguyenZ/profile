import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion'
import { createContext, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

export const SpineContext = createContext(null)

// Pipeline line from the first to the last stage node; a packet and a fill follow the scroll and
// reach the last node exactly when the page bottom is reached. The node the packet has passed most
// recently is "active" (shared with SectionHeader through SpineContext).
export default function PipelineSpine({ children }) {
  const ref = useRef(null)
  const [geo, setGeo] = useState({ top: 0, height: 0, nodes: [] })
  const [activeKey, setActiveKey] = useState(null)
  const geoRef = useRef(geo)
  geoRef.current = geo

  const measure = useCallback(() => {
    const root = ref.current
    if (!root) return
    const base = root.getBoundingClientRect().top
    const nodes = [...root.querySelectorAll('[data-stage-node][data-stage-index]')]
      .filter((el) => el.offsetParent !== null)
      .map((el) => {
        const r = el.getBoundingClientRect()
        return { key: el.dataset.stageIndex, y: r.top - base + r.height / 2 }
      })
    if (nodes.length < 2) return
    setGeo({ top: nodes[0].y, height: nodes[nodes.length - 1].y - nodes[0].y, nodes })
  }, [])

  useLayoutEffect(() => {
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(ref.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [measure])

  // 0 when the first node reaches 60% of the viewport, 1 exactly at the page bottom. Measured live on
  // every scroll frame: useScroll's target offsets go stale once fonts and images change the page height.
  const { scrollY } = useScroll()
  const rawProgress = useTransform(scrollY, (y) => {
    const root = ref.current
    if (!root) return 0
    const vh = window.innerHeight
    const start = y + root.getBoundingClientRect().top + geoRef.current.top - vh * 0.6
    const end = document.documentElement.scrollHeight - vh
    if (end <= start) return 1
    return Math.min(1, Math.max(0, (y - start) / (end - start)))
  })
  // Near-critical damping (ratio ~1.1) so long jumps settle fast; tiny rest thresholds because on a
  // ~3000-px line the defaults would park the packet tens of px short of the last node.
  const progress = useSpring(rawProgress, { stiffness: 160, damping: 18, mass: 0.4, restDelta: 0.0001, restSpeed: 0.0001 })
  const packetTop = useTransform(progress, (v) => `${v * 100}%`)

  const pickActive = useCallback(
    (v) => {
      const y = geo.top + v * geo.height
      let key = geo.nodes[0]?.key ?? null
      for (const n of geo.nodes) if (n.y <= y + 6) key = n.key
      setActiveKey((prev) => (prev === key ? prev : key))
    },
    [geo],
  )
  useMotionValueEvent(progress, 'change', pickActive)
  useEffect(() => pickActive(progress.get()), [pickActive, progress])

  return (
    <SpineContext.Provider value={{ activeKey }}>
      <div ref={ref} className="relative">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block z-[1]">
          <div className="container-site relative h-full">
            <div
              className="absolute left-[calc(2rem+10.5px)] w-px xl:left-[calc(2.5rem+10.5px)]"
              style={{ top: geo.top, height: geo.height }}
            >
              <div className="absolute inset-0 bg-line" />
              <motion.div className="absolute inset-0 origin-top bg-gradient-to-b from-cy via-vi to-em" style={{ scaleY: progress }} />
              <motion.span
                className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cy shadow-glow"
                style={{ top: packetTop }}
              />
            </div>
          </div>
        </div>
        {children}
      </div>
    </SpineContext.Provider>
  )
}
