---
name: sentry-setup
description: Set up Sentry error tracking and source maps from scratch in a Next.js App Router app. Use this skill at Stage 14 when adding Sentry to a production-bound app for the first time. Invoke after the app is feature-complete and live on a domain (Stage 12+) but before the final launch QA. Sentry captures unhandled errors, crashes, and performance issues across client, server, and edge runtimes.
---

# Sentry Setup — Next.js App Router

## Overview

Sentry catches errors you'd never see in development. Set up before launch so you catch issues during the post-launch ramp-up.

The Next.js SDK splits across three runtimes: `client`, `server`, and `edge`. Each has its own config file. The Sentry wizard generates all three.

---

## Step 1 — Create Project

1. Go to https://sentry.io — free tier covers most apps
2. Create a new project → Platform: **Next.js**
3. Get your DSN from Project Settings → Client Keys
4. Generate an Auth Token from User Settings → Auth Tokens (scope: `project:releases`, `org:read`)

---

## Step 2 — Run the Wizard

```bash
npx @sentry/wizard@latest -i nextjs
```

The wizard:
- Installs `@sentry/nextjs`
- Generates `sentry.client.config.ts`, `sentry.server.config.ts`, `sentry.edge.config.ts`
- Patches `next.config.js` (or `next.config.ts`) to wrap with `withSentryConfig`
- Creates `app/global-error.tsx` if not present
- Optionally adds an example test route

Step through the wizard's prompts. Pick:
- "Use Source Maps" → YES
- "Performance monitoring" → YES (you can throttle the sample rate later)
- "React component name tracking" → YES

---

## Step 3 — Verify Generated Configs

Open each config file and confirm sane defaults:

### `sentry.client.config.ts`

```ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  
  // Adjust this in production - 0.1 captures 10% of transactions
  tracesSampleRate: 0.1,
  
  // Replay only on errors in production
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 1.0,
  
  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
  
  // Don't send events in dev
  enabled: process.env.NODE_ENV === "production",
});
```

### `sentry.server.config.ts`

```ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 0.1,
  enabled: process.env.NODE_ENV === "production",
});
```

### `sentry.edge.config.ts`

```ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 0.1,
  enabled: process.env.NODE_ENV === "production",
});
```

Tune `tracesSampleRate` to balance signal vs. quota. Free tier is 10K transactions/month; 0.1 (10%) is a sane starting point.

---

## Step 4 — Environment Variables

Add to `.env.local`:
```
NEXT_PUBLIC_SENTRY_DSN=https://xxxx@xxxx.ingest.sentry.io/xxxx
SENTRY_DSN=https://xxxx@xxxx.ingest.sentry.io/xxxx
SENTRY_AUTH_TOKEN=sntrys_xxxx
SENTRY_ORG=your-org-slug
SENTRY_PROJECT=your-project-slug
```

`NEXT_PUBLIC_SENTRY_DSN` is exposed to the browser. `SENTRY_DSN` (server-side, same value) and `SENTRY_AUTH_TOKEN` are server-only.

Flag all five as **MANUAL INPUT REQUIRED**.

In Vercel project settings → Environment Variables, add all five. Set each to apply to Production, Preview, and Development as appropriate. `SENTRY_AUTH_TOKEN` only needs to be in build-time scope (Production + Preview), not runtime.

---

## Step 5 — Source Map Uploads (verify wizard set up correctly)

Open `next.config.js` (or `.ts`). The wizard should have wrapped it with `withSentryConfig`:

```js
const { withSentryConfig } = require("@sentry/nextjs");

const nextConfig = {
  // your existing config
};

module.exports = withSentryConfig(
  nextConfig,
  {
    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,
    silent: !process.env.CI,
    widenClientFileUpload: true,
    tunnelRoute: "/monitoring",  // bypass ad-blockers
    hideSourceMaps: true,         // don't expose to browser
    disableLogger: true,
  },
  {
    automaticVercelMonitors: true,
  }
);
```

If the wizard didn't add this, copy in manually. The `tunnelRoute` is important — many ad-blockers block direct calls to Sentry domains, and tunneling through your own domain bypasses that.

