import {
  Box,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import { useEffect, useRef } from "react";
import { LogoTimboxConLetras } from "../../../../../shared/components/LogoTimboxConLetras";
import {
  chatPersonaDisponible,
} from "../servicio/chatPersona/chatPersonaServicio";
import {
  LIMITE_CARACTERES_MENSAJE,
  preguntasSugeridas,
} from "../servicio/chatbot/chatbotServicio";
import type { MensajeChat as MensajeChatTipo } from "../servicio/chatbot/chatbot.types";
import { MensajeChat } from "./MensajeChat";

interface PanelChatbotProps {
  abierto: boolean;
  mensajes: MensajeChatTipo[];
  valorMensaje: string;
  errorMensaje: string | null;
  enviando: boolean;
  onCerrar: () => void;
  onHablarConPersona: () => void;
  onCambiarMensaje: (valor: string) => void;
  onEnviarMensaje: (mensaje?: string) => void;
}

export function PanelChatbot({
  abierto,
  mensajes,
  valorMensaje,
  errorMensaje,
  enviando,
  onCerrar,
  onHablarConPersona,
  onCambiarMensaje,
  onEnviarMensaje,
}: PanelChatbotProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const finalMensajesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!abierto) {
      return;
    }

    const temporizador = window.setTimeout(() => inputRef.current?.focus(), 220);

    return () => window.clearTimeout(temporizador);
  }, [abierto]);

  useEffect(() => {
    finalMensajesRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [mensajes, enviando]);

  return (
    <Box
      role="dialog"
      aria-label="Chat con el asistente virtual de TIMBOX"
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
        bgcolor: "var(--fondo-timbox)",
        border: "1px solid rgba(21, 33, 47, 0.12)",
        boxShadow: "0 26px 70px rgba(9, 21, 34, 0.28)",
        transform: abierto
          ? "translateY(0) scale(1)"
          : "translateY(18px) scale(0.97)",
        transformOrigin: "bottom right",
        opacity: abierto ? 1 : 0,
        visibility: abierto ? "visible" : "hidden",
        pointerEvents: abierto ? "auto" : "none",
        transition:
          "opacity 180ms ease, transform 260ms cubic-bezier(0.16, 1, 0.3, 1), visibility 180ms ease",
        "@media (prefers-reduced-motion: reduce)": {
          transition: "none",
        },
      }}
    >
      <Box
        component="header"
        sx={{
          position: "relative",
          px: { xs: 2.25, sm: 2.75 },
          pt: 2.5,
          pb: 2.25,
          color: "var(--blanco-timbox)",
          bgcolor: "var(--azul-timbox)",
          backgroundImage:
            "radial-gradient(circle at 88% 0%, rgba(220, 62, 38, 0.28), transparent 32%)",
        }}
      >
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <LogoTimboxConLetras variante="claro" ancho={112} />
            <Box
              component="span"
              sx={{
                px: 1,
                py: 0.45,
                borderRadius: "999px",
                bgcolor: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.14)",
                fontFamily: "var(--fuente-regular)",
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.1em",
              }}
            >
              ASISTENTE
            </Box>
          </Stack>

          <Stack direction="row" sx={{ gap: 0.5 }}>
            <Tooltip title="Hablar con una persona" placement="bottom">
              <span>
                <IconButton
                  aria-label="Hablar con una persona"
                  disabled={!chatPersonaDisponible}
                  onClick={onHablarConPersona}
                  sx={{
                    width: 36,
                    height: 36,
                    color: "var(--blanco-timbox)",
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                    "&.Mui-disabled": {
                      color: "rgba(255, 255, 255, 0.62)",
                      bgcolor: "rgba(255, 255, 255, 0.08)",
                    },
                  }}
                >
                  <SupportAgentRoundedIcon sx={{ fontSize: 20 }} />
                </IconButton>
              </span>
            </Tooltip>

            <IconButton
              aria-label="Cerrar chat"
              onClick={onCerrar}
              sx={{
                width: 36,
                height: 36,
                color: "var(--blanco-timbox)",
                bgcolor: "rgba(255, 255, 255, 0.1)",
                "&:hover": {
                  bgcolor: "var(--rojo-timbox)",
                },
              }}
            >
              <CloseRoundedIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Stack>
        </Stack>

        <Typography
          component="h2"
          sx={{
            mt: 2.25,
            fontFamily: "var(--fuente-regular)",
            fontSize: { xs: 24, sm: 27 },
            fontWeight: 700,
            lineHeight: 1.08,
          }}
        >
          ¡Hola! ¿En qué te ayudamos?
        </Typography>

        <Stack
          direction="row"
          sx={{
            mt: 1,
            alignItems: "center",
            gap: 0.75,
          }}
        >
          <Box
            aria-hidden="true"
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              bgcolor: "#53d18b",
              boxShadow: "0 0 0 4px rgba(83, 209, 139, 0.12)",
            }}
          />
          <Typography
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              fontFamily: "var(--fuente-regular)",
              fontSize: 12.5,
            }}
          >
            Asistente virtual disponible
          </Typography>
        </Stack>
      </Box>

      <Box
        component="section"
        aria-live="polite"
        sx={{
          minHeight: 0,
          overflowY: "auto",
          px: { xs: 1.75, sm: 2.25 },
          py: 2.25,
          backgroundColor: "#f5f6f7",
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(21, 33, 47, 0.055) 1px, transparent 0)",
          backgroundSize: "22px 22px",
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(21, 33, 47, 0.18) transparent",
        }}
      >
        <Stack spacing={1.5}>
          {mensajes.map((mensaje) => (
            <MensajeChat key={mensaje.id} mensaje={mensaje} />
          ))}

          {mensajes.length === 1 && (
            <Stack spacing={0.75} sx={{ pl: 4.75, pt: 0.25 }}>
              <Typography
                sx={{
                  color: "rgba(21, 33, 47, 0.52)",
                  fontFamily: "var(--fuente-regular)",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                }}
              >
                PREGUNTAS FRECUENTES
              </Typography>

              {preguntasSugeridas.map((pregunta) => (
                <Box
                  key={pregunta}
                  component="button"
                  type="button"
                  disabled={enviando}
                  onClick={() => onEnviarMensaje(pregunta)}
                  sx={{
                    width: "fit-content",
                    maxWidth: "100%",
                    px: 1.25,
                    py: 0.8,
                    border: "1px solid rgba(21, 33, 47, 0.12)",
                    borderRadius: "12px",
                    bgcolor: "rgba(255, 255, 255, 0.88)",
                    color: "var(--azul-timbox)",
                    fontFamily: "var(--fuente-regular)",
                    fontSize: 12,
                    textAlign: "left",
                    cursor: "pointer",
                    opacity: enviando ? 0.55 : 1,
                    transition:
                      "border-color 160ms ease, color 160ms ease, transform 160ms ease",
                    "&:hover, &:focus-visible": {
                      color: "var(--rojo-timbox)",
                      borderColor: "rgba(220, 62, 38, 0.42)",
                      transform: "translateX(2px)",
                    },
                  }}
                >
                  {pregunta}
                </Box>
              ))}
            </Stack>
          )}

          {enviando && (
            <Box
              aria-label="El asistente está escribiendo"
              sx={{
                ml: 4.75,
                width: "fit-content",
                display: "flex",
                gap: 0.5,
                px: 1.5,
                py: 1.15,
                borderRadius: "16px 16px 16px 5px",
                bgcolor: "var(--blanco-timbox)",
                border: "1px solid rgba(21, 33, 47, 0.08)",
              }}
            >
              {[0, 1, 2].map((indice) => (
                <Box
                  key={indice}
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    bgcolor: "rgba(21, 33, 47, 0.42)",
                    animation: "pulsoChat 1s ease-in-out infinite",
                    animationDelay: `${indice * 120}ms`,
                    "@keyframes pulsoChat": {
                      "0%, 100%": {
                        opacity: 0.35,
                        transform: "translateY(0)",
                      },
                      "50%": {
                        opacity: 1,
                        transform: "translateY(-3px)",
                      },
                    },
                  }}
                />
              ))}
            </Box>
          )}

          <Box ref={finalMensajesRef} />
        </Stack>
      </Box>

      <Box
        component="form"
        onSubmit={(evento) => {
          evento.preventDefault();
          onEnviarMensaje();
        }}
        sx={{
          px: { xs: 1.5, sm: 2 },
          pt: 1.25,
          pb: { xs: 1.5, sm: 1.75 },
          bgcolor: "var(--blanco-timbox)",
          borderTop: "1px solid rgba(21, 33, 47, 0.08)",
        }}
      >
        <Stack
          direction="row"
          sx={{
            alignItems: "flex-end",
            gap: 1,
          }}
        >
          <TextField
            fullWidth
            multiline
            maxRows={3}
            inputRef={inputRef}
            value={valorMensaje}
            error={Boolean(errorMensaje)}
            placeholder="Escribe tu mensaje..."
            slotProps={{
              htmlInput: {
                maxLength: LIMITE_CARACTERES_MENSAJE,
                "aria-label": "Mensaje para el asistente virtual",
              },
            }}
            onChange={(evento) => onCambiarMensaje(evento.target.value)}
            onKeyDown={(evento) => {
              if (evento.key === "Enter" && !evento.shiftKey) {
                evento.preventDefault();
                onEnviarMensaje();
              }
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                minHeight: 46,
                alignItems: "center",
                borderRadius: "15px",
                bgcolor: "#f5f6f7",
                fontFamily: "var(--fuente-regular)",
                fontSize: 14,
                "& fieldset": {
                  borderColor: "rgba(21, 33, 47, 0.1)",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(21, 33, 47, 0.24)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "var(--rojo-timbox)",
                  borderWidth: 1,
                },
              },
            }}
          />

          <IconButton
            type="submit"
            aria-label="Enviar mensaje"
            disabled={enviando || !valorMensaje.trim()}
            sx={{
              width: 46,
              height: 46,
              flex: "0 0 46px",
              borderRadius: "15px 15px 5px 15px",
              bgcolor: "var(--rojo-timbox)",
              color: "var(--blanco-timbox)",
              boxShadow: "0 8px 18px rgba(220, 62, 38, 0.22)",
              "&:hover": {
                bgcolor: "#c73520",
                transform: "translateY(-1px)",
              },
              "&.Mui-disabled": {
                bgcolor: "rgba(21, 33, 47, 0.1)",
                color: "rgba(21, 33, 47, 0.3)",
                boxShadow: "none",
              },
            }}
          >
            <SendRoundedIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Stack>

        <Typography
          role={errorMensaje ? "alert" : undefined}
          sx={{
            minHeight: 16,
            mt: 0.5,
            px: 0.5,
            color: errorMensaje
              ? "var(--rojo-timbox)"
              : "rgba(21, 33, 47, 0.42)",
            fontFamily: "var(--fuente-regular)",
            fontSize: 10.5,
          }}
        >
          {errorMensaje ??
            "La información proporcionada es de carácter orientativo."}
        </Typography>
      </Box>
    </Box>
  );
}
