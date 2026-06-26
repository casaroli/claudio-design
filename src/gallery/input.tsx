import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function InputDemo() {
  return (
    <div className="grid w-72 gap-2">
      <Label htmlFor="demo-email">Email</Label>
      <Input id="demo-email" type="email" placeholder="you@example.com" />
      <p className="text-xs text-muted-foreground">
        We'll never share your email.
      </p>
    </div>
  )
}
