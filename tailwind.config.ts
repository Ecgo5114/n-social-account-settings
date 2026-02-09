import type { Config } from "tailwindcss";
import { colors, radius, shadows } from "./app/constants/design-tokens";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        nunito: ['Nunito Sans', 'sans-serif'],
        varela: ['Varela Round', 'sans-serif'],
      },
      colors: {
        nitra: {
          primary: colors.primary,
          'primary-dark': colors.primaryDark,
          'primary-tint': colors.primaryTint,
          'highlight-bg': colors.highlightBg,
          'highlight-border': colors.highlightBorder,
          'bg-new': colors.bgNewTheme,
          'table-header': colors.tableHeader,
        },
      },
      borderRadius: {
        'nitra-card': radius.card,
      },
      boxShadow: {
        'nitra-card': shadows.cardNew,
      },
    },
  },
  plugins: [],
};
export default config;
