import { useEffect, useState } from 'react'
import { BookSearchContext } from '../Context/BookSearchContextDefinition'
import { ChevronDownIcon } from '@heroicons/react/16/solid'

export default function BooksMain ({ showFilter = true, children }) {
  const [stateNum, setStateNum] = useState('1-10')
  const [numberPage, setNumberPage] = useState(false)
  const [buttonActive, setButtonActive] = useState({})

  

  const Filters = ['A-Z', `Nº de Páginas`, 'Grátis', 'Prévia']

  function buttonClick (index) {
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
  }

  return (
    <div className='flex flex-col gap-5 bg-zinc-50 border-2 border-[var(--cinza-claro)] shadow-lg m-6 p-3 rounded-xl'>
      {showFilter && (
        <div className='flex justify-evenly mx-10'>
          {Filters.map((filter, index) => (
            <button
              key={index}
              className={`border-2 rounded-full px-8 py-2 bg-white cursor-pointer hover:bg-zinc-100 transition-all duration-200 ${
                filter == 'Nº de Páginas' ? 'pr-4' : ''
              } ${
                buttonActive[index]
                  ? 'border-[var(--azul-vivido)]'
                  : 'border-gray-400'
              }`}
              onClick={() => {
                index === 1 ? ControlNumberPage() : null
                buttonClick(index)
              }}
            >
              {filter === 'Nº de Páginas' ? (
                <>
                  <div className='flex'>
                    <p className='text-medium'>Nº de Páginas</p>
                    <ChevronDownIcon
                      className={`w-6 transform transition-transform duration-300 ${
                        numberPage ? 'rotate-0' : 'rotate-180'
                      }`}
                    />
                  </div>

                  {numberPage && (
                    <div className='absolute top-[154px] w-[121px] bg-white border-x border-b border-gray-500 text-center animate-dropdown rounded-b-lg z-50'>
                      {Array.from({ length: 4 }, (_, i) => (
                        <p
                          key={i}
                          className={`hover:bg-zinc-300 transition-all duration-200 ${
                            i === 3
                              ? 'rounded-b-lg'
                              : 'border-b border-gray-500'
                          }`}
                          onClick={() => updateNum(i)}
                        >
                          1 - {(i + 1) * 10}
                        </p>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <p className='text-medium'>{filter}</p>
              )}
            </button>
          ))}
        </div>
      )}
      <p className='text-center'>{stateNum}</p>

      <div className='flex flex-wrap justify-evenly px-10 gap-10'>
        {children}
      </div>
    </div>
  )
}
