import { useContext, useEffect, useRef, useState } from 'react'
import { BookSearchContext } from '../Context/BookSearchContext/BookSearchContextDefinition'
import { BookFilterContext } from '../Context/BookFilterContext/BookFilterContextDefinition'
import { ChevronDownIcon } from '@heroicons/react/16/solid'

export default function BooksMain ({ showFilter = true, children }) {
  const [stateNum, setStateNum] = useState('1-20')
  const [numberPage, setNumberPage] = useState(false)
  const [buttonActive, setButtonActive] = useState({})
  const [sorterOrder, setSorterOrder] = useState(null)
  const { updateSearchParams } = useContext(BookSearchContext)
  const { setSortOrder, setHasPreview } = useContext(BookFilterContext)

  const dropdownRef = useRef()

  const Filters = ['A-Z', `Nº de Páginas`, 'Grátis', 'Prévia']

  useEffect(() => {
    console.log(buttonActive)
  }, [buttonActive])

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

  const ControlNumberPage = () => {
    if (numberPage) {
      setNumberPage(false)
    } else {
      setNumberPage(true)
    }
  }

  const updateNum = e => {
    setNumberPage(false)

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
        <div className='flex justify-evenly mx-10'>
          {Filters.map((filter, index) =>
            filter === 'Nº de Páginas' ? (
              <div ref={dropdownRef} className='relative' key={index}>
                <button
                  className={`border-2 rounded-full px-8 py-2 bg-white cursor-pointer hover:bg-zinc-100 transition-all duration-200 ${
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
                  <div className='flex'>
                    <p className='text-medium'>Nº de Páginas</p>
                    <ChevronDownIcon
                      className={`w-6 transform transition-transform duration-300 ${
                        numberPage ? 'rotate-0' : 'rotate-180'
                      }`}
                    />
                  </div>
                </button>

                {numberPage && (
                  <div className='absolute left-[34.5px] w-[121px] bg-white border-x border-b border-gray-500 text-center animate-dropdown rounded-b-lg z-15'>
                    {Array.from({ length: 4 }, (_, i) => (
                      <p
                        key={i}
                        className={`hover:bg-zinc-300 transition-all duration-200 cursor-pointer ${
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
                )}
              </div>
            ) : (
              <button
                key={index}
                className={`border-2 rounded-full px-8 py-2 bg-white cursor-pointer hover:bg-zinc-100 transition-all duration-200 ${
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
          )}
        </div>
      )}
      <p className='text-center'>{stateNum}</p>

      <div className='flex flex-wrap justify-evenly px-10 gap-10'>
        {children}
      </div>

      <div>
        <p>a</p>
      </div>
    </div>
  )
}
