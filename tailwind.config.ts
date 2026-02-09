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
        sans: ['Instrument Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      fontSize: {
        /* Headings - 粗體、緊湊行高 */
        'h1': ['24px', { lineHeight: '32px', letterSpacing: '-0.02em' }],
        'h2': ['20px', { lineHeight: '28px', letterSpacing: '-0.01em' }],
        'h3': ['18px', { lineHeight: '28px' }],
        'h4': ['14px', { lineHeight: '20px' }],
        /* Body - 基準字體、舒適行高 */
        'body-large': ['16px', { lineHeight: '24px' }],
        'body-base': ['14px', { lineHeight: '20px' }],
        'body-small': ['12px', { lineHeight: '16px' }],
        /* Detail / Label */
        'detail': ['10px', { lineHeight: '15px' }],
      },
      colors: {
        nitra: {
          primary: colors.primary,
          'primary-dark': colors.primaryDark,
          'primary-darker': colors.primaryDarker,
          'primary-tint': colors.primaryTint,
          'highlight-bg': colors.highlightBg,
          'highlight-border': colors.highlightBorder,
          'bg-new': colors.bgNewTheme,
          'table-header': colors.tableHeader,
          'row-hover': colors.rowHoverCurrent,
          success: colors.success,
          'success-bg': colors.successBg,
          error: colors.error,
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
