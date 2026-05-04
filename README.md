# nextjs-kit

**Version: v1**

Canonical source for the Next.js app factory drop-in kit. Ships as plain files — drop them into any app repo to align it with the master pipeline.

## Install into a new or existing app repo

From the repo root:

```
npx degit s-411/nextjs-kit --force
```

Downloads the current state as plain files. No git history, no submodule. `--force` overwrites existing files. Re-run any time to refresh.

## Stack

Default stack: **Next.js 16 App Router + Tailwind v4 + Convex + Vercel deploy**, with auth/billing/email decided per-app at Stage 0 via `KING_PROMPTS.md`'s stack menu.

Common combinations:

- B2B SaaS — Convex + Clerk + Stripe + Resend + Sentry + Vercel Analytics
- Subscription SaaS (simple) — Convex + Clerk + Clerk Billing + Sentry + Vercel Analytics
- Internal tool — Convex + Convex Auth + Resend + Sentry

shadcn/ui is opt-in (only when graphs or complex form primitives are needed).

## Pipeline

15 stages, defined in `PROCESS_GUIDE.md`:

```
0. Stack lock         8. Billing
1. Repo spin-up       9. Email
2. Reference ingest   10. Legal + landing
3. First screens      11. Self-check gate
4. Tokenization (HARD GATE)
                      12. Domain wiring
5. Auth wiring        13. Analytics
6. Backend + data     14. Sentry
7. Bulk app build     15. Final QA + handoff
```

## Kit conventions

* Bundle name = working slug; renaming is one click
* Terminal commands: always assume terminal is in repo root — never `cd <repo>`
* Nanobanana (Gemini) MCP: mandatory on every new repo (step 3a in `START_NEW.md`) for OG images
* All colors/fonts/spacing via Tailwind v4 `@theme` tokens — no inline arbitrary values after Stage 4
* Tokenization at Stage 4 is a hard gate (refuses screen 11+ until done)
* Stage 10 = legal pages + marketing landing (both on app's own domain — no applanding.co for web)
* Auth defaults to Clerk's prebuilt components when AUTH = Clerk
* Vercel Analytics always; PostHog opt-in
* Every stage prompt includes a `SKILLS:` line telling the agent which skills to invoke

## Maintaining this kit

The kit is edited in place at `~/Documents/GitHub/nextjs-kit/` — there is no separate staging directory. Don't use `~/Downloads` (gets wiped).

Workflow:

1. Edit files in place.
2. `git add -A`
3. `git commit -m "<change summary>"`
4. `git push`

Or use the `kitpush-next` shell function (one-time install — same pattern as the RN kit's `kitpush`):

```bash
cat >> ~/.zshrc <<'EOF'

# kitpush-next — commit and push any changes in the nextjs-kit repo from any cwd
kitpush-next() {
  (
    cd "$HOME/Documents/GitHub/nextjs-kit" || return 1
    git add -A
    if git diff --cached --quiet; then
      echo "kitpush-next: nothing to commit"
      return 0
    fi
    git commit -m "${*:-kit update}" && git push
  )
}
EOF
source ~/.zshrc
```

Rules:

* When adding a new doc, register it in `CLAUDE.md`'s "Source-of-truth files" table.
* When adding a new skill or MCP at user scope, append it to `KIT_TOOLING.md`.
* Bump the version line at the top of this README on every meaningful change.

## Related

* RN/Expo kit: [s-411/drop-in-kit](https://github.com/s-411/drop-in-kit) — Expo + Convex + Convex Auth + EAS variant for iOS apps.
