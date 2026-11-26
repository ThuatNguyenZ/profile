import { useCallback, useSyncExternalStore } from 'react'

const KEY = 'theme'

function readPreference() {
  const applied = document.documentElement.dataset.theme
  if (applied) return resolve(applied)
  try {
    return resolve(localStorage.getItem(KEY))
  } catch {
    return 'dark'
  }
}

function resolve(pref) {
  return pref === 'light' ? 'light' : 'dark'
}

const listeners = new Set()
function subscribe(cb) {
  listeners.add(cb)
  return () => listeners.delete(cb)
}
function notify() {
  listeners.forEach((cb) => cb())
}

export default function useTheme() {
  const preference = useSyncExternalStore(subscribe, readPreference, () => 'dark')

  const setPreference = useCallback((pref) => {
    const theme = resolve(pref)
    try {
      localStorage.setItem(KEY, theme)
    } catch {
      /* private mode: keep it for this page view only */
    }
    document.documentElement.dataset.theme = theme
    window.dispatchEvent(new CustomEvent('themechange', { detail: theme }))
    notify()
  }, [])

  return { preference, theme: preference, setPreference }
}
