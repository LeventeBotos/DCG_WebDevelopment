# AGENTS.md

This file provides guidance to Codex (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (Next.js with Turbopack)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint via next lint
```

There is no test suite. Type-check manually with:
```bash
npx tsc --noEmit
```

## Architecture

**Next.js 16 App Router** marketing site for Data Consulting Group. React 19, TypeScript strict mode, Tailwind CSS, Framer Motion for animations, shadcn/ui (Radix UI) components.

Path alias: `@/` maps to the repo root.

### Directory layout

- `app/` — App Router pages and one API route (`app/api/contact/route.ts`)
- `components/` — All React components (flat, no subdirectories)
- `lib/` — Shared utilities: `analytics.ts`, `analytics-config.ts`, `site.ts`, `seo.ts`, `services.ts`, `utils.ts` (cn helper)
- `hooks/` — Custom hooks: `use-cookie-consent.ts`, `use-mobile.tsx`, `use-outside-click.tsx`, `use-toast.ts`

### Analytics / Cookie consent

Analytics is intentionally gated behind cookie consent. The flow:

1. `Analytics` component (in `app/layout.tsx`) injects a `beforeInteractive` script that reads stored consent from `localStorage` / cookie (`dcg_cookie_consent`) and sets GA4 Consent Mode defaults — always denying ad storage.
2. `useCookieConsent` hook (`hooks/use-cookie-consent.ts`) manages consent state; `CookieBanner` component calls it.
3. `AnalyticsRouteTracker` (wrapped in `<Suspense>`) fires manual `pageview()` calls on route changes.
4. `lib/analytics.ts` exports `track()`, `pageview()`, and `updateGoogleAnalyticsConsent()`. All functions are no-ops when consent is not `"granted"`.
5. GA measurement ID defaults to `G-T9WH3XWBH5` but can be overridden via any of: `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`, `NEXT_PUBLIC_GTAG_ID`, `GA_ID`, `GOOGLE_ANALYTICS_ID`, `GTAG_ID`.

### Contact form API (`app/api/contact/route.ts`)

- Runs on the Edge runtime.
- Validates with Zod, includes a honeypot field (`website`) for bot detection.
- Sends via [Resend](https://resend.com). Required env: `RESEND_API_KEY`. Optional: `RESEND_FROM`, `RESEND_TO` (default: `info@dataconsulting-group.com`). Falls back to `onboarding@resend.dev` sender if domain is unverified.
- Sends two emails: admin notification + confirmation to the submitter.

### Site config and SEO

- `lib/site.ts` — `siteConfig` object and `getSiteUrl()`. Site URL is read from `NEXT_PUBLIC_SITE_URL`, `SITE_URL`, or `VERCEL_URL`.
- `lib/seo.ts` — per-page metadata helpers.
- `app/layout.tsx` — root metadata, viewport, global CSP headers (set in `next.config.mjs`).

### Security headers

Defined in `next.config.mjs` and applied to all routes: CSP (allows GTM/GA scripts and `unsafe-inline`), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Permissions-Policy` blocking camera/mic/geolocation.

### Build output

`NEXT_DIST_DIR` env var can override the default `.next` output directory (used in CI/deploy scripts).

## Admin panel

`/admin` is a private panel (Google sign-in via Firebase Auth, data in Firestore) for managing job listings,
applications, contact messages and analytics. See `docs/admin-setup.md` for setup and env vars.

- Auth: `lib/auth/` (`requireAdmin()`, `requireOwner()`, `requireAdminApi()`); session cookie issued by `app/api/admin/session/route.ts`. Do not rely on middleware/`proxy.ts` for auth.
- Data: `lib/firestore/rest.ts` is an edge-safe Firestore REST client (service account). `firebase-admin` cannot run on the edge runtime. Security rules are deny-all.
- Jobs: `lib/jobs/` (types are client-safe; `server.ts` is server-only). Public pages `app/careers/page.tsx` and `app/careers/[slug]/page.tsx` read published jobs. `/api/careers/apply` and `/api/contact` persist to Firestore before emailing.
- Analytics: `lib/collect.ts` + `app/api/collect/route.ts` write cookieless daily counters; `lib/analytics/` aggregates them and reads GA4 (optional).
- `/admin` has its own CSP and `no-store`/`noindex` headers in `next.config.mjs`; the marketing chrome and GA are skipped there (`components/SiteChrome.tsx`).
- Every user-supplied URL rendered in admin must go through `lib/safe-url.ts`.
- All new server routes/pages must declare `export const runtime = "edge"`.

## Environment variables

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Required for contact form emails |
| `RESEND_FROM` | Sender address (optional, defaults to Resend onboarding) |
| `RESEND_TO` | Recipient address (optional) |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for metadata |
| `NEXT_PUBLIC_GA_ID` | GA4 measurement ID override |
| `NEXT_PUBLIC_LINKEDIN_URL` | LinkedIn link in footer/social |
| `NEXT_PUBLIC_X_URL` | X/Twitter link in footer/social |
| `FIREBASE_SERVICE_ACCOUNT_JSON` | Admin panel: Firestore service account (secret) |
| `ADMIN_SESSION_SECRET` | Admin panel: signs session cookie (secret) |
| `ADMIN_OWNER_EMAILS` | Admin panel: bootstrap owner emails |
| `GA4_PROPERTY_ID` | Optional: GA4 Data API property for the analytics page |
