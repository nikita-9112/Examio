import { ArrowLeft, FileText, Loader2, Upload, X } from "lucide-react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSubjectPackCreation } from "../contex/SubjectPackCreationContext";
import api from "../../sevices/api";
import { getToken } from "../../utils/auth";
import { uploadPdf } from "../services/adminServices";


const AddDemoPdfPage =  ()=>{

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const {subjectPackData, updateSubjectPackData, resetSubjectPackData} = useSubjectPackCreation();

  const [error, setError] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const file = subjectPackData.demoPdf;


  const handleFileChange = (e) =>{
    const selectedFile = e.target.files?.[0];
    if(!selectedFile) return;

    setError("");

    // only pdf

    if(selectedFile.type !== "application/pdf"){
      setError("Please select a PDF file.");
      return;
    }

    // 10 mb limit for now
    const maxSize = 10*1024*1024;

    if(selectedFile.size >maxSize){
      setError("PDF size should be less than 10 MB.");
      return;
    }

    updateSubjectPackData({
      demoPdf:selectedFile,
    });

  };

  const hanldeRemoveFile = () =>{
    updateSubjectPackData({
      demoPdf:null,
    });
    setError("");

    if(fileInputRef.current){
      fileInputRef.current.value = "";
    }
  };

  const handleCreatePack = async () =>{

    try{

      setIsCreating(true);
      setError("");

      // 1. upload Demo PDF


      let demoPdfUrl ="";
      let demoPdfPublicId="";

      if(file) {
       

          // Step 1: Upload PDF to Cloudinary
        const uploadResponse = await uploadPdf(
          file,
          "demo-pdfs"
        );

        console.log("upload response: ", uploadResponse);
        const uploadData = await uploadResponse;
        if( !uploadData.success){

          throw new Error(
            uploadData.message || "Failed to upload demo PDF."
          );
        }

        demoPdfUrl = uploadData.url;
        demoPdfPublicId = uploadData.publicId;
      }


      // 2. create subject pact

      const createData = {
        university : subjectPackData.university,
        course: subjectPackData.course,
        branch: subjectPackData.branch,
        semester: subjectPackData.semester,
        subjectCode: subjectPackData.subjectCode,
        subjectName: subjectPackData.subjectName,
        description: subjectPackData.description,
        price: Number(subjectPackData.price),
        isActive: subjectPackData.isActive,

        demoPdfUrl,
        demoPdfPublicId,
      };

      const token = getToken();

      const response = await api.post(
        "/subject-packs",
        createData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      

      const data = await response.data;

      if( !data.success){
        throw new Error(
          data.message || "Failed to created SubejctPack."
        );
      }

      // 3. success

      resetSubjectPackData();

      navigate("/admin/subject-packs");

    }catch(error){
      console.log(error);
      console.error("Create subject Pack Error:",error);

      setError(error.message || "Something went wrong. Please try again.");
    }finally{
      setIsCreating(false);
    }

   
  };

  const handleSkip = async () =>{
    // create subject Pack without demo PDF

    try{

      setIsCreating(true);
      setError("");
      
      const token = localStorage.getItem("token");

      const createData = {
        university : subjectPackData.university,
        course: subjectPackData.course,
        branch: subjectPackData.branch,
        semester: subjectPackData.semester,
        subjectCode: subjectPackData.subjectCode,
        subjectName: subjectPackData.subjectName,
        description: subjectPackData.description,
        price: Number(subjectPackData.price),
        isActive: subjectPackData.isActive,

        demoPdfUrl:"",
        demoPdfPublicId:"",
      };
      
      const response = await api.post(
        "/subject-packs",
        createData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      
      const data = await response.data;

      if(!data.success){
        throw new Error(
          data.message || "Failed to created SubejctPack."
        );
      }

      resetSubjectPackData();
      navigate("/admin/subject-packs");


    }
    catch(error){
      console.log(error);
      console.error(error);

      setError(
        error.message || "Something went wrong. Please try again."
      );
    }finally{
      setIsCreating(false);
    }
  };


  return(
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* header */}
      <div>
        <p className="text-sm font-medium text-blue-600 mb-2">
          Step 2 of 2
        </p>

        <h1 className="text-3xl font-bold text-gray-900">
          Add Demo PDF
        </h1>

        <p className="mt-2 text-gray-500">
          Add an optional demo PDF that students can preview before accessing the subject pack.
        </p>
      </div>

      {/* upload card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Demo PDF
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Upload a sample or preview PDF for this subject pack.
          </p>
        </div>

        {/* No file selected */}

        {!file && (
          <button
          type="button"
          disabled={isCreating}
          onClick={() =>fileInputRef.current?.click()}
          className="w-full border-2 border-dashed border-gray-300 rounded-2xl p-10 hover:border-blue-500 hover:bg-blue-50/30 transition">
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                <Upload size={24} className="text-blue-600"/>
              </div>

              <p className="text-base font-medium text-gray-800">
                Upload Demo PDF
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Click to browse your files
              </p>

              <p className="text-xs text-gray-400 mt-3">
                PDF only • Maxium size 10 MB
              </p>
            </div>
          </button>
        )}

        {/* file selected */}
      {file && (
        <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-4 min-w-0">

            <div className="w-11 h-11 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
              <FileText size={22} className="text-red-500"/>
            </div>
            
            <div className="min-w-0">
              <p className="font-medium">
                {file.name}
                {/* filename */}
              </p>

              <p>
                {(file.size/ (1024*1024)).toFixed(2)} MB
                {/* 8mb */}
              </p>
            </div>
          </div>

          <button 
          type="button"
          disabled={isCreating}
          onClick={hanldeRemoveFile}
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-red-500 transition"
          aria-label="Remove File">
            <X size={20} />
          </button>
        </div>
      )}

      {/* Error */}
      {error &&(
       <p className="tex-sm text-red-500 mt-3">
        {error.message} 
       </p>
      )}

      {/* hidden input */}
      <input 
      ref={fileInputRef} 
      type="file"
      accept="application/pdf"
      onChange={handleFileChange}
      className="hidden"
      />

      </div>

      {/* Acitons */}
      <div className="flex items-center justify-between pt-2">
        <button 
        type="button"
        disabled={isCreating}
        onClick={() =>navigate("/admin/subject-pack/new")}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition">
          <ArrowLeft size={18}/>
          Go Back
        </button>

        <div className="flex items-center gap-3">
          <button
          type="button"
          disabled={isCreating}
          onClick={handleSkip}
          className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 tansition">
            Skip
          </button>

          <button
          type="button" 
          disabled={isCreating}
          onClick={handleCreatePack} 
          className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
            {isCreating && (
              <Loader2 size={18} className="animate-spin"/>
            )}

            {isCreating
            ? "Creating"
            : "Create Subject Pack"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddDemoPdfPage;