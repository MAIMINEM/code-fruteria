import { create } from "zustand";
import { THEME_KEY } from "../constants/constants";

export type ThemeType = "light" | "dark";

interface ThemeState {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => {
  const defaultTheme: ThemeType = "light";
  const storedTheme = localStorage.getItem("theme") as ThemeType | null;
  // if storedTheme is null, apply default theme, otherwise using stored theme.
  const theme: ThemeType = storedTheme ?? defaultTheme;

  document.body.classList.remove("theme-light", "theme-dark");
  document.body.classList.add(`theme-${theme}`);

  return {
    theme,

    setTheme: (theme) => {
      document.body.classList.remove("theme-light", "theme-dark");
      document.body.classList.add(`theme-${theme}`);
      localStorage.setItem(THEME_KEY, theme);
      set({ theme });
    },

    toggleTheme: () =>
      set((state) => {
        const next = state.theme === "dark" ? "light" : "dark";
        document.body.classList.remove("theme-light", "theme-dark");
        document.body.classList.add(`theme-${next}`);
        localStorage.setItem(THEME_KEY, next);
        return { theme: next };
      }),
  };
});
