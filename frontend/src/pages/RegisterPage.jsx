import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import api from "../sevices/api";

import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { saveAuth } from "../utils/auth";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {

  const {login} = useAuth();
  const navigate = useNavigate();

  const googleButtonRef = useRef(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async(e) =>{
    e.preventDefault();

    try{
     
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });
      
      const {token, user} = response.data;

      saveAuth(token,user);
      login(user);

      if(user.role === "admin"){
        navigate("/admin");
      }else{
        navigate("/dashboard");
      }

    }catch(error){

      console.log(error.response?.data);
    }
  }

  const handleGoogleRegister = async( response) =>{

    try{

      const result = await api.post("/auth/google", {
        credential: response.credential,
      });

      const {token, user} = result.data;

      saveAuth(token, user);
      login(user);

      if(user.role === "admin"){
        navigate("/admin");
      }else{
        navigate("/dashboard");
      }

    }catch(error){

      console.log(error.response?.data);

    }
  }

  useEffect(() =>{

    if(!window.google || !googleButtonRef.current){
      return;
    }

    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleGoogleRegister
    });

    window.google.accounts.id.renderButton(
      googleButtonRef.current,
      {
        theme: "outline",
        size: "large",
        width: 350,
        text: "signup_with",
      }
    );

  },[]);


return (
<div
className="
flex
min-h-screen
items-center
justify-center
bg-gradient-to-br
from-blue-50
via-white
to-indigo-50
px-4
"
>
  <Card className="w-full max-w-md shadow-lg">

    <div
      className="
        mx-auto mb-4
        flex h-14 w-14
        items-center justify-center
        rounded-2xl
        bg-blue-100
        text-blue-600
      "
    >
      <GraduationCap size={28} />
    </div>

    <h1
      className="
        text-center
        text-3xl
        font-bold
        text-blue-600
      "
    >
      Create Account
    </h1>

    <p
      className="
        mt-2
        text-center
        text-slate-600
      "
    >
      Start your preparation with
      solved previous year papers.
    </p>

    <form className="mt-8 space-y-5" onSubmit={handleSubmit}>

      <Input
        label="Name"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        label="Password"
        type="password"
        placeholder="Create a password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button type="submit" className="w-full">
        Create Account
      </Button>

    </form>

    <div className="my-6 flex items-center gap-3">

        <div className="h-px flex-1 bg-slate-200"></div>

        <span className="text-sm text-slate-500">
          OR
        </span>

        <div className="h-px flex-1 bg-slate-200"></div>

   </div>

   <div
      ref={googleButtonRef}
      className="flex justify-center"
   ></div>

  <p
    className="
      mt-6
      text-center
      text-sm
      text-slate-600
    "
  >
    Already have an account?{" "}

    <Link
      to="/login"
      className="
        font-medium
        text-blue-600
      "
    >
      Sign In
    </Link>
  </p>

</Card>


</div>

);
};

export default RegisterPage;