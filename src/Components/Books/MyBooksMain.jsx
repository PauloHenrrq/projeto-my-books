import React, { useEffect, useState } from 'react'
import { getAllIdsFromStorage } from '../../utils/localStorageFavorites'
import { APIBooksId } from '../../Routes/server/api'
import BooksCard from './BooksCard'
import BooksMain from './BooksMain'

const MyBooksMain = () => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [index, setIndex] = useState(0)
  const [maxResult, setMaxResult] = useState(20)
  const [totalItems, setTotalItems] = useState(0)

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
      setTotalItems(validBooks.length)
      setLoading(false)
    }

    fetchBooks()
  }, [])

  const paginatedBooks = books.slice(index * maxResult, (index + 1) * maxResult)

  if (loading) {
    return (
      <h1 className='title-h1 text-gray-800 font-semibold flex justify-center items-end mt-20 mb-100'>
        Carregando seus favoritos&nbsp;
        {Array.from({ length: 3 }).map((_, index) => (
          <span
            key={index}
            className='upDown'
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            .
          </span>
        ))}
      </h1>
    )
  }

  if (books.length === 0) {
    return (
      <h1 className='title-h1 mb-92 mt-5'>
        Nenhum livro encontrado nos favoritos.
      </h1>
    )
  }

  return (
    <BooksMain
      freeButton={false}
      controlled={true}
      externalTotalItems={totalItems}
      externalMaxResult={maxResult}
      externalIndex={index}
      externalControlButton1={index > 0}
      externalControlButton2={(index + 2) * maxResult < totalItems}
      onUpdateIndex={setIndex}
      onUpdateMaxResult={setMaxResult}
    >
      <BooksCard externalBooks={paginatedBooks} />
    </BooksMain>
  )
}

export default MyBooksMain
