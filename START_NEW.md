# START_NEW — Brand New Next.js App Bootstrap

> **What this is:** a single prompt you paste into Claude Code to take an empty repo from zero to fully set up and ready for Stage 2 (Reference Ingestion). All in one go.
>
> **When to use:** every time you create a new Next.js app repo. Handles everything in `PROCESS_GUIDE.md` Stage 1 NEW path.
>
> **When NOT to use:** for an existing repo that already has code. For those, run `npx degit s-411/nextjs-kit --force` from the repo root, then run `BOOTSTRAP.md`.

---

## Pre-flight (do these first, takes 30 sec)

1. **Stack lock done?** If you haven't filled in the `KING_PROMPTS.md` Scenario A block yet, do that first. The Stage 0 stack decisions drive every step below.

2. **Drop-in kit is pulled from GitHub** — no zip to maintain. The kit lives at https://github.com/s-411/nextjs-kit and `npx degit` downloads the current state straight into the repo. Public repo, no auth needed.

3. **Pick a working slug** — whatever pops in your head. `client-dashboard`, `crm-thing`, `subscription-app`. **It does not have to be final.** Renaming the GitHub repo and Vercel project is one click each. Domain is wired at Stage 12.

4. **GitHub Desktop -> File -> New Repository:**
   - Name: working slug from above
   - Local path: wherever you keep repos
   - **IMPORTANT: Uncheck "Initialize this repository with a README"** — leave it completely empty. (If you forgot, the prompt handles it.)
   - Click Create Repository

5. **Open the new (empty) repo folder in Cursor / VS Code.**

6. **Open Claude Code in the integrated chat panel.**

---

## The Prompt

Fill in the required lines at the top from your Stage 0 stack lock. The OPTIONAL lines have safe defaults.

```
START NEW NEXT.JS APP

# REQUIRED — fill these from your Stage 0 stack lock:
WORKING_SLUG: <e.g. client-dashboard — does NOT have to be final>
PURPOSE: <one sentence about what the app does; can be vague>
WORKING_DOMAIN: <e.g. clientdashboard.com or 'tbd' — used in legal templates later>
AUTH: <Clerk | Convex Auth>
DATABASE: <Convex | none>
BILLING: <Stripe | Clerk Billing | none>
EMAIL: <Resend | none>
ANALYTICS: <Vercel Analytics only | Vercel + PostHog>
SENTRY: <yes | defer>

# OPTIONAL — these have safe defaults:
DISPLAY_NAME: <leave blank to default to title-cased WORKING_SLUG>

# DO NOT WORRY ABOUT FINAL NAMING. Slug is a placeholder. Domain can be 'tbd'.
# Final domain wires at Stage 12. Rename the GitHub repo and Vercel project freely.

Execute the following steps in order. After each step, briefly confirm what
happened. STOP and ask me if anything fails or seems off — do not improvise
fixes silently.

1. Print pwd. Confirm we are in the new empty repo (folder name should roughly
   match WORKING_SLUG). If we are somewhere weird, STOP.

2. Clear any GitHub Desktop starter files so create-next-app has a clean directory:
     rm -f README.md .gitignore LICENSE
   (these are safe to remove — Next will regenerate the right .gitignore)

3. Initialize the Next.js project (App Router, Tailwind v4, TypeScript):
     npx create-next-app@latest . --ts --tailwind --app --eslint --use-npm --import-alias "@/*" --yes
   This takes ~60 seconds. When done, confirm package.json, app/page.tsx, and
   tailwind config exist.

3a. Verify Nanobanana MCP is available. Used at Stage 10 for OG image generation
   and any in-app illustrations.
   First check if it's already connected (it's often registered system-wide in
   ~/.claude.json):
     claude mcp list | grep nanobanana
   If output shows ✓ Connected → skip the install, move to step 4. No restart
   needed.
   If NOT connected → install it. The API key is baked into ~/.claude.json from
   a prior install. Extract it:
     grep -o '"GEMINI_API_KEY": *"[^"]*"' ~/.claude.json | head -1
   Use that value to install:
     claude mcp add nanobanana uvx nanobanana-mcp-server@latest -e GEMINI_API_KEY=<the-key-value>
   Then verify: claude mcp list | grep nanobanana → ✓ Connected
   If the grep finds NO key in ~/.claude.json at all, STOP and tell me — do not
   improvise.
   If you had to install (not just verify): exit this Claude Code session and
   restart before continuing — the MCP only loads at session start.

4. Pull the drop-in kit from GitHub into the repo root:
     npx degit s-411/nextjs-kit --force
   This downloads the current state of the kit (no git history, no .git folder)
   and overwrites existing files in place. Re-run this same command any time
   to refresh to the latest kit state.
   Verify the kit files landed:
     ls BOOTSTRAP.md CLAUDE.md PROCESS_GUIDE.md PROMPTS.md KING_PROMPTS.md \
        START_NEW.md KIT_TOOLING.md LATER.md REF_DOCS_INDEX.md \
        convex-auth-setup.md convex-react-client.md
     ls legal/privacy.template.md legal/terms.template.md
     ls .claude/skills/ | head
   If degit fails with "could not find commit", confirm the repo exists at
   https://github.com/s-411/nextjs-kit and is public.

5. Install Convex if DATABASE = Convex:
     npm install convex
     npx convex dev --once --configure=new
   This creates the convex/ directory, links to a new Convex deployment, and
   writes the deployment URL to .env.local (NEXT_PUBLIC_CONVEX_URL).
   If DATABASE = none, skip this step.

6. Install the chosen auth provider's package(s):
   - If AUTH = Clerk:
       npm install @clerk/nextjs
   - If AUTH = Convex Auth:
       npm install @convex-dev/auth @auth/core@0.37.0
       npx @convex-dev/auth
     The npx scaffold creates convex/auth.ts, convex/http.ts,
     convex/auth.config.ts and patches schema.ts. Read convex-auth-setup.md
     for the full pattern.

   Do NOT wire the providers into the app yet. That happens at Stage 5. This
   step only installs packages so node_modules is ready.

7. Install other stack-lock packages (only if applicable):
   - If BILLING = Stripe:    npm install stripe
   - If EMAIL = Resend:      npm install resend
   - If SENTRY = yes:        defer to Stage 14 (uses Sentry's wizard, can't be
                             scripted cleanly here)
   - If ANALYTICS includes PostHog: defer to Stage 13
   Vercel Analytics is wired at Stage 13 — don't install yet.

8. Edit CLAUDE.md — fill in ONLY the header section. Set:
     - Name: DISPLAY_NAME (or title-cased WORKING_SLUG if blank)
     - Purpose: PURPOSE
     - Slug: WORKING_SLUG (working — final TBD)
     - Domain: WORKING_DOMAIN (or 'tbd' — set at Stage 12)
     - Auth: AUTH
     - Database: DATABASE
     - Billing: BILLING
     - Email: EMAIL
     - Analytics: ANALYTICS
     - Sentry: SENTRY
     - Current stage: 1
     - Status: NEW

9. Link Vercel:
     npx vercel link --yes
   Follow prompts to link to a new Vercel project under the user's account.
   Vercel project name should match WORKING_SLUG.
   Then push current state of env vars (Convex URL etc.):
     npx vercel env pull .env.local
   This is a no-op for a fresh project but documents the pattern.

10. Make the initial git commit:
      git add -A
      git commit -m "Initial Next.js + drop-in kit setup (working name)"

11. Run BOOTSTRAP.md verification. Read the file, work through Sections A and
    B (skill checks). Report results in the table format at the bottom.

12. Final handoff:
    - Tell me the exact terminal command to run the dev server: `npm run dev`.
    - Tell me what I should see at http://localhost:3000 (the default Next.js
      welcome page).
    - Remind me that the slug, domain, and project name are working values —
      they get finalized at Stage 12 (domain) and renaming is one click.
    - Confirm we are ready to begin Stage 2 (Reference Ingestion) once I have
      verified the boot test in browser.

Do NOT begin Stage 2 work in this session. Stop after step 12.
```

