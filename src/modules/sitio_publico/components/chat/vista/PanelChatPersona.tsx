import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import { useCallback, useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { LogoTimboxConLetras } from "../../../../../shared/components/LogoTimboxConLetras";
import {
  eliminarTokenChatPersona,
  enviarMensajeChatPersona,
  formularioChatPersonaInicial,
  formularioChatPersonaValido,
  iniciarConversacionChatPersona,
  LIMITE_MENSAJE_CHAT_PERSONA,
  obtenerMensajeErrorChatPersona,
  recuperarConversacionChatPersona,
  validarFormularioChatPersona,
} from "../servicio/chatPersona/chatPersonaServicio";
import type {
  ConversacionChatPersona,
  ErroresFormularioChatPersona,
  FormularioChatPersona,
  MensajeChatPersona,
} from "../servicio/chatPersona/chatPersona.types";

interface PanelChatPersonaProps {
  abierto: boolean;
  onCerrar: () => void;
  onVolverChatbot: () => void;
}

function hora(fecha: string): string {
  const valor = new Date(fecha);
  return Number.isNaN(valor.getTime())
    ? ""
    : new Intl.DateTimeFormat("es-MX", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(valor);
}

function MensajePersona({ mensaje }: { mensaje: MensajeChatPersona }) {
  if (mensaje.remitente === "sistema") {
    return (
      <Typography
        sx={{
          alignSelf: "center",
          maxWidth: "90%",
          px: 1.5,
          py: 0.75,
          color: "rgba(21, 33, 47, 0.58)",
          bgcolor: "rgba(21, 33, 47, 0.06)",
          borderRadius: "999px",
          fontFamily: "var(--fuente-regular)",
          fontSize: 11,
          textAlign: "center",
        }}
      >
        {mensaje.contenido}
      </Typography>
    );
  }

  const visitante = mensaje.remitente === "visitante";

  return (
    <Box
      sx={{
        alignSelf: visitante ? "flex-end" : "flex-start",
        maxWidth: "82%",
        px: 1.6,
        py: 1.15,
        color: visitante ? "var(--blanco-timbox)" : "var(--azul-timbox)",
        bgcolor: visitante ? "var(--azul-timbox)" : "var(--blanco-timbox)",
        border: visitante ? "none" : "1px solid rgba(21, 33, 47, 0.08)",
        borderRadius: visitante
          ? "18px 18px 5px 18px"
          : "18px 18px 18px 5px",
        boxShadow: "0 4px 12px rgba(21, 33, 47, 0.07)",
      }}
    >
      {!visitante && mensaje.nombreRemitente && (
        <Typography
          sx={{
            mb: 0.35,
            color: "var(--rojo-timbox)",
            fontFamily: "var(--fuente-regular)",
            fontSize: 10.5,
            fontWeight: 700,
          }}
        >
          {mensaje.nombreRemitente}
        </Typography>
      )}
      <Typography
        sx={{
          whiteSpace: "pre-wrap",
          overflowWrap: "anywhere",
          fontFamily: "var(--fuente-regular)",
          fontSize: 13,
          lineHeight: 1.45,
        }}
      >
        {mensaje.contenido}
      </Typography>
      <Typography
        component="time"
        sx={{
          display: "block",
          mt: 0.5,
          color: visitante
            ? "rgba(255, 255, 255, 0.58)"
            : "rgba(21, 33, 47, 0.42)",
          fontFamily: "var(--fuente-regular)",
          fontSize: 9.5,
          textAlign: "right",
        }}
      >
        {hora(mensaje.fechaRegistro)}
      </Typography>
    </Box>
  );
}

export function PanelChatPersona({
  abierto,
  onCerrar,
  onVolverChatbot,
}: PanelChatPersonaProps) {
  const [formulario, setFormulario] = useState<FormularioChatPersona>(
    formularioChatPersonaInicial
  );
  const [erroresFormulario, setErroresFormulario] =
    useState<ErroresFormularioChatPersona>({});
  const [conversacion, setConversacion] =
    useState<ConversacionChatPersona | null>(null);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const finalRef = useRef<HTMLDivElement>(null);

  const actualizarConversacion = useCallback(async (mostrarCarga = false) => {
    if (mostrarCarga) {
      setCargando(true);
    }

    try {
      const recuperada = await recuperarConversacionChatPersona();
      setConversacion(recuperada);
      setError(null);
    } catch (errorActual) {
      setError(obtenerMensajeErrorChatPersona(errorActual));
    } finally {
      if (mostrarCarga) {
        setCargando(false);
      }
    }
  }, []);

  useEffect(() => {
    if (!abierto) {
      return;
    }

    const temporizador = window.setTimeout(
      () => void actualizarConversacion(true),
      0
    );

    return () => window.clearTimeout(temporizador);
  }, [abierto, actualizarConversacion]);

  useEffect(() => {
    if (!abierto || !conversacion || conversacion.fechaFin) {
      return;
    }

    const intervalo = window.setInterval(
      () => void actualizarConversacion(),
      3000
    );

    return () => window.clearInterval(intervalo);
  }, [abierto, conversacion, actualizarConversacion]);

  useEffect(() => {
    finalRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [conversacion?.mensajes]);

  const cambiarFormulario = (
    campo: keyof FormularioChatPersona,
    valor: string
  ) => {
    setFormulario((actual) => ({ ...actual, [campo]: valor }));
    setErroresFormulario((actual) => ({ ...actual, [campo]: undefined }));
  };

  const iniciar = async (evento: FormEvent) => {
    evento.preventDefault();
    const errores = validarFormularioChatPersona(formulario);
    setErroresFormulario(errores);

    if (!formularioChatPersonaValido(errores)) {
      return;
    }

    setCargando(true);
    setError(null);

    try {
      setConversacion(await iniciarConversacionChatPersona(formulario));
      setFormulario(formularioChatPersonaInicial);
    } catch (errorActual) {
      setError(obtenerMensajeErrorChatPersona(errorActual));
    } finally {
      setCargando(false);
    }
  };

  const enviar = async (evento: FormEvent) => {
    evento.preventDefault();
    const contenido = mensaje.trim();

    if (!contenido || enviando) {
      return;
    }

    setEnviando(true);
    setError(null);

    try {
      const enviado = await enviarMensajeChatPersona(contenido);
      setConversacion((actual) =>
        actual
          ? { ...actual, mensajes: [...actual.mensajes, enviado] }
          : actual
      );
      setMensaje("");
    } catch (errorActual) {
      setError(obtenerMensajeErrorChatPersona(errorActual));
    } finally {
      setEnviando(false);
    }
  };

  const nuevaConversacion = () => {
    eliminarTokenChatPersona();
    setConversacion(null);
    setError(null);
    setFormulario(formularioChatPersonaInicial);
  };

  const finalizada = Boolean(conversacion?.fechaFin);
  const respondidaPorEquipo = Boolean(
    conversacion?.mensajes.some(
      (mensajeActual) => mensajeActual.remitente === "agente"
    )
  );
  const descripcionEstado = !conversacion
    ? "Conecta con nuestro equipo"
    : respondidaPorEquipo
      ? "Conversación atendida por el equipo"
      : "Esperando respuesta del equipo";

  return (
    <Box
      role="dialog"
      aria-label="Chat con una persona de TIMBOX"
      aria-hidden={!abierto}
      sx={{
        position: "fixed",
        zIndex: 1300,
        right: { xs: 12, sm: 24 },
        bottom: { xs: 12, sm: 24 },
        width: { xs: "calc(100vw - 24px)", sm: 380 },
        height: { xs: "calc(100dvh - 24px)", sm: "min(620px, calc(100dvh - 48px))" },
        minHeight: { xs: 480, sm: 540 },
        display: "grid",
        gridTemplateRows: "auto minmax(0, 1fr) auto",
        overflow: "hidden",
        borderRadius: { xs: "24px", sm: "26px 26px 8px 26px" },
        bgcolor: "#f5f6f7",
        border: "1px solid rgba(21, 33, 47, 0.12)",
        boxShadow: "0 26px 70px rgba(9, 21, 34, 0.28)",
        opacity: abierto ? 1 : 0,
        visibility: abierto ? "visible" : "hidden",
        pointerEvents: abierto ? "auto" : "none",
        transform: abierto ? "scale(1)" : "translateY(18px) scale(0.97)",
        transformOrigin: "bottom right",
        transition: "opacity 180ms ease, transform 240ms ease, visibility 180ms ease",
      }}
    >
      <Box
        component="header"
        sx={{
          px: 2,
          pt: 2,
          pb: 1.75,
          color: "var(--blanco-timbox)",
          bgcolor: "var(--azul-timbox)",
          backgroundImage:
            "radial-gradient(circle at 88% 0%, rgba(220, 62, 38, 0.28), transparent 34%)",
        }}
      >
        <Stack direction="row" sx={{ alignItems: "center", gap: 1 }}>
          <LogoTimboxConLetras variante="claro" ancho={102} />
          <Box sx={{ flex: 1 }} />
          <Tooltip title="Volver al asistente virtual" placement="bottom">
            <IconButton
              aria-label="Volver al asistente virtual"
              onClick={onVolverChatbot}
              sx={{
                width: 36,
                height: 36,
                color: "var(--blanco-timbox)",
                bgcolor: "rgba(255, 255, 255, 0.1)",
              }}
            >
              <SmartToyRoundedIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Tooltip>
          <IconButton
            aria-label="Cerrar chat"
            onClick={onCerrar}
            sx={{ color: "var(--blanco-timbox)" }}
          >
            <CloseRoundedIcon />
          </IconButton>
        </Stack>
        <Stack direction="row" sx={{ mt: 1.5, alignItems: "center", gap: 1 }}>
          <SupportAgentRoundedIcon sx={{ fontSize: 25 }} />
          <Box>
            <Typography
              component="h2"
              sx={{ fontFamily: "var(--fuente-regular)", fontSize: 19, fontWeight: 700 }}
            >
              Atención personalizada
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,.68)",
                fontFamily: "var(--fuente-regular)",
                fontSize: 11.5,
              }}
            >
              {finalizada ? "Conversación finalizada" : descripcionEstado}
            </Typography>
          </Box>
        </Stack>
      </Box>

      <Box
        component="section"
        aria-live="polite"
        sx={{
          minHeight: 0,
          overflowY: "auto",
          p: 2,
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(21, 33, 47, 0.055) 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      >
        {cargando && !conversacion ? (
          <Stack sx={{ height: "100%", alignItems: "center", justifyContent: "center" }}>
            <CircularProgress size={28} sx={{ color: "var(--rojo-timbox)" }} />
          </Stack>
        ) : !conversacion ? (
          <Box component="form" onSubmit={iniciar}>
            <Typography
              sx={{
                mb: 0.75,
                color: "var(--azul-timbox)",
                fontFamily: "var(--fuente-regular)",
                fontSize: 18,
                fontWeight: 700,
              }}
            >
              Cuéntanos cómo contactarte
            </Typography>
            <Typography
              sx={{
                mb: 2,
                color: "rgba(21,33,47,.62)",
                fontFamily: "var(--fuente-regular)",
                fontSize: 12.5,
              }}
            >
              Guardaremos esta conversación para que puedas recuperarla desde este navegador.
            </Typography>
            <Stack spacing={1.4}>
              <TextField
                size="small"
                label="Nombre"
                value={formulario.nombre}
                error={Boolean(erroresFormulario.nombre)}
                helperText={erroresFormulario.nombre}
                onChange={(e) => cambiarFormulario("nombre", e.target.value)}
              />
              <TextField
                size="small"
                label="Correo electrónico"
                type="email"
                value={formulario.correo}
                error={Boolean(erroresFormulario.correo)}
                helperText={erroresFormulario.correo}
                onChange={(e) => cambiarFormulario("correo", e.target.value)}
              />
              <TextField
                size="small"
                label="Teléfono (opcional)"
                value={formulario.telefono}
                error={Boolean(erroresFormulario.telefono)}
                helperText={erroresFormulario.telefono}
                onChange={(e) => cambiarFormulario("telefono", e.target.value)}
              />
              <TextField
                multiline
                minRows={3}
                label="¿En qué podemos ayudarte?"
                value={formulario.mensaje}
                error={Boolean(erroresFormulario.mensaje)}
                helperText={erroresFormulario.mensaje}
                onChange={(e) => cambiarFormulario("mensaje", e.target.value)}
              />
              {error && <Alert severity="error">{error}</Alert>}
              <Button
                type="submit"
                variant="contained"
                disabled={cargando}
                sx={{ bgcolor: "var(--rojo-timbox)", textTransform: "none" }}
              >
                {cargando ? "Iniciando..." : "Iniciar conversación"}
              </Button>
            </Stack>
          </Box>
        ) : (
          <Stack spacing={1.25}>
            {conversacion.mensajes.map((mensajeActual) => (
              <MensajePersona key={mensajeActual.id} mensaje={mensajeActual} />
            ))}
            {error && <Alert severity="error">{error}</Alert>}
            {finalizada && (
              <Button
                variant="outlined"
                onClick={nuevaConversacion}
                sx={{ alignSelf: "center", textTransform: "none" }}
              >
                Iniciar otra conversación
              </Button>
            )}
            <Box ref={finalRef} />
          </Stack>
        )}
      </Box>

      <Box
        component="form"
        onSubmit={enviar}
        sx={{
          display: conversacion && !finalizada ? "block" : "none",
          p: 1.5,
          bgcolor: "var(--blanco-timbox)",
          borderTop: "1px solid rgba(21,33,47,.08)",
        }}
      >
        <Stack direction="row" sx={{ alignItems: "flex-end", gap: 1 }}>
          <TextField
            fullWidth
            multiline
            maxRows={3}
            placeholder="Escribe tu mensaje..."
            value={mensaje}
            slotProps={{
              htmlInput: {
                maxLength: LIMITE_MENSAJE_CHAT_PERSONA,
                "aria-label": "Mensaje para el equipo de TIMBOX",
              },
            }}
            onChange={(e) => setMensaje(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                e.currentTarget.closest("form")?.requestSubmit();
              }
            }}
          />
          <IconButton
            type="submit"
            aria-label="Enviar mensaje al equipo"
            disabled={!mensaje.trim() || enviando}
            sx={{
              width: 46,
              height: 46,
              bgcolor: "var(--rojo-timbox)",
              color: "var(--blanco-timbox)",
              borderRadius: "15px 15px 5px 15px",
              "&:hover": { bgcolor: "#c73520" },
              "&.Mui-disabled": {
                bgcolor: "rgba(21,33,47,.1)",
                color: "rgba(21,33,47,.3)",
              },
            }}
          >
            {enviando ? (
              <CircularProgress size={18} color="inherit" />
            ) : (
              <SendRoundedIcon sx={{ fontSize: 20 }} />
            )}
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
}
