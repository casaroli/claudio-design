import { Link } from '@tanstack/react-router'
import { ThemeSwitcher } from './theme-switcher'

const LINKS = [
  { to: '/', label: 'Home', exact: true },
  { to: '/components', label: 'Components', exact: false },
  { to: '/screens', label: 'Screens', exact: false },
] as const

/** The Canvas top bar. This is tooling chrome, not built content, so the whole
 *  header is marked `data-chrome` — the screenshot script hides it. */
export function Nav() {
  return (
    <header
      data-chrome
      className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur"
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4 sm:gap-6">
        <Link to="/" className="font-heading text-lg font-semibold tracking-tight">
          Canvas
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.exact }}
              className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: 'bg-muted text-foreground' }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto">
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  )
}
