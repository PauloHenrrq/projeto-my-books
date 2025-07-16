import React, { useEffect, useState } from 'react'
import {
  getAllIdsFromStorage
} from '../../utils/localStorageFavorites'
import { APIBooksId } from '../../Routes/server/api'
import BooksCard from './BooksCard'

const MyBooksMain = () => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBooks = async () => {
      const ids = getAllIdsFromStorage()

      const promises = ids.map(async id => {
        try {
          const book = await APIBooksId(id)
          return book
        } catch (err) {
          console.error(`Erro ao buscar livro com id ${id}:`, err)
          return null
        }
      })

      const results = await Promise.all(promises)

      const validBooks = results.filter(book => book && book.volumeInfo)

      setBooks(validBooks)
      setLoading(false)
    }

    fetchBooks()
  }, [])

  if (loading) return <p>Carregando seus livros favoritos...</p>

  if (books.length === 0) return <p>Nenhum livro encontrado nos favoritos.</p>

  return (
    <BooksCard renderBooks={books}/>
  )
}

export default MyBooksMain
