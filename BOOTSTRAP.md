# BOOTSTRAP.md — Per-Repo Setup Verification

> **For incoming agents: this is the FIRST file you check in any repo. Run every check below before doing any other work. If anything fails, STOP and tell the user what to fix — do not attempt to repair it yourself unless explicitly told to.**
>
> For Steve: run this checklist mentally (or have an agent run it) the first time you open any new or existing repo. ~5 minutes. Better to catch a missing skill now than to discover it mid-Stage 6.

---

## How to invoke

In a fresh Claude Code session in the repo:

```
Read BOOTSTRAP.md. Run every check in order. Report results as a
pass/fail table. Do not attempt fixes — just report. Stop after the
report.
```

---

## Section A — Drop-in kit files present

Every repo must contain these docs at the root:

- [ ] `BOOTSTRAP.md` (this file)
- [ ] `CLAUDE.md`
- [ ] `KIT_TOOLING.md`
- [ ] `KING_PROMPTS.md`
- [ ] `PROCESS_GUIDE.md`
- [ ] `PROMPTS.md`
- [ ] `LATER.md`
- [ ] `START_NEW.md`
- [ ] `REF_DOCS_INDEX.md`
- [ ] `convex-auth-setup.md`
- [ ] `convex-react-client.md`

Plus the legal templates:

- [ ] `legal/privacy.template.md`
- [ ] `legal/terms.template.md`

**Verify command:**
```bash
ls BOOTSTRAP.md CLAUDE.md KIT_TOOLING.md KING_PROMPTS.md PROCESS_GUIDE.md \
   PROMPTS.md LATER.md START_NEW.md REF_DOCS_INDEX.md \
   convex-auth-setup.md convex-react-client.md
ls legal/privacy.template.md legal/terms.template.md
```

If any are missing → refresh the kit from GitHub: `npx degit s-411/nextjs-kit --force` (run from the repo root).

> Note: technical reference docs that go deeper than what this kit covers (full Stripe webhook patterns, complex Convex query optimization, etc.) live in `~/Documents/GitHub/ref-docs/` at apps root. `REF_DOCS_INDEX.md` is the per-repo pointer that maps stages to ref-docs files.

---

## Section B — Custom kit skills present (per-repo)

The 5 custom kit skills live INSIDE each repo at `.claude/skills/`. They ship with the kit via `npx degit s-411/nextjs-kit --force`. Self-contained. Survives Mac transitions.

Verify:

```bash
ls .claude/skills/{design-consistency,self-check,app-backend-builder,sentry-setup}/SKILL.md
```

Should return paths with no "No such file" errors.

> The Next.js kit ships fewer per-repo skills than the RN kit — `expo-publish`, `app-store-approval`, `analytics-posthog`, and `screen-wiring` are RN-specific and don't apply here. Vercel deploy is handled by the Vercel plugin (user-scope MCP), App Store doesn't apply, web analytics is one-click Vercel + optional PostHog (no skill needed), and screen-wiring's job is folded into the Stage 11 self-check audit.

If skills are missing → refresh the kit: `npx degit s-411/nextjs-kit --force`.

---

## Section C — User-scope skills + MCPs (Mac-wide, not per-repo)

Vendor skills (Convex, Clerk, Vercel, Next.js, Expo) and MCP servers live at user scope. Read `KIT_TOOLING.md` for the full inventory.

Quick verify:

```bash
claude mcp list
```

Expected `✓ Connected` for the MCPs your stack needs:
- nanobanana — always
- convex — if Database = Convex
- clerk — if Auth = Clerk (this is the docs MCP)
- revenuecat — N/A for web (RN-only, ignore if listed)
- vercel — always (installed via plugin)

User-scope skills:
```bash
ls ~/.claude/skills/ | head
```

Should show clerk-*, convex-*, next-*, vercel-*, expo-skills directories.

If anything is missing → `CREDENTIALS.md` walkthrough wasn't completed on this Mac. Set it up now (~30 min one-time).

---

## Section D — Mac-level tools installed (one-time)

These should already be set up from the first time you ran a kit. If you're on a fresh Mac, install them now.

### D1 — Node + npm + Vercel CLI

```bash
node --version    # expect v20+ or v22+
npm --version
npx vercel --version
```

If `vercel` not found:
```bash
npm install -g vercel
npx vercel login
```

