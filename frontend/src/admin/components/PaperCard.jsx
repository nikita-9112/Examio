import { Trash2, FileText, Eye } from "lucide-react";

const PaperCard = ({ paper, onDelete, onView }) => {

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete?.(paper);
  };

  const handleView = (e) => {
    e.stopPropagation();
    onView?.(paper);
  };

  return (
    <div
      className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition-all duration-300 hover:border-blue-300 hover:bg-blue-50"
    >
      {/* Paper Information */}
      <div className="flex items-center gap-3">

        <FileText className="h-5 w-5 text-blue-600" />

        <div>
          <p className="font-bold text-lg text-slate-800">
            {paper.examYear}
          </p>

          <p className="font-medium text-slate-500">
            {paper.examType} Examination
          </p>
        </div>

      </div>


      {/* Actions */}
      <div className="flex items-center gap-2">

        {/* View Paper */}
        {onView && (
          <button
            type="button"
            onClick={handleView}
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100 transition"
          >
            <Eye size={18} />
            View
          </button>
        )}


        {/* Delete Paper */}
        {onDelete && (
          <button
            type="button"
            onClick={handleDelete}
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition"
            aria-label="Delete paper"
          >
            <Trash2 size={18} />
          </button>
        )}

      </div>
    </div>
  );
};

export default PaperCard;