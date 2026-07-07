
import {BookOpen,GraduationCap,Building2, BadgeCheck} from "lucide-react";

const Hero = ({subjectPack,hasAccess}) =>{

  return(
    <div className="rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-100 via-white to-purple-100 shadow-sm">
      <div className="flex flex-col  gap-6 md:flex-row md:items-center  px-4 py-4">
        {/* left icon */}
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white border border-blue-100 shadow-md shadow-blue-200 hover:shadow-xl shadow-purple-200 transition-all duration-300 ">
          <BookOpen size={38}  className="text-blue-600 "/>
        </div>
        {/* Right content */}
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
            <h1 className="text-3xl font-bold text-slate-900 mr-2">
              {subjectPack?.subjectName}
            </h1>

            <span className=" inline-block rounded-full bg-purple-600 px-2 py-1 text-xs font-semibold text-white">
              {subjectPack?.subjectCode}
            </span>
            </div>
            {hasAccess && (
              <span  className="rounded-full border border-amber-300 bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800 flex gap-1">
                <BadgeCheck size={14}/>
                Purchased
              </span>
            )}
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
  )
}

export default Hero;