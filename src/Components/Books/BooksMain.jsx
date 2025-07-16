import { use, useContext, useEffect, useRef, useState } from 'react'
import { BookSearchContext } from '../../Context/BookSearchContext/BookSearchContextDefinition'
import { BookFilterContext } from '../../Context/BookFilterContext/BookFilterContextDefinition'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/solid'

export default function BooksMain ({
  showFilter = true,
  children,
  freeButton = true,
  controlled = false,
  externalTotalItems,
  externalIndex,
  externalMaxResult,
  onUpdateIndex,
  onUpdateMaxResult
}) {
  const [stateNum, setStateNum] = useState('1-20')
  const [numberPage, setNumberPage] = useState(false)
  const [buttonActive, setButtonActive] = useState({})
  const [sorterOrder, setSorterOrder] = useState(null)
  const {
    controlButton1,
    controlButton2,
    totalItems,
    searchParams,
    updateSearchParams
  } = useContext(BookSearchContext)
  const { books, maxResult, index } = searchParams
  const { setSortOrder, setHasPreview } = useContext(BookFilterContext)

  const controlMaxResult = controlled ? externalMaxResult : maxResult
  const controlIndex = controlled ? externalIndex : index
  const controlTotalItems = controlled ? externalTotalItems : totalItems

  const dropdownRef = useRef()

  const Filters = [
    'A-Z',
    `Nº de Páginas`,
    freeButton ? 'Grátis' : null,
    'Prévia'
  ]

  let start = controlIndex * controlMaxResult + 1
  let end = (controlIndex + 1) * controlMaxResult
  if (!controlTotalItems || start > controlTotalItems) {
    end = end - controlMaxResult + controlTotalItems
  } else if (end > controlTotalItems) {
    end = controlTotalItems
  }

  const faixaTexto = controlTotalItems === 0 ? null : `${start}-${end}`

  const hasNextPage = controlIndex + controlMaxResult < controlTotalItems
  const hasPrevPage = controlIndex > 0

  useEffect(() => {
    updateSearchParams()
  }, [controlTotalItems != 0 && !books])

  useEffect(() => {
    console.log(totalItems)
  }, [totalItems])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [index])

  useEffect(() => {
    const handler = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setNumberPage(false)
        setButtonActive(prev => ({
          ...prev,
          1: false
        }))
      }
    }

    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    setSortOrder(sorterOrder)
  }, [sorterOrder])

  useEffect(() => {
    const numCorrect = parseInt(stateNum.split('-')[1])
    updateSearchParams({ maxResult: numCorrect })
  }, [stateNum])

  useEffect(() => {
    updateSearchParams({ isFree: !!buttonActive[2] })
  }, [buttonActive[2]])

  useEffect(() => {
    if (buttonActive[3]) {
      setHasPreview(true)
      return
    }
    if (!buttonActive[3]) {
      setHasPreview(false)
    }
  }, [buttonActive[3]])

  function buttonClick (index) {
    if (index === 0) {
      setSorterOrder(prev => {
        if (prev === null) return 'A-Z'
        if (prev === 'A-Z') return 'Z-A'
        if (prev === 'Z-A') return null
      })

      if (sorterOrder === 'Z-A') {
        setButtonActive(prev => ({
          ...prev,
          [index]: false
        }))
      } else {
        setButtonActive(prev => ({
          ...prev,
          [index]: true
        }))
      }

      return
    }

    setButtonActive(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const controlPrevPage = controlIndex => {
    if (index === 0) {
      return
    }

    const checkPage = index + controlIndex

    if (checkPage < 0) {
      return updateSearchParams({ index: index - 1 })
    } else {
      return updateSearchParams({ index: index + controlIndex })
    }
  }

  const controlNextPage = controlIndex => {
    const numberPages = (index + controlIndex) * maxResult
    const checkFinalPage = totalItems - numberPages

    if (checkFinalPage > 0) {
      return updateSearchParams({ index: index + controlIndex })
    } else {
      const pageAdjust = controlIndex * maxResult + checkFinalPage
      const correctlyPage = totalItems - pageAdjust
      return updateSearchParams({ index: correctlyPage })
    }
  }

  const ControlNumberPage = () => {
    if (numberPage) {
      setNumberPage(false)
    } else {
      setNumberPage(true)
    }
  }

  const updateNum = e => {
    setNumberPage(false)

    if (!controlButton1) {
      updateSearchParams({ index: index - 1 })
    }

    switch (e) {
      case 0:
        setStateNum('1-10')
        break
      case 1:
        setStateNum('1-20')
        break
      case 2:
        setStateNum('1-30')
        break
      case 3:
        setStateNum('1-40')
        break
      default:
        break
    }

    setButtonActive(prev => ({
      ...prev,
      1: false
    }))
  }

  return (
    <div className='flex flex-col gap-5 bg-zinc-50 border-2 border-[var(--cinza-claro)] shadow-lg m-6 p-3 rounded-xl flex-1'>
      {showFilter && (
        <div className='flex justify-evenly max-md:overflow-x-auto gap-4 px-4 py-2 scrollbar-none'>
          {Filters.map((filter, index) =>
            filter != null ? (
              filter === 'Nº de Páginas' ? (
                <div ref={dropdownRef} className='relative' key={index}>
                  <button
                    className={`border-2 rounded-full px-8 py-2 bg-white cursor-pointer hover:bg-zinc-100 hover:shadow-[3px_3px_8px_rgba(128,128,128,0.5)] transition-all duration-200 ${
                      filter == 'Nº de Páginas' ? 'pr-4' : ''
                    } ${
                      buttonActive[index]
                        ? 'border-[var(--azul-vivido)]'
                        : 'border-gray-400'
                    }`}
                    onClick={() => {
                      ControlNumberPage()
                      buttonClick(index)
                    }}
                  >
                    <div className='flex whitespace-nowrap'>
                      <p className='text-medium'>Nº de Páginas</p>
                      <ChevronDownIcon
                        className={`w-6 transform transition-transform duration-300 scrollbar-none ${
                          numberPage ? 'rotate-180' : 'rotate-0'
                        }`}
                      />
                    </div>
                  </button>

                  {numberPage && (
                    <div className='absolute left-[34.5px] w-[121px] bg-white border-x border-b border-gray-500 text-center animate-dropdown rounded-b-lg z-15 max-md:hidden'>
                      {Array.from({ length: 4 }, (_, i) => (
                        <p
                          key={i}
                          className={`hover:bg-zinc-300 transition-all duration-200 cursor-pointer ${
                            i === 3
                              ? 'rounded-b-lg'
                              : 'border-b border-gray-500'
                          }`}
                          onMouseDown={() => {
                            updateNum(i)
                          }}
                        >
                          1 - {(i + 1) * 10}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  key={index}
                  className={`border-2 rounded-full px-8 py-2 bg-white cursor-pointer hover:bg-zinc-100 hover:shadow-[3px_3px_8px_rgba(128,128,128,0.5)] transition-all duration-200 scrollbar-none whitespace-nowrap ${
                    filter == 'Nº de Páginas' ? 'pr-4' : ''
                  } ${
                    buttonActive[index]
                      ? 'border-[var(--azul-vivido)]'
                      : 'border-gray-400'
                  }`}
                  onClick={() => buttonClick(index)}
                >
                  <p className='text-medium'>
                    {index === 0
                      ? sorterOrder === null
                        ? 'A-Z'
                        : sorterOrder
                      : filter}
                  </p>
                </button>
              )
            ) : null
          )}
        </div>
      )}

      {numberPage && (
        <div className='min-md:hidden fixed inset-0 z-50 w-full h-screen border border-red bg-black/30'>
          <div className='relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-400 rounded-xl shadow-lg w-40 my-auto text-center'>
            {Array.from({ length: 4 }, (_, i) => (
              <p
                key={i}
                className={`hover:bg-zinc-300 transition-all duration-200 cursor-pointer p-2 font-bold text-xl ${
                  i === 3 ? 'rounded-b-lg' : 'border-b border-gray-500'
                }`}
                onMouseDown={() => {
                  updateNum(i)
                }}
              >
                1 - {(i + 1) * 10}
              </p>
            ))}
          </div>
        </div>
      )}

      {!faixaTexto ? null : <p className='text-center'>{faixaTexto}</p>}

      <div className='flex flex-wrap justify-evenly px-10 gap-10 max-md:px-0'>
        {children}
      </div>

      <div className='flex justify-between px-5 my-5'>
        <div className='flex gap-4'>
          <button
            className='w-fit h-fit cursor-pointer hover:scale-110 transition-all duration-200'
            disabled={!hasPrevPage}
            onClick={() => {
              controlPrevPage(-2)
            }}
          >
            <ChevronDoubleLeftIcon
              className={`w-8 ${!hasPrevPage ? 'fill-zinc-300' : 'fill-black'}`}
            />
          </button>
          <button
            className='w-fit h-fit cursor-pointer hover:scale-110 transition-all duration-200'
            disabled={!hasPrevPage}
            onClick={() => {
              controlPrevPage(-1)
            }}
          >
            <ChevronLeftIcon
              className={`w-8 ${!hasPrevPage ? 'fill-zinc-300' : 'fill-black'}`}
            />
          </button>
        </div>
        <div className='flex items-center'>
          <p className=''>{index + 1}</p>
        </div>
        <div className='flex gap-4'>
          <button
            className='w-fit h-fit cursor-pointer hover:scale-110 transition-all duration-200'
            disabled={!hasNextPage || !controlButton1}
            onClick={() => {
              controlNextPage(1)
            }}
          >
            <ChevronRightIcon
              className={`w-8 ${!hasNextPage ? 'fill-zinc-300' : 'fill-black'}`}
            />
          </button>
          <button
            className='w-fit h-fit cursor-pointer hover:scale-110 transition-all duration-200'
            disabled={!hasNextPage || !controlButton2}
            onClick={() => {
              controlNextPage(2)
            }}
          >
            <ChevronDoubleRightIcon
              className={`w-8 ${
                !controlButton2 ? 'fill-zinc-300' : 'fill-black'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  )
}
