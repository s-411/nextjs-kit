# CLAUDE.md

> **For incoming agents: read this file first. Then read `KIT_TOOLING.md`. Then `PROCESS_GUIDE.md`. Then act.**

---

## This app

- **Name:** 75 Hard — Chasing Optimum Redesign
- **Purpose:** Rebrand of the 75 Hard daily-checklist app in the Chasing Optimum visual system (dark mode, Anton + Poppins, orange pill CTAs).
- **Slug:** nextjs-kit
- **Domain:** tbd
- **Auth:** tbd
- **Database:** tbd
- **Billing:** tbd
- **Email:** tbd
- **Analytics:** Vercel only
- **Sentry:** defer
- **Current stage:** 2 — Reference Ingestion (Claude Design canvas dropped into `public/75hard/`)
- **Status:** NEW

---

## How to work in this repo

1. **Run `BOOTSTRAP.md` first** if this is your first session in this repo, or if anything seems off (missing skills, build errors, missing files). It's a 5-minute verification that catches problems before they cascade.
2. **Read `KIT_TOOLING.md`.** Inventory of skills and MCP servers available at user scope and per-repo. Reach for these deliberately instead of improvising.
3. **Read `PROCESS_GUIDE.md`.** It defines all 15 stages with skip conditions.
4. **Find the current stage above.** Do only that stage's work. Do not get ahead.
5. **Use the prompt from `PROMPTS.md`** for the current stage.
6. **Self-check after every phase.** Invoke `self-check` skill before claiming any phase done.
7. **Park scope creep in `LATER.md`.** Never expand scope inside the current stage.
8. **Read context first. Plan mode before building.** No code without a plan I've approved.

---

## Source-of-truth files

| File | What it is |
|------|-----------|
| `BOOTSTRAP.md` | Per-repo setup verification — run first, every time. |
| `KIT_TOOLING.md` | Inventory of skills + MCPs available at user scope and per-repo. Read on session start. |
| `PROCESS_GUIDE.md` | The 15-stage pipeline. Authoritative. |
| `PROMPTS.md` | Copy-paste prompts indexed by stage. |
| `KING_PROMPTS.md` | Sub-chat kickoff prompts with stack-menu appendix. |
| `START_NEW.md` | Brand-new-app bootstrap procedure. |
| `REF_DOCS_INDEX.md` | Map of stages → which file to read in the ref-docs library. |
| `convex-auth-setup.md` | Convex Auth (`@convex-dev/auth`) setup, sign-in patterns. Read at Stage 5/6 if Auth = Convex Auth. |
| `convex-react-client.md` | Convex queries/mutations/actions reference. Read at Stage 6. |
| `legal/privacy.template.md` | Privacy policy template — filled at Stage 10. |
| `legal/terms.template.md` | Terms of use template — filled at Stage 10. |
| `LATER.md` | Everything out of scope for v1. Keeps current stages clean. |
| `~/Documents/GitHub/ref-docs/` | Tech stack reference library at apps root (NOT per-repo). Deep references for Convex, Stripe, Sentry. |

Files created during the build (not part of the kit):
| File | Created at |
|------|-----------|
| `app-references/{images,html,code}/` | Stage 2 |
| `HANDOFF.md` | Stage 15 |

---

## Hard constraints

- **No raw colors / spacing / radii / fonts after Stage 4.** Every value flows through Tailwind v4 `@theme` tokens in `globals.css`. No `bg-[#abc123]`, no `p-[18px]`, no inline arbitrary values.
- **Stage 4 is a hard gate.** The agent refuses to build screen 11+ until Stage 4 is signed off. Override only on explicit user instruction with one-line caveat surfaced.
- **One agent per repo at a time.** If another agent is already working here, stop.
- **Auth-scoped queries by default.** Every Convex query that returns user data filters by the authenticated user's ID. No "return all rows of table X" queries unless the data is genuinely public.
- **Mobile-responsive baseline.** Every page works at sm (640px), md (768px), lg (1024px). Test in browser dev tools or on a phone before declaring done.
- **No App Store / TestFlight / EAS references.** This is a web kit. If a prompt or skill mentions any of those, it's wrong — flag it.

---

## When in doubt

Stop. Ask. Don't guess. The cost of asking is 30 seconds; the cost of guessing wrong is undoing 2 hours of work.

---

## Stage history (update as you progress)

| Stage | Completed | Notes |
|-------|:-:|-------|
| 0. Stack lock | ☐ | Stack TBD — design canvas implemented ahead of stack lock. |
| 1. Repo spin-up | ✅ | Minimal Next.js 15 + Tailwind v4 app scaffolded in this repo. |
| 2. Reference ingestion | ✅ | Claude Design bundle (`F7ncI09PFWPmmLl8lB1hEw`) extracted to `public/75hard/`; canvas served at `/75hard/canvas.html`. |
| 3. First screens (1-4 anchor) | ☐ | |
| 4. Tokenization (HARD GATE) | ☐ | |
| 4.5. Component library + brand guidelines | ☐ | |
| 5. Auth wiring | ☐ | |
| 6. Backend + data | ☐ | |
| 7. Bulk app build | ☐ | |
| 8. Billing | ☐ | |
| 9. Email | ☐ | |
| 10. Legal + landing | ☐ | |
| 11. Self-check gate | ☐ | |
| 12. Domain wiring | ☐ | |
| 13. Analytics | ☐ | |
| 14. Sentry | ☐ | |
| 15. Final QA + handoff | ☐ | |
