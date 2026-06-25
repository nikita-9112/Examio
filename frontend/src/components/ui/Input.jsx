const Input = ({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  error,
  required = false,
  }) => {
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
  
    <input
      type={type}
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
  
    {error && (
      <p className="mt-1 text-sm text-red-500">
        {error}
      </p>
    )}
  
  </div>
  
  );
  };
  
  export default Input;