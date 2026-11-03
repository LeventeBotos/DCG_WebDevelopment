"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getFirebaseAuth } from "@/lib/firebase/client";

export default function LoginCard({ initialError }: { initialError?: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | undefined>(initialError);

  async function signIn() {
    setBusy(true);
    setError(undefined);
    const auth = getFirebaseAuth();
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const credential = await signInWithPopup(auth, provider);
      const idToken = await credential.user.getIdToken(true);

      const res = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });
      if (!res.ok) {
        setError(
          res.status === 403
            ? "This Google account is not authorised for the admin panel."
            : "Sign-in failed. Please try again.",
        );
        return;
      }
      router.replace("/admin");
      router.refresh();
    } catch (e) {
      const code = (e as { code?: string }).code;
      if (code !== "auth/popup-closed-by-user" && code !== "auth/cancelled-popup-request") {
        setError("Sign-in failed. Please try again.");
      }
    } finally {
      // We only needed the ID token once; drop the browser-side Firebase session.
      await signOut(auth).catch(() => undefined);
      setBusy(false);
    }
  }

  return (
    <div className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center shadow-2xl backdrop-blur">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white">
        <ShieldCheck className="h-6 w-6" aria-hidden />
      </div>
      <h1 className="mt-5 text-xl font-semibold text-white">DCG Admin</h1>
      <p className="mt-1 text-sm text-neutral-400">Sign in with your authorised Google account.</p>

      <Button
        type="button"
        variant="primary"
        size="lg"
        showArrow={false}
        onClick={signIn}
        disabled={busy}
        className="mt-6 w-full"
      >
        {busy ? "Signing in…" : "Continue with Google"}
      </Button>

      <p role="alert" aria-live="polite" className="mt-4 min-h-5 text-sm text-red-400">
        {error}
      </p>
    </div>
  );
}
