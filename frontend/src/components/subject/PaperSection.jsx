
import {Package, FileText, CheckCircle2, Lock} from "lucide-react";


const PaperSection = ({subjectPack, hasAccess, onPaperClick})=>{

  const papers = subjectPack?.papers || [];

  return(
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
              className="flex items-center justify-between  rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition-all duration-300 hover:border-blue-300 hover:bg-blue-50" 
              
              onClick={()=>onPaperClick(paper._id)}>
  
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
                <div>
                  {hasAccess? <CheckCircle2 className="h-5 w-5 text-green-500" />: <Lock className="h-5 w-5 text-green-500" />}
                </div>
                
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
  )
}


export default PaperSection;