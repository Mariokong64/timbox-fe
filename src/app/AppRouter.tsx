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
import { TimbrarCfdi } from "../modules/sitio_publico/pages/soporte/secciones/timbrar/TimbrarCfdi";
import { TimbrarCfdi40 } from "../modules/sitio_publico/pages/soporte/secciones/timbrar/TimbrarCfdi4.0";
import { TimbrarRefencia } from "../modules/sitio_publico/pages/soporte/secciones/timbrar/TimbrarRefencia";
import { TimbrarZip } from "../modules/sitio_publico/pages/soporte/secciones/timbrar/TimbrarZip";
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
          {/* Rutas de las páginas de soporte */}
          {/* Timbrar */}
          <Route path="/timbrar-cfdi" element={<TimbrarCfdi />} />
          <Route path="/timbrar-cfdi-4-0" element={<TimbrarCfdi40 />} />
          <Route path="/timbrar-referencia" element={<TimbrarRefencia />} />
          <Route path="/timbrar-zip" element={<TimbrarZip />} />
        </Route>
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </BrowserRouter>
  );
}
