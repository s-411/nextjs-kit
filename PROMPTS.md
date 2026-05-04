# PROMPTS.md — Copy/Paste Library, Indexed by Stage

> Paired with `PROCESS_GUIDE.md`. Find your stage, grab the prompt, paste, ship.
> Replace `<angle bracket>` placeholders before sending.

---

## Stage 0 — Stack Lock

No Claude prompt — manual. Open `KING_PROMPTS.md`, pick Scenario A, fill in the stack-menu lines, paste as your sub-chat kickoff.

---

## Stage 1 — Repo Spin-up

No Claude prompt — use `START_NEW.md` for NEW apps (paste-and-go), or `npx degit s-411/nextjs-kit --force` for EXISTING apps per `PROCESS_GUIDE.md` Stage 1.

---

## Stage 2 — Reference Ingestion

### 2a — Drop references (manual)

Drop your reference materials into the appropriate buckets:

- `app-references/images/` — screenshots
- `app-references/html/` — raw HTML files from Stitch / Claude Design / hand-coded
- `app-references/code/` — raw React/Next code snippets

Create whichever bucket(s) you have material for. You don't need all three.

### 2b — Agent ingest

Paste this into Claude Code:

```
SKILLS: Use design-consistency skill for this work.

Walk the app-references/ directory and report what you see:
- List every file in app-references/images/, app-references/html/, and
  app-references/code/ (whichever exist).
- For images: describe the page each screenshot represents in 1-2 sentences.
- For HTML: read each file briefly, describe what page it represents.
- For code: read each file, describe what component/page it represents.

Then synthesize: what set of pages does this app appear to consist of? What
is the visual language (color palette, typography style, density, mood)?
What is the apparent app domain (what does it do)?

Stop after the report. Do NOT start building screens. Do NOT write any code.
This stage is reconnaissance only.

Wait for me to confirm your read is accurate before proceeding to Stage 3.
```

---

## Stage 3 — First Screens (1-4 anchor screens)

Paste this:

```
SKILLS: Use design-consistency skill for this work.

Build the first 1-4 anchor screens of the app, pixel-perfect from the
references in app-references/. Anchor screens are typically:
- The marketing landing page (homepage) OR the auth shell
- The empty/initial dashboard view
- One core app screen (the main feature in its empty state)

Use the references as the source of truth for visual design. If references
disagree, ask me which one is canonical.

RULES FOR THIS STAGE:
1. Raw Tailwind utility classes are fine — no @theme tokens yet, that's Stage 4
2. Use the same Tailwind values for the same semantic role across screens
   (e.g. if button bg is bg-blue-600 on screen 1, it's bg-blue-600 on every
   button across every screen — DO NOT alternate between bg-blue-500 and
   bg-blue-600 inconsistently)
3. shadcn/ui components — only if explicitly required (graphs, complex form
   primitives). Otherwise plain Tailwind + Next/React.
4. Mobile-responsive baseline. Use Tailwind responsive prefixes (sm:, md:,
   lg:). Don't ship desktop-only.
5. Mock data is fine — no Convex queries yet (Stage 6). No real auth (Stage 5).
6. Create routes under app/ following App Router conventions.
7. Wire navigation between screens with <Link> components.
8. Stop after 4 screens. Do NOT build screen 5+ in this stage.

After all screens are built:
- Invoke the design-consistency skill to verify visual coherence across
  the 4 screens.
- Run `npm run dev` and walk through every screen, every interactive
  element. Report any console errors.
- Return a summary: list of screens built, files touched, design-consistency
  result, any issues encountered.

Terminal commands you produce must assume the terminal is already in the
repo root — never prefix with cd <repo>.
```

---

## Stage 4 — Tokenization (HARD GATE)

Paste this:

```
SKILLS: Use design-consistency skill for this work.

This is the tokenization stage. Hard gate — until this is complete, you must
refuse to build screen 11+ in subsequent stages.

Goal: extract every color, font, font-size, font-weight, line-height, border
radius, spacing, shadow, and breakpoint used in the Stage 3 screens into
Tailwind v4 @theme inline tokens in app/globals.css (or wherever the kit
template puts the @theme block).

Process:

1. SCAN PHASE — do not modify any files yet. Walk every screen built so far
   and report:
   - Every distinct hex/rgb/oklch color value used
   - Every distinct font-family used
   - Every distinct spacing value used (px, rem, %)
   - Every distinct border-radius value used
   - Every distinct shadow used
   - Every distinct breakpoint that doesn't match Tailwind defaults
   Group them with a proposed semantic name for each (e.g. --color-primary,
   --color-bg-card, --radius-button, --space-card-padding).

   Stop. Wait for my approval of the token names before refactoring.

2. After my approval — REFACTOR PHASE:
   - Add the @theme inline block to globals.css with all approved tokens
   - Refactor every Stage 3 screen to consume the tokens via Tailwind class
     names (e.g. bg-primary, rounded-button, p-card-padding)
   - NO inline arbitrary values like bg-[#abc123] should remain. NO raw
     spacing values like p-[18px]. Everything goes through tokens.
   - Visually verify with npm run dev after refactor — screens should look
     IDENTICAL to before. Pure refactor, zero visual change.

3. VERIFY PHASE — invoke design-consistency skill in audit mode. Confirm
   zero raw color/spacing/radius/shadow values remain in any screen file.

Return a summary:
- List of tokens created (just the names)
- Files refactored
- Confirmation that screens still render identically
- design-consistency audit result

Terminal commands you produce must assume the terminal is already in the
repo root — never prefix with cd <repo>.
```

