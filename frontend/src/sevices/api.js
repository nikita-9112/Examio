import axios from "axios";

const api = axios.create({
  baseURL:"http://localhost:5000/api",
});



// ===============================
// REQUEST INTERCEPTOR
// ===============================

api.interceptors.request.use(
  (config) =>{
    const token = localStorage.getItem("token");

    if(token){
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)

);

// ===============================
// RESPONSE INTERCEPTOR
// ===============================

api.interceptors.response.use(
  (response) => {

    console.log("Axios response: ", response.data);
    const { data } = response;
    


    // Show backend success messages
    // only for operations that change something.
    const method = response.config.method?.toLowerCase();

    const shouldShowSuccess =
      ["post", "put", "patch", "delete"].includes(method);

    if (
      shouldShowSuccess &&
      data?.success === true &&
      data?.message
    ) {
      window.dispatchEvent(
        new CustomEvent("examio:toast", {
          detail: {
            message: data.message,
            type: "success",
          },
        })
      );
    }

    return response;
  },

  (error) => {

    console.log("AXIOS ERROR:", error.response?.data);

    // Get backend error message
    const message =
      error.response?.data?.message ||
      "Something went wrong. Please try again.";

    // Show global error toast
    window.dispatchEvent(
      new CustomEvent("examio:toast", {
        detail: {
          message,
          type: "error",
        },
      })
    );

    return Promise.reject(error);
  }
);


export default api;
