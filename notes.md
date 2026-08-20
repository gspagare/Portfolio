# NOTES — Live RAM
_Updated: Phase 4 DONE_

## Gaurav — who am I
- ML Systems Engineer @ Ant Systemz (first hire, reports to CEO)
- Speech AI: Whisper training platform, AutoDub/VOIT dubbing
- Infra: DeepSpeed multi-GPU, NCCL debug, GCP/AWS, Prefect/MLflow
- Before: Frontend dev (20+ WordPress sites, React)
- Education: BE Computer Engg, 8.85 CGPA, 2 publications (ISL recognition)

## Phase 1 DONE
- next-rebuild branch, old files in public/legacy/
- Next.js 16.3.1 + React 19 + Tailwind 4.3.3 + TS 6
- profile.png + new resume PDF in public/

## Phase 2 DONE — Layout Shell
- ThemeProvider, Navbar (glass, hamburger, active highlight), Footer
- globals.css with dark/light theme variables

## Phase 3 DONE — Data Layer
- src/types/index.ts — TypeScript interfaces
- src/data/ — 6 JSON files (profile, about, experience, projects, skills, education)
- page.tsx consumes all data, build clean

## Phase 4 DONE — Polish
- src/components/ScrollReveal.tsx — Intersection Observer fade-in
- Card hover effects (lift + shadow + border glow)
- Gradient text on hero name
- Buttons: hover lift + shadow glow
- Skill tags: hover accent color
- Contact: responsive stack on mobile
- eslint.config.mjs — ESLint 9 flat config (next.js 16 removed next lint)

## What next (Phase 5-6)
- Deploy to Vercel (push next-rebuild, preview)
- Final review on live preview
- Merge to main when ready

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
