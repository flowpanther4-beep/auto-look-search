export const theme = {
  colors: {
    background: "#f7f8fb",
    card: "#ffffff",
    text: "#0f172a",
    muted: "#64748b",
    border: "#e2e8f0",
    primary: "#0f172a",
    success: "#16a34a",
    warning: "#f59e0b"
  },
  spacing: {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 28
  },
  radius: {
    md: 12,
    lg: 16,
    xl: 24
  }
} as const;

export type Theme = typeof theme;
