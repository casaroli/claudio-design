import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { DEFAULT_THEME, isTheme, themes, type ThemeMeta } from './registry'

const STORAGE_KEY = 'canvas-theme'

/**
 * Resolve the theme to start with. Priority:
 *   1. ?theme= URL param  (deep links, the screenshot script)
 *   2. localStorage       (the human's last runtime choice)
 *   3. whatever the pre-paint script already put on <html>
 *   4. DEFAULT_THEME
 */
function readInitialTheme(): string {
  if (typeof window === 'undefined') return DEFAULT_THEME
  const fromUrl = new URLSearchParams(window.location.search).get('theme')
  if (isTheme(fromUrl)) return fromUrl
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (isTheme(stored)) return stored
  const current = document.documentElement.getAttribute('data-theme')
  if (isTheme(current)) return current
  return DEFAULT_THEME
}

type ThemeContextValue = {
  theme: string
  setTheme: (id: string) => void
  themes: ThemeMeta[]
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<string>(readInitialTheme)

  // Apply to <html> and remember the choice.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      window.localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      /* private mode / storage disabled — non-fatal */
    }
  }, [theme])

  // React to back/forward or a manually edited ?theme= in the address bar.
  useEffect(() => {
    const onPop = () => {
      const fromUrl = new URLSearchParams(window.location.search).get('theme')
      if (isTheme(fromUrl)) setThemeState(fromUrl)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const setTheme = useCallback((id: string) => {
    if (isTheme(id)) setThemeState(id)
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider')
  return ctx
}
