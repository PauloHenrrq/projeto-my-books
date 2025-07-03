import React, { useContext } from "react";
import { BookSearchContext } from "../Context/BookSearchContextDefinition";

export default function BooksMain() {
  // const Filters = ["A-Z", "Grátis", "Nº de Páginas", "Prévia"];

  const { books, error, isLoading } = useContext(BookSearchContext);

  if (isLoading) {
    return <p>Carregando livros...</p>;
  }

  if (error) {
    return (
      <div
        style={{
          color: "red",
          border: "1px solid red",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <h2>Erro ao buscar livros:</h2>
        <p>{error}</p>
      </div>
    );
  }
  if (books === null) {
    return;
  }

  if (books.length === 0) {
    return <p>Nenhum livro encontrado. Tente uma nova busca!</p>;
  }

  // return (
  //   <div className="flex bg-[#fff] border-2 border-[var(--cinza-claro)] shadow-lg m-6 p-3 rounded-xl">
  //     {showFilter && (
  //       <div className="flex justify-evenly w-full mx-20 cursor-pointer hover:bg-[]">
  //         {Filters.map((Filters, index) => (
  //           <div key={index} className="border rounded-full px-8 py-2">
  //             <p className="text-medium">{Filters}</p>
  //           </div>
  //         ))}
  //       </div>
  //     )}

  //     <div className="">{children}</div>
  //   </div>
  // );

  return (
    <div className="books-list">
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {books.map((book) => (
          <li
            key={book.id}
            style={{
              borderBottom: "1px solid #eee",
              padding: "10px 0",
              marginBottom: "10px",
            }}
          >
            <h3 style={{ margin: "0 0 5px 0", color: "#333" }}>
              {book.volumeInfo.title}
            </h3>
            <p style={{ margin: 0, color: "#666" }}>
              Autor(es):{" "}
              {book.volumeInfo.authors
                ? book.volumeInfo.authors.join(", ")
                : "Desconhecido"}
            </p>
            {book.volumeInfo.publishedDate && (
              <p style={{ margin: "5px 0 0 0", fontSize: "0.9em", color: "#888" }}>
                Publicado em: {book.volumeInfo.publishedDate}
              </p>
            )}
            {book.volumeInfo.imageLinks?.thumbnail && (
              <img
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={`Capa de ${book.volumeInfo.title}`}
                style={{ marginTop: "10px", maxWidth: "100px" }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
