import { Box, Link, Typography } from "@mui/material";
import { abrirURLPorClave, clavesURL } from "../../../components/urls/servicio/urlsServicio";

export function SeccionRegistro() {
  return (
    <Box
      component="section"
      sx={{
        minHeight: { xs: 410, md: 470 },
        bgcolor: "var(--rojo-timbox)",
        color: "var(--blanco-timbox)",
        display: "grid",
        placeItems: "center",
        px: "8vw",
        py: 8,
        textAlign: "center",
      }}
    >
      <Box>
        <Typography
          component="h2"
          sx={{
            fontFamily: "var(--fuente-ligera)",
            fontSize: { xs: 50, md: 74 },
            fontWeight: 400,
            lineHeight: 1,
          }}
        >
          Regístrate
        </Typography>
        <Typography
          sx={{
            mt: 1,
            mb: 6,
            fontFamily: "var(--fuente-ligera)",
            fontSize: { xs: 21, md: 35 },
          }}
        >
          Pruébanos y obtén timbres gratis.
        </Typography>
        <Link
          href="/404"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(evento) => {
            evento.preventDefault();
            abrirURLPorClave(clavesURL.dashboardRegistro);
          }}
          color="inherit"
          underline="hover"
          sx={{ fontFamily: "var(--fuente-regular)", fontSize: 28 }}
        >
          Unirse
        </Link>
      </Box>
    </Box>
  );
}
