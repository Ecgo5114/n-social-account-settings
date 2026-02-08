'use client';

interface DisconnectConfirmationModalProps {
  isOpen: boolean;
  accountName?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * 解除連接帳號的確認彈窗
 */
export function DisconnectConfirmationModal({
  isOpen,
  accountName = 'this account',
  onConfirm,
  onCancel,
}: DisconnectConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="disconnect-modal-title"
      onClick={onCancel}
    >
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl border border-gray-200/50" onClick={(e) => e.stopPropagation()}>
        <h3 id="disconnect-modal-title" className="text-lg font-bold text-gray-900 mb-2">
          Disconnect Account?
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-6">
          Are you sure you want to disconnect {accountName}? You can reconnect it later.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-5 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-sm font-semibold text-gray-700 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-5 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors text-sm font-semibold cursor-pointer"
          >
            Disconnect
          </button>
        </div>
      </div>
    </div>
  );
}
