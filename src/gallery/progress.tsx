import { Progress } from '@/components/ui/progress'

export default function ProgressDemo() {
  return (
    <div className="grid w-72 gap-2">
      <Progress value={62} />
      <p className="text-xs text-muted-foreground">62% complete</p>
    </div>
  )
}