---

## Stage 4.5 — Component Library + Brand Guidelines

Paste this:

```
SKILLS: Use design-consistency skill between batches. Use self-check skill
for the final audit.

This is the Stage 4.5 component library + brand guidelines build. Stage 4
(tokenization) must be complete before any work in this stage. If Stage 4
is not yet signed off, STOP and tell me — do not improvise.

Goal: pre-emptively build every UI primitive the app might ever need,
composed against the @theme tokens from Stage 4, plus a brand guidelines
page that documents the entire visual vocabulary. Stage 7 bulk build will
then become pure composition from this library.

Soft gate: this stage is strongly recommended before Stage 7. Override
pattern: I explicitly say "skip Stage 4.5" or "override the soft gate" —
in which case proceed and surface a one-line caveat in your response
noting the override.

Process:

1. ROUTE PHASE
   - Add a /components route. Add a sidebar nav entry pointing at it in
     the dashboard layout (or wherever the app's primary nav lives).
   - Ask me: "Should /components be visible in production, or dev-only?
     Default is dev-only — gated behind a NODE_ENV check or a feature
     flag." Wait for my answer before wiring visibility.

2. BRAND GUIDELINES PHASE (Batch 0)
   Build /components/brand-guidelines (or /components as the index page).
   Render the entire visual vocabulary, all consuming @theme tokens:
   - Palette: every color token shown as a swatch, in BOTH light and dark
     mode side-by-side. Token name + value visible.
   - Type scale: every text size with sample copy. Display sizes,
     headings, body, captions, eyebrow, button labels.
   - Spacing scale: visual ruler showing every spacing token.
   - Radius scale: visual examples (rounded boxes at each radius token).
   - Shadow scale: every elevation token rendered.
   - Motion notes: transition timing + easing curve principles.
   - Iconography notes: stroke weight, sizing, source library.

3. SCOPE PHASE
   Ask me:
     "Do you have a list of components to build, or should I work from
      the comprehensive default list?"

   COMPREHENSIVE DEFAULT LIST — 19 batches, build in order. Run
   design-consistency skill audit between each batch.

   Batch 1 — Typography
   Display XL / display LG / heading XL / heading LG / heading MD /
   heading SM / body LG / body MD / body SM / eyebrow / caption /
   button label. Each shown in light and dark.

   Batch 2 — Buttons
   Every variant × every size × every state. Variants: primary,
   secondary, tertiary, destructive, with-icon, icon-only, loading.
   Sizes: sm / md / lg. States: default / hover / focus-visible /
   active / disabled / loading. Plus button groups and tab navigation
   (segmented control).

   Batch 3 — Form elements (part 1)
   Text input, textarea, number input, password input, search input,
   email input. Each with: default / focus / error / disabled /
   with-prefix-icon / with-suffix-icon / with-helper-text /
   with-error-message / with-character-count.

   Batch 4 — Form elements (part 2)
   Select / multi-select / combobox / dropdown menu, radio group,
   checkbox + checkbox group, switch / toggle, slider (range single +
   double-handle), rating input, tag input (chip-style with add +
   remove), file uploader (drag-and-drop + button-trigger +
   with-progress).

   Batch 5 — Form elements (part 3) — date and time
   Date picker (single + range), time picker, datetime picker, calendar
   (month + year view), recurring schedule input.

   Batch 6 — Cards
   Base card, stat card (candy-tile), feature card, pricing card,
   testimonial card, profile card, content card with image, action
   card, expandable card, sortable / draggable card.

   Batch 7 — Lists, dividers, layout patterns
   Bulleted list, numbered list, definition list, horizontal divider,
   vertical divider, section divider with label, two-column layout,
   three-column layout, sidebar + main layout, hero pattern, stacked-
   section pattern, container max-widths reference.

   Batch 8 — Status, badges, tags
   Status pill (success / warning / error / info / neutral / pending /
   processing / live), badge (numeric, dot indicator), tag (removable,
   with icon, colored), avatar with status dot, kbd shortcut display.

   Batch 9 — Avatars, social, activity feeds
   Avatar (every size, with image / initials / status dot / ring),
   avatar group (stacked + row), user card / hover card, activity feed
   item, social proof block, follower count display, comment thread,
   mention chip.

   Batch 10 — Navigation
   Sidebar nav item (default / active / hover / with badge / collapsed),
   sidebar dropdown / nested nav, top bar / app bar, breadcrumbs,
   pagination (numbered + load-more + infinite-scroll trigger), tabs
   (underline + pill + segmented), command menu / cmd-k palette, mobile
   drawer / hamburger menu pattern.

   Batch 11 — Feedback (alerts, notifications, modals)
   Alert (inline, every severity), banner (page-level), toast / snackbar
   (every position + auto-dismiss + action), modal / dialog (every
   size, confirmation pattern), drawer / sheet (left + right + bottom),
   popover, tooltip, hover card, destructive-action confirmation
   pattern.

   Batch 12 — Progress and loading
   Linear progress, circular progress, indeterminate spinner, skeleton
   loader (text line, card, avatar, table row), step indicator /
   stepper / wizard progress, multi-step form pattern.

   Batch 13 — Data tables
   Basic table, sortable, filterable, paginated, with row actions, with
   bulk actions, with expandable rows, with sticky header, empty-state
   row, loading-state rows.

   Batch 14 — Charts and data visualization (Recharts via shadcn/ui)
   Line, area, bar, stacked bar, horizontal bar, pie / donut, sparkline,
   KPI tile (number + delta + sparkline), gauge / progress ring, heat
   map. Both light and dark.

   Batch 15 — Empty / error / loading states
   Empty state (illustration / icon + headline + body + CTA), error
   state (retry), 404 / 500 page, loading page, success state,
   zero-data state.

   Batch 16 — Pricing and commerce
   Pricing card (3-tier + variants), pricing toggle (annual / monthly),
   feature comparison table, plan upgrade prompt, checkout summary
   block, order item row, coupon code input, payment method card,
   receipt summary.

   Batch 17 — Interactive controls (advanced)
   Range slider with input sync, dual-handle range slider, color picker,
   accordion (single + multiple + with icon), expandable section,
   collapsible group, toggle group, segmented control.

   Batch 18 — Metrics, rankings, achievements
   Leaderboard row, ranking position display (1st / 2nd / 3rd),
   achievement badge, milestone marker, trophy / award display, streak
   counter, level indicator, progress-to-goal display.

   Batch 19 — Media and content
   Image with caption, image gallery (grid + carousel), video player
   wrapper, audio player wrapper, file display (icon + name + size +
   actions), download button pattern, share button pattern (native +
   copy-link), QR code display, embedded content frame.

4. BUILD PHASE
   Build batches in order. For each batch:
   - Each component renders on a sub-page or section of /components
     with the full variant matrix visible (sizes × variants × states).
   - All values flow through @theme tokens — NO raw colors, NO raw
     spacing, NO inline arbitrary values like bg-[#abc].
   - Light and dark modes both verified.
   - At the end of the batch, invoke design-consistency skill in audit
     mode against just the new batch. Resolve any drift before moving
     on.
   - Return a per-batch summary: components added, files touched,
     design-consistency result. Don't batch summaries across batches.

5. TOKEN GAP PHASE (after all batches)
   The build will surface tokens that didn't exist after Stage 4 —
   semantic colors for alert states (success/warning/error/info), focus
   rings, disabled states, chart palettes, etc. Compile a list:
     - Token name (proposed)
     - Where it's used in the library
     - Light + dark values
   Stop. Wait for my approval before adding to @theme.

6. After my approval — TOKEN UPDATE PHASE:
   - Add the new tokens to globals.css @theme block.
   - Refactor any library components currently using raw values for
     these states to consume the new tokens.
   - Update the brand guidelines page (Batch 0) to reflect the final
     token set — palette swatches, etc., now include the new additions.

7. FINAL AUDIT PHASE
   - Invoke design-consistency skill across the entire /components
     route. Confirm zero raw values remain.
   - Invoke self-check skill in audit mode: every component renders,
     every variant matrix is complete, light + dark both work, no
     console errors on any /components sub-page.
   - Return a final summary: total components built, batches completed,
     new tokens added, design-consistency result, self-check result.

Terminal commands you produce must assume the terminal is already in the
repo root — never prefix with cd <repo>.
```

