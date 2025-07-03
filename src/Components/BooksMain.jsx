import React from 'react'

export const Filters = ['A-Z', 'Grátis', 'Nº de Páginas', 'Prévia']

export default function BooksMain ({showFilter = true}, children) {
  return (
    <div className='flex bg-[#fff] border-2 border-[var(--cinza-claro)] shadow-lg m-6 p-3 rounded-xl'>
      {showFilter && (
        <div className='flex justify-evenly w-full mx-20 cursor-pointer hover:bg-[]'>
          {Filters.map((Filters, index) => (
            <div key={index} className='border rounded-full px-8 py-2'>
              <p className='text-medium'>{Filters}</p>
            </div>
          ))}
        </div>
      )}

      <div className=''>{children}</div>
    </div>
  )
}
