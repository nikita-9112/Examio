import api from "./api";

const purchaseService = {
 
  checkAccess : async (subjectPackId) =>{
    
     const response = await api.get(
      `v1/purchase/access/${subjectPackId}`
     );

     return response.data;
  },
};

export default purchaseService;