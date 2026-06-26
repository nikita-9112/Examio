import { Link } from "react-router-dom";
import { BookOpen,Building2, FileText, ArrowRight } from "lucide-react";

import Card from "./ui/Card";
import Button from "./ui/Button";

const SubjectPackCard = ({pack}) => {
return (
<Card className="group flex flex-col justify-between">
<div>
   

    <div className="flex items-center justify-between gap-3">
      <h3 className="text-xl font-semibold text-slate-900">
        {pack.subjectName}
      </h3>
      
      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
        {pack.subjectCode}
      </span>
    </div>
   
   <p className="mt-2 text-sm text-slate-600">
    Semester {pack.semester}   •  {pack.course}  •  {pack.branch}
   </p>

   <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
    <Building2 size={16} className="text-blue-600"/>
    <span>{pack.university}</span>
   </div>

 <div className="mt-4 flex items-center justify-between">

  {/* left side */}
  <div className=" flex items-center gap-2">
    <FileText size={16} className="text-blue-600"/>
    <span className="text-sm font-medium text-slate-700">{pack.papers.length} Sloved PYQs</span>
   </div>

   {/* right side */}

   <p className="text-lg font-bold text-blue-600">
    <span className="mr-1 text-sm font-normal text-slate-500">
      Only
    </span>
    ₹{pack.price}
   </p>

 </div>


  </div>

  <div className="mt-6">
   
    <div className="mt-4 flex gap-3">
      <Link to={`/subject`} className="flex-1">
        <Button variant="outline" className="w-full">
          Preview
        </Button>
      </Link>
      <Button className="flex-1">
        Buy Now
      </Button>
    </div>
  </div>
</Card>

);
};

export default SubjectPackCard;

/*
const sanitizedPacks = packs.map(pack =>({
  _id : pack.id,
  university:pack.university,
  course: pack.course,
  branch: pack.branch,
  semester: pack.semester,
  subjectName:pack.subjectName,
  subjectCode: pack.subjectCode,
  price:pack.price,
  demoPdfUrl: pack.demoPdfUrl,

  papers: pack.papers.map(paper =>({
    _id: paper._id,
    examYear: paper.examYear,
    examType: paper.examType,
    fileName: paper.fileName,
    uploadedAt: paper.uploadedAt,
  }))
}));

 */