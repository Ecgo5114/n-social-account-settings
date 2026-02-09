'use client';

import { useState } from 'react';
import { Palette, X } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { ThemeName } from '../themes';

export default function ThemeSwitcher() {
  const { currentTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  
  const themeOptions: Array<{ value: ThemeName; label: string; description: string }> = [
    { value: 'glassmorphism', label: 'Glassmorphism', description: '毛玻璃效果' },
    { value: 'minimalism', label: 'Minimalism', description: '極簡瑞士風格' },
    { value: 'soft-ui', label: 'Soft UI', description: '柔和新擬態' },
  ];
  
  return (
    <>
      {/* 主題選擇面板 */}
      {isOpen && (
        <div className="fixed inset-0 z-[98] bg-black/20 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
          <div 
            className="fixed bottom-24 right-6 z-[99] w-80 bg-white rounded-2xl shadow-2xl p-6 animate-in slide-in-from-bottom-2"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 標題與關閉按鈕 */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">選擇設計風格</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            {/* 主題選項 */}
            <div className="space-y-2">
              {themeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setTheme(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                    currentTheme === option.value
                      ? 'bg-gradient-to-r from-[#1A4D3E] to-[#2D5F4F] text-white shadow-md'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="font-semibold">{option.label}</div>
                  <div className={`text-sm ${currentTheme === option.value ? 'text-white/80' : 'text-gray-500'}`}>
                    {option.description}
                  </div>
                </button>
              ))}
            </div>
            
            {/* 當前主題提示 */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                當前: {themeOptions.find(t => t.value === currentTheme)?.label}
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* 浮動按鈕 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-[99] w-14 h-14 rounded-full bg-gradient-to-r from-[#1A4D3E] to-[#2D5F4F] text-white shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center cursor-pointer group ${
          isOpen ? 'rotate-180' : ''
        }`}
        aria-label="Toggle design style"
        title="Toggle design style"
      >
        <Palette className="w-6 h-6 transition-transform duration-300" />
        <span className="absolute inset-0 rounded-full bg-[#1A4D3E]/20 animate-ping"></span>
      </button>
    </>
  );
}