---

## Stage 5 — Auth Wiring

The prompt branches based on the AUTH choice in `CLAUDE.md`. The agent reads `CLAUDE.md` first to determine which path.

### If AUTH = Clerk

Paste this:

```
SKILLS: Use clerk-setup and clerk-nextjs-patterns skills (both at user scope,
~/.claude/skills/) for this work. Read self-check skill before declaring done.

Wire Clerk authentication end-to-end with Clerk's PREBUILT components as the
default — sign-in, sign-up, and the floating user button.

Pre-flight:
1. Confirm @clerk/nextjs is installed (it should be from Stage 1 step 6).
2. I will provide the publishable and secret keys via .env.local. Do NOT ask
   me for keys yet — first confirm the packages, then prompt me to paste keys.

Implementation:
1. Wrap the root layout in <ClerkProvider>.
2. Add middleware.ts at repo root using clerkMiddleware() with sensible
   protected matchers (everything except /, /sign-in, /sign-up, /privacy,
   /terms, public marketing routes).
3. Create app/sign-in/[[...sign-in]]/page.tsx and app/sign-up/[[...sign-up]]/
   page.tsx using Clerk's <SignIn /> and <SignUp /> components.
4. Add <UserButton afterSignOutUrl="/" /> to the app's main header (top-right,
   floating). Should appear on every authenticated page.
5. For protected pages, use <SignedIn> and <SignedOut> wrappers from
   @clerk/nextjs as needed.

Smoke test:
1. Run `npm run dev`
2. Visit /sign-up, complete signup with a test email
3. Verify redirect to authenticated state
4. Verify <UserButton /> appears
5. Click it, sign out
6. Verify redirect to /
7. Visit /sign-in, sign back in, verify session restored

Stop conditions: if Convex is also wired in this app and you need to integrate
Clerk identity into Convex queries, that integration happens at Stage 6
(Backend), not here. Stage 5 is auth-only.

After done — invoke self-check skill to verify the wiring. Then return a
summary: files touched, components added, smoke-test result.

Terminal commands you produce must assume the terminal is already in the
repo root — never prefix with cd <repo>.
```

