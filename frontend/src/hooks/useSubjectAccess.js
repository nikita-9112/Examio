import { useEffect, useState } from "react";
import { getToken } from "../utils/auth";
import purchaseService from "../sevices/purchaseService";



const useSubjectAccess = (SubjectPackId) =>{

  const [accessInfo, setAccessInfo] = useState({
    hasAccess : false,
    validUntil:null,
    loading: false,
    error: null,
  })

  const token = getToken();
  const checkAccess = async () =>{
    if(!token || !SubjectPackId){
      return;
    }

    setAccessInfo(prev =>({
      ...prev,
      loading:true,
      error: null,
    }));

    try{
      const data = await purchaseService.checkAccess(SubjectPackId);
      setAccessInfo(prev =>({
        ...prev,
        hasAccess: data.hasAccess,
      }))

    }catch(error){

      setAccessInfo(prev =>({
        ...prev,
        error: error.message,
      }))

    }finally{
      setAccessInfo(prev =>({
        ...prev,
        loading: false,
      }));
    }
  }

  useEffect(()=>{
    checkAccess();
  },[SubjectPackId]);

  return{
    ...accessInfo,
    checkAccess,
  };
};

export default useSubjectAccess;