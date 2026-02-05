# 重構記錄

## 第一階段：抽取類型和常量 ✅

**完成日期**: 2026-02-06

### 目標
- 降低 `page.tsx` 的複雜度
- 提高代碼的可維護性和可重用性
- 為後續功能開發建立清晰的結構

### 完成內容

#### 1. 創建類型定義文件
**文件**: `app/types/social-accounts.ts` (24 行)

抽取的類型：
- `Platform` - 社群平台類型
- `SocialAccount` - 社群帳號介面
- `LayoutStyle` - 版型樣式類型
- `PlatformConfig` - 平台配置介面

#### 2. 創建常量配置文件
**文件**: `app/constants/platform-config.ts` (25 行)

- 包含 Twitter、LinkedIn、Instagram 的配置
- 包括名稱、圖標、顏色、最大帳號數

#### 3. 分離 UI 組件
**文件**: `app/components/icons/XIcon.tsx` (8 行)

- 獨立的 Twitter/X 圖標組件
- 可在其他地方重用

### 改進數據

| 指標 | 之前 | 之後 | 改善 |
|------|------|------|------|
| `page.tsx` 行數 | 842 | 797 | -45 行 (-5.3%) |
| 新增模組文件 | 0 | 3 | +3 個 |
| 類型定義位置 | 分散 | 集中 | ✓ |
| 配置數據位置 | 內嵌 | 獨立 | ✓ |

### 優勢

1. **類型安全**: 所有類型集中在一個文件，易於管理和導入
2. **配置獨立**: 平台配置可以輕鬆修改而不影響業務邏輯
3. **組件重用**: XIcon 可以在其他地方使用
4. **清晰結構**: 代碼組織更加清晰，職責分離

## 第二階段：抽取 Hook ✅

**完成日期**: 2026-02-06

### 目標
- 將業務邏輯從 UI 組件中分離
- 提高代碼的可測試性
- 便於邏輯重用和維護

### 完成內容

#### 1. 創建 useSocialAccounts Hook
**文件**: `app/hooks/useSocialAccounts.ts` (174 行)

功能：
- ✅ 帳號數據管理（accounts state）
- ✅ 帳號操作：togglePrimary, handleAddAccount, reconnectAccount, deleteAccount
- ✅ 查詢函數：getAccountsByPlatform, formatFollowers
- ✅ Modal 狀態管理
- ✅ 使用 useCallback 優化性能

#### 2. 創建 useLayoutStyle Hook
**文件**: `app/hooks/useLayoutStyle.ts` (21 行)

功能：
- ✅ 版型樣式狀態管理（'current' | 'new'）
- ✅ 版型切換函數
- ✅ 支持初始值配置

#### 3. 創建 usePlatformExpanded Hook
**文件**: `app/hooks/usePlatformExpanded.ts` (53 行)

功能：
- ✅ 平台展開/收起狀態管理
- ✅ 單個平台切換
- ✅ 展開全部/收起全部功能

#### 4. 創建測試示例
**文件**: `app/hooks/__tests__/useSocialAccounts.test.ts`

提供完整的測試範例，包括：
- 數據初始化測試
- 業務邏輯測試
- 邊界情況測試

#### 5. 創建使用文檔
**文件**: `app/hooks/README.md`

包含：
- 每個 Hook 的 API 文檔
- 使用範例
- 最佳實踐指南
- Hook 模板

### 改進數據

| 指標 | 之前 | 之後 | 改善 |
|------|------|------|------|
| `page.tsx` 行數 | 797 | 696 | -101 行 (-12.7%) |
| Hook 文件數 | 0 | 3 | +3 個 |
| 業務邏輯位置 | UI 組件內 | 獨立 Hook | ✓ |
| 可測試性 | 低 | 高 | ✓ |
| 代碼重用性 | 低 | 高 | ✓ |

### 優勢

1. **業務邏輯獨立**：
   - 帳號管理邏輯完全獨立於 UI
   - 可以在不同組件中重用
   - 易於修改和擴展

2. **易於測試**：
   - Hook 可以獨立測試，不需要渲染組件
   - 使用 `@testing-library/react-hooks` 輕鬆測試
   - 業務邏輯測試覆蓋率可達 100%

3. **性能優化**：
   - 使用 `useCallback` 避免不必要的重渲染
   - 依賴數組精確控制更新時機

4. **類型安全**：
   - 所有 Hook 都有完整的 TypeScript 類型
   - IDE 自動補全和類型檢查

5. **代碼組織清晰**：
   - 按功能分類的 Hook
   - 每個 Hook 職責單一
   - 易於查找和維護

### 使用示例

```typescript
// 在 page.tsx 中使用
const {
  accounts,
  togglePrimary,
  handleAddAccount,
  getAccountsByPlatform,
} = useSocialAccounts();

const { layoutStyle, setLayoutStyle } = useLayoutStyle('current');
const { platformExpanded, togglePlatformExpanded } = usePlatformExpanded();
```

### 下一階段計劃

#### 第三階段：組件化（計劃中）
- [ ] 創建 `components/social-accounts/GroupHeader.tsx`
- [ ] 創建 `components/social-accounts/AccountRow.tsx`
- [ ] 創建 `components/social-accounts/LayoutStyleToggle.tsx`
- [ ] 創建 `components/navigation/Sidebar.tsx`
- [ ] 創建 `components/layout/Header.tsx`

#### 第四階段：簡化主頁面（計劃中）
- [ ] 將 `page.tsx` 簡化到 < 100 行
- [ ] 只保留頁面組合邏輯

### 使用指南

#### 導入類型
```typescript
import type { Platform, SocialAccount, LayoutStyle } from '@/app/types/social-accounts';
```

#### 導入配置
```typescript
import { platformConfig } from '@/app/constants/platform-config';
```

#### 使用示例
```typescript
// 獲取平台配置
const config = platformConfig['twitter'];
const Icon = config.icon;

// 類型安全的平台數組
const platforms: Platform[] = ['twitter', 'linkedin', 'instagram'];
```

### 注意事項

- 所有新功能應該使用這些類型定義
- 修改平台配置時只需編輯 `platform-config.ts`
- 不要在其他文件中重複定義這些類型
