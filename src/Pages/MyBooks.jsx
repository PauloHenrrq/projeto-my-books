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
          <BooksMain freeButton={false} >
            <MyBooksMain />
          </BooksMain>
        </BookFilterProvider>
      </BookSearchProvider>
    </Layout>
  )
}

export default MyBooks
