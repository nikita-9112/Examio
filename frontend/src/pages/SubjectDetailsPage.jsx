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
import purchaseService from "../sevices/purchaseService";



const SubjectDetailsPage = ()=>{
  
  const {id} = useParams();
  const navigate = useNavigate();

  const [subjectPack, setSubjectPack] = useState(null);
  
  const [loading, setLoading] = useState(true);
  const [ error, setError] = useState(false);
  const BuySectionRef = useRef(null);
  

  const {hasAccess} = useSubjectAccess(id);
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
   
    try{

      const res = await purchaseService.getProtectedPaper(id, paperId);

 
    const pdfBlob = new Blob(
      [res.data],
      {
        type:"application/pdf",
      }
    );

    const pdfUrl = URL.createObjectURL(pdfBlob);

 
    // Open PDF
    window.open(pdfUrl, "_blank");

    // release memory later
    setTimeout(() =>{
      URL.revokeObjectURL(pdfUrl);
    }, 1000 * 60);

    }catch(error){
      console.error(
        "Error opening paper:",
        error
      );
  
      alert(
        "Unable to open this paper. Please try again."
      );
    }
    
    
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
        <BuySection subjectPack={subjectPack} BuySectionRef={BuySectionRef}/>
      :
        <div>
          <span>full access</span>
          <p>Valid until</p>
          <p>Coming soon...</p>
        </div>
}
 
  </div>
 
  )
}

export default SubjectDetailsPage;