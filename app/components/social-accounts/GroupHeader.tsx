import { ChevronDown, ChevronRight, AlertCircle } from 'lucide-react';
import type { LayoutStyle } from '@/app/types/social-accounts';

interface GroupHeaderProps {
  icon: any;
  name: string;
  color: string;
  iconBg?: string;
  accountCount: number;
  maxAccounts: number | string;
  expiredCount: number;
  onAddAccount: () => void;
  expanded: boolean;
  onToggle: () => void;
  layoutStyle?: LayoutStyle;
  /** 用於快速跳轉的 id，如 platform-group-twitter */
  scrollTargetId?: string;
}

/**
 * 平台群組標題組件
 * 顯示平台名稱、圖標、帳號數量和展開/收起按鈕
 */
export function GroupHeader({
  icon: Icon,
  name,
  color,
  iconBg = 'bg-gray-100 border border-gray-200',
  accountCount,
  maxAccounts,
  expiredCount,
  onAddAccount,
  expanded,
  onToggle,
  layoutStyle = 'current',
  scrollTargetId,
}: GroupHeaderProps) {
  return (
    <div id={scrollTargetId} className={`relative ${scrollTargetId ? 'scroll-mt-4' : ''}`}>
      <div className={`grid grid-cols-12 gap-6 ${layoutStyle === 'new' ? 'px-3 py-3' : 'px-6 py-4'} ${layoutStyle === 'new' ? 'bg-transparent' : 'bg-white'}`}>
        <div className="col-span-12 flex items-center gap-2.5">
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
          
          <div className={`${layoutStyle === 'new' ? 'w-8 h-8' : 'w-7 h-7'} rounded-lg ${iconBg} flex items-center justify-center`}>
            <Icon className={`${layoutStyle === 'new' ? 'w-[18px] h-[18px]' : 'w-4 h-4'} ${color}`} />
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-body-base font-bold text-gray-900">{name}</span>
            <span className={`inline-flex items-center gap-0.5 ${layoutStyle === 'new' ? 'px-2.5 py-1 bg-gray-200 rounded-md text-detail' : 'px-2.5 py-1 bg-gray-100 rounded-md text-detail'} font-medium text-gray-600`}>
              {accountCount} / {maxAccounts === '∞' ? <span className="text-base leading-none">∞</span> : maxAccounts} Connected
            </span>
            {expiredCount > 0 && (
              <div className="flex items-center gap-1 px-2.5 py-1 border border-red-300 bg-red-50 rounded-md">
                <AlertCircle className="w-3 h-3 text-red-600" />
                <span className="text-detail text-red-600 font-medium">
                  {expiredCount} {expiredCount === 1 ? 'issue' : 'issues'} pending
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
