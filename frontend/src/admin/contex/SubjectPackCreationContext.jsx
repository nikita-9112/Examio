
import {createContext, useContext, useState} from "react";

const SubjectPackCreationContext = createContext(null);

const initialData = {
  university:"",
  course:"",
  branch:"",
  semester:"",
  subjectCode:"",
  subjectName:"",
  description:"",
  price:"",
  isActive: true,

  demoPdf:null,
  demoPdfUrl:"",
  demoPdfPublicId:"",
};

export const SubjectPackCreationProvider = ({children}) =>{

  const [subjectPackData, setSubjectPackData] = useState(initialData);

  const updateSubjectPackData = (data) =>{
    setSubjectPackData((prev) =>({
      ...prev,
      ...data,
    }));
  };

  const resetSubjectPackData = () =>{
    setSubjectPackData(initialData);
  };

  return(
    <SubjectPackCreationContext.Provider 
    value={{
      subjectPackData,
      updateSubjectPackData,
      resetSubjectPackData,
    }}>
      {children}
    </SubjectPackCreationContext.Provider>
  );
};

export const useSubjectPackCreation = () =>{
  const context = useContext(SubjectPackCreationContext);

  if(!context) {
    throw new Error(
      "useSubjectPackCreation must be used inside subjectPackCreationProvider"
    );
  }

  return context;
};

