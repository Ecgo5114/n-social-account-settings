'use client';

import { X } from 'lucide-react';
import { platformConfig } from '@/app/constants/platform-config';
import type { Platform } from '@/app/types/social-accounts';

interface AddAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlatform: (platform: Platform) => void;
  /** 可選：要顯示的平台列表，未提供則用標準 3 平台 */
  platforms?: Platform[];
  /** 各平台目前帳號數 */
  getAccountCount: (platform: Platform) => number;
}

export function AddAccountModal(props: AddAccountModalProps) {
  const { isOpen, onClose, onSelectPlatform, platforms: platformsProp, getAccountCount } = props;
  if (!isOpen) return null;

  const platforms: Platform[] = platformsProp ?? ['twitter', 'linkedin', 'instagram'];
  const platformItems = platforms.map((platform) => {
    const cfg = platformConfig[platform];
    const count = getAccountCount(platform);
    const max = cfg.maxAccounts === Infinity ? 999 : cfg.maxAccounts;
    const disabled = count >= max;
    const message = disabled
      ? (platform === 'linkedin'
          ? 'LinkedIn is limited to 1 account per workspace.'
          : `Max ${max} accounts reached for your current plan.`)
      : '';
    return { platform, disabled, message };
  });

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50" role="dialog" aria-modal="true" aria-labelledby="add-account-modal-title">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl border border-gray-200/50">
        <div className="flex items-center justify-between mb-6">
          <h2 id="add-account-modal-title" className="text-lg font-bold text-gray-900">Add Account</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer" aria-label="關閉">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <p className="text-sm text-gray-500 mb-4">Choose a platform to connect your account</p>
        <div className="space-y-2 max-h-[60vh] overflow-y-auto">
          {platformItems.map(({ platform, disabled, message }) => {
            const config = platformConfig[platform];
            const Icon = config.icon;
            const btnClass = disabled
              ? 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-70'
              : 'bg-white border-gray-200 hover:border-[#1A929F] hover:bg-emerald-50/30 cursor-pointer';
            return (
              <button
                key={platform}
                onClick={() => !disabled && onSelectPlatform(platform)}
                disabled={disabled}
                className={'w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 text-left ' + btnClass}
              >
                <div className={'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ' + config.iconBg}>
                  <Icon className={'w-6 h-6 ' + config.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900">{config.name}</div>
                  {message ? <div className="text-xs text-gray-500 mt-0.5">{message}</div> : null}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
