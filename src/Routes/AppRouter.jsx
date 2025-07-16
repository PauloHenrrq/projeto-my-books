import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Books from '../Pages/Books'
import MyBooks from '../Pages/MyBooks'
import Login from '../Pages/Login'
import BookID from '../Pages/BookID'

export default function AppRouter () {
  return (
    <>
      <Routes>
        <Route path='/' element={<Books />} />
        <Route path='/mybooks' element={<MyBooks />} />
        <Route path='/login' element={<Login />} />
        <Route path='/book/:id' element={<BookID />} />
      </Routes>
    </>
  )
}
