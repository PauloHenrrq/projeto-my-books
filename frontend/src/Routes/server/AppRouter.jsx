import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '../../Context/AuthProvider'

import Books from '../../Pages/Books'
import MyBooks from '../../Pages/MyBooks'
import Login from '../../Pages/Login'
import Register from '../../Pages/Register'
import BookID from '../../Pages/BookID'

export default function AppRouter () {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Books />} />
        <Route path='/mybooks' element={<MyBooks />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/book/:id' element={<BookID />} />
      </Routes>
    </AuthProvider>
  )
}
