"use client";

import { useLayoutEffect } from "react";
import { useAuthStore } from "@/src/store/useAuthStore";
import { getMeService } from "@/src/services/users/me/me.service";

export const AuthInit = () => {
  const setUser = useAuthStore((s) => s.setUser);
  // const user = useAuthStore((s) => s.user);

  useLayoutEffect(() => {
    const init = async () => {
      try {
        const res = await getMeService();

        if (!res || (res?.status === "error" && !res?.data)) {
          setUser(null);

          return;
        }

        setUser(res.data);
      } catch {
        setUser(null);
      }
    };

    init();
  }, [setUser]);

  return null;
};
