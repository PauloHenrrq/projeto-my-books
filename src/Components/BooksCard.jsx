// Componente filho para a geração de Card
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getFavoritesFromStorage,
  saveFavoritesToStorage,
} from "../utils/localStorageFavorites";
import { BookSearchContext } from "../Context/BookSearchContextDefinition";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";

export default function BooksCard() {
  const { books, error, isLoading } = useContext(BookSearchContext);

  const navigate = useNavigate();
  const navigateToBooksInfo = (id) => {
    navigate(`/book/${id}`);
  };

  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    const saved = getFavoritesFromStorage();
    setFavorites(saved);
  }, []);

  function isFavorite(id) {
    const map = getFavoritesFromStorage();
    return Boolean(map[id]);
  }
  const toggleFavorite = (bookId) => {
    const updated = { ...favorites };

    if (updated[bookId]) {
      delete updated[bookId];
    } else {
      updated[bookId] = true;
    }

    setFavorites(updated);
    saveFavoritesToStorage(updated);
  };

  if (isLoading) {
    return <p>Carregando livros...</p>;
  }

  if (books === null) {
    return;
  }

  if (error) {
    return (
      <div className="text-red-600 border-red-600 p-2.5 rounded-[5px]">
        <h2>Erro ao buscar livros:</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (books.length === 0) {
    return <p>Nenhum livro encontrado. Tente uma nova busca!</p>;
  }

  return (
    <>
      {books.map((book) => (
        <div
          key={book.id}
          className="flex flex-col justify-between border-red-600 border w-64 p-2 text-center gap-2"
        >
          <div className="cursor-pointer" onClick={() => navigateToBooksInfo(book.id)}>
            {book.volumeInfo.imageLinks?.thumbnail && (
              <div className="flex justify-center">
                <img
                  className="w-[192px] h-[242px] rounded shadow-[0_2px_7px_0_black]"
                  src={book.volumeInfo.imageLinks.thumbnail}
                  alt={`Capa de ${book.volumeInfo.title}`}
                />
              </div>
            )}
            <h2
              className="title-h2 mb-1.5 line-clamp-2"
              style={{ margin: "0 0 5px 0", color: "#333" }}
            >
              {book.volumeInfo.title}
            </h2>
            <p style={{ margin: 0, color: "#666" }}>
              Autor(es):{" "}
              {book.volumeInfo.authors
                ? book.volumeInfo.authors.join(", ")
                : "Desconhecido"}
            </p>
          </div>

          {book.volumeInfo.publishedDate && (
            <p
              className=""
              style={{
                margin: "5px 0 0 0",
                fontSize: "0.9em",
                color: "#888",
              }}
            >
              Publicado em: {book.volumeInfo.publishedDate}
            </p>
          )}
          <div>
            <p>favoritar</p>
            <span onClick={() => toggleFavorite(book.id)}>
              {isFavorite(book.id) ? (
                <StarIcon className="w-5 h-5 text-yellow-300 cursor-pointer " />
              ) : (
                <StarIconOutline className="w-5 h-5 text-yellow-300 cursor-pointer " />
              )}
            </span>
          </div>
        </div>
      ))}
    </>
  );
}
