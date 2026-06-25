


const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  onClick,
  }) => {
  const variants = {
  primary:
  "bg-blue-600 hover:bg-blue-700 text-white",
  
  secondary:
    "bg-indigo-600 hover:bg-indigo-700 text-white",
  
  outline:
    "border border-blue-600 text-blue-600 hover:bg-blue-50",
  
  success:
    "bg-emerald-500 hover:bg-emerald-600 text-white",
  
  };
  
  const sizes = {
  sm: "px-3 py-2 text-sm",
  md: "px-5 py-2.5 text-base",
  lg: "px-6 py-3 text-lg",
  };
  
  return (
  <button
  type={type}
  disabled={disabled}
  onClick={onClick}
  className={`rounded-xl font-medium transition-all duration-200 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
  >
  {children}
  </button>
  );
  };
  
  export default Button;