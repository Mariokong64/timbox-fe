import { Box, Typography } from "@mui/material";
import documentacionTimbox from "../../../../../shared/assets/documentacion_timbox.webp";

export function HeroSoporte() {
  return (
    <Box
      component="section"
      sx={{
        minHeight: { xs: 640, md: "92vh" },
        bgcolor: "var(--azul-timbox)",
        backgroundImage: `linear-gradient(rgba(21, 33, 47, 0.1), rgba(21, 33, 47, 0.1)), url(${documentacionTimbox})`,
        backgroundSize: "cover",
        backgroundPosition: { xs: "58% center", md: "center center" },
        display: "grid",
        placeItems: "center",
        px: { xs: 4, md: 10 },
        color: "var(--blanco-timbox)",
        textAlign: "center",
      }}
    >
      <Typography
        component="h1"
        sx={{
          mt: { xs: 11, md: 6 },
          fontFamily: "var(--fuente-ligera)",
          fontSize: { xs: 44, sm: 58, md: 72 },
          fontWeight: 350,
          lineHeight: 1,
          letterSpacing: 0,
          textShadow: "0 8px 32px rgba(21, 33, 47, 0.35)",
        }}
      >
        // El servicio lo es todo.
      </Typography>
    </Box>
  );
}
