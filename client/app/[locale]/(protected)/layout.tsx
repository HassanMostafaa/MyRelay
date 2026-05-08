import { ProtectedAuthWatcher } from "@/src/components/protected-auth-watcher/ProtectedAuthWatcher";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedAuthWatcher mode="protected">{children}</ProtectedAuthWatcher>;
}
