// Shared theme values (used by both light and dark)
const sharedTheme = {
  primary: "#667eea",
  secondary: "#764ba2",
  success: "#10b981",
  error: "#ef4444",
  warning: "#f59e0b",
  info: "#3b82f6",
  transitions: {
    fast: "0.2s ease",
    base: "0.3s ease",
    smooth: "0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  },
  borderRadius: {
    sm: "6px",
    md: "10px",
    lg: "16px",
    full: "50%",
  },
  spacing: {
    xs: "0.5rem",
    sm: "1rem",
    md: "1.5rem",
    lg: "2rem",
    xl: "3rem",
    xxl: "4rem",
  },
  breakpoints: {
    mobile: "480px",
    tablet: "768px",
    desktop: "1024px",
    wide: "1440px",
  },
};

// Light Theme
export const lightTheme = {
  ...sharedTheme,
  mode: "light" as const,
  colors: {
    primary: sharedTheme.primary,
    secondary: sharedTheme.secondary,
    success: sharedTheme.success,
    error: sharedTheme.error,
    warning: sharedTheme.warning,
    info: sharedTheme.info,
    gradient: {
      primary: "linear-gradient(135deg, #667eea, #764ba2)",
      light: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
      dark: "linear-gradient(135deg, #667eea, #764ba2)",
      section: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    },
    text: {
      primary: "#1a202c",
      secondary: "#4a5568",
      tertiary: "#a0aec0",
      muted: "#cbd5e0",
      inverse: "#ffffff",
    },
    background: {
      primary: "#ffffff",
      secondary: "#f7fafc",
      tertiary: "#e2e8f0",
      light: "#f5f7fa",
    },
    border: {
      light: "#e2e8f0",
      medium: "#cbd5e0",
      dark: "#a0aec0",
    },
    input: {
      background: "#f7fafc",
      border: "#e2e8f0",
      text: "#1a202c",
      placeholder: "#a0aec0",
    },
  },
  shadows: {
    xs: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    sm: "0 4px 6px rgba(0, 0, 0, 0.07)",
    md: "0 10px 30px rgba(0, 0, 0, 0.1)",
    lg: "0 20px 50px rgba(0, 0, 0, 0.15)",
    xl: "0 25px 50px rgba(0, 0, 0, 0.2)",
    primary: "0 8px 20px rgba(102, 126, 234, 0.3)",
    hover: "0 12px 30px rgba(102, 126, 234, 0.4)",
  },
};

// Dark Theme
export const darkTheme = {
  ...sharedTheme,
  mode: "dark" as const,
  colors: {
    primary: sharedTheme.primary,
    secondary: sharedTheme.secondary,
    success: sharedTheme.success,
    error: sharedTheme.error,
    warning: sharedTheme.warning,
    info: sharedTheme.info,
    gradient: {
      primary: "linear-gradient(135deg, #667eea, #764ba2)",
      light: "linear-gradient(135deg, #1e293b, #0f172a)",
      dark: "linear-gradient(135deg, #0f172a, #1a1f3a)",
      section: "linear-gradient(135deg, #0f172a 0%, #1a1f3a 100%)",
    },
    text: {
      primary: "#f1f5f9",
      secondary: "#cbd5e0",
      tertiary: "#94a3b8",
      muted: "#64748b",
      inverse: "#1a202c",
    },
    background: {
      primary: "#0f172a",
      secondary: "#1a1f3a",
      tertiary: "#334155",
      light: "#1e293b",
    },
    border: {
      light: "#334155",
      medium: "#475569",
      dark: "#64748b",
    },
    input: {
      background: "#1e293b",
      border: "#334155",
      text: "#f1f5f9",
      placeholder: "#94a3b8",
    },
  },
  shadows: {
    xs: "0 1px 2px 0 rgba(0, 0, 0, 0.3)",
    sm: "0 4px 6px rgba(0, 0, 0, 0.3)",
    md: "0 10px 30px rgba(0, 0, 0, 0.4)",
    lg: "0 20px 50px rgba(0, 0, 0, 0.5)",
    xl: "0 25px 50px rgba(0, 0, 0, 0.6)",
    primary: "0 8px 20px rgba(102, 126, 234, 0.4)",
    hover: "0 12px 30px rgba(102, 126, 234, 0.5)",
  },
};

// Default theme (light)
export const theme = lightTheme;

export type Theme = typeof lightTheme;
