import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

export function PaginaNoEncontradaPublica() {
  const navigate = useNavigate();

  return (
    <Box
      component="section"
      sx={{
        minHeight: "78vh",
        px: { xs: 3, md: "7vw" },
        pt: { xs: 20, md: 22 },
        pb: { xs: 8, md: 10 },
        display: "grid",
        alignItems: "center",
        bgcolor: "var(--azul-timbox)",
        color: "var(--blanco-timbox)",
      }}
    >
      <Box sx={{ width: "min(760px, 100%)" }}>
        <Typography
          sx={{
            color: "var(--rojo-timbox)",
            fontFamily: "var(--fuente-regular)",
            fontSize: { xs: 18, md: 20 },
            fontWeight: 800,
            mb: 1.5,
          }}
        >
          404
        </Typography>

        <Typography
          component="h1"
          sx={{
            fontFamily: "var(--fuente-regular)",
            fontSize: { xs: 40, md: 62 },
            fontWeight: 800,
            lineHeight: 1.02,
            mb: 2,
          }}
        >
          Pagina no encontrada
        </Typography>

        <Typography
          sx={{
            width: "min(560px, 100%)",
            color: "var(--blanco-timbox)",
            fontFamily: "var(--fuente-regular)",
            fontSize: { xs: 17, md: 19 },
            lineHeight: 1.6,
            mb: 4,
          }}
        >
          La ruta que intentas abrir no existe o todavia no esta disponible.
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
          <Button
            component={RouterLink}
            to="/"
            startIcon={<HomeRoundedIcon />}
            sx={{
              minHeight: 42,
              px: 2.4,
              borderRadius: "6px",
              bgcolor: "var(--rojo-timbox)",
              color: "var(--blanco-timbox)",
              fontFamily: "var(--fuente-regular)",
              fontWeight: 700,
              textTransform: "none",
              "&:hover": {
                bgcolor: "#f04a32",
              },
            }}
          >
            Ir al inicio
          </Button>

          <Button
            type="button"
            onClick={() => navigate(-1)}
            startIcon={<ArrowBackRoundedIcon />}
            sx={{
              minHeight: 42,
              px: 2.4,
              borderRadius: "6px",
              color: "var(--blanco-timbox)",
              border: "1px solid var(--blanco-timbox)",
              fontFamily: "var(--fuente-regular)",
              fontWeight: 700,
              textTransform: "none",
              "&:hover": {
                bgcolor: "var(--rojo-timbox)",
                borderColor: "var(--blanco-timbox)",
              },
            }}
          >
            Regresar
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
