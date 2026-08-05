import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

interface ModalConfirmacionProps {
  abierto: boolean;
  titulo: string;
  descripcion: string;
  textoConfirmar?: string;
  textoCancelar?: string;
  cargando?: boolean;
  onCancelar: () => void;
  onConfirmar: () => void;
}

export function ModalConfirmacion({
  abierto,
  titulo,
  descripcion,
  textoConfirmar = "Confirmar",
  textoCancelar = "Cancelar",
  cargando = false,
  onCancelar,
  onConfirmar,
}: ModalConfirmacionProps) {
  return (
    <Dialog
      open={abierto}
      onClose={cargando ? undefined : onCancelar}
      fullWidth
      maxWidth="xs"
      slotProps={{
        paper: {
          sx: {
            borderRadius: "8px",
            overflow: "hidden",
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          bgcolor: "var(--azul-timbox)",
          color: "var(--blanco-timbox)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          py: 1.6,
        }}
      >
        <Typography sx={{ fontFamily: "var(--fuente-regular)", fontSize: 19, fontWeight: 700 }}>
          {titulo}
        </Typography>
        <IconButton
          type="button"
          aria-label="Cerrar confirmación"
          onClick={onCancelar}
          disabled={cargando}
          sx={{ color: "var(--blanco-timbox)" }}
        >
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: 3, pt: "24px !important", pb: 2.25 }}>
        <Box sx={{ display: "grid", gridTemplateColumns: "42px 1fr", gap: 2, alignItems: "start" }}>
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              bgcolor: "rgba(220, 62, 38, 0.12)",
              color: "var(--rojo-timbox)",
              display: "grid",
              placeItems: "center",
            }}
          >
            <WarningAmberRoundedIcon />
          </Box>
          <Typography
            sx={{
              color: "var(--azul-timbox)",
              fontFamily: "var(--fuente-regular)",
              fontSize: 15.5,
              lineHeight: 1.55,
            }}
          >
            {descripcion}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pt: 1, pb: 2.5, gap: 1 }}>
        <Button
          type="button"
          onClick={onCancelar}
          disabled={cargando}
          sx={{
            color: "var(--azul-timbox)",
            fontFamily: "var(--fuente-regular)",
            textTransform: "none",
          }}
        >
          {textoCancelar}
        </Button>
        <Button
          type="button"
          onClick={onConfirmar}
          disabled={cargando}
          sx={{
            minWidth: 112,
            bgcolor: "var(--rojo-timbox)",
            color: "var(--blanco-timbox)",
            fontFamily: "var(--fuente-regular)",
            textTransform: "none",
            "&:hover": {
              bgcolor: "#f04a32",
            },
          }}
        >
          {cargando ? "Procesando..." : textoConfirmar}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
