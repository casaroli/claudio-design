import { createRootRoute, Outlet, useRouterState } from '@tanstack/react-router'
import { ThemeProvider } from '@/themes/theme-provider'
import { Nav } from '@/components/canvas/nav'

function RootLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  // The isolation route is a clean canvas: no Canvas chrome at all.
  const isolated = pathname.startsWith('/isolate')

  return (
    <ThemeProvider>
      {!isolated && <Nav />}
      <Outlet />
    </ThemeProvider>
  )
}

export const Route = createRootRoute({ component: RootLayout })
