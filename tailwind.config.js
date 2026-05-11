/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
        ],
      },
      colors: {
        navy: {
          DEFAULT: "#171A4A",
          deep: "#20245F",
        },
        brand: {
          orange: "#FF8A00",
          orangeDeep: "#FFB15C",
        },
        surface: {
          light: "#F6F7FB",
          alt: "#F6F3FF",
        },
        card: "#FFFFFF",
        muted: "#737795",
        line: "#E7E8F1",
        lavender: {
          DEFAULT: "#EFEDFF",
          soft: "#F6F3FF",
        },
        success: {
          DEFAULT: "#2EB85C",
          soft: "#EAF8F0",
        },
        warning: {
          DEFAULT: "#FF8A00",
          bg: "#FFF4E8",
        },
        danger: "#E04F5F",
      },
      boxShadow: {
        soft: "0 8px 32px rgba(23, 26, 74, 0.12)",
        card: "0 4px 24px rgba(23, 26, 74, 0.08)",
      },
      borderRadius: {
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
