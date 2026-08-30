import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { getToken } from "../../utils/auth";
import api from "../../sevices/api";
import { Delete, DeleteIcon, FileText, Loader2, Plus, PlusCircle, Trash, Trash2 } from "lucide-react";
import {BookOpen,GraduationCap,Building2, BadgeCheck} from "lucide-react";
import PaperCard from "../components/PaperCard";
import AddPaperModal from "../model/AddPaperModel";
import { addPaperToSubjectPack, uploadPdf } from "../services/adminServices";
import DeletePaperModel from "../model/DeletePaperModel";

import {
  deletePaperFromSubjectPack,
} from "../services/adminServices";




const ManagePapers = ()=>{
  const {id} = useParams();

  const [subjectPack, setSubjectPack] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // for paper addition
  const [isAddPaperOpen, setIsAddPaperOpen] = useState(false);
  const [addingPaper, setAddingPaper] = useState(false);


  // for paper deletion
  const [selectedPaper, setSelectedPaper] = useState(null);
const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
const [deletingPaper, setDeletingPaper] = useState(false);

  useEffect(() =>{
    const fetchSubjectPack = async() =>{
      try{

        setLoading(true);
        setError("");

        const token = getToken();
        const response = await api.get(`/admin/subject-pack/${id}`,
        {
          headers:{
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response);
        const data = response.data;

        console.log(data);
        if (data.success === false){
          throw new Error(
             data.message || "Failed to fetch subject Pack"
          );
        }
      
        setSubjectPack(data.data);
      }catch(err){
        setError(err.message);
        console.log(err);
      }finally{
        setLoading(false);
      }
    }

    fetchSubjectPack();
  }, [id]);

  const handleAddPaper = async (paperData) =>{
    try{
       setAddingPaper(true);
      //  step1. upload pdf to cloudinary

      const uploadResult = await uploadPdf(paperData.file, "question-papers");
      console.log("upload result:", uploadResult);

      // step 2 : prepare paper data

      const newPaper = {
      examYear: paperData.examYear,
      examType: paperData.examType,
      fileName: uploadResult.fileName,
      pdfUrl: uploadResult.url,
      publicId: uploadResult.publicId
     };

    //  step 3 : add paper to subject pack

    const result = await addPaperToSubjectPack(id, newPaper);
    console.log("Add paper result:", result);

    // step 4 : update frontend immediately 

    setSubjectPack((prev) =>({
      ...prev, papers: result.data.papers,
    }));

    // step 5: close modal

    setIsAddPaperOpen(false);

    }catch(err){
      console.error("failed to add paper: ", err);

      alert(
        err.response?.data?.message || err.message || "failed to add paper"
      );
    }finally{
      setAddingPaper(false);
    }
  }

  const handleDeleteClick = (paper) => {
    setSelectedPaper(paper);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedPaper) return;
  
    try {
      setDeletingPaper(true);
  
      const result = await deletePaperFromSubjectPack(
        id,
        selectedPaper._id
      );
  
      console.log("Delete result:", result);
  
      // Remove the deleted paper from UI immediately
      setSubjectPack((prev) => ({
        ...prev,
        papers: prev.papers.filter(
          (paper) => paper._id !== selectedPaper._id
        ),
      }));
  
      // Close modal
      setIsDeleteModalOpen(false);
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

  if(loading){
    return(
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-7 h-7 animate-spin text-blue-600"/>
      </div>
    );
  }

  if(error ){

    return(
      <div className="min-h-[60vh] flex item-center justify-center">
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

  if(!subjectPack){
    console.log("no subject pack")
    return null;
  }
  const papers = subjectPack.papers || [];
  return(
  <div className="max-w-4xl mx-auto  space-y-8">
     <div>
         <p className="text-sm font-medium text-blue-600 mb-2">
           Subject Pack Management
         </p>
         <h1 className="text-3xl font-bold text-gray-900">
           Manage Papers
         </h1>
         <p className="text-gray-500 mt-2">
          Manage and organize examination papers for this subject pack.
        </p>
      </div>
    {/* hero section */}
      <div className="rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-100 via-white to-purple-100 shadow-sm  ">
    <div className="flex flex-col  gap-6  px-4 py-4">
        <div className="flex items-start ">
          <h1 className="text-3xl font-bold text-slate-900 mr-2">
            {subjectPack?.subjectName}
          </h1>
          <span className=" inline-block mr-5 rounded-full bg-purple-600 px-2 py-1 text-xs mt-2 font-semibold text-white">
            {subjectPack?.subjectCode}
          </span>
        </div>
        <div className=" flex flex-wrap items-center gap-3 text-slate-700 font-semibold">
        <GraduationCap size={18} className="text-blue-600"/>
          <span>
            Semester {subjectPack?.semester}
          </span>
          <span>•</span>
          <span>{subjectPack?.course}</span>
          <span>•</span>
          <span>{subjectPack?.branch}</span>
        </div>
        <div className="flex justify-between">
        <p className=" text-slate-700 flex  items-center font-medium">
        <Building2 size={18} className="text-purple-600 mr-2"/>
          {subjectPack?.university}
        </p>
        <span 
         className={`px-3 mr-5 py-1 rounded-full text-xs font-semibold ${subjectPack.isActive ? "bg-green-50 text-green-700 border border-green-600" : "bg-red-100 text-red-600 border border-red-600"}`}>
          {subjectPack.isActive? "Active": "Inactive"}
        </span>
        </div>
       
    </div>
    </div>

 {/* paper section */}

 <section className="mt-6 space-y-3  ">

 <div className="flex items-center justify-between gap-4 mb-5">
           <div>
             <h2 className="text-sl font-bold text-gray-900">
               Papers ({papers.length})
             </h2>
             <p className="text-sm text-gray-500 mt-1">
               Add and manage examitation papers for this subject.
             </p>
           </div>
           {/* Add paper button */}
           <button
              type="button"
              onClick={() => setIsAddPaperOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
            >
              <PlusCircle size={20} />
              Add Paper
            </button>
            <AddPaperModal
              isOpen={isAddPaperOpen}
              onClose={() => setIsAddPaperOpen(false)}
              onAddPaper={handleAddPaper}
              loading={addingPaper}
            />

            <DeletePaperModel
              isOpen={isDeleteModalOpen}
              paper={selectedPaper}
              loading={deletingPaper}
              onClose={() => {
                if (!deletingPaper) {
                  setIsDeleteModalOpen(false);
                  setSelectedPaper(null);
                }
              }}
              onConfirm={handleConfirmDelete}
            />
         </div>

{papers.length >0 ? (
   papers.map((paper)=>(
   <PaperCard paper={paper} key={paper._id} onDelete={handleDeleteClick}/>
  ))
):(
  <div className="py-8 text-center bg-blue-50 rounded-4xl ">
    <p className="text-slate-500 font-semibold">
      No solved papers Added yet.
    </p>
  </div>
)}

</section>
  </div>
  
  )
}

export default ManagePapers;