import { Badge } from '@/components/ui/badge'
import { Check } from 'lucide-react'

export default function BadgeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="secondary">
        <Check /> Verified
      </Badge>
    </div>
  )
}
