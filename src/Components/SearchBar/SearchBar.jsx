import React from "react";
import SerachInput from "./SearchInput";
import FilterDropdown from "./FilterDropdown";

const SearchBar = () => {
  return (
    <div className="flex  items-center gap-4 bg-[var(--cinza-claro)] px-6 py-3 border border-gray-300 rounded-lg w-full max-w-2xl">
      <FilterDropdown />
      <SerachInput />
    </div>
  );
};

export default SearchBar;
