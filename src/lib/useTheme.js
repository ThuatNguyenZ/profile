import { useCallback, useEffect, useSyncExternalStore } from 'react'

const KEY = 'theme'
const query = () => window.matchMedia('(prefers-color-scheme: light)')

function readPreference() {
  try {
    return localStorage.getItem(KEY) || 'system'
  } catch {
    return 'system'
  }
}

function resolve(pref) {
  if (pref === 'light' || pref === 'dark') return pref
  return query().matches ? 'light' : 'dark'
}

function apply(pref) {
  const theme = resolve(pref)
  document.documentElement.dataset.theme = theme
  window.dispatchEvent(new CustomEvent('themechange', { detail: theme }))
}

const listeners = new Set()
function subscribe(cb) {
  listeners.add(cb)
  return () => listeners.delete(cb)
}
function notify() {
  listeners.forEach((cb) => cb())
}

// Preference: 'system' | 'light' | 'dark'. Resolved theme: 'light' | 'dark' (also on <html data-theme>).
export default function useTheme() {
  const preference = useSyncExternalStore(subscribe, readPreference, () => 'system')
  const theme = useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.theme || resolve(readPreference()),
    () => 'dark',
  )

  useEffect(() => {
    if (preference !== 'system') return undefined
    const mq = query()
    const onChange = () => {
      apply('system')
      notify()
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [preference])

  const setPreference = useCallback((pref) => {
    try {
      localStorage.setItem(KEY, pref)
    } catch {
      /* private mode: keep it for this page view only */
    }
    apply(pref)
    notify()
  }, [])

  return { preference, theme, setPreference }
}
