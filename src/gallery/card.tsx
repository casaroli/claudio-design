import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function CardDemo() {
  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Monthly report</CardTitle>
        <CardDescription>Your usage for June 2026.</CardDescription>
        <CardAction>
          <Badge variant="secondary">New</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        You used 18,240 credits this month — about 62% of your plan.
      </CardContent>
      <CardFooter className="gap-2">
        <Button size="sm">View report</Button>
        <Button size="sm" variant="ghost">
          Dismiss
        </Button>
      </CardFooter>
    </Card>
  )
}
