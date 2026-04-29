"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/store/useAuthStore";

type AuthWatcherMode = "auth" | "protected";

export const ProtectedAuthWatcher = ({
  children,
  mode,
}: {
  mode: AuthWatcherMode;
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const status = useAuthStore((s) => s.status);
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    if (status === "loading") return;

    if (mode === "protected" && status === "guest") {
      router.replace("/login");
    }

    if (mode === "auth" && status === "authenticated") {
      router.replace("/profile");
    }
  }, [status, router, mode]);

  if (status === "loading") return null;

  if (mode === "protected" && !user) return null;

  if (mode === "auth" && user) return null;

  return children;
};
