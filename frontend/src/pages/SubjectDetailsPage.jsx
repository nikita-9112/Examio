import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {getSingleSubjectPack} from "../sevices/subjectService";

import { ArrowLeft, Building2, GraduationCap, BookOpen, IndianRupee, Package, FileText, CheckCircle2, FileWarning, Loader2} from "lucide-react";

import Button from "../components/ui/Button";
import TrustFeature from "../components/subject/TrustFeatures";
import BuySection from "../components/subject/BuySection";
import useSubjectAccess from "../hooks/useSubjectAccess";


const SubjectDetailsPage = ()=>{
  const {id} = useParams();
  const navigate = useNavigate();

  const [subjectPack, setSubjectPack] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ error, setError] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdferror, setPdfError] = useState(false);

  const {hasAccess} = useSubjectAccess(id);

  const fetchSubjectPack =async ()=>{
    try{
      
      setLoading(true);
      const response = await getSingleSubjectPack(id);

      setSubjectPack(response.data);
      setError(false);

    }catch(error){
      console.log(error);
      setError(true);
    }
    finally{
      setLoading(false);
  }
  }

  useEffect(()=>{
    fetchSubjectPack();
  },[id]);

  console.log(hasAccess);

  const papers = subjectPack?.papers || [];
  // const demoPdfUrl = subjectPack?.demoPdfUrl || "";
  const demoPdfUrl = subjectPack?.demoPdfUrl?
   `${import.meta.env.VITE_API_URL}/public/${subjectPack.demoPdfUrl}` : null;


  return(
  
<div className="mx-auto max-w-4xl px-4 py-8">

      <button onClick={()=> navigate(-1)} 
      className="mb-6 flex items-center gap-2 tex-blue-600 hover: text-blue-700">
        <ArrowLeft size={20} />
      </button>

{/* hero section */}
      <div className="rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-100 via-white to-purple-100 shadow-sm">

      <div className="flex flex-col  gap-6 md:flex-row md:items-center  px-4 py-4">

        {/* left icon */}
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white border border-blue-100 shadow-md shadow-blue-200 hover:shadow-xl shadow-purple-200 transition-all duration-300 ">
          <BookOpen size={38}  className="text-blue-600 "/>
        </div>

        {/* Right content */}
        <div className="flex-1">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold text-slate-900 mr-2">
              {subjectPack?.subjectName}
            </h1>

            <span className=" inline-block rounded-full bg-purple-600 px-2 py-1 text-xs font-semibold text-white">
              {subjectPack?.subjectCode}
            </span>
          </div>
         

          <div className="mt-5 flex flex-wrap items-center gap-3 text-slate-700 font-semibold">
          <GraduationCap size={18} className="text-blue-600"/>
            <span>
              Semester {subjectPack?.semester}
            </span>
            <span>•</span>
            <span>{subjectPack?.course}</span>
            <span>•</span>
            <span>{subjectPack?.branch}</span>
          </div>

          <p className="mt-3 text-slate-700 flex  items-center font-medium">
          <Building2 size={18} className="text-purple-600 mr-2"/>
            {subjectPack?.university}
          </p>
        </div>
      </div>
      </div>


      {/* Paper section */}

      <div className="mt-10 rounded-3xl border bg-white p-6 shadow-sm">

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
            <Package className="h-5 w-5 text-amber-600" />
          </div>
          
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              What's Inclueded
            </h2>

            <p className="text-sm text-slate-500">
              Get access to all solved previous year question papers.
            </p>
          </div>

        </div>

        <div className="mt-6 space-y-3  ">


          {papers.length >0 ? (
             papers.map((paper)=>(
              <div key={paper._id}
              className="flex items-center justify-between  rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition-all duration-300 hover:border-blue-300 hover:bg-blue-50">
  
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
  
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              </div>
            ))
          ):(
            <div className="py-8 text-center bg-blue-50 rounded-4xl ">

              <p className="text-slate-500 font-semibold">
                No solved papers available yet.
              </p>
            </div>
          )}
         
        </div>

      </div>

      {/* demo /preview section.. */}

      <div className="mt-8 rounded-3xl border bg-white p-6 shadow-sm">

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
            <FileText  className="text-blue-600"/>
          </div>
         
          
          <div>
            <h2 className="text-xl font-bold">
              Demo Preview
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Preview before purchasing this subject pack.
            </p>
          </div>
         
        </div>

        {showPreview ?(
          demoPdfUrl?(
           

          <div className="mt-6">
            {pdfLoading && (
            <div className="flex h-[600px] flex-col items-center justify-center rounded-2xl border bg-slate-50">

              <Loader2 className="h-8 w-8 animate-spin text-blue-600"/>
              <p className="text-slate-500 mt-3">Loading Preview...</p>
              
            </div>
          )}

          <iframe src={demoPdfUrl}
          title="Demo Preview"
          className={`h-[400px] w-full rounded-2xl border 
          ${
            pdfLoading? "hidden": "block"
          }`}
          onLoad={()=>setPdfLoading(false)}
          />
          </div>
           
          ):(
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center">

              <FileWarning  className="mx-auto h-12 w-12 text-amber-500"/>
              <h3 className="font-semibold text-lg text-slate-800 mt-4">
                Demo Preview Unavailable.
              </h3>

              <p className="mt-2 text-sm text-slate-600" >
               A demo preview hasn't been uploaded for this subject yet.
              </p>
              <p className="mt-1 text-sm text-slate-600">
                You can still unlock the complete solved PYQs pack.
              </p>
            </div>
          )
         
        ):null}

        <Button 
        onClick={()=>{
          if(!showPreview){
            setPdfLoading(true);
            setPdfError(false);
          }
          setShowPreview(!showPreview)
        }}
        className="mt-6">
          {showPreview? "Hide Preview" : "Show Preview"}
        </Button>

      </div>


    <TrustFeature/>

      {/* buy section */}

        <BuySection subjectPack={subjectPack}/>
     
        {/* <div className="sticky
         top-4
          z-30 
          mt-6 
          rounded-3xl border bg-white shadow-xl p-6">

          <div className="flex items-center justify-between gap-4 p-4">
            <div className="shrink-0">
              <p className="text-sm text-slate-500 ">
                Only
              </p>

              <h2 className="text-3xl font-bold text-blue-700">
                ₹{subjectPack?.price}
              </h2>
              <div className="hidden h-12 w-px bg-slate-200 md:block"/>

              <div className="hidden flex-1 md:block">
                <p className="font-semibold">
                  {subjectPack? papers.length :0} Solved PYQs
                </p>

                <p>
                  Years 2020-2024
                </p>
              </div>

              <Button className="h-12 rounded-xl px-8 mt-2">
                Unlock Full Pack
              </Button>
            </div>

          </div>

        </div> */}

    </div>
 
  )
}

export default SubjectDetailsPage;