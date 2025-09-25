import React, { useState } from 'react'
import { BookSearchProvider } from '../Context/BookSearchContext/BookSearchContext.jsx'
import BookFilterProvider from '../Context/BookFilterContext/BookFilterContext.jsx'
import SearchBar from '../Components/SearchBar/SearchBar.jsx'
import Layout from '../Layout/Layout.jsx'
import BooksMain from '../Components/Books/BooksMain.jsx'
import BooksCard from '../Components/Books/BooksCard.jsx'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../Context/AuthContext.jsx'
import { api } from '../Routes/server/api.js'

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
