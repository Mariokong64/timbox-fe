import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { AccionesFlotantes } from "../components/AccionesFlotantes";
import { BarraAccesoPublica } from "../components/BarraAccesoPublica";
import { FooterPublico } from "../components/FooterPublico";
import { MenuLateralPublico } from "../components/MenuLateralPublico";

export function PublicLayout() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f1f1f1", overflowX: "hidden" }}>
      <BarraAccesoPublica />
      <MenuLateralPublico />
      <AccionesFlotantes />

      <Box component="main">
        <Outlet />
      </Box>

      <FooterPublico />
    </Box>
  );
}
