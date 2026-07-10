
import LibraryCard from "./LibraryCard";
import purchaseService from "../../../sevices/purchaseService";
import { BookOpen } from "lucide-react";
import EmptyState from "../../ui/EmptyState";
import ErrorState from "../../ui/ErrorState";
import SkeletonCard from "../../ui/SkeletonCard";


const library = [
  {
    _id :1,
  university:"RGPV",
  course: "Btech",
  branch: "CSE",
  semester: 4,
  subjectName:"Ada",
  subjectCode: "CS-401",
  price:30,
  demoPdfUrl:"demo",

  papers: [
    {
    _id: "p11",
    examYear: 2024,
    examType:"june",
    fileName:"ada-june",
    uploadedAt: 2026,
  },
    {
    _id: "p21",
    examYear: 2024,
    examType:"june",
    fileName:"ada-june",
    uploadedAt: 2026,
  },
    {
    _id: "p31",
    examYear: 2024,
    examType:"june",
    fileName:"ada-june",
    uploadedAt: 2026,
  },
]
    
  },
  {
    _id :2,
  university:"RGPV",
  course: "Btech",
  branch: "CSE",
  semester: 4,
  subjectName:"Ada",
  subjectCode: "CS-401",
  price:30,
  demoPdfUrl:"demo",

  papers: [
    {
    _id: "p12",
    examYear: 2024,
    examType:"june",
    fileName:"ada-june",
    uploadedAt: 2026,
  },
    {
    _id: "p22",
    examYear: 2024,
    examType:"june",
    fileName:"ada-june",
    uploadedAt: 2026,
  },
    {
    _id: "p32",
    examYear: 2024,
    examType:"june",
    fileName:"ada-june",
    uploadedAt: 2026,
  },
]
    
  },
  {
    _id :3,
  university:"RGPV",
  course: "Btech",
  branch: "CSE",
  semester: 4,
  subjectName:"Ada",
  subjectCode: "CS-401",
  price:30,
  demoPdfUrl:"demo",

  papers: [
    {
    _id: "p13",
    examYear: 2024,
    examType:"june",
    fileName:"ada-june",
    uploadedAt: 2026,
  },
    {
    _id: "p23",
    examYear: 2024,
    examType:"june",
    fileName:"ada-june",
    uploadedAt: 2026,
  },
    {
    _id: "p33",
    examYear: 2024,
    examType:"june",
    fileName:"ada-june",
    uploadedAt: 2026,
  },
]
    
  },
  {
    _id :4,
  university:"RGPV",
  course: "Btech",
  branch: "CSE",
  semester: 4,
  subjectName:"Ada",
  subjectCode: "CS-401",
  price:30,
  demoPdfUrl:"demo",

  papers: [
    {
    _id: "p14",
    examYear: 2024,
    examType:"june",
    fileName:"ada-june",
    uploadedAt: 2026,
  },
    {
    _id: "p24",
    examYear: 2024,
    examType:"june",
    fileName:"ada-june",
    uploadedAt: 2026,
  },
    {
    _id: "p34",
    examYear: 2024,
    examType:"june",
    fileName:"ada-june",
    uploadedAt: 2026,
  },
]

  },
]
const MyLibrary = ({loading, error, library})=>{

 

  return(
    <section className="px-6 py-16 ">
   <h2 className="mb-10 text-center text-3xl font-bold">
        My Library
    </h2>
 
{loading ? (
  <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
   
    {[1,2].map((item)=>(
      <div>
        <SkeletonCard key={item}/>
        </div>
    ))}
    </div>

) : error ? (
     <ErrorState/>
): library.length === 0 ? (
  <EmptyState  title={"You haven't purchased any subject packs yet"} description={"Purchase a subject pack to access solved PYQs"}/>
):(
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  {library.map((pack)=>(
    <LibraryCard 
    key={pack._id}
    pack={pack}
    />
  ))}
</div>
)}
</section>
  )
}


export default MyLibrary;