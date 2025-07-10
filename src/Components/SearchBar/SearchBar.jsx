import React, { useContext, useState } from 'react'
import SerachInput from './SearchInput'
import FilterDropdown from './FilterDropdown'
import { BookSearchContext } from '../../Context/BookSearchContext/BookSearchContextDefinition'

const SearchBar = () => {
  const [query, setQuery] = useState('')
  const [queryFilterOption, setFilterQueryOption] = useState('Todos')
  const { updateSearchParams } = useContext(BookSearchContext)

  const handleQueryOption = optionText => {
    setFilterQueryOption(optionText)

    console.log(optionText) 
  }

  const handleQueryInput = e => {
    setQuery(e.target.value)
  }

  const handleSearch = () => {
    let queryFilterApi = queryFilterOption
    let queryApi = query.trim()

    switch (queryFilterApi) {
      case 'Assunto':
        queryFilterApi = 'subject:'
        break
      case 'Autor':
        queryFilterApi = 'inauthor:'
        break
      case 'Título':
        queryFilterApi = 'intitle:'
        break
      default:
        queryFilterApi = ''
        break
    }
    if (queryApi.length > 0) {
      console.log(
        'pesquisando  ' + queryApi + ' filterOption:' + queryFilterApi
      ) // teste
      updateSearchParams({ queryFilter: queryFilterApi, query: queryApi })
    }
  }

  return (
    <div className='flex m-auto mt-5 sm:flex-row items-center gap-2 sm:gap-4 bg-[var(--cinza-claro)] px-4 sm:px-6 py-3 border border-gray-300 rounded-2xl w-full max-w-2xl'>
      <FilterDropdown value={queryFilterOption} onClick={handleQueryOption} />
      <SerachInput
        value={query}
        onChange={handleQueryInput}
        onSearch={handleSearch}
      />
    </div>
  )
}

export default SearchBar
