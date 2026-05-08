import { ProtectedAuthWatcher } from "@/src/components/protected-auth-watcher/ProtectedAuthWatcher";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedAuthWatcher mode="auth">{children}</ProtectedAuthWatcher>;
}
