

import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const RegisterPage = () => {
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

    <form className="mt-8 space-y-5">

      <Input
        label="Name"
        placeholder="Enter your name"
      />

      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
      />

      <Input
        label="Password"
        type="password"
        placeholder="Create a password"
      />

      <Button className="w-full">
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