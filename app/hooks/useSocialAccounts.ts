import { useState, useCallback } from 'react';
import type { SocialAccount, Platform } from '@/app/types/social-accounts';

// 用於產生唯一 ID
let accountIdCounter = 100;

// 初始樣本數據
const INITIAL_ACCOUNTS: SocialAccount[] = [
  {
    id: '1',
    platform: 'twitter',
    accountName: 'TechCorp Official',
    accountHandle: '@techcorp',
    status: 'verified',
    followers: 125400,
    lastSynced: 'Just now',
  },
  {
    id: '2',
    platform: 'twitter',
    accountName: 'TechCorp Support',
    accountHandle: '@techcorp_help',
    status: 'verified',
    followers: 43200,
    lastSynced: '5 minutes ago',
  },
  {
    id: '3',
    platform: 'linkedin',
    accountName: 'TechCorp Inc.',
    accountHandle: 'techcorp-inc',
    status: 'verified',
    linkedinType: 'Company Page',
    followers: 89500,
    lastSynced: '10 minutes ago',
  },
  {
    id: '4',
    platform: 'instagram',
    accountName: 'TechCorp',
    accountHandle: '@techcorp.official',
    status: 'expired',
    isPrimary: true,
    followers: 234800,
    lastSynced: '2 hours ago',
  },
  {
    id: '5',
    platform: 'instagram',
    accountName: 'TechCorp Careers',
    accountHandle: '@techcorp.careers',
    status: 'verified',
    isPrimary: false,
    followers: 12300,
    lastSynced: 'Just now',
  },
];

/**
 * 管理社群帳號數據和操作的 Hook
 * @returns 帳號數據和操作函數
 */
export function useSocialAccounts() {
  const [accounts, setAccounts] = useState<SocialAccount[]>(INITIAL_ACCOUNTS);
  const [showSwitchModal, setShowSwitchModal] = useState(false);

  /**
   * 獲取特定平台的帳號列表
   */
  const getAccountsByPlatform = useCallback((platform: Platform) => {
    return accounts.filter(account => account.platform === platform);
  }, [accounts]);

  /**
   * 切換 Instagram Primary 狀態
   * 只有當有多個 Instagram 帳號時才能切換
   */
  const togglePrimary = useCallback((accountId: string) => {
    const instagramAccounts = accounts.filter(acc => acc.platform === 'instagram');
    
    // 如果只有一個 Instagram 帳號，不執行切換
    if (instagramAccounts.length === 1) {
      return;
    }
    
    setAccounts(prev => prev.map(account => {
      if (account.platform === 'instagram') {
        return {
          ...account,
          isPrimary: account.id === accountId
        };
      }
      return account;
    }));
  }, [accounts]);

  /**
   * 處理新增帳號（從 GroupHeader 點擊，可能顯示 Switch Modal）
   * 包含平台特定的限制邏輯
   */
  const handleAddAccount = useCallback((platform: Platform) => {
    // LinkedIn 限制：只能有一個帳號
    if (platform === 'linkedin') {
      const linkedinAccounts = accounts.filter(acc => acc.platform === 'linkedin');
      if (linkedinAccounts.length > 0) {
        setShowSwitchModal(true);
        return;
      }
    }
    
    // Instagram 限制：最多兩個帳號
    if (platform === 'instagram') {
      const instagramAccounts = accounts.filter(acc => acc.platform === 'instagram');
      if (instagramAccounts.length >= 2) {
        return;
      }
    }
    
    console.log(`Adding new ${platform} account`);
    // 由 AddAccountModal 選擇平台後，透過 executeAddAccount 處理
  }, [accounts]);

  /**
   * 執行新增帳號（模擬串聯後寫入 mockData）
   * @returns 新增的帳號，供滾動與高亮使用
   */
  const executeAddAccount = useCallback((platform: Platform): Promise<SocialAccount> => {
    const newAccount: SocialAccount = {
      id: `new-${++accountIdCounter}`,
      platform,
      accountName: `New ${platform.charAt(0).toUpperCase() + platform.slice(1)} Account`,
      accountHandle: platform === 'twitter' ? '@new_account' : 'new-account',
      status: 'verified',
      followers: Math.floor(Math.random() * 50000) + 1000,
      lastSynced: 'Just now',
      isPrimary: platform === 'instagram',
    };
    if (platform === 'linkedin') {
      newAccount.linkedinType = 'Company Page';
    }
    setAccounts(prev => [...prev, newAccount]);
    return Promise.resolve(newAccount);
  }, []);

  /**
   * 重新連接帳號（模擬授權流程，含載入延遲）
   */
  const reconnectAccount = useCallback((accountId: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setAccounts(prev => prev.map(account => 
          account.id === accountId 
            ? { ...account, status: 'verified' as const, lastSynced: 'Just now' }
            : account
        ));
        resolve();
      }, 1200);
    });
  }, []);

  /**
   * 刪除帳號
   */
  const deleteAccount = useCallback((accountId: string) => {
    console.log(`Deleting account ${accountId}`);
    // TODO: 實作刪除帳號的實際邏輯
    setAccounts(prev => prev.filter(account => account.id !== accountId));
  }, []);

  /**
   * 格式化粉絲數
   */
  const formatFollowers = useCallback((followers: number | undefined): string => {
    if (!followers) return '-';
    if (followers >= 1000000) {
      return (followers / 1000000).toFixed(1) + 'M';
    }
    if (followers >= 1000) {
      return (followers / 1000).toFixed(1) + 'K';
    }
    return followers.toString();
  }, []);

  return {
    // 數據
    accounts,
    showSwitchModal,
    
    // 查詢函數
    getAccountsByPlatform,
    formatFollowers,
    
    // 操作函數
    togglePrimary,
    handleAddAccount,
    executeAddAccount,
    reconnectAccount,
    deleteAccount,
    setShowSwitchModal,
  };
}
