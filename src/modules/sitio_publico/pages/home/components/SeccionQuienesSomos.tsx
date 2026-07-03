import { Box, Typography } from "@mui/material";
import { EnlaceConFlecha } from "../../../components/EnlaceConFlecha";
import { LogoSat } from "../../../components/LogoSat";

export function SeccionQuienesSomos() {
  return (
    <Box
      component="section"
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "29% 71%" },
        minHeight: { xs: 650, md: 600 },
        bgcolor: "var(--fondo-timbox)",
      }}
    >
      <Box sx={{ display: { xs: "none", md: "block" }, bgcolor: "var(--rojo-timbox)" }} />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 250px" },
          alignItems: "center",
          gap: { xs: 4, md: 5 },
          pl: { xs: "8vw", md: "8vw" },
          pr: { xs: "8vw", md: "5vw" },
          pt: { xs: 15, md: 8 },
          pb: { xs: 10, md: 12 },
        }}
      >
        <Box>
          <Typography
            component="h2"
            sx={{
              mb: 4,
              fontFamily: "var(--fuente-ligera)",
              fontSize: { xs: 40, md: 50 },
              fontWeight: 400,
              lineHeight: 1,
            }}
          >
            Quiénes Somos
          </Typography>
          <Typography
            sx={{
              maxWidth: 780,
              mb: 2,
              fontFamily: "var(--fuente-ligera)",
              fontSize: { xs: 22, md: 30 },
              lineHeight: 1.05,
            }}
          >
            Disminuimos tus riesgos fiscales, brindándote soluciones innovadoras,
            integración muy amigable y estabilidad en nuestras soluciones.
          </Typography>
          <EnlaceConFlecha texto="Empieza ahora" href="/empresa" />
        </Box>

        <LogoSat/>
      </Box>
    </Box>
  );
}
