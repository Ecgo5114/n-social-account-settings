'use client';

import { useState, useRef, useEffect } from 'react';
import { Settings2 } from 'lucide-react';
import type { LayoutStyle } from '@/app/types/social-accounts';

export type DemoScenario = 'normal' | 'multiple-expired' | 'expansion-preview' | 'empty' | 'add-account-error';

interface LayoutStyleToggleProps {
  currentStyle: LayoutStyle;
  onStyleChange?: (style: LayoutStyle) => void;
  demoScenario?: DemoScenario;
  onDemoScenarioChange?: (scenario: DemoScenario) => void;
}

const STYLE_OPTIONS: { value: LayoutStyle; label: string }[] = [
  { value: 'current', label: 'Current' },
  { value: 'new', label: 'New' },
];

const DEMO_SCENARIO_OPTIONS: { value: DemoScenario; label: string }[] = [
  { value: 'normal', label: '一般情境' },
  { value: 'multiple-expired', label: '多個過期帳號' },
  { value: 'empty', label: '空狀態' },
  { value: 'add-account-error', label: '新增帳號錯誤' },
  { value: 'expansion-preview', label: '擴充預覽' },
];

/**
 * 版型與情境切換按鈕
 * 固定在右下角，可切換：樣式、Demo 情境、擴充性模擬
 */
export function LayoutStyleToggle({
  currentStyle,
  onStyleChange,
  demoScenario = 'normal',
  onDemoScenarioChange,
}: LayoutStyleToggleProps) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
      {open && (
        <div
          ref={panelRef}
          className="w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-3 px-4 animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          {/* 1. 樣式 */}
          <div className="mb-3">
            <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">樣式</div>
            <div className="flex gap-1">
              {STYLE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => { onStyleChange?.(opt.value); setOpen(false); }}
                  className={`flex-1 px-3 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                    currentStyle === opt.value
                      ? 'bg-[#1A929F] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Demo 情境 */}
          <div className="mb-3">
            <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Demo 情境</div>
            <div className="space-y-1">
              {DEMO_SCENARIO_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => { onDemoScenarioChange?.(opt.value); setOpen(false); }}
                  className={`w-full px-3 py-2 text-xs font-medium rounded-lg text-left transition-colors cursor-pointer ${
                    demoScenario === opt.value
                      ? 'bg-[#1A929F]/10 text-[#1A929F]'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <button
        ref={btnRef}
        onClick={() => setOpen((v) => !v)}
        className="w-9 h-9 bg-gradient-to-br from-[#1A929F] to-[#168995] hover:from-[#168995] hover:to-[#147d89] rounded-full shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer flex items-center justify-center group"
        title="切換樣式與情境"
        aria-label="切換樣式與情境"
      >
        <Settings2 className="w-4 h-4 text-white" />
        <div className="absolute -top-9 right-0 px-2 py-1 bg-gray-900/90 backdrop-blur-sm text-white text-[10px] rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 whitespace-nowrap">
          {open ? '關閉選單' : '樣式與情境設定'}
        </div>
      </button>
    </div>
  );
}
