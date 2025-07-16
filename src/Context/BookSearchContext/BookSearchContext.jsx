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
  const [totalItems, setTotalItems] = useState(null)
  const [books, setBooks] = useState(null)
  const [error, setError] = useState(null)
  const [controlButton1, setControlButton1] = useState(true)
  const [controlButton2, setControlButton2] = useState(true)
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

    if (isFree) {
      setIsLoading(true)
      setError(null)
      setBooks(null)

      try {
        const [data, nextPage1, nextPage2] = await Promise.all([
          APIBooks(queryFilter, query, true, maxResult, startIndex),
          APIBooks(queryFilter, query, true, maxResult, startIndex + maxResult),
          APIBooks(
            queryFilter,
            query,
            true,
            maxResult,
            startIndex + maxResult * 2
          )
        ])

        const booksCurrent = data?.items || []
        const hasMorePage1 = nextPage1?.items?.length > 0
        const hasMorePage2 = nextPage2?.items?.length > 0

        setBooks(booksCurrent)
        setTotalItems(999999)
        setControlButton1(hasMorePage1)
        setControlButton2(hasMorePage2)

        console.log('🔥 Livros encontrados (grátis):', booksCurrent)
      } catch (err) {
        setError(err.message)
        console.error('Erro no modo isFree:', err.message)
      } finally {
        setIsLoading(false)
      }

      return
    }

    console.log('index: ', index)

    setIsLoading(true)
    setError(null)
    setBooks(null)

    try {
      const [data, nextPage1, nextPage2] = await Promise.all([
        APIBooks(queryFilter, query, false, maxResult, startIndex),
        APIBooks(queryFilter, query, false, maxResult, startIndex),
        APIBooks(queryFilter, query, false, maxResult, (index + 1) * maxResult)
      ])

      if (!data || data.totalItems === 0) {
        setBooks([])
        setTotalItems(0)
        setControlButton1(false)
        setControlButton2(false)
        return
      }

      const remainingNext1 = nextPage1?.items?.length || 0
      const remainingNext2 = nextPage2?.items?.length || 0

      const totalItemsFromNextPage = nextPage1?.totalItems || 0
      let adjustedData = data

      if (totalItemsFromNextPage > 0 && totalItemsFromNextPage < 41) {
        console.log('🔥 Refazendo busca com dados finais faltantes')
        adjustedData = await APIBooks(
          queryFilter,
          query,
          false,
          totalItemsFromNextPage,
          startIndex
        )
      }

      setBooks(adjustedData.items)
      setTotalItems(totalItemsFromNextPage)
      setControlButton1(remainingNext1 > 0)
      setControlButton2(remainingNext2 > 0)

      console.log('✅ Livros encontrados:', adjustedData.items)
    } catch (err) {
      setError(err.message)
      console.error('Erro no modo normal:', err.message)
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
    totalItems,
    controlButton1,
    controlButton2,
    searchParams,
    updateSearchParams: newParams =>
      setSearchParams(prev => ({ ...prev, ...newParams }))
  }

  return (
    <BookSearchContext.Provider value={contextValue}>
      {children}
    </BookSearchContext.Provider>
  )
}
