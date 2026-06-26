import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export default function CheckboxDemo() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Checkbox id="demo-terms" defaultChecked />
        <Label htmlFor="demo-terms">Accept terms and conditions</Label>
      </div>
      <div className="flex items-center gap-3">
        <Checkbox id="demo-news" />
        <Label htmlFor="demo-news">Subscribe to the newsletter</Label>
      </div>
    </div>
  )
}
