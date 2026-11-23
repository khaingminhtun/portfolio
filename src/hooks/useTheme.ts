import { useCallback, useEffect, useState } from 'react'

const THEME_KEY = 'kmh-theme'

function readInitialTheme(): boolean {
  if (typeof document === 'undefined') {
    return true
  }

  return document.documentElement.classList.contains('dark')
}

export function useTheme() {
  const [isDark, setIsDark] = useState(readInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', isDark)

    try {
      localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light')
    } catch {
      // Storage can be unavailable in private browsing contexts; theming still works.
    }
  }, [isDark])

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== THEME_KEY || !event.newValue) {
        return
      }

      setIsDark(event.newValue !== 'light')
    }

    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const toggleTheme = useCallback(() => {
    setIsDark((current) => !current)
  }, [])

  return { isDark, toggleTheme }
}
