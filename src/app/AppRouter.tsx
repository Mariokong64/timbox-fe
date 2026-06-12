// src/app/AppRouter.tsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PublicLayout } from "../modules/sitio_publico/layout/PublicLayout";
import { HomePage } from "../modules/sitio_publico/pages/home/HomePage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}