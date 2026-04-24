"use client";

import { MoonStarIcon, SunIcon } from "lucide-react";
import { useThemeStore } from "@/src/store/useThemeStore";
import { Button } from "../button/Button";

export const ThemeSwitcher = () => {
  const initialized = useThemeStore((state) => state.initialized);
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  if (!initialized) {
    return null;
  }

  const isDark = theme === "dark";
  const nextTheme = isDark ? "light" : "dark";

  return (
    <Button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme} theme`}
      className="border-0!"
    >
      {isDark ? <SunIcon /> : <MoonStarIcon />}
    </Button>
  );
};
