# Admin panel setup

The admin panel lives at `/admin`. Google sign-in uses Firebase Auth; data is stored in Firestore.
Everything server-side runs on the **edge runtime** (Cloudflare Pages), so `firebase-admin` is not used.

## 1. Firebase (project `dataconsultinggroup`)
- Authentication → Sign-in method: enable **Google**.
- Authentication → Settings → Authorized domains: production domain, the `*.pages.dev` domain, `localhost`.
- Google Cloud → APIs & Services → Credentials: keep
  `https://dataconsulting-group.com/__/auth/handler` in the OAuth client's authorized redirect URIs.
- Firestore: security rules must stay **deny-all** (`allow read, write: if false`). All access goes through
  server code using a service account; the browser never talks to Firestore.
- Project settings → Service accounts → generate a private key (role: Cloud Datastore User is enough).

## 2. Environment variables (Cloudflare Pages + `.env.local`)
| Variable | Purpose |
|---|---|
| `FIREBASE_SERVICE_ACCOUNT_JSON` | Service account key as one line of JSON. **Secret.** |
| `ADMIN_SESSION_SECRET` | 32+ random chars; signs the admin session cookie. **Secret.** Generate: `openssl rand -base64 48` |
| `ADMIN_OWNER_EMAILS` | Comma-separated Google emails that are always owners (bootstraps the first login). |
| `GA4_PROPERTY_ID` | Optional. Numeric GA4 property id to show Google Analytics data in the panel. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Turnstile site key (public, needed at build time). |
| `TURNSTILE_SECRET_KEY` | Turnstile secret. **Secret.** |
| `CRON_SECRET` | Protects `/api/cron/*`. **Secret.** Must match the GitHub secret. |
| `DIGEST_TO` | Optional. Weekly digest recipient (defaults to `RESEND_TO`). |
| `NEXT_PUBLIC_FIREBASE_*` | Optional overrides; defaults to the public web config in `lib/firebase/config.ts`. |

For GA4 data: enable the *Google Analytics Data API* in the Google Cloud project and add the service account
email as a **Viewer** on the GA4 property.

## 3. How access works
1. `/admin/login` opens the Google popup and sends the Firebase ID token to `POST /api/admin/session`.
2. The server verifies the token (signature, issuer, audience, verified email, Google provider, signed in
   within 5 minutes) and checks the allowlist (`admins/{email}` in Firestore, or `ADMIN_OWNER_EMAILS`).
3. On success it sets an HttpOnly, SameSite=Strict, 8-hour cookie. Every admin page, API route and server
   action calls `requireAdmin()` / `requireOwner()`, which re-checks the allowlist, so removals apply at once.

Roles: **owner** (everything, incl. deleting candidates, the trash and managing admins) and **editor** (jobs,
review applications and messages).

## 4. Data
Collections: `jobs` (document id = URL slug), `applications`, `contactMessages`, `auditLog`, `admins`,
`applicationFiles` (uploaded CVs), `analyticsDaily` (cookieless daily counters written by `/api/collect`).
While `jobs` is empty the public careers page shows the original three roles; use **Jobs → Import** once.

## 5. Abuse protection
- **Cloudflare Turnstile** is on the careers apply form and the contact form. Create/rotate keys in the Cloudflare
  dashboard → Turnstile (widget "DCG website forms"). Set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (it is baked in at build
  time) and `TURNSTILE_SECRET_KEY`. If the secret is missing the check is skipped with a warning; once set, it fails closed.
- **Cloudflare rate-limiting rule** (zone `dataconsulting-group.com`): max 3 POSTs per 10 s per IP to
  `/api/careers/apply` and `/api/contact` (Free plan limits: one rule, 10 s window).
- **In-app limits** (Firestore counters): 5 submissions per hour per visitor and 400 per day overall, per form; 12 admin
  sign-in attempts per 10 minutes per address. Add a Firestore TTL policy on `rateLimits.expireAt` and
  `analyticsVisitors.expireAt` (optional; the daily maintenance job also deletes them):
  `gcloud firestore fields ttls update expireAt --collection-group=rateLimits --enable-ttl --project=dataconsultinggroup`
- Repeated denied admin sign-ins (3 in an hour from one address) email the owners. Every login, denial and logout is in
  the audit log. "Sign out everywhere" (user menu, or per admin in Settings) invalidates all earlier sessions.

## 6. Scheduled jobs (weekly digest + daily maintenance)
Cloudflare Pages has no cron, so `.github/workflows/scheduled-jobs.yml` calls `POST /api/cron/digest` (Mondays 07:00 UTC)
and `POST /api/cron/maintenance` (daily 03:15 UTC) with `Authorization: Bearer $CRON_SECRET`.
1. Set `CRON_SECRET` (32+ random characters) in Cloudflare Pages, and the same value as a GitHub repository secret.
2. Add the GitHub repository secret `SITE_URL` (e.g. `https://dataconsulting-group.com`).
3. Optional: `DIGEST_TO` (defaults to `RESEND_TO`). Settings → Scheduled jobs has buttons to test both by hand.
Maintenance merges analytics shards, deletes expired visitor records, rate-limit counters and trash (30 days), purges
rejected applications older than 12 months, and archives jobs past their closing date.

## 7. Analytics
- Cookieless and first-party: no cookies, no device storage, no raw IP or user agent stored. Unique visitors are a daily
  salted hash (a person gets a new id every day; records are deleted after 2 days). Do Not Track and Global Privacy
  Control are honoured. Mention this in the privacy policy and have it reviewed.
- Campaign names must be listed in Settings → Tracked campaigns to appear by name (anything else is grouped as "other").
- Local development writes to separate `analyticsDev*` collections, so it never mixes with real data.
- Google Analytics tab: enable the *Google Analytics Data API* and *Admin API* for the Cloud project, add the service
  account email as a **Viewer** on the GA4 property, then set `GA4_PROPERTY_ID` (the numeric property id).

## 8. Deployment notes (Cloudflare Pages + next-on-pages)
- Every dynamic route must declare `export const runtime = "edge"`; next-on-pages fails the build otherwise (this is what
  broke the first admin deploy: `/sitemap.xml` was missing it).
- CVs are stored in Firestore (`applicationFiles`, up to 900 KB, PDF/DOCX validated by content). For larger files, move
  them to a bucket behind the helpers in `lib/inbox/server.ts`.
