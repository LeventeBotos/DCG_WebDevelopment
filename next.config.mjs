import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = process.env.NEXT_DIST_DIR;
// React dev mode needs eval() for debugging features (callstack reconstruction).
const isDev = process.env.NODE_ENV !== "production";
// The Vercel toolbar/comments widget loads from vercel.live; allow it on any Vercel build
// (VERCEL is set automatically there) but not on other hosts such as Firebase.
const isVercel = Boolean(process.env.VERCEL);
const vercelLive = isVercel ? " https://vercel.live" : "";
const firebaseAuthDomain = "dataconsultinggroup.firebaseapp.com";

/**
 * Public-site CSP. The admin panel gets its own (see below) because Google sign-in needs extra origins that
 * the marketing site must not allow. Browsers enforce multiple CSP headers as an intersection, so the two
 * header rules in headers() are mutually exclusive by path.
 */
function buildCsp({ admin }) {
  const scripts = admin
    ? `'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://apis.google.com`
    : `'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://static.cloudflareinsights.com https://challenges.cloudflare.com${vercelLive}`;
  const connect = admin
    ? `'self' https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://www.googleapis.com https://${firebaseAuthDomain}`
    : `'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://cloudflareinsights.com https://challenges.cloudflare.com${isVercel ? " https://vercel.live wss://ws-us3.pusher.com" : ""}`;
  const frames = admin ? `'self' https://${firebaseAuthDomain} https://accounts.google.com` : `'self' https://challenges.cloudflare.com${vercelLive}`;

  return [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    `script-src ${scripts}`,
    `style-src 'self' 'unsafe-inline'${vercelLive}`,
    "img-src 'self' data: blob: https:",
    `font-src 'self' data:${vercelLive}`,
    `connect-src ${connect}`,
    "media-src 'self' blob:",
    `frame-src ${frames}`,
    "worker-src 'self' blob:",
    // Safari applies this to http://localhost too, which breaks every asset in dev.
    ...(isDev ? [] : ["upgrade-insecure-requests"]),
  ]
    .join("; ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

const commonSecurityHeaders = [
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(distDir ? { distDir } : {}),
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  turbopack: {
    root: __dirname,
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "@tabler/icons-react"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.pngplay.com",
      },
      {
        protocol: "https",
        hostname: "1000logos.net",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
    ],
  },
  // Serve Firebase's auth helper pages from our own origin so signInWithRedirect works in browsers that
  // partition third-party storage (Safari, Chrome). Client authDomain is set to the current host.
  async rewrites() {
    return [
      { source: "/__/auth/:path*", destination: `https://${firebaseAuthDomain}/__/auth/:path*` },
      { source: "/__/firebase/:path*", destination: `https://${firebaseAuthDomain}/__/firebase/:path*` },
    ];
  },
  async headers() {
    return [
      {
        // Everything except /admin (negative lookahead keeps the two CSP headers from stacking).
        source: "/((?!admin|__/auth).*)",
        headers: [
          ...commonSecurityHeaders,
          { key: "Content-Security-Policy", value: buildCsp({ admin: false }) },
        ],
      },
      {
        // The auth helper iframe is embedded by our own login page.
        source: "/__/auth/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Cache-Control", value: "no-store, max-age=0" },
        ],
      },
      {
        source: "/admin/:path*",
        headers: [
          ...commonSecurityHeaders,
          { key: "Content-Security-Policy", value: buildCsp({ admin: true }) },
          { key: "Cache-Control", value: "no-store, max-age=0" },
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
        ],
      },
      {
        source: "/api/admin/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, max-age=0" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },
};

export default nextConfig;
