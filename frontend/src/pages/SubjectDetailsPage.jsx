import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {getSingleSubjectPack} from "../sevices/subjectService";


import TrustFeature from "../components/subject/TrustFeatures";
import BuySection from "../components/subject/BuySection";
import useSubjectAccess from "../hooks/useSubjectAccess";
import Hero from "../components/subject/Hero";
import PaperSection from "../components/subject/PaperSection";
import DemoPdfSection from "../components/subject/DemoPdfSection";
import NavigateBack from "../components/ui/NavigateBack";
import { isAuthenticated } from "../utils/auth";



const SubjectDetailsPage = ()=>{
  
  const {id} = useParams();
  const navigate = useNavigate();

  const [subjectPack, setSubjectPack] = useState(null);
  
  const [loading, setLoading] = useState(true);
  const [ error, setError] = useState(false);
  const BuySectionRef = useRef(null);
  

  const {hasAccess, checkAccess, validUntil} = useSubjectAccess(id);
  const canAccess = hasAccess;


  const fetchSubjectPack =async ()=>{
    try{
      
      setLoading(true);
      const response = await getSingleSubjectPack(id);

      setSubjectPack(response.data);
      setError(false);

    }catch(error){
      console.log(error);
      setError(true);
    }
    finally{
      setLoading(false);
  }
  }

  const handlePurchaseSuccess = async () => {
    await checkAccess();
  };


  const handlePaperClick = async (paperId) =>{
    
    if(!isAuthenticated()){
      navigate("/login");
      return;
    }
    if(!hasAccess){
      BuySectionRef.current?.scrollIntoView({
        behavior:"smooth",
        block: "start",
      });
      
      return;

    }
   
    navigate(
      `/paper/${id}/${paperId}`
    );

    

    
  }

  useEffect(()=>{
    fetchSubjectPack();
  },[id]);

  return(
  
<div className="mx-auto max-w-4xl space-y-4 px-4 py-8">

{/*navigate back button  */}
      <NavigateBack/>

{/* hero section */}
      <Hero subjectPack={subjectPack} hasAccess={hasAccess}/>

{/* trust feature section */}
    <TrustFeature/>

{/* What's include section / Paper section */}
      <PaperSection subjectPack={subjectPack}  hasAccess={hasAccess} onPaperClick={handlePaperClick}/>

{/* demo /preview section.. */}
        <DemoPdfSection subjectPack={subjectPack} />



{/* buy section */}

    {!canAccess ? 
        <BuySection subjectPack={subjectPack} BuySectionRef={BuySectionRef}  onPurchaseSuccess={handlePurchaseSuccess}/>
      :
      <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
        <span className="text-sm font-semibold text-green-700">
          Full Access
        </span>

        <p className="mt-2 text-sm text-slate-600">
          You have access to all papers in this subject pack.
        </p>

        {validUntil && (
          <p className="mt-2 text-sm font-semibold text-slate-800">
            Valid until:{" "}
            {new Date(validUntil).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        )}
      </div>
}
 
  </div>
 
  )
}

export default SubjectDetailsPage;