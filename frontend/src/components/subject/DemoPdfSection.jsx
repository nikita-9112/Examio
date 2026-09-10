import { FileText,Loader2 ,FileWarning} from "lucide-react";
import Button from "../ui/Button";
import { useState } from "react";

const DemoPdfSection = ({subjectPack})=>{

  const [showPreview, setShowPreview] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdferror, setPdfError] = useState(false);



    // const demoPdfUrl = subjectPack?.demoPdfUrl || "";
    const demoPdfUrl = subjectPack?.demoPdfUrl?
    `${import.meta.env.VITE_API_URL}/public/${subjectPack.demoPdfUrl}` : null;

  return(
   
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
  )
}

export default DemoPdfSection;