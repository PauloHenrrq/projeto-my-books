import React from "react";

export async function APIBooks(query = 'comedy') {
    const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=20`)
    const data = await res.json()
    return data.items || [];
}

// https://www.googleapis.com/books/v1/volumes?q=comedy&maxResults=20&startIndex=18 - Exemplo de pesquisa dinâmica, 1-19, 20-39...