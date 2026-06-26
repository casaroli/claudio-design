import type { ComponentType } from 'react'
import { idToLabel } from '@/lib/labels'

// Screen discovery — the filesystem IS the registry.
//
// Every *.tsx file in this folder is one screen. Drop a file in, default-export
// a React component, and it appears in /screens and is reachable at
// /screens/<filename> instantly. No manifest, no route file to write.
//
// Optional: `export const title = 'Nice Name'` to override the auto label.
type ScreenModule = { default: ComponentType; title?: string }

const modules = import.meta.glob<ScreenModule>('./*.tsx', { eager: true })

export type ScreenEntry = {
  id: string
  label: string
  Component: ComponentType
}

export const screens: ScreenEntry[] = Object.entries(modules)
  .map(([path, mod]) => {
    const id = path.replace(/^\.\//, '').replace(/\.tsx$/, '')
    return { id, label: mod.title ?? idToLabel(id), Component: mod.default }
  })
  .filter((e) => typeof e.Component === 'function')
  .sort((a, b) => a.label.localeCompare(b.label))

export function getScreen(id: string): ScreenEntry | undefined {
  return screens.find((s) => s.id === id)
}
