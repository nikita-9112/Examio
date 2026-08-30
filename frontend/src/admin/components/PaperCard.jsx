
import { Trash2,FileText } from "lucide-react";
const PaperCard = ({paper ,onDelete}) =>{

  return(
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
      <button type="button" onClick={() =>onDelete(paper)}>
      <Trash2 className="h-5 w-5 text-red-500" />
      </button>
      
    </div>
  )
}

export default PaperCard;