### If AUTH = Convex Auth

Paste this:

```
SKILLS: Use convex-setup-auth skill (user scope, ~/.claude/skills/) for this
work. Read self-check skill before declaring done.

Wire Convex Auth end-to-end. Read convex-auth-setup.md in this kit FIRST and
follow its patterns exactly.

Pre-flight:
1. Confirm @convex-dev/auth and @auth/core@0.37.0 are installed.
2. Confirm `npx @convex-dev/auth` was run at Stage 1 — convex/auth.ts,
   convex/http.ts, convex/auth.config.ts should exist with scaffolding.
3. If EMAIL = Resend in CLAUDE.md, the Password provider's password reset
   needs Resend wired. Check if @resend package is installed; if so, this
   step needs Resend integration too.

Implementation:
1. Configure providers in convex/auth.ts. Default to Password provider
   for web (most common). Add OAuth providers (Google, etc.) only if
   CLAUDE.md notes specify them.
2. Wrap root layout in <ConvexClientProvider> + <ConvexAuthProvider>
   (read convex-auth-setup.md for the exact wrapper pattern).
3. Build sign-in and sign-up pages at /sign-in and /sign-up using the
   useAuthActions hook from @convex-dev/auth/react.
4. Build a sign-out button component that calls signOut() and routes to /.
5. Add an <Authenticated> wrapper for protected routes — bounce to /sign-in
   if not authenticated.
6. If EMAIL = Resend: wire Resend's API key (from .env.local), implement
   the password reset email template, hook it into Convex Auth's reset flow.

Smoke test:
1. Run `npm run dev`
2. Visit /sign-up, complete signup with a test email + password
3. Verify authenticated state (some routed dashboard / placeholder)
4. Sign out, verify redirect
5. Visit /sign-in, sign back in
6. If EMAIL = Resend: trigger password reset, verify email arrives, click
   link, set new password, log in.

After done — invoke self-check skill. Return a summary: files touched,
components added, smoke-test result, anything I need to do manually
(like setting Resend API key in Vercel env vars later).

Terminal commands you produce must assume the terminal is already in the
repo root — never prefix with cd <repo>.
```

---

## Stage 6 — Backend + Data

**Open a fresh Claude Code session for this stage** (clean context).

Paste this:

