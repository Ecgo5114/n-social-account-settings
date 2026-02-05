'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { RefreshCw, Loader2, Star, Link2Off } from 'lucide-react';
import type { Platform } from '@/app/types/social-accounts';

interface ActionMenuProps {
  trigger: React.ReactNode;
  platform: Platform;
  isPrimary?: boolean;
  onDisconnect: () => void;
  onReconnect: () => Promise<void>;
  onSetPrimary?: () => void;
}

const MENU_APPROX_HEIGHT = 140;

export function ActionMenu(props: ActionMenuProps) {
  const { trigger, platform, isPrimary, onDisconnect, onReconnect, onSetPrimary } = props;
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
          {showSetPrimary && (
            <button type="button" onClick={handleSetPrimary} className="w-full px-4 py-2.5 text-sm text-gray-700 text-left hover:bg-slate-50 transition-colors cursor-pointer flex items-center gap-2.5">
              <Star className="w-4 h-4 text-gray-500" />
              Set as Primary
            </button>
          )}
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
