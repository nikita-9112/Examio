import { X, Loader2, AlertTriangle } from "lucide-react";

const ConfirmModal = ({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => {
          if (!loading) {
            onCancel();
          }
        }}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

        {/* Close button */}
        <div className="flex justify-end">
          <button
            type="button"
            disabled={loading}
            onClick={onCancel}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Icon */}
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
          <AlertTriangle
            size={24}
            className="text-red-600"
          />
        </div>

        {/* Title */}
        <h2 className="mt-4 text-xl font-bold text-gray-900">
          {title}
        </h2>

        {/* Message */}
        <p className="mt-2 text-sm leading-6 text-gray-500">
          {message}
        </p>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3">

          <button
            type="button"
            disabled={loading}
            onClick={onCancel}
            className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            {cancelText}
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={onConfirm}
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2
                  size={17}
                  className="animate-spin"
                />
                Processing...
              </>
            ) : (
              confirmText
            )}
          </button>

        </div>

      </div>
    </div>
  );
};

export default ConfirmModal;