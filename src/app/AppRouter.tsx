// src/app/AppRouter.tsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ModuloNoImplementadoPrivado } from "../modules/sitio_privado/components/ModuloNoImplementadoPrivado";
import { RutaPrivada } from "../modules/sitio_privado/components/RutaPrivada";
import { LayoutPrivado } from "../modules/sitio_privado/layout/LayoutPrivado";
import { Login } from "../modules/sitio_privado/login/vista/Login";
import { DashboardPrivado } from "../modules/sitio_privado/pages/dashboard/vista/DashboardPrivado";
import { PerfilPrivado } from "../modules/sitio_privado/pages/perfil/vista/PerfilPrivado";
import { Usuarios } from "../modules/sitio_privado/pages/usuarios/Usuarios";
import { PaginaNoEncontradaPublica } from "../modules/sitio_publico/components/PaginaNoEncontradaPublica";
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
          <Route path="*" element={<PaginaNoEncontradaPublica />} />
        </Route>
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login />} />
        <Route element={<RutaPrivada />}>
          <Route path="/privado/perfil" element={<PerfilPrivado />} />
          <Route path="/privado" element={<LayoutPrivado />}>
            <Route index element={<DashboardPrivado />} />
            <Route path="contenidos" element={<ModuloNoImplementadoPrivado />} />
            <Route path="solicitudes" element={<ModuloNoImplementadoPrivado />} />
            <Route path="usuarios" element={<Usuarios />} />
            <Route path="*" element={<ModuloNoImplementadoPrivado />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
