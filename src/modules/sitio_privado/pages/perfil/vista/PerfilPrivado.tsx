import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { obtenerSesionGuardada } from "../../../login/servicio/autenticacionServicio";

export function PerfilPrivado() {
  const sesion = obtenerSesionGuardada();
  const usuario = sesion?.usuario;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "var(--fondo-timbox)",
        color: "var(--azul-timbox)",
        display: "grid",
        placeItems: "center",
        px: 2.5,
        py: 5,
      }}
    >
      <Box
        sx={{
          width: "min(620px, 100%)",
          border: "1px solid #dce1e7",
          borderRadius: "8px",
          bgcolor: "var(--blanco-timbox)",
          px: { xs: 2.5, sm: 4.5 },
          py: { xs: 4, sm: 5 },
          textAlign: "center",
          boxShadow: "0 18px 45px rgba(21, 33, 47, 0.08)",
        }}
      >
        <Box
          sx={{
            width: 74,
            height: 74,
            mx: "auto",
            mb: 2.5,
            borderRadius: "50%",
            bgcolor: "var(--azul-timbox)",
            color: "var(--blanco-timbox)",
            display: "grid",
            placeItems: "center",
          }}
        >
          <PersonRoundedIcon sx={{ fontSize: 38 }} />
        </Box>

        <Typography
          component="h1"
          sx={{
            fontFamily: "var(--fuente-regular)",
            fontSize: { xs: 28, sm: 36 },
            fontWeight: 800,
            lineHeight: 1.15,
            mb: 1,
          }}
        >
          Perfil aun no implementado
        </Typography>

        <Typography
          sx={{
            color: "#6b7685",
            fontFamily: "var(--fuente-regular)",
            fontSize: 16,
            lineHeight: 1.6,
            mb: 3,
          }}
        >
          {usuario?.nombre ?? "Usuario"}.
        </Typography>

        <Box
          sx={{
            display: "grid",
            gap: 1,
            mb: 3,
            border: "1px solid #edf1f5",
            borderRadius: "8px",
            p: 2,
            textAlign: "left",
          }}
        >
          <Typography sx={{ color: "#6b7685", fontFamily: "var(--fuente-regular)", fontSize: 13 }}>
            Usuario
          </Typography>
          <Typography sx={{ fontFamily: "var(--fuente-regular)", fontSize: 18, fontWeight: 800 }}>
            {usuario?.usuario ?? "Sin usuario"}
          </Typography>
          <Typography sx={{ color: "#6b7685", fontFamily: "var(--fuente-regular)", fontSize: 13, mt: 1 }}>
            Correo
          </Typography>
          <Typography sx={{ fontFamily: "var(--fuente-regular)", fontSize: 16 }}>
            {usuario?.correo ?? "Sin correo"}
          </Typography>
        </Box>

        <Button
          component={RouterLink}
          to="/privado"
          startIcon={<ArrowBackRoundedIcon />}
          sx={{
            minHeight: 40,
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
          Volver al dashboard
        </Button>
      </Box>
    </Box>
  );
}
