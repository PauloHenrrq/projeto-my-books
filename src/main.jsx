import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Books from "./Pages/Books";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Books></Books>
  </StrictMode>
);
