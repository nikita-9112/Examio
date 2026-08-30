
import { useState,useEffect } from "react";
import SkeletonCard from "../../components/ui/SkeletonCard";
import ErrorState from "../../components/ui/ErrorState";
import EmptyState from "../../components/ui/EmptyState";
import PackCard from "../components/PackCard";
import SearchInput from "../../components/SearchInput";
import { Plus, PlusCircle,Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { AdmingetAllSubjectPacks } from "../services/adminServices";
import { getToken } from "../../utils/auth";
import api from "../../sevices/api";

const SubjectPacks = ()=>{
  const [packs, setPacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toggleingPackId, setTogglingPackId] = useState(null);

  const[packToDelete, setPackToDelete] = useState(null);
  const[deleting, setDeleting] = useState(false);

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

      setTogglingPackId(pack._id);

      const token = getToken();
  
      const response = await api.put(
        `/subject-packs/${pack._id}`,
        {
          isActive: !pack.isActive,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const data = response.data;
  
      if (!data.success) {
        throw new Error(
          data.message || "Failed to update subject pack status"
        );
      }
  
      // Update UI immediately
      setPacks((prevPacks) =>
        prevPacks.map((item) =>
          item._id === pack._id
            ? data.data
            : item
        )
      );
  
    } catch (error) {
      console.error(
        "Failed to toggle subject pack status:",
        error
      );
    }finally{
      setTogglingPackId(null);
    }
  };

  const handleDeletePack = (pack) =>{
    setPackToDelete(pack);
  };

  const confirmDeletePack = async () => {
    if (!packToDelete) return;
  
    try {
      setDeleting(true);
  
      const token = getToken();
  
      const response = await api.delete(
        `/subject-packs/${packToDelete._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const data = response.data;
  
      if (!data.success) {
        throw new Error(
          data.message || "Failed to delete subject pack"
        );
      }
  
      // Remove deleted pack from UI
      setPacks((prevPacks) =>
        prevPacks.filter(
          (pack) => pack._id !== packToDelete._id
        )
      );
  
      // Close modal
      setPackToDelete(null);
  
    } catch (error) {
      console.error("Failed to delete subject pack:", error);
  
      // Later we can replace this with a toast
    } finally {
      setDeleting(false);
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
         
     
          <PackCard  
          key={pack._id} 
          pack={pack} 
          handleToggleStatus={handleToggleStatus} 
          toggleingPackId={toggleingPackId}
          handleDeletePack={handleDeletePack}
          />
    
        ))}
      </div>
      }

      {packToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-100">
                <Trash2 className="h-5 w-5 text-red-600" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Delete Subject Pack?
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  This action cannot be undone.
                </p>
              </div>
            </div>


            <div className="mt-5 rounded-xl bg-red-50 p-4">

              <p className="text-sm text-red-700">
                You are about to permanently delete:
              </p>

              <p className="mt-1 font-semibold text-red-800">
                {packToDelete.subjectName}
              </p>

              <p className="mt-3 text-sm text-red-700">
                The subject pack, demo PDF, and all associated
                examination papers will be permanently deleted.
              </p>

            </div>


            <div className="mt-6 flex justify-end gap-3">

              <button
                type="button"
                disabled={deleting}
                onClick={() => setPackToDelete(null)}
                className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>


              <button
                type="button"
                disabled={deleting}
                onClick={confirmDeletePack}
                className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete Permanently"}
              </button>

            </div>

          </div>
        </div>
      )}
    </div>
  )
}

export default SubjectPacks;