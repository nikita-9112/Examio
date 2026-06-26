import { useState } from "react";
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

      navigate("/");
    }catch(error){

      console.log(error.response?.data);
    }
  }

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