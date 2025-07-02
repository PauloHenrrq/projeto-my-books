import React, { useState } from "react";
import SerachInput from "./SearchInput";
import FilterDropdown from "./FilterDropdown";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const handleQueryInput = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    //REMOVER ISSO
    console.log("pesquisando  " + query);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 bg-[var(--cinza-claro)] px-4 sm:px-6 py-3 border border-gray-300 rounded-lg w-full max-w-2xl">
      <FilterDropdown />
      <SerachInput value={query} onChange={handleQueryInput} onSearch={handleSearch} />
    </div>
  );
};

export default SearchBar;
