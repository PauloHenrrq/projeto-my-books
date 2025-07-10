import React, { useState } from 'react'

import { BookFilterContext } from './BookFilterContextDefinition'

export default function BookFilterProvider ({ children }) {
    const [sortOrder, setSortOrder] = useState(null)
    const [stateNum, setStateNum] = useState('1-20')
    const [free, setFree] = useState(false)
    const [hasPreview, setHasPreview] = useState(false)

    const filterValue = {
      sortOrder,
      stateNum,
      free,
      hasPreview
    }

  return (
    <BookFilterContext.Provider value={filterValue}>
      {children}
    </BookFilterContext.Provider>
  )
}
