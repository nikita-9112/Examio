import { useNavigate } from "react-router-dom";
import Button from "./ui/Button";



const HeroSection = () => {

  const navigate = useNavigate();



  const BrowsePaper = ()=>{
    navigate("/subject-packs")
  
  }
  const learnMore = ()=>{
    navigate("/about")
  
  }
return (
<section
className="
relative
overflow-hidden
px-6
py-24
"
>
<div
className="
absolute
inset-0
bg-gradient-to-br
from-blue-50
via-white
to-indigo-50
"
/>

  <div
    className="
      relative
      mx-auto
      max-w-5xl
      text-center
    "
  >
    <p
      className="
        mb-4
        font-medium
        text-blue-600
      "
    >
      Solved Previous Year Papers for Smarter Exam Preparation
    </p>

    <h1
      className="
        text-5xl
        font-bold
        leading-tight
        text-slate-900
        md:text-6xl
      "
    >
      Prepare Smarter.
      <br />
      Score Better.
    </h1>

    <p
      className="
        mx-auto
        mt-6
        max-w-2xl
        text-lg
        text-slate-600
      "
    >
      Get instant access to solved previous year papers, organized by subject and semester, to understand concepts faster and perform better in exams.
    </p>

    <div
      className="
        mt-10
        flex
        flex-col
        justify-center
        gap-4
        sm:flex-row
      "
    >
      <Button size="lg" onClick={BrowsePaper} >
        Browse Papers
      </Button>

      <Button
        variant="outline"
        size="lg"
        onClick={learnMore}
      >
        Learn More
      </Button>
    </div>
  </div>
</section>

);
};

export default HeroSection;