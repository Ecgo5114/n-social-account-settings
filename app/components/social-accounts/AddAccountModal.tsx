'use client';

import { useState, useEffect } from 'react';
import { X, ChevronLeft } from 'lucide-react';
import { platformConfig } from '@/app/constants/platform-config';
import { ADD_ACCOUNT_ERROR_OPTIONS } from '@/app/constants/add-account-errors';
import type { Platform } from '@/app/types/social-accounts';
import type { AddAccountErrorType } from '@/app/constants/add-account-errors';

interface AddAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlatform: (platform: Platform) => void;
  /** 可選：要顯示的平台列表，未提供則用標準 3 平台 */
  platforms?: Platform[];
  /** 各平台目前帳號數 */
  getAccountCount: (platform: Platform) => number;
  /** 新增帳號錯誤情境：先選平台，再選模擬錯誤 */
  isErrorDemoMode?: boolean;
  onSelectErrorType?: (errorType: AddAccountErrorType, platform: Platform) => void;
}

export function AddAccountModal(props: AddAccountModalProps) {
  const { isOpen, onClose, onSelectPlatform, platforms: platformsProp, getAccountCount, isErrorDemoMode, onSelectErrorType } = props;
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);

  useEffect(() => {
    if (isOpen) setSelectedPlatform(null);
  }, [isOpen]);

  if (!isOpen) return null;

  const platforms: Platform[] = platformsProp ?? ['twitter', 'linkedin', 'instagram'];
  const platformItems = platforms.map((platform) => {
    const cfg = platformConfig[platform];
    const count = getAccountCount(platform);
    const max = cfg.maxAccounts === Infinity ? Infinity : cfg.maxAccounts;
    const maxDisplay = cfg.maxAccounts === Infinity ? '∞' : cfg.maxAccounts;
    const disabled = count >= max;
    const message = disabled ? 'Maximum reached' : '';
    return { platform, disabled, message, count, maxDisplay };
  });

  const showErrorStep = isErrorDemoMode && onSelectErrorType && selectedPlatform !== null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 md:p-0" role="dialog" aria-modal="true" aria-labelledby="add-account-modal-title" onClick={onClose}>
      <div className="bg-white rounded-2xl md:rounded-2xl p-4 md:p-6 max-w-2xl w-full h-full md:h-auto md:max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200/50" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            {showErrorStep && (
              <button onClick={() => setSelectedPlatform(null)} className="min-h-[44px] min-w-[44px] md:min-h-0 md:min-w-0 p-2 md:p-1.5 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer" aria-label="Back">
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
            )}
            <h2 id="add-account-modal-title" className="text-h3 font-bold text-gray-900">
              {showErrorStep ? `Simulate error: ${selectedPlatform ? platformConfig[selectedPlatform].name : ''}` : 'Choose Platform'}
            </h2>
          </div>
          <button onClick={onClose} className="min-h-[44px] min-w-[44px] md:min-h-0 md:min-w-0 p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer" aria-label="Close">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {showErrorStep ? (
          <>
            <p className="text-body-base text-gray-500 mb-4">選擇一個要模擬的錯誤狀態（此畫面僅方便示意流程）</p>
            <div className="space-y-2 max-h-[60vh] overflow-y-auto">
              {ADD_ACCOUNT_ERROR_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => onSelectErrorType(opt.value, selectedPlatform!)}
                  className="w-full flex items-center gap-3 p-4 min-h-[44px] rounded-xl border border-gray-200 bg-white hover:border-red-300 hover:bg-red-50/50 transition-all duration-200 text-left cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-red-600 text-body-small font-bold">!</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900">{opt.label}</div>
                    <div className="text-body-small text-gray-500 mt-0.5 line-clamp-2">{opt.message}</div>
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="text-body-base text-gray-500 mb-4">Connect your social media accounts to automate content publishing.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto">
              {platformItems.map(({ platform, disabled, message, count, maxDisplay }) => {
                const config = platformConfig[platform];
                const Icon = config.icon;
                const handleClick = () => {
                  if (disabled) return;
                  if (isErrorDemoMode && onSelectErrorType) {
                    setSelectedPlatform(platform);
                  } else {
                    onSelectPlatform(platform);
                  }
                };
                const btnClass = disabled
                  ? 'bg-gray-100 border-gray-300 cursor-not-allowed opacity-60'
                  : 'bg-white border-gray-200 hover:border-nitra-primary hover:bg-nitra-success-bg/50 cursor-pointer';
                return (
                  <button
                    key={platform}
                    onClick={handleClick}
                    disabled={disabled}
                    className={'flex flex-col items-center gap-3 p-4 rounded-xl border transition-all duration-200 text-center ' + btnClass}
                  >
                    <div className={'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ' + (disabled ? 'bg-gray-200' : config.iconBg)}>
                      <Icon className={'w-6 h-6 ' + (disabled ? 'text-gray-500' : config.color)} />
                    </div>
                    <div className={'font-semibold ' + (disabled ? 'text-gray-500' : 'text-gray-900')}>{config.name}</div>
                    <span className={'inline-flex items-center gap-0.5 px-2.5 py-1 rounded-md text-detail font-medium ' + (disabled ? 'bg-gray-200 text-gray-500' : 'bg-gray-100 text-gray-600')}>
                      {count} / {maxDisplay === '∞' ? <span className="text-base leading-none">∞</span> : maxDisplay} Connected
                    </span>
                    {message ? <div className="text-body-small font-medium text-gray-500">{message}</div> : null}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
