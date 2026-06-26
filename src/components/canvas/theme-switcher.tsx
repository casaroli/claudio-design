import { Palette } from 'lucide-react'
import { useTheme } from '@/themes/theme-provider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

/** Runtime theme picker. Reads/writes the active theme via the ThemeProvider,
 *  which also keeps it in sync with the ?theme= URL param. */
export function ThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme()
  return (
    <Select value={theme} onValueChange={setTheme}>
      <SelectTrigger className="w-[170px]" aria-label="Theme">
        <Palette className="size-4 opacity-70" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end">
        {themes.map((t) => (
          <SelectItem key={t.id} value={t.id}>
            {t.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
