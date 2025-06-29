import React from "react";

export async function APIBooks(query = 'comedy') {
    const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=20`)
    const data = await res.json()
    return data.items || [];
}