import { Box } from "@mui/material";
import { SeccionVideo } from "../../components/SeccionVideo";
import { HeroEmpresa } from "./components/HeroEmpresa";
import { SeccionMotivosEmpresa } from "./components/SeccionMotivosEmpresa";
import { SeccionSatEmpresa } from "./components/SeccionSatEmpresa";
import { SeccionTiemposEmpresa } from "./components/SeccionTiemposEmpresa";

export function Empresa() {
  return (
    <Box component="section" sx={{ bgcolor: "var(--fondo-timbox)" }}>
      <HeroEmpresa />
      <SeccionMotivosEmpresa />
      <SeccionVideo />
      <SeccionSatEmpresa />
      <SeccionTiemposEmpresa />
    </Box>
  );
}
