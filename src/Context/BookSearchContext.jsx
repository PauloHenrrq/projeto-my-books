import React, { useState, useCallback } from "react";
import { BookSearchContext } from "./BookSearchContextDefinition";
import { APIBooks } from "../Routes/server/api";

export const BookSearchProvider = ({ children }) => {
  const [books, setBooks] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const performSearch = useCallback(async (queryFilter, query) => {
    setIsLoading(true);
    setError(null);
    setBooks(null);

    try {
      const data = await APIBooks(queryFilter, query);
      setBooks(data);
      console.log("Pesquisa bem-sucedida, dados no contexto:", data); // teste
    } catch (erro) {
      setError(erro.message); 
      console.error("Erro capturado no contexto:", erro.message); // teste
    } finally {
      setIsLoading(false);
    }
  }, []);

  const contextValue = {
    books,
    error,
    isLoading,
    performSearch,
  };

  return (
    <BookSearchContext.Provider value={contextValue}>
      {children}
    </BookSearchContext.Provider>
  );
};
