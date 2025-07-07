import React from "react";

export async function APIBooks(queryFilter, query, maxResult = 10) {
  try {
    if (!query) {
      throw new Error("a pesquisa nao deve ser vazia");
    }
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${queryFilter}${encodeURIComponent(
        query
      )}&maxResults=${maxResult}`
    );

    if (!res.ok) {
      throw new Error(`Erro HTTP! Status: ${res.status} - ${res.statusText}`);
    }

    const data = await res.json();

    console.log("pesquisa deu certo"); // teste
    return data.items || [];
  } catch (error) {
    console.error("Ocorreu um erro ao buscar os livros:", error.message); // teste
    throw new Error(error.message);
  }
}
export async function APIBooksId(id) {
  try {
    const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);

    if (!res.ok) {
      throw new Error(`Erro HTTP! Status: ${res.status} - ${res.statusText}`);
    }

    const data = await res.json();

    console.log("pesquisa deu certo"); // teste
    return data || [];
  } catch (error) {
    console.error("Ocorreu um erro ao buscar os livros:", error.message); // teste
    throw new Error(error.message);
  }
}

// https://www.googleapis.com/books/v1/volumes?q=comedy&maxResults=20&startIndex=18 - Exemplo de pesquisa dinâmica, 1-19, 20-39...
