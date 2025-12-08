import { type ReactNode, useEffect } from "react";
import { ThemeContext } from "./themeContext";
import { useTheme } from "../hooks/useTheme";

export function ThemeProviderComponent({ children }: { children: ReactNode }) {
  const themeValues = useTheme();

  // Initialize document class on mount
  useEffect(() => {
    document.documentElement.classList.add(`theme-${themeValues.themeMode}`);
  }, [themeValues.themeMode]);

  return (
    <ThemeContext.Provider value={themeValues}>
      {children}
    </ThemeContext.Provider>
  );
}
