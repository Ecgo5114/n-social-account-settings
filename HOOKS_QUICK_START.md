# Hooks 快速開始指南

## 🎯 現在可以做什麼？

重構後，添加新功能變得更加簡單和安全。以下是常見場景的實現方式：

---

## 📝 常見場景

### 場景 1：添加「新增帳號」功能

**之前**：需要在 800+ 行的 page.tsx 中找到相關代碼並修改

**現在**：只需修改 `hooks/useSocialAccounts.ts`

```typescript
// 在 useSocialAccounts.ts 中
const handleAddAccount = useCallback((platform: Platform) => {
  // 1. 檢查限制（已有）
  if (platform === 'linkedin') {
    const linkedinAccounts = accounts.filter(acc => acc.platform === 'linkedin');
    if (linkedinAccounts.length > 0) {
      setShowSwitchModal(true);
      return;
    }
  }
  
  // 2. 添加實際的 API 調用
  const addNewAccount = async () => {
    try {
      const response = await fetch('/api/accounts', {
        method: 'POST',
        body: JSON.stringify({ platform }),
      });
      const newAccount = await response.json();
      
      // 3. 更新狀態
      setAccounts(prev => [...prev, newAccount]);
    } catch (error) {
      console.error('Failed to add account:', error);
    }
  };
  
  addNewAccount();
}, [accounts]);
```

**影響範圍**：只有 `useSocialAccounts.ts` 一個文件！

---

### 場景 2：添加「批量操作」功能

在 `useSocialAccounts.ts` 中添加新函數：

```typescript
// 批量刪除帳號
const batchDeleteAccounts = useCallback((accountIds: string[]) => {
  setAccounts(prev => 
    prev.filter(account => !accountIds.includes(account.id))
  );
}, []);

// 批量更新狀態
const batchUpdateStatus = useCallback((accountIds: string[], status: SocialAccount['status']) => {
  setAccounts(prev => 
    prev.map(account => 
      accountIds.includes(account.id) 
        ? { ...account, status }
        : account
    )
  );
}, []);

// 記得在返回值中導出
return {
  // ... 其他屬性
  batchDeleteAccounts,
  batchUpdateStatus,
};
```

然後在組件中使用：

```typescript
const { batchDeleteAccounts } = useSocialAccounts();

// 刪除多個帳號
<button onClick={() => batchDeleteAccounts(['1', '2', '3'])}>
  刪除選中的帳號
</button>
```

---

### 場景 3：添加「帳號搜索」功能

創建新的 Hook：`app/hooks/useAccountSearch.ts`

```typescript
import { useState, useMemo } from 'react';
import type { SocialAccount } from '@/app/types/social-accounts';

export function useAccountSearch(accounts: SocialAccount[]) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAccounts = useMemo(() => {
    if (!searchTerm) return accounts;
    
    const term = searchTerm.toLowerCase();
    return accounts.filter(account => 
      account.accountName.toLowerCase().includes(term) ||
      account.accountHandle.toLowerCase().includes(term)
    );
  }, [accounts, searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredAccounts,
  };
}
```

在頁面中使用：

```typescript
const { accounts } = useSocialAccounts();
const { searchTerm, setSearchTerm, filteredAccounts } = useAccountSearch(accounts);

// 使用 filteredAccounts 而不是 accounts
```

---

### 場景 4：添加「帳號排序」功能

在 `useSocialAccounts.ts` 中添加：

```typescript
const [sortBy, setSortBy] = useState<'name' | 'followers' | 'date'>('name');

const sortedAccounts = useMemo(() => {
  return [...accounts].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.accountName.localeCompare(b.accountName);
      case 'followers':
        return (b.followers || 0) - (a.followers || 0);
      case 'date':
        // 假設有 createdAt 欄位
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        return 0;
    }
  });
}, [accounts, sortBy]);

return {
  accounts: sortedAccounts,  // 返回排序後的帳號
  sortBy,
  setSortBy,
  // ... 其他屬性
};
```

