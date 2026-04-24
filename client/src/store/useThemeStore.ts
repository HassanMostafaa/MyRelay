"use client";

import { create } from "zustand";
import {
  applyTheme,
  getPreferredTheme,
  setStoredTheme,
  type Theme,
} from "@/src/components/theme-switcher/utils/theme";

type ThemeState = {
  initialized: boolean;
  theme: Theme;
  initializeTheme: () => void;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: "light",
  initialized: false,
  initializeTheme: () => {
    const theme = getPreferredTheme();

    applyTheme(theme);
    set({ initialized: true, theme });
  },
  setTheme: (theme) => {
    setStoredTheme(theme);
    applyTheme(theme);
    set({ initialized: true, theme });
  },
  toggleTheme: () => {
    const nextTheme = get().theme === "dark" ? "light" : "dark";

    get().setTheme(nextTheme);
  },
}));
