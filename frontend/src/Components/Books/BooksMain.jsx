// BooksMain.jsx
import { useContext, useEffect, useRef, useState } from 'react'
import { BookSearchContext } from '../../Context/BookSearchContext/BookSearchContextDefinition'
import { BookFilterContext } from '../../Context/BookFilterContext/BookFilterContextDefinition'
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'

export default function BooksMain ({
  showFilter = true,
  children,
  freeButton = true,
  controlled = false,
  externalTotalItems,
  externalIndex,
  externalMaxResult,
  externalControlButton1,
  externalControlButton2,
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

  const { maxResult, index } = searchParams
  const { setSortOrder, setHasPreview } = useContext(BookFilterContext)

  const dropdownRef = useRef()

  const internalControlButton2 = controlled
    ? externalControlButton2
    : controlButton2
  const controlMaxResult = controlled ? externalMaxResult : maxResult
  const controlIndex = controlled ? externalIndex : index
  const controlTotalItems = controlled ? externalTotalItems : totalItems

  const start = controlIndex * controlMaxResult + 1
  const rawEnd = (controlIndex + 1) * controlMaxResult
  const end = controlTotalItems < rawEnd ? controlTotalItems : rawEnd
  const faixaTexto =
    controlTotalItems === 0 ? null : end ? `${start}-${end}` : `${start}-0`

  const hasNextPage = rawEnd < controlTotalItems
  const hasPrevPage = controlIndex > 0

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
    if (!controlled) {
      updateSearchParams({ isFree: !!buttonActive[2] })
    }
  }, [buttonActive[2]])

  useEffect(() => {
    if (buttonActive[3]) {
      setHasPreview(true)
    } else {
      setHasPreview(false)
    }
  }, [buttonActive[3]])

  const Filters = [
    'A-Z',
    'Nº de Páginas',
    freeButton ? 'Grátis' : null,
    'Prévia'
  ]

  const buttonClick = index => {
    if (index === 0) {
      setSorterOrder(prev =>
        prev === null ? 'A-Z' : prev === 'A-Z' ? 'Z-A' : null
      )
      setButtonActive(prev => ({
        ...prev,
        [index]: sorterOrder !== 'Z-A'
      }))
    } else {
      setButtonActive(prev => ({
        ...prev,
        [index]: !prev[index]
      }))
    }
  }

  const controlPrevPage = offset => {
    const newIndex = controlIndex + offset
    if (controlled && onUpdateIndex) {
      onUpdateIndex(Math.max(0, newIndex))
    } else {
      updateSearchParams({ index: Math.max(0, newIndex) })
    }
  }

  const controlNextPage = offset => {
    const newIndex = controlIndex + offset
    const lastPageIndex = Math.ceil(controlTotalItems / controlMaxResult) - 1
    const clampedIndex = newIndex > lastPageIndex ? lastPageIndex : newIndex

    if (controlled && onUpdateIndex) {
      onUpdateIndex(clampedIndex)
    } else {
      updateSearchParams({ index: clampedIndex })
    }
  }

  const ControlNumberPage = () => {
    setNumberPage(prev => !prev)
  }

  const updateNum = e => {
    const numCorrect = (e + 1) * 10
    setStateNum(`1-${numCorrect}`)
    setNumberPage(false)
    setButtonActive(prev => ({ ...prev, 1: false }))

    if (controlled && onUpdateMaxResult) {
      onUpdateMaxResult(numCorrect)
    } else {
      updateSearchParams({ maxResult: numCorrect })
    }
  }

  return (
    <div className='flex flex-col gap-5 bg-zinc-50 border-2 border-[var(--cinza-claro)] shadow-lg m-6 p-3 rounded-xl flex-1'>
      {showFilter && (
        <div className='flex justify-evenly items-center max-md:overflow-x-auto gap-4 px-4 py-2 scrollbar-none'>
          {Filters.map((filter, index) =>
            filter != null ? (
              filter === 'Nº de Páginas' ? (
                <div ref={dropdownRef} className='relative' key={index}>
                  <button
                    className={`border-2 rounded-full px-8 py-2 bg-none cursor-pointer hover:bg-gray-200 transition-all duration-200 ${
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
                              : 'border-b border-gray-400'
                          }`}
                          onMouseDown={() => updateNum(i)}
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
                  className={`border-2 rounded-full px-8 py-2 bg-none cursor-pointer hover:bg-gray-200 transition-all duration-200 whitespace-nowrap ${
                    buttonActive[index]
                      ? 'border-[var(--azul-vivido)]'
                      : 'border-gray-400'
                  }`}
                  onClick={() => buttonClick(index)}
                >
                  <p>{index === 0 && sorterOrder ? sorterOrder : filter}</p>
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

      {faixaTexto && <p className='text-center'>{faixaTexto}</p>}

      <div className='flex flex-wrap justify-evenly px-10 gap-10 max-md:px-0'>
        {children}
      </div>

      <div className='flex justify-between px-5 my-5'>
        <div className='flex gap-4'>
          <button disabled={!hasPrevPage} onClick={() => controlPrevPage(-2)}>
            <ChevronDoubleLeftIcon
              className={`w-8 ${
                !hasPrevPage ? 'fill-zinc-300' : 'fill-black cursor-pointer'
              }`}
            />
          </button>
          <button disabled={!hasPrevPage} onClick={() => controlPrevPage(-1)}>
            <ChevronLeftIcon
              className={`w-8 ${
                !hasPrevPage ? 'fill-zinc-300' : 'fill-black cursor-pointer'
              }`}
            />
          </button>
        </div>
        <div className='flex items-center'>
          <p>{controlIndex + 1}</p>
        </div>
        <div className='flex gap-4'>
          <button disabled={!hasNextPage} onClick={() => controlNextPage(1)}>
            <ChevronRightIcon
              className={`w-8 ${
                !hasNextPage
                  ? 'fill-zinc-300 cursor-default'
                  : 'fill-black cursor-pointer'
              }`}
            />
          </button>
          <button
            disabled={!internalControlButton2}
            onClick={() => controlNextPage(2)}
          >
            <ChevronDoubleRightIcon
              className={`w-8 ${
                !internalControlButton2
                  ? 'fill-zinc-300 cursor-default'
                  : 'fill-black cursor-pointer'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  )
}
