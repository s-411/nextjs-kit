# REF_DOCS_INDEX.md

> Pointer to `~/Documents/GitHub/ref-docs/` — the iterative reference library at apps root that grows as integration pain hits. Token-disciplined, load on demand only.

## Why ref-docs exist

Some integrations have surface area too large to fit in a kit doc. Stripe webhooks, complex Convex query patterns, full PostHog event taxonomies, deep Sentry instrumentation. These live at `~/Documents/GitHub/ref-docs/` (apps root, NOT per-repo) so they:

- Don't bloat every repo with files unused 90% of the time
- Stay version-locked separately from the kit
- Get loaded by the agent only at the stage where they're needed

## Stage → ref-docs file map

| Stage | When to load | Suggested ref-docs file |
|-------|-------------|------------------------|
| 5 | If AUTH = Clerk + custom flows beyond prebuilt | `clerk-advanced-patterns.md` (when present) |
| 6 | Complex Convex queries beyond convex-react-client.md | `convex-advanced-patterns.md` (when present) |
| 8 | If BILLING = Stripe with multi-product pricing | `stripe-multi-product.md` (when present) |
| 8 | Complex webhook handling (failed payments, dunning) | `stripe-webhooks-advanced.md` (when present) |
| 9 | Complex email flows (drip campaigns, segmentation) | `resend-react-email-patterns.md` (when present) |
| 13 | PostHog with funnels and cohorts | `posthog-funnels.md` (when present) |
| 14 | Sentry beyond default instrumentation | `sentry-advanced-instrumentation.md` (when present) |

## Convention

- The kit covers the 80% case for each integration
- ref-docs cover the 20% edge cases
- An agent reaches for ref-docs ONLY when:
  - The current stage's prompt explicitly references a ref-docs file
  - OR the user asks for something the kit doesn't cover
  - OR the agent has tried the standard pattern and it's failing

If a stage prompt references a ref-docs file that doesn't exist locally:
1. Tell the user
2. Offer to create the stub from the integration's official docs
3. Don't proceed with guessing

## Setting up the ref-docs library

If `~/Documents/GitHub/ref-docs/` doesn't exist yet:

```bash
mkdir -p ~/Documents/GitHub/ref-docs
cd ~/Documents/GitHub/ref-docs
git init
echo "# ref-docs — apps-wide reference library" > README.md
```

Then add files as integrations demand. Don't pre-build — let pain drive what gets a ref-doc.
