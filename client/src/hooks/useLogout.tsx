"use client";

import { useAuthStore } from "@/src/store/useAuthStore";
import { useRouter } from "next/navigation";
import { handleLogoutService } from "@/src/services/users/logout/logout.service";

export const useLogout = () => {
  const setUser = useAuthStore((s) => s.setUser);
  const router = useRouter();

  const logout = async () => {
    try {
      await handleLogoutService();
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      setUser(null); // update UI immediately
      router.replace("/login");
    }
  };

  return { logout };
};
