import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import api from "../sevices/api";

import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import {GraduationCap} from "lucide-react";
import { saveAuth } from "../utils/auth";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {

  const navigate = useNavigate();


  const {login} = useAuth();

  const googleButtonRef = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try{
      const response = await api.post("/auth/login",{
        email,
        password,
      });

      const {token, user} = response.data;

      saveAuth(token, user);

      login(user);

      // Role-based redirect
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    }catch(error){
      console.log(error.response?.data);
    }
  }

  const handleGoogleLogin = async (response) => { try { const result = await api.post("/auth/google", { credential: response.credential, }); const { token, user } = result.data; saveAuth(token, user); login(user); // Role-based redirect 
  if (user.role === "admin") { navigate("/admin"); } else { navigate("/dashboard"); } } catch (error) { console.log(error.response?.data); } };


  useEffect(() => { if (!window.google || !googleButtonRef.current) { return; } window.google.accounts.id.initialize({ client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID, callback: handleGoogleLogin, }); window.google.accounts.id.renderButton( googleButtonRef.current, { theme: "outline", size: "large", width: 350, text: "signin_with", } ); }, []);


return (
<div
className="
flex
min-h-screen
items-center
justify-center
bg-gradient-to-br from-blue-50 via-white to-indigo-50
px-5
"
>

<Card className="w-full max-w-md shadow-xl">
  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
    <GraduationCap/>
  </div>
   

    <h1
      className="
        text-center
        text-3xl
        font-bold
        text-blue-700
      "
    >
      Welcome Back
    </h1>

    <p
      className="
        mt-2
        text-center
        text-slate-600
      "
    >
      Sign in to continue your preparation.
    </p>

    <form className="mt-8 space-y-5" onSubmit={handleSubmit}>

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
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="text-right">
        <Link
          to="/forgot-password"
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          Forgot Password?
        </Link>
      </div>

      <Button
        type="submit"
        className="w-full"
      >
        Login
      </Button>

    </form>

    <div className="my-6 flex items-center gap-3"> <div className="h-px flex-1 bg-slate-200"></div> <span className="text-sm text-slate-500"> OR </span> <div className="h-px flex-1 bg-slate-200"></div> </div> <div ref={googleButtonRef} className="flex justify-center" ></div>

    <p
      className="
        mt-6
        text-center
        text-sm
        text-slate-600
      "
    >
      Don't have an account?{" "}

      <Link
        to="/register"
        className="
          font-medium
          text-blue-600
        "
      >
        Register
      </Link>
    </p>

  </Card>
</div>

);
};

export default LoginPage;