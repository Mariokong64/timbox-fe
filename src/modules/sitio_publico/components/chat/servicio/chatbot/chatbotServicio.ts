import type {
  MensajeChat,
  RemitenteMensajeChat,
  ResultadoValidacionMensaje,
} from "./chatbot.types";
import { solicitarRespuestaChatbot } from "../../api/chatbotApi";

export const LIMITE_CARACTERES_MENSAJE = 1000;

export const preguntasSugeridas = [
  "¿La integración tiene costo?",
  "¿Los timbres tienen vigencia?",
] as const;

function obtenerHoraActual(): string {
  return new Intl.DateTimeFormat("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());
}

function crearIdMensaje(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function crearMensajeChat(
  contenido: string,
  remitente: RemitenteMensajeChat
): MensajeChat {
  return {
    id: crearIdMensaje(),
    remitente,
    contenido,
    hora: obtenerHoraActual(),
  };
}

export function obtenerMensajesIniciales(): MensajeChat[] {
  return [
    crearMensajeChat(
      "¡Hola! Soy el asistente virtual de TIMBOX. Puedo ayudarte con preguntas sobre integración, timbrado, planes y servicios.",
      "chatbot"
    ),
  ];
}

export function validarMensajeChat(
  valor: string
): ResultadoValidacionMensaje {
  const mensaje = valor.trim();

  if (!mensaje) {
    return {
      mensaje,
      error: "Escribe un mensaje para continuar.",
    };
  }

  if (mensaje.length > LIMITE_CARACTERES_MENSAJE) {
    return {
      mensaje,
      error: `El mensaje no debe superar ${LIMITE_CARACTERES_MENSAJE} caracteres.`,
    };
  }

  return {
    mensaje,
    error: null,
  };
}

export async function obtenerRespuestaChatbot(
  mensaje: string,
  signal?: AbortSignal
): Promise<MensajeChat> {
  const resultado = validarMensajeChat(mensaje);

  if (resultado.error) {
    throw new Error(resultado.error);
  }

  const { respuesta } = await solicitarRespuestaChatbot(
    resultado.mensaje,
    signal
  );

  return crearMensajeChat(respuesta, "chatbot");
}
