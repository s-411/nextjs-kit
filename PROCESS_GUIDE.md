# PROCESS_GUIDE.md — Next.js Kit Pipeline, Stages 0–15

> **Purpose:** one linear path you run for every Next.js app. Find your stage. Do only that stage. Move on. Designed to be run repeatedly without surprises.
>
> **Golden rules**
> 1. Read context first → plan mode → phased builds → self-check → next phase
> 2. Anything out of scope → `LATER.md`, never the current build
> 3. One agent per repo. 3–4 repos in parallel max. Never two agents in one repo.
> 4. Every stage has a skip condition. Read it before starting.
> 5. Companion files: `PROMPTS.md` (copy-paste prompts), `KING_PROMPTS.md` (kickoff stack-menu prompts), `CLAUDE.md` (per-repo orientation), `KIT_TOOLING.md` (skills + MCPs reference)

---

## Status legend

`✅ done` / `🔄 in progress` / `⏭ skipped (not applicable)` / `❌ blocked`

---

# Stage 0 — Stack Lock (one-time per app, ~10 min)

**Do this once, in a single sitting, before opening any repo.**

The Next.js kit has no fixed Stack Profile (unlike the RN kit's Local/Convex split). Every Next.js app declares its stack at Stage 0 via the king prompt, which has a stack menu you tick before pasting.

The stack menu in `KING_PROMPTS.md` lists every commonly-used integration:

- **Auth** — Clerk (prebuilt components default) OR Convex Auth
- **Database** — Convex (default; only deviation = static-only sites)
- **Billing** — Stripe OR Clerk Billing OR none
- **Email** — Resend OR none (Clerk handles its own auth emails)
- **Graphs** — shadcn/ui charts (only when needed)
- **Analytics** — Vercel Analytics (always) + PostHog (opt-in)
- **Error tracking** — Sentry (default for any app reaching production)

You tick what applies, delete the menu before pasting the prompt to the agent. The decisions made here drive every downstream stage skip/include.

**Locked at Stage 0:**
- Repo name + working slug
- Working domain (e.g. `app-slug.com` or planned subdomain)
- Auth provider
- Billing provider (or "none — free app")
- Email provider (or "none")

**Deferred to later stages:**
- Custom domain DNS (Stage 12)
- Production env vars in Vercel (Stage 5+ as needed)
- Final brand name (can change up to Stage 10)

**Out:** stack menu filled in, ready to spin up the repo at Stage 1.

> **Naming note:** working slug is fine for the GitHub repo. Renaming a Vercel project is one click; renaming a domain is a DNS update. Don't burn time perfecting names at Stage 0.

---

# Stage 1 — Repo Spin-up (~10 min/app)

> **Before doing anything else in this stage, run `BOOTSTRAP.md` to verify the repo is set up correctly.** If anything fails, fix it before proceeding to Stage 2. Re-run BOOTSTRAP at the end of this stage to confirm the green light.

### NEW app:

1. GitHub Desktop → New Repo → name = slug from Stage 0
2. Open in Cursor / VS Code
3. Use the `START_NEW.md` prompt — it handles `create-next-app` + kit pull (`npx degit s-411/nextjs-kit --force`) + Tailwind v4 + Convex install + auth provider scaffold + Vercel link in one go
4. Run `npm run dev` → confirm app boots at `localhost:3000`

### EXISTING app:

1. Open repo in Cursor
2. Refresh the kit: `npx degit s-411/nextjs-kit --force` (overwrites kit docs and `.claude/skills/`, leaves your code alone)
3. Open `CLAUDE.md`, fill in the header (Name, Purpose, Slug, Domain, Stack choices, current Stage)
4. Run `npm run dev` → confirm boots

**Out:** repo runs `npm run dev` clean, opens in browser, no console errors. `CLAUDE.md` filled. Vercel project linked. No `theme` extraction yet — that's Stage 4.

---

# Stage 2 — Reference Ingestion (~15–30 min/app)

**Skip if:** you're building a UI without visual references (rare — even a brief description usually generates a reference HTML/screenshot first).

This stage prepares the materials the agent will build from. Three input buckets, all relative to repo root:

- `app-references/images/` — screenshots of pages you want built
- `app-references/html/` — raw HTML drops from a design tool (Stitch, Claude Design, hand-coded)
- `app-references/code/` — raw React/Next code snippets you've already written or copied

### Process:

1. Drop your references into the appropriate folders
2. Paste prompt from `PROMPTS.md` Stage 2 — agent walks the buckets, surfaces what it sees, asks any clarifying questions, and pauses
3. You confirm the agent's read is accurate before any code gets written

**Out:** `app-references/` populated, agent has acknowledged the inputs and waits at the gate before Stage 3.

---

# Stage 3 — First Screens (1–4 anchor screens, ~60–120 min/app)

**Skip if:** EXISTING app already has working pages.

Build the first 3-4 anchor screens. These are the screens that establish the app's visual language: typically the landing/marketing page, the auth screens (or auth shell), the empty dashboard, and one core app screen.

### Constraints:

- Pixel-perfect from references in `app-references/`
- Raw Tailwind utility classes are fine at this stage — tokenization happens at Stage 4
- Use shadcn/ui primitives only when needed (graphs, complex form controls). Otherwise straight Tailwind + Next/React components.
- Mobile-responsive baseline — agent should ship working mobile + desktop, not desktop-only
- No real auth yet (Stage 5), no real backend yet (Stage 6) — use mock data freely
- After 4 screens are built, this stage is done. Do NOT keep going into screen 5+ here.

**Soft warning trigger:** when the agent's screen-build count crosses 5 (which would require running this stage past its scope OR skipping into Stage 7 prematurely), it surfaces a one-shot warning that tokenization at Stage 4 is recommended next.

**Skill:** `design-consistency` runs as a final check before declaring Stage 3 done.

**Out:** 1-4 screens working in `npm run dev`, design-consistency skill green, ready for tokenization at Stage 4.

---

# Stage 4 — Tokenization (HARD GATE, ~30–60 min/app)

**Skip if:** EXISTING app already has full Tailwind v4 `@theme` token coverage and you've verified by reading `globals.css` (or wherever `@theme` lives).

This is the structural spine of the kit. Without this stage, the app's design system rots as it grows.

### Process:

1. Agent reads every screen built in Stage 3
2. Extracts every color, font, font-size, font-weight, line-height, border radius, spacing, shadow, breakpoint into Tailwind v4 `@theme` inline tokens
3. Refactors all Stage 3 screens to consume tokens — no raw hex, no raw `rem` values, no inline custom values
4. Confirms by re-running each screen — visually byte-identical, just refactored

### The hard gate:

- After Stage 4 is signed off, all subsequent screen building consumes tokens
- The agent **refuses to build screen 11+** (counted globally across Stages 3 and 7) until Stage 4 is complete
- Override pattern: user explicitly says "override the hard gate" or equivalent. Agent then proceeds and surfaces a one-line caveat in the response.

**Skill:** `design-consistency` runs both before (to map what tokens are needed) and after (to verify zero raw values remain).

**Out:** `globals.css` (or equivalent) has the full `@theme` block. Every Stage 3 screen has been refactored. Ready to bulk-build the rest of the app at Stage 7 — but first, auth (Stage 5) and backend (Stage 6) so Stage 7 builds against real data.

---

# Stage 5 — Auth Wiring (~30–90 min/app)

**Skip if:** auth provider was set to "none" at Stage 0 (rare — only for static sites).

Wire the chosen auth provider end-to-end. Reference docs are in this kit.

### If Clerk:

1. Default to Clerk's prebuilt components: `<SignIn />`, `<SignUp />`, `<UserButton />` (the floating profile image)
2. Wire `<ClerkProvider>` at the root layout
3. Use `clerk-nextjs-patterns` skill (user-scope) for middleware setup, route protection, server actions
4. Test signup → email verification → login → logout → password reset

### If Convex Auth:

1. Read `convex-auth-setup.md` in this kit fully
2. Install `@convex-dev/auth`, run `npx @convex-dev/auth` scaffolder
3. Configure providers (Password is most common for web; add OAuth providers if app needs them)
4. **If Resend was chosen at Stage 0:** wire Resend for password reset emails — Convex Auth requires this for the Password provider
5. Test signup → email verification → login → logout → password reset

**Skill:** `app-backend-builder` (audits the wiring); `clerk-nextjs-patterns` (user-scope, Clerk-only)

**Out:** auth flows green end-to-end. User can sign up, verify, log in, log out. Profile/account UI present. Ready for backend data wiring at Stage 6.

---

# Stage 6 — Backend + Data (~90 min – 4 hrs/app)

**Skip if:** EXISTING app has full Convex schema + queries already wired and tested.

Wire the actual app domain logic. Convex is the default. Schema, queries, mutations, actions.

### Process:

1. **Open a fresh Claude Code session** (clean context)
2. Paste prompt from `PROMPTS.md` Stage 6
3. Agent reads `CLAUDE.md`, plans the schema based on what Stage 3 screens need, enters plan mode
4. Executes phase by phase: schema → queries → mutations → actions → wire to existing UI
5. Replaces all mock data in Stage 3 screens with live Convex queries
6. Self-check after every phase

### References:

- `convex-react-client.md` (in this kit) — query/mutation/action patterns
- `convex-auth-setup.md` (in this kit) — auth-scoped queries, `getAuthUserId(ctx)` patterns
- `convex-quickstart`, `convex-setup-auth` (user-scope skills) for deeper patterns

**Skill:** `app-backend-builder` (drives the plan); `self-check` (between phases)

**Out:** All Stage 3 screens read live data from Convex. Auth-scoped queries work — user A can't see user B's data. Schema documented in `CLAUDE.md` or alongside.

---

# Stage 7 — Bulk App Build (~3–8 hrs/app, mostly agent time)

**Skip if:** the app's screen count is low (3-5 total) and Stage 3 already covered everything. Most apps don't skip this.

This is where the bulk of screens get built — dashboards, settings, list views, detail views, modals, forms. Iterating from references in `app-references/`.

### Process:

1. Paste prompt from `PROMPTS.md` Stage 7 with the next batch of references attached or staged
2. Agent builds screens iteratively, one at a time
3. Each screen consumes tokens from Stage 4 — no raw values
4. Each screen wires to live Convex data from Stage 6 (or new schema additions if needed)
5. Self-check after every 2-3 screens

### Hard gate enforcement:

- Stage 4 must be complete (signed off) before Stage 7 work begins
- Hard refusal at screen 11+ is a redundant safety — Stage 4 sign-off is the real gate
- If user genuinely needs to defer tokenization (rare), explicit override invocation required

### Skip conditions per screen-type:

- Billing screens — only if billing was selected at Stage 0
- Email-triggered flows — only if Resend was selected at Stage 0
- Admin/dashboard analytics — only if app has admin users

**Skill:** `design-consistency` (run periodically across batches); `self-check` (between phases)

**Out:** all app screens built, tokenized, wired to real data and real auth. App is feature-complete on Vercel preview URL.

---

# Stage 8 — Billing (~60–180 min/app)

**Skip if:** Stage 0 stack lock has billing = "none". Mark `⏭ skipped (not applicable)`.

### If Stripe:

1. Stripe products + prices configured in Stripe Dashboard (test mode)
2. Convex actions for checkout session creation
3. Webhook handler in Convex `http.ts` for subscription lifecycle events
4. Paywall component gating premium features
5. Customer portal link for self-serve subscription management
6. Test full payment flow in test mode: free → checkout → webhook → premium unlocked → cancel → downgrade

### If Clerk Billing:

1. Configure plans in Clerk Dashboard
2. Use Clerk's `<PricingTable />` and in-app checkout drawer
3. Gate features with `has({ plan: 'premium' })` checks
4. Test signup → upgrade → premium feature access → downgrade

**Skill:** `clerk-billing` (user-scope, Clerk Billing only); `self-check` (after payment flow test)

**Out:** test-mode payment flow works end-to-end. Production Stripe keys swap happens at Stage 12 (domain wiring) or later.

---

# Stage 9 — Email (~30–90 min/app)

**Skip if:** Stage 0 stack lock has email = "none" AND auth = "Clerk" (Clerk handles its own auth emails). Mark `⏭`.

Resend setup for transactional emails. Templates and triggers depend on app:

- Welcome email on signup
- Receipt on successful payment
- Password reset (if Convex Auth with Password provider)
- Any product-specific drip / notification emails

Resend is invoked from Convex actions. Domain verification in Resend dashboard happens in parallel — use the Resend test sender until your real domain is wired (Stage 12).

**Skill:** none specific (Resend's own docs are sufficient)

**Out:** transactional emails fire from app actions, deliver to inbox (test sender or verified domain).

---

# Stage 10 — Legal + Landing Page (~60–120 min/app)

**Skip if:** EXISTING app already has Privacy/Terms pages and a marketing landing page.

Two parts, both live on the app's actual domain (no `applanding.co` for web — landing IS the app's homepage or `/marketing`).

### Stage 10a — Legal pages

1. Use `legal/privacy.template.md` and `legal/terms.template.md` from this kit
2. Fill `{{APP_NAME}}`, `{{CONTACT_EMAIL}}`, `{{LAST_UPDATED}}`, `{{DOMAIN}}` placeholders
3. Render at `/privacy` and `/terms` routes (App Router pages)
4. Wire footer links across the app

### Stage 10b — Marketing landing page

1. Build the homepage (or `/marketing` if homepage is the app dashboard)
2. Hero + value prop + features + pricing (if billing applies) + signup CTA + footer
3. Tokenized — consumes the same `@theme` as the app
4. Mobile-responsive
5. SEO baseline: `<title>`, `<meta description>`, OG image (generate via nanobanana MCP), `robots.txt`, `sitemap.xml`

**Skill:** `design-consistency` (landing should match app's visual language)

**Out:** `/privacy`, `/terms`, and homepage all live and consistent. SEO baseline metadata in place.

---

# Stage 11 — Self-Check Gate (~30–60 min/app)

**Never skipped.** This is the pre-launch gate.

Invoke `self-check` skill in audit mode. Agent verifies:

1. Every route reachable from at least one navigable path
2. Every CTA button has a working `href` or `onClick`
3. No console errors on any page in dev mode
4. Mobile responsive verified at standard breakpoints (`sm`, `md`, `lg`)
5. All env vars set in Vercel project settings (preview + production)
6. No `TODO` / `FIXME` markers in production code paths
7. Auth flow completes without console errors
8. Billing flow (if applicable) completes without console errors

Anything failing → back to the appropriate stage. Don't paper over.

**Skill:** `self-check`

**Out:** clean audit report. Ready for production domain.

---

# Stage 12 — Domain Wiring (~15–45 min/app)

**Skip if:** app is staying on Vercel preview/production URL only (rare — usually only for internal tools).

1. Add custom domain in Vercel project settings
2. Update DNS records at registrar (A or CNAME per Vercel's instructions)
3. Wait for SSL provisioning
4. Verify HTTPS works
5. Verify www → apex (or apex → www) redirect per preference
6. Smoke-test the production domain — landing loads, signup works, dashboard loads
7. Update any hardcoded localhost references (Stripe webhook URLs, Resend domain, env vars)
8. **If billing was wired in Stage 8 with test keys:** swap to production Stripe keys now, retest with a real card on production

**Skill:** none specific

**Out:** app live at production domain over HTTPS. All integrations point at production URLs.

---

# Stage 13 — Analytics (~15–30 min/app)

**Never skipped.**

### Vercel Analytics (always):

1. Enable in Vercel project settings (one click, free tier)
2. Install `@vercel/analytics` package
3. Add `<Analytics />` to root layout
4. Verify events firing in Vercel dashboard

### PostHog (only if ticked at Stage 0 OR adding now):

1. Install `posthog-js` and `posthog-node`
2. Wire client + server initialization
3. Configure key event taxonomy (signup, paywall view, paid conversion, key feature usage)
4. Verify events arriving in PostHog dashboard

**Skill:** none specific

**Out:** Vercel Analytics live. PostHog live if applicable.

---

# Stage 14 — Sentry (~30–60 min/app)

**Never skipped** for any app reaching production.

1. Install `@sentry/nextjs`
2. Run Sentry's setup wizard (`npx @sentry/wizard@latest -i nextjs`) — generates `sentry.client.config.ts`, `sentry.server.config.ts`, `sentry.edge.config.ts`
3. Configure source maps upload in CI (Vercel build hook)
4. Trigger a test error from a hidden route to verify capture
5. Verify the error appears in Sentry dashboard with correct source-mapped stack trace
6. Set up Slack/email alerts for new issues if applicable

**Skill:** `sentry-setup` (per-repo kit skill, ships in `.claude/skills/`)

**Out:** Sentry capturing errors with correct source maps. Alerts configured.

---

# Stage 15 — Final QA + Handoff (~60–120 min/app)

**Never skipped.** This is the launch gate.

End-to-end smoke test on the production URL, signed in as a real user account:

1. **Signup** — go to homepage, click signup, complete flow, land on dashboard
2. **Onboarding/first-run** (if applicable) — walk through, verify state persists
3. **Core feature** — exercise the main use case the app exists for
4. **Payment** (if applicable) — upgrade to paid, verify gated feature unlocks, verify receipt email arrives
5. **Logout → re-login** — verify session restores correctly
6. **Password reset** (if Convex Auth or applicable) — request reset, receive email, set new password, log in
7. **Mobile** — repeat key flows on a real phone, not browser dev tools

Everything green → app is launch-ready.

### Handoff materials:

- README updated with setup instructions if client-facing
- Env var inventory (what's set in Vercel, what the client would need to rotate)
- Domain ownership transferred if applicable
- Stripe / Clerk / Sentry account access if applicable

**Skill:** `self-check` (full final pass)

**Out:** app live at production domain. All flows green. Ready to send to client or announce to users.

---

# After Stage 15

The kit's job is done for this app. Maintenance, feature additions, and iteration happen outside the pipeline. If a major rebuild is needed, start a new repo and re-run from Stage 0.

---

## Stage skip matrix (quick reference)

| Stage | Skippable? | When |
|-------|-----------|------|
| 0 | Never | One-time per app |
| 1 | Never | One-time per app |
| 2 | Rarely | Only for spec-only builds with no visual references |
| 3 | If existing | EXISTING app with working pages |
| 4 | If existing | EXISTING app with full `@theme` coverage |
| 5 | If auth=none | Static sites only |
| 6 | If existing | EXISTING app with full Convex backend |
| 7 | If small app | Apps with ≤5 screens covered by Stage 3 |
| 8 | If billing=none | Free apps |
| 9 | If email=none AND auth=Clerk | Clerk handles auth emails alone |
| 10 | If existing | EXISTING legal + landing |
| 11 | Never | Pre-launch gate |
| 12 | Rarely | Internal tools only |
| 13 | Never | Vercel Analytics is one click |
| 14 | Never | Production needs error tracking |
| 15 | Never | Launch gate |
