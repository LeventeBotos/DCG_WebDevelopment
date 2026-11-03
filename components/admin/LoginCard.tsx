"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { Eye, EyeOff } from "lucide-react";
import { getFirebaseAuth } from "@/lib/firebase/client";

const fieldClass =
  "h-14 w-full rounded-2xl bg-white/[0.06] px-5 text-[15px] text-white placeholder:text-neutral-500 outline-none ring-1 ring-transparent transition focus:ring-[#00cacc]/70 disabled:opacity-50";

function GoogleMark() {
  return (
    <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden>
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.800 2.400 30.300 0 24 0 14.600 0 6.500 5.400 2.600 13.200l7.900 6.100C12.400 13.600 17.700 9.500 24 9.500z" />
      <path fill="#4285F4" d="M46.500 24.500c0-1.600-.1-3.100-.4-4.500H24v9h12.700c-.6 3-2.300 5.500-4.800 7.200l7.500 5.800c4.400-4.100 7.100-10.100 7.100-17.500z" />
      <path fill="#FBBC05" d="M10.500 28.700A14.500 14.500 0 0 1 9.500 24c0-1.600.3-3.200.8-4.700l-7.900-6.100A24 24 0 0 0 0 24c0 3.900.9 7.500 2.600 10.800l7.900-6.100z" />
      <path fill="#34A853" d="M24 48c6.500 0 11.900-2.100 15.900-5.800l-7.500-5.800c-2.100 1.400-4.800 2.300-8.400 2.300-6.300 0-11.600-4.100-13.500-9.800l-7.900 6.100C6.500 42.600 14.600 48 24 48z" />
    </svg>
  );
}

export default function LoginCard({ initialError }: { initialError?: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState<"google" | "password" | "reset" | null>(null);
  const [error, setError] = useState<string | undefined>(initialError);
  const [notice, setNotice] = useState<string | undefined>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  /** Swap a Firebase ID token for our own session cookie, then enter the panel. */
  async function finish(idToken: string): Promise<boolean> {
    const res = await fetch("/api/admin/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });
    if (!res.ok) {
      setError(
        res.status === 403
          ? "This account is not authorised for the admin panel."
          : res.status === 429
            ? "Too many attempts. Wait a few minutes and try again."
            : "Sign-in failed. Try again.",
      );
      return false;
    }
    router.replace("/admin");
    router.refresh();
    return true;
  }

  async function run(kind: "google" | "password") {
    setBusy(kind);
    setError(undefined);
    setNotice(undefined);
    const auth = getFirebaseAuth();
    try {
      let credential;
      if (kind === "google") {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: "select_account" });
        credential = await signInWithPopup(auth, provider);
      } else {
        credential = await signInWithEmailAndPassword(auth, email.trim(), password);
      }
      await finish(await credential.user.getIdToken(true));
    } catch (e) {
      const code = (e as { code?: string }).code ?? "";
      if (code === "auth/popup-closed-by-user" || code === "auth/cancelled-popup-request") return;
      if (code === "auth/operation-not-allowed") setError("Email sign-in is not enabled for this project yet.");
      else if (code === "auth/too-many-requests") setError("Too many attempts. Wait a few minutes and try again.");
      else if (kind === "password" && code.startsWith("auth/")) setError("Incorrect email or password.");
      else setError("Sign-in failed. Try again.");
    } finally {
      // The ID token is only needed once; drop the browser-side Firebase session.
      await signOut(auth).catch(() => undefined);
      setBusy(null);
    }
  }

  async function reset() {
    setError(undefined);
    setNotice(undefined);
    if (!email.trim()) {
      setError("Enter your email above, then select Forgot password.");
      return;
    }
    setBusy("reset");
    await sendPasswordResetEmail(getFirebaseAuth(), email.trim()).catch(() => undefined);
    // Same message whether or not the account exists, so emails cannot be enumerated.
    setNotice("If an account exists for that email, a reset link is on its way.");
    setBusy(null);
  }

  return (
    <div className="w-full max-w-[420px]">
      <h1 className="text-center text-3xl font-semibold tracking-tight text-white">Sign in to DCG Admin</h1>
      <p className="mt-3 text-center text-[15px] text-neutral-400">Use your authorised account to continue.</p>

      <button
        type="button"
        onClick={() => run("google")}
        disabled={busy !== null}
        className="mt-10 flex h-14 w-full items-center justify-center gap-3 rounded-2xl border border-white/15 text-[15px] font-medium text-white transition hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00cacc]/70 disabled:opacity-50"
      >
        <GoogleMark />
        {busy === "google" ? "Signing in…" : "Continue with Google"}
      </button>

      <div className="my-8 flex items-center gap-4 text-sm text-neutral-500" role="separator">
        <span className="h-px flex-1 bg-white/10" />
        Or
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          void run("password");
        }}
        className="space-y-5"
      >
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-white">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@dataconsulting-group.com"
            className={fieldClass}
          />
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium text-white">
              Password
            </label>
            <button
              type="button"
              onClick={reset}
              disabled={busy !== null}
              className="text-sm text-neutral-400 transition hover:text-white disabled:opacity-50"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <input
              id="password"
              type={show ? "text" : "password"}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className={`${fieldClass} pr-14`}
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              aria-label={show ? "Hide password" : "Show password"}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 transition hover:text-white"
            >
              {show ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={busy !== null}
          className="h-14 w-full rounded-2xl bg-white text-[15px] font-semibold text-black transition hover:bg-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00cacc] focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:opacity-60"
        >
          {busy === "password" ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <p role="alert" aria-live="polite" className="mt-5 min-h-5 text-center text-sm text-red-400">
        {error}
      </p>
      {notice && <p className="text-center text-sm text-[#00cacc]">{notice}</p>}
    </div>
  );
}
