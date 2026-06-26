# Canvas

A design playground you drive by **talking to Claude Code**. You don't write or
read any code. You describe what you want — "build me a pricing page", "make a
warm, high-contrast theme", "show me all the buttons in dark mode" — and Claude
builds it, takes a screenshot, checks its own work, and asks you when something
is a matter of taste. You watch it happen live in your browser.

---

## 1. One-time setup

1. **Install Node.js 20 or newer.** Check with `node --version`; if it's older
   than 20 or missing, get the latest LTS from https://nodejs.org.
2. **Install Claude Code** (the tool you'll talk to):
   ```bash
   npm install -g @anthropic-ai/claude-code
   ```
3. **Install this project's dependencies.** In a terminal, in this folder:
   ```bash
   npm install
   ```
   (This also downloads the headless browser Claude uses to screenshot its work.)

---

## 2. Start the live app

```bash
npm run dev
```

When it's ready, open this in your browser and **leave the tab open**:

> **http://localhost:5173**

This is your live canvas — it updates the instant Claude changes anything. You'll
see **Home**, a **Components** gallery (every building block in every theme), and
**Screens** (the pages you build — empty at first). Switch themes any time from
the menu in the top-right.

---

## 3. Run Claude on this repo

Open a **second terminal** in this same folder (leave `npm run dev` running in the
first one) and start Claude Code:

```bash
claude
```

That's it. Claude automatically reads this project's instructions (`CLAUDE.md`),
so it already knows how to build screens, take screenshots, and check its work.
Now just type what you want, in plain English, and watch your browser tab.

The rhythm you'll feel:

> **you ask → Claude builds → your browser updates by itself → Claude shows you a
> screenshot of what it made → you react → repeat.**

When a choice is a matter of taste (a color, which of two layouts), Claude stops
and **asks you first**, with a picture. Just reply in plain language.

---

## 4. Things to ask for (copy these, then make them yours)

**Build a screen**
- "Build me a pricing page with three tiers and a monthly/annual toggle."
- "Make a login screen with email, password, and a 'sign in with Google' button."
- "Create a settings page with tabs for Profile, Notifications, and Billing."
- "Build a simple analytics dashboard with stat cards and a chart."
- "Make a landing page hero with a headline, subtext, and two buttons."

**Create or change a theme**
- "Make a warm, editorial theme with a serif heading and cream background."
- "Give me a high-contrast black-and-white theme with an electric green accent."
- "Add a soft pastel theme."
- "In the dark theme, make the accent color more purple."

**Add or explore components**
- "Add a date picker component and show it in the gallery."
- "Show me all the buttons in dark mode."
- "What components are available?"
- "Add a toast/notification component."

**Tweak what's there**
- "On the pricing page, make the middle plan stand out more."
- "The dashboard feels cramped — add more breathing room."
- "Make the headings bigger and the body text softer."
- "Show me the settings page on a phone." / "…in the warm theme."

**See it**
- "Screenshot the dashboard in every theme so I can compare."
- "Show me what the pricing page looks like on mobile."

Tips: keep the browser visible while you work; react in plain words ("too busy",
"warmer", "make that pop"); you never need to touch code — if anything looks
broken, just say so and Claude will fix it.

---

## Three example pages to start from

These ship with the project (and double as patterns Claude reuses). Open them and
try switching themes:

- http://localhost:5173/screens/pricing
- http://localhost:5173/screens/settings
- http://localhost:5173/screens/dashboard

---

## Sharing the live app over the internet (optional)

Running on a remote/cloud machine, or want to show someone? Expose port **5173**
with a tunnel (e.g. Cloudflare Tunnel or ngrok):

```bash
cloudflared tunnel --url http://localhost:5173
```

It prints a public `https://…` address. For live-updates to keep working through
the tunnel, start the dev server telling it that public host:

```bash
HMR_HOST=your-tunnel-host.trycloudflare.com npm run dev
```

(Host only — no `https://`, no port.) Without this the page still loads but stops
auto-updating. Running locally on your own computer? You don't need any of this.

---

## If something goes wrong

- **The page won't load.** Make sure `npm run dev` is still running in its
  terminal, and you're visiting http://localhost:5173.
- **A new page looks unstyled.** Stop the dev server (Ctrl-C) and run
  `npm run dev` again.
- **Anything else.** Tell Claude what you see — describing the problem is enough;
  it can read the logs and fix it.

---

## For the curious (how it's built)

Vite + React + TypeScript (client-only — no server to break), Tailwind CSS v4
with shadcn/ui components, TanStack Router for file-based pages, and Playwright
for the screenshots Claude uses to check its work. Themes are plain CSS files;
your built pages are committed files; Git is the only "save". Claude's working
instructions live in `CLAUDE.md`.
