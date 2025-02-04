import "./index.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import SearchPage from "./pages/SearchPage.tsx";
import SearchDetailsPage from "./pages/SearchDetailsPage.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/repo/:id" element={<SearchDetailsPage />} />
    </Routes>
  </BrowserRouter>
);
