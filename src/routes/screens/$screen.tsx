import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { getScreen } from '@/screens/registry'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/screens/$screen')({
  component: ScreenView,
})

function ScreenView() {
  const { screen } = Route.useParams()
  const entry = getScreen(screen)

  if (!entry) {
    return (
      <main className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
        <h1 className="font-heading text-2xl font-semibold">
          No screen named “{screen}”
        </h1>
        <p className="text-muted-foreground">
          There is no file at{' '}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
            src/screens/{screen}.tsx
          </code>
          .
        </p>
        <Button asChild variant="outline">
          <Link to="/screens">
            <ArrowLeft /> All screens
          </Link>
        </Button>
      </main>
    )
  }

  const Screen = entry.Component
  return <Screen />
}
