# CLAUDE.md — operating guide for Canvas

You are driving **Canvas**, a live UI design playground. The person you are
working with **cannot read or write code** and **cannot recover from a broken
build**. They talk; you build. They watch the result in their browser while you
work. Your job is to turn plain-language requests ("build me a pricing page",
"make a warm high-contrast theme", "show me the buttons in dark mode") into real
screens, components, and themes — and to *verify your own work visually* before
saying it's done.

Keep these rules in mind the whole time:

- **Never leave the app broken.** Make small changes, keep it runnable, check
  after each one. If something errors, fix it before moving on.
- **Always verify with a screenshot.** Building is not done until you've looked
  at it (see "The screenshot ritual"). No exceptions.
- **Ask when it's a matter of taste.** Accent color, density, which of two
  layouts — stop and ask, showing a screenshot. Don't silently guess.
- **The filesystem is the configuration.** New screens/components/themes
  register *by existing as a file*. There is no manifest to edit.

---

## The working rhythm

1. The user asks for something in plain language.
2. You build or edit the relevant file(s).
3. HMR instantly updates the user's open browser tab (and your next screenshot).
4. You run `npm run shot`, **open the PNG**, and critique it: spacing, contrast,
   alignment, responsive behavior at mobile *and* desktop, across the themes
   that matter.
5. You iterate, or you stop and ask the user a focused question (with a
   screenshot) when a choice is subjective.
6. The user eyeballs the live page and replies.

Keep the user looking at the live page throughout. Tell them which URL to open
(e.g. "open http://localhost:5173/screens/pricing").

---

## Start the dev server (do this first, once)

Run it in the background so you can keep working, and log to a file you can tail
for compile errors:

```bash
npm run dev > .dev.log 2>&1 &
```

Then confirm it's up and watch for errors:

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:5173/   # expect 200
tail -n 40 .dev.log                                               # look for errors
```

- One server serves **both** your screenshots (localhost:5173) and the human's
  browser. You don't start a second one.
- First start can take ~30s the first time (dependency optimization). Be patient
  and poll the curl until it returns 200.
- After editing a file, check `.dev.log` for the `hmr update` line and any
  errors before screenshotting.

If the server isn't running, `npm run shot` will tell you and exit.

---

## The screenshot ritual (non-negotiable)

After building or changing **any** component or screen:

1. Take a shot:
   ```bash
   npm run shot -- --route=/screens/pricing --theme=light --viewport=desktop
   npm run shot -- --route=/screens/pricing --theme=light --viewport=mobile
   ```
2. **Open the PNG** it wrote (it prints the path; they live in `.screenshots/`)
   and actually look at it.
3. Self-critique like a designer: Is the spacing even? Is text readable
   (contrast)? Are things aligned? Does it hold up at **both** mobile and
   desktop? Does it look right in the themes the user cares about?
4. Fix what's wrong and repeat. Only call the work done once a screenshot
   confirms it.

Check at least **mobile + desktop**, and any theme the request implies ("in dark
mode" → shoot `--theme=dark`). For anything visual the user will judge, show
them the screenshot before declaring victory.

### `npm run shot` reference

```
npm run shot -- [flags]
  --route=/path            route to capture (default "/")
  --isolate=<component>    shortcut for /isolate/<component> (clean canvas)
  --theme=<id>             light | dark | warm-editorial | <any theme file>
  --viewport=<name|WxH>    mobile | tablet | desktop, or e.g. 1280x720
  --out=<file>             override output path
  --chrome                 keep the Canvas nav bar (hidden by default)
  --no-full                capture only the viewport, not the full scroll height
```

The script always waits for webfonts (`document.fonts.ready`), forces
`prefers-reduced-motion: reduce`, and renders at 2× — so shots are crisp, never
blurry mid-animation, never missing fonts. Filenames are predictable:
`.screenshots/<route>__<theme>__<viewport>.png`.

### Script vs. Playwright MCP

- **Screenshot script** = "look at it." Use it for almost everything: building,
  reviewing layout, checking themes/viewports. It's deterministic and fast.
- **Playwright MCP** (pre-wired in `.mcp.json`) = "use it." Reach for it only
  when you must *interact* to verify something: open a dropdown/dialog, fill a
  field, check a hover/focus state, click through a flow. The MCP drives a real
  browser against the same localhost:5173.

---

## Where things go (auto-registration)

| You want to add…        | Create a file in…           | It appears at…                         |
| ----------------------- | --------------------------- | -------------------------------------- |
| A screen / page         | `src/screens/<name>.tsx`    | `/screens` index + `/screens/<name>`   |
| A component showcase     | `src/gallery/<name>.tsx`    | `/components` gallery + `/isolate/<name>` |
| A theme                 | `src/themes/<name>.css`     | the theme switcher, instantly          |
| A shadcn UI component    | `npx shadcn@latest add <x>` | `src/components/ui/<x>.tsx`             |

There is **no manifest, no router file, no list to edit**. A file exists →
it's registered. (This is real: it's verified by a glob over the filesystem.)
Filenames become URLs and labels: `user-settings.tsx` → `/screens/user-settings`,
labelled "User Settings".

---

## Building a screen

Create `src/screens/<name>.tsx` that **default-exports** a React component:

```tsx
export const title = 'Pricing'        // optional; overrides the auto label

