
import { useState,useEffect } from "react";
import SkeletonCard from "../../components/ui/SkeletonCard";
import ErrorState from "../../components/ui/ErrorState";
import EmptyState from "../../components/ui/EmptyState";
import PackCard from "../components/PackCard";
import SearchInput from "../../components/SearchInput";
import { Plus, PlusCircle,Trash2 } from "lucide-react";
import {Link,  useNavigate } from "react-router-dom";
import { AdmingetAllSubjectPacks } from "../services/adminServices";
import { getToken } from "../../utils/auth";
import api from "../../sevices/api";
import AddPaperModal from "../model/AddPaperModel";

import {
  addPaperToSubjectPack,
  uploadPdf,
} from "../services/adminServices"

import useSubjectPackActions from "../hooks/useSubjectPackActions";
import ConfirmModal from "../model/ConfirmModal";

const SubjectPacks = ()=>{
  const [packs, setPacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAddPaperOpen, setIsAddPaperOpen] = useState(false);
  const [selectedPackForPaper, setSelectedPackForPaper] = useState(null);

const [addingPaper, setAddingPaper] = useState(false);

  
  const[deleting, setDeleting] = useState(false);


  const {
    toggleSubjectPackStatus,
    deleteSubjectPack,
    isToggling,
    isDeleting,
  } = useSubjectPackActions();
  
  const [packToDelete, setPackToDelete] = useState(null);


  const navigate = useNavigate();

  const fetchSubjectPacks = async() =>{

    try{
    
      setLoading(true);
      setError("");
      const response = await AdmingetAllSubjectPacks();
      console.log(response);
      setPacks(response.data || []);
      setLoading(false);


    }
    catch(error){
      setError(error);
    }
  }

  
  const handleToggleStatus = async (pack) => {
    try {
      const updatedPack =
        await toggleSubjectPackStatus(pack);
  
      setPacks((prevPacks) =>
        prevPacks.map((currentPack) =>
          currentPack._id === updatedPack._id
            ? updatedPack
            : currentPack
        )
      );
  
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddPaperRequest = (pack) => {
    setSelectedPackForPaper(pack);
    setIsAddPaperOpen(true);
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
      selectedPackForPaper._id,
      newPaper
    );

    // Step 4: Update frontend immediately
    setSelectedPackForPaper((prev) => ({
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

  const handleDeleteRequest = (pack) => {
    setPackToDelete(pack);
  };

  const handleConfirmDelete = async () => {
    if (!packToDelete) return;
  
    try {
      await deleteSubjectPack(packToDelete._id);
  
      setPacks((prevPacks) =>
        prevPacks.filter(
          (pack) => pack._id !== packToDelete._id
        )
      );
  
      setPackToDelete(null);
  
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(()=>{
    fetchSubjectPacks();
  },[])

  if(loading){
    return(
      <div>
        <SkeletonCard />
      </div>
    )
  }
  if(error){
    return(
      <div>
        <ErrorState />
      </div>
    )
  }

  return(
    <div>

{/* header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 m-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Subject Packs
          </h1>
          <p className="text-gray-500 mt-1">
            Manage all your subject Packs and Papers.
          </p>
        </div>

        <Link to='/admin/subject-pack/new' className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl transition">
        <PlusCircle size={18} />
        Add Subject Pack
        </Link>
      </div>

       
      <div  className=" mb-12">
      <SearchInput/>
      </div>
      { packs.length === 0 ?
        <EmptyState  title="No Subject Pack Added"
        description="Add Subject Pack " />
        :
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {packs.map((pack) =>(
         
     <div onClick={() => navigate( `/admin/subject-packs/${pack._id}`)}>
     
        <PackCard  
          key={pack._id} 
          pack={pack} 
          onToggleStatus={handleToggleStatus}
          onDelete={handleDeleteRequest}
          onAddPaper={handleAddPaperRequest}
          isToggling={isToggling}
          />
     </div>
         
    
        ))}
      </div>
      }


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
        <ConfirmModal
          isOpen={!!packToDelete}
          title="Delete Subject Pack?"
          message={
            packToDelete
              ? `Are you sure you want to delete "${packToDelete.subjectName}"? This action cannot be undone.`
              : ""
          }
          confirmText="Delete Pack"
          loading={isDeleting}
          onConfirm={handleConfirmDelete}
          onCancel={() => setPackToDelete(null)}
        />
    </div>
  )
}

export default SubjectPacks;