import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { validarSesionPrivada } from "../api/apiPrivada";
import { cerrarSesion, obtenerSesionGuardada } from "../login/servicio/autenticacionServicio";

type EstadoRutaPrivada = "validando" | "permitida" | "bloqueada";

export function RutaPrivada() {
  const location = useLocation();
  const [estado, setEstado] = useState<EstadoRutaPrivada>("validando");

  useEffect(() => {
    let activo = true;
    const sesion = obtenerSesionGuardada();

    if (!sesion) {
      setEstado("bloqueada");
      return;
    }

    setEstado("validando");

    validarSesionPrivada()
      .then(() => {
        if (activo) {
          setEstado("permitida");
        }
      })
      .catch(() => {
        cerrarSesion();

        if (activo) {
          setEstado("bloqueada");
        }
      });

    return () => {
      activo = false;
    };
  }, [location.pathname]);

  if (estado === "validando") {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "var(--azul-timbox)",
          display: "grid",
          placeItems: "center",
        }}
      >
        <CircularProgress sx={{ color: "var(--rojo-timbox)" }} />
      </Box>
    );
  }

  if (estado === "bloqueada") {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
