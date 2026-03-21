import React, { createContext, useLayoutEffect, useState } from "react";

type ThemeType = "light" | "dark";

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: (newTheme?: ThemeType) => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getInitialTheme(): ThemeType {
  const storedTheme = localStorage.getItem("theme") as ThemeType | null;
  if (storedTheme) {
    return storedTheme;
  }
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
}

function applyTheme(theme: ThemeType) {
  const html = document.documentElement;

  // Add transition class
  html.classList.add("theme-transitioning");

  // Apply theme
  if (theme === "dark") {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }

  // Remove transition class after animation completes
  setTimeout(() => {
    html.classList.remove("theme-transitioning");
  }, 600);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeType>(getInitialTheme());

  useLayoutEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = (newTheme?: ThemeType) => {
    const nextTheme = newTheme || (theme === "dark" ? "light" : "dark");
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted: true }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext };
