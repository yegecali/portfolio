import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ThemeMode = "light" | "dark";

export interface ThemeState {
  mode: ThemeMode;
}

const initialState: ThemeState = {
  mode: (() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem("theme-mode") as ThemeMode | null;
    if (savedTheme) {
      return savedTheme;
    }

    // Check system preference
    if (typeof window !== "undefined" && window.matchMedia) {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      return prefersDark ? "dark" : "light";
    }

    return "light";
  })(),
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
      // Save to localStorage
      localStorage.setItem("theme-mode", action.payload);
      // Log to console
      console.log(`🎨 Tema cambiado a: ${action.payload.toUpperCase()}`);
      // Update document class
      document.documentElement.classList.remove("theme-light", "theme-dark");
      document.documentElement.classList.add(`theme-${action.payload}`);
    },
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      // Save to localStorage
      localStorage.setItem("theme-mode", state.mode);
      // Log to console
      console.log(`🎨 Tema cambiado a: ${state.mode.toUpperCase()}`);
      // Update document class
      document.documentElement.classList.remove("theme-light", "theme-dark");
      document.documentElement.classList.add(`theme-${state.mode}`);
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
