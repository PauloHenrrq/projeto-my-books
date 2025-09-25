import React from "react";
import axios from "axios";
import { getNavigate } from "../../../navigation";

export const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("authToken");
      getNavigate()("/login");
    }

    return Promise.reject(error);
  }
);

export async function APIBooks(
  queryFilter,
  query,
  filter = false,
  maxResult = 20,
  index = 0
) {
  const isFree = filter ? "&filter=free-ebooks" : "";

  try {
    if (!query) {
      throw new Error("a pesquisa nao deve ser vazia");
    }
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${queryFilter}${encodeURIComponent(
        query
      )}${isFree}&maxResults=${maxResult}&startIndex=${index}`
    );

    if (!res.ok) {
      throw new Error(`Erro HTTP! Status: ${res.status} - ${res.statusText}`);
    }

    const data = await res.json();

    return data;
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

    return data || [];
  } catch (error) {
    console.error("Ocorreu um erro ao buscar os livros:", error.message); // teste
    throw new Error(error.message);
  }
}

// https://www.googleapis.com/books/v1/volumes?q=intitle:comedy&filter=free-ebooks&maxResults=20&startIndex=0
