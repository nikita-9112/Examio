
import FeatureCard from "../components/FeatureCard";
import {BookOpen, Zap, Target, Section} from "lucide-react";
import SubjectPackCard from "../components/SubjectPackCard";
import HeroSection from "../components/HeroSection";
import SearchInput from "../components/SearchInput";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { getAllSubjectPacks } from "../sevices/subjectService";
import SkeletonCard from "../components/ui/SkeletonCard";
import EmptyState from "../components/ui/EmptyState";
import ErrorState from "../components/ui/ErrorState";
import { Link } from "react-router-dom";




const HomePage = () => {

  const [subjectPacks, setSubjectPacks] = useState([]);
  const [loading ,setLoading] = useState(true);
  const [error, setError] = useState(false);


  const fetchSubjectPacks = async ()=>{
    try{
  
      const response = await getAllSubjectPacks();
      setSubjectPacks(response.data);
      setLoading(false);
    
      setError(false);
    }catch(err){
      console.log(err);

      setError(true);
    }
  };

  useEffect(()=>{
    fetchSubjectPacks();
  },[]);

return (
<div className="p-10">

   {/* hero section */}
    <HeroSection/>

    {/* feature card */}
    <section className="px-6 py-16">
      
      <h2 className="mb-10 text-center text-3xl font-bold">
        Why Choose Examio?
      </h2>

      <div className="grid gap-6 md:grid-cols-3 ">

        <FeatureCard icon={BookOpen} title="previous year papers" description="Access organized collections of previours year exam papers."
        />
        <FeatureCard icon={Zap} title="Instant Access" description="Purchase once and get immediate access to paper packs."
        />
        <FeatureCard icon={Target} title="Affordable Pricing" description="High-quality prepatation resources at student-friendly prices."/>
      </div>
    </section>

 

  {/* subjectpack card render */}

{/* Subject Pack Section */}

<section className="px-6 py-16">

  <div className="mb-10 flex flex-col items-center justify-between gap-4 sm:flex-row">

<div>
  <h2 className="text-3xl font-bold text-slate-900">
    Explore Subject Packs
  </h2>

  <p className="mt-2 text-sm text-slate-500">
    Find solved previous year papers for your preparation.
  </p>
</div>

{!loading && !error && subjectPacks.length > 3 && (
  <Link
    to="/subject-packs"
    className="
      inline-flex
      items-center
      rounded-lg
      border
      border-blue-200
      px-4
      py-2
      text-sm
      font-semibold
      text-blue-600
      transition
      hover:bg-blue-50
    "
  >
    View All
  </Link>
)}


  </div>

{loading ? (


<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

  {[1, 2, 3].map((item) => (
    <SkeletonCard key={item} />
  ))}

</div>


) : error ? (


<ErrorState />


) : subjectPacks.length === 0 ? (


<EmptyState
  title="No Subject Packs Found"
  description="New solved PYQs will be added soon. Please check back later."
/>


) : (


<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

  {subjectPacks.slice(0, 3).map((pack) => (

    <SubjectPackCard
      key={pack._id}
      pack={pack}
    />

  ))}

</div>


)}

</section>



{/* footer */}
<Footer/>
</div>

);
};

export default HomePage;