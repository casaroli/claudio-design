import { Skeleton } from '@/components/ui/skeleton'

export default function SkeletonDemo() {
  return (
    <div className="flex w-72 items-center gap-4">
      <Skeleton className="size-12 shrink-0 rounded-full" />
      <div className="grid flex-1 gap-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  )
}
