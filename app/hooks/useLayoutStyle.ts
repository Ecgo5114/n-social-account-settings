import { useState } from 'react';
import type { LayoutStyle } from '@/app/types/social-accounts';

/**
 * 管理版型樣式切換的 Hook
 * @param initialStyle 初始版型樣式，預設為 'current'
 * @returns layoutStyle 和切換函數
 */
export function useLayoutStyle(initialStyle: LayoutStyle = 'current') {
  const [layoutStyle, setLayoutStyle] = useState<LayoutStyle>(initialStyle);

  const toggleLayoutStyle = () => {
    setLayoutStyle(prev => prev === 'current' ? 'new' : 'current');
  };

  return {
    layoutStyle,
    setLayoutStyle,
    toggleLayoutStyle,
  };
}
