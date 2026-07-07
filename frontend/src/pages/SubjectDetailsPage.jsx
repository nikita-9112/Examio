import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {getSingleSubjectPack} from "../sevices/subjectService";


import TrustFeature from "../components/subject/TrustFeatures";
import BuySection from "../components/subject/BuySection";
import useSubjectAccess from "../hooks/useSubjectAccess";
import Hero from "../components/subject/Hero";
import PaperSection from "../components/subject/PaperSection";
import DemoPdfSection from "../components/subject/DemoPdfSection";
import NavigateBack from "../components/ui/NavigateBack";


const SubjectDetailsPage = ()=>{
  const {id} = useParams();
  const navigate = useNavigate();

  const [subjectPack, setSubjectPack] = useState(null);
  
  const [loading, setLoading] = useState(true);
  const [ error, setError] = useState(false);
  

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

  useEffect(()=>{
    fetchSubjectPack();
  },[id]);

  return(
  
<div className="mx-auto max-w-4xl px-4 py-8">

{/*navigate back button  */}
      <NavigateBack/>

{/* hero section */}
      <Hero subjectPack={subjectPack} hasAccess={hasAccess}/>

{/* trust feature section */}
    <TrustFeature/>

{/* What's include section / Paper section */}
      <PaperSection subjectPack={subjectPack}  hasAccess={hasAccess}/>

{/* demo /preview section.. */}
        <DemoPdfSection subjectPack={subjectPack} />



{/* buy section */}

      {!canAccess ? 
        <BuySection subjectPack={subjectPack}/>
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