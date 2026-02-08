'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onDismiss?: () => void;
  /** success = 綠色, error = 紅色 */
  variant?: 'success' | 'error';
}

/**
 * Toast 提醒：成功（綠）或錯誤（紅）
 */
export function Toast({ message, isVisible, onDismiss, variant = 'success' }: ToastProps) {
  const isError = variant === 'error';
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className={`fixed top-4 right-4 z-[70] flex items-center gap-3 px-4 py-3 text-white rounded-lg shadow-lg ${
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
      )}
    </AnimatePresence>
  );
}
