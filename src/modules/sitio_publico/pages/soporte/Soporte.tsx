import { Box } from "@mui/material";
import { gruposSoporte } from "./components/datosSoporte";
import { HeroSoporte } from "./components/HeroSoporte";
import { SeccionEnlacesSoporte } from "./components/SeccionEnlacesSoporte";

export function Soporte() {
  return (
    <Box component="section" sx={{ bgcolor: "var(--azul-timbox)" }}>
      <HeroSoporte />
      {gruposSoporte.map((grupo) => (
        <SeccionEnlacesSoporte key={grupo.titulo} grupo={grupo} />
      ))}
    </Box>
  );
}
