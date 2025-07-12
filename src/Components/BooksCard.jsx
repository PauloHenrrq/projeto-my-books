// Componente filho para a geração de Card
import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  getFavoritesFromStorage,
  saveFavoritesToStorage
} from '../utils/localStorageFavorites'
import { BookSearchContext } from '../Context/BookSearchContext/BookSearchContextDefinition'
import { BookFilterContext } from '../Context/BookFilterContext/BookFilterContextDefinition'
import { StarIcon } from '@heroicons/react/24/solid'
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline'
import FavoriteButton from './FavoriteButton'

export default function BooksCard () {
  const [favorites, setFavorites] = useState({})
  const { sortOrder, hasPreview } = useContext(BookFilterContext)
  const { books, error, isLoading, totalItems, updateSearchParams } =
    useContext(BookSearchContext)
  const { index } = updateSearchParams

  const navigate = useNavigate()
  const navigateToBooksInfo = id => {
    navigate(`/book/${id}`)
  }

  useEffect(() => {
    const saved = getFavoritesFromStorage()
    setFavorites(saved)
  }, [])

  function isFavorite (id) {
    const map = getFavoritesFromStorage()
    return Boolean(map[id])
  }

  const sortedBooks = Array.isArray(books)
    ? [...books].sort((a, b) => {
        const titleA = a.volumeInfo.title || ''
        const titleB = b.volumeInfo.title || ''

        if (sortOrder === 'A-Z') return titleA.localeCompare(titleB)
        if (sortOrder === 'Z-A') return titleB.localeCompare(titleA)
        return 0
      })
    : []

  const filteredBooks = hasPreview
    ? sortedBooks.filter(book =>
        ['PARTIAL', 'ALL_PAGES'].includes(book.accessInfo?.viewability)
      )
    : sortedBooks

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

  if (error) {
    return (
      <div className='text-red-600 border-red-600 p-2.5 rounded-[5px]'>
        <h2>Erro ao buscar livros:</h2>
        <p>{error}</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <h1 className='title-h1 text-gray-800 font-semibold flex justify-center items-end mb-100'>
        Procurando&nbsp;
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

  if (Array.isArray(books) && books.length === 0) {
    return (
      <h1 className='title-h1 mb-92'>
        Não existe nenhum livro grátis dessa pesquisa!
      </h1>
    )
  }

  if (totalItems === 0 || !books) {
    if (!books) {
      updateSearchParams({ index: 0 })
    }
    return (
      <h1 className='title-h1 mb-92'>
        Nenhum livro encontrado. Tente uma nova busca!
      </h1>
    )
  }

  return (
    <>
      {filteredBooks.map(book => (
        <div key={book.id} className='group perspective'>
          <div
            className='relative flex flex-col justify-between bg-zinc-600 w-64 h-[394px] text-center p-2 rounded-l-xl transition-transform duration-500 border border-gray-400 z-10 transform-gpu group-hover:rotate-y-[12deg] cursor-pointer'
            onClick={() => navigateToBooksInfo(book.id)}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div>
              <FavoriteButton
                id={book.id}
                FavoriteIconON={
                  <StarIcon className='absolute -left-2 -top-3 w-7 h-7 text-yellow-400 cursor-pointer z-20' />
                }
                FavoriteIconOFF={
                  <StarIcon className='absolute -left-2 -top-3 w-7 h-7 text-yellow-800 cursor-pointer z-20' />
                }
              />
            </div>
            <div className='absolute top-[0.5%] h-[100%] border border-zinc-400 w-full bg-zinc-100 rounded-md z-0 shadow-inner group-hover:brightness-95 transition-all duration-300' />

            <div className='flex flex-col h-[92%] gap-1 z-10'>
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
        </div>
      ))}
    </>
  )
}
