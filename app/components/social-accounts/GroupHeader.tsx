import { ChevronDown, ChevronRight, AlertCircle } from 'lucide-react';
import type { LayoutStyle } from '@/app/types/social-accounts';

interface GroupHeaderProps {
  icon: any;
  name: string;
  color: string;
  accountCount: number;
  maxAccounts: number | string;
  expiredCount: number;
  onAddAccount: () => void;
  expanded: boolean;
  onToggle: () => void;
  layoutStyle?: LayoutStyle;
}

/**
 * 平台群組標題組件
 * 顯示平台名稱、圖標、帳號數量和展開/收起按鈕
 */
export function GroupHeader({
  icon: Icon,
  name,
  color,
  accountCount,
  maxAccounts,
  expiredCount,
  onAddAccount,
  expanded,
  onToggle,
  layoutStyle = 'current',
}: GroupHeaderProps) {
  return (
    <div className="relative">
      <div className={`grid grid-cols-12 gap-6 ${layoutStyle === 'new' ? 'px-3 py-3' : 'px-6 py-4'} ${layoutStyle === 'new' ? 'bg-transparent' : 'bg-white'}`}>
        <div className="col-span-4 flex items-center gap-2.5">
          {/* 展開/收起按鈕 */}
          <button
            onClick={onToggle}
            className={`${layoutStyle === 'new' ? 'w-6 h-6' : 'w-5 h-5'} flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer`}
          >
            {expanded ? (
              <ChevronDown className={`${layoutStyle === 'new' ? 'w-[18px] h-[18px]' : 'w-4 h-4'}`} />
            ) : (
              <ChevronRight className={`${layoutStyle === 'new' ? 'w-[18px] h-[18px]' : 'w-4 h-4'}`} />
            )}
          </button>
          
          <div className={`${layoutStyle === 'new' ? 'w-8 h-8' : 'w-7 h-7'} rounded-lg ${color === 'text-black' ? 'bg-gray-100 border border-gray-200' : color === 'text-[#0A66C2]' ? 'bg-blue-50 border border-blue-200' : 'bg-pink-50 border border-pink-200'} flex items-center justify-center`}>
            <Icon className={`${layoutStyle === 'new' ? 'w-[18px] h-[18px]' : 'w-4 h-4'} ${color}`} />
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-sm font-semibold text-gray-900">{name}</span>
            {expiredCount > 0 && (
              <div className={`flex items-center gap-1 ${layoutStyle === 'new' ? 'px-2.5 py-1 border border-red-300 bg-white rounded-full' : 'px-2 py-0.5 bg-orange-50 rounded-full'}`}>
                <AlertCircle className={`${layoutStyle === 'new' ? 'w-3.5 h-3.5 text-red-600' : 'w-3 h-3 text-orange-600'}`} />
                <span className={`${layoutStyle === 'new' ? 'text-xs text-red-600' : 'text-[10px] text-orange-600'} font-medium`}>
                  {expiredCount} {expiredCount === 1 ? 'issue' : 'issues'} pending
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="col-span-8 flex items-center justify-end">
          <span className={`inline-flex items-center ${layoutStyle === 'new' ? 'px-3 py-1.5' : 'px-2.5 py-1'} bg-gray-100 rounded-md ${layoutStyle === 'new' ? 'text-xs' : 'text-[10px]'} font-medium text-gray-600`}>
            {accountCount} / {maxAccounts} Connected
          </span>
        </div>
      </div>
    </div>
  );
}
