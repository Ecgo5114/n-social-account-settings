# Hooks 使用指南

這個目錄包含所有自定義 React Hooks，用於管理應用的業務邏輯和狀態。

## 📚 可用的 Hooks

### 1. useSocialAccounts

管理社群帳號的數據和操作。

#### 導入
```typescript
import { useSocialAccounts } from '@/app/hooks/useSocialAccounts';
```

#### 使用範例
```typescript
function MyComponent() {
  const {
    accounts,              // 所有帳號數據
    showSwitchModal,       // 切換 Modal 顯示狀態
    getAccountsByPlatform, // 獲取特定平台的帳號
    formatFollowers,       // 格式化粉絲數
    togglePrimary,         // 切換 Instagram Primary
    handleAddAccount,      // 新增帳號
    reconnectAccount,      // 重新連接帳號
    deleteAccount,         // 刪除帳號
    setShowSwitchModal,    // 設置 Modal 狀態
  } = useSocialAccounts();

  // 獲取 Twitter 帳號
  const twitterAccounts = getAccountsByPlatform('twitter');

  // 格式化粉絲數
  const formattedFollowers = formatFollowers(125400); // "125.4K"

  return (
    <div>
      {accounts.map(account => (
        <div key={account.id}>
          {account.accountName} - {formatFollowers(account.followers)}
        </div>
      ))}
    </div>
  );
}
```

#### API 說明

**返回值：**

| 名稱 | 類型 | 說明 |
|------|------|------|
| `accounts` | `SocialAccount[]` | 所有帳號數據 |
| `showSwitchModal` | `boolean` | 切換 Modal 顯示狀態 |
| `getAccountsByPlatform` | `(platform: Platform) => SocialAccount[]` | 獲取特定平台的帳號列表 |
| `formatFollowers` | `(followers?: number) => string` | 格式化粉絲數為 K/M 格式 |
| `togglePrimary` | `(accountId: string) => void` | 切換 Instagram Primary 帳號 |
| `handleAddAccount` | `(platform: Platform) => void` | 處理新增帳號（包含限制檢查）|
| `reconnectAccount` | `(accountId: string) => void` | 重新連接已過期的帳號 |
| `deleteAccount` | `(accountId: string) => void` | 刪除指定帳號 |
| `setShowSwitchModal` | `(show: boolean) => void` | 設置 Modal 狀態 |

---

### 2. useLayoutStyle

管理版型樣式切換。

#### 導入
```typescript
import { useLayoutStyle } from '@/app/hooks/useLayoutStyle';
```

#### 使用範例
```typescript
function MyComponent() {
  const { 
    layoutStyle,        // 當前版型：'current' | 'new'
    setLayoutStyle,     // 直接設置版型
    toggleLayoutStyle,  // 切換版型
  } = useLayoutStyle('current');

  return (
    <button onClick={toggleLayoutStyle}>
      切換到 {layoutStyle === 'current' ? 'New' : 'Current'} 版型
    </button>
  );
}
```

#### API 說明

**參數：**
- `initialStyle?: LayoutStyle` - 初始版型樣式（預設為 `'current'`）

**返回值：**

| 名稱 | 類型 | 說明 |
|------|------|------|
| `layoutStyle` | `'current' \| 'new'` | 當前版型樣式 |
| `setLayoutStyle` | `(style: LayoutStyle) => void` | 直接設置版型 |
| `toggleLayoutStyle` | `() => void` | 在兩個版型之間切換 |

---

### 3. usePlatformExpanded

管理平台展開/收起狀態。

#### 導入
```typescript
import { usePlatformExpanded } from '@/app/hooks/usePlatformExpanded';
```

#### 使用範例
```typescript
function MyComponent() {
  const {
    platformExpanded,       // { twitter: true, linkedin: true, instagram: true }
    togglePlatformExpanded, // 切換特定平台
    expandAll,              // 展開所有平台
    collapseAll,            // 收起所有平台
  } = usePlatformExpanded();

  return (
    <div>
      <button onClick={() => togglePlatformExpanded('twitter')}>
        Toggle Twitter
      </button>
      <button onClick={expandAll}>展開全部</button>
      <button onClick={collapseAll}>收起全部</button>
    </div>
  );
}
```

#### API 說明

**返回值：**

| 名稱 | 類型 | 說明 |
|------|------|------|
| `platformExpanded` | `Record<Platform, boolean>` | 各平台的展開狀態 |
| `togglePlatformExpanded` | `(platform: Platform) => void` | 切換特定平台的展開狀態 |
| `expandAll` | `() => void` | 展開所有平台 |
| `collapseAll` | `() => void` | 收起所有平台 |

---

## 🧪 測試

所有 Hook 都可以使用 `@testing-library/react-hooks` 進行測試。

參考範例：`__tests__/useSocialAccounts.test.ts`

### 安裝測試依賴
```bash
npm install --save-dev @testing-library/react @testing-library/react-hooks jest
```

### 運行測試
```bash
npm test
```

---

## 💡 最佳實踐

### 1. 單一職責原則
每個 Hook 應該只負責一個特定的業務邏輯領域。

### 2. 使用 useCallback 優化性能
對於傳遞給子組件的函數，使用 `useCallback` 避免不必要的重渲染。

### 3. 清晰的命名
Hook 名稱應該清楚地表達其用途（例如：`useSocialAccounts` 而不是 `useData`）。

### 4. 提供完整的 TypeScript 類型
所有 Hook 的參數和返回值都應該有明確的類型定義。

### 5. 添加註釋
使用 JSDoc 註釋說明 Hook 的用途、參數和返回值。

---

## 🔄 添加新的 Hook

當你需要添加新功能時，考慮創建新的 Hook：

1. 在 `app/hooks/` 目錄創建新文件
2. 遵循現有的命名慣例（use + 功能名稱）
3. 添加 TypeScript 類型定義
4. 撰寫測試（在 `__tests__/` 目錄）
5. 更新此 README

### Hook 模板
```typescript
import { useState, useCallback } from 'react';

/**
 * [Hook 描述]
 * @param [參數說明]
 * @returns [返回值說明]
 */
export function useMyFeature(initialValue: string) {
  const [state, setState] = useState(initialValue);

  const doSomething = useCallback(() => {
    // 業務邏輯
  }, []);

  return {
    state,
    doSomething,
  };
}
```
