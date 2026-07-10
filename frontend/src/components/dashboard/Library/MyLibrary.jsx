import { useEffect, useState } from "react";
import LibraryCard from "./LibraryCard";
import purchaseService from "../../../sevices/purchaseService";
import { BookOpen } from "lucide-react";
import EmptyState from "../../ui/EmptyState";
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
const MyLibrary = ()=>{

  const [library, setLibrary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchLibrary = async() =>{
    try{
      const res = await purchaseService.getMyPurchases();
      console.log(res);
      setLibrary(res.purchases);

    }catch(error){
      console.error(error);
    }finally{
      setLoading(false);
    }
  }
  useEffect(()=>{
    setTimeout(()=>{
      fetchLibrary();
    },5000)
    
  },[]);

  return(

    <section className="px-6 py-16 ">
   <h2 className="mb-10 text-center text-3xl font-bold">
        My Library
    </h2>
 

  
{loading ? (
  <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
   
    {[1,2,3,4,5,6].map((item)=>(
      <div>
        <SkeletonCard key={item}/>
        </div>
      
    ))}
    </div>

) : error ? (
   
  <ErrorState/>

): library.length === 0 ? (
  <EmptyState/>

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