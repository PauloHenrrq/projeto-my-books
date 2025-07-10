import { useState, useEffect, useRef } from 'react'
import { BookSearchContext } from './BookSearchContextDefinition'
import { APIBooks } from '../../Routes/server/api'

export const BookSearchProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useState({
    queryFilter: '',
    query: '',
    isFree: false,
    maxResult: 20,
    index: 0
  })
  const [books, setBooks] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const isFirstRender = useRef(true)

  function updateSearchParams (newParams) {
    setSearchParams(prev => ({
      ...prev,
      ...newParams
    }))
  }

  useEffect(() => {
    updateSearchParams({ queryFilter: '', query: 'Harry%20Potter' })
  }, [])

  const performSearch = async (
    queryFilter,
    query,
    isFree,
    maxResult,
    index
  ) => {
    const startIndex = index * maxResult

    setIsLoading(true)
    setError(null)
    setBooks(null)

    try {
      const data = await APIBooks(
        queryFilter,
        query,
        isFree,
        maxResult,
        startIndex
      )
      setBooks(data)
      console.log('Pesquisa bem-sucedida, dados no contexto:', data) // teste
    } catch (err) {
      setError(err.message)
      console.error('Erro capturado no contexto:', err.message) // teste
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    const { queryFilter, query, isFree, maxResult, index } = searchParams
    if (query) {
      performSearch(queryFilter, query, isFree, maxResult, index)
    }
  }, [searchParams])

  const contextValue = {
    books,
    error,
    isLoading,
    updateSearchParams
  }

  return (
    <BookSearchContext.Provider value={contextValue}>
      {children}
    </BookSearchContext.Provider>
  )
}
