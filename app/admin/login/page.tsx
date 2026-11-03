import { redirect } from "next/navigation";
import { getAdmin } from "@/lib/auth/require-admin";
import LoginCard from "@/components/admin/LoginCard";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  // Already signed in as an admin? Skip the login screen.
  if (await getAdmin().catch(() => null)) redirect("/admin");
  const { error } = await searchParams;

  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden bg-neutral-950 p-4">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(0,202,202,0.18),transparent_70%)]"
      />
      <LoginCard initialError={error === "denied" ? "This Google account is not authorised." : undefined} />
    </div>
  );
}
