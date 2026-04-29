import { ProtectedAuthWatcher } from "@/src/components/protected-auth-watcher/ProtectedAuthWatcher";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthLayout({
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
