import { useState } from 'react';
import type { Platform } from '@/app/types/social-accounts';
import { EXPANSION_PLATFORMS } from '@/app/constants/platform-config';

const allTrue = Object.fromEntries(EXPANSION_PLATFORMS.map(p => [p, true])) as Record<Platform, boolean>;
const allFalse = Object.fromEntries(EXPANSION_PLATFORMS.map(p => [p, false])) as Record<Platform, boolean>;

/**
 * 管理平台展開/收起狀態的 Hook
 * @returns platformExpanded 狀態和切換函數
 */
export function usePlatformExpanded() {
  const [platformExpanded, setPlatformExpanded] = useState<Record<Platform, boolean>>(allTrue);

  /**
   * 切換特定平台的展開/收起狀態
   */
  const togglePlatformExpanded = (platform: Platform) => {
    setPlatformExpanded(prev => ({
      ...prev,
      [platform]: !(prev[platform] ?? true)
    }));
  };

  /**
   * 展開特定平台（用於新增帳號後確保該平台可見）
   */
  const expandPlatform = (platform: Platform) => {
    setPlatformExpanded(prev => ({ ...prev, [platform]: true }));
  };

  /**
   * 展開所有平台
   */
  const expandAll = () => setPlatformExpanded({ ...allTrue });

  /**
   * 收起所有平台
   */
  const collapseAll = () => setPlatformExpanded({ ...allFalse });

  return {
    platformExpanded,
    togglePlatformExpanded,
    expandPlatform,
    expandAll,
    collapseAll,
  };
}