### D2 — Convex CLI (only if Database = Convex)

Convex CLI ships with the `convex` package — no global install needed. Verify by running `npx convex --version` from any Convex-linked repo.

### D3 — Git + GitHub Desktop

- Repo connected to GitHub
- `git status` returns clean (or you know what's uncommitted)

### D4 — Vercel project linked

```bash
ls .vercel/project.json 2>/dev/null && echo "OK — Vercel linked" || echo "NOT LINKED"
```

If not linked: `npx vercel link --yes`.

---

## Section E — Project-level setup

### E1 — Next.js project initialized

```bash
ls package.json
cat package.json | grep '"next"'
```

If `package.json` doesn't exist or doesn't contain `next` → run `START_NEW.md` from scratch. Don't try to bolt the kit onto an empty directory.

### E2 — Tailwind v4 wired

```bash
ls app/globals.css 2>/dev/null || ls src/app/globals.css 2>/dev/null
grep -l "@import \"tailwindcss\"" app/globals.css src/app/globals.css 2>/dev/null
```

Should find `globals.css` with `@import "tailwindcss";` at the top.

### E3 — `@theme` block (Stage 4+ only)

If current stage in CLAUDE.md is ≥ 4, verify the @theme block exists:
```bash
grep "@theme" app/globals.css src/app/globals.css 2>/dev/null
```

Stage 4 sets this up. Earlier stages don't have it yet — that's correct.

### E4 — Convex initialized (only if Database = Convex)

```bash
ls convex/_generated/api.d.ts 2>/dev/null && echo "OK" || echo "Run: npx convex dev"
ls convex/schema.ts 2>/dev/null && echo "schema present" || echo "schema not yet defined (OK pre-Stage-6)"
```

### E5 — `.env.local` populated for current stage

Check that env vars referenced in the code actually exist:
```bash
test -f .env.local && echo "OK — .env.local exists" || echo "MISSING .env.local"
```

Required by stage:
- Stage 1+: `NEXT_PUBLIC_CONVEX_URL` (if Convex)
- Stage 5+: Auth keys (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY` for Clerk; nothing extra for Convex Auth)
- Stage 8+: Billing keys (`STRIPE_SECRET_KEY` etc.)
- Stage 9+: `RESEND_API_KEY` (if Resend)
- Stage 13+: `NEXT_PUBLIC_POSTHOG_KEY` (if PostHog)
- Stage 14+: `SENTRY_AUTH_TOKEN` (build-time only, often in CI not .env.local)

### E6 — `CLAUDE.md` header filled

Open `CLAUDE.md` and confirm the top section has real values, not placeholders:
- Name (not `<APP NAME>`)
- Purpose (not `<ONE SENTENCE…>`)
- Slug
- Domain (real or `tbd`)
- Auth, Database, Billing, Email, Analytics, Sentry — all answered
- Current stage
- Status

---

## Section F — Sanity boot test

```bash
npm run dev
```

Expected: dev server starts at http://localhost:3000 with no errors. Open the URL in browser, app loads (or shows the default Next.js template if it's a fresh repo at Stage 2).

If this fails, **do not proceed past Stage 2.** Common fixes:
- `rm -rf node_modules && npm install`
- Check `.env.local` for missing env vars
- Check Convex deployment is live (`npx convex dev` in another terminal)

---

## Output format

When an agent runs this checklist, expected output:

```
BOOTSTRAP CHECK — <slug> — <date>

Section A — Kit files:         13/13 ✅
Section B — Custom skills:     4/4 ✅
Section C — User-scope:        ✅
Section D — Mac tools:         ✅
Section E — Project setup:     5/6 ❌  (E5 — RESEND_API_KEY missing)
Section F — Boot test:         ✅

BLOCKERS (must fix before next stage):
  - Add RESEND_API_KEY to .env.local (needed for Stage 9 work)

NON-BLOCKERS (note for later):
  - None
```

If the report shows blockers, fix them and re-run BOOTSTRAP. Only proceed once everything is ✅.

---

## When to re-run this checklist

- **Always:** when starting work on a repo for the first time
- **Always:** after refreshing the kit (`npx degit s-411/nextjs-kit --force`)
- **Always:** before Stage 12 (Domain wiring) — catches env var gaps that break production
- **Sometimes:** if an agent reports "skill not found" or "command not found" — re-run BOOTSTRAP before debugging
