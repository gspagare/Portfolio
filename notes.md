# NOTES — Live RAM
_Updated: Phase 1 DONE_

## What we doing
- Rebuild portfolio: vanilla HTML → Next.js + Tailwind v4 + TS
- Old code on main (Netlify safe) — next-rebuild branch (Vercel)

## Decisions made
- App Router, Tailwind v4 CSS-based, Dark+Light toggle
- Single page, desktop-first design, mobile-first CSS
- JSON data files + TS types, /submissions as phase 7
- Legacy old code at vercel.app/legacy

## Phase 1 DONE
- next-rebuild branch created, old files in public/legacy/
- Next.js 16.3.1 + React 19 + Tailwind 4.3.3 + TS 6
- Config: tsconfig.json, next.config.ts, postcss.config.mjs
- Starter: src/app/layout.tsx, page.tsx, globals.css
- npm run dev works on localhost:3000
- package.json scripts: dev (turbopack), build, start, lint

## What next (Phase 2)
- Build Navbar (glass style, theme toggle, responsive)
- Build Footer (social links, copyright)
- ThemeProvider (dark/light, localStorage)
- Smooth scroll + active nav highlight

## Commands learned
- `git checkout -b name` — create + switch branch
- `git clean -f file` — delete untracked file
- `git branch --show-current` — which branch am I on
- `npm run dev` — start Next.js dev server
- `npm run build` — build for production
- `Remove-Item file -Force` — delete file (PS)
- `Remove-Item -Recurse -Force folder` — delete folder (PS)

## Gotchas
- npm 11 needs allowScripts in package.json for postinstall hooks
- PowerShell Out-File encoding: use [System.IO.File]::WriteAllText for utf8
- Tailwind v4 = CSS config (no tailwind.config.ts), use @import "tailwindcss"
- create-next-app hates capital folder names — use lowercase or manual init
