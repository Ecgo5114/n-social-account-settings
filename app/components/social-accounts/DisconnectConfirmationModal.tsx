'use client';

import Link from 'next/link';
import { AlertTriangle, ExternalLink } from 'lucide-react';
import { platformConfig } from '@/app/constants/platform-config';
import type { SocialAccount } from '@/app/types/social-accounts';

interface DisconnectConfirmationModalProps {
  isOpen: boolean;
  /** 要解除連接的帳號，用於顯示平台 icon、頭像、名稱、ID */
  account?: SocialAccount | null;
  /** 預約發文數量（第二個帳號模擬有預約發文） */
  scheduledPostsCount?: number;
  /** 是否為 Instagram Primary 帳號 */
  isInstagramPrimary?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * 解除連接帳號的確認彈窗
 * 顯示帳號資訊、活動中斷與資料保留說明
 */
export function DisconnectConfirmationModal({
  isOpen,
  account,
  scheduledPostsCount,
  isInstagramPrimary,
  onConfirm,
  onCancel,
}: DisconnectConfirmationModalProps) {
  if (!isOpen) return null;

  const config = account ? platformConfig[account.platform] : null;
  const Icon = config?.icon;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="disconnect-modal-title"
      onClick={onCancel}
    >
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl border border-gray-200/50" onClick={(e) => e.stopPropagation()}>
        <h3 id="disconnect-modal-title" className="text-lg font-bold text-gray-900 mb-4">
          Disconnect {config?.name ?? 'account'}?
        </h3>

        {/* 帳號資訊：平台 icon + 頭像 + 名稱 + ID */}
        {account && (
          <div className="flex items-center gap-3 px-4 py-3 mb-4 rounded-lg border border-gray-200">
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-[#1A929F]/10 text-[#1A929F] flex items-center justify-center text-sm font-semibold">
                {account.accountName.substring(0, 2).toUpperCase()}
              </div>
              {Icon && (
                <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center ${config.iconBg}`}>
                  <Icon className={`w-3 h-3 ${config.color}`} />
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold text-gray-900 truncate">{account.accountName}</div>
              <div className="text-xs text-gray-500 truncate">{account.accountHandle}</div>
            </div>
          </div>
        )}

        {/* 內文 */}
        <div className="mb-6 space-y-3 text-sm text-gray-600">
          <div>
            <div className="font-semibold text-gray-900 mb-1">⚠️ What will change</div>
            <ul className="list-disc list-inside space-y-0.5 text-gray-600">
              {scheduledPostsCount !== undefined && scheduledPostsCount > 0 && (
                <li className="font-semibold">
                  {scheduledPostsCount} scheduled posts will be canceled.{' '}
                  <Link
                    href="/scheduled-posts"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#1A929F] hover:underline"
                  >
                    View scheduled
                    <ExternalLink className="w-3.5 h-3.5 inline" />
                  </Link>
                </li>
              )}
              {isInstagramPrimary && (
                <li>The other account will become your Primary.</li>
              )}
              <li>Automated publishing and data syncing will stop immediately.</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-gray-900 mb-1">✅ Data Preservation</div>
            <ul className="list-disc list-inside space-y-0.5 text-gray-600">
              <li>Published posts and historical analytics will be preserved.</li>
            </ul>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-semibold text-gray-700 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-semibold cursor-pointer"
          >
            Disconnect account
          </button>
        </div>
      </div>
    </div>
  );
}
