import React, { useContext, useState } from "react";
import SerachInput from "./SearchInput";
import FilterDropdown from "./FilterDropdown";
import { BookSearchContext } from "../../Context/BookSearchContextDefinition";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [queryFilterOption, setFilterQueryOption] = useState("Todos");
  const { performSearch } = useContext(BookSearchContext);

  const handleQueryOption = (optionText) => {
    setFilterQueryOption(optionText);
  };

  const handleQueryInput = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
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
    if (queryApi.length > 0) {
      console.log("pesquisando  " + queryApi + " filterOption:" + queryFilterApi); // teste
      performSearch(queryFilterApi, queryApi);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center w-full max-w-64 gap-2 md:max-w-2xl px-6 py-3 mx-auto my-4  border border-gray-300 rounded-xl bg-[var(--cinza-claro)]  ">
      <FilterDropdown value={queryFilterOption} onClick={handleQueryOption} />
      <SerachInput value={query} onChange={handleQueryInput} onSearch={handleSearch} />
    </div>
  );
};

export default SearchBar;
