'use client';

import { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, RefreshCw, MoreHorizontal, Loader2 } from 'lucide-react';
import { ActionMenu } from './ActionMenu';
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
  /** 是否顯示新增成功的高亮動畫（3 秒後淡出） */
  isHighlighted?: boolean;
  /** 點擊 Disconnect 時觸發（顯示確認彈窗） */
  onDisconnectRequest: () => void;
  /** 點擊 Reconnect 時觸發（重新連接／刷新，需回傳 Promise 以支援載入狀態） */
  onReconnect: () => Promise<void>;
}

/**
 * 帳號行組件
 * 顯示單個社群帳號的詳細信息和操作按鈕
 */
export const AccountRow = forwardRef<HTMLDivElement, AccountRowProps>(function AccountRow({
  account,
  platform,
  platformColor,
  onTogglePrimary,
  singleInstagram,
  isLastInGroup,
  isLastOfAllGroups,
  layoutStyle = 'current',
  isHighlighted = false,
  onDisconnectRequest,
  onReconnect,
}, ref) {
  const [reconnecting, setReconnecting] = useState(false);
  const isExpired = account.status === 'expired';

  const handleReconnect = async () => {
    setReconnecting(true);
    await onReconnect();
    setReconnecting(false);
  };
  const baseBg = layoutStyle === 'new'
    ? 'bg-white hover:bg-[#85bac01a]'
    : 'bg-gray-50/80 hover:bg-[#EDF3F5]';
  const highlightBg = isHighlighted ? 'bg-[#E5F4F5]' : baseBg;

  return (
    <div ref={ref} className={`relative group ${isLastInGroup && !isLastOfAllGroups && layoutStyle !== 'new' ? 'border-b border-gray-200' : ''}`}>
      {/* 高亮：整條 1px 邊框 + 實色淺底，置頂顯示以確保 new theme 可見 */}
      <motion.div
        initial={false}
        animate={{
          opacity: isHighlighted ? 1 : 0,
        }}
        transition={{
          duration: isHighlighted ? 0.2 : 0.5,
        }}
        className={`absolute inset-0 z-20 pointer-events-none ${layoutStyle === 'new' ? 'rounded-md' : 'rounded-none'} ${
          isHighlighted ? 'border border-[#3DB5C0]' : ''
        }`}
      />
      <div
        className={`relative z-10 grid grid-cols-12 gap-6 py-3 transition-colors duration-200 cursor-pointer ${highlightBg} shadow-none ${layoutStyle === 'new' ? 'rounded-md' : 'rounded-none'}`}
      >
        {/* 垂直虛線 - 從開合箭頭下方延伸 - 只在 current 版型顯示 */}
        {layoutStyle !== 'new' && (
          <div 
            className={`absolute left-[34px] top-0 border-l border-dashed border-gray-300 pointer-events-none ${
              isLastInGroup ? 'h-1/2' : 'bottom-0'
            }`}
          ></div>
        )}
        
        {/* L 形橫向虛線 - 只在最後一個子項目顯示 - 只在 current 版型顯示 */}
        {isLastInGroup && layoutStyle !== 'new' && (
          <div 
            className="absolute left-[34px] top-1/2 w-[8px] border-t border-dashed border-gray-300 pointer-events-none"
          ></div>
        )}
        
        {/* Account Column - 調整縮排 */}
        <div className={`col-span-4 flex items-center gap-2.5 ${layoutStyle === 'new' ? 'pl-5' : 'pl-[70px]'}`}>
          <div className={`${layoutStyle === 'new' ? 'w-8 h-8' : 'w-7 h-7'} rounded-full ${
            layoutStyle === 'new' 
              ? 'bg-[#1A929F]/10 text-[#1A929F]' 
              : 'bg-gray-200 text-gray-700'
          } flex items-center justify-center text-xs font-semibold flex-shrink-0`}>
            {account.accountName.substring(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <div className="text-sm font-medium text-gray-900 truncate group-hover:text-[#1A929F] transition-colors duration-200">{account.accountName}</div>
              {platform === 'instagram' && account.isPrimary && (
                <span className="relative group/primary inline-flex">
                  <span className="inline-flex items-center px-2 py-0 rounded-full text-[10px] font-medium bg-[#1A929F] text-white flex-shrink-0 cursor-help">
                    Primary
                  </span>
                  <span className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 px-2 py-1.5 bg-gray-900 text-white text-[10px] rounded opacity-0 group-hover/primary:opacity-100 pointer-events-none transition-opacity z-50 w-[280px] text-center leading-relaxed">
                    This account is used as the default for scheduling posts and will be featured first in your analytics reports.
                    <span className="absolute left-1/2 top-full -translate-x-1/2 border-[6px] border-transparent border-t-gray-900" />
                  </span>
                </span>
              )}
            </div>
            <div className="text-xs text-gray-400 truncate">{account.accountHandle}</div>
          </div>
        </div>

      {/* Status Column (含 Last Synced) */}
      <div className="col-span-3 flex flex-col gap-0.5 justify-center">
        <div className="flex items-center gap-2">
          {account.status === 'verified' ? (
            <>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-600"></div>
              <span className="text-sm font-medium text-emerald-600">Connected</span>
            </>
          ) : (
            <>
              <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
              <span className="text-sm font-medium text-red-600">Expired</span>
            </>
          )}
        </div>
        {/* Last Synced 作為輔助資訊 */}
        <span className="text-xs text-gray-400">
          {account.lastSynced || '-'}
        </span>
      </div>

      {/* Followers Column */}
      <div className="col-span-3 flex items-center">
        <div className="flex items-center gap-1.5">
          <Users className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-900">
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
            onClick={(e) => { e.stopPropagation(); handleReconnect(); }}
            disabled={reconnecting}
            className={`px-3 py-1.5 text-xs font-medium ${
              layoutStyle === 'new'
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'text-red-600 border border-red-300 hover:bg-red-50'
            } rounded-lg transition-all duration-200 cursor-pointer flex items-center gap-1.5 disabled:opacity-70`}
            title="Reconnect account"
            aria-label="重新連接帳號"
          >
            {reconnecting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <RefreshCw className="w-3.5 h-3.5" />
            )}
            {reconnecting ? 'Reconnecting...' : 'Reconnect'}
          </button>
        )}
        <ActionMenu
          trigger={
            <span className={`inline-flex ${layoutStyle === 'new' ? 'px-2.5 py-1.5' : 'p-1.5'} bg-gray-50 hover:bg-gray-100 rounded-lg transition-all duration-200 border border-gray-200`}>
              <MoreHorizontal className={`${layoutStyle === 'new' ? 'w-4 h-4' : 'w-4 h-4'} text-gray-600 hover:text-[#1A929F] transition-colors duration-200`} />
            </span>
          }
          platform={platform}
          accountHandle={account.accountHandle}
          isPrimary={account.isPrimary}
          isExpired={account.status === 'expired'}
          onDisconnect={onDisconnectRequest}
          onReconnect={onReconnect}
          onSetPrimary={platform === 'instagram' && !singleInstagram ? () => onTogglePrimary(account.id) : undefined}
        />
      </div>
      </div>
    </div>
  );
});
