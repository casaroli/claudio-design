import { defineConfig, type PluginOption } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import { utimesSync } from 'node:fs'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
//
// Single dev server, shared by Claude's Playwright and the human's browser.
// Bound to 0.0.0.0 so it is reachable from both localhost and a tunnel.
//
// HMR over a tunnel / HTTPS: the browser opens the HMR websocket against the
// PAGE's origin, not the dev server's. Behind a tunnel that origin is the
// public HTTPS host on port 443, so Vite's default (ws://<host>:5173) silently
// fails and live-reload stops working. When tunneling, set these env vars
// (see README "Expose over a tunnel"):
//   HMR_HOST=your-tunnel.trycloudflare.com   (the public host, no protocol)
// Optional overrides: HMR_PROTOCOL (default wss), HMR_CLIENT_PORT (default 443).
const tunnelHmr = process.env.HMR_HOST
  ? {
      protocol: process.env.HMR_PROTOCOL ?? 'wss',
      host: process.env.HMR_HOST,
      clientPort: Number(process.env.HMR_CLIENT_PORT ?? 443),
    }
  : undefined

// File watching: native inotify events do NOT fire when the project lives on a
// Windows drive mounted into WSL (/mnt/c/...) or some Docker volumes. Without
// this, editing or adding files silently fails to trigger HMR — the whole
// "edit → live update → screenshot" loop breaks. Polling is slightly heavier
// but always works. Auto-enabled on /mnt/ paths; override with
// VITE_USE_POLLING=1 (force on) or =0 (force off).
const onWindowsMount = process.cwd().startsWith('/mnt/')
const usePolling =
  process.env.VITE_USE_POLLING === '1' ||
  (process.env.VITE_USE_POLLING !== '0' && onWindowsMount)

// Tailwind v4 generates utility classes on demand by scanning source files.
// When a brand-new file (a new screen, component demo, or theme) is ADDED while
// the server is running, Tailwind's scanner can miss it on mounted/polled
// filesystems — so the new file's never-seen-before classes (e.g. h-48,
// bg-chart-1) aren't generated and the page renders unstyled until a restart.
// Vite's own (polled) watcher DOES see the new file, so we hook it: on add or
// remove of a source file, bump the CSS entry's mtime, which makes Tailwind
// re-scan everything from scratch. This keeps "add a file -> it just works"
// true without ever restarting the server.
function tailwindRescanOnNewFiles(): PluginOption {
  const cssEntry = fileURLToPath(new URL('./src/index.css', import.meta.url))
  const srcDir = fileURLToPath(new URL('./src/', import.meta.url))
  const watched = /\.(tsx|ts|jsx|js|css|mdx)$/
  return {
    name: 'canvas:tailwind-rescan-on-new-files',
    apply: 'serve',
    configureServer(server) {
      const bump = (file: string) => {
        if (!file.startsWith(srcDir) || file === cssEntry) return
        if (!watched.test(file)) return
        const now = new Date()
        try {
          utimesSync(cssEntry, now, now)
        } catch {
          /* ignore */
        }
      }
      server.watcher.on('add', bump)
      server.watcher.on('unlink', bump)
    },
  }
}

export default defineConfig({
  plugins: [
    // Router plugin MUST come before the React plugin.
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    react(),
    tailwindcss(),
    tailwindRescanOnNewFiles(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    hmr: tunnelHmr,
    // Allow any host header so cloudflared/ngrok tunnels aren't rejected.
    allowedHosts: true,
    watch: usePolling ? { usePolling: true, interval: 120 } : undefined,
  },
})
