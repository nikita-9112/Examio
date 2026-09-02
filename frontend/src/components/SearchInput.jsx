import { Search } from "lucide-react";

const SearchInput = ({
  value,
  onChange,
  placeholder = "Search subject or code...",
}) => {
  return (
    <div
      className="
        mx-auto
        flex
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
        className="shrink-0 text-slate-400"
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          ml-3
          w-full
          bg-transparent
          text-slate-700
          outline-none
          placeholder:text-slate-400
        "
      />
    </div>
  );
};

export default SearchInput;