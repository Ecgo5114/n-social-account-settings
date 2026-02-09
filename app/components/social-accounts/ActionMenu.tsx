'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { RefreshCw, Loader2, Star, Link2Off, HelpCircle, ExternalLink } from 'lucide-react';
import type { Platform } from '@/app/types/social-accounts';
import { platformConfig } from '@/app/constants/platform-config';

interface ActionMenuProps {
  trigger: React.ReactNode;
  platform: Platform;
  accountHandle: string;
  isPrimary?: boolean;
  /** 若為 true 表示帳號列已顯示 Reconnect 按鈕，不重複顯示 */
  isExpired?: boolean;
  onDisconnect: () => void;
  onReconnect: () => Promise<void>;
  onSetPrimary?: () => void;
}

const MENU_APPROX_HEIGHT = 180;

function getPlatformProfileUrl(platform: Platform, handle: string): string | null {
  const h = handle.replace(/^@/, '');
  const urls: Partial<Record<Platform, string>> = {
    twitter: `https://x.com/${h}`,
    instagram: `https://instagram.com/${h}`,
    linkedin: `https://linkedin.com/company/${h}`,
    youtube: `https://youtube.com/@${h}`,
    tiktok: `https://tiktok.com/@${h}`,
    facebook: `https://facebook.com/${h}`,
    threads: `https://threads.net/@${h}`,
    pinterest: `https://pinterest.com/${h}`,
    snapchat: `https://snapchat.com/add/${h}`,
    reddit: `https://reddit.com/user/${h}`,
  };
  return urls[platform] ?? null;
}

export function ActionMenu(props: ActionMenuProps) {
  const { trigger, platform, accountHandle, isPrimary, isExpired = false, onDisconnect, onReconnect, onSetPrimary } = props;
  const profileUrl = getPlatformProfileUrl(platform, accountHandle);
  const showReconnect = !isExpired;
  const [open, setOpen] = useState(false);
  const [reconnecting, setReconnecting] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{ top?: number; bottom?: number; left: number } | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) {
      setMenuPosition(null);
      return;
    }
    if (!triggerRef.current || typeof document === 'undefined') return;
    const rect = triggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const openUpward = spaceBelow < MENU_APPROX_HEIGHT;
    const left = Math.max(8, Math.min(rect.right - 180, window.innerWidth - 188));
    setMenuPosition({
      left,
      ...(openUpward ? { bottom: window.innerHeight - rect.top + 4 } : { top: rect.bottom + 4 }),
    });
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (menuRef.current && !menuRef.current.contains(target) && triggerRef.current && !triggerRef.current.contains(target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const handleReconnect = async () => {
    setReconnecting(true);
    await onReconnect();
    setReconnecting(false);
    setOpen(false);
  };

  const handleDisconnect = () => {
    setOpen(false);
    onDisconnect();
  };

  const handleSetPrimary = () => {
    onSetPrimary?.();
    setOpen(false);
  };

  const showSetPrimary = platform === 'instagram' && !isPrimary;

  const menuContent = open && menuPosition && (
    <div
      ref={menuRef}
      className="fixed z-[100] min-w-[180px] py-1 bg-white rounded-[8px] shadow-lg border border-gray-200"
      style={{
        left: menuPosition.left,
        ...(menuPosition.top != null ? { top: menuPosition.top } : { bottom: menuPosition.bottom }),
      }}
    >
          {profileUrl && (
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="w-full px-4 py-2.5 text-sm text-gray-700 text-left hover:bg-slate-50 transition-colors cursor-pointer flex items-center gap-2.5"
            >
              <ExternalLink className="w-4 h-4 text-gray-500 flex-shrink-0" />
              View on {platformConfig[platform].name.split(' / ')[0]}
            </a>
          )}
          {showSetPrimary && (
            <button type="button" onClick={handleSetPrimary} className="w-full px-4 py-2.5 text-sm text-gray-700 text-left hover:bg-slate-50 transition-colors cursor-pointer flex items-center group/setprimary">
              <span className="flex items-center gap-2.5">
                <Star className="w-4 h-4 text-gray-500" />
                Set as Primary
              </span>
              <span className="relative flex-shrink-0 text-gray-400 cursor-help ml-2 inline-flex justify-center">
                <HelpCircle className="w-3.5 h-3.5" />
                <span className="absolute right-0 bottom-full mb-2 left-auto px-2 py-1.5 bg-gray-900 text-white text-xs rounded opacity-0 group-hover/setprimary:opacity-100 pointer-events-none transition-opacity z-[101] whitespace-nowrap text-left">
                  Make this your default account for new posts.
                  <span className="absolute top-full right-2 left-auto border-[6px] border-transparent border-t-gray-900" />
                </span>
              </span>
            </button>
          )}
          {showReconnect && (
          <button type="button" onClick={handleReconnect} disabled={reconnecting} className="w-full px-4 py-2.5 text-sm text-gray-700 text-left hover:bg-slate-50 transition-colors cursor-pointer flex items-center gap-2.5 disabled:opacity-70">
            {reconnecting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                Reconnecting...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 text-gray-500" />
                Reconnect
              </>
            )}
          </button>
          )}
          <div className="border-t border-gray-200 my-1" />
          <button type="button" onClick={handleDisconnect} className="w-full px-4 py-2.5 text-sm text-red-500 text-left hover:bg-slate-50 transition-colors cursor-pointer flex items-center gap-2.5">
            <Link2Off className="w-4 h-4 text-red-500" />
            Disconnect Account
          </button>
    </div>
  );

  return (
    <div className="relative">
      <button ref={triggerRef} type="button" onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }} className="cursor-pointer">
        {trigger}
      </button>
      {typeof document !== 'undefined' && menuContent && createPortal(menuContent, document.body)}
    </div>
  );
}
