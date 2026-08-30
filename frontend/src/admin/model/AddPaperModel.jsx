import { useState } from "react";
import { X, Upload, FileText, Loader2 } from "lucide-react";

const AddPaperModal = ({
  isOpen,
  onClose,
  onAddPaper,
  loading,
}) => {
  const [examYear, setExamYear] = useState("");
  const [examType, setExamType] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!examYear || !examType || !file) {
      setError("Please fill all fields and select a PDF.");
      return;
    }

    if (file.type !== "application/pdf") {
      setError("Please select a valid PDF file.");
      return;
    }

    await onAddPaper({
      examYear,
      examType,
      file,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Add Examination Paper
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Upload an examination paper for this subject pack.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
          >
            <X size={20} />
          </button>

        </div>


        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 px-6 py-5"
        >

          {/* Exam Year */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Exam Year
            </label>

            <input
              type="number"
              value={examYear}
              onChange={(e) => setExamYear(e.target.value)}
              placeholder="Example: 2025"
              min="2000"
              max="2100"
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
            />
          </div>


          {/* Exam Type */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Exam Type
            </label>

            <select
              value={examType}
              onChange={(e) => setExamType(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
            >
              <option value="">
                Select exam type
              </option>

              <option value="June ">
                june Semester
              </option>

              <option value="December ">
                December Semester
              </option>

              

            </select>
          </div>


          {/* PDF Upload */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Examination Paper PDF
            </label>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 px-6 py-8 hover:border-blue-400 hover:bg-blue-50 transition">

              <Upload className="mb-3 h-7 w-7 text-blue-600" />

              <span className="text-sm font-medium text-gray-700">
                {file
                  ? file.name
                  : "Click to select a PDF"}
              </span>

              <span className="mt-1 text-xs text-gray-500">
                PDF files only
              </span>

              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) =>
                  setFile(e.target.files?.[0] || null)
                }
              />

            </label>
          </div>


          {/* Error */}
          {error && (
            <p className="text-sm text-red-600">
              {error}
            </p>
          )}


          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              {loading ? (
                <>
                <Loader2  size={17} className="animate-spin"/> Adding... 
                </>
              ):(
                <>
                 <FileText size={17} />
                  Add Paper
                </>
              )}
             
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default AddPaperModal;