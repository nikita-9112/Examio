

import {  BookOpen, Building2,  FileText, MoreVertical, Pencil, Power, Trash2,PlusCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PackCard = ({
  pack,
  onToggleStatus,
  onDelete,
  onAddPaper,
  isToggling,
})=>{

  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

 

  const handleAddPaper = () => {
    setMenuOpen(false);
    onAddPaper?.(pack);
  };

  const handleEdit = () =>{
    setMenuOpen(false);
    navigate(`/admin/subject-packs/${pack._id}/edit`);
    console.log("Edit Pack:", pack._id);
  };

  const handleToggleActive = () =>{
    setMenuOpen(false);
    onToggleStatus?.(pack);
  };

  const handleDelete = () =>{
    setMenuOpen(false);
    onDelete?.(pack);
  }

  return(
    <div className=" p-6 bg-gradient-to-r from-blue-100 via-white to-purple-100 shadow-sm border border-slate-200 rounded-2xl  shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer  min-h-[210px] ">
          <div className="flex flex-col items-center items-start relative justify-between ">
            <div className="flex items-center mt-8">
            <div className="flex h-0 w-0  md:h-10 md:w-10 items-center justify-center rounded-xl bg-white border border-blue-100 shadow-md shadow-blue-200 hover:shadow-xl shadow-purple-200 transition-all duration-300 mr-4 ">
            <BookOpen size={20}  className="text-purple-600 font-bold "/>
          </div>
          <div className="flex-1 text-center ">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-slate-900 mr-1">
                {pack.subjectName}
              </h1>
              <span className=" inline-block rounded-full bg-purple-600 px-2 py-1 text-xs font-semibold text-white">
                {pack.subjectCode}
              </span>
            </div>
            <div className=" flex flex-wrap items-center gap-3 text-slate-700 font-semibold text-sm">
              <span>• Semester {pack.semester}</span>
              <span>• {pack.course}</span>
              <span>• {pack.branch}</span>
           </div>
        </div>
          </div >


          { onToggleStatus && 
          
          <div className="absolute right-0 top-0">
              <button type="button"
               onClick={(e) =>{
                e.stopPropagation();
                setMenuOpen((prev) => !prev)
              }
              }
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition"
               aria-label="Subject Pack actions">
                <MoreVertical  className="w-5 h-5"/>
              </button>

              {menuOpen && (
                <div 
                onClick={(e) => e.stopPropagation()}
                className="absolute right-0 top-10 z-20 w-52 bg-white border border-slate-200 rounded-xl shadow-lg py-2">
                  {/* mangae Papers */}
                  <button
                      type="button"
                      onClick={handleAddPaper}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition"
                    >
                      <PlusCircle size={17} />
                      Add Paper
                    </button>
                   
                   {/* edit */}
                   <button type="button" onClick={handleEdit} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 tansition">
                    <Pencil size={17}/>
                    Edit Subject Pack
                   </button>

                  {/* Active /inactive */}
                  <button
                    type="button"
                    onClick={handleToggleActive}
                    disabled={isToggling}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition disabled:opacity-50"
                  >
                    <Power size={17} />

                    {isToggling
                      ? "Updating..."
                      : pack.isActive
                        ? "Deactivate Pack"
                        : "Activate Pack"
                    }
                  </button>

                  {/* Divider */}
                  <div className="my-2 border-t border-slate-100"/>

                  {/* delete */}
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition"
                  >
                    <Trash2 size={17} />
                    Delete Subject Pack
                  </button>

                </div>
              )}
            </div>}
            
          </div>
          <p className="mt-3 text-slate-700 flex  items-center font-medium text-sm">
          <Building2 size={18} className="text-purple-600 mr-2"/>
            {pack.university}
          </p>
          <div className="mt-4 flex items-center justify-between">
             {/* left side */}
            <div className=" flex items-center gap-2">
              <FileText size={16} className="text-blue-600"/>
              <span className="text-sm font-medium text-slate-700">{pack.papers?.length} Papers</span>
            </div>
            {/* right side */}
            <div className="mt-5 flex justify-between items-center hover:-translate-x-1 transition-all duration-300 pointer-cursor hover:bg-indigo-50">
                  <span className="text-green-700 font-medium text-xs">
                  updatedAt: {pack.updatedAt}
                  </span>
                 
                </div>

          </div>


        </div> 
  )

}

export default PackCard;