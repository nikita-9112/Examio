import { BookOpen, FileText, ShoppingBag } from "lucide-react";
import OverviewCard from "../components/OverviewCard";
import PackCard from "../components/PackCard";



const Packs = [
  {
    subjectPack:{
      _id :1,
      university:"RGPV",
      course: "Btech",
      branch: "CSE",
      semester: 4,
      subjectName:"Ada",
      subjectCode: "CS-401",
      price:30,
      demoPdfUrl:"demo",
        
    },
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
    subjectPack:{
      _id :2,
      university:"RGPV",
      course: "Btech",
      branch: "CSE",
      semester: 4,
      subjectName:"Ada",
      subjectCode: "CS-401",
      price:30,
      demoPdfUrl:"demo",
      updatedAt:"2 jun 2026",
        
    },
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
    subjectPack:{
      _id :3,
      university:"RGPV",
      course: "Btech",
      branch: "CSE",
      semester: 4,
      subjectName:"Ada",
      subjectCode: "CS-401",
      price:30,
      demoPdfUrl:"demo",
      updatedAt:"2 jun 2026",
        
    },
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

    subjectPack:{
      _id :4,
      university:"RGPV",
      course: "Btech",
      branch: "CSE",
      semester: 4,
      subjectName:"Ada",
      subjectCode: "CS-401",
      price:30,
      demoPdfUrl:"demo",
      updatedAt:"2 jun 2026",
    },
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

const Dashboard = () =>{
  return(
    
    <section className="space-y-10">

    {/* header */}

    <div>
      <h1 className="text-3xl font-bold text-gray-900">
        Welcome Admin 👋👋🏻
      </h1>

      <p className="text-gray-500 mt-2">
        Manage your subject packs and papers..
      </p>
    </div>

    {/* overview */}

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

      <OverviewCard title="Total subject Packs" value={18} icon={BookOpen}/>
      <OverviewCard title="Total papers" value={154} icon={FileText}/>
      <OverviewCard title="Total Purchases" value={332} icon={ShoppingBag}/>
   
    </div>

    {/* latest subject packs */}

    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">
          Latest Subject Packs
        </h2>
        <button className="text-blue-600 hover:underline font-medium">
          View All 
        </button>
      </div>
      {/* pack cards will come here */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Packs.map((pack) =>(
         
     
          <PackCard  key={pack.subjectPack._id} pack={pack}/>
    
        ))}
      </div>

    {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  
          <PackCard />          
          <PackCard />          
          <PackCard />          


      </div>  */}

    </div>
    </section>
  )
}

export default Dashboard;