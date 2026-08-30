import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getToken } from "../../utils/auth";
import api from "../../sevices/api";
import { Loader2 } from "lucide-react";
import SubjectPackForm from "../components/SubjectPackForm";


const EditSubjectPack = ()=>{

  const {id} = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // fetch existing pack
  useEffect(() =>{
    const fetchSubjectPack = async() =>{
      try{

        setLoading(true);
        setError("");

        const token = getToken();
        const response = await api.get(`/admin/subject-pack/${id}`,{
          headers:{
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;
        if(!data.success){
          throw new Error(data.message || "Failed to fetch subject pack");
        }
        const pack = data.data;

        // only store fields we want to edit
        setFormData({
          university: pack.university || "",
          course: pack.course || "",
          branch: pack.branch || "",
          semester: pack.semester || "",
          subjectCode: pack.subjectCode || "",
          subjectName: pack.subjectName || "",
          description: pack.description || "",
          price: pack.price ?? "",
          isActive: Boolean(pack.isActive),
        });

      }catch(err){

        console.log(err);
        setError(error.response?.data?.message || err.message || "failed to load subject pack");

      }finally{
        setLoading(false);
      }
    };

    fetchSubjectPack();
  },[id]);

  // form changes
  const handleFormChange = (updates) =>{
    setFormData((prev) =>({
      ...prev,
      ...updates,
    }));
  };

  // save changes
  const handleSave = async() =>{
    try{

      setSaving(true);
      setError("");

      const token = getToken();

      const updateData = {
        ...formData,
        semester: Number(formData.semester),
        price:Number(formData.price),
      };
      const response = await api.put(`/subject-packs/${id}`,updateData,{
        headers:{
          Authorization: `Bearer ${token}`,
        },
      });
 
      console.log(response);
      const data = response.data;

      if(!data.success){
        throw new Error(data.message || "Failed to update subject pack");
      }

      // success
      navigate("/admin/subject-packs");
    }catch(err){

      console.log(err);
      console.error("update subject pack error: ",err);

      setError(err.response?.data?.message || err.message || "Failed to update subject pack.");
    }finally{

      setSaving(false);
    }
  };

  // loading
  if(loading){
    return(
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2  className="h-7 w-7 animate-spin text-blue-600"/>
      </div>
    );
  }

  // error

  if(error && !formData){

    return(
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-lg font-semibold text-red-600">
          Something went wrong
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          {error}
        </p>

        <button type="button" onClick={() =>navigate("/admin/subject-packs")} className="mt-5 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
          Back to Subject Pack
        </button>
      </div>
    );
  }

  if(!formData) return null;

  return(
    <div className="max-w-5xl mx-auto space-y-8">

    {/* Header */}
    <div>

      <p className="text-sm font-medium text-blue-600 mb-2">
        Subject Pack Management
      </p>

      <h1 className="text-3xl font-bold text-gray-900">
        Edit Subject Pack
      </h1>

      <p className="mt-2 text-gray-500">
        Update the information for this subject pack.
      </p>

    </div>


    {/* Form */}
    <SubjectPackForm
      mode="edit"
      formData={formData}
      onChange={handleFormChange}
    />


    {/* Error while saving */}
    {error && (
      <p className="text-sm text-red-600">
        {error}
      </p>
    )}


    {/* Actions */}
    <div className="flex justify-end gap-3 pt-2">

      <button
        type="button"
        disabled={saving}
        onClick={() =>
          navigate("/admin/subject-packs")
        }
        className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition disabled:opacity-60"
      >
        Cancel
      </button>


      <button
        type="button"
        disabled={saving}
        onClick={handleSave}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition disabled:opacity-70"
      >

        {saving && (
          <Loader2
            size={18}
            className="animate-spin"
          />
        )}

        {saving
          ? "Saving Changes..."
          : "Save Changes"}

      </button>

    </div>

  </div>
  )
}


export default EditSubjectPack;