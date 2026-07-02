// import Button from "../components/ui/Button";
// import Card from "../components/ui/Card";

// const HomePage = ()=>{
//   return (
//     <div className="min-h-screen">

// {/* hero section */}
//       <section className="px-6 py-20 text-center">
//         <h1 className="text-5xl font-bold">
//           Examio
//         </h1>
//         <p className="mt-4 text-lg text-gray-600">
//           Previous Year papers for Better Exam Preparation
//         </p>

//         <button className="mt-8 rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">
//           Explore Papers
//         </button>
//       </section>
   
//         <Card className="max-w-sm">
//           <h2 className="text-2xl font-bold text-slate-900">
//             ADa
//           </h2>
//           <p className="mt-2 text-slate-600">
//             Prevous 5 years papers 
//           </p>
//           <p className="mt-4 text-3xl font-bold">
//             20rs
//           </p>
//           <div className="mt-5 flex gap-3">
//           <Button variant="outline">
//             Preview
//           </Button>
//           <Button>Buy Now</Button>
//         </div>

//         </Card>
         
      
//     </div>
//   )
// }

// export default HomePage;

import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
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




const HomePage = () => {

  const [subjectPacks, setSubjectPacks] = useState([]);
  const [loading ,setLoading] = useState(true);
  const [error, setError] = useState(false);


  const fetchSubjectPacks = async ()=>{
    try{
  
      const response = await getAllSubjectPacks();
      setTimeout(()=>{
        setSubjectPacks(response.data);
        setLoading(false);
      }, 2000)
    
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

    {/* search papers */}
    <section className="px-6 pb-12 mt-12">
      <SearchInput/>
     
    </section>

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

<section px-6 py-16>
   <h2 className="mb-10 text-center text-3xl font-bold">
        Explore Subject Packs
    </h2>
 

  
{loading ? (
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
   
    {[1,2,3,4,5,6].map((item)=>(
      <div>
        <SkeletonCard key={item}/>
        </div>
      
    ))}
    </div>

) : error ? (
   
  <ErrorState/>

): subjectPacks.length === 0 ? (
  <EmptyState/>

):(
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  {subjectPacks.map((pack)=>(
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