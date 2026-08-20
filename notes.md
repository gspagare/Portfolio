# NOTES — Live RAM
_Updated: Phase 6 DONE (Contact Form)_

## Gaurav — who am I
- ML Systems Engineer @ Ant Systemz (first hire, reports to CEO)
- Speech AI: Whisper training platform, AutoDub/VOIT dubbing
- Infra: DeepSpeed multi-GPU, NCCL debug, GCP/AWS, Prefect/MLflow
- Before: Frontend dev (20+ WordPress sites, React)
- Education: BE Computer Engg, 8.85 CGPA, 2 publications (ISL recognition)

## Phase 1-4 DONE — Full site
- Next.js 16.3.1 + React 19 + Tailwind 4.3.3 + TS 6
- ThemeProvider, Navbar, Footer, ScrollReveal, card-hover
- 6 data JSON files, all sections consuming data
- Build + lint clean, live on gauravpagare.vercel.app

## Phase 6 DONE — Contact Form
- src/components/ContactForm.tsx — name/email/message form
- src/app/api/contact/route.ts — proxies to Formspree
- Form submits → API route validates → forwards to Formspree
- Need: FORMSPREE_ENDPOINT env var in Vercel dashboard
- Setup: formspree.io → create form → copy endpoint → paste in Vercel env

## What next
- /submissions admin panel (Phase 7)
- Legacy site test (vercel.app/legacy)
- Domain swap when ready

## Commands learned
- `git add -A` / `git commit -m` / `git push origin branch`
- `npm run build` — test production build
- `npm run lint` — ESLint check (uses eslint src/ not next lint)
- `npm run dev` — dev server localhost:3000

## Gotchas
- @/* alias maps to src/* — data/ and types/ must be inside src/
- All 4 projects private repos — no demo/GitHub links
- Next.js 16 removed `next lint` — use `eslint src/` directly
- ThemeProvider: avoid setState in useEffect, use getInitialTheme function
- Tailwind v4 = CSS config, no tailwind.config.ts

## Commands learned
- `git add -A` — stage all changes
- `git commit -m "msg"` — save snapshot locally
- `git push origin branch` — send to GitHub
- `npm run build` — production build (test for errors)
- `npm run dev` — start dev server

## Gotchas
- @/* alias maps to src/* — data/ and types/ must be inside src/
- All 4 projects are private repos — no demo/GitHub links
- CV download = PDF in public/ (no Google Drive link)
- Tailwind v4 = CSS config, no tailwind.config.ts
- Theme: CSS variables in globals.css, not Tailwind config
