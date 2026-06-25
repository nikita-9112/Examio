import { Link } from "react-router-dom";

import Button from "./ui/Button";

const Navbar = () => {
return (
<header
className="
sticky
top-0
z-50
border-b
border-slate-200
bg-white/80
backdrop-blur-md
"
>
<div
className="
mx-auto
flex
max-w-7xl
items-center
justify-between
px-5
py-3
"
>
{/* Logo */}

    <Link
      to="/"
      className="
        text-xl
        font-bold
        text-slate-900
      "
    >
      Examio
    </Link>

    {/* Navigation */}

    <nav
      className="
        hidden
        gap-8
        md:flex
      "
    >
      <Link
        to="/"
        className="
          text-slate-600
          transition
          hover:text-blue-600
        "
      >
        Home
      </Link>

      <Link
        to="/papers"
        className="
          text-slate-600
          transition
          hover:text-blue-600
        "
      >
        Papers
      </Link>

      <Link
        to="/about"
        className="
          text-slate-600
          transition
          hover:text-blue-600
        "
      >
        About
      </Link>
    </nav>

    {/* Actions */}

    <div
      className="
        flex
        items-center
        gap-3
      "
    >
      <Link to="/login">
        <Button variant="outline" size="sm">
          Login
        </Button>
      </Link>

      <Link to="/register">
        <Button size="sm">
          Get Started
        </Button>
      </Link>
    </div>
  </div>
</header>

);
};

export default Navbar;