import { Button } from '@/components/ui/button'
import { ArrowRight, Plus } from 'lucide-react'

export default function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="link">Link</Button>
      <Button size="sm">
        <Plus /> New
      </Button>
      <Button>
        Continue <ArrowRight />
      </Button>
    </div>
  )
}
