# App Patterns Reference (Next.js / Convex)

Common B2B SaaS and web app archetypes and their standard MVP schemas. Use this to infer what needs to be built based on what the app is about.

---

## CRUD / Project Management
*(task managers, project trackers, simple CRMs, asset trackers)*

**Core loop:** User creates / updates / completes records, views lists and detail views, organizes via projects or tags.

**Standard pages:**
- `/dashboard` — overview of recent / active items
- `/[entity]` — list view of all items, filterable
- `/[entity]/[id]` — detail view + edit
- `/[entity]/new` — creation form (or modal)
- `/settings` — profile, preferences

**Schema (Convex):**
- `users` — from `authTables`, plus `displayName`, `avatarUrl`
- `[entities]` — main domain object: `userId`, `title`, `description`, `status`, `createdAt`, `updatedAt`
- `[entity]_tags` (optional) — many-to-many for tagging
- Indexes: `by_user`, `by_user_and_status`

**Auth pattern:** every query filters by `userId = getAuthUserId(ctx)`. Public sharing (if applicable) uses a separate `share_links` table with token-based access.

---

## Subscription SaaS Dashboard
*(analytics tools, monitoring, reporting dashboards, subscription management UIs)*

**Core loop:** User views data, configures alerts/filters, exports reports, manages subscription.

**Standard pages:**
- `/dashboard` — main metrics overview
- `/[metric-domain]` — drill-down views
- `/settings/billing` — current plan, upgrade, customer portal link
- `/settings/team` — invite/remove team members (if multi-user)
- `/pricing` — plans + checkout
- `/api-keys` — for apps that expose an API

**Schema:**
- `users`
- `subscriptions` — userId, stripeCustomerId, plan, status, currentPeriodEnd
- `[metrics]` — domain data, indexed for fast aggregation
- `apiKeys` (if applicable) — userId, hash, label, lastUsedAt

**Billing pattern:** Stripe webhook syncs `subscriptions` table on every lifecycle event. Premium features check `subscription.plan` server-side on every gated query/mutation.

---

## Multi-tenant B2B SaaS (with orgs)
*(team collaboration tools, B2B SaaS where customer = organization not individual)*

**Core loop:** User belongs to one or more orgs, switches between them, work is scoped to current org.

**Standard pages:**
- `/[orgSlug]/dashboard`
- `/[orgSlug]/members` — invite/remove team members, role management
- `/[orgSlug]/settings` — org-level settings, billing
- `/orgs/new` — create org
- `/orgs/select` — switch active org

**Schema:**
- `users`
- `orgs` — id, slug, name, ownerId, createdAt
- `orgMembers` — orgId, userId, role (owner / admin / member)
- All domain tables include `orgId` instead of (or in addition to) `userId`

**Auth pattern:** queries filter by `orgId = currentOrgId(ctx)` where currentOrgId comes from middleware-set context or user's active-org preference. Always verify the user is a member of that org before returning data.

> **Note:** if Auth = Clerk, Clerk's `<OrganizationSwitcher />` and Organizations feature handle a lot of this. Use the `clerk-orgs` skill (user scope).

---

## Content / Publishing Platform
*(blogs, newsletters, course platforms, knowledge bases)*

**Core loop:** Authors create content, readers consume content, optional comments/likes/subscriptions.

**Standard pages:**
- `/` — public landing / latest content
- `/[slug]` — content detail page (public or gated)
- `/admin/posts` — author dashboard
- `/admin/posts/new` — content editor
- `/admin/analytics` — view counts, engagement

**Schema:**
- `users` (with role: reader / author / admin)
- `posts` — authorId, title, slug, body, publishedAt, status
- `subscribers` (if newsletter) — email, plan, verified
- `views` (optional, for analytics) — postId, userId or anonymousId, timestamp

**SEO pattern:** every public route has `generateMetadata()` for title/description/OG image. Sitemap dynamically generated from published posts.

---

## Marketplace / Two-sided platform
*(freelancer platforms, listing sites, booking platforms)*

**Core loop:** Sellers list things, buyers browse + book + pay, both have profiles.

**Standard pages:**
- `/` — browse / search
- `/listings/[id]` — listing detail
- `/sellers/[id]` — seller profile
- `/dashboard/buyer` — buyer's bookings/orders
- `/dashboard/seller` — seller's listings/sales
- `/dashboard/seller/listings/new` — create listing

**Schema:**
- `users` (with userType: buyer / seller / both)
- `listings` — sellerId, title, description, price, status
- `bookings` — buyerId, listingId, status, paidAt, stripePaymentIntent

