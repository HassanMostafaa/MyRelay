export const THEME_STORAGE_KEY = "myrelay-theme";

export type Theme = "light" | "dark";

const isTheme = (value: string | null): value is Theme => {
  return value === "light" || value === "dark";
};

export const getStoredTheme = (): Theme | null => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(storedTheme) ? storedTheme : null;
  } catch {
    return null;
  }
};

export const getSystemTheme = (): Theme => {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const getPreferredTheme = (): Theme => {
  return getStoredTheme() ?? getSystemTheme();
};

export const setStoredTheme = (theme: Theme) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {}
};

export const applyTheme = (theme: Theme) => {
  if (typeof document === "undefined") {
    return;
  }

  const root = document.documentElement;

  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
  root.dataset.theme = theme;
};

export const getThemeScript = () => {
  return `
    (() => {
      const root = document.documentElement;
      const storageKey = ${JSON.stringify(THEME_STORAGE_KEY)};

      let theme = "light";

      try {
        const storedTheme = window.localStorage.getItem(storageKey);

        theme =
          storedTheme === "light" || storedTheme === "dark"
            ? storedTheme
            : window.matchMedia("(prefers-color-scheme: dark)").matches
              ? "dark"
              : "light";
      } catch {
        theme = window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      }

      root.classList.toggle("dark", theme === "dark");
      root.style.colorScheme = theme;
      root.dataset.theme = theme;
    })();
  `;
};
