import React from 'react'
import { BookSearchProvider } from '../Context/BookSearchContext/BookSearchContext.jsx'
import BookFilterProvider from '../Context/BookFilterContext/BookFilterContext.jsx'
import SearchBar from '../Components/SearchBar/SearchBar'
import BooksMain from '../Components/BooksMain'
import BooksCard from '../Components/BooksCard'

const Books = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <BookSearchProvider>
        <SearchBar />
        <BookFilterProvider>
          <BooksMain>
            <BooksCard />
          </BooksMain>
        </BookFilterProvider>
      </BookSearchProvider>
    </div>
  )
}

export default Books
