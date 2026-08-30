
import { useNavigate } from "react-router-dom";
import SubjectPackForm from "../components/SubjectPackForm";


const AddSubjectPack = () =>{
  const navigate = useNavigate();
  
  const handleCancel = () =>{
    navigate("/admin/subject-packs");
  }

  const handleProceed = () =>{

    navigate("/admin/subject-pack/new-demo");
  }


  return(
  <div className="max-w-5xl mx-auto space-y-8">
    {/* page header */}
      <div>
      <p className="text-sm font-medium text-blue-600 mb-2">
        Step 1 of 2
      </p>
      <h1 className="text-3xl font-bold text-gray-900">
        Create Subject Pack
      </h1>
      <p className="mt-2 text-gray-500">
        Add the basic information for your new Subject Pack..
      </p>
    </div>

    {/* form */}

  
    <SubjectPackForm />

{/* Action button */}
<div className="flex justify-end gap-3 pt-2">
  <button type="button" onClick={handleCancel} className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition">
    Cancel
  </button>

  <button type="button" onClick={handleProceed} className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
    Proceed Further
  </button>
</div>

  </div>
  )
}

export default AddSubjectPack;