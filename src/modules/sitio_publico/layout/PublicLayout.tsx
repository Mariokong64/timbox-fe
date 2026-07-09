import { useState } from "react";
import { Box } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import { AccionesFlotantes } from "../components/AccionesFlotantes";
import { BarraAccesoPublica } from "../components/BarraAccesoPublica";
import { FooterPublico } from "../components/FooterPublico";
import { MenuLateralPublico } from "../components/MenuLateralPublico";

export function PublicLayout() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { pathname } = useLocation();
  const rutasConHeaderOscuro = ["/planes", "/timbrar-cfdi"];
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

      <Box component="main">
        <Outlet />
      </Box>

      <FooterPublico />
    </Box>
  );
}
