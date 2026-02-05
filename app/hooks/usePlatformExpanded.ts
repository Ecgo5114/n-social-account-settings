import { useState } from 'react';
import type { Platform } from '@/app/types/social-accounts';

/**
 * 管理平台展開/收起狀態的 Hook
 * @returns platformExpanded 狀態和切換函數
 */
export function usePlatformExpanded() {
  const [platformExpanded, setPlatformExpanded] = useState<Record<Platform, boolean>>({
    twitter: true,
    linkedin: true,
    instagram: true,
  });

  /**
   * 切換特定平台的展開/收起狀態
   */
  const togglePlatformExpanded = (platform: Platform) => {
    setPlatformExpanded(prev => ({
      ...prev,
      [platform]: !prev[platform]
    }));
  };

  /**
   * 展開所有平台
   */
  const expandAll = () => {
    setPlatformExpanded({
      twitter: true,
      linkedin: true,
      instagram: true,
    });
  };

  /**
   * 收起所有平台
   */
  const collapseAll = () => {
    setPlatformExpanded({
      twitter: false,
      linkedin: false,
      instagram: false,
    });
  };

  return {
    platformExpanded,
    togglePlatformExpanded,
    expandAll,
    collapseAll,
  };
}
