import React, { useEffect, useState } from 'react'
import { api, APIBooksId } from '../../Routes/server/api'
import BooksCard from './BooksCard'
import BooksMain from './BooksMain'
import { Link } from 'react-router-dom'

const MyBooksMain = () => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [index, setIndex] = useState(0)
  const [maxResult, setMaxResult] = useState(20)
  const [totalItems, setTotalItems] = useState(0)
  const [error, setError] = useState(false)
  const [reload, setReload] = useState(false)
  const token = localStorage.getItem('authToken')

  if (!token) {
    return (
      <main className='flex-grow flex flex-col justify-center items-center'>
        <h1 className='title-h1 text-gray-800 font-semibold text-center mb-5'>
          Realize o Login para ver seus livros favoritos
        </h1>
        <Link
          to='/login'
          className='text-lg font-bold bg-blue-600 py-2 px-5 rounded-xl text-white hover:bg-blue-700 transition-all duration-200 cursor-pointer'
        >
          Login
        </Link>
      </main>
    )
  }

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get('/api/favorite')
        const favorites = response.data.details.favorites

        const promises = favorites.map(async fav => {
          try {
            const book = await APIBooksId(fav.googleId)
            return book
          } catch (error) {
            console.error(`Erro ao buscar livros favoritos`, error)
            return null
          }
        })

        const results = await Promise.all(promises)

        const validBooks = results.filter(book => book && book.volumeInfo)

        setBooks(validBooks)
        setTotalItems(validBooks.length)
      } catch (error) {
        return
      } finally {
        setLoading(false)
        setReload(false)
      }
    }

    fetchBooks()
  }, [reload])

  const applyFavoritesFilter = bookId => {
    const newBooks = books.filter(book => book.id != bookId)
    setBooks(newBooks)
  }

  const paginatedBooks = books.slice(index * maxResult, (index + 1) * maxResult)

  if (error) {
    return (
      <div className=''>
        <h1 className='title-h1 text-red-600 font-semibold flex justify-center items-end mt-20 mb-100'>
          Não foi possível carregar os Livros
        </h1>
        <button
          className='w-fit mx-auto text-lg font-bold bg-blue-600 py-2 px-5 rounded-xl text-white hover:bg-blue-700 transition-all duration-200 cursor-pointer'
          onClick={setReload(true)}
        >
          Recarregar
        </button>
      </div>
    )
  }

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
      <div className='flex flex-col gap-10 text-center m-auto flex-1'>
        <h1 className='title-h1 mt-10'>Você não possui livros favoritados.</h1>
        <Link
          to='/'
          className='w-fit mx-auto text-lg font-bold bg-blue-600 py-2 px-5 rounded-xl text-white hover:bg-blue-700 transition-all duration-200 cursor-pointer'
        >
          Voltar
        </Link>
      </div>
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
      <BooksCard
        externalBooks={paginatedBooks}
        changeFavorites={applyFavoritesFilter}
      />
    </BooksMain>
  )
}

export default MyBooksMain
