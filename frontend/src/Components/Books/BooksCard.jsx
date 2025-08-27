// Componente filho para a geração de Card
import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  getFavoritesFromStorage,
  saveFavoritesToStorage
} from '../../utils/localStorageFavorites'
import { BookSearchContext } from '../../Context/BookSearchContext/BookSearchContextDefinition'
import { BookFilterContext } from '../../Context/BookFilterContext/BookFilterContextDefinition'
import { StarIcon } from '@heroicons/react/24/solid'
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline'
import FavoriteButton from '../FavoriteButton'

export default function BooksCard ({
  renderBooks = false,
  externalBooks = null,
  changeFavorites
}) {
  const { sortOrder, hasPreview } = useContext(BookFilterContext)

  const { books, error, isLoading, totalItems, updateSearchParams } =
    useContext(BookSearchContext)

  let controlBooks = externalBooks ?? books

  const navigate = useNavigate()
  const navigateToBooksInfo = id => {
    navigate(`/book/${id}`)
  }

  useEffect(() => {
    if (!controlBooks && totalItems === 0) {
      updateSearchParams({ index: 0 })
    }
  }, [controlBooks, totalItems])

  controlBooks = renderBooks ? renderBooks : controlBooks

  const sortedBooks = Array.isArray(controlBooks)
    ? [...controlBooks].sort((a, b) => {
        const titleA = a.volumeInfo.title || ''
        const titleB = b.volumeInfo.title || ''

        if (sortOrder === 'A-Z') return titleA.localeCompare(titleB)
        if (sortOrder === 'Z-A') return titleB.localeCompare(titleA)
        return controlBooks
      })
    : []

  const filteredBooks = hasPreview
    ? sortedBooks.filter(book =>
        ['PARTIAL', 'ALL_PAGES'].includes(book.accessInfo?.viewability)
      )
    : sortedBooks

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

  if (Array.isArray(controlBooks) && controlBooks.length === 0) {
    return (
      <h1 className='title-h1 mb-92 mt-5'>
        Nenhum livro encontrado. Tente uma nova busca!
      </h1>
    )
  }

  return (
    <>
      {filteredBooks.map(book => (
        <div key={book.id}>
          <div
            className='relative flex flex-col justify-between w-64 h-[394px] text-center p-2 rounded-xl transition-all duration-500 shadow-[1px_1px_10px_-5px_black] hover:shadow-[1px_1px_10px_-4px_black] z-10 cursor-pointer hover:scale-[101%]'
            onClick={() => navigateToBooksInfo(book.id)}
          >
            <div>
              <FavoriteButton id={book.id} onChange={changeFavorites} />
            </div>

            <div className='flex flex-col justify-center items-center h-[92%] gap-1 '>
              {book.volumeInfo.imageLinks?.thumbnail ? (
                <div>
                  <img
                    className='relative w-[192px] h-[242px] rounded shadow-[0_0px_10px_-3px_black]'
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt={`Capa de ${book.volumeInfo.title}`}
                  />
                </div>
              ) : (
                <div className='flex flex-col justify-center'>
                  <div className='relative flex justify-center items-center left-2 w-[192px] h-[242px] rounded-xl border-2 border-gray-500'>
                    <h1 className='title-h1 -rotate-32'>Indisponível</h1>
                  </div>
                </div>
              )}
              <h2 className='relative title-h2 mb-1.5 line-clamp-2'>
                {book.volumeInfo.title}
              </h2>
              <p className='relative m-0 text-small line-clamp-2'>
                Autor(es):{' '}
                {book.volumeInfo.authors
                  ? book.volumeInfo.authors.join(', ')
                  : 'Desconhecido'}
              </p>
            </div>

            {book.volumeInfo.publishedDate ? (
              <p className='relative  mt-1 text-[#888]'>
                Publicado em: {book.volumeInfo.publishedDate.split('-')[0]}
              </p>
            ) : (
              <p className='relative mt-1 text-[#888]'>
                Sem data de publicação
              </p>
            )}
          </div>
        </div>
      ))}
    </>
  )
}
