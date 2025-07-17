import React from 'react'
import Layout from '../Layout/Layout'
import BookFilterProvider from '../Context/BookFilterContext/BookFilterContext'
import { BookSearchProvider } from '../Context/BookSearchContext/BookSearchContext'
import MyBooksMain from '../Components/Books/MyBooksMain'
import BooksMain from '../Components/Books/BooksMain'

const MyBooks = () => {
  return (
    <Layout>
      <BookSearchProvider>
        <BookFilterProvider>
          <MyBooksMain />
        </BookFilterProvider>
      </BookSearchProvider>
    </Layout>
  )
}

export default MyBooks