**Billing:** Stripe Connect for marketplace payments (sellers receive payouts, platform takes a cut). Significantly more complex than basic Stripe — deserves a ref-doc.

---

## Internal tool / dashboard
*(admin panels, ops tools, customer-facing portals)*

**Core loop:** Authorized users view/edit data, run actions.

**Standard pages:**
- `/` — landing or redirect to dashboard
- `/dashboard` — KPI overview
- `/[entity]` — manage entity X
- `/audit-log` (if applicable)

**Schema:** thin — often the data already lives elsewhere (the dashboard reads/writes via API actions). Convex schema may just be `users`, `audit_logs`, and minor app-state tables.

**Auth:** typically restricted to a list of authorized emails. Convex Auth or Clerk both work; Clerk is more polished for public-facing internal tools.

---

## Form / data collection app
*(surveys, intake forms, application portals)*

**Core loop:** User fills a multi-step form, admin reviews submissions.

**Standard pages:**
- `/` — landing + start form CTA
- `/form/[stepId]` — multi-step form (or single-page with sections)
- `/admin/submissions` — admin review
- `/admin/submissions/[id]` — submission detail

**Schema:**
- `users` (or anonymous `submissions` with email field if no auth required)
- `submissions` — formId, userId or email, fields (object), status, submittedAt
- `forms` — id, name, schema (jsonb-like field with form definition)

---

## Habit / Streak / Daily Tracking
*(personal trackers, wellness logs, productivity dashboards, anything where the user logs a daily action and watches a streak grow)*

**Core loop:** User logs an entry per day (or per session), the app shows progress over time — streak counter, calendar heatmap, trend chart.

**Standard pages:**
- `/dashboard` — today's status: did the user log today? streak counter, "log now" CTA
- `/log` — the entry form (date, value, optional notes) — keep frictionless, default date = today
- `/history` — calendar heatmap or chart, filterable by date range
- `/milestones` — badges / achievements for streak thresholds (7-day, 30-day, etc.)
- `/settings` — daily reminder time, goal targets, notification preferences

**Schema:**
- `users` (with custom fields for `goalValue`, `reminderTime`, `timezone`)
- `entries` — userId, date (YYYY-MM-DD string for easy day-keying), value (number or object), notes, createdAt. Indexed: `by_user_and_date`.
- `streaks` (denormalized, optional) — userId, currentStreak, longestStreak, lastEntryDate. Updated by mutation on each `entries.add`.
- `milestones` — userId, type (e.g. `streak_7`, `streak_30`), unlockedAt. Indexed: `by_user`.

