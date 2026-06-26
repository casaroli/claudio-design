import { useState } from 'react'
import { Check, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

export const title = 'Pricing'

type Tier = {
  name: string
  blurb: string
  monthly: number
  features: string[]
  cta: string
  popular?: boolean
}

const TIERS: Tier[] = [
  {
    name: 'Starter',
    blurb: 'For side projects and trying things out.',
    monthly: 0,
    features: [
      '1 project',
      '5,000 monthly credits',
      'Community support',
      'Light & dark themes',
    ],
    cta: 'Get started',
  },
  {
    name: 'Pro',
    blurb: 'For professionals shipping real work.',
    monthly: 24,
    features: [
      'Unlimited projects',
      '100,000 monthly credits',
      'Priority email support',
      'All themes + custom themes',
      'Version history',
    ],
    cta: 'Start free trial',
    popular: true,
  },
  {
    name: 'Team',
    blurb: 'For teams that design together.',
    monthly: 79,
    features: [
      'Everything in Pro',
      'Shared workspaces',
      'Roles & permissions',
      'SSO & audit log',
      'Dedicated support',
    ],
    cta: 'Contact sales',
  },
]

function priceLabel(tier: Tier, annual: boolean): string {
  if (tier.monthly === 0) return '$0'
  const value = annual ? Math.round(tier.monthly * 0.8) : tier.monthly
  return `$${value}`
}

export default function Pricing() {
  const [annual, setAnnual] = useState(true)

  return (
    <div className="bg-background">
      <main className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-muted-foreground">Pricing</p>
          <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
            Simple, honest pricing
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Start free. Upgrade when you outgrow it. Cancel any time — no
            surprises, no lock-in.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <Label
              htmlFor="billing"
              className={cn(
                'text-sm',
                !annual ? 'text-foreground' : 'text-muted-foreground',
              )}
            >
              Monthly
            </Label>
            <Switch id="billing" checked={annual} onCheckedChange={setAnnual} />
            <Label
              htmlFor="billing"
              className={cn(
                'text-sm',
                annual ? 'text-foreground' : 'text-muted-foreground',
              )}
            >
              Annual
            </Label>
            <Badge variant="secondary">Save 20%</Badge>
          </div>
        </div>

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-3">
          {TIERS.map((tier) => (
            <Card
              key={tier.name}
              className={cn(
                'h-full',
                tier.popular && 'border-primary shadow-lg ring-1 ring-primary',
              )}
            >
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="text-lg">{tier.name}</CardTitle>
                  {tier.popular && (
                    <Badge>
                      <Sparkles /> Popular
                    </Badge>
                  )}
                </div>
                <CardDescription>{tier.blurb}</CardDescription>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-heading text-4xl font-semibold tracking-tight">
                    {priceLabel(tier, annual)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {tier.monthly === 0 ? 'forever' : '/ month'}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button
                  className="w-full"
                  variant={tier.popular ? 'default' : 'outline'}
                >
                  {tier.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          Prices in USD. Annual plans are billed yearly at the discounted rate.
        </p>
      </main>
    </div>
  )
}
