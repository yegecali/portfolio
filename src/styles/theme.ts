export const theme = {
  colors: {
    primary: "#667eea",
    secondary: "#764ba2",
    gradient: {
      primary: "linear-gradient(135deg, #667eea, #764ba2)",
      light: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
      dark: "linear-gradient(135deg, #1a1f3a, #16213e)",
    },
    text: {
      dark: "#1a202c",
      light: "#4a5568",
      muted: "rgba(255, 255, 255, 0.75)",
    },
    background: {
      light: "#f5f7fa",
      white: "#ffffff",
      dark: "#0f172a",
    },
    border: "#e2e8f0",
    success: "#2ecc71",
    error: "#ef4444",
  },
  shadows: {
    sm: "0 4px 6px rgba(0, 0, 0, 0.07)",
    md: "0 10px 30px rgba(0, 0, 0, 0.1)",
    lg: "0 20px 50px rgba(0, 0, 0, 0.2)",
    primary: "0 8px 20px rgba(102, 126, 234, 0.3)",
    hover: "0 12px 30px rgba(102, 126, 234, 0.4)",
  },
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

export type Theme = typeof theme;
