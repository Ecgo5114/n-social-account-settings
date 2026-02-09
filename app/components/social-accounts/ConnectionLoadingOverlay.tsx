'use client';

import { Loader2 } from 'lucide-react';
import type { Platform } from '@/app/types/social-accounts';
import { platformConfig } from '@/app/constants/platform-config';

interface ConnectionLoadingOverlayProps {
  isVisible: boolean;
  platform: Platform | null;
}

export function ConnectionLoadingOverlay({
  isVisible,
  platform,
}: ConnectionLoadingOverlayProps) {
  if (!isVisible || !platform) return null;

  const config = platformConfig[platform];

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] animate-in fade-in duration-200"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl flex flex-col items-center gap-4">
        <Loader2 className="w-12 h-12 text-nitra-primary animate-spin" />
        <div className="text-center">
          <p className="font-semibold text-gray-900">Connecting to {config.name}</p>
          <p className="text-body-base text-gray-500 mt-1">
            Authorizing with {config.name}...
          </p>
        </div>
      </div>
    </div>
  );
}
