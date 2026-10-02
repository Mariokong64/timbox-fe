import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import LockOutlineRoundedIcon from "@mui/icons-material/LockOutlineRounded";
import { opcionesMenuPrivado } from "../layout/opcionesMenuPrivado";
import { tieneAccesoPantalla } from "../permisos/tieneAccesoPantalla";

interface RutaConPermisoProps {
  clave: string;
  children: ReactNode;
}

export function RutaConPermiso({ clave, children }: RutaConPermisoProps) {
  return tieneAccesoPantalla(clave) ? children : <Navigate to="/privado" replace />;
}

export function InicioPrivado({ children }: { children: ReactNode }) {
  if (tieneAccesoPantalla("DASHBOARD")) {
    return children;
  }

  const primeraPantalla = opcionesMenuPrivado.find((opcion) => tieneAccesoPantalla(opcion.clave));
  if (primeraPantalla) {
    return <Navigate to={primeraPantalla.ruta} replace />;
  }

  return (
    <Box sx={{ minHeight: "calc(100vh - 130px)", display: "grid", placeItems: "center", color: "var(--azul-timbox)" }}>
      <Box sx={{ width: "min(520px, 100%)", border: "1px solid #dce1e7", borderRadius: "8px", bgcolor: "var(--blanco-timbox)", px: { xs: 3, sm: 5 }, py: { xs: 4, sm: 5 }, textAlign: "center", boxShadow: "0 18px 45px rgba(21, 33, 47, 0.08)" }}>
        <Box sx={{ width: 64, height: 64, mx: "auto", mb: 2.5, borderRadius: "50%", bgcolor: "rgba(220, 62, 38, 0.1)", color: "var(--rojo-timbox)", display: "grid", placeItems: "center" }}>
          <LockOutlineRoundedIcon sx={{ fontSize: 32 }} />
        </Box>
        <Typography component="h1" sx={{ fontFamily: "var(--fuente-regular)", fontSize: { xs: 24, sm: 28 }, fontWeight: 800, mb: 1 }}>
          Sin permisos asignados
        </Typography>
        <Typography sx={{ color: "#6b7685", fontFamily: "var(--fuente-regular)", fontSize: 16, lineHeight: 1.6 }}>
          Contacta con un administrador para solicitar acceso a las pantallas del sistema.
        </Typography>
      </Box>
    </Box>
  );
}
