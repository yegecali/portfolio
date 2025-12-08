import { createContext, useContext, type ReactNode } from "react";
import { lightTheme, darkTheme } from "../styles/theme";
import { useTheme as useThemeHook, type ThemeMode } from "../hooks/useTheme";

export interface ThemeContextType {
  theme: typeof lightTheme | typeof darkTheme;
  themeMode: ThemeMode;
  toggleTheme: () => void;
  isDark: boolean;
  isLight: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const themeValues = useThemeHook();

  return (
    <ThemeContext.Provider value={themeValues}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within ThemeProvider");
  }
  return context;
}
