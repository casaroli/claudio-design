import { Separator } from '@/components/ui/separator'

export default function SeparatorDemo() {
  return (
    <div className="w-72">
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Canvas</h4>
        <p className="text-sm text-muted-foreground">
          A design playground you drive by talking.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center gap-4 text-sm">
        <span>Docs</span>
        <Separator orientation="vertical" />
        <span>Themes</span>
        <Separator orientation="vertical" />
        <span>Source</span>
      </div>
    </div>
  )
}
