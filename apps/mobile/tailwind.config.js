/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
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
        xs: "8px",
        sm: "12px",
        md: "16px",
        lg: "20px",
        xl: "28px"
      },
      borderRadius: {
        md: "12px",
        lg: "16px",
        xl: "24px"
      },
      boxShadow: {
        card: "0 10px 30px rgba(15, 23, 42, 0.08)"
      }
    }
  },
  plugins: []
};
