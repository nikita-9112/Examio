import { BookOpen, FileText, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import OverviewCard from "../components/OverviewCard";
import PackCard from "../components/PackCard";
import { useEffect, useState } from "react";
import {getAllSubjectPacks} from "../../sevices/subjectService";
import SkeletonCard from "../../components/ui/SkeletonCard";
import ErrorState from "../../components/ui/ErrorState";
import EmptyState from "../../components/ui/EmptyState";
import { getAdminDashboardStats } from "../services/adminServices";

const Dashboard = () =>{

  const navigate = useNavigate();
  const [packs, setPacks] = useState([]);
  const [stats, setStats] = useState({
    totalSubjectPacks : 0,
    totalPapers: 0,
    totalPurchases: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");



  const fetchDashboardData = async() =>{

    try{
    
      setLoading(true);
      setError("");

     const [packsResponse, statsResponse] = await Promise.all([
      getAllSubjectPacks(),
      getAdminDashboardStats()
     ])

      
      setPacks(packsResponse.data || []);
      setStats({
        totalSubjectPacks: statsResponse.data?.totalSubjectPacks || 0,
        totalPapers: statsResponse.data?.totalPapers || 0,
        totalPurchases: statsResponse.data?.totalPurchases || 0,

      });

    }
    catch(error){

      console.error( "Dashboard error:", error ); 
      setError( error?.response?.data?.message || "Failed to load dashboard data." );
    }
    finally { 
      setLoading(false); 
    }

  };

  useEffect(()=>{
    fetchDashboardData();
  },[])

  const DisplayedPack = packs? packs.slice(0,3) : [];

  if(loading){
    return(
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    )
  }
  if(error){
    return(
      <div>
        <ErrorState title="Unable to load dashboard" description={error} />
      </div>
    )
  }

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

    <OverviewCard title="Total Subject Packs" value={stats.totalSubjectPacks} icon={BookOpen} /> 
    <OverviewCard title="Total Papers" value={stats.totalPapers} icon={FileText} /> <OverviewCard title="Total Purchases" value={stats.totalPurchases} icon={ShoppingBag} />
   
    </div>

    {/* latest subject packs */}

    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">
          Latest Subject Packs
        </h2>
        <Link to="/admin/subject-packs" className="text-blue-600 hover:underline font-medium">
          View All 
        </Link>
      </div>
      {/* pack cards will come here */}

      { DisplayedPack.length === 0 ?
        <EmptyState  title="No Subject Pack Added"
        description="Add Subject Pack " />
        :
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {DisplayedPack.map((pack) =>(
         
         <div onClick={() => navigate( `/admin/subject-packs/${pack._id}`)}>
          <PackCard  key={pack._id} pack={pack}/>
          </div>
        ))}
      </div>
      }
    </div>
    </section>
  )
}

export default Dashboard;