import { useEffect, useState } from 'react'

// Returns the id of the last section whose top has passed `offset` px from the viewport top.
export default function useScrollSpy(ids, offset = 140) {
  const [active, setActive] = useState(null)
  const key = ids.join('|')

  useEffect(() => {
    if (!ids.length) return undefined
    let raf = 0
    const update = () => {
      raf = 0
      let current = null
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top - offset <= 0) current = id
      }
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      if (atBottom) current = ids[ids.length - 1]
      setActive(current)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, offset])

  return active
}
