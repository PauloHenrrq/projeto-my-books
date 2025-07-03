import React, { useState } from "react";
import SerachInput from "./SearchInput";
import FilterDropdown from "./FilterDropdown";
import { APIBooks } from "../../Routes/server/api";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [queryFilterOption, setFilterQueryOption] = useState("Todos");

  const handleQueryOption = (optionText) => {
    setFilterQueryOption(optionText);
    // teste console
    console.log(optionText);
  };

  const handleQueryInput = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    //teste console
    console.log("pesquisando  " + query + " " + queryFilterOption);

    let queryFilterApi = queryFilterOption;
    let queryApi = query.trim();

    switch (queryFilterApi) {
      case "Assunto":
        queryFilterApi = "subject:";
        break;
      case "Autor":
        queryFilterApi = "inauthor:";
        break;
      case "Título":
        queryFilterApi = "intitle:";
        break;
      default:
        queryFilterApi = "";
        break;
    }
    APIBooks(queryFilterApi, queryApi);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 bg-[var(--cinza-claro)] px-4 sm:px-6 py-3 border border-gray-300 rounded-lg w-full max-w-2xl">
      <FilterDropdown value={queryFilterOption} onClick={handleQueryOption} />
      <SerachInput value={query} onChange={handleQueryInput} onSearch={handleSearch} />
    </div>
  );
};

export default SearchBar;
