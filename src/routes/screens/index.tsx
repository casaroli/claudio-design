import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, FileQuestion } from 'lucide-react'
import { screens } from '@/screens/registry'
import { Card, CardContent } from '@/components/ui/card'

export const Route = createFileRoute('/screens/')({ component: ScreensIndex })

function ScreensIndex() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="max-w-2xl">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          Screens
        </h1>
        <p className="mt-2 text-muted-foreground">
          Full pages built so far. Each file in{' '}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
            src/screens
          </code>{' '}
          becomes a screen here automatically.
        </p>
      </header>

      {screens.length === 0 ? (
        <div className="mt-12 flex flex-col items-center gap-3 rounded-xl border border-dashed border-border py-20 text-center">
          <FileQuestion className="size-8 text-muted-foreground" />
          <p className="font-medium">No screens yet</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            Ask Claude to “build me a pricing page” and it will appear right
            here.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {screens.map((screen) => (
            <Link
              key={screen.id}
              to="/screens/$screen"
              params={{ screen: screen.id }}
              className="group"
            >
              <Card className="h-full transition-colors group-hover:border-foreground/20">
                <CardContent className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-medium">{screen.label}</div>
                    <div className="text-sm text-muted-foreground">
                      /screens/{screen.id}
                    </div>
                  </div>
                  <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
