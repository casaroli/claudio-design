import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function TextareaDemo() {
  return (
    <div className="grid w-72 gap-2">
      <Label htmlFor="demo-msg">Message</Label>
      <Textarea id="demo-msg" placeholder="Tell us what you think…" rows={4} />
    </div>
  )
}
