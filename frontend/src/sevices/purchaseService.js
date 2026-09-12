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
  },

  getProtectedPaper: async (subjectPackId, paperId) => {

    const  response = await api.get(
      `v1/purchase/paper/${subjectPackId}/${paperId}`,
      {
        responseType: "blob",
      }
    );

    return response.data;
  },
  
  getMyPurchases : async() =>{
    const response = await api.get("v1/purchase/my-purchases");
    return response;
  },


  createOrder: async (subjectPackId) => {
    try {
      const response = await api.post(
        "v1/purchase/create-order",
        {
          subjectPackId,
        }
      );

      return response.data;

    } catch (error) {
      console.error("Error creating payment order:", error);
      throw error;
    }
  },

  verifyPayment: async (paymentData) => {
    try {
      const response = await api.post(
        "v1/purchase/verify-payment",
        paymentData
      );
  
      return response.data;
  
    } catch (error) {
      console.error(
        "Error verifying payment:",
        error
      );
  
      throw error;
    }
  },


};

export default purchaseService;