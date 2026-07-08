import api from "./api";

export const purchaseService = {
 
  checkAccess : async (subjectPackId) =>{
    
     const response = await api.get(
      `v1/purchase/access/${subjectPackId}`
     );

     return response.data;
  },

  getFullPapers : async (subjectPackId) =>{
    try{

      const response = await api.get(`v1/purchase/full-papers/${subjectPackId}`);

      return response.data;

    }catch(error){
      console.error(error);

      throw error;
    }
  }
};

export default purchaseService;