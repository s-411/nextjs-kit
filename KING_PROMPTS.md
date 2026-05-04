# King Prompts — paste at the start of every new sub-chat

Pick the scenario that matches, fill in the fields, **delete the stack menu appendix** before pasting, paste the filled block as your first message in a fresh sub-chat.

The stack menu lives below each scenario as a visual checklist — read it out loud while dictating, tick what you want, then strip it from the prompt before sending. It's there so you don't forget Sentry, Resend, etc. like you usually do.

---

## Scenario A — Brand New App

```
New app sub-chat. Before doing anything else, run the kickoff interview.

- App name / working slug:
- Purpose:
- Working domain:
- Auth: (Clerk | Convex Auth)
- Database: (Convex | none — static site only)
- Billing: (Stripe | Clerk Billing | none)
- Email: (Resend | none)
- Graphs needed: (yes — shadcn/ui | no)
- PostHog: (yes — wire at Stage 13 | no — Vercel Analytics only)
- Sentry: (yes — Stage 14 | defer to LATER.md)
- Current stage: 0
- Repo: brand new (use START_NEW.md)
- Notes:
```

Action implied: walk through `START_NEW.md` step by step. Nanobanana MCP install is mandatory.

### Stack menu (delete this section before pasting)

Read this menu while filling the prompt above. Tick mentally what's in scope, leave nothing accidentally off the list.

**Auth:**
- [ ] Clerk — prebuilt components default (`<SignIn />`, `<SignUp />`, `<UserButton />` floating top-right)
- [ ] Convex Auth — needs Resend if Password provider used

**Database:**
- [ ] Convex — default
- [ ] none — only for pure static sites (rare)

**Billing:**
- [ ] Stripe — granular control, webhooks, portal
- [ ] Clerk Billing — simple subscription, `<PricingTable />`, less flexible
- [ ] none — free app

**Email:**
- [ ] Resend — transactional emails, password reset for Convex Auth, welcome/receipt drips
- [ ] none — Clerk handles its own auth emails; only valid if you have no other email triggers

**UI:**
- [ ] Tailwind v4 — always
- [ ] shadcn/ui — only when graphs are needed (charts) or complex form controls. Plain Tailwind otherwise.

**Deploy:**
- [ ] Vercel — always

**Analytics:**
- [ ] Vercel Analytics — always (one click, free)
- [ ] PostHog — opt-in, for funnel/session replay/feature flags

**Error tracking:**
- [ ] Sentry — default for production

**Misc:**
- [ ] Nanobanana MCP — needed for OG images, in-app illustrations
- [ ] Custom domain — wired at Stage 12, not now

---

## Scenario B — Resuming a Paused App

```
New app sub-chat. Before doing anything else, run the kickoff interview.

- App name / working slug:
- Purpose:
- Working domain:
- Stack already locked (auth/db/billing/email/analytics/sentry):
- Current stage:
- Repo: existing, last worked on:
- Notes:
```

Action implied: run `BOOTSTRAP.md` first to verify kit state (especially if the gap since last work is more than a few days). Then resume from the stage listed above.

---

## Scenario C — Active Build (recent work, state is fresh)

```
New app sub-chat. Before doing anything else, run the kickoff interview.

- App name / working slug:
- Purpose:
- Stack already locked (auth/db/billing/email/analytics/sentry):
- Current stage:
- Repo: existing, worked on recently
- Notes:
```

Action implied: skip `BOOTSTRAP.md`, go straight to the next prompt for the current stage from `PROMPTS.md`.

---

## Field reference

- **Working slug** — lowercase-hyphenated, used for the GitHub repo and Vercel project. Renaming both is cheap, don't agonize.
- **Working domain** — the domain you intend to ship at, even if DNS isn't wired yet. Used in legal templates at Stage 10. Format like `app-slug.com` or `app.parentdomain.com`. If undecided, write `tbd` and pick by Stage 10.
- **Auth** — Clerk or Convex Auth. Default Clerk for B2B SaaS where signup polish matters. Convex Auth for apps that share a DB with an existing RN app (so RN + web use the same identity layer).
- **Current stage** — `0` through `15`. See `PROCESS_GUIDE.md`. Stage 0 is pre-code stack lock; Stage 1 is repo spinup.
- **Notes** — anything non-default: existing wiring already in (e.g. Sentry already there from a previous repo), brand colors locked already, client constraints, timeline pressure, or anything weird about the repo state.
