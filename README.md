# Canvas

A design playground you drive by **talking to Claude Code**. You don't write or
read any code. You describe what you want — "build me a pricing page", "make a
warm, high-contrast theme", "show me all the buttons in dark mode" — and Claude
builds it, takes a screenshot, checks its own work, and asks you when something
is a matter of taste. You watch it happen live in your browser.

---

## What you need (one-time setup)

1. **Node.js 20 or newer.** Check by running `node --version`. If it's older
   than 20 (or missing), install the latest LTS from https://nodejs.org.
2. **Claude Code.** This whole thing is meant to be used *through* Claude Code.

That's it. No database, no accounts, no servers to manage.

---

## Start it (two steps)

In a terminal, in this folder:

```bash
npm install      # first time only — downloads everything (a minute or two)
npm run dev      # starts the live app
```

When it's ready you'll see a local address. Open it in your browser:

> **http://localhost:5173**

Leave that tab open. This is your live canvas — it updates the instant Claude
changes anything.

What you'll see:
- **Home** — an overview.
- **Components** — every building block, shown in every theme.
- **Screens** — the full pages you've built (empty at first).

Switch the theme any time from the menu in the top-right.

---

## Now just talk to Claude Code

Open Claude Code in this folder and ask for what you want, in plain words:

- *"Build me a pricing page with three tiers."*
- *"Make a warm, editorial theme with a serif heading."*
- *"On the dashboard, make the numbers bigger and add a chart."*
- *"Show me the settings page in dark mode on a phone."*

Claude will build it, the page in your browser will update by itself, and Claude
will show you a screenshot of what it made. When a choice is up to taste —
a color, a layout — it will stop and **ask you**, with a picture, before going
on. Just reply in plain language.

Tips:
- Keep the browser tab visible while you work — you'll see changes live.
- If you don't like something, say so: *"too cramped"*, *"warmer"*,
  *"make the button stand out more."*
- You never need to touch the code. If something looks broken, tell Claude and
  it will fix it.

---

## Three example pages to look at

These ship with the project as a taste of what's possible (and as patterns
Claude reuses). Open them and try switching themes:

- http://localhost:5173/screens/pricing
- http://localhost:5173/screens/settings
- http://localhost:5173/screens/dashboard

---

## Sharing the live app over the internet (optional)

If you're running this on a remote/cloud machine, or want to show someone the
live page, expose port **5173** with a tunnel (e.g. Cloudflare Tunnel or ngrok):

```bash
# example with cloudflared
cloudflared tunnel --url http://localhost:5173
```

It will print a public `https://…` address. For live-updates to keep working
through the tunnel, start the dev server telling it that public host:

```bash
HMR_HOST=your-tunnel-host.trycloudflare.com npm run dev
```

(Use the host only — no `https://`, no port.) Without this the page still loads,
but it stops auto-updating. If you're just running locally on your own computer,
you don't need any of this.

---

## If something goes wrong

- **The page won't load.** Make sure `npm run dev` is still running and you're
  visiting http://localhost:5173.
- **A new page looks unstyled.** Stop the server (Ctrl-C) and run `npm run dev`
  again.
- **Anything else.** Tell Claude Code what you see — describing the problem is
  enough; it can read the logs and fix it.

---

## For the curious (how it's built)

Vite + React + TypeScript (client-only — no server to break), Tailwind CSS v4
with shadcn/ui components, TanStack Router for file-based pages, and Playwright
for the screenshots Claude uses to check its work. Themes are plain CSS files;
your built pages are committed files; Git is the only "save". Claude's working
instructions live in `CLAUDE.md`.
