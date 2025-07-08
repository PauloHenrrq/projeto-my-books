import React, { useState, useCallback, useEffect } from 'react'
import { BookSearchContext } from './BookSearchContextDefinition'
import { APIBooks } from '../Routes/server/api'

export const BookSearchProvider = ({ children }) => {
  const [books, setBooks] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const initialBooks = async () => {
      try {
        const data = await APIBooks('', 'Harry%20Potter')
        setBooks(data)
      } catch (error) {
        console.log(`Houve um erro ao retornar livros inicialmente: ${error}`)
      }
    }

    initialBooks()
  }, [])

  const performSearch = useCallback(async (queryFilter, query) => {
    setIsLoading(true)
    setError(null)
    setBooks(null)

    try {
      const data = await APIBooks(queryFilter, query)
      setBooks(data)
      console.log('Pesquisa bem-sucedida, dados no contexto:', data) // teste
    } catch (err) {
      setError(err.message)
      console.error('Erro capturado no contexto:', err.message) // teste
    } finally {
      setIsLoading(false)
    }
  }, [])

  const contextValue = {
    books,
    error,
    isLoading,
    performSearch
  }

  return (
    <BookSearchContext.Provider value={contextValue}>
      {children}
    </BookSearchContext.Provider>
  )
}
