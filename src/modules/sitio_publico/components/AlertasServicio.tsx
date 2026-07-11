import { useEffect } from "react";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import CloseIcon from "@mui/icons-material/Close";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export type TipoAlertaServicio = "loading" | "success" | "error" | "info";

interface AlertasServicioProps {
  abierta: boolean;
  tipo?: TipoAlertaServicio;
  titulo: string;
  descripcion?: string;
  duracionMs?: number;
  onCerrar?: () => void;
}

const estilosPorTipo: Record<
  TipoAlertaServicio,
  { fondo: string; borde: string; sombra: string }
> = {
  loading: {
    fondo: "rgba(31, 133, 196, 0.58)",
    borde: "rgba(255, 255, 255, 0.38)",
    sombra: "rgba(31, 132, 196, 0.34)",
  },
  info: {
    fondo: "rgba(31, 133, 196, 0.65)",
    borde: "rgba(255, 255, 255, 0.38)",
    sombra: "rgba(31, 132, 196, 0.34)",
  },
  success: {
    fondo: "rgba(38, 154, 106, 0.51)",
    borde: "rgba(255, 255, 255, 0.38)",
    sombra: "rgba(38, 154, 105, 0.34)",
  },
  error: {
    fondo: "color-mix(in srgb, var(--rojo-timbox) 88%, transparent)",
    borde: "rgba(255, 255, 255, 0.38)",
    sombra: "rgba(206, 70, 76, 0.34)",
  },
};

function renderizarIcono(tipo: TipoAlertaServicio, color: string) {
  if (tipo === "success") {
    return <CheckCircleOutlinedIcon sx={{ fontSize: 25, color }} />;
  }

  if (tipo === "error") {
    return <ErrorOutlinedIcon sx={{ fontSize: 25, color }} />;
  }

  return <InfoOutlinedIcon sx={{ fontSize: 25, color }} />;
}

export function AlertasServicio({
  abierta,
  tipo = "info",
  titulo,
  descripcion,
  duracionMs = 4200,
  onCerrar,
}: AlertasServicioProps) {
  useEffect(() => {
    if (!abierta || tipo === "loading" || !onCerrar) {
      return;
    }

    const timeout = window.setTimeout(onCerrar, duracionMs);

    return () => window.clearTimeout(timeout);
  }, [abierta, duracionMs, onCerrar, tipo]);

  if (!abierta) {
    return null;
  }

  const estilos = estilosPorTipo[tipo];
  const cargando = tipo === "loading";

  return (
    <Box
      role="status"
      sx={{
        position: "fixed",
        right: { xs: 16, md: 24 },
        bottom: { xs: 18, md: 24 },
        zIndex: 220,
        width: { xs: "calc(100vw - 32px)", sm: 390 },
        minHeight: 78,
        px: 2.2,
        py: 1.55,
        border: "1px solid",
        borderColor: estilos.borde,
        borderRadius: 1.25,
        bgcolor: estilos.fondo,
        color: "var(--blanco-timbox)",
        boxShadow: `0 18px 42px rgba(0, 0, 0, 0.28), 0 4px 18px ${estilos.sombra}`,
        backdropFilter: "blur(10px)",
        display: "grid",
        gridTemplateColumns: "6px 28px 1fr auto",
        alignItems: "center",
        columnGap: 1.35,
        rowGap: 0,
      }}
    >
      <Box
        sx={{
          gridRow: "1 / 3",
          alignSelf: "stretch",
          width: 6,
          minHeight: 50,
          borderRadius: 999,
          bgcolor: "rgba(255, 255, 255, 0.92)",
          boxShadow: `0 0 0 3px ${estilos.sombra}`,
        }}
      />

      {renderizarIcono(tipo, "var(--blanco-timbox)")}

      <Box sx={{ minWidth: 0 }}>
        <Typography
          sx={{
            fontFamily: "var(--fuente-regular)",
            fontSize: 15,
            fontWeight: 700,
            lineHeight: 1.15,
          }}
        >
          {titulo}
        </Typography>

        {descripcion && (
          <Typography
            sx={{
              mt: 0.35,
              fontFamily: "var(--fuente-ligera)",
              fontSize: 13,
              lineHeight: 1.25,
              color: "var(--blanco-timbox)",
              opacity: 0.9,
            }}
          >
            {descripcion}
          </Typography>
        )}
      </Box>

      {cargando ? (
        <CircularProgress size={20} thickness={5} sx={{ color: "var(--blanco-timbox)" }} />
      ) : (
        onCerrar && (
          <IconButton
            type="button"
            aria-label="Cerrar alerta"
            onClick={onCerrar}
            sx={{
              color: "var(--blanco-timbox)",
              opacity: 0.72,
              p: 0.35,
              "&:hover": {
                opacity: 0.95,
                bgcolor: "rgba(255, 255, 255, 0.16)",
              },
            }}
          >
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
        )
      )}

      <Box
        sx={{
          gridColumn: "1 / -1",
          height: 2,
          mt: 0.85,
          overflow: "hidden",
          borderRadius: 999,
          bgcolor: "rgba(255, 255, 255, 0.2)",
          "&::before": {
            content: '""',
            display: "block",
            width: cargando ? "42%" : "100%",
            height: "100%",
            borderRadius: 999,
            bgcolor: "rgba(255, 255, 255, 0.86)",
            animation: cargando ? "timbox-alerta-carga 1s linear infinite" : "none",
          },
          "@keyframes timbox-alerta-carga": {
            "0%": { transform: "translateX(-110%)" },
            "100%": { transform: "translateX(260%)" },
          },
        }}
      />
    </Box>
  );
}
