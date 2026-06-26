import { createContext, useContext, useEffect, useState, } from "react";

import { getUser, getToken, logout as clearAuth } from "../utils/auth";

const AuthContext = createContext();

export function AuthProvider({children}){

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const token = getToken();
    const currUser = getUser();

    if(token && currUser){
      setUser(currUser);
    }

    setLoading(false);
  }, []);

  const logout = () =>{
    clearAuth();
    setUser(null);
  };

  const login = (userData) =>{
    setUser(userData);
  }

  return(
    <AuthContext.Provider value={{
      user,
      loading,
      logout,
      login,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(){
  return useContext(AuthContext);
}