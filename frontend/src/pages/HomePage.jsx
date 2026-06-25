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



const demoPacks = [
  {
    subjectName:"ADA",
    subjectCode:"CS501",
    semester:5,
    price:40,
    slug:"cs501-ada"
  },
  {
    subjectName:"SE",
    subjectCode:"CS504",
    semester:5,
    price:40,
    slug:"cs501-se"
  },
  {
    subjectName:"DBMS",
    subjectCode:"CS502",
    semester:5,
    price:40,
    slug:"cs501-dbms"
  },
  {
    subjectName:"Operating system",
    subjectCode:"CS501",
    semester:5,
    price:40,
    slug:"cs501-os"
  }
]
const HomePage = () => {
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
 

  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {demoPacks.map((pack)=>(
      <SubjectPackCard 
      key={pack.slug}
      {...pack}
      />
    ))}
  </div>
</section>


{/* footer */}
<Footer/>
</div>

);
};

export default HomePage;