---

## After the prompt finishes

1. **Run the dev server command** Claude gave you (`npm run dev`).
2. **Open `http://localhost:3000`** in browser. Confirm the default Next.js welcome page loads.
3. **If it boots:** Stage 1 is done. Open `PROMPTS.md`, copy the Stage 2 prompt, paste into the same chat. Reference ingestion begins.
4. **If it does not boot:** tell Claude in the chat. Don't proceed to Stage 2 until boot works.

---

## Stuck?

| Problem | Fix |
|---------|-----|
| `create-next-app` fails | Directory wasn't empty. `ls -la` to see what's there, delete anything that isn't `.git`, retry. |
| `degit` fails | Confirm the kit repo at https://github.com/s-411/nextjs-kit is reachable in your browser. If you're offline or GitHub is down, the pull will fail — try again later. |
| `degit` command not found | You don't need to install it globally — `npx degit` ships with node. Confirm node is installed (`node -v`). |
| `npx convex dev` asks for login | Run `npx convex login` first, then retry. |
| `npx vercel link` fails | Run `npx vercel login` first, then retry. |
| CLAUDE.md edits look weird | Open it, manually fix the header. |
| Want to refresh kit in an existing repo mid-build | From the repo root: `npx degit s-411/nextjs-kit --force` — overwrites kit files, leaves your app code alone. |

---

## For EXISTING apps (repos that already have code)

Don't use this prompt — it's for fresh repos only. For existing apps, pull the current kit from the repo root:

```bash
npx degit s-411/nextjs-kit --force
```

Then open Claude Code and say:
```
This is <app name>, currently at Stage <N>, status EXISTING-<at-stage>.
Run BOOTSTRAP.md and report what's missing or misconfigured before we proceed.
```

Re-running `npx degit s-411/nextjs-kit --force` at any point refreshes the kit to latest without touching your app code.

---

## Renaming later (when you've decided the final name)

Renaming a Next.js app is straightforward — much easier than renaming an iOS app's bundle ID. When you lock the final name:

1. **GitHub Desktop:** Repository -> Repository Settings -> Rename
2. **Vercel:** Project Settings -> General -> Project Name
3. **`package.json`:** `name` field
4. **`CLAUDE.md`:** header lines
5. **Domain (Stage 12):** add new custom domain in Vercel, update DNS

The domain is the only thing that actually matters externally. Slug, repo name, Vercel project name are all internal handles you can swap freely.
