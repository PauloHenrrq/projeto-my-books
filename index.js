// index.js

// **IMPORTANTE: Substitua 'SUA_CHAVE_DE_API' pela sua chave real do Google Books API**
const API_KEY = "AIzaSyB8SHAFgOLAY7NanADiZL7JVq6i-EDxVLg";

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const resultsDiv = document.getElementById("results");
const errorMessageDiv = document.getElementById("errorMessage");

// Função principal para buscar livros
async function searchBooks() {
  const query = searchInput.value.trim(); // Obtém o valor do input e remove espaços em branco
  resultsDiv.innerHTML = ""; // Limpa os resultados anteriores
  errorMessageDiv.textContent = ""; // Limpa mensagens de erro anteriores

  if (!query) {
    errorMessageDiv.textContent = "Por favor, digite um termo para buscar.";
    return; // Sai da função se a busca estiver vazia
  }

  // Constrói a URL da API do Google Books
  // Usamos encodeURIComponent para garantir que a query seja formatada corretamente para a URL
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
    query
  )}&key=${API_KEY}`;

  try {
    // Faz a requisição à API usando fetch()
    const response = await fetch(url);

    // Verifica se a resposta HTTP foi bem-sucedida (status 200 OK)
    if (!response.ok) {
      // Lança um erro se o status não for OK (ex: 404, 500)
      throw new Error(`Erro na rede: ${response.status} ${response.statusText}`);
    }

    // Converte a resposta para JSON
    const data = await response.json();

    // Verifica se a API retornou itens (livros)
    if (data.items && data.items.length > 0) {
      // Itera sobre cada livro retornado e o exibe
      data.items.forEach((book) => {
        displayBook(book); // Chama a função para exibir um único livro
      });
    } else {
      resultsDiv.innerHTML = "<p>Nenhum livro encontrado para sua busca.</p>";
    }
  } catch (error) {
    // Captura e exibe qualquer erro que ocorra durante a requisição ou processamento
    console.error("Erro ao buscar livros:", error);
    errorMessageDiv.textContent = `Erro ao carregar os livros: ${error.message}. Por favor, tente novamente.`;
  }
}

// Função para exibir um único livro no HTML
function displayBook(book) {
  const bookItem = document.createElement("div");
  bookItem.classList.add("book-item");

  const title = book.volumeInfo.title || "Título Desconhecido";
  const authors = book.volumeInfo.authors
    ? book.volumeInfo.authors.join(", ")
    : "Autor Desconhecido";
  const thumbnailUrl =
    book.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/150x200?text=Sem+Capa"; // Imagem padrão se não houver capa

  bookItem.innerHTML = `
        <img src="${thumbnailUrl}" alt="Capa de ${title}">
        <h3>${title}</h3>
        <p class="authors">${authors}</p>
    `;
  resultsDiv.appendChild(bookItem);
}

// Adiciona um "listener" de evento ao botão de busca
searchButton.addEventListener("click", searchBooks);

// Opcional: Permite buscar ao pressionar "Enter" no campo de busca
searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    searchBooks();
  }
});
