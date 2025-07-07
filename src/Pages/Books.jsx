import React from 'react'
import { BookSearchProvider } from '../Context/BookSearchContext'
import SearchBar from '../Components/SearchBar/SearchBar'
import BooksMain from '../Components/BooksMain'
import BooksCard from '../Components/BooksCard'

const Books = () => {
  return (
    <div>
      <BookSearchProvider>
        <SearchBar />
        <BooksMain>
          <BooksCard />
        </BooksMain>
      </BookSearchProvider>
    </div>
  )
}

export default Books
