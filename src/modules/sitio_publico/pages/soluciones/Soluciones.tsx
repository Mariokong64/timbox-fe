import { Box } from "@mui/material";
import { HeroSoluciones } from "./components/HeroSoluciones";
import { SeccionTiposTimbrado } from "./components/SeccionTiposTimbrado";

export function Soluciones() {
  return (
    <Box component="section" sx={{ bgcolor: "var(--fondo-timbox)" }}>
      <HeroSoluciones />
      <SeccionTiposTimbrado />
    </Box>
  );
}
