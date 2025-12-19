import { create } from "zustand";

type Theme = "light" | "dark";

interface ThemeStore {
  theme: Theme;
  toggleTheme: () => void;
}

const loadThemeFromLocalStorage = (): Theme => {
  if (typeof window === "undefined") 
    return "light";
  
  try {
    const item = window.localStorage.getItem("theme");
    return item === "dark" ? "dark" : "light";
  } catch (error) {
    console.error("Error loading theme from localStorage:", error);
    return "light";
  }
};

const saveThemeToLocalStorage = (theme: Theme) => {
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem("theme", theme);
    } catch (error) {
      console.error("Error saving theme to localStorage:", error);
    }
  }
};

const applyThemeToDocument = (theme: Theme) => {
  if (typeof window !== "undefined") {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }
};

const initialTheme = loadThemeFromLocalStorage();
applyThemeToDocument(initialTheme);

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: initialTheme,
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      saveThemeToLocalStorage(newTheme);
      applyThemeToDocument(newTheme);
      return { theme: newTheme };
    }),
}));
