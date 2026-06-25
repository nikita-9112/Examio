import { useState } from "react";
import {Eye , EyeOff} from "lucide-react";

const Input = ({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  error,
  required = false,
  }) => {

    const [showPassword, setShowPassword] = useState(false);
  return (
  <div className="w-full">
  
    {label && (
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
        {required && (
          <span className="text-red-500">
            {" "}*
          </span>
        )}
      </label>
    )}
  
  <div className="relative">
  <input
      type={
        type === "password"? showPassword?"text": "password":type
      }
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`
        w-full
        rounded-xl
        border
        px-4
        py-3
        outline-none
        transition-all
        duration-200
  
        ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-slate-300 focus:border-blue-500"
        }
      `}
    />
    {type === "password" &&(
      <button type="button" onClick={()=>setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
      >
        {showPassword? <EyeOff size={18}/> : <Eye size={18}/>}
      </button>
    )}
  </div>
   
  
    {error && (
      <p className="mt-1 text-sm text-red-500">
        {error}
      </p>
    )}
  
  </div>
  
  );
  };
  
  export default Input;