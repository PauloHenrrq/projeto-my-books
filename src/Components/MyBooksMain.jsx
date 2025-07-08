import React, { useEffect, useState } from "react";
import { getAllIdsFromStorage } from "../utils/localStorageFavorites";
import { APIBooksId } from "../Routes/server/api";

const MyBooksMain = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      const ids = getAllIdsFromStorage();

      const promises = ids.map(async (id) => {
        try {
          const book = await APIBooksId(id);
          return book;
        } catch (err) {
          console.error(`Erro ao buscar livro com id ${id}:`, err);
          return null;
        }
      });

      const results = await Promise.all(promises);

      const validBooks = results.filter((book) => book && book.volumeInfo);

      setBooks(validBooks);
      setLoading(false);
    };

    fetchBooks();
  }, []);

  if (loading) return <p>Carregando seus livros favoritos...</p>;

  if (books.length === 0) return <p>Nenhum livro encontrado nos favoritos.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {books.map((book) => {
        const { id, volumeInfo } = book;
        const { title, imageLinks } = volumeInfo;

        return (
          <div key={id} className="flex flex-col border p-2">
            <h2
              className="title-h2 mb-1.5 line-clamp-2"
              style={{ margin: "0 0 5px 0", color: "#333" }}
            >
              {title}
            </h2>

            {imageLinks?.thumbnail && (
              <div className="flex justify-center">
                <img
                  className="w-[192px] h-[242px] rounded shadow-[0_2px_7px_0_black]"
                  src={imageLinks.thumbnail}
                  alt={`Capa de ${title}`}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MyBooksMain;