export default function Pricing() {
  return (
    <div className="bg-background">
      <main className="mx-auto max-w-6xl px-4 py-16">
        {/* ...build with shadcn components + Tailwind... */}
      </main>
    </div>
  )
}
```

Notes:
- Wrap the screen in `bg-background` and give it real padding — when screenshot
  without chrome, the screen is the whole page.
- Use the **theme tokens**, never hardcoded colors, so it works in every theme:
  `bg-background text-foreground`, `bg-card`, `bg-primary text-primary-foreground`,
  `text-muted-foreground`, `border-border`, `bg-secondary`, `bg-accent`,
  `text-destructive`, and `bg-chart-1`…`bg-chart-5` for data viz. Use
  `font-heading` for display headings (a theme may make it a serif).
- Import UI from `@/components/ui/...` and icons from `lucide-react`.
- **Imitate the example screens** — they're the quality bar:
  `src/screens/pricing.tsx`, `src/screens/settings.tsx`,
  `src/screens/dashboard.tsx`.

Then run the screenshot ritual.

## Adding a component to the gallery

The raw shadcn components live in `src/components/ui/` (that folder *is* the list
of available components). The gallery shows a **demo** of each. To add one:

1. Install it if needed: `npx shadcn@latest add <name>` (e.g. `tooltip`).
2. Create `src/gallery/<name>.tsx` that default-exports a small, representative
   showcase:
   ```tsx
   import { Button } from '@/components/ui/button'
   export default function ButtonDemo() {
     return <Button>Click me</Button>
   }
   ```
3. It now appears in `/components` (rendered in every theme side-by-side) and at
   `/isolate/<name>`. Screenshot `--isolate=<name>` to check it.

Keep demos compact and centered — they're shown in small theme tiles.

---

## Theming

A theme is **one CSS file** of custom properties in `oklch()` (perceptually even
color), scoped to a `[data-theme="<id>"]` selector. The active theme is set via
`data-theme` on `<html>`; the app reads it from the `?theme=` URL param and the
runtime switcher in the top bar.

### Generate a brand-new theme from a request

When the user asks for "a warm high-contrast theme" or similar:

1. Copy an existing theme file (start from `src/themes/light.css` or
   `dark.css`) to `src/themes/<your-id>.css`.
2. Change the selector to `[data-theme="<your-id>"]`.
3. Adjust the `oklch(L C H)` values — `L` = lightness 0–1, `C` = chroma
   (saturation), `H` = hue angle 0–360. Keep foreground/background contrast
   high enough to read. Keep **every** variable that the other theme files have
   (the full token set), or some components will look wrong.
4. Save. It appears in the switcher automatically. Verify:
   ```bash
   npm run shot -- --route=/components --theme=<your-id> --viewport=desktop
   npm run shot -- --route=/screens/dashboard --theme=<your-id> --viewport=desktop
   ```
   Look at the PNGs across a screen *and* the gallery before declaring it done.
   If a choice is subjective (how warm? how much contrast?), show the user and
   ask.

### Variable shape (matches tweakcn)

The token names match what the **tweakcn** editor (https://tweakcn.com) exports
for shadcn — `--background`, `--foreground`, `--card`, `--primary`,
`--secondary`, `--muted`, `--accent`, `--border`, `--ring`, `--chart-1`…`-5`,
`--sidebar*`, `--radius`. So a user can design visually in tweakcn, hand you the
exported `:root { … }` block, and you paste its contents under
`[data-theme="<id>"]` in a new file. (tweakcn's dark goes under `.dark`; put it
under your theme's selector instead.)

A theme may also set `--app-font-heading` to swap the display typeface (see how
`warm-editorial.css` switches headings to a serif).

---

## Asking the human (don't guess on taste)

Stop and ask — in the terminal, with a screenshot — whenever the choice is
subjective and you can't infer it from the request:

- accent/brand color, exact hue or "how warm/bold"
- density / spacing feel
- which of two layouts
- tone of copy, imagery choices

Show the current state ("here's what it looks like now — [screenshot]") and ask
one focused question. Build the rest; ask only about the genuinely open call.

---

## Commands cheat sheet

```bash
npm run dev > .dev.log 2>&1 &     # start the shared dev server (background)
tail -f .dev.log                  # watch for HMR + compile errors
npm run shot -- --route=/ --theme=dark --viewport=mobile   # screenshot
npm run typecheck                 # TypeScript check (run if something looks off)
npm run lint                      # oxlint
npm run build                     # production static build (outputs to dist/)
npx shadcn@latest add <name>      # add a shadcn component into src/components/ui
```

---

## Environment notes (already handled — don't undo)

- **File watching uses polling** when the project is on a Windows mount
  (`/mnt/...`) — native file events don't fire there, which would silently break
  HMR. Configured in `vite.config.ts` (`server.watch.usePolling`, auto-enabled;
  override with `VITE_USE_POLLING=1`/`0`).
- **New files trigger a Tailwind re-scan.** A small plugin in `vite.config.ts`
  bumps the CSS when a source file is added, so a brand-new screen's
  never-before-seen classes are generated without a restart. If you ever see a
  *new* page render unstyled, the cheap fix is to restart the dev server.
- **Tunnels / HTTPS:** to share the live app over a tunnel, expose port 5173 and
  start the server with `HMR_HOST=<public-host>` so the HMR websocket connects
  (see `README.md` → "Expose over a tunnel"). Without it, the page loads but
  live-reload silently stops.
- The router's `src/routeTree.gen.ts` is generated — don't hand-edit it.
