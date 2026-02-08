import { useState, useCallback } from 'react';
import type { SocialAccount, Platform } from '@/app/types/social-accounts';
import { EXPANSION_PLATFORMS, platformConfig } from '@/app/constants/platform-config';

// Demo 情境類型（與 LayoutStyleToggle 同步）
export type DemoScenario = 'normal' | 'multiple-expired' | 'expansion-preview' | 'empty' | 'add-account-error';

// 用於產生唯一 ID
let accountIdCounter = 100;

// 產生擴充預覽 mock 資料（12 平台、30+ 帳號，資料驅動，遵守各平台帳號上限）
function generateExpansionMockData(): SocialAccount[] {
  const accounts: SocialAccount[] = [];
  let id = 1;
  const statuses: Array<'verified' | 'expired'> = ['verified', 'expired'];
  const syncLabels = ['Just now', '5 minutes ago', '10 minutes ago', '1 hour ago', '2 hours ago'];
  for (const platform of EXPANSION_PLATFORMS) {
    const rawCount = 1 + Math.floor(((id + platform.charCodeAt(0)) % 5));
    const max = platformConfig[platform].maxAccounts === Infinity ? 5 : platformConfig[platform].maxAccounts;
    const count = Math.min(rawCount, max);
    for (let i = 0; i < count; i++) {
      const status = statuses[(id + i) % 2];
      accounts.push({
        id: String(id++),
        platform,
        accountName: `${platform.charAt(0).toUpperCase() + platform.slice(1)} Account ${i + 1}`,
        accountHandle: platform === 'twitter' ? `@${platform}_${i + 1}` : `${platform}-account-${i + 1}`,
        status,
        followers: Math.floor(Math.random() * 500000) + 1000,
        lastSynced: syncLabels[(id + i) % syncLabels.length],
        ...(platform === 'instagram' && i === 0 ? { isPrimary: true } : {}),
        ...(platform === 'linkedin' ? { linkedinType: 'Company Page' } : {}),
      });
    }
  }
  return accounts;
}

// 一般情境：5 筆帳號，全部 verified
function getNormalAccounts(): SocialAccount[] {
  return [
    { id: '1', platform: 'twitter', accountName: 'TechCorp Official', accountHandle: '@techcorp', status: 'verified', followers: 125400, lastSynced: 'Just now' },
    { id: '2', platform: 'twitter', accountName: 'TechCorp Support', accountHandle: '@techcorp_help', status: 'verified', followers: 43200, lastSynced: '5 minutes ago' },
    { id: '3', platform: 'linkedin', accountName: 'TechCorp Inc.', accountHandle: 'techcorp-inc', status: 'verified', linkedinType: 'Company Page', followers: 89500, lastSynced: '10 minutes ago' },
    { id: '4', platform: 'instagram', accountName: 'TechCorp', accountHandle: '@techcorp.official', status: 'verified', isPrimary: true, followers: 234800, lastSynced: 'Just now' },
    { id: '5', platform: 'instagram', accountName: 'TechCorp Careers', accountHandle: '@techcorp.careers', status: 'verified', isPrimary: false, followers: 12300, lastSynced: 'Just now' },
  ];
}

// 多個過期帳號情境：5 Twitter (1 過期), 1 LinkedIn (正常), 2 Instagram (1 過期)
function getMultipleExpiredAccounts(): SocialAccount[] {
  return [
    { id: 'me-1', platform: 'twitter', accountName: 'TechCorp Official', accountHandle: '@techcorp', status: 'verified', followers: 125400, lastSynced: 'Just now' },
    { id: 'me-2', platform: 'twitter', accountName: 'TechCorp Support', accountHandle: '@techcorp_help', status: 'verified', followers: 43200, lastSynced: '5 minutes ago' },
    { id: 'me-3', platform: 'twitter', accountName: 'TechCorp News', accountHandle: '@techcorp_news', status: 'verified', followers: 21000, lastSynced: '1 hour ago' },
    { id: 'me-4', platform: 'twitter', accountName: 'TechCorp Dev', accountHandle: '@techcorp_dev', status: 'verified', followers: 8500, lastSynced: '10 minutes ago' },
    { id: 'me-5', platform: 'twitter', accountName: 'TechCorp HQ', accountHandle: '@techcorp_hq', status: 'expired', followers: 98000, lastSynced: '2 hours ago' },
    { id: 'me-6', platform: 'linkedin', accountName: 'TechCorp Inc.', accountHandle: 'techcorp-inc', status: 'verified', linkedinType: 'Company Page', followers: 89500, lastSynced: '10 minutes ago' },
    { id: 'me-7', platform: 'instagram', accountName: 'TechCorp', accountHandle: '@techcorp.official', status: 'expired', isPrimary: true, followers: 234800, lastSynced: '2 hours ago' },
    { id: 'me-8', platform: 'instagram', accountName: 'TechCorp Careers', accountHandle: '@techcorp.careers', status: 'verified', isPrimary: false, followers: 12300, lastSynced: 'Just now' },
  ];
}