```
SKILLS: Use app-backend-builder skill (per-repo, .claude/skills/) for this
work. Read convex-react-client.md and convex-auth-setup.md in this kit before
starting. Use self-check skill between phases.

This is the Stage 6 main app build. Read CLAUDE.md to understand the app's
purpose, stack, and what's been built so far. Then read every existing screen
under app/ and existing convex/*.ts files (if any).

Goal: make every Stage 3 anchor screen consume real data from Convex. Define
schema, queries, mutations, and (where needed) actions. Replace all mock data
with live queries. Auth-scope queries so users only see their own data.

Process:

1. PLAN PHASE
   - Read every screen in app/ to understand what data shapes are displayed.
   - Read CLAUDE.md to understand the app's domain.
   - Propose a Convex schema in convex/schema.ts — every table, every
     index, every relationship. Use Convex's defineSchema/defineTable.
   - Propose the queries/mutations/actions needed to drive each screen.
   - Output the plan in plain English first. Stop. Wait for my approval
     before writing any Convex code.

2. After my approval — IMPLEMENT PHASE, one phase at a time:
   Phase A: schema.ts + the first table's queries/mutations
   Phase B: the next domain entity
   Phase C: ... etc.
   Run `npx convex dev` after each phase to push schema changes and verify
   no schema errors.
   Self-check after each phase before moving to the next.

3. WIRE PHASE — go through each Stage 3 screen and:
   - Replace mock data with `useQuery` or `usePreloadedQuery` calls.
   - Wire user actions (form submits, button clicks) to mutations.
   - Verify auth-scoping: a query that returns "user's todos" must filter
     by `getAuthUserId(ctx)` (Convex Auth) or the Clerk user ID via
     `await ctx.auth.getUserIdentity()` (Clerk).

4. SMOKE TEST
   - npm run dev
   - Sign up as user A, perform key actions, verify data persists
   - Sign up as user B in a separate browser session
   - Verify user B cannot see user A's data
   - Verify all CTAs that should work, work

References:
- convex-react-client.md — query/mutation/action client patterns
- convex-auth-setup.md — auth-scoping patterns

Return a summary per phase as you go. Don't batch them all at the end.

Terminal commands you produce must assume the terminal is already in the
repo root — never prefix with cd <repo>.
```

---

## Stage 7 — Bulk App Build

Paste this when you're ready to build the rest of the screens. Repeat as needed for each batch:

```
SKILLS: Use design-consistency and self-check skills (per-repo,
.claude/skills/) for this work.

This is the Stage 7 bulk build. Stage 4 must be complete before any work in
this stage. If Stage 4 (tokenization) is not yet signed off, STOP and tell
me — do not improvise.

Stage 4.5 (component library) is a SOFT gate before Stage 7. If /components
exists and the library is built, compose from it by default — use existing
primitives and only introduce new components on explicit need (and when you
do, add them to /components so the library stays canonical). If Stage 4.5
was skipped, surface a one-line caveat in your first response noting the
override.

Build the next batch of screens for this app. References for each screen
are in app-references/images/, app-references/html/, and app-references/code/
(whichever applies). I will tell you which screens to build in this batch
or you can ask.

RULES FOR THIS STAGE:
1. Every screen consumes @theme tokens from Stage 4 — NO raw colors, NO raw
   spacing, NO inline arbitrary values like bg-[#abc].
2. Every screen wires to live Convex data from Stage 6. If a new schema
   addition is needed, propose it, get my approval, add it.
3. Auth-scoped queries — same pattern as Stage 6. User can only see their
   own data unless the screen is explicitly public.
4. Mobile-responsive — sm/md/lg breakpoints work correctly.
5. Build screens one at a time. Self-check after every 2-3 screens.
6. If you've built screen 11+ and Stage 4 was not complete, STOP — this is
   the hard gate. Do not proceed unless I explicitly say "override the hard
   gate" — and even then, surface a one-line caveat in your response noting
   the override.
7. After each screen, return a brief: file added, what data it shows, what
   actions it triggers. Don't batch summaries.

When this batch is done — invoke design-consistency skill across all newly-
built screens to verify visual coherence with the rest of the app.

Terminal commands you produce must assume the terminal is already in the
repo root — never prefix with cd <repo>.
```

---

## Stage 8 — Billing

Skip if BILLING = none in `CLAUDE.md`.

### If BILLING = Stripe

Paste this:

```
SKILLS: Use self-check skill before declaring done.

Wire Stripe end-to-end. The app should handle a free → paid upgrade flow,
gate premium features, and let users self-serve subscription management via
Stripe Customer Portal.

Pre-flight:
1. Confirm `stripe` package is installed.
2. I will provide STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY, and
   STRIPE_WEBHOOK_SECRET via .env.local. Do NOT proceed without these — ask
   me to paste them if missing.
3. Confirm Convex is wired (Stage 6 complete) — webhooks land in Convex
   http.ts as actions.

Implementation:
1. Configure subscription products + prices in Stripe Dashboard (test mode).
   Document the price IDs in CLAUDE.md or a stripe-config.md.
2. Build a /pricing page showing tiers with Stripe Checkout buttons.
3. Convex action: createCheckoutSession — takes priceId, userId; returns
   Stripe Checkout URL.
4. Add Stripe webhook handler in convex/http.ts (or wherever http routes
   live in this app):
   - checkout.session.completed → mark user as paid in Convex
   - customer.subscription.updated → sync subscription state
   - customer.subscription.deleted → mark user as free again
   - invoice.payment_failed → flag user, optional email
5. Build a paywall component that gates premium features. Reads user's
   subscription state from Convex.
6. Customer portal link — Convex action to create portal session, route
   from app's settings page.

Smoke test (test mode):
1. Sign up fresh user
2. Click upgrade, complete Stripe Checkout with test card 4242 4242 4242 4242
3. Verify webhook fires, user is marked paid in Convex
4. Verify premium feature is now accessible
5. Open customer portal, cancel subscription
6. Verify webhook fires, user is downgraded
7. Verify premium feature is gated again

After done — invoke self-check. Return a summary: files added, webhook
endpoints, env vars I need to set in Vercel for production (do not set yet
— Stage 12 swaps to production keys).

Terminal commands you produce must assume the terminal is already in the
repo root — never prefix with cd <repo>.
```

