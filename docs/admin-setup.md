# Admin panel setup

The admin panel lives at `/admin`. Google sign-in uses Firebase Auth; data is stored in Firestore.
Everything server-side runs on the **edge runtime** (Cloudflare Pages), so `firebase-admin` is not used.

## 1. Firebase (project `dataconsultinggroup`)
- Authentication → Sign-in method: enable **Google**.
- Authentication → Settings → Authorized domains: production domain, the `*.pages.dev` domain, `localhost`.
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
| `NEXT_PUBLIC_FIREBASE_*` | Optional overrides; defaults to the public web config in `lib/firebase/config.ts`. |

For GA4 data: enable the *Google Analytics Data API* in the Google Cloud project and add the service account
email as a **Viewer** on the GA4 property.

## 3. How access works
1. `/admin/login` opens the Google popup and sends the Firebase ID token to `POST /api/admin/session`.
2. The server verifies the token (signature, issuer, audience, verified email, Google provider, signed in
   within 5 minutes) and checks the allowlist (`admins/{email}` in Firestore, or `ADMIN_OWNER_EMAILS`).
3. On success it sets an HttpOnly, SameSite=Strict, 8-hour cookie. Every admin page, API route and server
   action calls `requireAdmin()` / `requireOwner()`, which re-checks the allowlist, so removals apply at once.

Roles: **owner** (everything, incl. deleting candidates, exports, managing admins) and **editor** (jobs,
review applications and messages).

## 4. Data
Collections: `jobs` (document id = URL slug), `applications`, `contactMessages`, `auditLog`, `admins`,
`applicationFiles` (uploaded CVs), `analyticsDaily` (cookieless daily counters written by `/api/collect`).
While `jobs` is empty the public careers page shows the original three roles; use **Jobs → Import** once.

## 5. Not done yet / recommended
- **Turnstile** on `/api/careers/apply` and `/api/contact` (currently honeypot only) plus a Cloudflare
  rate-limiting rule.
- **CV storage**: uploads (PDF/DOCX, up to 900 KB) are stored in Firestore (`applicationFiles`, raw bytes) and are
  only downloadable through the authenticated admin route. To allow larger files, move them to a Storage bucket
  (Firebase Storage needs the Blaze plan; R2 needs an API token) behind the same `lib/inbox/server.ts` helpers.
- **Firestore backups** (scheduled export / point-in-time recovery) and a TTL policy if raw events are added.
- Update the privacy policy to mention first-party cookieless counters and stored applications; have it
  reviewed. Rejected applications can be purged from the Applications page (owner only).
- Optional outer layer: Cloudflare Access on `/admin*`.
