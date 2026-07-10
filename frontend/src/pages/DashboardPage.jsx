import { useEffect, useState } from "react";

import MyLibrary from "../components/dashboard/Library/MyLibrary";
import Overview from "../components/dashboard/OverView/Overview";
import QuickStarts from "../components/dashboard/QuickStarts";
import purchaseService from "../sevices/purchaseService";

const DashboardPage = ()=>{

  const [library, setLibrary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchLibrary = async() =>{
    try{
      const res = await purchaseService.getMyPurchases();
      console.log(res);
      if(!res?.success){
        throw new Error(res?.message || "Failed to fetch library.");
      }

      setLibrary(Array.isArray(res.purchases)? res.purchases : []);

    }catch(error){
      console.error(error);
      setLibrary([]);
      setError(true);
    }finally{
      setLoading(false);
    }
  }
  useEffect(()=>{
    fetchLibrary();
    
  },[]);

  return(
    <div>
    
      <MyLibrary library={library} loading={loading} error={error}/>
      <Overview library={library} loading={loading} error={error}/>
    

      <QuickStarts/>
    </div>
  )
}


export default DashboardPage;