### If BILLING = Clerk Billing

Paste this:

```
SKILLS: Use clerk-billing skill (user scope, ~/.claude/skills/) for this
work. Read self-check skill before declaring done.

Wire Clerk Billing for subscription management. This is the simpler path —
Clerk handles checkout, customer portal, and subscription state via has()
checks. Use this when granular Stripe control is not needed.

Pre-flight:
1. Confirm Clerk auth is wired (Stage 5 = Clerk).
2. Confirm subscription plans are configured in Clerk Dashboard.

Implementation:
1. Add a /pricing page with Clerk's <PricingTable /> component.
2. Gate premium features with `has({ plan: 'premium' })` checks (or
   whatever plan slug you configured).
3. Add the in-app checkout drawer trigger where appropriate (e.g.
   from a "Upgrade" CTA in settings or the paywall).
4. Wire Clerk billing webhooks if any post-checkout server-side work
   is needed.

Smoke test:
1. Sign up fresh user
2. Click upgrade, complete Clerk checkout
3. Verify premium feature accessible
4. Cancel subscription via Clerk's user button → manage subscription
5. Verify premium feature gated again

After done — invoke self-check. Return a summary: files touched, plan slugs
used, env vars needed for prod.

Terminal commands you produce must assume the terminal is already in the
repo root — never prefix with cd <repo>.
```

---

## Stage 9 — Email

Skip if EMAIL = none AND AUTH = Clerk in `CLAUDE.md`.

Paste this:

```
SKILLS: Use self-check skill before declaring done.

Wire Resend for transactional emails.

Pre-flight:
1. Confirm `resend` package is installed.
2. RESEND_API_KEY in .env.local. If missing, ask me to provide.

Implementation:
1. Build a Convex action: sendTransactionalEmail(to, template, data) — wraps
   the Resend API client.
2. Build email templates as React components in emails/ directory using
   @react-email/components if installed (otherwise plain HTML strings).
   Templates needed (skip ones not applicable):
   - welcome — fires on signup
   - password-reset — only if AUTH = Convex Auth with Password provider
   - receipt — only if BILLING is wired
   - any product-specific templates I list in CLAUDE.md
3. Wire each template's trigger:
   - welcome → fires from the signup mutation/action after user creation
   - password-reset → wired into Convex Auth's reset flow
   - receipt → fires from Stripe webhook on successful charge

Pre-domain note: Resend domain verification happens later (Stage 12 when
domain is wired). For now, use Resend's test sender (onboarding@resend.dev)
or your already-verified domain if you have one.

Smoke test:
1. Trigger welcome email — sign up, check inbox
2. Trigger any other template that's wired
3. Verify all templates render correctly (no broken interpolations)

After done — invoke self-check. Return a summary: files added, templates
wired, what's deferred to Stage 12 (domain verification).

Terminal commands you produce must assume the terminal is already in the
repo root — never prefix with cd <repo>.
```

---

## Stage 10 — Legal + Landing Page

Paste this:

```
SKILLS: Use design-consistency skill for the landing build. Read self-check
skill before declaring done.

This stage has two parts: legal pages and the marketing landing page. Both
live on the app's actual domain.

PART A — LEGAL PAGES

1. Read legal/privacy.template.md and legal/terms.template.md in this kit.
2. Fill the placeholders:
   - {{APP_NAME}} → from CLAUDE.md
   - {{CONTACT_EMAIL}} → ask me if not set; default to support@<domain>
   - {{LAST_UPDATED}} → today's date
   - {{DOMAIN}} → from CLAUDE.md (or 'tbd' if not set yet)
3. Render filled pages at app/privacy/page.tsx and app/terms/page.tsx.
4. Wire footer links across the app pointing at /privacy and /terms.

PART B — MARKETING LANDING PAGE

1. Build the homepage at app/page.tsx (or app/(marketing)/page.tsx if
   the app dashboard is the homepage and marketing is a separate group).
2. Sections to include (skip irrelevant ones):
   - Hero with value prop and primary signup CTA
   - Features / how it works
   - Pricing — only if BILLING is wired; pull tier info from Stripe/Clerk
     Billing config
   - Social proof / testimonials placeholder if I provide content; skip
     otherwise
   - Footer with privacy + terms links
3. Use @theme tokens from Stage 4 — visual language matches the app.
4. Mobile-responsive.
5. SEO baseline:
   - Set <title> via Next metadata API
   - Set <meta description>
   - Generate an OG image (1200x630) via nanobanana MCP — prompt nanobanana
     with the app's value prop. Save to public/og.png. Set in metadata.
   - Create public/robots.txt — allow all
   - Create app/sitemap.ts — list all public routes (homepage, /privacy,
     /terms, /sign-in, /sign-up, /pricing if applicable)

After done — invoke self-check + design-consistency. Return a summary: files
added, OG image saved, sitemap routes listed.

Terminal commands you produce must assume the terminal is already in the
repo root — never prefix with cd <repo>.
```

