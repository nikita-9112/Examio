

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  BookOpen,
  Building2,
  FileText,
  GraduationCap,
  Loader2,
  Pencil,
  ArrowRight,
  IndianRupee,
  Power,
  X,
  Trash2,
  PlusCircle

} from "lucide-react";

import api from "../../sevices/api";
import { getToken } from "../../utils/auth";
import ConfirmModal from "../model/ConfirmModal";
import useSubjectPackActions from "../hooks/useSubjectPackActions";

import AddPaperModal from "../model/AddPaperModel";
import DeletePaperModel from "../model/DeletePaperModel";
import PaperCard from "../components/PaperCard";

import {
  addPaperToSubjectPack,
  uploadPdf,
  deletePaperFromSubjectPack,
} from "../services/adminServices";


const SubjectPackDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [subjectPack, setSubjectPack] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Add Paper
  const [isAddPaperOpen, setIsAddPaperOpen] = useState(false);
  const [addingPaper, setAddingPaper] = useState(false);

  // Delete Paper
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [isDeletePaperOpen, setIsDeletePaperOpen] = useState(false);
  const [deletingPaper, setDeletingPaper] = useState(false);


  const {
    toggleSubjectPackStatus,
    deleteSubjectPack,
    isToggling,
    isDeleting,
  } = useSubjectPackActions();


  useEffect(() => {
    const fetchSubjectPack = async () => {
      try {
        setLoading(true);
        setError("");

        const token = getToken();

        const response = await api.get(
          `/admin/subject-pack/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data;

        if (!data.success) {
          throw new Error(
            data.message || "Failed to fetch subject pack"
          );
        }

        setSubjectPack(data.data);

      } catch (err) {
        console.error(err);

        setError(
          err.response?.data?.message ||
          err.message ||
          "Something went wrong"
        );

      } finally {
        setLoading(false);
      }
    };

    fetchSubjectPack();

  }, [id]);

  const handleToggleStatus = async () => {
    try {
      const updatedPack =
        await toggleSubjectPackStatus(subjectPack);
  
      setSubjectPack(updatedPack);
  
    } catch (error) {
      setError(error.message);
    }
  };



  const handleDelete = async () => {
    if (!subjectPack) return;
  
    try {
      setError("");
  
      await deleteSubjectPack(subjectPack._id);
  
      navigate("/admin/subject-packs");
  
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  const handleAddPaper = async (paperData) => {
    try {
      setAddingPaper(true);
  
      // Step 1: Upload PDF to Cloudinary
      const uploadResult = await uploadPdf(
        paperData.file,
        "question-papers"
      );
  
      // Step 2: Prepare paper data
      const newPaper = {
        examYear: paperData.examYear,
        examType: paperData.examType,
        fileName: uploadResult.fileName,
        pdfUrl: uploadResult.url,
        publicId: uploadResult.publicId,
      };
  
      // Step 3: Add paper to subject pack
      const result = await addPaperToSubjectPack(
        subjectPack._id,
        newPaper
      );
  
      // Step 4: Update frontend immediately
      setSubjectPack((prev) => ({
        ...prev,
        papers: result.data.papers,
      }));
  
      // Step 5: Close modal
      setIsAddPaperOpen(false);
  
    } catch (err) {
      console.error("Failed to add paper:", err);
  
      alert(
        err.response?.data?.message ||
        err.message ||
        "Failed to add paper"
      );
    } finally {
      setAddingPaper(false);
    }
  };

  const handleDeletePaperClick = (paper) => {
    setSelectedPaper(paper);
    setIsDeletePaperOpen(true);
  };

  const handleConfirmDeletePaper = async () => {
    if (!selectedPaper || !subjectPack) return;
  
    try {
      setDeletingPaper(true);
  
      await deletePaperFromSubjectPack(
        subjectPack._id,
        selectedPaper._id
      );
  
      // Remove paper immediately from frontend
      setSubjectPack((prev) => ({
        ...prev,
        papers: prev.papers.filter(
          (paper) => paper._id !== selectedPaper._id
        ),
      }));
  
      // Close modal
      setIsDeletePaperOpen(false);
      setSelectedPaper(null);
  
    } catch (err) {
      console.error("Failed to delete paper:", err);
  
      alert(
        err.response?.data?.message ||
        err.message ||
        "Failed to delete paper"
      );
    } finally {
      setDeletingPaper(false);
    }
  };

  const handleViewPaper = (paper) => {
    window.open(
      paper.pdfUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // Loading state

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-7 h-7 animate-spin text-blue-600" />
      </div>
    );
  }


  // Error state

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">

          <h2 className="text-lg font-semibold text-red-600">
            Something went wrong
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            {error}
          </p>

        </div>
      </div>
    );
  }


  if (!subjectPack) {
    return null;
  }


  const papers = subjectPack.papers || [];


  return (
    <div className="max-w-5xl mx-auto space-y-8">

      {/* Page Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

        <div>
          <p className="text-sm font-medium text-blue-600 mb-2">
            Subject Pack
          </p>

          <div className="flex flex-wrap items-center gap-3">

            <h1 className="text-3xl font-bold text-gray-900">
              {subjectPack.subjectName}
            </h1>

            <span className="rounded-full bg-purple-600 px-3 py-1 text-xs font-semibold text-white">
              {subjectPack.subjectCode}
            </span>

          </div>

          <p className="mt-2 text-gray-500">
            View and manage this subject pack.
          </p>
        </div>


        <div className="flex flex-wrap items-center gap-3">

          {/* Activate / Deactivate */}

          <button
            type="button"
            onClick={handleToggleStatus}
            disabled={isToggling}
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition disabled:opacity-50 disabled:cursor-not-allowed ${
              subjectPack.isActive
                ? "bg-orange-500 hover:bg-orange-600"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            <Power size={18} />

            {isToggling
              ? "Updating..."
              : subjectPack.isActive
                ? "Deactivate Pack"
                : "Activate Pack"}
          </button>


          {/* Edit */}

          <button
            type="button"
            onClick={() =>
              navigate(`/admin/subject-packs/${id}/edit`)
            }
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition"
          >
            <Pencil size={18} />
            Edit Subject Pack
          </button>

          {/* delete */}
          <button
            type="button"
            onClick={() => setShowDeleteModal(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700 transition"
          >
            <Trash2 size={18} />
            Delete Pack
          </button>

          </div>

      </div>


      {/* Main Pack Information */}

      <section className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-100 via-white to-purple-100 shadow-sm p-6">

        <div className="flex flex-col gap-6">

          {/* Academic Details */}

          <div className="flex flex-wrap items-center gap-3 text-slate-700 font-semibold">

            <GraduationCap
              size={20}
              className="text-blue-600"
            />

            <span>
              Semester {subjectPack.semester}
            </span>

            <span>•</span>

            <span>
              {subjectPack.course}
            </span>

            <span>•</span>

            <span>
              {subjectPack.branch}
            </span>

          </div>


          {/* University + Status */}

          <div className="flex flex-wrap items-center justify-between gap-4">

            <div className="flex items-center gap-2 text-slate-700 font-medium">

              <Building2
                size={20}
                className="text-purple-600"
              />

              {subjectPack.university}

            </div>


            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold border ${
                subjectPack.isActive
                  ? "bg-green-50 text-green-700 border-green-600"
                  : "bg-red-50 text-red-600 border-red-600"
              }`}
            >
              {subjectPack.isActive
                ? "Active"
                : "Inactive"}
            </span>

          </div>

        </div>

      </section>


      {/* Description */}

      <section className="rounded-2xl border border-gray-200 bg-white p-6">

        <div className="flex items-center gap-3 mb-4">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
            <BookOpen
              size={20}
              className="text-blue-600"
            />
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900">
              About this Subject
            </h2>

            <p className="text-sm text-gray-500">
              Subject pack description.
            </p>
          </div>

        </div>


        <p className="text-sm leading-7 text-gray-600">

          {subjectPack.description ||
            "No description has been added for this subject pack."}

        </p>

      </section>


      {/* Pack Statistics */}

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-5">

        <div className="rounded-2xl border border-gray-200 bg-white p-6">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">

              <IndianRupee
                size={20}
                className="text-green-600"
              />

            </div>

            <div>

              <p className="text-sm text-gray-500">
                Pack Price
              </p>

              <p className="text-2xl font-bold text-gray-900">
                ₹{subjectPack.price}
              </p>

            </div>

          </div>

        </div>


        <div className="rounded-2xl border border-gray-200 bg-white p-6">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50">

              <FileText
                size={20}
                className="text-purple-600"
              />

            </div>

            <div>

              <p className="text-sm text-gray-500">
                Total Papers
              </p>

              <p className="text-2xl font-bold text-gray-900">
                {papers.length}
              </p>

            </div>

          </div>

        </div>

      </section>



      {/* Demo PDF */}

      <section className="rounded-2xl border border-gray-200 bg-white p-6">

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <h2 className="text-lg font-bold text-gray-900">
              Demo PDF
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Preview the demo paper available to students.
            </p>

          </div>


          {subjectPack.demoPdfUrl ? (

            <a
              href={subjectPack.demoPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700 hover:bg-blue-100 transition"
            >
              <FileText size={18} />
              View Demo PDF
            </a>

          ) : (

            <span className="text-sm text-gray-500">
              No Demo PDF available
            </span>

          )}

        </div>

      </section>

     

      {/* Examination Papers */}

      <section className="rounded-2xl border border-gray-200 bg-white p-6">

      {/* Section Header */}
      <div className="flex items-center justify-between gap-4 mb-6">

        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Examination Papers ({papers.length})
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Manage the examination papers available in this subject pack.
          </p>
        </div>


        {/* Add Paper */}
        <button
          type="button"
          onClick={() => setIsAddPaperOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
        >
          <PlusCircle size={19} />
          Add Paper
        </button>

      </div>


      {/* Papers List */}
      {papers.length > 0 ? (

        <div className="space-y-3">

          {papers.map((paper) => (

            <PaperCard
              key={paper._id}
              paper={paper}
              onDelete={handleDeletePaperClick}
              onView={handleViewPaper}
            />

          ))}

        </div>

      ) : (

        <div className="rounded-xl bg-slate-50 py-8 text-center">

          <p className="text-sm font-medium text-slate-500">
            No examination papers have been added yet.
          </p>

        </div>

      )}

      </section>


{/* Add Paper Modal */}

    <AddPaperModal
    isOpen={isAddPaperOpen}
    onClose={() => {
      if (!addingPaper) {
        setIsAddPaperOpen(false);
      }
    }}
    onAddPaper={handleAddPaper}
    loading={addingPaper}
    />


{/* Delete Paper Modal */}

    <DeletePaperModel
    isOpen={isDeletePaperOpen}
    paper={selectedPaper}
    loading={deletingPaper}
    onClose={() => {
      if (!deletingPaper) {
        setIsDeletePaperOpen(false);
        setSelectedPaper(null);
      }
    }}
    onConfirm={handleConfirmDeletePaper}
    />



{/* for delete subjectpack */}
    
    <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete Subject Pack?"
        message={`Are you sure you want to delete "${subjectPack.subjectName}"? This action cannot be undone.`}
        confirmText="Delete Pack"
        loading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  );
};


export default SubjectPackDetails;