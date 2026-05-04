# KIT_TOOLING.md — Skills & MCPs Available

> **What this is:** the agent-facing inventory of skills and MCP servers available in any repo running this kit. Read this on session start so you know what's available before reaching for workarounds.
>
> **Two skill locations to know about:**
>
> 1. **Per-repo kit skills** at `.claude/skills/` — 4 skills that ship with the kit via degit. Version-locked to whatever kit version this repo last pulled.
> 2. **User-scope vendor skills** at `~/.claude/skills/` — Convex, Clerk, Vercel, Next.js, Expo plugins. Installed once per Mac.
>
> **Verify installation any time:**
> ```bash
> claude mcp list && echo "---PER-REPO SKILLS---" && ls .claude/skills/ && echo "---USER-SCOPE SKILLS---" && ls ~/.claude/skills/
> ```
>
> **If something listed here is missing or fails to invoke:** flag it and stop. Don't work around it — refresh the kit (`npx degit s-411/nextjs-kit --force`) for per-repo skills, or check `CREDENTIALS.md` (RN kit) / Mac setup for user-scope MCPs.

---

## Per-repo kit skills (.claude/skills/)

These ship with the kit. Refresh via `npx degit s-411/nextjs-kit --force` in the repo root.

- **design-consistency** — Stage 3, Stage 4, Stage 7, Stage 10. Audits new screens against the existing design system and Tailwind tokens to prevent visual drift.
- **self-check** — After any significant change. Claude reviews its own work before claiming a task done. Mandatory at Stage 11 gate.
- **app-backend-builder** — Stage 6. Reads existing screens, infers domain, generates Convex schema + queries/mutations/actions plan.
- **sentry-setup** — Stage 14. Add Sentry crash reporting from scratch. Wraps Sentry's wizard with kit-aware patterns.

> The Next.js kit ships fewer per-repo skills than the RN kit. RN-specific skills (`expo-publish`, `app-store-approval`, `screen-wiring`, `analytics-posthog`) are intentionally not here:
> - Vercel deploy is one-click via Vercel plugin (user-scope), no skill needed
> - App Store doesn't apply to web
> - Screen-wiring's job is folded into Stage 11 self-check audit
> - Web analytics is one-click Vercel + optional PostHog, simple enough that prompts cover it directly

---

## User-scope vendor skills (~/.claude/skills/)

Installed once per Mac via vendor marketplaces. Auto-load based on relevance. Knowing they exist lets you reach for them deliberately.

### Clerk (19 — most relevant for Next.js)

`clerk`, `clerk-setup`, `clerk-nextjs-patterns`, `clerk-react-patterns`, `clerk-backend-api`, `clerk-billing`, `clerk-orgs`, `clerk-webhooks`, `clerk-testing`, `clerk-custom-ui`, `clerk-android`, `clerk-swift`, `clerk-astro-patterns`, `clerk-chrome-extension-patterns`, `clerk-nuxt-patterns`, `clerk-react-router-patterns`, `clerk-tanstack-patterns`, `clerk-vue-patterns`, `clerk-expo-patterns`.

Highest-relevance for this kit:
- **clerk-setup** — Stage 5 if AUTH = Clerk
- **clerk-nextjs-patterns** — Stage 5/6/7, middleware, Server Actions, caching with Clerk
- **clerk-billing** — Stage 8 if BILLING = Clerk Billing
- **clerk-webhooks** — Stage 8 if BILLING = Clerk Billing with custom webhook handling

### Convex (6)

- **convex-quickstart** — Stage 1 / Stage 6
- **convex-setup-auth** — Stage 5 if AUTH = Convex Auth (pair with this kit's `convex-auth-setup.md`)
- **convex-create-component** — for reusable Convex components when relevant
- **convex-performance-audit** — Stage 11 self-check assist
- **convex-migration-helper** — schema migration patterns post-launch
- **convex** — general Convex routing skill

### Next.js (3)

- **next-best-practices** — Stage 3, Stage 6, Stage 7. App Router, Server Components, data patterns, async APIs, metadata, error handling.
- **next-cache-components** — Stage 6+. Next 16 Cache Components, PPR, `use cache`, `cacheLife`, `cacheTag`.
- **next-upgrade** — when upgrading Next.js versions.

### Vercel (7)

- **deploy-to-vercel** — Stage 12
- **vercel-cli-with-tokens** — token-based deploys (CI)
- **vercel-composition-patterns** — multi-app composition
- **vercel-react-best-practices** — performance optimization
- **vercel-react-view-transitions** — view transition API
- **web-design-guidelines** — UI review against Vercel's Web Interface Guidelines

### Expo (13)

Not relevant for web — these are RN-specific. Listed for awareness only. Skip.

---

## MCP servers

### Mandatory at Stage 1 of every repo

- **nanobanana** — image generation via Gemini API. Used at Stage 10 for OG images and any in-app illustrations. Install verification is step 3a of `START_NEW.md`. If `claude mcp list` doesn't show it as `✓ Connected`, stop and reinstall.

### Used during Next.js builds

- **vercel** (plugin) — deploy + env management. Slash commands: `/deploy`, `/env`, `/status`, `/bootstrap`. Auto-activates on Vercel/Next.js project detection. Use at Stage 12.
- **clerk** — Clerk docs MCP for SDK snippet lookup. Use at Stage 5 if AUTH = Clerk.
- **convex** — Convex DB introspection. Stage 5/6/7 — inspect schema, query state, debug auth wiring. Multi-project mode (auto-routes to whichever Convex project the current repo is linked to).

### Optional per-stack

- **stripe** — Stripe MCP for product/customer/subscription introspection. Install when Stage 8 with BILLING = Stripe is active.
- **sentry** — Sentry MCP for searching issues, querying events. Install when Stage 14 is active.
- **revenuecat** — N/A for web (RN-only). Ignore.

### Not used by Claude Code in this kit

Google Drive, Notion, Gmail, Calendar are claude.ai consumer connectors. Ignore them in build sessions.

---

## Updating this inventory

- **Per-repo kit skills:** edit them in the kit repo at `.claude/skills/` and push. Each app picks them up on the next `npx degit s-411/nextjs-kit --force`.
- **User-scope vendor skills or new MCPs:** append to the relevant section here, then bump the kit version in `README.md`.

Agents trust this list — keep it accurate.
