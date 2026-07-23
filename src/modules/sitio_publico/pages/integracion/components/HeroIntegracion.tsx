import { Box, Typography } from "@mui/material";
import desarrollador from "../../../../../shared/assets/desarrollador_timbox.webp";

export function HeroIntegracion() {
  return (
    <Box
      component="section"
      sx={{
        minHeight: { xs: "auto", md: "100vh" },
        bgcolor: "var(--azul-timbox)",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "29% 31% 40%" },
        gridTemplateRows: { xs: "auto auto auto", md: "50vh 50vh" },
      }}
    >
      <Box sx={{ display: { xs: "none", md: "block" }, gridRow: "1 / span 2" }} />

      <Box
        sx={{
          gridColumn: { xs: "1", md: "2 / span 2" },
          minHeight: { xs: "58vh", md: "50vh" },
          mt: { xs: 12, md: 0 },
          backgroundImage: `linear-gradient(rgba(21, 33, 47, 0.12), rgba(21, 33, 47, 0.12)), url(${desarrollador})`,
          backgroundSize: "cover",
          backgroundPosition: { xs: "center 68%", md: "center 72%" },
        }}
      />

      <Box
        sx={{
          minHeight: { xs: 260, md: "50vh" },
          bgcolor: "var(--fondo-timbox)",
          color: "var(--azul-timbox)",
          display: "grid",
          placeItems: "center",
          px: { xs: 4, md: 7 },
          textAlign: "center",
        }}
      >
        <Typography
          component="h1"
          sx={{
            fontFamily: "var(--fuente-ligera)",
            fontSize: { xs: 42, md: 40 },
            fontWeight: 400,
            lineHeight: 1,
          }}
        >
          Integración
        </Typography>
      </Box>

      <Box
        sx={{
          minHeight: { xs: 260, md: "50vh" },
          bgcolor: "var(--azul-timbox)",
          color: "var(--rojo-timbox)",
          display: "flex",
          alignItems: "center",
          px: { xs: "8vw", md: "3vw" },
          py: { xs: 6, md: 0 },
        }}
      >
        <Typography
          component="h2"
          sx={{
            maxWidth: 620,
            fontFamily: "var(--fuente-ligera)",
            fontSize: { xs: 26, md: 28 },
            fontWeight: 400,
            lineHeight: 1,
          }}
        >
          // Innovación y eficiencia: nuestra materia prima para ofrecerte respuestas.
        </Typography>
      </Box>
    </Box>
  );
}
