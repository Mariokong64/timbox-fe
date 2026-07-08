import { Box } from "@mui/material";
import { HeroIntegracion } from "./components/HeroIntegracion";
import { SeccionHerramientas } from "./components/SeccionHerramientas";

export function Integracion() {
  return (
    <Box component="section" sx={{ bgcolor: "var(--fondo-timbox)" }}>
      <HeroIntegracion />
      <SeccionHerramientas />
    </Box>
  );
}
