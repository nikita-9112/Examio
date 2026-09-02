import {
  ActivitySquare,
  BookOpen,
  Package,
  } from "lucide-react";
  
  import OverViewCard from "./OverviewCard";
  
  const Overview = ({
  library,
  loading,
  error,
  }) => {
  
  // Total purchased subject packs
  const purchasedPacks = library.length;
  
  // Total papers available across all purchased packs
  const totalPapers = library.reduce(
  (total, purchase) => {
  
  
    const papers =
      purchase?.subjectPack?.papers || [];
  
    return total + papers.length;
  
  },
  0
  
  
  );
  
  // Active packs
  const activePacks = library.filter(
  (purchase) => {
  
  
    // No expiry date means lifetime access
    if (!purchase?.expiresAt) {
      return true;
    }
  
    return (
      new Date(purchase.expiresAt) >
      new Date()
    );
  
  }
  
  
  ).length;
  
  // Don't show incorrect empty stats while loading
  if (loading) {
  return null;
  }
  
  return (
  
  
  <section>
  
    <div className="mb-6">
  
      <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
        Overview
      </h2>
  
      <p className="mt-1 text-sm text-slate-500">
        Your Examio summary at a glance.
      </p>
  
    </div>
  
  
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
  
  
      <OverViewCard
        title="Purchased Packs"
        value={purchasedPacks}
        icon={<Package size={22} />}
        iconBg="bg-blue-100"
        iconColor="text-blue-600"
      />
  
  
      <OverViewCard
        title="Available Papers"
        value={totalPapers}
        icon={<BookOpen size={22} />}
        iconBg="bg-emerald-100"
        iconColor="text-emerald-600"
      />
  
  
      <OverViewCard
        title="Active Packs"
        value={activePacks}
        icon={<ActivitySquare size={22} />}
        iconBg="bg-violet-100"
        iconColor="text-violet-600"
      />
  
    </div>
  
  </section>
  
  
  );
  
  };
  
  export default Overview;
  