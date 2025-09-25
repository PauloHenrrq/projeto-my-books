import { React, useContext, useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/24/solid'
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline'
import { AuthContext } from '../Context/AuthContext'
import { api } from '../Routes/server/api'

const FavoriteButton = ({ id, button = false, onChange, changeLocalFav }) => {
  const [isFav, setIsFav] = useState(false)
  const { user, isLogged, favoriteLocal, setFavoriteLocal } =
    useContext(AuthContext)

  useEffect(() => {
    if (user) {
      const fetchFavorites = async () => {
        try {
          const favIds = favoriteLocal.map(f => String(f.googleId))
          setIsFav(favIds.includes(String(id)))
        } catch (error) {
          console.error(error)
        }
      }
      fetchFavorites()
    }
  }, [id, user, favoriteLocal])

  async function toggleFavorite (e) {
    e.stopPropagation()
    setIsFav(favorites.includes(id))
  }

  const handleFavoriteChange = (id, isAdding) => {
    setFavoriteLocal(prev => {
      if (isAdding) return [...prev, id]
      else return prev.filter(favId => favId !== id)
    })
  }

  async function toggleFavorite (e) {
    e.stopPropagation()

    try {
      if (isFav) {
        await api.delete(`/api/favorite/${id}`)
        handleFavoriteChange(id, false)
      } else {
        await api.post(`/api/favorite/${id}`, { googleId: id })
        handleFavoriteChange(id, true)
      }
    } catch (error) {
      console.error('Erro ao atualizar favorito:', error)
    }
  }

  return (
    <span onClick={toggleFavorite}>
      {isLogged ? (
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
