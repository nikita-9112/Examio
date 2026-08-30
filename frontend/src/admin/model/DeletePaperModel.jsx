import { AlertTriangle, Loader2, X } from "lucide-react";

const DeletePaperModel = ({
  isOpen,
  paper,
  onClose,
  onConfirm,
  loading,
}) => {
  if (!isOpen || !paper) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={!loading ? onClose : undefined}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-2xl bg-white shadow-xl">

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="absolute right-4 top-4 rounded-lg p-2 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
        >
          <X size={20} />
        </button>

        <div className="px-6 py-7">

          {/* Icon */}
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>

          <h2 className="text-xl font-bold text-gray-900">
            Delete Paper?
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Are you sure you want to delete this examination paper?
            This action cannot be undone.
          </p>

          {/* Paper info */}
          <div className="mt-5 rounded-xl bg-gray-50 p-4">
            <p className="font-semibold text-gray-900">
              {paper.examType} Examination
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Exam Year: {paper.examYear}
            </p>

            <p className="mt-1 truncate text-sm text-gray-400">
              {paper.fileName}
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={onConfirm}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Paper"
              )}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default DeletePaperModel;