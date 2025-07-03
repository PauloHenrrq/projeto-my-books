import React from "react";
import { BookSearchProvider } from "../Context/BookSearchContext";
import SearchBar from "../Components/SearchBar/SearchBar"
import BooksMain from "../Components/BooksMain";

const Books = () => {
  return (
    <div>
      <BookSearchProvider>
        <SearchBar></SearchBar>
        <BooksMain></BooksMain>
      </BookSearchProvider>
    </div>
  );
};

export default Books;
