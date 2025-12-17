export const theme = {
  colors: {
    background: "#f4f6fb",
    card: "#ffffff",
    text: "#0b1535",
    muted: "#6b7280",
    border: "#e5e7eb",
    primary: "#0f256e",
    accent: "#1d4ed8",
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
