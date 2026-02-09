# Nitra Design System

設計系統文件 - 色彩、排版、元件樣式與使用規範。

---

## 目錄

1. [色彩 (Colors)](#色彩-colors)
2. [排版 (Typography)](#排版-typography)
3. [間距與圓角 (Spacing & Radius)](#間距與圓角-spacing--radius)
4. [陰影 (Shadows)](#陰影-shadows)
5. [Tailwind 使用方式](#tailwind-使用方式)
6. [CSS 變數](#css-變數)
7. [元件樣式指南](#元件樣式指南)
8. [佈局樣式 (Current / New Theme)](#佈局樣式-current--new-theme)

---

## 色彩 (Colors)

### 品牌主色 (Primary - Teal)

| Token | Hex | 用途 |
|-------|-----|------|
| `nitra-primary` | `#1A929F` | 主按鈕、連結、焦點、Active 狀態 |
| `nitra-primary-dark` | `#168995` | Hover、漸層深色 |
| `nitra-primary-tint` | `#85bac01a` | 帳號列 Hover 背景、淺色背景 |

### 語意色

| Token | Hex | 用途 |
|-------|-----|------|
| `nitra-highlight-bg` | `#E5F4F5` | 新增帳號成功高亮背景 |
| `nitra-highlight-border` | `#3DB5C0` | 高亮邊框 |
| `nitra-success` | `#10b981` | 成功 Toast、Badge |
| `nitra-error` | `#ef4444` | 錯誤 Toast、Reconnect 按鈕 |

### 背景與表面

| Token | Hex | 用途 |
|-------|-----|------|
| `nitra-bg-new` | `#F5F7FA` | New theme 頁面背景 |
| `nitra-table-header` | `#EDF0F4` | 表格標頭背景 (Current theme) |

### 平台品牌色 (Platform Config)

平台圖示與 Badge 使用 `app/constants/platform-config.ts` 定義的品牌色，如：
- LinkedIn: `#0A66C2`
- Instagram: `#E4405F`
- Twitter/X: `#000000`

---

## 排版 (Typography)

- **字體**：Arial, Helvetica, sans-serif（body 預設）
- **Tailwind 字體**：`font-inter`, `font-nunito`, `font-varela`（可選）
- **字級**：依 Tailwind 預設 (`text-xs` ~ `text-2xl`)

---

## 間距與圓角 (Spacing & Radius)

### 側邊欄

| 狀態 | 寬度 |
|------|------|
| 展開 | 240px |
| 收合 | 72px |

### 圓角

| Token | 值 | 用途 |
|-------|-----|------|
| `rounded-lg` | 0.5rem | 按鈕、輸入框 |
| `rounded-xl` | 0.75rem | 卡片、Modal |
| `rounded-[18px]` | 1.125rem | New theme 主內容卡片 |

---

## 陰影 (Shadows)

| Token | 用途 |
|-------|------|
| `shadow-nitra-card` | New theme 主內容卡片 |
| `shadow-sm` / `shadow-lg` | 通用陰影 |

---

## Tailwind 使用方式

Tailwind config 已擴充 Nitra 品牌色，可直接使用：

```tsx
// 主色
className="bg-nitra-primary text-white"
className="text-nitra-primary hover:text-nitra-primary-dark"
className="bg-nitra-primary-tint border-nitra-primary"

// 高亮
className="bg-nitra-highlight-bg border-nitra-highlight-border"

// 背景
className="bg-nitra-bg-new"
```

### 匯入 Token 常數

```ts
import { colors, radius, tw } from '@/app/constants/design-tokens';

// 直接使用 hex（如 inline style）
style={{ backgroundColor: colors.primary }}
```

---

## CSS 變數

`app/globals.css` 定義了 CSS 變數，可在非 Tailwind 環境使用：

```css
.element {
  background: var(--nitra-primary);
  color: var(--nitra-bg-highlight);
}
```

| 變數 | 用途 |
|------|------|
| `--nitra-primary` | 主色 |
| `--nitra-primary-tint` | 主色淺色 |
| `--nitra-bg-new` | New theme 背景 |
| `--nitra-bg-highlight` | 高亮背景 |
| `--nitra-sidebar-expanded` | 側邊欄展開寬度 |

---

## 元件樣式指南

### 主按鈕 (Primary Button)

```
bg-[#1A929F] hover:opacity-90 text-white rounded-lg px-4 py-2 text-sm font-semibold
```
或使用 `bg-nitra-primary`。

### 搜尋框 Focus

```
focus:ring-2 focus:ring-[#1A929F]/30 focus:border-[#1A929F]
```

### 帳號列 Hover

- **New theme**：`hover:bg-[#85bac01a]`
- **Current theme**：`hover:bg-[#EDF3F5]`

### 高亮帳號列（新增成功）

```
bg-[#E5F4F5] border border-[#3DB5C0]
```

---

## 佈局樣式 (Current / New Theme)

| 項目 | Current theme | New theme |
|------|---------------|-----------|
| 頁面背景 | `from-gray-50 via-slate-50 to-gray-100` | `#F5F7FA` |
| 主內容區 | 無外框 | 白色卡片 `rounded-[18px]` + 陰影 |
| 側邊欄 | 毛玻璃 `bg-white/80 backdrop-blur-xl` | 透明 `bg-transparent` |
| 帳號群組 | 虛線樹狀結構 | 卡片群組 `bg-gray-100/50 rounded-lg` |
| 帳號列 | `bg-gray-50/80` | `bg-white` |

---

## 檔案結構

```
app/
├── constants/
│   ├── design-tokens.ts    # 設計 Token 常數
│   └── platform-config.ts  # 平台品牌色
├── globals.css             # CSS 變數
└── themes.ts               # 主題配置（Glassmorphism / Minimalism / Soft UI）

tailwind.config.ts          # Tailwind 擴充（colors, radius, shadow）
DESIGN-SYSTEM.md            # 本文件
```

---

## 備註

- **themes.ts** 使用深綠色 `#1A4D3E`，與主應用 Nitra Teal (`#1A929F`) 不同，為 ThemeSwitcher 提供的可選主題。
- 平台品牌色（LinkedIn、Instagram 等）集中於 `platform-config.ts`，OAuth 模擬畫面可使用其 hex 值。
