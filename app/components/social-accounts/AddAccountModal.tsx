'use client';

import { X } from 'lucide-react';
import { XIcon } from '@/app/components/icons/XIcon';
import { Linkedin, Instagram } from 'lucide-react';
import { platformConfig } from '@/app/constants/platform-config';
import type { Platform } from '@/app/types/social-accounts';

interface AddAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlatform: (platform: Platform) => void;
  linkedinCount: number;
  instagramCount: number;
}

export function AddAccountModal(props: AddAccountModalProps) {
  const { isOpen, onClose, onSelectPlatform, linkedinCount, instagramCount } = props;
  if (!isOpen) return null;

  const linkedinDisabled = linkedinCount >= 1;
  const instagramDisabled = instagramCount >= 2;

  const platforms = [
    { platform: 'twitter' as Platform, disabled: false, message: '' },
    { platform: 'linkedin' as Platform, disabled: linkedinDisabled, message: linkedinDisabled ? 'LinkedIn is limited to 1 account per workspace.' : '' },
    { platform: 'instagram' as Platform, disabled: instagramDisabled, message: instagramDisabled ? 'Max 2 accounts reached for your current plan.' : '' },
  ];

  const getIcon = (p: Platform) => {
    if (p === 'twitter') return XIcon;
    if (p === 'linkedin') return Linkedin;
    return Instagram;
  };

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
        <div className="space-y-2">
          {platforms.map(({ platform, disabled, message }) => {
            const config = platformConfig[platform];
            const Icon = getIcon(platform);
            const btnClass = disabled
              ? 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-70'
              : 'bg-white border-gray-200 hover:border-[#1A929F] hover:bg-emerald-50/30 cursor-pointer';
            const iconBg = platform === 'twitter' ? 'bg-gray-100 border-gray-200' : platform === 'linkedin' ? 'bg-blue-50 border-blue-200' : 'bg-pink-50 border-pink-200';
            return (
              <button
                key={platform}
                onClick={() => !disabled && onSelectPlatform(platform)}
                disabled={disabled}
                className={'w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 text-left ' + btnClass}
              >
                <div className={'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border ' + iconBg}>
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
