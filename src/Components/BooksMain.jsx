import { useEffect, useState } from 'react'
import { BookSearchContext } from '../Context/BookSearchContextDefinition'
import { ChevronDownIcon } from '@heroicons/react/16/solid'

export default function BooksMain ({ showFilter = true, children }) {
  const [numActive, setNumActive] = useState(false)
  const [stateNum, setStateNum] = useState(1)

  const Filters = ['A-Z', `Nº de Páginas`, 'Grátis', 'Prévia']

  useEffect(() => {
    console.log(stateNum)
  }, [stateNum])

  const numControl = () => {
    if (numActive) {
      setNumActive(false)
    } else {
      setNumActive(true)
    }
  }

  const updateNum = e => {
    switch (e) {
      case 0:
        setStateNum('1-10')
        break;
      case 1:
        setStateNum('1-20')
        break;
      case 2:
        setStateNum('1-30')
        break;
      case 3:
        setStateNum('1-40')
        break;
      default:
        break
    }
  }

  return (
    <div className='flex flex-col gap-5 bg-zinc-50 border-2 border-[var(--cinza-claro)] shadow-lg m-6 p-3 rounded-xl'>
      {showFilter && (
        <div className='flex justify-evenly mx-10'>
          {Filters.map((filter, index) => (
            <div
              key={index}
              className={`border rounded-full px-8 py-2 bg-white cursor-pointer ${
                filter == 'Nº de Páginas' ? 'pr-4' : ''
              }`}
              onClick={numControl}
            >
              {filter === 'Nº de Páginas' ? (
                <>
                  <div className='flex'>
                    <p className='text-medium'>Nº de Páginas</p>
                    <ChevronDownIcon
                      className={`w-6 transform transition-transform duration-300 ${
                        !numActive ? 'rotate-0' : 'rotate-180'
                      }`}
                    />
                  </div>

                  {numActive && (
                    <div className='absolute top-38 w-[121px] bg-white border-x text-center'>
                      {Array.from({ length: 4 }, (_, i) => (
                        <p
                          key={i}
                          className='border-b'
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
            </div>
          ))}
        </div>
      )}
      <p className='text-center'>{stateNum}</p>

      <div className='flex flex-wrap justify-between px-10 gap-10'>
        {children}
      </div>
    </div>
  )
}
