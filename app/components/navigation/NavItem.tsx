import { ChevronUp, ChevronDown } from 'lucide-react';
import type { LayoutStyle } from '@/app/types/social-accounts';

interface NavItemProps {
  icon: any;
  label: string;
  active?: boolean;
  expanded?: boolean;
  hasSubmenu?: boolean;
  submenuExpanded?: boolean;
  isSubmenu?: boolean;
  strokeWidth?: number;
  layoutStyle?: LayoutStyle;
}

/**
 * 導航項目組件
 * 用於左側邊欄的導航按鈕
 */
export function NavItem({ 
  icon: Icon, 
  label, 
  active = false, 
  expanded = true, 
  hasSubmenu = false, 
  submenuExpanded = false,
  isSubmenu = false,
  strokeWidth = 2,
  layoutStyle = 'current'
}: NavItemProps) {
  const iconSize = layoutStyle === 'new' ? 'w-[18px] h-[18px]' : 'w-5 h-5';
  const iconColor = layoutStyle === 'new' && !active ? 'text-gray-500' : '';
  
  return (
    <div className="relative group">
      <button
        className={`w-full flex items-center gap-3 ${isSubmenu ? 'pl-11 pr-3 py-2' : 'px-3 py-2.5'} mb-1 rounded-lg transition-all duration-200 cursor-pointer ${
          active
            ? isSubmenu 
              ? 'bg-nitra-primary text-white'
              : 'bg-nitra-primary text-white'
            : isSubmenu
              ? 'text-gray-700 hover:bg-gray-100/80'
              : layoutStyle === 'new'
                ? 'text-gray-600 hover:bg-gray-100'
                : 'text-gray-700 hover:bg-gray-100'
        } ${expanded ? '' : 'justify-center'}`}
        title={!expanded ? label : undefined}
      >
        {!isSubmenu && <Icon className={`flex-shrink-0 ${iconSize} ${iconColor}`} strokeWidth={strokeWidth} />}
        {expanded && (
          <>
            <span className={`text-body-base font-medium whitespace-nowrap flex-1 text-left ${isSubmenu ? 'text-body-small' : ''}`}>{label}</span>
            {hasSubmenu && (
              submenuExpanded ? 
                <ChevronUp className="w-4 h-4" strokeWidth={strokeWidth} /> : 
                <ChevronDown className="w-4 h-4" strokeWidth={strokeWidth} />
            )}
          </>
        )}
      </button>
      
      {/* Tooltip 當收起時顯示 */}
      {!expanded && !isSubmenu && (
        <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900/95 backdrop-blur-sm text-white text-body-base rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 whitespace-nowrap z-50 shadow-xl">
          {label}
        </div>
      )}
    </div>
  );
}
