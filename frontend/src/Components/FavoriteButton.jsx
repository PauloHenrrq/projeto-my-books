import { React, useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/24/solid'
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline'
import { api } from '../Routes/server/api'

const FavoriteButton = ({ id, button = false, onChange }) => {
  const [isFav, setIsFav] = useState(false)
  const [checkToken, setCheckToken] = useState(false)

  const token = localStorage.getItem('authToken')

  useEffect(() => {
    if (!token) {
      setCheckToken(false)
      return
    } else {
      setCheckToken(true)
    }
  }, [])

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!checkToken) {
        return
      }
      try {
        const response = await api.get('/api/favorite')
        const favorites = response.data.details.favorites

        const favIds = favorites.map(f => String(f.googleId))
        setIsFav(favIds.includes(String(id)))
        setCheckToken(true)
      } catch (error) {}
    }

    fetchFavorites()
  }, [])

  async function toggleFavorite (e) {
    e.stopPropagation()

    try {
      if (isFav) {
        await api.delete(`/api/favorite/${id}`)
        setIsFav(false)
      } else {
        await api.post(`api/favorite/${id}`, {
          googleId: id
        })
        setIsFav(true)
      }

      if (onChange) onChange(id)
    } catch (error) {
      console.error('Erro ao atualizar favorito:', error)
    }
  }

  return (
    <span onClick={toggleFavorite}>
      {checkToken ? (
        button ? (
          !isFav ? (
            <button className='font-bold bg-blue-600 py-2.5 px-3 rounded text-white  hover:bg-blue-700 transition-all duration-200 cursor-pointer whitespace-nowrap ml-5'>
              Favoritar
            </button>
          ) : (
            <button className='font-bold bg-blue-400 py-2.5 px-3 rounded text-white  hover:bg-blue-500 transition-all duration-200 cursor-pointer whitespace-nowrap ml-5'>
              Desfavoritar
            </button>
          )
        ) : isFav ? (
          <StarIcon
            className={`absolute -right-2 -top-2.5 w-7 h-7 text-yellow-400 cursor-pointer z-20 hover:scale-[115%] transition-all ${'bounceOnce'}`}
          />
        ) : (
          <StarIconOutline
            className={`absolute -right-2 -top-2.5 w-7 h-7 text-yellow-600 stroke-2 fill-white cursor-pointer z-20 hover:scale-[115%] transition-all ${'bounceOnce'}`}
          />
        )
      ) : null}
    </span>
  )
}

export default FavoriteButton
