// Canvas screenshot script — the deterministic visual feedback loop.
//
// Drives headless Chromium against the running dev server and writes a PNG to
// .screenshots/ so Claude can read it back through vision.
//
//   npm run shot -- --route=/screens/pricing --theme=dark --viewport=mobile
//   npm run shot -- --isolate=button --theme=warm-editorial
//
// Flags:
//   --route=/path           route to capture (default "/")
//   --isolate=<component>   shortcut for --route=/isolate/<component>
//   --theme=<id>            theme id (light | dark | warm-editorial | …)
//   --viewport=<name|WxH>   mobile | tablet | desktop, or e.g. 1280x720
//   --out=<file>            override output path (otherwise auto-named)
//   --chrome                keep the Canvas nav bar (hidden by default)
//   --no-full               capture only the viewport, not the full page
//   --wait=<ms>             extra settle time before capture (default 200)
//   --port=<n>              dev server port (default 5173)
//
// It always: waits for fonts to load, forces prefers-reduced-motion: reduce,
// and renders at 2x for crisp output.

import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const OUT_DIR = resolve(ROOT, '.screenshots')

const VIEWPORTS = {
  mobile: { width: 390, height: 844 },
  tablet: { width: 834, height: 1112 },
  desktop: { width: 1440, height: 900 },
}

function parseArgs(argv) {
  const args = {}
  for (const raw of argv) {
    const m = /^--([^=]+)(?:=(.*))?$/.exec(raw)
    if (!m) continue
    args[m[1]] = m[2] === undefined ? true : m[2]
  }
  return args
}

function resolveViewport(value) {
  if (!value) return VIEWPORTS.desktop
  if (VIEWPORTS[value]) return VIEWPORTS[value]
  const m = /^(\d+)x(\d+)$/.exec(value)
  if (m) return { width: Number(m[1]), height: Number(m[2]) }
  throw new Error(
    `Unknown --viewport "${value}". Use mobile | tablet | desktop, or WxH (e.g. 1280x720).`,
  )
}

function slug(s) {
  return s.replace(/^\//, '').replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') || 'home'
}

const args = parseArgs(process.argv.slice(2))
const port = Number(args.port ?? 5173)
const route = args.isolate ? `/isolate/${args.isolate}` : (args.route ?? '/')
const theme = args.theme ?? null
const viewportName =
  typeof args.viewport === 'string' ? args.viewport : 'desktop'
const viewport = resolveViewport(args.viewport)
const fullPage = args.full !== 'false' && args.full !== false && !args['no-full']
const keepChrome = Boolean(args.chrome)
const settle = Number(args.wait ?? 200)

const url = new URL(`http://localhost:${port}${route}`)
if (theme) url.searchParams.set('theme', theme)

const outFile = args.out
  ? resolve(ROOT, String(args.out))
  : resolve(
      OUT_DIR,
      `${slug(route)}__${theme ?? 'default'}__${viewportName.replace(/[^a-z0-9]+/gi, '-')}.png`,
    )

async function ensureServer() {
  try {
    const res = await fetch(`http://localhost:${port}/`)
    if (!res.ok) throw new Error(String(res.status))
  } catch {
    console.error(
      `\n✗ Dev server is not responding on http://localhost:${port}.\n` +
        `  Start it first:  npm run dev   (then re-run this command)\n`,
    )
    process.exit(1)
  }
}

async function main() {
  await ensureServer()
  await mkdir(dirname(outFile), { recursive: true })

  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 2,
    reducedMotion: 'reduce', // never capture mid-animation
  })
  const page = await context.newPage()

  await page.goto(url.toString(), { waitUntil: 'load', timeout: 30000 })

  // Wait for the app to actually mount something.
  await page.waitForSelector('#root > *', { timeout: 15000 })

  // Hide Canvas's own UI unless explicitly asked to keep it.
  if (!keepChrome) {
    await page.evaluate(() =>
      document.documentElement.setAttribute('data-chrome-hidden', 'true'),
    )
  }

  // Webfonts loaded → no blurry/swapped text.
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(settle)

  await page.screenshot({ path: outFile, fullPage, animations: 'disabled' })
  await browser.close()

  const rel = outFile.replace(ROOT + '/', '')
  console.log(`✓ ${url.pathname}${url.search}  [${viewport.width}×${viewport.height}]  →  ${rel}`)
}

main().catch((err) => {
  console.error('✗ Screenshot failed:', err.message)
  if (/executable doesn't exist|Looks like Playwright|install/i.test(err.message)) {
    console.error('  The browser may be missing. Run:  npx playwright install chromium')
  }
  process.exit(1)
})
