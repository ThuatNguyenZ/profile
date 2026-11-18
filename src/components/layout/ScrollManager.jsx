import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const timer = setTimeout(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start' })
      }, 50)
      return () => clearTimeout(timer)
    }
    window.scrollTo(0, 0)
    return undefined
  }, [pathname, hash])

  return null
}
