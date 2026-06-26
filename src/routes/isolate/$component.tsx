import { createFileRoute } from '@tanstack/react-router'
import { getDemo } from '@/gallery/registry'

export const Route = createFileRoute('/isolate/$component')({
  component: Isolate,
})

// A single component, centered on a clean canvas, with no Canvas chrome.
// Built for pixel-clean screenshots: `npm run shot -- --isolate=button`.
function Isolate() {
  const { component } = Route.useParams()
  const entry = getDemo(component)

  if (!entry) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-10 text-center text-sm text-muted-foreground">
        No component demo named “{component}” in src/gallery.
      </div>
    )
  }

  const Demo = entry.Component
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-10">
      <Demo />
    </div>
  )
}
