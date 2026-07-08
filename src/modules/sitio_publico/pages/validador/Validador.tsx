import { Box, Typography } from "@mui/material";
import { FormularioValidador } from "./components/FormularioValidador";

export function Validador() {
  return (
    <Box
      component="section"
      sx={{
        minHeight: "100vh",
        bgcolor: "var(--azul-timbox)",
        color: "var(--blanco-timbox)",
        pt: { xs: 24, md: 20 },
        pb: { xs: 10, md: 16 },
      }}
    >
      <Typography
        component="h1"
        sx={{
          mb: { xs: 5, md: 6 },
          textAlign: "center",
          fontFamily: "var(--fuente-ligera)",
          fontSize: { xs: 28, md: 32 },
          fontWeight: 400,
          lineHeight: 1,
        }}
      >
        Validación de comprobantes
      </Typography>

      <FormularioValidador />
    </Box>
  );
}
