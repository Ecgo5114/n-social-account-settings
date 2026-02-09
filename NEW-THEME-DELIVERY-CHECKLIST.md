# New Theme 設計交付檢查清單

依 ui-ux-pro-max 的 Common Rules 與 Pre-Delivery Checklist，針對 New theme 建立的設計交付檢查清單。

---

## 一、視覺品質 (Visual Quality)

### Icons & 視覺元素
| 檢查項目 | 狀態 | 備註 |
|----------|------|------|
| [ ] 無使用 emoji 作為 icon | ✅ | 使用 Lucide、react-icons (Simple Icons) |
| [ ] 圖示來自一致圖標集 | ✅ | Lucide、SiLinkedin 等 |
| [ ] 品牌 logo 正確 | ✅ | `/images/logo.png`、`/images/logo-icon.png` |
| [ ] Hover 不造成版面位移 | ✅ | 使用 `transition-colors` 而非 scale |
| [ ] 使用設計 token 色彩 | ⚠️ | 部分仍使用 `#1A929F` 硬編碼，建議改用 `bg-nitra-primary` |

### New Theme 專屬
| 檢查項目 | 狀態 | 備註 |
|----------|------|------|
| [ ] 頁面背景為 `#F5F7FA` | ✅ | `app/page.tsx` layoutStyle === 'new' |
| [ ] 主內容區白色卡片 `rounded-[18px]` + 陰影 | ✅ | `main` 區塊 |
| [ ] 側邊欄透明 `bg-transparent` | ✅ | 無毛玻璃 |
| [ ] 帳號群組卡片 `bg-gray-100/50 rounded-lg` | ✅ | GroupHeader 容器 |
| [ ] 帳號列白底 `bg-white` | ✅ | AccountRow baseBg |
| [ ] 帳號列 hover `#85bac01a` | ✅ | primaryTint |
| [ ] 無虛線樹狀線 | ✅ | layoutStyle !== 'new' 時才顯示 |

---

## 二、互動 (Interaction)

| 檢查項目 | 狀態 | 備註 |
|----------|------|------|
| [ ] 可點擊元素有 `cursor-pointer` | ✅ | 按鈕、AccountRow、NavItem、GroupHeader |
| [ ] Hover 有清楚視覺回饋 | ✅ | 顏色、背景變化 |
| [ ] 過渡動畫 150–300ms | ✅ | `transition-colors duration-200` |
| [ ] 鍵盤導航焦點可見 | ⚠️ | 需確認 `focus-visible` 樣式 |
| [ ] Loading 狀態有回饋 | ✅ | Reconnect 有 Loader2、ConnectionLoadingOverlay |

---

## 三、對比與可讀性 (Contrast)

| 檢查項目 | 狀態 | 備註 |
|----------|------|------|
| [ ] 文字對比度 ≥ 4.5:1 | ⚠️ | 灰色 `text-gray-400`、`text-gray-500` 需驗證 |
| [ ] 主色 `#1A929F` 與白底對比足夠 | ✅ | 按鈕、Badge |
| [ ] 邊框可見 | ✅ | `border-gray-200` |
| [ ] 次要文字不使用過淺灰 | ⚠️ | `text-gray-400` 建議 ≥ `text-gray-500` |

---

## 四、佈局 (Layout)

| 檢查項目 | 狀態 | 備註 |
|----------|------|------|
| [ ] 內容區 padding 適當 | ✅ | `px-10 py-8` |
| [ ] 主內容 max-width 一致 | ✅ | `max-w-[1400px]` |
| [ ] 側邊欄寬度正確 | ✅ | 展開 240px、收合 72px |
| [ ] 表頭與帳號列 grid 對齊 | ✅ | `grid-cols-12`、`pl-[46px]` |
| [ ] 無水平捲動 | ⚠️ | 需於 375px、768px、1024px 驗證 |

---

## 五、無障礙 (Accessibility)

| 檢查項目 | 狀態 | 備註 |
|----------|------|------|
| [ ] 圖片有 alt | ✅ | Logo、logo-icon |
| [ ] 搜尋框有 label | ✅ | `sr-only`（建議改為英文 "Search accounts"） |
| [ ] 按鈕有 aria-label 或 title | ⚠️ | NavItem 僅有 title 於收合時 |
| [ ] Modal 有 role="dialog" aria-modal | ✅ | AddAccountModal、DisconnectConfirmationModal |
| [ ] 顏色非唯一資訊來源 | ✅ | Connected/Expired 有 Check/X icon |
| [ ] prefers-reduced-motion 有處理 | ✅ | `globals.css` 已實作 |

---

## 六、觸控目標 (Touch Targets)

| 檢查項目 | 狀態 | 備註 |
|----------|------|------|
| [ ] 觸控目標 ≥ 44×44px | ⚠️ | Action menu trigger、platform jump 約 36×36px |
| [ ] 主按鈕足夠大 | ✅ | Add Account、Reconnect |

---

## 七、設計系統一致性

| 檢查項目 | 狀態 | 備註 |
|----------|------|------|
| [ ] 色彩來自 design-tokens | ⚠️ | 部分硬編碼 hex，建議改用 Tailwind `nitra-*` |
| [ ] 圓角使用 token | ✅ | `rounded-lg`、`rounded-[18px]` |
| [ ] 陰影使用 shadow-nitra-card | ✅ | 主內容區 |
| [ ] Typography 層級正確 | ✅ | text-2xl 標題、text-sm 內文、text-xs caption |

---

## 八、ui-ux-pro-max 補充規則

### 已符合
- 無 emoji icon
- Hover 使用 color/opacity 過渡
- cursor-pointer 於可點擊元素
- 過渡 150–300ms
- prefers-reduced-motion 支援
- Modal 有適當 ARIA

### 待改進
1. **Search label**：`sr-only` 目前為「搜尋帳號」，建議改為 "Search accounts"
2. **Touch targets**：Action menu、platform jump 按鈕建議提升至 44×44px
3. **Focus visible**：為可聚焦元素加入 `focus-visible:ring-2 focus-visible:ring-[#1A929F]/30`
4. **Token 使用**：逐步將硬編碼 `#1A929F` 改為 `bg-nitra-primary` 等

---

## 交付前最終檢查

- [ ] 切換至 New theme 執行上述清單
- [ ] 在 375px、768px、1024px、1440px 檢查響應式
- [ ] 以鍵盤 Tab 導航驗證焦點順序與可見性
- [ ] 開啟 prefers-reduced-motion 確認動畫被抑制
- [ ] 比對 `/design-system` 頁面 New theme 展示是否一致

---

## 參考

- Nitra Design System: `DESIGN-SYSTEM.md`
- Design Tokens: `app/constants/design-tokens.ts`
- ui-ux-pro-max: `.cursor/skills/ui-ux-pro-max/SKILL.md`
- New Theme Heuristic Evaluation: `NEW-THEME-HEURISTIC-EVALUATION-REPORT.md`
