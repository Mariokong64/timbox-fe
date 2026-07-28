import { useState } from "react";
import { Box } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import { AccionesFlotantes } from "../components/AccionesFlotantes";
import { BarraAccesoPublica } from "../components/BarraAccesoPublica";
import { FooterPublico } from "../components/FooterPublico";
import { MenuLateralPublico } from "../components/MenuLateralPublico";
import { ChatFlotante } from "../components/chat";

export function PublicLayout() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { pathname } = useLocation();
  const rutasDocumentacionSoporte = [
    "/timbrar-cfdi",
    "/timbrar-cfdi-4-0",
    "/timbrar-referencia",
    "/timbrar-zip",
    "/cancelar-cfdi/",
    "/cancelar-cfdi-seguro/",
    "/consultar-estatus/",
    "/consultar-documento-relacionado/",
    "/consultar-peticiones-pendientes/",
    "/procesar-respuesta/",
    "/buscar-cfdis/",
    "/buscar-acuse-recepcion/",
    "/recuperar-comprobante/",
    "/recuperar-comprobante-referencia/",
    "/obtener-consumo/",
    "/timbrar-retenciones/",
    "/cancelar-retenciones/",
    "/cancelar-masivo-retenciones/",
    "/consultar-acuse-cancelacion/",
    "/validar-cfdi/",
    "/firmar-manifiesto/",
    "/firmar-manifiesto-sello/",
    "/generar-cfdi/",
    "/generar-cfdi-retenciones/",
    "/generar-certificado/",
    "/generar-sello/",
    "/rfcs-ambiente-de-pruebas-sat/",
    "/layout-que-es/",
    "/layout-cfdi-4-0/",
    "/layout-nomina/",
    "/layout-que-es-windows/",
    "/layout-windows/",
    "/layout-rep-windows/",
    "/layout-comercio-windows/",
    "/layout-windows-cartaporte/",
  ];
  const rutasDocumentacionPoliticas = [
    "/terminos-condiciones",
    "/aviso-privacidad",
    "/preguntas-frecuentes",
    "/faq-aplicativo-gratuito",
    "/web-service",
    "/niveles-servicio",
    "/acuerdo-niveles-de-servicios",
    "/proteccion-datos",
    "/policaclasificacion",
    "/derechos-arco",
    "/procedimientoarco",
    "/aviso-privacidad-integral",
    "/avisioprivacidad",
  ];
  const rutasDocumentacionPublica = [
    ...rutasDocumentacionSoporte,
    ...rutasDocumentacionPoliticas,
  ];
  const rutasConHeaderOscuro = ["/planes", "/politicas", ...rutasDocumentacionPublica];
  const esRutaDocumentacionPublica = rutasDocumentacionPublica.includes(pathname);
  const modoHeader = menuAbierto || !rutasConHeaderOscuro.includes(pathname) ? "claro" : "oscuro";

  const abrirMenu = () => {
    setMenuAbierto(true);
  };

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "var(--fondo-timbox)", overflowX: "hidden" }}>
      <BarraAccesoPublica modo={modoHeader} onLogoClick={cerrarMenu} />
      <MenuLateralPublico
        abierto={menuAbierto}
        onAbrir={abrirMenu}
        onCerrar={cerrarMenu}
      />
      <AccionesFlotantes />
      <ChatFlotante />

      <Box component="main">
        <Outlet />
      </Box>

      {!esRutaDocumentacionPublica && <FooterPublico />}
    </Box>
  );
}
