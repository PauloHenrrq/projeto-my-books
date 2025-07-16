// Componente filho para a geração de Card
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getFavoritesFromStorage,
  saveFavoritesToStorage,
} from "../../utils/localStorageFavorites";
import { BookSearchContext } from "../../Context/BookSearchContext/BookSearchContextDefinition";
import { BookFilterContext } from "../../Context/BookFilterContext/BookFilterContextDefinition";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import FavoriteButton from "../FavoriteButton";

export default function BooksCard({ renderBooks = false }) {
  const { sortOrder, hasPreview } = useContext(BookFilterContext);
  let { books, error, isLoading, totalItems, updateSearchParams } =
    useContext(BookSearchContext);

  const navigate = useNavigate();
  const navigateToBooksInfo = (id) => {
    navigate(`/book/${id}`);
  };

  useEffect(() => {
    if (!books && totalItems === 0) {
      updateSearchParams({ index: 0 });
    }
  }, [books, totalItems]);

  books = renderBooks ? renderBooks : books;

  const sortedBooks = Array.isArray(books)
    ? [...books].sort((a, b) => {
        const titleA = a.volumeInfo.title || "";
        const titleB = b.volumeInfo.title || "";

        if (sortOrder === "A-Z") return titleA.localeCompare(titleB);
        if (sortOrder === "Z-A") return titleB.localeCompare(titleA);
        return books;
      })
    : [];

  const filteredBooks = hasPreview
    ? sortedBooks.filter((book) =>
        ["PARTIAL", "ALL_PAGES"].includes(book.accessInfo?.viewability)
      )
    : sortedBooks;

  if (error) {
    return (
      <div className="text-red-600 border-red-600 p-2.5 rounded-[5px]">
        <h2>Erro ao buscar livros:</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <h1 className="title-h1 text-gray-800 font-semibold flex justify-center items-end mb-100">
        Procurando&nbsp;
        {Array.from({ length: 3 }).map((_, index) => (
          <span
            key={index}
            className="upDown"
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            .
          </span>
        ))}
      </h1>
    );
  }

  if (Array.isArray(books) && books.length === 0) {
    return (
      <h1 className="title-h1 mb-92 mt-5">
        Nenhum livro encontrado. Tente uma nova busca!
      </h1>
    );
  }

  return (
    <>
      {filteredBooks.map((book) => (
        <div key={book.id}>
          <div
            className="relative  w-56 h-[394px] text-center p-2  cursor-pointer border-2 border-[var(--azul-vivido)] rounded-2xl select-none transition-shadow duration-300  hover:shadow-[0_4px_8px_0_rgba(0,0,0,0.12),_0_6px_18px_0_rgba(0,0,0,0.15)]"
            onClick={() => navigateToBooksInfo(book.id)}
          >
            <FavoriteButton id={book.id} />

            <div className="flex flex-col justify-center items-center h-[92%] gap-1 ">
              {book.volumeInfo.imageLinks?.thumbnail ? (
                <div>
                  <img
                    className="w-[192px] h-[242px] rounded-xl border-2 border-gray-500 "
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt={`Capa de ${book.volumeInfo.title}`}
                  />
                </div>
              ) : (
                <div className="flex flex-col justify-center">
                  <div className="relative flex justify-center items-center left-2 w-[192px] h-[242px] rounded-xl border-2 border-gray-500">
                    <h1 className="title-h1 -rotate-32">Indisponível</h1>
                  </div>
                </div>
              )}
              <h2 className="title-h2 line-clamp-2 mx-3">
                {book.volumeInfo.title}
              </h2>
              <p className="text-small line-clamp-2 mx-3">
                Autor(es):{" "}
                {book.volumeInfo.authors
                  ? book.volumeInfo.authors.join(", ")
                  : "Desconhecido"}
              </p>
            </div>

            {book.volumeInfo.publishedDate ? (
              <p className=" text-[#888]">
                Publicado em: {book.volumeInfo.publishedDate.split("-")[0]}
              </p>
            ) : (
              <p className="mx-3 text-[#888]">Sem data de publicação</p>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
