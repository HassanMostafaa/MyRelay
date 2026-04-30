import { ProtectedAuthWatcher } from "@/src/components/protected-auth-watcher/ProtectedAuthWatcher";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function AuthLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (token) {
    redirect("/profile");
  }

  return <ProtectedAuthWatcher mode="auth">{children}</ProtectedAuthWatcher>;
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={null}>
      <AuthLayoutContent>{children}</AuthLayoutContent>
    </Suspense>
  );
}
