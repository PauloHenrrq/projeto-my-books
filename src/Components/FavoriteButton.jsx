import { React, useState } from 'react'
import {
  getFavoritesFromStorage,
  saveFavoritesToStorage
} from '../utils/localStorageFavorites'
import { StarIcon } from '@heroicons/react/24/solid'
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline'

const FavoriteButton = ({ id, button = false }) => {
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
      {button ? (
        !isFav ? (
          <button className='font-bold bg-blue-600 py-2.5 px-3 rounded text-white shadow-[2px_2px_5px_gray] hover:bg-blue-700 transition-all duration-200 cursor-pointer whitespace-nowrap'>
            Favoritar
          </button>
        ) : (
          <button className='font-bold bg-blue-400 py-2.5 px-3 rounded text-white shadow-[2px_2px_5px_gray] hover:bg-blue-500 transition-all duration-200 cursor-pointer whitespace-nowrap'>
            Desfavoritar
          </button>
        )
      ) : isFav ? (
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