// 取得各情境的初始資料（互不影響）
function getInitialDataForScenario(scenario: DemoScenario): SocialAccount[] {
  switch (scenario) {
    case 'empty':
      return [];
    case 'multiple-expired':
      return getMultipleExpiredAccounts();
    case 'expansion-preview':
      return generateExpansionMockData();
    case 'add-account-error':
      return getNormalAccounts(); // 先與一般情境相同，功能待實作
    case 'normal':
    default:
      return getNormalAccounts();
  }
}

const ALL_SCENARIOS: DemoScenario[] = ['normal', 'multiple-expired', 'expansion-preview', 'empty', 'add-account-error'];

/**
 * 管理社群帳號數據和操作的 Hook
 * 各 Demo 情境的資料獨立，切換情境不會互相影響
 */
export function useSocialAccounts(demoScenario: DemoScenario = 'normal') {
  const [accountsByScenario, setAccountsByScenario] = useState<Record<DemoScenario, SocialAccount[]>>(() =>
    Object.fromEntries(
      ALL_SCENARIOS.map((s) => [s, getInitialDataForScenario(s)])
    ) as Record<DemoScenario, SocialAccount[]>
  );

  const accounts = accountsByScenario[demoScenario];

  const [showSwitchModal, setShowSwitchModal] = useState(false);

  const updateCurrentScenario = useCallback(
    (updater: (prev: SocialAccount[]) => SocialAccount[]) => {
      setAccountsByScenario((prev) => ({
        ...prev,
        [demoScenario]: updater(prev[demoScenario]),
      }));
    },
    [demoScenario]
  );

  const getAccountsByPlatform = useCallback(
    (platform: Platform) => accounts.filter((acc) => acc.platform === platform),
    [accounts]
  );

  const togglePrimary = useCallback(
    (accountId: string) => {
      const instagramAccounts = accounts.filter((acc) => acc.platform === 'instagram');
      if (instagramAccounts.length === 1) return;
      updateCurrentScenario((prev) =>
        prev.map((acc) =>
          acc.platform === 'instagram'
            ? { ...acc, isPrimary: acc.id === accountId }
            : acc
        )
      );
    },
    [accounts, updateCurrentScenario]
  );

  const handleAddAccount = useCallback(
    (platform: Platform) => {
      if (platform === 'linkedin') {
        const linkedinAccounts = accounts.filter((acc) => acc.platform === 'linkedin');
        if (linkedinAccounts.length > 0) {
          setShowSwitchModal(true);
          return;
        }
      }
      if (platform === 'instagram') {
        const instagramAccounts = accounts.filter((acc) => acc.platform === 'instagram');
        if (instagramAccounts.length >= 2) return;
      }
      console.log(`Adding new ${platform} account`);
    },
    [accounts]
  );

  const executeAddAccount = useCallback(
    (platform: Platform): Promise<SocialAccount> => {
      const newAccount: SocialAccount = {
        id: `new-${++accountIdCounter}`,
        platform,
        accountName: `New ${platform.charAt(0).toUpperCase() + platform.slice(1)} Account`,
        accountHandle: platform === 'twitter' ? '@new_account' : 'new-account',
        status: 'verified',
        followers: Math.floor(Math.random() * 50000) + 1000,
        lastSynced: 'Just now',
        isPrimary: false,
      };
      if (platform === 'linkedin') newAccount.linkedinType = 'Company Page';
      updateCurrentScenario((prev) => [...prev, newAccount]);
      return Promise.resolve(newAccount);
    },
    [updateCurrentScenario]
  );

  const reconnectAccount = useCallback(
    (accountId: string): Promise<void> =>
      new Promise((resolve) => {
        setTimeout(() => {
          updateCurrentScenario((prev) =>
            prev.map((acc) =>
              acc.id === accountId
                ? { ...acc, status: 'verified' as const, lastSynced: 'Just now' }
                : acc
            )
          );
          resolve();
        }, 1200);
      }),
    [updateCurrentScenario]
  );

  const deleteAccount = useCallback(
    (accountId: string) => {
      updateCurrentScenario((prev) => {
        const accountToDelete = prev.find((a) => a.id === accountId);
        const remaining = prev.filter((a) => a.id !== accountId);
        if (!accountToDelete || accountToDelete.platform !== 'instagram') return remaining;
        const remainingIg = remaining.filter((a) => a.platform === 'instagram');
        if (remainingIg.length === 0) return remaining;
        const needNewPrimary = accountToDelete.isPrimary || remainingIg.length === 1;
        const newPrimaryId = needNewPrimary ? remainingIg[0].id : null;
        return remaining.map((a) =>
          a.platform === 'instagram' ? { ...a, isPrimary: a.id === newPrimaryId } : a
        );
      });
    },
    [updateCurrentScenario]
  );

  const formatFollowers = useCallback((followers: number | undefined): string => {
    if (!followers) return '-';
    if (followers >= 1000000) return (followers / 1000000).toFixed(1) + 'M';
    if (followers >= 1000) return (followers / 1000).toFixed(1) + 'K';
    return followers.toString();
  }, []);

  return {
    accounts,
    showSwitchModal,
    getAccountsByPlatform,
    formatFollowers,
    togglePrimary,
    handleAddAccount,
    executeAddAccount,
    reconnectAccount,
    deleteAccount,
    setShowSwitchModal,
  };
}
