import { createFileRoute, Link } from '@tanstack/react-router'
import { Component, LayoutGrid, Palette, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { screens } from '@/screens/registry'
import { demos } from '@/gallery/registry'
import { themes } from '@/themes/registry'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
      <p className="text-sm font-medium text-muted-foreground">
        A design playground you drive by talking
      </p>
      <h1 className="mt-3 font-heading text-5xl font-semibold tracking-tight sm:text-6xl">
        Canvas
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
        Ask Claude Code to build screens, components, and themes. It builds them,
        screenshots its own work, and shows you here — live. Browse what exists,
        or just describe what you want next.
      </p>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        <NavCard
          to="/components"
          icon={<Component className="size-5" />}
          title="Components"
          desc={`${demos.length} building blocks, shown across every theme.`}
        />
        <NavCard
          to="/screens"
          icon={<LayoutGrid className="size-5" />}
          title="Screens"
          desc={
            screens.length
              ? `${screens.length} full pages built so far.`
              : 'No screens yet — ask Claude to build one.'
          }
        />
      </div>

      <div className="mt-12 flex items-center gap-2 text-sm text-muted-foreground">
        <Palette className="size-4" />
        <span>
          {themes.length} themes installed — switch any time from the top bar.
        </span>
      </div>
    </main>
  )
}

function NavCard({
  to,
  icon,
  title,
  desc,
}: {
  to: string
  icon: React.ReactNode
  title: string
  desc: string
}) {
  return (
    <Link to={to} className="group">
      <Card className="transition-colors group-hover:border-foreground/20">
        <CardContent className="flex items-center gap-4">
          <div className="flex size-10 items-center justify-center rounded-lg bg-muted text-foreground">
            {icon}
          </div>
          <div className="flex-1">
            <div className="font-medium">{title}</div>
            <div className="text-sm text-muted-foreground">{desc}</div>
          </div>
          <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
        </CardContent>
      </Card>
    </Link>
  )
}
