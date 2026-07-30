import { Search } from "lucide-react";

const SearchInput = ({
placeholder = "Search subject or code...",
}) => {
return (
<div
className="
flex
mx-auto
items-center
max-w-2xl
items-center
rounded-2xl
border
border-slate-200
bg-white
px-4
py-3
shadow-sm
transition-all
duration-200
focus-within:border-blue-500
focus-within:shadow-md

"
>
<Search
size={20}
className="text-slate-400"
/>

  <input
    type="text"
    placeholder={placeholder}
    className="
      ml-3
      w-full
      bg-transparent
      outline-none
      text-slate-700
      placeholder:text-slate-400
    "
  />
</div>

);
};

export default SearchInput;