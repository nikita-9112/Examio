import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  X,
} from "lucide-react";


const ToastContext = createContext();


export const ToastProvider = ({ children }) => {

  const [toast, setToast] = useState(null);


  const showToast = (message, type = "success") => {
    setToast({
      message,
      type,
    });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };


  const hideToast = () => {
    setToast(null);
  };


  // Listen for global API notifications
  useEffect(() => {

    const handleToast = (event) => {

      const { message, type } = event.detail;

      showToast(message, type);

    };


    window.addEventListener(
      "examio:toast",
      handleToast
    );


    return () => {
      window.removeEventListener(
        "examio:toast",
        handleToast
      );
    };

  }, []);


  return (
    <ToastContext.Provider
      value={{
        showToast,
        hideToast,
      }}
    >

      {children}


      {toast && (

        <div className="fixed top-5 right-5 z-[9999] w-[350px]">

          <div
            className={`
              flex
              items-center
              gap-3
              rounded-xl
              border
              bg-white
              px-4
              py-3
              shadow-lg
              ${
                toast.type === "success"
                  ? "border-green-200"
                  : toast.type === "error"
                  ? "border-red-200"
                  : toast.type === "warning"
                  ? "border-yellow-200"
                  : "border-blue-200"
              }
            `}
          >

            {/* SUCCESS */}
            {toast.type === "success" && (
              <CheckCircle
                size={24}
                className="text-green-500"
              />
            )}


            {/* ERROR */}
            {toast.type === "error" && (
              <XCircle
                size={24}
                className="text-red-500"
              />
            )}


            {/* WARNING */}
            {toast.type === "warning" && (
              <AlertCircle
                size={24}
                className="text-yellow-500"
              />
            )}


            {/* INFO */}
            {toast.type === "info" && (
              <Info
                size={24}
                className="text-blue-500"
              />
            )}


            {/* MESSAGE */}
            <p
              className={`
                flex-1
                text-sm
                font-medium
                ${
                  toast.type === "success"
                    ? "text-green-700"
                    : toast.type === "error"
                    ? "text-red-700"
                    : toast.type === "warning"
                    ? "text-yellow-700"
                    : "text-blue-700"
                }
              `}
            >
              {toast.message}
            </p>


            {/* CLOSE */}
            <button
              onClick={hideToast}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>

          </div>

        </div>

      )}

    </ToastContext.Provider>
  );
};


export const useToast = () => {
  return useContext(ToastContext);
};