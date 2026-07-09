// src/app/AppRouter.tsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PublicLayout } from "../modules/sitio_publico/layout/PublicLayout";
import { Contacto } from "../modules/sitio_publico/pages/contacto/Contacto";
import { Empresa } from "../modules/sitio_publico/pages/empresa/Empresa";
import { HomePage } from "../modules/sitio_publico/pages/home/HomePage";
import { Integracion } from "../modules/sitio_publico/pages/integracion/Integracion";
import { Planes } from "../modules/sitio_publico/pages/planes/Planes";
import { Soluciones } from "../modules/sitio_publico/pages/soluciones/Soluciones";
import { Soporte } from "../modules/sitio_publico/pages/soporte/Soporte";
import { TimbrarCfdi } from "../modules/sitio_publico/pages/soporte/secciones/TimbrarCfdi";
import { Validador } from "../modules/sitio_publico/pages/validador/Validador";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/planes" element={<Planes />} />
          <Route path="/integradores" element={<Integracion />} />
          <Route path="/soluciones" element={<Soluciones />} />
          <Route path="/validador" element={<Validador />} />
          <Route path="/empresa" element={<Empresa />} />
          <Route path="/soporte" element={<Soporte />} />
          <Route path="/timbrar-cfdi" element={<TimbrarCfdi />} />
        </Route>
          <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </BrowserRouter>
  );
}
