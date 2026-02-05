import type { LayoutStyle } from '@/app/types/social-accounts';

interface LayoutStyleToggleProps {
  currentStyle: LayoutStyle;
  onToggle: () => void;
}

/**
 * 版型樣式切換按鈕
 * 固定在右下角，用於切換 current 和 new 版型
 */
export function LayoutStyleToggle({ currentStyle, onToggle }: LayoutStyleToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="fixed bottom-5 right-5 w-9 h-9 bg-gradient-to-br from-[#1A929F] to-[#168995] hover:from-[#168995] hover:to-[#147d89] rounded-full shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer z-50 group flex items-center justify-center"
      title={`Switch to ${currentStyle === 'current' ? 'new' : 'current'} layout`}
      aria-label="切換版型樣式"
    >
      <svg 
        className="w-4 h-4 text-white transition-transform duration-300 group-hover:rotate-180" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
      <div className="absolute -top-9 right-0 px-2 py-1 bg-gray-900/90 backdrop-blur-sm text-white text-[10px] rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 whitespace-nowrap">
        {currentStyle === 'current' ? 'Switch to New' : 'Switch to Current'}
      </div>
    </button>
  );
}
