import { Chip } from "@mui/material";
import type { EstadoAtencionSolicitud } from "../servicio/solicitudes.types";

const configuracionEstado: Record<
  EstadoAtencionSolicitud,
  { etiqueta: string; fondo: string; color: string }
> = {
  por_atender: {
    etiqueta: "Por atender",
    fondo: "rgba(220, 62, 38, 0.12)",
    color: "#b52f1e",
  },
  en_atencion: {
    etiqueta: "En atención",
    fondo: "rgba(218, 147, 26, 0.16)",
    color: "#8c5d0d",
  },
  cerrada: {
    etiqueta: "Cerrada",
    fondo: "rgba(35, 133, 88, 0.13)",
    color: "#176944",
  },
};

interface EstadoSolicitudChipProps {
  estado: EstadoAtencionSolicitud;
  etiqueta?: string;
}

export function EstadoSolicitudChip({
  estado,
  etiqueta,
}: EstadoSolicitudChipProps) {
  const configuracion = configuracionEstado[estado];

  return (
    <Chip
      label={etiqueta || configuracion.etiqueta}
      size="small"
      sx={{
        height: 27,
        bgcolor: configuracion.fondo,
        color: configuracion.color,
        fontFamily: "var(--fuente-regular)",
        fontSize: 11.5,
        fontWeight: 700,
        "& .MuiChip-label": { px: 1.25 },
      }}
    />
  );
}
