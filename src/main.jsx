import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import MyBooksMain from "./Components/MyBooksMain";
import Books from "./Pages/Books";
import App from "./App";
import AppRouter from "./Routes/server/AppRouter";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppRouter></AppRouter>
  </StrictMode>
);
