import { Activity, ActivitySquare, BookOpen, Package } from "lucide-react";
import OverViewCard from "./OverviewCard";


const Overview = ({library})=>{
  const purchasedPacks = library.length ||0;
  const totalPapers = library.reduce(
    (total, purchase) =>
    total + purchase.subjectPack.papers.length, 0
  );

  const activePacks = library.filter(
    purchase => 
    new Date(purchase.expiresAt) > new Date()
  ).length || 0;
  
  console.log(purchasedPacks, " ", totalPapers, " ", activePacks)

  return(

    <section className="mt-6">
      <div className="mb-6 flex flex-col items-center"> 
        <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
        <p className="text-gray-500 mt-1">Your Examio summary at a glance.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 m-6">
 
      <OverViewCard 
      title="Purchased Packs" 
      value={purchasedPacks}
      icon={<Package size={22} />}
      iconBg="bg-indigo-100"
      iconColor="text-indigo-600"
      />
      <OverViewCard 
      title="Total Papers" 
      value={totalPapers}
      icon={<BookOpen size={22} />}
      iconBg="bg-indigo-100"
      iconColor="text-indigo-600"
      />
      <OverViewCard 
      title="Active Packs" 
      value={purchasedPacks}
      icon={<ActivitySquare size={22} />}
      iconBg="bg-indigo-100"
      iconColor="text-indigo-600"
      />

      </div>
      
    </section>

  )
}

export default Overview;