'use client';

import Image from 'next/image';
import { Plus } from 'lucide-react';

interface EmptyStateProps {
  onAddPlatform: () => void;
}

/**
 * 空狀態頁面：當沒有連結任何社群帳號時顯示
 * 使用專案既有文字層級與主要按鈕樣式
 */
export function EmptyState({ onAddPlatform }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[420px] bg-white border-2 border-dashed border-gray-200 rounded-xl px-6">
      {/* 圖示區塊：社群平台 Logo 組合圖 */}
      <div className="relative flex items-center justify-center mb-8">
        <Image
          src="/images/empty-state-social-logos.png"
          alt="Instagram, X, LinkedIn"
          width={120}
          height={66}
          className="object-contain"
          priority
        />
      </div>

      {/* 主標題 - 與頁面標題同層級 */}
      <h3 className="text-h1 font-bold text-gray-900 mb-2 text-center">
        Connect Your First Account
      </h3>

      {/* 描述文字 - 次要文字層級 */}
      <p className="text-body-base text-gray-500 text-center max-w-md mb-8">
        Link your social media profiles to start automating your workflow in minutes.
      </p>

      {/* Add Platform 按鈕 - 使用專案主要按鈕樣式 */}
      <button
        onClick={onAddPlatform}
        className="flex items-center gap-2 px-4 py-2 bg-nitra-primary text-white rounded-lg transition-all duration-200 text-body-base font-bold cursor-pointer hover:opacity-90"
      >
        <Plus className="w-4 h-4" />
        Add Account
      </button>
    </div>
  );
}