---

## Stage 11 — Self-Check Gate

Paste this:

```
SKILLS: Use self-check skill (per-repo, .claude/skills/) in audit mode for
this work.

This is the pre-launch self-check gate. Audit the entire app and report.

Audit checklist:
1. Every route under app/ is reachable from at least one navigable path
   (Link, button onClick, redirect). No orphaned routes.
2. Every CTA button on every page has a working href or onClick. No dead
   buttons.
3. Run `npm run build` — must complete with zero errors and zero warnings
   that block deployment. Type errors are blocking.
4. Run `npm run dev` and visit every page in browser. Watch console.
   Report ANY console errors or warnings.
5. Mobile responsive verified at sm (640px), md (768px), lg (1024px).
   Use browser dev tools to test. Report any layout breakage.
6. Auth flow:
   - Signup → email verify (if applicable) → dashboard
   - Logout → re-login → session restored
   - Password reset (if applicable) → email arrives → reset works
7. Billing flow (if applicable):
   - Free user sees paywall on premium features
   - Upgrade flow completes
   - Premium features accessible after upgrade
   - Customer portal works
8. Email flow (if applicable):
   - Each transactional email has been triggered at least once and verified
9. No TODO/FIXME/XXX/HACK comments in production code paths. List any found.
10. All env vars referenced in code are documented:
    - NEXT_PUBLIC_* in .env.local exist
    - Server-side secrets noted for Vercel env setting at Stage 12

Return a structured report with each checklist item as PASS / FAIL / N/A,
plus any specific issues found. If anything fails, propose the stage to
return to (e.g. "FAIL #6 — return to Stage 5 to fix password reset wiring").

Terminal commands you produce must assume the terminal is already in the
repo root — never prefix with cd <repo>.
```

---

## Stage 12 — Domain Wiring

Mostly manual but includes a Claude prompt for the production env-var swap.

### 12a — Manual

1. **Vercel:** Project Settings → Domains → Add → enter your domain
2. **DNS:** at your registrar, add the A record or CNAME Vercel shows you
3. **Wait for SSL** — usually < 5 min after DNS propagates
4. **Verify** — visit https://yourdomain.com, confirm app loads with valid cert
5. **Set the apex/www redirect preference** in Vercel settings

### 12b — Production env vars + integrations swap

Paste this:

```
SKILLS: Use self-check skill before declaring done.

Domain has been wired in Vercel. Now swap any localhost / preview-URL
references to the production domain.

Pre-flight: I will tell you the production domain. Replace <DOMAIN> below
with it.

Tasks:
1. Update CLAUDE.md header — set Domain to <DOMAIN>.
2. If BILLING = Stripe:
   - Update Stripe webhook endpoint in Stripe Dashboard to
     https://<DOMAIN>/api/stripe/webhook (or wherever the convex http route
     lives — check convex/http.ts).
   - In Vercel project settings, add production env vars:
     STRIPE_SECRET_KEY (production key, NOT test)
     STRIPE_WEBHOOK_SECRET (production webhook secret)
     STRIPE_PUBLISHABLE_KEY (production publishable)
   - Test mode keys stay in preview env only.
3. If BILLING = Clerk Billing:
   - Switch to production instance in Clerk Dashboard.
   - Update Clerk env vars in Vercel:
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY (prod)
     CLERK_SECRET_KEY (prod)
4. If EMAIL = Resend:
   - Add <DOMAIN> in Resend Dashboard → Domains
   - Add the DNS records Resend shows
   - Wait for verification (can take a few min)
   - Update from-address in email templates to use <DOMAIN>
5. If AUTH = Clerk:
   - Add <DOMAIN> as authorized domain in Clerk Dashboard
   - Update sign-in / sign-up redirect URLs to use <DOMAIN>
6. If AUTH = Convex Auth:
   - Update CONVEX_SITE_URL env var in Convex Dashboard to https://<DOMAIN>
7. NEXT_PUBLIC_APP_URL or equivalent — update to https://<DOMAIN> across all
   environments.

After all swaps — visit https://<DOMAIN>, smoke-test:
- Signup with a real email
- Verify email arrives from production sender
- Complete signup
- Trigger billing flow (if applicable) with a real card
- Verify all integrations point at production

Return a summary: env vars set, DNS records added, integrations swapped,
any issues.

Terminal commands you produce must assume the terminal is already in the
repo root — never prefix with cd <repo>.
```

