import { Box } from "@mui/material";
import { enlacesPoliticas } from "./datosPoliticas";
import { TarjetaPolitica } from "./TarjetaPolitica";

export function SeccionEnlacesPoliticas() {
  return (
    <Box
      component="ul"
      aria-label="Documentos y políticas de Timbox"
      sx={{
        width: "min(1640px, 86vw)",
        m: "0 auto",
        p: 0,
        listStyle: "none",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
        gap: { xs: 1.5, md: 1.75 },
      }}
    >
      {enlacesPoliticas.map((enlace) => (
        <Box component="li" key={enlace.ruta}>
          <TarjetaPolitica enlace={enlace} />
        </Box>
      ))}
    </Box>
  );
}
