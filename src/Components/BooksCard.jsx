// Componente filho para a geração de Card
import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  getFavoritesFromStorage,
  saveFavoritesToStorage
} from '../utils/localStorageFavorites'
import { BookSearchContext } from '../Context/BookSearchContextDefinition'
import { StarIcon } from '@heroicons/react/24/solid'
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline'

export default function BooksCard () {
  const { books, error, isLoading } = useContext(BookSearchContext)

  const navigate = useNavigate()
  const navigateToBooksInfo = id => {
    navigate(`/book/${id}`)
  }

  const [favorites, setFavorites] = useState({})

  useEffect(() => {
    const saved = getFavoritesFromStorage()
    setFavorites(saved)
  }, [])

  function isFavorite (id) {
    const map = getFavoritesFromStorage()
    return Boolean(map[id])
  }
  const toggleFavorite = bookId => {
    const updated = { ...favorites }

    if (updated[bookId]) {
      delete updated[bookId]
    } else {
      updated[bookId] = true
    }

    setFavorites(updated)
    saveFavoritesToStorage(updated)
  }

  if (isLoading) {
    return <p>Carregando livros...</p>
  }

  if (books === null) {
    return
  }

  if (error) {
    return (
      <div className='text-red-600 border-red-600 p-2.5 rounded-[5px]'>
        <h2>Erro ao buscar livros:</h2>
        <p>{error}</p>
      </div>
    )
  }

  if (books.length === 0) {
    return <p>Nenhum livro encontrado. Tente uma nova busca!</p>
  }

  return (
    <>
      {books.map(book => (
        <div key={book.id} className='group perspective'>
          <div
            className='relative flex flex-col justify-between bg-zinc-600 w-64 h-full text-center p-2 rounded-l-xl transition-transform duration-500 border border-gray-400 z-10 transform-gpu group-hover:rotate-y-[12deg] cursor-pointer'
            onClick={() => navigateToBooksInfo(book.id)}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className='absolute top-[0.5%] h-[100%] border border-zinc-400 w-full bg-zinc-100 rounded-md z-0 shadow-inner group-hover:brightness-95 transition-all duration-300' />

            <div className='flex flex-col gap-1 relative z-10'>
              {book.volumeInfo.imageLinks?.thumbnail ? (
                <div className='flex justify-center'>
                  <img
                    className='relative left-2 w-[192px] h-[242px] rounded shadow-[0_2px_7px_0_black]'
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt={`Capa de ${book.volumeInfo.title}`}
                  />
                </div>
              ) : (
                <div className='flex justify-center'>
                  <div className='relative flex justify-center items-center  left-2 w-[192px] h-[242px] rounded shadow-[0_2px_7px_0_black]'>
                    <h1 className='title-h1 -rotate-32'>Indisponível</h1>
                  </div>
                </div>
              )}
              <h2 className='relative left-2 title-h2 mb-1.5 line-clamp-2'>
                {book.volumeInfo.title}
              </h2>
              <p className='relative left-2 m-0 text-small line-clamp-2'>
                Autor(es):{' '}
                {book.volumeInfo.authors
                  ? book.volumeInfo.authors.join(', ')
                  : 'Desconhecido'}
              </p>
            </div>

            {book.volumeInfo.publishedDate ? (
              <p className='relative left-2 mt-1 text-[#888]'>
                Publicado em: {book.volumeInfo.publishedDate}
              </p>
            ) : (
              <p className='relative left-2 mt-1 text-[#888]'>
                Sem data de publicação
              </p>
            )}
          </div>
          <div>
            <p>favoritar</p>
            <span onClick={() => toggleFavorite(book.id)}>
              {isFavorite(book.id) ? (
                <StarIcon className='w-5 h-5 text-yellow-300 cursor-pointer ' />
              ) : (
                <StarIconOutline className='w-5 h-5 text-yellow-300 cursor-pointer ' />
              )}
            </span>
          </div>
        </div>
      ))}
    </>
  )
}