**Key patterns:**
- **Day-keying by date string, not timestamp** — `entries.date = "2026-05-04"`. Avoids timezone bugs (an entry at 11pm in Tokyo and 8am in NY shouldn't both count for the same calendar day on the streak).
- **Streak calculation as a Convex query** — recompute from entries each time, OR maintain a denormalized `streaks` row (faster but needs careful mutation logic). For MVP, recompute.
- **Streak rules** — does missing one day reset, or is there a grace period? Define this in `CLAUDE.md` per-app.
- **Reminder notifications** — web push notifications via Vercel cron + Resend or Web Push API. Defer to LATER.md unless explicitly in scope.

**Variants:**
- **Multi-metric tracking** — user logs 3-5 metrics per day. Schema: `entries.values` is an object keyed by metric.
- **Quantified daily target** — user has a daily target (e.g. 10K steps, 2L water). Streak counts days when target was met.
- **Pure streak (binary)** — did you do the thing today, yes or no. Simplest schema.

---

## Analytics / KPI Dashboard
*(metrics dashboards for a business, performance trackers, anything where the primary view is "how am I doing on metric X over time")*

**Core loop:** User opens dashboard, sees current state of their KPIs, drills into trends, optionally configures alerts.

**Standard pages:**
- `/dashboard` — KPI tiles + headline trend charts
- `/metrics/[id]` — single-metric drill-down with longer time range, breakdowns
- `/segments` (optional) — slice metrics by user segment / cohort
- `/alerts` (optional) — configure threshold alerts on metrics
- `/settings/data-sources` — connect external sources (CSV upload, API integration)

**Schema:**
- `users`
- `metrics` — userId, name, type (counter / gauge / histogram), unit
- `metric_values` — metricId, value, recordedAt. Indexed: `by_metric_and_time`. **High write volume** — consider rollups for long time ranges.
- `alerts` (optional) — metricId, threshold, comparator, lastFiredAt

**Key patterns:**
- **Time-range queries with rollups** — querying every value over 90 days is wasteful. Pre-aggregate into hourly/daily rollups via scheduled Convex actions (cron jobs).
- **Charts via shadcn/ui charts** (recharts under the hood) — install via `npx shadcn add chart`. The kit's `KING_PROMPTS.md` stack menu's `Graphs needed: yes` triggers this.
- **CSV import for bootstrapping** — parse uploaded CSVs in a Convex action, batch-insert metric_values.

---

## Common feature patterns (bolt onto any archetype)

These are features that show up across many archetypes. They're not full archetypes themselves — call them out separately when planning the schema.

### Referral system (Convex-native, no third-party)

**When it applies:** the app wants to reward users for referring others — credit, free months, leaderboard.

**Schema additions:**
- `users.referralCode` — short unique string generated on user creation (e.g. 6-char base62). Index it.
- `users.referredBy` — `v.optional(v.id("users"))` — who referred this user
- `referrals` — referrerId, referredUserId, status (`pending` / `qualified` / `rewarded`), qualifiedAt, rewardAmount. Indexed: `by_referrer`, `by_referred_user` (unique).
- `rewards` (optional) — userId, source (`referral` / `signup_bonus` / `manual`), amount, type (`credit` / `subscription_days`), grantedAt, redeemedAt. Indexed: `by_user`.

**Pages:**
- `/refer` — show the user's referral link `<DOMAIN>/?ref=<code>`, list of pending + qualified referrals, total rewards earned
- `/?ref=<code>` — landing page reads the param, stores it in a cookie until signup completes

**Key flow:**
1. User A's `/refer` page shows their link with `?ref=<userA.referralCode>`.
2. User B clicks the link → landing page captures `ref` query param into a cookie (1-30 day TTL).
3. User B signs up → signup mutation reads the cookie, sets `users.referredBy = userA._id`, creates a `referrals` row with status `pending`.
4. User B completes the qualifying action (e.g. pays for first month, or reaches some app-specific threshold) → mutation updates the `referrals` row to `qualified`, creates a `rewards` row for User A.
5. User A's `/refer` page shows the new qualified referral and updated total.

**Critical correctness:**
- **Self-referral guard** — never let `referrerId === referredUserId`. Check in the signup mutation.
- **Idempotency** — qualifying mutation is idempotent (don't double-credit if it fires twice).
- **Cookie-based attribution wins on re-attempts** — if a user clicks ref-link A, then ref-link B, the LAST cookie wins. Document the policy in CLAUDE.md.
- **No client-side trust** — referral code resolution and reward granting both happen server-side in Convex mutations. Never accept "credit me with X reward" from the client.

**Reward delivery patterns** (pick per app):
- **Subscription days** — extend `subscriptions.currentPeriodEnd` directly. Stripe webhook still fires on renewal but with the extended date.
- **Credit balance** — track in `users.credits` (number). Apply at checkout time as a discount.
- **Free month coupon** — generate a Stripe promo code via Stripe API, deliver via email.

### Audit log (admin / compliance)

**When it applies:** apps with admin actions, finance/legal/healthcare data, anything needing a paper trail.

**Schema:**
- `audit_logs` — actorId, action (`user.deleted`, `subscription.cancelled`, etc.), targetType, targetId, metadata (object), createdAt. Indexed: `by_actor`, `by_target`, `by_time`.

**Pattern:** every sensitive mutation also writes an `audit_logs` row. View at `/admin/audit-log`.

### Webhook system (for the app's own users)

**When it applies:** B2B app where customers want to be notified when something happens in your app.

**Schema:**
- `webhook_endpoints` — userId, url, secret (for HMAC signing), events (array of strings), enabled
- `webhook_deliveries` — endpointId, event, payload, statusCode, deliveredAt, retryCount

**Pattern:** Convex action sends HMAC-signed POSTs on event triggers, retries with backoff on failure. Quite involved — usually justifies its own ref-doc.

---

## Picking the right archetype

When inferring from existing screens:
1. Look for a streak counter, calendar heatmap, or daily-log CTA → Habit / Streak archetype.
2. Look for KPI tiles + time-series charts as the primary view → Analytics / KPI Dashboard.
3. Look for a "/refer" page or referral link UI → bolt the Referral system pattern onto whichever base archetype fits.
4. Count entities — if 1 main entity, it's CRUD or content. If 2+, possibly marketplace or multi-tenant.
5. Count user types — single user type = CRUD/SaaS. Multiple types = marketplace.
6. Look for billing screens — if present, subscription SaaS or marketplace.
7. Look for org/team UI — if present, multi-tenant.
8. Look at the URL structure — `/[orgSlug]/...` is the giveaway for multi-tenant.

If unsure, ask the user before generating BUILD_PLAN.md.
