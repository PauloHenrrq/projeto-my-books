import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import SerachInput from "./Components/SearchBar/SearchInput.jsx";
import SearchBar from "./Components/SearchBar/SearchBar.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
