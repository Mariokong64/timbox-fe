import { Box, IconButton, Tooltip } from "@mui/material";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import { useEffect, useRef, useState } from "react";
import {
  crearMensajeChat,
  obtenerMensajesIniciales,
  obtenerRespuestaChatbot,
  validarMensajeChat,
} from "../servicio/chatbot/chatbotServicio";
import type { MensajeChat } from "../servicio/chatbot/chatbot.types";
import { PanelChatbot } from "./PanelChatbot";
import { PanelChatPersona } from "./PanelChatPersona";

type ModoChat = "chatbot" | "persona";

export function ChatFlotante() {
  const [abierto, setAbierto] = useState(false);
  const [modo, setModo] = useState<ModoChat>("chatbot");
  const [mensajes, setMensajes] = useState<MensajeChat[]>(() =>
    obtenerMensajesIniciales()
  );
  const [valorMensaje, setValorMensaje] = useState("");
  const [errorMensaje, setErrorMensaje] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  const controladorPeticionRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const cerrarConEscape = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") {
        setAbierto(false);
      }
    };

    window.addEventListener("keydown", cerrarConEscape);

    return () => {
      window.removeEventListener("keydown", cerrarConEscape);

      const controladorPeticion = controladorPeticionRef.current;
      controladorPeticionRef.current = null;
      controladorPeticion?.abort();
    };
  }, []);

  const cambiarMensaje = (valor: string) => {
    setValorMensaje(valor);

    if (errorMensaje) {
      setErrorMensaje(null);
    }
  };

  const enviarMensaje = async (mensajeSugerido?: string) => {
    if (enviando) {
      return;
    }

    const resultado = validarMensajeChat(mensajeSugerido ?? valorMensaje);

    if (resultado.error) {
      setErrorMensaje(resultado.error);
      return;
    }

    setMensajes((mensajesActuales) => [
      ...mensajesActuales,
      crearMensajeChat(resultado.mensaje, "usuario"),
    ]);
    setValorMensaje("");
    setErrorMensaje(null);
    setEnviando(true);

    const controladorPeticion = new AbortController();
    controladorPeticionRef.current = controladorPeticion;

    try {
      const respuesta = await obtenerRespuestaChatbot(
        resultado.mensaje,
        controladorPeticion.signal
      );

      setMensajes((mensajesActuales) => [
        ...mensajesActuales,
        respuesta,
      ]);
    } catch (error: unknown) {
      if (controladorPeticion.signal.aborted) {
        return;
      }

      const mensajeError =
        error instanceof Error
          ? error.message
          : "No fue posible obtener una respuesta del asistente.";

      setErrorMensaje(mensajeError);
      setValorMensaje((valorActual) =>
        valorActual.trim() ? valorActual : resultado.mensaje
      );
    } finally {
      if (controladorPeticionRef.current === controladorPeticion) {
        controladorPeticionRef.current = null;
        setEnviando(false);
      }
    }
  };

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          right: { xs: 18, sm: "3vw" },
          bottom: { xs: 18, sm: "4vh" },
          zIndex: 1200,
          opacity: abierto ? 0 : 1,
          visibility: abierto ? "hidden" : "visible",
          transform: abierto ? "scale(0.82)" : "scale(1)",
          transition:
            "opacity 160ms ease, transform 220ms cubic-bezier(0.16, 1, 0.3, 1), visibility 160ms ease",
        }}
      >
        <Tooltip title="Abrir asistente virtual" placement="left">
          <IconButton
            aria-label="Abrir chat con el asistente virtual de TIMBOX"
            onClick={() => {
              setModo("chatbot");
              setAbierto(true);
            }}
            sx={{
              width: { xs: 66, sm: 72 },
              height: { xs: 52, sm: 56 },
              borderRadius: "19px 19px 6px 19px",
              bgcolor: "var(--rojo-timbox)",
              color: "var(--blanco-timbox)",
              boxShadow:
                "0 10px 24px rgba(21, 33, 47, 0.22), 0 4px 10px rgba(220, 62, 38, 0.24)",
              transition:
                "transform 200ms ease, box-shadow 200ms ease, background-color 200ms ease",
              "&:hover, &:focus-visible": {
                bgcolor: "#c73520",
                transform: "translateY(-4px) scale(1.03)",
                boxShadow:
                  "0 18px 34px rgba(21, 33, 47, 0.28), 0 8px 18px rgba(220, 62, 38, 0.32)",
              },
              "@media (prefers-reduced-motion: reduce)": {
                transition: "none",
              },
            }}
          >
            <ChatRoundedIcon sx={{ fontSize: { xs: 24, sm: 26 } }} />
          </IconButton>
        </Tooltip>
      </Box>

      <PanelChatbot
        abierto={abierto && modo === "chatbot"}
        mensajes={mensajes}
        valorMensaje={valorMensaje}
        errorMensaje={errorMensaje}
        enviando={enviando}
        onCerrar={() => setAbierto(false)}
        onHablarConPersona={() => setModo("persona")}
        onCambiarMensaje={cambiarMensaje}
        onEnviarMensaje={enviarMensaje}
      />
      <PanelChatPersona
        abierto={abierto && modo === "persona"}
        onCerrar={() => setAbierto(false)}
        onVolverChatbot={() => setModo("chatbot")}
      />
    </>
  );
}
