
import { useState,useEffect } from "react";
import {getAllSubjectPacks} from "../../sevices/subjectService";
import SkeletonCard from "../../components/ui/SkeletonCard";
import ErrorState from "../../components/ui/ErrorState";
import EmptyState from "../../components/ui/EmptyState";
import PackCard from "../components/PackCard";
import SearchInput from "../../components/SearchInput";
import { Plus, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

const SubjectPacks = ()=>{
  const [packs, setPacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSubjectPacks = async() =>{

    try{
    
      setLoading(true);
      setError("");
      const response = await getAllSubjectPacks();
      console.log(response);
      setPacks(response.data || []);
      setLoading(false);


    }
    catch(error){
      setError(error);
    }
  }

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

        <Link to="/admin/addSubject-packs" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl transition">
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
         
     
          <PackCard  key={pack._id} pack={pack}/>
    
        ))}
      </div>
      }
    </div>
  )
}

export default SubjectPacks;