import {
  ArrowDownRight,
  ArrowUpRight,
  CreditCard,
  Download,
  Users,
  Activity,
  DollarSign,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'

export const title = 'Dashboard'

const STATS = [
  { label: 'Revenue', value: '$48,120', delta: 12.5, icon: DollarSign },
  { label: 'Active users', value: '2,340', delta: 4.1, icon: Users },
  { label: 'Subscriptions', value: '1,094', delta: -1.8, icon: CreditCard },
  { label: 'Avg. session', value: '6m 12s', delta: 8.2, icon: Activity },
]

// Twelve weeks of activity, normalized 0–100 for the bar heights.
const BARS = [38, 52, 47, 63, 58, 72, 66, 81, 74, 88, 79, 95]

const GOALS = [
  { label: 'Monthly revenue', value: 78 },
  { label: 'New signups', value: 64 },
  { label: 'Support SLA', value: 92 },
]

const TX = [
  { name: 'Acme Inc.', email: 'billing@acme.com', amount: '+$1,200', status: 'Paid' },
  { name: 'Globex', email: 'ap@globex.io', amount: '+$640', status: 'Pending' },
  { name: 'Initech', email: 'finance@initech.com', amount: '+$2,310', status: 'Paid' },
  { name: 'Umbrella', email: 'accounts@umbrella.co', amount: '+$880', status: 'Paid' },
]

export default function Dashboard() {
  return (
    <div className="bg-background">
      <main className="mx-auto max-w-6xl px-4 py-10">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl font-semibold tracking-tight">
              Dashboard
            </h1>
            <p className="mt-1 text-muted-foreground">
              Your numbers for the last 12 weeks.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="90d">
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="end">
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Download /> Export
            </Button>
          </div>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => {
            const up = stat.delta >= 0
            return (
              <Card key={stat.label}>
                <CardHeader>
                  <CardDescription className="flex items-center gap-2">
                    <stat.icon className="size-4" />
                    {stat.label}
                  </CardDescription>
                  <CardTitle className="text-2xl">{stat.value}</CardTitle>
                </CardHeader>
                <CardContent>
                  <span
                    className={cn(
                      'inline-flex items-center gap-1 text-sm font-medium',
                      up ? 'text-primary' : 'text-destructive',
                    )}
                  >
                    {up ? (
                      <ArrowUpRight className="size-4" />
                    ) : (
                      <ArrowDownRight className="size-4" />
                    )}
                    {Math.abs(stat.delta)}%
                    <span className="font-normal text-muted-foreground">
                      vs last period
                    </span>
                  </span>
                </CardContent>
              </Card>
            )
          })}
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Activity</CardTitle>
              <CardDescription>Weekly active sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-48 items-end gap-2">
                {BARS.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm bg-chart-1 transition-all"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Goals</CardTitle>
              <CardDescription>Progress to quarter targets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {GOALS.map((goal) => (
                <div key={goal.label} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>{goal.label}</span>
                    <span className="font-medium text-muted-foreground">
                      {goal.value}%
                    </span>
                  </div>
                  <Progress value={goal.value} />
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Recent transactions</CardTitle>
            <CardDescription>Latest payments received</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden sm:table-cell">Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {TX.map((tx) => (
                  <TableRow key={tx.name}>
                    <TableCell className="font-medium">{tx.name}</TableCell>
                    <TableCell className="hidden text-muted-foreground sm:table-cell">
                      {tx.email}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={tx.status === 'Paid' ? 'secondary' : 'outline'}
                      >
                        {tx.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {tx.amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