---

### 場景 5：添加「數據持久化」功能

在 `useSocialAccounts.ts` 中使用 localStorage：

```typescript
import { useState, useCallback, useEffect } from 'react';

export function useSocialAccounts() {
  // 從 localStorage 讀取初始數據
  const [accounts, setAccounts] = useState<SocialAccount[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('socialAccounts');
      return saved ? JSON.parse(saved) : INITIAL_ACCOUNTS;
    }
    return INITIAL_ACCOUNTS;
  });

  // 當 accounts 變化時保存到 localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('socialAccounts', JSON.stringify(accounts));
    }
  }, [accounts]);

  // ... 其他邏輯
}
```

---

## 🧪 如何測試新功能

### 1. 單元測試 Hook

```typescript
// app/hooks/__tests__/useSocialAccounts.test.ts
import { renderHook, act } from '@testing-library/react-hooks';
import { useSocialAccounts } from '../useSocialAccounts';

test('批量刪除帳號', () => {
  const { result } = renderHook(() => useSocialAccounts());
  
  const initialLength = result.current.accounts.length;
  
  act(() => {
    result.current.batchDeleteAccounts(['1', '2']);
  });
  
  expect(result.current.accounts).toHaveLength(initialLength - 2);
});
```

### 2. 集成測試

```typescript
// 測試整個流程
test('新增帳號流程', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useSocialAccounts());
  
  act(() => {
    result.current.handleAddAccount('twitter');
  });
  
  await waitForNextUpdate();
  
  expect(result.current.accounts).toHaveLength(6);
});
```

---

## ⚡ 性能優化提示

### 1. 使用 useMemo 緩存計算結果

```typescript
const expensiveCalculation = useMemo(() => {
  return accounts.filter(/* 複雜條件 */).map(/* 複雜轉換 */);
}, [accounts]);
```

### 2. 使用 useCallback 穩定函數引用

```typescript
const handleClick = useCallback(() => {
  // 避免子組件不必要的重渲染
}, [依賴項]);
```

### 3. 拆分大的 Hook

如果一個 Hook 超過 200 行，考慮拆分：

```typescript
// useSocialAccounts.ts 變得太大時
// 拆分為：
// - useSocialAccountsData.ts (數據管理)
// - useSocialAccountsActions.ts (操作函數)
// - useSocialAccountsValidation.ts (驗證邏輯)
```

---

## 📦 常用 Hook 模式

### 模式 1：數據 + 操作

```typescript
export function useMyFeature() {
  const [data, setData] = useState([]);
  
  const add = useCallback(() => { /* ... */ }, []);
  const remove = useCallback(() => { /* ... */ }, []);
  const update = useCallback(() => { /* ... */ }, []);
  
  return { data, add, remove, update };
}
```

### 模式 2：異步操作 + 狀態

```typescript
export function useAsyncData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await api.getData();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);
  
  return { data, loading, error, fetchData };
}
```

### 模式 3：組合多個 Hook

```typescript
export function useComplexFeature() {
  const { data } = useData();
  const { filter } = useFilter();
  const { sort } = useSort();
  
  const processedData = useMemo(() => {
    return sort(filter(data));
  }, [data, filter, sort]);
  
  return { processedData };
}
```

---

## 🎓 學習資源

- [React Hooks 官方文檔](https://react.dev/reference/react)
- [Testing Library Hooks](https://github.com/testing-library/react-hooks-testing-library)
- [Hook 最佳實踐](https://kentcdodds.com/blog/react-hooks-pitfalls)

---

## 💬 需要幫助？

如果你在使用 Hooks 時遇到問題：

1. 查看 `app/hooks/README.md` 了解詳細 API
2. 參考 `__tests__` 目錄中的測試範例
3. 查看現有 Hook 的實現作為參考
