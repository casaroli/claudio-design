import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

export default function SwitchDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Switch id="demo-wifi" defaultChecked />
        <Label htmlFor="demo-wifi">Wi-Fi</Label>
      </div>
      <div className="flex items-center gap-3">
        <Switch id="demo-bt" />
        <Label htmlFor="demo-bt">Bluetooth</Label>
      </div>
    </div>
  )
}
