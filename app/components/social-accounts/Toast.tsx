'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onDismiss?: () => void;
  /** success = 綠色, error = 紅色 */
  variant?: 'success' | 'error';
  /** 自動隱藏毫秒數，設定後會於延遲後呼叫 onDismiss（避免 Strict Mode 清掉父層 timeout） */
  autoHideDuration?: number;
}

/**
 * Toast 提醒：成功（綠）或錯誤（紅）
 */
export function Toast({ message, isVisible, onDismiss, variant = 'success', autoHideDuration }: ToastProps) {
  const isError = variant === 'error';

  useEffect(() => {
    if (!isVisible || !autoHideDuration || !onDismiss) return;
    const t = setTimeout(onDismiss, autoHideDuration);
    return () => clearTimeout(t);
  }, [isVisible, autoHideDuration, onDismiss]);
  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed top-4 left-0 right-0 z-[70] flex justify-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 text-white rounded-lg shadow-lg ${
              isError ? 'bg-red-600' : 'bg-emerald-600'
            }`}
          >
          {isError ? (
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
          ) : (
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          )}
          <span className="text-sm font-medium">{message}</span>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
