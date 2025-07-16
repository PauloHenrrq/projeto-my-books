import React from "react";
import { BookSearchProvider } from "../Context/BookSearchContext";
import SearchBar from "../Components/SearchBar/SearchBar";
import BooksMain from "../Components/BooksMain";
import BooksCard from "../Components/BooksCard";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";

const Books = () => {
  return (
    <div>
      <Header></Header>
      <BookSearchProvider>
        <SearchBar />
        {/* <BooksMain>
          <BooksCard />
        </BooksMain> */}
      </BookSearchProvider>
      <Footer></Footer>
    </div>
  );
};

export default Books;
