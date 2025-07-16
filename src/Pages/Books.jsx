import React from 'react'
import { BookSearchProvider } from '../Context/BookSearchContext/BookSearchContext.jsx'
import BookFilterProvider from '../Context/BookFilterContext/BookFilterContext.jsx'
import SearchBar from '../Components/SearchBar/SearchBar'
import Layout from '../Layout/Layout.jsx'
import BooksMain from '../Components/Books/BooksMain.jsx'
import BooksCard from '../Components/Books/BooksCard.jsx'

const Books = () => {
  return (
    <Layout>
      <BookSearchProvider>
        <SearchBar />
        <BookFilterProvider>
          <BooksMain>
            <BooksCard />
          </BooksMain>
        </BookFilterProvider>
      </BookSearchProvider>
    </Layout>
  )
}

export default Books
