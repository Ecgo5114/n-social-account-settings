import { Users, RefreshCw, MoreHorizontal } from 'lucide-react';
import type { SocialAccount, Platform, LayoutStyle } from '@/app/types/social-accounts';

interface AccountRowProps {
  account: SocialAccount;
  platform: Platform;
  platformColor: string;
  onTogglePrimary: (accountId: string) => void;
  singleInstagram: boolean;
  isLastInGroup: boolean;
  isLastOfAllGroups: boolean;
  layoutStyle?: LayoutStyle;
}

/**
 * 帳號行組件
 * 顯示單個社群帳號的詳細信息和操作按鈕
 */
export function AccountRow({
  account,
  platform,
  platformColor,
  onTogglePrimary,
  singleInstagram,
  isLastInGroup,
  isLastOfAllGroups,
  layoutStyle = 'current',
}: AccountRowProps) {
  const isExpired = account.status === 'expired';
  
  return (
    <div className={`relative group ${isLastInGroup && !isLastOfAllGroups && layoutStyle !== 'new' ? 'border-b border-gray-200' : ''}`}>
      <div
        className={`relative grid grid-cols-12 gap-6 py-3 ${
          layoutStyle === 'new'
            ? 'bg-white hover:bg-gray-50/50 rounded-md shadow-sm'
            : isExpired
              ? 'bg-red-50/40 bg-gray-50/80 hover:bg-gray-100/70'
              : 'bg-gray-50/80 hover:bg-gray-100/70'
        } transition-all duration-200 cursor-pointer ${isLastInGroup && layoutStyle !== 'new' ? 'pb-5' : ''}`}
      >
        {/* 垂直虛線 - 在最左側，1px 粗細 - 只在 current 版型顯示 */}
        {layoutStyle !== 'new' && (
          <div 
            className={`absolute left-[62px] top-0 border-l border-dashed border-gray-300 pointer-events-none ${
              isLastInGroup ? 'h-1/2' : 'bottom-0'
            }`}
          ></div>
        )}
        
        {/* L 形橫向虛線 - 只在最後一個子項目顯示 - 只在 current 版型顯示 */}
        {isLastInGroup && layoutStyle !== 'new' && (
          <div 
            className="absolute left-[62px] top-1/2 w-[8px] border-t border-dashed border-gray-300 pointer-events-none"
          ></div>
        )}
        
        {/* Account Column - 調整縮排 */}
        <div className={`col-span-4 flex items-center gap-2.5 ${layoutStyle === 'new' ? 'pl-5' : 'pl-[70px]'}`}>
          <div className={`${layoutStyle === 'new' ? 'w-8 h-8' : 'w-7 h-7'} rounded-full ${
            layoutStyle === 'new' 
              ? 'bg-[#1A929F]/10 text-[#1A929F]' 
              : 'bg-gray-200 text-gray-700'
          } flex items-center justify-center ${layoutStyle === 'new' ? 'text-xs' : 'text-[10px]'} font-semibold flex-shrink-0`}>
            {account.accountName.substring(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <div className={`${layoutStyle === 'new' ? 'text-sm' : 'text-xs'} font-medium text-gray-900 truncate group-hover:text-[#1A929F] transition-colors duration-200`}>{account.accountName}</div>
              {platform === 'instagram' && account.isPrimary && (
                <span className="inline-flex items-center px-2 py-0 rounded-full text-[10px] font-medium bg-[#1A929F] text-white flex-shrink-0">
                  Primary
                </span>
              )}
            </div>
            <div className={`${layoutStyle === 'new' ? 'text-xs' : 'text-[10px]'} text-gray-400 truncate`}>{account.accountHandle}</div>
          </div>
        </div>

      {/* Status Column (含 Last Synced) */}
      <div className="col-span-3 flex flex-col gap-0.5 justify-center">
        <div className="flex items-center gap-2">
          {account.status === 'verified' ? (
            <>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-600"></div>
              <span className={`${layoutStyle === 'new' ? 'text-sm' : 'text-xs'} font-medium text-emerald-600`}>Connected</span>
            </>
          ) : (
            <>
              <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
              <span className={`${layoutStyle === 'new' ? 'text-sm' : 'text-xs'} font-medium text-red-600`}>Expired</span>
            </>
          )}
        </div>
        {/* Last Synced 作為輔助資訊 */}
        <span className={`${layoutStyle === 'new' ? 'text-xs' : 'text-[10px]'} text-gray-400`}>
          {account.lastSynced || '-'}
        </span>
      </div>

      {/* Followers Column */}
      <div className="col-span-3 flex items-center">
        <div className="flex items-center gap-1.5">
          <Users className={`${layoutStyle === 'new' ? 'w-4 h-4' : 'w-3.5 h-3.5'} text-gray-400`} />
          <span className={`${layoutStyle === 'new' ? 'text-sm' : 'text-xs'} font-medium text-gray-900`}>
            {account.followers 
              ? account.followers >= 1000000 
                ? (account.followers / 1000000).toFixed(1) + 'M'
                : account.followers >= 1000 
                ? (account.followers / 1000).toFixed(1) + 'K'
                : account.followers.toLocaleString()
              : '-'}
          </span>
        </div>
      </div>

      {/* Actions Column */}
      <div className={`col-span-2 flex items-center justify-end gap-2 ${layoutStyle === 'new' ? 'pr-5' : 'pr-6'}`}>
        {account.status === 'expired' && (
          <button 
            className={`px-3 py-1.5 text-xs font-medium ${
              layoutStyle === 'new'
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'text-red-600 border border-red-300 hover:bg-red-50'
            } rounded-lg transition-all duration-200 cursor-pointer flex items-center gap-1.5`}
            title="Reconnect account"
            aria-label="重新連接帳號"
          >
            <RefreshCw className={`${layoutStyle === 'new' ? 'w-3.5 h-3.5' : 'w-3.5 h-3.5'}`} />
            Reconnect
          </button>
        )}
        <button 
          className={`${layoutStyle === 'new' ? 'px-2.5 py-1.5' : 'p-1.5'} bg-gray-50 hover:bg-gray-100 rounded-lg transition-all duration-200 cursor-pointer border border-gray-200`}
          title="More"
          aria-label="更多選項"
        >
          <MoreHorizontal className={`${layoutStyle === 'new' ? 'w-4 h-4' : 'w-4 h-4'} text-gray-600 hover:text-[#1A929F] transition-colors duration-200`} />
        </button>
      </div>
      </div>
    </div>
  );
}
