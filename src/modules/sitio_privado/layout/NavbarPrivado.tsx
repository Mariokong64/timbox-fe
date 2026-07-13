import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { cerrarSesion, obtenerSesionGuardada } from "../login/servicio/autenticacionServicio";

export function NavbarPrivado() {
  const navigate = useNavigate();
  const sesion = obtenerSesionGuardada();
  const iniciales = useMemo(() => {
    const nombre = sesion?.usuario.nombre || sesion?.usuario.usuario || "U";

    return nombre
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((parte) => parte[0]?.toUpperCase())
      .join("");
  }, [sesion]);

  const cerrarSesionActual = () => {
    cerrarSesion();
    navigate("/login", { replace: true });
  };

  return (
    <Box
      component="header"
      sx={{
        position: "relative",
        zIndex: 1,
        minHeight: 80,
        bgcolor: "var(--rojo-timbox)",
        color: "var(--blanco-timbox)",
        px: { xs: 2.5, md: 3 },
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography sx={{ fontFamily: "var(--fuente-regular)", fontSize: { xs: 15, md: 18 } }}>
        {sesion?.usuario.nombre ?? "Usuario"}
      </Typography>

      <Box
        sx={{
          width: 58,
          height: 58,
          borderRadius: "50%",
          border: "2px solid var(--azul-timbox)",
          bgcolor: "var(--azul-timbox)",
          color: "var(--blanco-timbox)",
          display: "grid",
          placeItems: "center",
          fontFamily: "var(--fuente-regular)",
          fontSize: 18,
          fontWeight: 700,
        }}
      >
        {iniciales || "U"}
      </Box>

      <Button
        type="button"
        onClick={cerrarSesionActual}
        startIcon={<LogoutRoundedIcon />}
        sx={{
          minWidth: 0,
          color: "var(--blanco-timbox)",
          textTransform: "none",
          fontFamily: "var(--fuente-regular)",
          display: { xs: "none", sm: "inline-flex" },
          "&:hover": {
            bgcolor: "rgba(255, 255, 255, 0.12)",
          },
        }}
      >
        Salir
      </Button>
    </Box>
  );
}
