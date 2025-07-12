import { React, useState } from 'react'
import {
  getFavoritesFromStorage,
  saveFavoritesToStorage
} from '../utils/localStorageFavorites'
import { StarIcon } from '@heroicons/react/24/solid'
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline'

const FavoriteButton = ({ id, FavoriteIconON, FavoriteIconOFF }) => {
  const [isFav, setIsFav] = useState(() => {
    const storage = getFavoritesFromStorage()
    return Boolean(storage[id])
  })

  function toggleFavorite (e) {
    e.stopPropagation()

    const storage = getFavoritesFromStorage()

    if (storage[id]) {
      delete storage[id]
      setIsFav(false)
    } else {
      storage[id] = true
      setIsFav(true)
    }

    saveFavoritesToStorage(storage)
  }

  return (
    <span onClick={toggleFavorite}>
      {isFav ? (
        <StarIcon
          className={`absolute -right-5 -top-3 w-7 h-7 text-yellow-400 cursor-pointer z-20 hover:scale-[115%] transition-all ${'bounceOnce'}`}
        />
      ) : (
        <StarIconOutline
          className={`absolute -right-5 -top-3 w-7 h-7 text-yellow-600 fill-zinc-200 stroke-2 cursor-pointer z-20 hover:scale-[115%] transition-all ${'bounceOnce'}`}
        />
      )}
    </span>
  )
}

export default FavoriteButton
