/** Turn a file id like "user-settings" into a display label "User Settings". */
export function idToLabel(id: string): string {
  return id
    .split(/[-_]/)
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(' ')
}
