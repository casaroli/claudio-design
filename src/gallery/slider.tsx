import { Slider } from '@/components/ui/slider'

export default function SliderDemo() {
  return (
    <div className="w-72">
      <Slider defaultValue={[60]} max={100} step={1} />
    </div>
  )
}
