"use client";

import { useEffect, useEffectEvent } from "react";
import { useThemeStore } from "@/src/store/useThemeStore";
import { getStoredTheme } from "./utils/theme";

export const ThemeProvider = () => {
  const initializeTheme = useThemeStore((state) => state.initializeTheme);

  const handleSystemThemeChange = useEffectEvent(() => {
    if (getStoredTheme() !== null) {
      return;
    }

    initializeTheme();
  });

  useEffect(() => {
    initializeTheme();

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, [initializeTheme]);

  return null;
};
