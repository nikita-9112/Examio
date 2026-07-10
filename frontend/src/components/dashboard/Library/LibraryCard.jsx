import Card from "../../ui/Card";
import { ArrowRight, BookOpen, Building2, FileText } from "lucide-react";

const LibraryCard = ({pack})=>{


  return(
    <div className=" p-6 bg-gradient-to-r from-blue-100 via-white to-purple-100 shadow-sm border border-slate-200 rounded-2xl  shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer ">
          <div className="flex flex-col items-center items-start relative justify-between ">
            <div className="flex items-center mt-8">
            <div className="flex h-0 w-0  md:h-16 md:w-16 items-center justify-center rounded-xl bg-white border border-blue-100 shadow-md shadow-blue-200 hover:shadow-xl shadow-purple-200 transition-all duration-300 mr-5 ">
          <BookOpen size={32}  className="text-purple-600 font-bold "/>
          
        </div>
        <div className="flex-1 text-center ">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold text-slate-900 mr-1">
              {pack.subjectPack.subjectName}
            </h1>
             <span className=" inline-block rounded-full bg-purple-600 px-2 py-1 text-xs font-semibold text-white">
               {pack.subjectPack.subjectCode}
            </span>
          </div>
         
            <div className=" flex flex-wrap items-center gap-3 text-slate-700 font-semibold">
              <span>• Semester {pack.subjectPack.semester}</span>
              <span>• {pack.subjectPack.course}</span>
              <span>• {pack.subjectPack.branch}</span>
           </div>


        </div>

           
          </div >
            <span className=" inline-block rounded-full border border-green-500 bg-green-100 px-2 py-1 text-xs font-bold text-green-600 absolute right-0 ">
               Access till 
               23 jan 2027
            </span>

          </div>

          

          <p className="mt-3 text-slate-700 flex  items-center font-medium">
          <Building2 size={18} className="text-purple-600 mr-2"/>
            {pack.subjectPack.university}
          </p>

          <div className="mt-4 flex items-center justify-between">

            {/* left side */}
            <div className=" flex items-center gap-2">
              <FileText size={16} className="text-blue-600"/>
              <span className="text-sm font-medium text-slate-700">{pack.papers?.length} Sloved PYQs</span>
            </div>

            {/* right side */}

            <div className="mt-5 flex justify-between items-center hover:-translate-x-1 transition-all duration-300 pointer-cursor hover:bg-indigo-50">
                  <span className="text-green-700 font-medium">
                    Active
                  </span>
                  <ArrowRight className="text-indigo-600"/>
                </div>

          </div>


        </div> 
  )

}

export default LibraryCard;