---

## Step 6 — Identify Users After Auth

Tag errors with the authenticated user. In your auth provider wrapper or middleware:

```ts
import * as Sentry from "@sentry/nextjs";

// After auth resolves (e.g. in a useEffect inside a client component
// that has access to the user)
Sentry.setUser({
  id: userId,
  // do NOT send email or name — keep PII minimal
});

// On sign out
Sentry.setUser(null);
```

For Clerk: integrate inside a client component that uses `useUser()`. For Convex Auth: use `useConvexAuth()` and the user ID from a query.

---

## Step 7 — Custom Error Boundaries (optional)

For sections of UI you want to gracefully handle:

```tsx
"use client";
import * as Sentry from "@sentry/nextjs";

export function FeatureErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <Sentry.ErrorBoundary
      fallback={({ error, resetError }) => (
        <div className="p-card-padding rounded-card bg-surface">
          <p>Something went wrong loading this section.</p>
          <button onClick={resetError} className="text-primary underline">Try again</button>
        </div>
      )}
    >
      {children}
    </Sentry.ErrorBoundary>
  );
}
```

---

## Step 8 — Verify

1. Add a temporary test route to throw an error. Create `app/sentry-test/page.tsx`:

```tsx
"use client";
import { useEffect } from "react";

export default function SentryTest() {
  useEffect(() => {
    throw new Error("Sentry verification — client error");
  }, []);
  return <p>Triggering test error…</p>;
}
```

2. Deploy to production: `git push` → Vercel auto-deploys.
3. Wait for Vercel deploy to complete.
4. Visit `https://yourdomain.com/sentry-test` in production (NOT localhost — Sentry is `enabled: production` only).
5. Within ~30 seconds, the error should appear in your Sentry dashboard with a fully source-mapped stack trace pointing at `app/sentry-test/page.tsx`.
6. **Remove the test route** before declaring Stage 14 done.

If the stack trace shows minified `chunk-abc123.js` instead of original `.tsx` — source maps aren't uploading. Check `SENTRY_AUTH_TOKEN` is set in Vercel and that the build logs include source-map upload output.

---

## Step 9 — Configure Alerts

In Sentry dashboard → Alerts:
- **New issue alert** — fires on any new error type. Slack or email.
- **High frequency alert** — fires when an issue spikes (e.g. > 100 events in 5 min).
- **Performance alert** (optional) — fires when p95 transaction duration exceeds threshold.

Without alerts, errors land in Sentry but you don't know about them until you log in.

---

## Common Issues

| Problem | Fix |
|---------|-----|
| Stack traces show minified chunks | Source maps not uploading. Check `SENTRY_AUTH_TOKEN` in Vercel + build logs. |
| Nothing appearing in Sentry | Verify DSN, confirm error is happening in production not dev (`NODE_ENV=production`). |
| Errors blocked by ad-blocker | Configure `tunnelRoute` in `withSentryConfig` (Step 5). |
| Performance quota exhausted fast | Lower `tracesSampleRate` to 0.05 or 0.01. |
| Free tier errors quota exhausted | Use `beforeSend` filter to drop noisy known errors. |
| Sentry init runs in dev | Confirm `enabled: process.env.NODE_ENV === "production"` is in all three configs. |

---

## Notes

- Free tier: 5K errors/month + 10K transactions/month — generous for MVP.
- Source maps are critical for debuggability — verify in Step 8 before declaring done.
- Never log PII in Sentry events. User IDs are fine; emails/names are not. The `Sentry.setUser` example above intentionally only passes `id`.
- The `tunnelRoute` adds a Next.js route at `/monitoring` that proxies to Sentry. This is on by default in the wizard config — don't remove unless you have a reason.
- Sentry replay (session video reproductions) is off by default for non-error sessions to save quota. `replaysOnErrorSampleRate: 1.0` records the session ONLY when an error fires. Useful for debugging, but be aware of privacy implications — `maskAllText: true` is mandatory for any app handling sensitive data.
