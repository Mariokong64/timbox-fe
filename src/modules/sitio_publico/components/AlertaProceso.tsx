import { Box, CircularProgress, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";

interface AlertaProcesoProps {
  abierta: boolean;
  titulo: string;
  descripcion?: string;
  cargando?: boolean;
  tipo?: "info" | "exito" | "error";
}

export function AlertaProceso({
  abierta,
  titulo,
  descripcion,
  cargando = false,
  tipo = "info",
}: AlertaProcesoProps) {
  if (!abierta) {
    return null;
  }

  const Icono = tipo === "exito" ? CheckCircleOutlinedIcon : tipo === "error" ? ErrorOutlinedIcon : InfoOutlinedIcon;

  return (
    <Box
      sx={{
        position: "fixed",
        top: { xs: 18, md: 10 },
        right: { xs: 16, md: 16 },
        zIndex: 220,
        width: { xs: "calc(100vw - 32px)", sm: 315 },
        minHeight: 72,
        px: 2,
        py: 1.4,
        bgcolor: "rgba(49, 143, 164, 0.92)",
        color: "var(--blanco-timbox)",
        boxShadow: "0 4px 14px rgba(0, 0, 0, 0.32)",
        display: "grid",
        gridTemplateColumns: "24px 1fr auto",
        alignItems: "center",
        gap: 1.3,
      }}
    >
      <Icono sx={{ fontSize: 23, opacity: 0.95 }} />

      <Box>
        <Typography
          sx={{
            fontFamily: "var(--fuente-regular)",
            fontSize: 14,
            fontWeight: 700,
            lineHeight: 1.1,
          }}
        >
          {titulo}
        </Typography>

        {descripcion && (
          <Typography
            sx={{
              mt: 0.3,
              fontFamily: "var(--fuente-ligera)",
              fontSize: 13,
              lineHeight: 1.1,
              opacity: 0.95,
            }}
          >
            {descripcion}
          </Typography>
        )}
      </Box>

      {cargando && <CircularProgress size={18} thickness={5} sx={{ color: "var(--blanco-timbox)" }} />}

      <Box
        sx={{
          gridColumn: "1 / -1",
          height: 1,
          mt: 0.7,
          overflow: "hidden",
          bgcolor: "rgba(255, 255, 255, 0.2)",
          "&::before": {
            content: '""',
            display: "block",
            width: "42%",
            height: "100%",
            bgcolor: "rgba(255, 255, 255, 0.65)",
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
