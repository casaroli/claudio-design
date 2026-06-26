// Runs automatically after `npm install`. Installs the Chromium browser that
// the screenshot script (npm run shot) and the Playwright MCP both need, so the
// visual feedback loop works out of the box. It must NEVER fail the install:
// any problem here is downgraded to a warning and we exit 0.
import { execSync } from 'node:child_process'

// Skip in CI/programmatic installs that set this, to avoid surprise downloads.
if (process.env.CANVAS_SKIP_BROWSER_INSTALL === '1') {
  process.exit(0)
}

try {
  console.log('Canvas: ensuring Playwright Chromium is installed (for screenshots)…')
  execSync('npx playwright install chromium', { stdio: 'inherit' })
} catch {
  console.warn(
    '\nCanvas: could not install Chromium automatically.\n' +
      'Before using "npm run shot", run:  npx playwright install chromium\n',
  )
}

process.exit(0)
