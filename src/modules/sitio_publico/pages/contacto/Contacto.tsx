import { useState } from "react";
import { Box } from "@mui/material";
import edificios from "../../../../shared/assets/Edificios.png";
import { MenuLateralPublico } from "../../components/MenuLateralPublico";
import { FormularioContacto } from "./components/FormularioContacto";
import { PanelContacto } from "./components/PanelContacto";
import {LogoTimboxConLetras} from '../../../../shared/components/LogoTimboxConLetras';

export function Contacto() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const abrirMenu = () => {
    setMenuAbierto(true);
  };

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  const onLogoClick = () => {
    cerrarMenu();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box
      component="section"
      sx={{
        minHeight: "100vh",
        position: "relative",
        bgcolor: "var(--azul-timbox)",
        color: "var(--blanco-timbox)",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "58.5% 41.5%" },
      }}
    >
      <LogoTimboxConLetras
        to="/"
        onClick={onLogoClick}
        ancho={220}
        variante="claro"
        sx={{
          position: "absolute",
          top: { xs: 76, md: 31 },
          left: { xs: 24, sm: 40, md: "7vw" },
          zIndex: 160,
          display: { xs: "inline-flex", md: "none" },
        }}
      />
      <LogoTimboxConLetras
        to="/"
        onClick={onLogoClick}
        ancho={200}
        variante="claro"
        sx={{
          position: "absolute",
          top: 31,
          left: "7vw",
          zIndex: 160,
          display: { xs: "none", md: "inline-flex" },
        }}
      />

      <MenuLateralPublico
        abierto={menuAbierto}
        onAbrir={abrirMenu}
        onCerrar={cerrarMenu}
      />

      <Box
        sx={{
          minHeight: { xs: "auto", md: "100vh" },
          display: "flex",
          alignItems: "center",
          px: { xs: "8vw", md: "7.2vw" },
          pt: { xs: 20, md: 13 },
          pb: { xs: 8, md: 6 },
        }}
      >
        <FormularioContacto />
      </Box>

      <Box
        sx={{
          position: "relative",
          minHeight: { xs: 720, md: "100vh" },
          backgroundImage: `linear-gradient(rgba(37, 124, 194, 0.22), rgba(37, 124, 194, 0.22)), url(${edificios})`,
          backgroundSize: "cover",
          backgroundPosition: { xs: "center top", md: "center" },
        }}
      >
        <PanelContacto />
      </Box>
    </Box>
  );
}
