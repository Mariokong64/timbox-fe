import { useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { CaptchaVerificacion } from "../../../components/CaptchaVerificacion";

interface ModalCaptchaContactoProps {
  abierto: boolean;
  onCerrar: () => void;
  onVerificado: (token: string) => void;
}

export function ModalCaptchaContacto({
  abierto,
  onCerrar,
  onVerificado,
}: ModalCaptchaContactoProps) {
  const captchaCompacto = useMediaQuery("(max-width:420px)");
  const [captchaToken, setCaptchaToken] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  const cerrarModal = () => {
    setCaptchaToken("");
    setMensajeError("");
    onCerrar();
  };

  const manejarCaptcha = (token: string) => {
    setCaptchaToken(token);

    if (token) {
      setCaptchaToken("");
      setMensajeError("");
      onVerificado(token);
    }
  };

  return (
    <Dialog
      open={abierto}
      onClose={cerrarModal}
      aria-labelledby="titulo-captcha-contacto"
      maxWidth="xs"
      fullWidth
      slotProps={{
        backdrop: {
          sx: {
            bgcolor: "rgba(8, 17, 28, 0.72)",
            backdropFilter: "blur(3px)",
          },
        },
        paper: {
          sx: {
            width: "min(390px, calc(100vw - 24px))",
            m: 1.5,
            overflow: "visible",
            borderRadius: 3,
            bgcolor: "var(--blanco-timbox)",
            color: "var(--azul-timbox)",
            boxShadow: "0 22px 70px rgba(0, 0, 0, 0.34)",
          },
        },
      }}
    >
      <DialogTitle
        id="titulo-captcha-contacto"
        sx={{
          px: { xs: 2.25, sm: 3 },
          pt: 2.75,
          pb: 0.75,
          display: "flex",
          alignItems: "center",
          gap: 1.25,
          fontFamily: "var(--fuente-regular)",
          fontSize: 20,
          fontWeight: 700,
        }}
      >
        <Box
          aria-hidden="true"
          sx={{
            width: 36,
            height: 36,
            flex: "0 0 36px",
            display: "grid",
            placeItems: "center",
            borderRadius: "50%",
            bgcolor: "rgba(220, 62, 38, 0.1)",
            color: "var(--rojo-timbox)",
          }}
        >
          <SecurityRoundedIcon sx={{ fontSize: 20 }} />
        </Box>

        Confirma que eres humano

        <IconButton
          aria-label="Cerrar verificación"
          onClick={cerrarModal}
          sx={{
            ml: "auto",
            mr: -1,
            color: "var(--azul-timbox)",
            "&:hover": {
              bgcolor: "rgba(21, 33, 47, 0.08)",
            },
          }}
        >
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          px: { xs: 2.25, sm: 3 },
          pt: "8px !important",
          pb: 2.75,
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            mb: 0.5,
            color: "var(--texto-footer-claro)",
            fontFamily: "var(--fuente-regular)",
            fontSize: 14.5,
            lineHeight: 1.5,
          }}
        >
          Completa la verificación para enviar tu mensaje.
        </Typography>

        {abierto && (
          <CaptchaVerificacion
            value={captchaToken}
            onChange={manejarCaptcha}
            onError={setMensajeError}
            size={captchaCompacto ? "compact" : "normal"}
          />
        )}

        {mensajeError && (
          <Alert
            severity="error"
            sx={{
              mt: 1,
              textAlign: "left",
              fontFamily: "var(--fuente-regular)",
            }}
          >
            {mensajeError}
          </Alert>
        )}

        <Button
          type="button"
          onClick={cerrarModal}
          sx={{
            mt: mensajeError ? 1.5 : 0,
            color: "var(--texto-footer-claro)",
            fontFamily: "var(--fuente-regular)",
            fontSize: 14,
            textTransform: "none",
            "&:hover": {
              bgcolor: "rgba(21, 33, 47, 0.06)",
              color: "var(--azul-timbox)",
            },
          }}
        >
          Cancelar
        </Button>
      </DialogContent>
    </Dialog>
  );
}
