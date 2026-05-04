---
name: design-consistency
description: Ensure new and modified screens stay consistent with the existing Tailwind v4 @theme tokens and component patterns. Use this skill before and after building any new screen or UI component, when reviewing screens for visual consistency, or when Claude has drifted from the existing design. Invoke this skill whenever adding UI to prevent visual inconsistency across the app.
---

# Design Consistency Skill (Next.js / Tailwind v4)

## Overview

Before writing any UI code, read the existing codebase to understand the design system in use. Then build to match it — do not invent new patterns or introduce raw Tailwind values when @theme tokens exist.

---

## Step 1 — Extract the Design System

Read the codebase and document what's already in use:

### Tokens (Tailwind v4 @theme block)

Find `app/globals.css` (or `src/app/globals.css`). Look for the `@theme` inline block. Document every token:

- **Colors** — `--color-*` (primary, secondary, bg, surface, border, muted, success, error, etc.)
- **Spacing** — `--spacing-*` (custom values beyond Tailwind defaults)
- **Typography** — `--font-*`, `--text-*` sizes, `--font-weight-*`
- **Radii** — `--radius-*`
- **Shadows** — `--shadow-*`
- **Breakpoints** — `--breakpoint-*` (custom values)

If no `@theme` block exists yet, this app is pre-Stage-4. Tokenization is the next required step before adding more screens.

### Components

List the shared/reusable components already in the codebase under `components/`:

- Buttons (primary, secondary, destructive, ghost)
- Input fields, textarea, select
- Cards
- Headers / navigation
- Empty states
- Loading indicators (skeleton, spinner)
- Modals / dialogs / drawers
- Toasts / notifications
- Forms (label + input + error pattern)

If shadcn/ui is in use (`components/ui/`), list the primitives that have been added.

### Layout patterns

- Page wrapper: standard padding, max-width, centering pattern?
- Sidebar / nav: present? where lives the nav component?
- Mobile responsive breakpoint: where does layout switch from mobile to desktop? (typically `md:` or `lg:`)
- Dark mode: supported? via `dark:` variants? toggle present?

---

## Step 2 — Consistency Checklist (Before Building)

Before writing any new UI:

- [ ] I know which @theme color tokens to use for background, text, accents, borders
- [ ] I know the correct typography tokens for headings (h1-h3), body, labels, captions
- [ ] I know the standard page padding pattern
- [ ] I know which existing components to reuse instead of creating new ones
- [ ] I have checked that a similar page already exists that I can reference
- [ ] If shadcn/ui is in use, I know which primitives are available vs. need installing

---

## Step 3 — Build to Match

When writing new UI:

- **Use Tailwind classes that resolve to @theme tokens.** `bg-primary`, `text-muted-foreground`, `rounded-card`, `p-card`. Never `bg-[#abc123]`, never `p-[18px]`, never `rounded-[8px]`.
- **Reuse existing components.** Do not create a new Button if `components/Button.tsx` (or `components/ui/button.tsx`) exists.
- **Match the page header style** of adjacent pages exactly.
- **Use the same loading pattern** (skeleton vs spinner) as the rest of the app.
- **Use the same empty state pattern** as the rest of the app.
- **Mobile-responsive by default.** Use `sm:`, `md:`, `lg:` prefixes consistently with the rest of the app.

---

## Step 4 — Consistency Audit (After Building)

Compare the new page against 2–3 existing pages. Check:

- [ ] Background uses the same color token as similar existing pages
- [ ] Typography uses the same token tier (e.g. h1 across all pages uses the same `text-h1` or equivalent token)
- [ ] Padding/spacing matches the existing page-wrapper pattern
- [ ] Button styles match — primary buttons look identical across pages
- [ ] Header style matches (title size, breadcrumbs if present, right actions)
- [ ] No new colors introduced that aren't in the @theme block
- [ ] No `bg-[...]` or other arbitrary inline values introduced
- [ ] Icons use the same icon library as the rest of the app (typically `lucide-react`)
- [ ] Dark mode (if supported) — both modes still look right

### Audit command

To find all raw values in a codebase (should return nothing if Stage 4 is complete):

```bash
grep -rE "bg-\[#|text-\[#|border-\[#|p-\[|m-\[|rounded-\[|gap-\[" app/ components/
```

If any matches return → those are raw values that need to be replaced with @theme tokens.

---

## Step 5 — Output

```
Design system extracted from: [file paths]

@theme tokens available:
- Colors: [list]
- Spacing: [list]
- Typography: [list]
- Radii: [list]

New screen: [screen name]
Tokens used: [list — all from @theme? ✅ / ❌]
Reused components: [list]
New components created: [list — justified? ✅ / ❌]

Raw value audit: ✅ clean / ❌ found N raw values: [list]

Consistency with adjacent screens: ✅ consistent / ⚠️ minor drift / ❌ significant drift

Issues: [list anything that needs fixing]
```

---

## Notes

- If there is no @theme block yet, this app is pre-Stage-4. Flag that — do not start building screens that consume tokens that don't exist. Either tokenize first or use raw Tailwind classes consciously knowing they'll be refactored.
- "Close enough" is not consistent — match exactly.
- Dark mode: if the app supports it, check both modes.
- Do not change existing screen styles to match new ones — new screens adapt to the existing system, not the other way around.
- shadcn/ui's default Button et al. consume @theme tokens (`bg-primary`, etc.) — so installed shadcn primitives become part of the design system automatically.