---

## Stage 13 — Analytics

Paste this:

```
SKILLS: Use self-check skill before declaring done.

Wire analytics. Read CLAUDE.md to confirm which providers are in scope.

Always wire Vercel Analytics:
1. In Vercel project settings → Analytics → Enable (one click, free tier)
2. Install @vercel/analytics package
3. Import { Analytics } from '@vercel/analytics/react'
4. Add <Analytics /> to root layout
5. Deploy. After 5-10 min, verify events appear in Vercel Analytics dashboard.

If ANALYTICS includes PostHog:
1. Install posthog-js
2. Create a PostHog client wrapper in lib/posthog.ts
3. Initialize PostHog in a client component mounted at root layout
4. NEXT_PUBLIC_POSTHOG_KEY and NEXT_PUBLIC_POSTHOG_HOST in env vars
5. Define an initial event taxonomy in CLAUDE.md or events.md:
   - page_view (auto-captured)
   - signup
   - signin
   - paywall_viewed
   - upgrade_started
   - upgrade_completed
   - <key feature usage events>
6. Wire posthog.capture() calls at the right moments
7. Verify events arrive in PostHog dashboard

After done — invoke self-check. Return a summary: providers wired, events
firing, dashboard URLs.

Terminal commands you produce must assume the terminal is already in the
repo root — never prefix with cd <repo>.
```

---

## Stage 14 — Sentry

Paste this:

```
SKILLS: Use sentry-setup skill (per-repo, .claude/skills/) for this work.

Wire Sentry error tracking and source maps.

Pre-flight:
1. Sentry account exists, project created in Sentry dashboard.
2. SENTRY_AUTH_TOKEN available (for source maps upload). If missing, ask.

Implementation (use Sentry's wizard for the boilerplate):
1. Run `npx @sentry/wizard@latest -i nextjs` and follow the prompts:
   - Select Next.js
   - Provide the Sentry org slug and project slug
   - The wizard generates sentry.client.config.ts, sentry.server.config.ts,
     sentry.edge.config.ts, and updates next.config.js with withSentryConfig.
2. Verify the generated configs look right — check sample rates, environment
   tags. Tune as needed.
3. Commit the changes.
4. Test source maps:
   - Build production: `npm run build` — should upload source maps to Sentry
   - Deploy to Vercel
   - Trigger a test error from a hidden /sentry-test route in production
   - Verify the error appears in Sentry dashboard with correct stack trace
     pointing at original .ts/.tsx files (not the bundled output)
5. Configure alerts in Sentry dashboard:
   - New issue alert → Slack/email
   - High frequency alert
6. Remove the /sentry-test route after verification.

After done — invoke self-check. Return a summary: configs added, test error
captured at <link>, alerts configured.

Terminal commands you produce must assume the terminal is already in the
repo root — never prefix with cd <repo>.
```

---

## Stage 15 — Final QA + Handoff

Paste this:

```
SKILLS: Use self-check skill (per-repo, .claude/skills/) for full final pass.

Final QA on the production URL. This is the launch gate.

Read CLAUDE.md to confirm all stages 1-14 are marked done. If any are
incomplete, STOP and tell me which.

Final smoke test on https://<DOMAIN>:
1. SIGNUP — fresh email account, complete signup flow, land on dashboard.
   Verify welcome email arrives (if EMAIL wired).
2. ONBOARDING / FIRST RUN — if app has any first-run flow, walk through.
3. CORE LOOP — exercise the main use case the app exists for. Do the
   thing the user signs up to do. Verify it works.
4. PAYMENT (if BILLING wired) — upgrade with a real card (small test
   amount), verify gated feature unlocks, verify receipt email.
5. LOGOUT → LOGIN — verify session restores correctly.
6. PASSWORD RESET (if applicable) — request reset, follow link, set new
   password, log in.
7. MOBILE — repeat steps 1, 3, 5 on a real phone (not browser dev tools).
   Note any mobile-specific issues.
8. ERROR — Sentry should be capturing. Trigger a test error path you
   know exists; verify it lands in Sentry dashboard.

Handoff materials to prepare:
1. Confirm CLAUDE.md is up to date (all stages marked done).
2. Generate a one-pager handoff doc (HANDOFF.md in repo root):
   - App URL
   - Tech stack summary
   - Env vars in Vercel (names only, not values)
   - Third-party service accounts needed (Stripe, Clerk, Convex, Resend,
     Sentry, PostHog as applicable)
   - How to run locally (`npm run dev` + env var setup)
   - Where the kit lives (this repo) and how to refresh it
3. If client handoff: note what the client needs access to (Vercel team
   member invite, domain ownership, Stripe account, etc.)

Return a final report: every smoke test step PASS/FAIL, handoff doc
written, app launch-ready Y/N.

Terminal commands you produce must assume the terminal is already in the
repo root — never prefix with cd <repo>.
```
