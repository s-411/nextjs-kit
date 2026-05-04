---
name: app-backend-builder
description: Reads a Next.js app that has anchor screens (Stage 3) and auth (Stage 5) wired but no domain logic, and generates a comprehensive Convex schema and phased backend plan. Use this skill at Stage 6 to plan the schema, queries, mutations, and actions needed to make the app functional. Invoke whenever the user has screens but mock data, when the app needs its backend figured out, or when planning what data layer to build.
---

# App Backend Builder Skill (Next.js / Convex)

## Overview

This skill reads what exists, figures out what the app is actually *for*, and generates a Convex schema and phased plan for wiring up the data layer. Output is a `BUILD_PLAN.md` file the user can hand to a fresh Claude Code agent to execute.

The skill assumes Convex as the backend (the kit's default). If `Database = none` in `CLAUDE.md`, this skill doesn't apply.

---

## Step 1 — Read Everything That Exists

Scan the entire codebase. Document:

### Existing Screens
List every page found under `app/`. For each:
- Route (e.g. `/dashboard`, `/settings/profile`)
- What it appears to do (1 line)
- What data it displays (mock arrays, hardcoded strings, fetch calls?)
- What user actions it supports (forms, buttons, mutations needed)

### App Identity
From the screen content, copy, assets, and `CLAUDE.md`, extract:
- **App name** and purpose
- **Target user** (B2B, B2C, internal, who specifically?)
- **Core domain** — what does this app help people do?
- **Tone** — read from existing UI

### Stack
From `package.json` and `CLAUDE.md`:
- Auth provider (Clerk vs Convex Auth) — `getAuthUserId` patterns differ slightly
- Billing (Stripe / Clerk Billing / none) — affects whether a `subscriptions` or `users.plan` field is needed
- Email (Resend / none) — affects whether email-trigger actions are needed
- Other SDKs that imply features

### Existing Convex
- `convex/schema.ts` — what tables exist?
- `convex/*.ts` files — what queries/mutations/actions already exist?
- `convex/_generated/` — confirm Convex is initialized

---

## Step 2 — Infer the Domain Schema

Based on what the app is about and what the screens display, propose the schema. Use the reference file for common patterns:

→ Read `.claude/skills/app-backend-builder/references/app-patterns.md` for common B2B SaaS / B2C app archetypes and their standard schemas.

Then define for THIS app:

### Tables
For each entity:
- **Table name** (lowercase plural, e.g. `tasks`, `projects`, `invoices`)
- **Fields** with Convex types (`v.string()`, `v.number()`, `v.boolean()`, `v.id("users")`, etc.)
- **Indexes** — every query should hit an index. Most user-scoped tables need `by_user` (`["userId"]`).
- **Relationships** — which tables reference which

### Auth scoping
For each table, document who can read/write:
- `userId` foreign key, queries filter by `getAuthUserId(ctx)` → standard user-scoped pattern
- Public table → readable by anyone, mutations require auth
- Admin-only → check role in user record

### Billing-gated content (if BILLING is wired)
Identify which features should be gated behind a paid subscription. Document the gating pattern: server-side check on every query/mutation that accesses premium data.

---

## Step 3 — Plan Queries, Mutations, Actions

Walk through each existing screen. For each:

- **Queries** needed to render the screen (replace mock data)
- **Mutations** needed for user actions on the screen (form submits, button clicks)
- **Actions** needed for external API calls (Stripe checkout creation, Resend email send, third-party API calls)

Every query and mutation needs:
- Auth scoping (`getAuthUserId(ctx)`)
- Input validation (`v.object({...})`)
- A clear single responsibility — no "god queries" that fetch everything

---

## Step 4 — Generate BUILD_PLAN.md

Write the full plan to `BUILD_PLAN.md` in the repo root.

Use the template in `.claude/skills/app-backend-builder/references/build-plan-template.md`.

The plan must be:
- **Phased** — broken into phases a Claude agent can execute one at a time. Typically: schema → first table queries → first table mutations → wire to existing screen → next entity.
- **Specific** — each task names the exact file, function, and arg shape
- **Verifiable** — each phase ends with a verification step (e.g. "user A and user B in separate browsers — A's data not visible to B")
- **Scoped** — no premature optimization, no admin features unless explicitly needed at MVP

---

## Step 5 — Handoff Instructions

After writing `BUILD_PLAN.md`, output this message to the user:

```
BUILD_PLAN.md has been written to the repo root.

To execute it, start a fresh Claude Code session and use this prompt:

"Read CLAUDE.md and BUILD_PLAN.md. Read convex-react-client.md and 
convex-auth-setup.md in this kit before starting. Enter plan mode. 
Review the build plan — do you have any questions before we start? 
Once confirmed, begin Phase 1. After completing each phase, 
run the self-check skill to verify everything works before moving to the next phase."

Do not start building in this session — hand it to a fresh agent with full context.
```

---

## Notes

- If the app shares its Convex DB with an existing RN app, check the RN app's schema first — schemas should align where entities are shared (e.g. `users` table identical, `todos` table identical)
- For Clerk auth: use `await ctx.auth.getUserIdentity()` to get the Clerk user. Note that the user record in Convex may need to be created on first sign-in via a webhook or first-query mutation.
- For Convex Auth: `await getAuthUserId(ctx)` returns the Convex `users._id` directly.
- Don't over-design. Schema additions are cheap with Convex's `widen-migrate-narrow` pattern. Better to ship MVP and iterate than to architect for scale that may not happen.
