import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function SelectDemo() {
  return (
    <Select defaultValue="medium">
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Select density" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Density</SelectLabel>
          <SelectItem value="compact">Compact</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="comfortable">Comfortable</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
