// Theme registry — the single source of truth for "what themes exist".
//
// Each file under src/themes/*.css defines ONE theme as a
// `[data-theme="<id>"] { ... }` block, where <id> is the filename.
// Importing them all here does two jobs at once:
//   1. bundles their CSS (side-effect import), and
//   2. lets us enumerate them for the runtime switcher.
// Add a new *.css file and it appears in the switcher automatically — there is
// no list to edit. (registry.ts itself is *.ts, so it is never matched.)
const modules = import.meta.glob('./*.css', { eager: true })

export type ThemeMeta = { id: string; label: string }

function toLabel(id: string): string {
  return id
    .split('-')
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(' ')
}

// Show the two neutral baselines first, then everything else alphabetically.
const PREFERRED = ['light', 'dark']
function order(id: string): number {
  const i = PREFERRED.indexOf(id)
  return i === -1 ? PREFERRED.length : i
}

export const themes: ThemeMeta[] = Object.keys(modules)
  .map((path) => path.replace(/^\.\//, '').replace(/\.css$/, ''))
  .sort((a, b) => order(a) - order(b) || a.localeCompare(b))
  .map((id) => ({ id, label: toLabel(id) }))

export const themeIds: string[] = themes.map((t) => t.id)

export const DEFAULT_THEME: string = themeIds.includes('light')
  ? 'light'
  : themeIds[0]

export function isTheme(value: string | null | undefined): value is string {
  return !!value && themeIds.includes(value)
}
