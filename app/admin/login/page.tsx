import { redirect } from "next/navigation";
import { getAdmin } from "@/lib/auth/require-admin";
import LoginCard from "@/components/admin/LoginCard";
import LoginArt from "@/components/admin/LoginArt";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  // Already signed in as an admin? Skip the login screen.
  if (await getAdmin().catch(() => null)) redirect("/admin");
  const { error } = await searchParams;

  return (
    <div className="grid min-h-screen bg-black lg:grid-cols-[1.05fr_1fr]">
      <div className="relative hidden lg:block">
        <LoginArt />
      </div>
      <main className="flex items-center justify-center px-6 py-16">
        <LoginCard initialError={error === "denied" ? "This account is not authorised for the admin panel." : undefined} />
      </main>
    </div>
  );
}
