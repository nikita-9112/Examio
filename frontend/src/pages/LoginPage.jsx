import { Link } from "react-router-dom";

import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import {GraduationCap} from "lucide-react";

const LoginPage = () => {
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
    {/* <div className="mb-4 text-center">
      <h2 className="text-blue-600 font-bold text-lg">
        Examio
      </h2>
    </div> */}

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

    <form className="mt-8 space-y-5">

      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
      />

      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
      />

      <Button
        className="w-full"
      >
        Login
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