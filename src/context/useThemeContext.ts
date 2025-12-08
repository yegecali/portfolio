import { useContext } from "react";
import { ThemeContext } from "./themeContext";
import type { ThemeContextType } from "./themeContext";

export function useThemeContext(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "useThemeContext must be used within ThemeProviderComponent"
    );
  }
  return context;
}
