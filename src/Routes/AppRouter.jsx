import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Books from '../Pages/Books'
import MyBooks from '../Pages/MyBooks'
import Login from '../Pages/Login'
import BookInfo from '../Components/BookInfo'
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'
export default function AppRouter () {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Books />} />
        <Route path='/mybooks' element={<MyBooks />} />
        <Route path='/login' element={<Login />} />
        <Route path='/book/:id' element={<BookInfo />} />
      </Routes>
      <Footer />
    </>
  )
}
