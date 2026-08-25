# NOTES — Live RAM
_Updated: Phase 7 DONE (Submissions Admin)_

## Gaurav — who am I
- ML Systems Engineer @ Ant Systemz (first hire, reports to CEO)
- Speech AI: Whisper training platform (195 commits), VOIT dubbing (104 commits)
- AutoDub: separate internal testing platform (19 commits), NOT the product
- Infra: DeepSpeed multi-GPU, NCCL debug, GCP/AWS, Prefect/MLflow
- Before: Frontend dev (20+ WordPress sites, React)
- Education: BE Computer Engg, 8.85 CGPA, 2 publications (ISL recognition)
- 428 commits across 9 repositories

## Content rules (NEVER break these)
- VOIT and AutoDub are TWO DIFFERENT SYSTEMS — never merge them
- Never name speech/AI vendors (ElevenLabs, Qwen, Deepgram are PRIVATE)
- Fine to name: cloud providers (AWS, GCP) + public models (Whisper, pyannote, etc.)
- 118x is DATA TRANSFERRED, not load time (4,523 MB → 38 MB)
- Corpus: 2,000 hours per language, 20 languages
- Never mention data scraping
- No salary, no internal conflict, no colleague names

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

## Content fix DONE — portfolio aligned with resume
- Split VOIT and AutoDub into separate project cards
- Removed vendor names (ElevenLabs, Qwen, Deepgram) from projects.json
- Added founding commit story for VOIT
- Fixed corpus: "2,000 hours per language across 20 languages"
- Added commit counts (195, 104, 19, 97) to project cards
- Updated experience bullets with VOIT/AutoDub separation
- Fixed about.json dubbing paragraph
- Added "428 commits across 9 repositories" to experience summary

## Phase 7 DONE — Submissions Admin Panel
- Upstash Redis for storage (replaces old Vercel KV)
- src/lib/redis.ts — lazy-init Redis client (getRedis())
- /api/contact now stores in Redis AND sends to Formspree
- /api/submissions — password-protected GET, returns all submissions
- /submissions — password gate + card-based table, session-persistent auth
- Env vars needed: KV_REST_API_URL, KV_REST_API_TOKEN (auto), ADMIN_PASSWORD (manual)
- Debug: clean up debug fields from API responses before final

## What next
- Clean up debug fields from API responses (low priority)
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
- Vercel: Production branch must be set to next-rebuild (not main)
- Vercel: after changing env/branch, must Redeploy (not just push)
- Upstash = what Vercel KV became. Env vars: KV_REST_API_URL + KV_REST_API_TOKEN
- Submissions page: avoid setState in useEffect — use getInitial function pattern
- @upstash/redis: lpush stores JSON but lrange auto-deserializes — handle both string and object
- Upstash Redis client: lazy-init (getRedis()) to avoid crash at import time if env vars missing
