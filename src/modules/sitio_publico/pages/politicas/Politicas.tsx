import { Box } from "@mui/material";
import { SeccionEnlacesPoliticas } from "./componentes/SeccionEnlacesPoliticas";

export function Politicas() {
  return (
    <Box
      component="section"
      sx={{
        minHeight: { xs: "auto", md: 690 },
        bgcolor: "var(--fondo-timbox)",
        pt: { xs: 22, sm: 24, md: 25 },
        pb: { xs: 10, md: 14 },
        display: "flex",
        alignItems: "flex-start",
      }}
    >
      <SeccionEnlacesPoliticas />
    </Box>
  );
}
