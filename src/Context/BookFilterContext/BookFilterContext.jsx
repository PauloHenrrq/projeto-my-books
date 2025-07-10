import React, { useState } from 'react'

import { BookFilterContext } from './BookFilterContextDefinition'

export default function BookFilterProvider ({ children }) {
    const [sortOrder, setSortOrder] = useState(null)
    const [hasPreview, setHasPreview] = useState(false)

    const filterValue = {
      sortOrder,
      setSortOrder,
      hasPreview,
      setHasPreview
    }

  return (
    <BookFilterContext.Provider value={filterValue}>
      {children}
    </BookFilterContext.Provider>
  )
}
