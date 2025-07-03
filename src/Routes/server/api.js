import React from "react";

export async function APIBooks(queryFilter, query) {
  try {
    if (query.length < 2) {
      throw new Error(`a pesquisa deve ter no mínimo 2 caracteres`);
    }
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${queryFilter}${encodeURIComponent(
        query
      )}&maxResults=20`
    );

    if (!res.ok) {
      throw new Error(`Erro HTTP! Status: ${res.status} - ${res.statusText}`);
    }

    const data = await res.json();
    //teste
    console.log("pesquisa deu certo");
    return data.items || [];
  } catch (error) {
    console.error("Ocorreu um erro ao buscar os livros:", error.message);
  }
}

// https://www.googleapis.com/books/v1/volumes?q=comedy&maxResults=20&startIndex=18 - Exemplo de pesquisa dinâmica, 1-19, 20-39...
