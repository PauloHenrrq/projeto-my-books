import { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import { api } from '../Routes/server/api'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false)
  const [favoriteLocal, setFavoriteLocal] = useState([])
  const [favoriteLoading, setFavoriteLoading] = useState(true)

  useEffect(() => {
    const user = localStorage.getItem('authToken')
    if (user) {
      setUser(true)
    }
  }, [user])

  useEffect(() => {
    if (user) {
      const fetchFavoriteLocal = async () => {
        const response = await api.get('/api/favorite')
        const favoriteObj = response.data.details.favorites;
        const favorites = favoriteObj.map((fav) => fav.googleId);
        setFavoriteLocal(favorites);
        setFavoriteLoading(false)
      }

      fetchFavoriteLocal()
    }
  }, [user])

  const logout = () => {
    localStorage.removeItem('authToken')
    setUser(false)
  }

  const isLogged = Boolean(user)

  return (
    <AuthContext.Provider
      value={{
        favoriteLocal,
        setFavoriteLocal,
        favoriteLoading,
        user,
        setUser,
        isLogged,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
