import type { ComponentType } from 'react'
import { idToLabel } from '@/lib/labels'

// Component-gallery discovery — the filesystem IS the registry.
//
// Every *.tsx file in this folder is one "demo": a small, representative
// showcase of a single component from src/components/ui. Drop a file in,
// default-export a component, and it appears in /components (across every
// theme) and at /isolate/<filename>. No manifest to edit.
//
// Optional: `export const title = 'Nice Name'` to override the auto label.
type DemoModule = { default: ComponentType; title?: string }

const modules = import.meta.glob<DemoModule>('./*.tsx', { eager: true })

export type DemoEntry = {
  id: string
  label: string
  Component: ComponentType
}

export const demos: DemoEntry[] = Object.entries(modules)
  .map(([path, mod]) => {
    const id = path.replace(/^\.\//, '').replace(/\.tsx$/, '')
    return { id, label: mod.title ?? idToLabel(id), Component: mod.default }
  })
  .filter((e) => typeof e.Component === 'function')
  .sort((a, b) => a.label.localeCompare(b.label))

export function getDemo(id: string): DemoEntry | undefined {
  return demos.find((d) => d.id === id)
}
