import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Books from "../../Pages/Books";
import MyBooks from "../../Pages/MyBooks";
import Login from "../../Pages/Login";
import BookInfo from "../../Components/BookInfo";
import Register from "../../Pages/Register";
export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/mybooks" element={<MyBooks />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/book/:id" element={<BookInfo />} />
      </Routes>
    </Router>
  );
}
