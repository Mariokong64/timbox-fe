import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import axios from "axios";
import { cargarPermisosSesion, validarSesionPrivada } from "../api/apiPrivada";
import { cerrarSesion, EVENTO_SESION_CERRADA, obtenerPermisosEnMemoria, obtenerSesionGuardada } from "../login/servicio/autenticacionServicio";

type EstadoRutaPrivada = "validando" | "permitida" | "bloqueada";

export function RutaPrivada() {
  const location = useLocation();
  const [estado, setEstado] = useState<EstadoRutaPrivada>(() =>
    obtenerSesionGuardada() ? "validando" : "bloqueada"
  );

  useEffect(() => {
    const bloquearRuta = () => setEstado("bloqueada");
    window.addEventListener(EVENTO_SESION_CERRADA, bloquearRuta);
    return () => window.removeEventListener(EVENTO_SESION_CERRADA, bloquearRuta);
  }, []);

  useEffect(() => {
    let activo = true;
    const sesion = obtenerSesionGuardada();

    if (!sesion) {
      return undefined;
    }

    const cargarPermisos = obtenerPermisosEnMemoria() === null
      ? cargarPermisosSesion().catch((error: unknown) => {
          if (axios.isAxiosError(error) && error.response?.status === 404) {
            return validarSesionPrivada();
          }
          throw error;
        })
      : Promise.resolve();

    cargarPermisos
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
  }, []);

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
