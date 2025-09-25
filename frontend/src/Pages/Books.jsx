import React, { useState } from 'react'
import { BookSearchProvider } from '../Context/BookSearchContext/BookSearchContext.jsx'
import BookFilterProvider from '../Context/BookFilterContext/BookFilterContext.jsx'
import SearchBar from '../Components/SearchBar/SearchBar.jsx'
import Layout from '../Layout/Layout.jsx'
import BooksMain from '../Components/Books/BooksMain.jsx'
import BooksCard from '../Components/Books/BooksCard.jsx'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../Context/AuthContext.jsx'
import { api } from '../Routes/server/api.js'

const Books = () => {

   const [favoriteTemp, setFavoriteTemp] = useState([]);
   const token = localStorage.getItem("authToken");

   
   useEffect(() => {
     const fetchFavorite = async () => {
       if (!token) return;
       try {
         const response = await api.get("/api/favorite", {
           headers: { Authorization: `Bearer ${token}` },
         });
         
         const favoriteObj = response.data.details.favorites;;
         const favorites = favoriteObj.map((fav) => fav.googleId); 
         setFavoriteTemp(favorites);
       } catch (error) {
         console.error(error);
       }
     };

     fetchFavorite();
   }, [token]);

   
   const handleFavoriteChange = (id, isAdding) => {
     setFavoriteTemp((prev) => {
       if (isAdding) return [...prev, id];
       else return prev.filter((favId) => favId !== id);
     });
   };

  return (
    <Layout>
      <BookSearchProvider>
        <SearchBar />
        <BookFilterProvider>
          <BooksMain>
            <BooksCard/>
          </BooksMain>
        </BookFilterProvider>
      </BookSearchProvider>
    </Layout>
  );
}

export default Books
