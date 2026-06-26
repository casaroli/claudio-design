import { createFileRoute, Link } from '@tanstack/react-router'
import { Maximize2 } from 'lucide-react'
import { demos } from '@/gallery/registry'
import { themes } from '@/themes/registry'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/components')({
  component: ComponentsGallery,
})

function ComponentsGallery() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="max-w-2xl">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          Components
        </h1>
        <p className="mt-2 text-muted-foreground">
          Every building block in{' '}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
            src/components/ui
          </code>
          , each shown in all {themes.length} themes at once. Add a demo file to{' '}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
            src/gallery
          </code>{' '}
          and it appears here automatically.
        </p>
      </header>

      <div className="mt-10 space-y-12">
        {demos.map((demo) => (
          <section key={demo.id} className="scroll-mt-20" id={demo.id}>
            <div className="mb-3 flex items-center justify-between gap-4">
              <h2 className="font-heading text-xl font-semibold tracking-tight">
                {demo.label}
              </h2>
              <Button asChild variant="ghost" size="sm">
                <Link to="/isolate/$component" params={{ component: demo.id }}>
                  <Maximize2 /> Isolate
                </Link>
              </Button>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {themes.map((theme) => (
                <div
                  key={theme.id}
                  data-theme={theme.id}
                  className="overflow-hidden rounded-xl border border-border bg-background text-foreground"
                >
                  <div className="border-b border-border px-3 py-1.5 text-xs font-medium text-muted-foreground">
                    {theme.label}
                  </div>
                  <div className="flex min-h-36 items-center justify-center overflow-x-auto p-6">
                    <demo.Component />
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
