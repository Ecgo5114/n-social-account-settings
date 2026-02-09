/**
 * Nitra Design System - 設計系統 Token
 * 集中管理色彩、間距、圓角、陰影等設計變數
 */

// ─── Colors ────────────────────────────────────────────────────────

/** Nitra 品牌主色（Teal） */
export const colors = {
  /** 主色 - 按鈕、連結、焦點 */
  primary: '#1A929F',
  /** 主色深色 - Hover / Active */
  primaryDark: '#168995',
  primaryDarker: '#147d89',
  /** 主色淺色 - 背景、Badge */
  primaryTint: '#85bac01a',
  primaryTint10: 'rgba(26, 146, 159, 0.1)',
  primaryTint20: 'rgba(26, 146, 159, 0.2)',
  /** 焦點環透明度 */
  primaryFocusRing: 'rgba(26, 146, 159, 0.3)',

  /** 高亮背景（新增帳號成功） */
  highlightBg: '#E5F4F5',
  /** 高亮邊框 */
  highlightBorder: '#3DB5C0',

  /** 背景色 - New theme */
  bgNewTheme: '#F5F7FA',
  /** 背景色 - Current theme gradient */
  bgCurrentTheme: 'from-gray-50 via-gray-50 to-gray-100',
  /** 表格標頭背景 */
  tableHeader: '#EDF0F4',
  /** 帳號列 Hover - Current theme */
  rowHoverCurrent: '#EDF3F5',

  /** 成功 */
  success: '#10b981',
  successBg: '#ecfdf5',
  /** 錯誤 */
  error: '#ef4444',
  errorBg: '#fef2f2',
  /** 警告 */
  warning: '#f59e0b',
} as const;

// ─── Layout / LayoutStyle ───────────────────────────────────────────

export const layout = {
  /** 側邊欄寬度 */
  sidebarExpanded: 240,
  sidebarCollapsed: 72,
  /** 內容區最大寬度 */
  contentMaxWidth: 1400,
} as const;

// ─── Border Radius ──────────────────────────────────────────────────

export const radius = {
  sm: '0.375rem',   // rounded-md
  md: '0.5rem',     // rounded-lg
  lg: '0.75rem',    // rounded-xl
  xl: '1rem',       // rounded-2xl
  card: '1.125rem', // rounded-[18px] New theme card
} as const;

// ─── Shadows ───────────────────────────────────────────────────────

export const shadows = {
  /** New theme 主內容卡片 */
  cardNew: '0 0 10px rgba(0, 0, 0, 0.04), 0 0 20px rgba(0, 0, 0, 0.02)',
} as const;

// ─── Transitions ───────────────────────────────────────────────────

export const transitions = {
  default: 'transition-all duration-200',
  slow: 'transition-all duration-300',
} as const;

// ─── Tailwind 友善的 class 字串 ─────────────────────────────────────

export const tw = {
  /** 主按鈕樣式 */
  btnPrimary: 'bg-nitra-primary hover:opacity-90 text-white rounded-lg px-4 py-2 text-body-base font-bold transition-all duration-200',
  /** 搜尋框 focus */
  inputFocus: 'focus:ring-2 focus:ring-nitra-primary/30 focus:border-nitra-primary',
  /** 帳號列高亮 */
  rowHighlight: 'bg-nitra-highlight-bg border border-nitra-highlight-border',
} as const;
