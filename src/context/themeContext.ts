import { createContext } from "react";
import { lightTheme, darkTheme } from "../styles/theme";
import type { ThemeMode } from "../hooks/useTheme";

export interface ThemeContextType {
  theme: typeof lightTheme | typeof darkTheme;
  themeMode: ThemeMode;
  toggleTheme: () => void;
  isDark: boolean;
  isLight: boolean;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
