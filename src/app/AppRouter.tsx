// src/app/AppRouter.tsx
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ModuloNoImplementadoPrivado } from "../modules/sitio_privado/components/ModuloNoImplementadoPrivado";
import { RutaPrivada } from "../modules/sitio_privado/components/RutaPrivada";
import { LayoutPrivado } from "../modules/sitio_privado/layout/LayoutPrivado";
import { Login } from "../modules/sitio_privado/login/vista/Login";
import { DashboardPrivado } from "../modules/sitio_privado/pages/dashboard/vista/DashboardPrivado";
import { PerfilPrivado } from "../modules/sitio_privado/pages/perfil/vista/PerfilPrivado";
import { Usuarios } from "../modules/sitio_privado/pages/usuarios/Usuarios";
import { SolicitudesContacto } from "../modules/sitio_privado/pages/solicitudes/vista/SolicitudesContacto";
import { GestionContenidos } from "../modules/sitio_privado/pages/contenidos/vista/GestionContenidos";
import { PaginaNoEncontradaPublica } from "../modules/sitio_publico/components/PaginaNoEncontradaPublica";
import { PublicLayout } from "../modules/sitio_publico/layout/PublicLayout";
import { Contacto } from "../modules/sitio_publico/pages/contacto/Contacto";
import { Empresa } from "../modules/sitio_publico/pages/empresa/Empresa";
import { HomePage } from "../modules/sitio_publico/pages/home/HomePage";
import { Integracion } from "../modules/sitio_publico/pages/integracion/Integracion";
import { Planes } from "../modules/sitio_publico/pages/planes/Planes";
import { Politicas } from "../modules/sitio_publico/pages/politicas/Politicas";
import { AcuerdoNivelesServicio } from "../modules/sitio_publico/pages/politicas/secciones/acuerdo-niveles-servicio/AcuerdoNivelesServicio";
import { AvisoPrivacidad } from "../modules/sitio_publico/pages/politicas/secciones/aviso-privacidad/AvisoPrivacidad";
import { AvisoPrivacidadIntegral } from "../modules/sitio_publico/pages/politicas/secciones/aviso-privacidad-integral/AvisoPrivacidadIntegral";
import { DerechosArco } from "../modules/sitio_publico/pages/politicas/secciones/derechos-arco/DerechosArco";
import { PoliticaProteccionDatos } from "../modules/sitio_publico/pages/politicas/secciones/politica-proteccion-datos/PoliticaProteccionDatos";
import { FaqAplicativoGratuito } from "../modules/sitio_publico/pages/politicas/secciones/preguntas-frecuentes/faq-aplicativo-gratuito/FaqAplicativoGratuito";
import { WebService } from "../modules/sitio_publico/pages/politicas/secciones/preguntas-frecuentes/web-service/WebService";
import { TerminosYCondiciones } from "../modules/sitio_publico/pages/politicas/secciones/terminos-y-condiciones/TerminosYCondiciones";
import { Soluciones } from "../modules/sitio_publico/pages/soluciones/Soluciones";
import { Soporte } from "../modules/sitio_publico/pages/soporte/Soporte";
import { TimbrarCfdi } from "../modules/sitio_publico/pages/soporte/secciones/timbrar/TimbrarCfdi";
import { TimbrarCfdi40 } from "../modules/sitio_publico/pages/soporte/secciones/timbrar/TimbrarCfdi4.0";
import { CancelarCfdi } from "../modules/sitio_publico/pages/soporte/secciones/cancelar/CancelarCfdi";
import { CancelarCfdiSeguro } from "../modules/sitio_publico/pages/soporte/secciones/cancelar/CancelarCfdiSeguro";
import { ConsultarDocumentoRelacionado } from "../modules/sitio_publico/pages/soporte/secciones/cancelar/ConsultarDocumentoRelacionado";
import { ConsultarEstatus } from "../modules/sitio_publico/pages/soporte/secciones/cancelar/ConsultarEstatus";
import { ConsultarPeticionesPendientes } from "../modules/sitio_publico/pages/soporte/secciones/cancelar/ConsultarPeticionesPendientes";
import { ProcesarRespuesta } from "../modules/sitio_publico/pages/soporte/secciones/cancelar/ProcesarRespuesta";
import { BuscarAcuseRecepcion } from "../modules/sitio_publico/pages/soporte/secciones/utilerias/BuscarAcuseRecepcion";
import { BuscarCfdis } from "../modules/sitio_publico/pages/soporte/secciones/utilerias/BuscarCfdis";
import { ObtenerConsumo } from "../modules/sitio_publico/pages/soporte/secciones/utilerias/ObtenerConsumo";
import { RecuperarComprobante } from "../modules/sitio_publico/pages/soporte/secciones/utilerias/RecuperarComprobante";
import { RecuperarComprobanteReferencia } from "../modules/sitio_publico/pages/soporte/secciones/utilerias/RecuperarComprobanteReferencia";
import { CancelarMasivoRetenciones } from "../modules/sitio_publico/pages/soporte/secciones/retenciones/CancelarMasivoRetenciones";
import { CancelarRetenciones } from "../modules/sitio_publico/pages/soporte/secciones/retenciones/CancelarRetenciones";
import { ConsultarAcuseCancelacion } from "../modules/sitio_publico/pages/soporte/secciones/retenciones/ConsultarAcuseCancelacion";
import { TimbrarRetenciones } from "../modules/sitio_publico/pages/soporte/secciones/retenciones/TimbrarRetenciones";
import { ValidarCfdi } from "../modules/sitio_publico/pages/soporte/secciones/servicios-validacion/ValidarCfdi";
import { FirmarManifiesto } from "../modules/sitio_publico/pages/soporte/secciones/manifiesto/FirmarManifiesto";
import { FirmarManifiestoSello } from "../modules/sitio_publico/pages/soporte/secciones/manifiesto/FirmarManifiestoSello";
import { GenerarCertificado } from "../modules/sitio_publico/pages/soporte/secciones/generacion-cfdi/GenerarCertificado";
import { GenerarCfdi } from "../modules/sitio_publico/pages/soporte/secciones/generacion-cfdi/GenerarCfdi";
import { GenerarCfdiRetenciones } from "../modules/sitio_publico/pages/soporte/secciones/generacion-cfdi/GenerarCfdiRetenciones";
import { GenerarSello } from "../modules/sitio_publico/pages/soporte/secciones/generacion-cfdi/GenerarSello";
import { RfcsAmbientePruebasSat } from "../modules/sitio_publico/pages/soporte/secciones/rfcs-ambiente-pruebas-sat/RfcsAmbientePruebasSat";
import { TxtCfdi40 } from "../modules/sitio_publico/pages/soporte/secciones/integracion-txt/TxtCfdi40";
import { TxtNomina } from "../modules/sitio_publico/pages/soporte/secciones/integracion-txt/TxtNomina";
import { TxtQueEs } from "../modules/sitio_publico/pages/soporte/secciones/integracion-txt/TxtQueEs";
import { LayoutCartaPorteWindows } from "../modules/sitio_publico/pages/soporte/secciones/layout-windows/LayoutCartaPorteWindows";
import { LayoutCfdiWindows } from "../modules/sitio_publico/pages/soporte/secciones/layout-windows/LayoutCfdiWindows";
import { LayoutComercioWindows } from "../modules/sitio_publico/pages/soporte/secciones/layout-windows/LayoutComercioWindows";
import { LayoutQueEsWindows } from "../modules/sitio_publico/pages/soporte/secciones/layout-windows/LayoutQueEsWindows";
import { LayoutRepWindows } from "../modules/sitio_publico/pages/soporte/secciones/layout-windows/LayoutRepWindows";
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
          <Route path="/integraciones" element={<Integracion />} />
          <Route path="/soluciones" element={<Soluciones />} />
          <Route path="/validador" element={<Validador />} />
          <Route path="/empresa" element={<Empresa />} />
          <Route path="/soporte" element={<Soporte />} />
          <Route path="/politicas" element={<Politicas />} />
          <Route path="/terminos-condiciones" element={<TerminosYCondiciones />} />
          <Route path="/aviso-privacidad" element={<AvisoPrivacidad />} />
          <Route path="/preguntas-frecuentes" element={<FaqAplicativoGratuito />} />
          <Route path="/faq-aplicativo-gratuito" element={<FaqAplicativoGratuito />} />
          <Route path="/web-service" element={<WebService />} />
          <Route path="/niveles-servicio" element={<AcuerdoNivelesServicio />} />
          <Route path="/acuerdo-niveles-de-servicios" element={<AcuerdoNivelesServicio />} />
          <Route path="/proteccion-datos" element={<PoliticaProteccionDatos />} />
          <Route path="/policaclasificacion" element={<PoliticaProteccionDatos />} />
          <Route path="/derechos-arco" element={<DerechosArco />} />
          <Route path="/procedimientoarco" element={<DerechosArco />} />
          <Route path="/aviso-privacidad-integral" element={<AvisoPrivacidadIntegral />} />
          <Route path="/avisioprivacidad" element={<AvisoPrivacidadIntegral />} />
          {/* Rutas de las páginas de soporte */}
          {/* Timbrar */}
          <Route path="/timbrar-cfdi" element={<TimbrarCfdi />} />
          <Route path="/timbrar-cfdi-4-0" element={<TimbrarCfdi40 />} />
          <Route path="/timbrar-referencia" element={<TimbrarRefencia />} />
          <Route path="/timbrar-zip" element={<TimbrarZip />} />
          <Route path="/cancelar-cfdi/" element={<CancelarCfdi />} />
          <Route path="/cancelar-cfdi-seguro/" element={<CancelarCfdiSeguro />} />
          <Route path="/consultar-estatus/" element={<ConsultarEstatus />} />
          <Route path="/consultar-documento-relacionado/" element={<ConsultarDocumentoRelacionado />} />
          <Route path="/consultar-peticiones-pendientes/" element={<ConsultarPeticionesPendientes />} />
          <Route path="/procesar-respuesta/" element={<ProcesarRespuesta />} />
          <Route path="/buscar-cfdis/" element={<BuscarCfdis />} />
          <Route path="/buscar-acuse-recepcion/" element={<BuscarAcuseRecepcion />} />
          <Route path="/recuperar-comprobante/" element={<RecuperarComprobante />} />
          <Route path="/recuperar-comprobante-referencia/" element={<RecuperarComprobanteReferencia />} />
          <Route path="/obtener-consumo/" element={<ObtenerConsumo />} />
          <Route path="/timbrar-retenciones/" element={<TimbrarRetenciones />} />
          <Route path="/cancelar-retenciones/" element={<CancelarRetenciones />} />
          <Route path="/cancelar-masivo-retenciones/" element={<CancelarMasivoRetenciones />} />
          <Route path="/consultar-acuse-cancelacion/" element={<ConsultarAcuseCancelacion />} />
          <Route path="/validar-cfdi/" element={<ValidarCfdi />} />
          <Route path="/firmar-manifiesto/" element={<FirmarManifiesto />} />
          <Route path="/firmar-manifiesto-sello/" element={<FirmarManifiestoSello />} />
          <Route path="/generar-cfdi/" element={<GenerarCfdi />} />
          <Route path="/generar-cfdi-retenciones/" element={<GenerarCfdiRetenciones />} />
          <Route path="/generar-certificado/" element={<GenerarCertificado />} />
          <Route path="/generar-sello/" element={<GenerarSello />} />
          <Route path="/rfcs-ambiente-de-pruebas-sat/" element={<RfcsAmbientePruebasSat />} />
          <Route path="/layout-que-es/" element={<TxtQueEs />} />
          <Route path="/layout-cfdi-4-0/" element={<TxtCfdi40 />} />
          <Route path="/layout-nomina/" element={<TxtNomina />} />
          <Route path="/layout-que-es-windows/" element={<LayoutQueEsWindows />} />
          <Route path="/layout-windows/" element={<LayoutCfdiWindows />} />
          <Route path="/layout-rep-windows/" element={<LayoutRepWindows />} />
          <Route path="/layout-comercio-windows/" element={<LayoutComercioWindows />} />
          <Route path="/layout-windows-cartaporte/" element={<LayoutCartaPorteWindows />} />
          <Route path="*" element={<PaginaNoEncontradaPublica />} />
        </Route>
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login />} />
        <Route element={<RutaPrivada />}>
          <Route path="/privado" element={<LayoutPrivado />}>
            <Route index element={<DashboardPrivado />} />
            <Route path="perfil" element={<PerfilPrivado />} />
            <Route path="contenidos" element={<GestionContenidos />} />
            <Route path="solicitudes" element={<SolicitudesContacto />} />
            <Route
              path="chats"
              element={<Navigate to="/privado/solicitudes?origen=chat" replace />}
            />
            <Route path="usuarios" element={<Usuarios />} />
            <Route path="*" element={<ModuloNoImplementadoPrivado />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
