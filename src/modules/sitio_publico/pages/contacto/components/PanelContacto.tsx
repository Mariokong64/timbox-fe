import { Box, Typography } from "@mui/material";

export function PanelContacto() {
  return (
    <Box
      sx={{
        position: { xs: "static", md: "absolute" },
        right: 0,
        bottom: 0,
        width: { xs: "100%", md: 430 },
        bgcolor: "var(--azul-timbox)",
        px: { xs: "8vw", md: 2.8 },
        py: { xs: 5, md: 3 },
        color: "var(--blanco-timbox)",
      }}
    >
      <Typography
        component="h2"
        sx={{
          fontFamily: "var(--fuente-regular)",
          fontSize: 21,
          fontWeight: 400,
          mb: 3,
        }}
      >
        Contacto general
      </Typography>

      <Typography
        sx={{
          fontFamily: "var(--fuente-regular)",
          fontSize: 20,
          fontWeight: 700,
          color: "var(--texto-blanco-medio)",
          lineHeight: 1.45,
          mb: 0.6,
        }}
      >
        Ventas: contacto@timbox.com.mx
        <br />
        Soporte Técnico: soporte@timbox.com.mx
      </Typography>

      <Typography sx={{ fontFamily: "var(--fuente-regular)", fontSize: 20, mb: 3 }}>
        Tel.
      </Typography>

      <Typography
        sx={{
          fontFamily: "var(--fuente-regular)",
          fontSize: 22,
          fontWeight: 700,
          color: "var(--texto-blanco-medio)",
          lineHeight: 2.4,
          mb: 0.5,
        }}
      >
        800 788 0195
        <br />
        442 454 7840
      </Typography>

      <Typography sx={{ fontFamily: "var(--fuente-regular)", fontSize: 20, mb: 3 }}>
        Horarios
      </Typography>

      <Typography
        sx={{
          fontFamily: "var(--fuente-regular)",
          fontSize: 20,
          lineHeight: 1.45,
        }}
      >
        Lunes - Viernes
        <br />
        9:30 - 19:00
        <br />
        CST
      </Typography>
    </Box>
  );
}
